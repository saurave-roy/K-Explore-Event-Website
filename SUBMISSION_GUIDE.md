# Submission Guide — GitHub + Live Website

**You have the website source code.** To complete the assignment submission, you must publish it from **your own GitHub account** and deploy it. The ZIP file alone is **not** the two-link submission requested by the instructor.

## Step 1 — Open and Check the Project

1. Extract `K-Explore-Event-Website.zip`.
2. Open the resulting `K-Explore-Event-Website` folder in **VS Code**.
3. Install **Live Server** if you don't already have it.
4. Right-click `index.html` → **Open with Live Server**.
5. Check that the images, event search, details dialog and registration form work.

## Step 2 — Upload to GitHub Using Git

1. Sign in to [GitHub](https://github.com/).
2. Choose **New repository**.
3. Name it `K-Explore-Event-Website` and set visibility to **Public** (unless your instructor says otherwise).
4. Create an **empty** repository: do **not** add an initial README, `.gitignore`, or license, because the project already includes its own files.
5. In the **VS Code terminal**, make sure you are inside the extracted project folder. Run these commands:

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit: responsive K Explore event website"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/K-Explore-Event-Website.git
git push -u origin main
```

**Replace `YOUR_GITHUB_USERNAME`** with your real GitHub username. Git may ask you to sign in or configure your author name/email. If you have not yet configured Git identity, run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Use **your own** name and an email address you control. Do not copy the placeholder email literally. If you use GitHub Desktop instead, choose **Add existing repository** or **Create repository from existing files** and publish it.

Your repository link will look like:

`https://github.com/YOUR_GITHUB_USERNAME/K-Explore-Event-Website`

## Step 3 — Deploy for Free with GitHub Pages

1. Open your new GitHub repository in a browser.
2. Select **Settings** → **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Set branch to **main** and folder to **/(root)**, then select **Save**.
5. Once GitHub finishes publishing, the Pages section displays your live website link.
6. Open the live link and test it on your phone and laptop.

The site address will usually look like:

`https://YOUR_GITHUB_USERNAME.github.io/K-Explore-Event-Website/`

This is **only an example pattern**. Use the exact public URL displayed by GitHub Pages after deployment.

### Alternative: Netlify or Vercel

Instead of GitHub Pages, you can import your repository from GitHub into Netlify or Vercel. For a plain HTML/CSS/JS website, select a static site with **no build command** and publish the folder containing `index.html` as the site root. Copy the platform-provided live URL when deployment is successful.

## Step 4 — Final Verification

- [ ] The public site opens without missing assets.
- [ ] All nine event cards are visible.
- [ ] Searching by keyword works.
- [ ] Category filters work.
- [ ] Event details and registration dialogs open and close.
- [ ] Form validation catches missing/invalid values.
- [ ] A successful demo registration shows a confirmation.
- [ ] “My registrations” shows the saved entry after a page refresh on that same device/browser.
- [ ] Dark mode and mobile navigation work.
- [ ] The repository has a complete README.
- [ ] Both URLs are accessible to the instructor without signing in.

## Step 5 — Submit These Two Links

**GitHub repository:** `PASTE_YOUR_REAL_GITHUB_REPOSITORY_URL_HERE`

**Deployed website:** `PASTE_YOUR_REAL_DEPLOYED_WEBSITE_URL_HERE`

You can also include a short description:

> **K Explore — Responsive Event Management Website:** Built using HTML5, CSS3 and JavaScript. Includes searchable event cards, category filters, event details, validated registration forms, localStorage, a countdown timer, and a responsive dark/light interface.

**Reminder:** The project uses made-up events and local demo registrations. Publishing the static website does not turn it into a real booking service.
