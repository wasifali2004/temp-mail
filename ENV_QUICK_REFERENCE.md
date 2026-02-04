# 🔐 Environment Variables Quick Reference

## Required Variables (Backend)

| Variable | Description | Example |
|----------|-------------|---------|
| `RAPIDAPI_KEY` | Your RapidAPI key for TempMail service | `be3ef3ef5dmsh1afb1f18f61cac0p180c25jsn388a29d41152` |
| `AUTH_TOKEN` | Authentication token for TempMail API | `FD3789BB-7DA7-3A83-6FA4-329729667B9B` |
| `RAPIDAPI_HOST` | RapidAPI host for TempMail | `tempmail-so.p.rapidapi.com` |

## Optional Variables (Frontend - Public)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` | Google AdSense Publisher ID | `ca-pub-1125717518172617` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics Measurement ID | `G-76C99GDV6W` |

## Variable Naming Convention

### `NEXT_PUBLIC_` prefix
- ✅ Exposed to the browser
- ✅ Can be used in client-side code
- ✅ Safe for non-sensitive configuration
- ❌ Never use for API keys or secrets

### No prefix
- ✅ Server-side only
- ✅ Not exposed to the browser
- ✅ Use for API keys and secrets
- ❌ Cannot be accessed in client components

## Where Each Variable is Used

### `RAPIDAPI_KEY`
- 📁 `app/api/email/generate/route.ts`
- 📁 `app/api/email/messages/route.ts`

### `AUTH_TOKEN`
- 📁 `app/api/email/generate/route.ts`
- 📁 `app/api/email/messages/route.ts`

### `RAPIDAPI_HOST`
- 📁 `app/api/email/generate/route.ts`
- 📁 `app/api/email/messages/route.ts`

### `NEXT_PUBLIC_GOOGLE_ADSENSE_ID`
- 📁 `app/layout.tsx`
- 📁 `app/page.tsx`

### `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- 📁 `app/layout.tsx`

## Quick Setup

```bash
# 1. Copy example file
cp .env.example .env

# 2. Edit .env and add your credentials
# Use your favorite text editor

# 3. Restart dev server
npm run dev
```

## Troubleshooting

### ❌ Error: "Missing required environment variables"
**Solution:** Ensure `RAPIDAPI_KEY` and `AUTH_TOKEN` are set in `.env`

### ❌ Ads not showing
**Solution:** Set `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` in `.env` (optional)

### ❌ Analytics not tracking
**Solution:** Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env` (optional)

### ❌ Changes not taking effect
**Solution:** Restart your development server

## Security Checklist

- [x] `.env` is in `.gitignore`
- [x] `.env.example` has no real credentials
- [x] API keys are not in source code
- [x] Public variables use `NEXT_PUBLIC_` prefix
- [x] Secrets have no `NEXT_PUBLIC_` prefix

## Getting API Keys

| Service | URL |
|---------|-----|
| RapidAPI | https://rapidapi.com/ |
| Google AdSense | https://www.google.com/adsense/ |
| Google Analytics | https://analytics.google.com/ |
