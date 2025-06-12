import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Copy, Mail, RefreshCw, Zap, Shield, Clock, Loader2 } from "lucide-react";

// TypeScript interfaces
interface ToastData {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

interface MessageFrom {
  address: string;
  name: string;
}

interface MessageTo {
  address: string;
  name: string;
}

interface EmailMessage {
  id: string;
  accountId: string;
  msgid: string;
  from: MessageFrom;
  to: MessageTo[];
  subject: string;
  intro: string;
  seen: boolean;
  isDeleted: boolean;
  hasAttachments: boolean;
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
  text?: string;
  html?: string[];
}

interface AccountData {
  username: string;
  password: string;
}

interface ApiResponse {
  [key: string]: unknown;
}

interface Domain {
  isActive: boolean;
  domain: string;
}

interface LoginResponse {
  token: string;
}

// Mail.tm API base URL
const API_BASE = 'https://api.mail.tm';

// --- Reusable Toast Notification Component ---
const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  }[type] || 'bg-gray-800';

  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-50 p-4 rounded-xl shadow-lg text-white ${bgColor} animate-fade-in-down`}>
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white/70 hover:text-white">×</button>
      </div>
    </div>
  );
};

// --- Main Application Component ---
export default function App(): React.ReactNode {
  const [address, setAddress] = useState<string>('');
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [accountCredentials, setAccountCredentials] = useState<AccountData | null>(null);
  const [authToken, setAuthToken] = useState<string>('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isGenerating = useRef<boolean>(false);

  // --- Function to show toasts ---
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info'): void => {
    setToast({ id: Date.now(), message, type });
  }, []);

  // --- Function to extract OTP from text ---
  const extractOTP = useCallback((text: string): string | null => {
    if (!text) return null;

    const otpPatterns = [
      /\b\d{6}\b/g,
      /\b\d{4}\b/g,
      /\b\d{5}\b/g,
      /\b\d{7}\b/g,
      /\b\d{8}\b/g,
    ];

    for (const pattern of otpPatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        return matches[0];
      }
    }
    return null;
  }, []);

  // --- Function to make API calls with rate limiting and retry logic ---
  const apiCall = useCallback(async (endpoint: string, options: RequestInit = {}, retryCount = 0): Promise<ApiResponse> => {
    const url = `${API_BASE}${endpoint}`;
    console.log(`Making API call to: ${url} (attempt ${retryCount + 1})`);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (options.headers) {
      Object.assign(headers, options.headers as Record<string, string>);
    }

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors',
      });

      console.log(`API Response Status: ${response.status}`);

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || '30';
        const waitTime = Math.min(parseInt(retryAfter) * 1000, 60000);

        if (retryCount < 2) {
          console.log(`Rate limited. Waiting ${waitTime / 1000}s before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return apiCall(endpoint, options, retryCount + 1);
        } else {
          throw new Error('Rate limit exceeded. Please wait a few minutes before trying again.');
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);

        if (response.status === 401) {
          throw new Error('Authentication failed. Please generate a new email.');
        } else if (response.status === 403) {
          throw new Error('Access forbidden. Service may be temporarily unavailable.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }

        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response Data:', data);
      return data;
    } catch (error: unknown) {
      console.error('API Call Error:', error);
      if (error instanceof Error && error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error - please check your internet connection or try again later');
      }
      throw error;
    }
  }, [authToken]);

  // --- Function to create account ---
  const createAccount = useCallback(async (email: string, password: string): Promise<ApiResponse> => {
    try {
      const account = await apiCall('/accounts', {
        method: 'POST',
        body: JSON.stringify({
          address: email,
          password: password,
        }),
      });
      return account;
    } catch (error: unknown) {
      throw error;
    }
  }, [apiCall]);

  // --- Function to login ---
  const login = useCallback(async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await apiCall('/token', {
        method: 'POST',
        body: JSON.stringify({
          address: email,
          password: password,
        }),
      });
      if (!response.token) {
        throw new Error('Invalid login response: token missing');
      }
      return response as unknown as LoginResponse;
    } catch (error: unknown) {
      throw error;
    }
  }, [apiCall]);

  // --- Function to fetch messages ---
  const fetchMessages = useCallback(async (): Promise<void> => {
    if (!authToken || !accountCredentials) return;

    try {
      const response = await apiCall('/messages');

      let messageList: EmailMessage[] = [];

      if (Array.isArray(response)) {
        messageList = response as EmailMessage[];
      } else if (response && response['hydra:member']) {
        messageList = response['hydra:member'] as EmailMessage[];
      } else if (response && response.messages) {
        messageList = response.messages as EmailMessage[];
      }

      setMessages(messageList);

      for (const message of messageList) {
        const textContent = message.text || message.intro || '';
        const foundOtp = extractOTP(textContent);
        if (foundOtp && foundOtp !== otp) {
          setOtp(foundOtp);
          showToast(`OTP Found: ${foundOtp}`, 'success');
          break;
        }
      }
    } catch (error: unknown) {
      showToast('Failed to fetch messages', 'error');
    }
  }, [authToken, accountCredentials, apiCall, extractOTP, otp, showToast]);

  // --- Function to cleanup previous session ---
  const cleanupSession = useCallback((): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setAddress('');
    setMessages([]);
    setOtp('');
    setIsListening(false);
    setAccountCredentials(null);
    setAuthToken('');
  }, []);

  // --- Function to start polling for messages with longer intervals ---
  const startPolling = useCallback((): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsListening(true);

    fetchMessages();

    intervalRef.current = setInterval(() => {
      fetchMessages();
    }, 1000);
  }, [fetchMessages]);

  // --- Function to generate random string ---
  const generateRandomString = useCallback((length: number = 8): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  // --- Function to initialize and generate an account ---
  const generateNewEmail = useCallback(async (): Promise<void> => {
    if (isGenerating.current) return;
    isGenerating.current = true;

    cleanupSession();
    setLoading(true);
    showToast("Creating new temporary email account...", 'info');

    try {
      const domainResponse = await apiCall('/domains');
      const domainList = domainResponse as unknown as Domain[];
      if (!Array.isArray(domainList)) {
        throw new Error('Invalid domain response: expected an array');
      }
      const domain = domainList.find(d => d.isActive) || domainList[0];
      if (!domain) {
        throw new Error('No active domains available');
      }
      const username = generateRandomString(10);
      const email = `${username}@${domain.domain}`;
      const password = generateRandomString(12);

      await createAccount(email, password);
      const loginResponse = await login(email, password);

      if (!loginResponse.token) {
        throw new Error("Failed to get authentication token");
      }

      setAuthToken(loginResponse.token);
      setAccountCredentials({ username: email, password });
      setAddress(email);
      showToast(`New email created: ${email}`, 'success');

      await new Promise(resolve => setTimeout(resolve, 1000));
      await fetchMessages();
      startPolling();
      showToast("📡 Inbox is live! Waiting for messages...", 'success');
    } catch (error: unknown) {
      showToast(error instanceof Error ? error.message : "Failed to create email account", 'error');
      cleanupSession();
    } finally {
      setLoading(false);
      isGenerating.current = false;
    }
  }, [showToast, apiCall, createAccount, login, generateRandomString, fetchMessages, startPolling, cleanupSession]);

  // --- Function to refresh messages manually ---
  const refreshMessages = useCallback(async (): Promise<void> => {
    if (!authToken || loading || !accountCredentials) return;

    showToast("🔄 Refreshing inbox...", 'info');
    await fetchMessages();
    showToast("✅ Inbox refreshed", 'success');
  }, [fetchMessages, loading, accountCredentials, authToken, showToast]);

  // --- Fallback copy function ---
  const fallbackCopyTextToClipboard = useCallback((text: string, successMessage: string): void => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMessage, 'success');
    } catch {
      showToast("Failed to copy", 'error');
    }
    document.body.removeChild(textArea);
  }, [showToast]);

  // --- Function to copy text to clipboard ---
  const copyToClipboard = useCallback((textToCopy: string, successMessage: string): void => {
    if (!textToCopy) {
      showToast("Nothing to copy!", 'error');
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(successMessage, 'success');
      }).catch(() => {
        fallbackCopyTextToClipboard(textToCopy, successMessage);
      });
    } else {
      fallbackCopyTextToClipboard(textToCopy, successMessage);
    }
  }, [showToast, fallbackCopyTextToClipboard]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupSession();
    };
  }, [cleanupSession]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="container mx-auto p-4 max-w-4xl mt-20">
        {/* Header */}
        <header className="text-center py-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Open Mail
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Generate free, disposable email addresses with automatic OTP detection
          </p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10">
          {/* Email Generator Section */}
          <div className="mb-6">
            <div className="bg-gray-900/70 rounded-xl p-4 border border-gray-700">
              <div className="relative mb-4">
                <input
                  type="text"
                  value={loading ? "⚡ Generating new email address..." : (address || "Click 'Generate' to create temporary email")}
                  readOnly
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-4 text-white font-mono text-center text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
                {loading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex justify-center items-center gap-4 flex-wrap">
                <button
                  onClick={() => copyToClipboard(address, "📧 Email address copied!")}
                  disabled={!address || loading}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white rounded-lg font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Copy className="w-5 h-5" />
                  Copy Email
                </button>

                <button
                  onClick={generateNewEmail}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-cyan-500/20 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                  {loading ? "Creating..." : "Generate New Email"}
                </button>

                <button
                  onClick={refreshMessages}
                  disabled={!address || loading || !accountCredentials}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white rounded-lg font-medium transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed cursor-pointer"
                >
                  <RefreshCw className="w-5 h-5" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* OTP Detection Section */}
          {otp && (
            <div className="mb-6 animate-fade-in-down">
              <div className="bg-green-900/50 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-7 h-7 text-green-400" />
                    <div>
                      <p className="text-green-300 font-semibold">🔐 Verification Code Detected</p>
                      <p className="text-2xl font-mono font-bold text-white tracking-widest">{otp}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(otp, "🔐 OTP code copied!")}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Connection Status */}
          {address && (
            <div className="mb-4">
              <div className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                isListening
                  ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                  : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isListening ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                }`}></div>
                <span>
                  {isListening ? '🟢 Live - Checking for emails every 1 second' : '🟡 Connected - Click refresh to check for emails'}
                </span>
              </div>
            </div>
          )}

          {/* Inbox Section */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-cyan-400" />
              Inbox
              {isListening && messages.length === 0 && <Loader2 className="w-5 h-5 animate-spin" />}
              {messages.length > 0 && (
                <span className="bg-cyan-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {messages.length}
                </span>
              )}
            </h3>

            <div className="bg-gray-900/50 rounded-lg border border-gray-700 min-h-64 max-h-96 overflow-y-auto p-2">
              {messages.length > 0 ? (
                <div className="space-y-3">
                  {messages.map((msg, index) => (
                    <article key={msg.id || index} className="bg-gray-800/60 rounded-lg p-4 border border-gray-700 hover:border-cyan-500/50 transition-all animate-fade-in-down">
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <p className="font-semibold text-white truncate">
                          📨 From: {msg.from?.address || msg.from?.name || 'Unknown sender'}
                        </p>
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <Clock className="w-3 h-3" />
                          <time dateTime={msg.createdAt}>
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Just now'}
                          </time>
                        </div>
                      </div>
                      <h4 className="text-cyan-300 font-medium mb-2">
                        📄 {msg.subject || 'No subject'}
                      </h4>
                      <div className="bg-gray-900/50 rounded p-3 border border-gray-700/50">
                        <p className="text-gray-300 text-sm whitespace-pre-wrap">
                          {msg.text || msg.intro || 'No content available'}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 text-center">
                  <Mail className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg font-medium">
                    {isListening ? "📡 Waiting for new messages..." : "📪 Your inbox is empty"}
                  </p>
                  <p className="text-sm">
                    {isListening
                      ? "Emails will appear here automatically when received"
                      : "Generate an email address to start receiving messages"
                    }
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        <footer className="text-center py-6 text-gray-500 text-sm">
          <p>🚀 Powered by mail.tm API • 🔒 Temporary & Secure • 🆓 Completely Free</p>
          <p className="mt-2 text-xs">If you encounter issues, try refreshing or generating a new email</p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}