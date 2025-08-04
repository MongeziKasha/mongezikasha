# Comments Setup Guide (Giscus)

This guide will help you set up Giscus comments for your Docusaurus blog.

## What is Giscus?

Giscus is a comments system powered by GitHub Discussions. It's free, ad-free, and works great for developer blogs.

## Prerequisites

1. Your GitHub repository must be public
2. The Giscus app must be installed: https://github.com/apps/giscus
3. Discussions must be enabled in your repository

## Setup Steps

### Step 1: Enable GitHub Discussions

1. Go to your GitHub repository: `https://github.com/MongeziKasha/mongezikasha`
2. Click on **Settings** tab
3. Scroll down to **Features** section
4. Check the box for **Discussions**

### Step 2: Install Giscus App

1. Visit: https://github.com/apps/giscus
2. Click **Install**
3. Choose to install it on your `mongezikasha` repository

### Step 3: Get Your Repository Configuration

1. Visit: https://giscus.app
2. Enter your repository: `MongeziKasha/mongezikasha`
3. Choose **Discussion Category**: Select "General" or create a new category for comments
4. Copy the generated values:
   - `data-repo-id`
   - `data-category-id`

### Step 4: Update Your Configuration

1. Open `src/components/GiscusComments/index.tsx`
2. Replace the placeholder values:
   ```tsx
   repo="MongeziKasha/mongezikasha"
   repoId="YOUR_REPO_ID_FROM_GISCUS_APP"
   category="General"
   categoryId="YOUR_CATEGORY_ID_FROM_GISCUS_APP"
   ```

### Step 5: Test Comments

1. Start your development server: `npm start`
2. Navigate to any blog post
3. Scroll to the bottom to see the comment section
4. Test by leaving a comment (you'll need to be logged into GitHub)

## Configuration Options

The Giscus component supports many customization options:

- **Theme**: Automatically switches between light/dark based on your site theme
- **Language**: Set to "en" (English)
- **Reactions**: Enable/disable emoji reactions
- **Input Position**: Comments input can be at top or bottom

## Security & Privacy

- Comments are stored in GitHub Discussions
- Users must have a GitHub account to comment
- You can moderate comments through GitHub's interface
- No ads, no tracking

## Troubleshooting

### Comments not showing?
- Check that Discussions are enabled
- Verify Giscus app is installed
- Ensure repository is public
- Check that repo/category IDs are correct

### Wrong theme?
- The component automatically detects light/dark mode
- If needed, you can force a specific theme in the component

## Further Customization

You can customize the appearance by:
1. Modifying the container styles in the BlogPostPage component
2. Adding custom CSS for the Giscus iframe
3. Adjusting the comment position and spacing

## Alternative Comment Systems

If Giscus doesn't work for you, consider:
- **Utterances**: Similar to Giscus but uses GitHub Issues
- **Disqus**: Traditional comment system (requires account)
- **Commento**: Privacy-focused alternative
- **Facebook Comments**: Social media integration

---

**Next Steps:**
1. Enable Discussions in your GitHub repo
2. Install the Giscus app
3. Get your configuration values from giscus.app
4. Update the component with your real values
5. Test the comments functionality
