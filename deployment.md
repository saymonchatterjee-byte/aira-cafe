# Aira Cafe — Deployment Guide (GitHub Pages)

This guide walks you through deploying Aira Cafe to **GitHub Pages**, which provides free HTTPS hosting — essential for Supabase API calls that require a secure origin.

---

## Prerequisites

- A [GitHub](https://github.com) account
- [Git](https://git-scm.com/) installed on your machine
- Your Supabase project already set up (tables, policies, realtime enabled)

---

## Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `aira-cafe` (or any name you prefer)
3. **Visibility**: Public (required for free GitHub Pages)
4. **Do NOT** initialize with README, `.gitignore`, or license
5. Click **Create repository**

---

## Step 2: Initialize & Push Your Code

Open a terminal in your project folder (`AIRA/`) and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Aira Cafe - Premium build"

# Set the main branch
git branch -M main

# Add your GitHub repo as remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/aira-cafe.git

# Push to GitHub
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon) in the top menu
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**
6. Wait 1–2 minutes for the deployment to complete

---

## Step 4: Access Your Live Site

Your site will be live at:

```
https://YOUR_USERNAME.github.io/aira-cafe/
```

- **Customer Menu**: `https://YOUR_USERNAME.github.io/aira-cafe/index.html`
- **Kitchen Dashboard**: `https://YOUR_USERNAME.github.io/aira-cafe/admin.html`

> **Note**: GitHub Pages automatically provides HTTPS, which is required for Supabase API calls. This solves any CORS/mixed-content issues you may encounter when testing locally via `file://` protocol.

---

## Step 5: Verify HTTPS & Supabase Connectivity

1. Open your deployed site in a browser
2. Check that the URL shows `https://` (padlock icon)
3. Open browser DevTools → Console tab
4. Add an item to cart, place an order, and verify:
   - No CORS errors in the console
   - Order appears in your Supabase dashboard (`orders` table)
5. Open `admin.html` and verify paid orders appear

---

## Updating Your Site

Whenever you make changes, push to GitHub and the site auto-updates:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

GitHub Pages will redeploy within ~1 minute.

---

## Optional: Custom Domain

If you want to use a custom domain (e.g., `cafe.aira.in`):

1. In GitHub repo → **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Click **Save**
4. Add a **CNAME** DNS record pointing to `YOUR_USERNAME.github.io`
5. Wait for DNS propagation (up to 24 hours)
6. GitHub will automatically provision an SSL certificate

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 on page load | Ensure `index.html` is in the repository root, not a subfolder |
| Supabase errors | Verify your anon key and URL in `app.js` match your Supabase project |
| CORS errors | Ensure you're accessing via `https://`, not `http://` or `file://` |
| Images not loading | Check that image paths are relative (e.g., `images/hero-1.jpg`) |
| Realtime not working | Run the `ALTER PUBLICATION` SQL from `supabase-setup.sql` |
| Old version showing | Hard refresh with `Ctrl+Shift+R` or clear browser cache |

---

## Local Development

For local testing with HTTPS (to avoid CORS issues), you can use:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using VS Code
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

> **Note**: Local `http://` may work for most Supabase operations, but `file://` protocol will **not** work due to browser security restrictions. Always use a local server.

---

## File Structure Reference

```
aira-cafe/
├── index.html          → Customer-facing menu & ordering
├── admin.html          → Kitchen KOT dashboard
├── style.css           → Design system & component styles
├── app.js              → Application logic & order pipeline
├── images/
│   ├── aira-logo.jpg   → Brand logo
│   ├── hero-1.jpg      → Hero carousel slide 1
│   ├── hero-2.jpg      → Hero carousel slide 2
│   └── hero-3.jpg      → Hero carousel slide 3
├── supabase-setup.sql  → Database DDL & RLS policies
├── deployment.md       → This file
└── menu.csv            → Source menu data
```
