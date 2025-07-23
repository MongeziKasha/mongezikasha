# YouTube API Setup Guide

This guide will help you set up the YouTube Data API v3 to automatically fetch all your YouTube videos for display on your website.

## Step 1: Get YouTube Data API Key

1. Go to the [Google Cloud Console](https://console.developers.google.com)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

## Step 2: Find Your YouTube Channel ID

### Method 1: From YouTube Studio
1. Go to [YouTube Studio](https://studio.youtube.com)
2. Look at the URL - your channel ID is after `/channel/`
3. Example: `https://studio.youtube.com/channel/UCAbCdEfGhIjKlMnOpQrStUv` → Channel ID: `UCAbCdEfGhIjKlMnOpQrStUv`

### Method 2: From Your Channel URL
1. Go to your YouTube channel
2. Right-click and "View Page Source"
3. Search for `"externalId"` - the value is your channel ID

### Method 3: Using Online Tools
- Use a tool like [commentpicker.com/youtube-channel-id.php](https://commentpicker.com/youtube-channel-id.php)
- Enter your channel URL to get the ID

## ✅ Security Status - Your API Keys Are Protected

### **What's Safe (NOT visible in GitHub):**
- `.env.local` file ✅ - Already in `.gitignore`
- `src/config/youtube.config.ts` ✅ - Added to `.gitignore`
- Environment variables ✅ - Never committed

### **What's Public (Safe to commit):**
- `src/config/youtube.config.template.ts` ✅ - Template without real keys

## Step 3: Configure Your Project Securely

Your YouTube page is now smart! It automatically detects your environment and uses the appropriate configuration method:

### Method 1: Environment Variables (Recommended for Production)

Set these environment variables in your hosting platform:
- `REACT_APP_YOUTUBE_CHANNEL_ID`: Your YouTube channel ID
- `REACT_APP_YOUTUBE_API_KEY`: Your YouTube Data API key

**For different platforms:**
- **Netlify**: Site settings → Environment variables
- **Vercel**: Project settings → Environment variables  
- **GitHub Pages**: Repository secrets (if using GitHub Actions)

### Method 2: Config File (Recommended for Development)

1. Copy the template: `src/config/youtube.config.template.ts` → `src/config/youtube.config.ts`
2. Update with your actual keys:
```typescript
export const YOUTUBE_CONFIG = {
  CHANNEL_ID: 'YOUR_ACTUAL_CHANNEL_ID_HERE', // Replace with your YouTube channel ID
  API_KEY: 'your_actual_api_key_here' // Replace with your actual API key
};
```

### Automatic Detection

The YouTube page will automatically:
1. ✅ **Production**: Use environment variables if available
2. ✅ **Development**: Fallback to config file if environment variables aren't set
3. ✅ **Fallback**: Show sample videos if neither is configured

### For Production (Environment Variables)
Set the environment variable in your hosting platform:
- **Netlify**: Site settings → Environment variables
- **Vercel**: Project settings → Environment variables
- **GitHub Pages**: Repository secrets (if using GitHub Actions)

## Step 4: Test Your Setup

**✅ No code changes needed!** The YouTube page is already configured to automatically detect your setup.

### Local Testing:
1. Run your development server: `npm start`
2. Navigate to `/youtube`
3. You should see:
   - Your actual YouTube videos (if config file is set up)
   - Sample videos (if no configuration is found)

### Production Testing:
1. Deploy your site with environment variables configured
2. The page will automatically use the environment variables
3. Your real YouTube videos will be displayed

## Troubleshooting

### Common Issues:

1. **"Failed to fetch videos"**
   - Check your API key is correct
   - Ensure YouTube Data API v3 is enabled
   - Verify your channel ID is correct

2. **API Quota Exceeded**
   - YouTube API has daily quotas
   - Consider caching results or reducing fetch frequency

3. **CORS Issues**
   - YouTube API should work from browser, but if issues occur, consider using a serverless function

### API Quotas:
- YouTube Data API v3 has a default quota of 10,000 units per day
- Each request to fetch videos costs about 1-5 units
- This should be sufficient for most personal websites

## Alternative: RSS Feed Method (No API Key Required)

If you prefer not to use the API, you can fetch videos using YouTube's RSS feed:

```typescript
// Alternative method using RSS (no API key needed)
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
```

However, this provides less data (no view counts, descriptions are truncated, etc.).

## Security Notes

- Never commit API keys to version control
- Use environment variables for production
- Consider implementing rate limiting if you expect high traffic
- The API key should be restricted to YouTube Data API v3 only

That's it! Your YouTube page will now automatically display all your videos. 🎉
