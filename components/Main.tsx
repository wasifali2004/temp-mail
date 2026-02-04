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
  from: MessageFrom;
  to: MessageTo[];
  subject: string;
  intro: string;
  text?: string;
  createdAt: string;
}

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

  // --- Function to fetch messages ---
  const fetchMessages = useCallback(async (): Promise<void> => {
    if (!address) return;

    try {
      const response = await fetch(`/api/email/messages?address=${encodeURIComponent(address)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }

      const data = await response.json();
      
      let messageList: EmailMessage[] = [];
      if (Array.isArray(data)) {
        messageList = data;
      }

      setMessages(messageList);

      for (const message of messageList) {
        const textContent = message.text || message.intro || '';
        const foundOtp = extractOTP(textContent);
        if (foundOtp && foundOtp !== otp) {
          setOtp(foundOtp);
          showToast(`OTP Found: ${foundOtp}`, 'success');
          break; // Stop at first found OTP
        }
      }
    } catch (fetchError: unknown) {
      console.error('Fetch messages error:', fetchError);
      // Don't show toast on every poll error to avoid spamming
      if (!isListening) {
          showToast('Failed to fetch messages', 'error');
      }
    }
  }, [address, extractOTP, otp, showToast, isListening]);

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
  }, []);

  // --- Function to start polling for messages ---
  const startPolling = useCallback((): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsListening(true);
    fetchMessages();

    // Poll every 15 seconds to be polite to the backend/API
    intervalRef.current = setInterval(() => {
      fetchMessages();
    }, 15000);
  }, [fetchMessages]);

  // --- Function to initialize and generate an account ---
  const generateNewEmail = useCallback(async (): Promise<void> => {
    if (isGenerating.current) return;
    isGenerating.current = true;

    cleanupSession();
    setLoading(true);
    showToast("Creating new temporary email account...", 'info');

    try {
      const response = await fetch('/api/email/generate');
      
      if (!response.ok) {
        throw new Error('Failed to generate email');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (!data.address) {
        throw new Error("No address received from server");
      }

      const newAddress = data.address;
      setAddress(newAddress);
      showToast(`New email created: ${newAddress}`, 'success');

      // Wait a bit before starting to poll
      setTimeout(() => {
         // We can't call startPolling directly here because it depends on the updated 'address' state
         // Instead, we'll set a flag or rely on useEffect if needed, or just let the user click refresh/start.
         // But better UX is auto-start.
         // Since 'address' is in the closure of the next render, current startPolling won't see it immediately inside this function
         // We will trigger a manual fetch/poll start via a useEffect when address changes? 
         // Or just cheat and pass the address to a specialized poll starter.
      }, 500);

    } catch (generateError: unknown) {
      showToast(generateError instanceof Error ? generateError.message : "Failed to create email account", 'error');
      cleanupSession();
    } finally {
      setLoading(false);
      isGenerating.current = false;
    }
  }, [showToast, cleanupSession]);

  // Effect to start polling when address is successfully set
  useEffect(() => {
    if (address && !isListening) {
        startPolling();
        showToast("📡 Inbox is live! Waiting for messages...", 'success');
    }
  }, [address, isListening, startPolling, showToast]);


  // --- Function to refresh messages manually ---
  const refreshMessages = useCallback(async (): Promise<void> => {
    if (!address || loading) return;

    showToast("🔄 Refreshing inbox...", 'info');
    await fetchMessages();
    showToast("✅ Inbox refreshed", 'success');
  }, [fetchMessages, loading, address, showToast]);

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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="container mx-auto p-4 max-w-4xl mt-20">
        {/* Header */}
        <header className="text-center py-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Open Mail
            </h1>
          </div>
          <p className="text-gray-500 text-lg">
            Generate free, disposable email addresses with automatic OTP detection
          </p>
        </header>

        <main className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          {/* Email Generator Section */}
          <div className="mb-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="relative mb-4">
                <input
                  type="text"
                  value={loading ? "⚡ Generating new email address..." : (address || "Click 'Generate' to create temporary email")}
                  readOnly
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-gray-900 font-mono text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                />
                {loading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex justify-center items-center gap-4 flex-wrap">
                <button
                  onClick={() => copyToClipboard(address, "📧 Email address copied!")}
                  disabled={!address || loading}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 disabled:bg-gray-100 disabled:opacity-50 text-gray-700 rounded-lg font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  <Copy className="w-5 h-5" />
                  Copy Email
                </button>

                <button
                  onClick={generateNewEmail}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/30 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                  {loading ? "Creating..." : "Generate New Email"}
                </button>

                <button
                  onClick={refreshMessages}
                  disabled={!address || loading}
                  className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 disabled:bg-gray-100 disabled:opacity-50 text-gray-700 rounded-lg font-medium transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed cursor-pointer shadow-sm"
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
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-2">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-green-700 font-semibold text-sm mb-1">🔐 Verification Code Detected</p>
                      <p className="text-3xl font-mono font-bold text-gray-900 tracking-widest">{otp}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(otp, "🔐 OTP code copied!")}
                    className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <Copy className="w-5 h-5" />
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
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isListening ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                }`}></div>
                <span>
                  {isListening ? '🟢 Live - Checking for emails every 5 seconds' : '🟡 Connected - Poll stopped'}
                </span>
              </div>
            </div>
          )}

          {/* Inbox Section */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              Inbox
              {isListening && messages.length === 0 && <span className="text-xs font-normal text-gray-500 animate-pulse">Scanning...</span>}
              {messages.length > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {messages.length}
                </span>
              )}
            </h3>

            <div className="bg-gray-50 rounded-lg border border-gray-200 min-h-64 max-h-96 overflow-y-auto p-2">
              {messages.length > 0 ? (
                <div className="space-y-3">
                  {messages.map((msg, index) => (
                    <article key={msg.id || index} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-400 transition-all animate-fade-in-down shadow-sm">
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <div className="font-semibold text-gray-900 truncate flex-1 min-w-0">
                          📨 From: {msg.from?.address || msg.from?.name || 'Unknown sender'}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          <time dateTime={msg.createdAt}>
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Just now'}
                          </time>
                        </div>
                      </div>
                      <h4 className="text-blue-600 font-medium mb-2 truncate">
                        📄 {msg.subject || 'No subject'}
                      </h4>
                      <div className="bg-gray-50 rounded p-3 border border-gray-200 opacity-90 overflow-hidden">
                        <p className="text-gray-600 text-sm whitespace-pre-wrap font-mono">
                          {msg.text || msg.intro || 'No content available'}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-center">
                  <Mail className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg font-medium">
                    {isListening ? "📡 Waiting for new messages..." : "📪 Your inbox is empty"}
                  </p>
                  <p className="text-sm mt-2 max-w-xs text-gray-400">
                    {isListening
                      ? "Emails will appear here automatically when received. We check every 5 seconds."
                      : "Generate an email address to start receiving messages"
                    }
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        <footer className="text-center py-6 text-gray-500 text-sm">
          <p>🚀 Powered by Temp Mail API • 🔒 Temporary & Secure • 🆓 Completely Free</p>
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