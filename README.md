# PA Unplugged Action Guide

A React app for the Ed Tech Action Guide.

## Setup

1. **Add your logo**: Place your horizontal logo file as `public/logo.png` (this shows on the PDF)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run locally**:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

### Option 1: Via GitHub (Recommended)

1. Create a new repository on GitHub
2. Push this folder to the repository
3. Go to [vercel.com](https://vercel.com) and sign in
4. Click "Add New Project"
5. Import your GitHub repository
6. Vercel will auto-detect Vite settings - just click "Deploy"

### Option 2: Via Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in this folder
3. Follow the prompts

## Embed on Squarespace

After deploying, you'll get a URL like `https://your-project.vercel.app`

Add this to Squarespace:
1. Add a "Code" block where you want the guide
2. Paste this embed code:

```html
<iframe
  src="https://your-project.vercel.app"
  width="100%"
  height="800"
  frameborder="0"
  style="border: none; max-width: 100%;">
</iframe>
```

Adjust the height as needed.
