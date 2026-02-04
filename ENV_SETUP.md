# Environment Variables Setup

This project uses environment variables to securely manage API keys and sensitive credentials. Follow these steps to set up your environment:

## Quick Start

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your credentials in the `.env` file**

## Required Environment Variables

### RapidAPI Configuration

These variables are required for the temporary email functionality:

- **`RAPIDAPI_KEY`**: Your RapidAPI key
  - Get it from: [RapidAPI Dashboard](https://rapidapi.com/)
  - Navigate to your app and copy the API key
  
- **`RAPIDAPI_HOST`**: The RapidAPI host for the TempMail service
  - Default: `tempmail-so.p.rapidapi.com`
  
- **`AUTH_TOKEN`**: Authentication token for the TempMail API
  - This is provided by the TempMail service

### Google AdSense Configuration (Optional)

- **`NEXT_PUBLIC_GOOGLE_ADSENSE_ID`**: Your Google AdSense publisher ID
  - Format: `ca-pub-xxxxxxxxxxxxxxxx`
  - Get it from: [Google AdSense](https://www.google.com/adsense/)
  - If not provided, ads will not be displayed

### Google Analytics Configuration (Optional)

- **`NEXT_PUBLIC_GA_MEASUREMENT_ID`**: Your Google Analytics Measurement ID
  - Format: `G-XXXXXXXXXX`
  - Get it from: [Google Analytics](https://analytics.google.com/)
  - If not provided, analytics will not be tracked

## Security Notes

⚠️ **IMPORTANT:**
- Never commit your `.env` file to version control
- The `.env` file is already listed in `.gitignore`
- Only commit `.env.example` with placeholder values
- Keep your API keys and tokens secure

## Troubleshooting

### Missing Environment Variables Error

If you see an error like "Missing required environment variables: RAPIDAPI_KEY or AUTH_TOKEN", make sure:

1. Your `.env` file exists in the root directory
2. All required variables are set
3. You've restarted your development server after adding/changing variables

### Development Server

After updating your `.env` file, restart your development server:

```bash
npm run dev
```

## Environment Variables Prefix

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Variables without this prefix are only available on the server-side
- This is a Next.js security feature to prevent accidental exposure of sensitive data
