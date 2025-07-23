# Production Deployment Guide

This guide explains how to deploy your Docusaurus site with YouTube integration to various hosting platforms.

## Environment Variables Required

For the YouTube integration to work in production, you need to set these environment variables:

- `REACT_APP_YOUTUBE_CHANNEL_ID`: Your YouTube channel ID
- `REACT_APP_YOUTUBE_API_KEY`: Your YouTube Data API key

> ⚠️ **Important**: In production, the site will ONLY use environment variables. The config file is ignored for security.

## Platform-Specific Instructions

### 🚀 Netlify

1. **Via Netlify Dashboard:**
   - Go to your site's dashboard
   - Navigate to **Site settings** → **Environment variables**
   - Click **Add a variable**
   - Add both variables:
     - `REACT_APP_YOUTUBE_CHANNEL_ID` = `your_channel_id_here`
     - `REACT_APP_YOUTUBE_API_KEY` = `your_api_key_here`

2. **Via netlify.toml file:**
   ```toml
   [build.environment]
     REACT_APP_YOUTUBE_CHANNEL_ID = "your_channel_id_here"
     REACT_APP_YOUTUBE_API_KEY = "your_api_key_here"
   ```

3. **Deploy:**
   ```bash
   npm run build
   # Files are automatically deployed from your git repository
   ```

### ▲ Vercel

1. **Via Vercel Dashboard:**
   - Go to your project's dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add both variables for **Production**, **Preview**, and **Development**:
     - `REACT_APP_YOUTUBE_CHANNEL_ID` = `your_channel_id_here`
     - `REACT_APP_YOUTUBE_API_KEY` = `your_api_key_here`

2. **Via vercel.json file:**
   ```json
   {
     "env": {
       "REACT_APP_YOUTUBE_CHANNEL_ID": "your_channel_id_here",
       "REACT_APP_YOUTUBE_API_KEY": "your_api_key_here"
     }
   }
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### 🐙 GitHub Pages (with GitHub Actions)

1. **Set Repository Secrets:**
   - Go to your repository → **Settings** → **Secrets and variables** → **Actions**
   - Add both secrets:
     - `REACT_APP_YOUTUBE_CHANNEL_ID`
     - `REACT_APP_YOUTUBE_API_KEY`

2. **Create `.github/workflows/deploy.yml`:**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build website
           run: npm run build
           env:
             REACT_APP_YOUTUBE_CHANNEL_ID: ${{ secrets.REACT_APP_YOUTUBE_CHANNEL_ID }}
             REACT_APP_YOUTUBE_API_KEY: ${{ secrets.REACT_APP_YOUTUBE_API_KEY }}
             
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./build
   ```

### 🌐 Other Platforms

#### Cloudflare Pages
```bash
# Set environment variables in Cloudflare Pages dashboard
REACT_APP_YOUTUBE_CHANNEL_ID = your_channel_id_here
REACT_APP_YOUTUBE_API_KEY = your_api_key_here
```

#### Heroku
```bash
heroku config:set REACT_APP_YOUTUBE_CHANNEL_ID=your_channel_id_here
heroku config:set REACT_APP_YOUTUBE_API_KEY=your_api_key_here
```

#### Firebase Hosting
```bash
# Add to firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*",
        "headers": [
          {
            "key": "REACT_APP_YOUTUBE_CHANNEL_ID",
            "value": "your_channel_id_here"
          }
        ]
      }
    ]
  }
}
```

## Testing Your Deployment

1. **Deploy your site** using your chosen platform
2. **Visit the `/youtube` page** on your live site
3. **Verify** that your actual YouTube videos are displayed (not the fallback sample videos)

## Troubleshooting

### Videos Not Loading
- ✅ Check environment variables are set correctly
- ✅ Verify your API key has YouTube Data API v3 enabled
- ✅ Ensure your channel ID is correct
- ✅ Check browser console for error messages

### API Quota Issues
- YouTube API has daily limits (10,000 units/day by default)
- Consider implementing caching if you have high traffic
- Monitor usage in Google Cloud Console

### CORS Issues
If you encounter CORS issues:
1. Verify you're using the correct API endpoints
2. Check your API key restrictions in Google Cloud Console
3. Consider using a serverless function as a proxy if needed

## Security Best Practices

✅ **Environment variables** - Used in production  
✅ **No secrets in code** - Config files are gitignored  
✅ **API key restrictions** - Limit to YouTube Data API only  
✅ **HTTPS only** - All API calls are made over HTTPS  

## Development vs Production

| Environment | Configuration Method | Security |
|-------------|---------------------|----------|
| **Development** | Config file (`youtube.config.ts`) | ✅ Gitignored |
| **Production** | Environment variables | ✅ Server-side only |
| **Fallback** | Sample videos | ✅ No API calls |

Your site is now ready for production! 🎉
