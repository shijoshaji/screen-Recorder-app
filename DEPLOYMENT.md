# 🚀 Deploying to GitHub Pages

This guide will help you deploy your Screen Recorder app to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- Your screen recorder app files

## Step-by-Step Deployment Guide

### Step 1: Install Git (If Not Already Installed)

1. Download Git from [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Run the installer and follow the installation wizard
3. Verify installation by opening a new terminal/command prompt and running:
   ```bash
   git --version
   ```

### Step 2: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `screen-recorder-app` (or your preferred name)
   - **Description**: "A modern screen recorder web application"
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** initialize with README (we already have files)
5. Click **"Create repository"**

### Step 3: Initialize Git in Your Project

Open a terminal/command prompt in your project directory and run:

```bash
# Navigate to your project directory
cd "e:\Githubs Repo\screen Recorder app"

# Initialize Git repository
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Screen Recorder App"

# Rename the default branch to main (if needed)
git branch -M main
```

### Step 4: Connect to GitHub Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/screen-recorder-app.git

# Verify the remote was added
git remote -v
```

### Step 5: Push to GitHub

```bash
# Push your code to GitHub
git push -u origin main
```

You may be prompted to enter your GitHub credentials:
- **Username**: Your GitHub username
- **Password**: Use a [Personal Access Token](https://github.com/settings/tokens) (not your account password)

> **Note**: GitHub no longer accepts account passwords for Git operations. You need to create a Personal Access Token:
> 1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
> 2. Click "Generate new token (classic)"
> 3. Give it a name, select `repo` scope, and generate
> 4. Copy the token and use it as your password

### Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **"Save"**

### Step 7: Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 1-3 minutes
- You'll see a message: "Your site is published at `https://YOUR_USERNAME.github.io/screen-recorder-app/`"

### Step 8: Access Your Live App

Your app will be available at:
```
https://YOUR_USERNAME.github.io/screen-recorder-app/
```

## 🔄 Updating Your App

Whenever you make changes to your app:

```bash
# Add the changed files
git add .

# Commit the changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

GitHub Pages will automatically redeploy your site within a few minutes.

## 🎨 Custom Domain (Optional)

If you want to use a custom domain:

1. Buy a domain from a domain registrar
2. In your repository settings → Pages → Custom domain
3. Enter your domain name
4. Configure DNS settings at your domain registrar:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`
5. Wait for DNS propagation (can take up to 48 hours)

## 🐛 Troubleshooting

### Issue: Git is not recognized
**Solution**: Install Git from [git-scm.com](https://git-scm.com/downloads) and restart your terminal

### Issue: Permission denied (publickey)
**Solution**: Use HTTPS instead of SSH, or [set up SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### Issue: Site not updating
**Solution**: 
- Clear your browser cache
- Wait a few minutes for GitHub to rebuild
- Check the Actions tab in your repository for build status

### Issue: 404 Error
**Solution**: 
- Verify GitHub Pages is enabled in repository settings
- Ensure `index.html` is in the root directory
- Check that the branch and folder are correctly set

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Desktop](https://desktop.github.com/) - GUI alternative to command line

## ✅ Quick Checklist

- [ ] Git installed and verified
- [ ] GitHub repository created
- [ ] Local repository initialized
- [ ] Files committed to Git
- [ ] Remote repository connected
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Site is live and accessible

---

**Need Help?** Check the [GitHub Community Forum](https://github.community/) or open an issue in your repository.
