**Firebase Deployment Guide for University Student App Screens (Vite + React)**

This document explains step-by-step how to deploy this Vite-powered React app to Firebase Hosting. It includes local commands, production environment handling, and an optional GitHub Actions workflow for automatic deploys.

**Prerequisites**
- Node.js and npm installed
- A Firebase project (project ID will be used below; example: `campushub-99096`)
- Access to the Firebase Console for that project
- (Recommended) Firebase CLI installed

**Files in this repo relevant to deployment**
- `firebase.json` — Firebase Hosting configuration (public directory should point to Vite's output)
- `.firebaserc` — Firebase CLI project alias (contains your project ID)
- `.env.production` — Production environment variables used at build time (do NOT commit secrets)
- `package.json` — contains `build` script for Vite and `build:prod` helper

---

**1) Install dependencies (project root)**

```bash
cd "/Users/subitham/Documents/Subitha_Murugesan_Elissa/COURSE/Final code/University Student App Screens (2)"
npm install
```

If you see permissions errors (EACCES), fix your npm cache/permissions first (example):

```bash
# Clear npm cache
npm cache clean --force
# Fix permissions if needed (use your correct UID:GID if different)
sudo chown -R $(id -u):$(id -g) ~/.npm
```

---

**2) Install Firebase CLI (globally)**

If you don't have the Firebase CLI installed:

```bash
# Option A: global install (may require sudo)
sudo npm install -g firebase-tools

# Option B: use npx without global install
npx firebase-tools init
```

---

**3) Login to Firebase CLI**

```bash
firebase login
```

This opens a browser to authenticate. After login, you can run `firebase projects:list` to see your projects.

---

**4) Initialize Firebase in the project (one-time)**

If you did not already run `firebase init` in this folder, run it now and follow prompts.

```bash
firebase init
```

During `firebase init`:
- Select `Hosting: Configure files for Firebase Hosting` (spacebar to select)
- Choose `Use an existing project` and select your project (or create a new one on Firebase Console)
- When asked for `public` directory, enter `build` (this project uses Vite output `build`)
- Configure as single-page app? -> `y`
- Do not overwrite `index.html` if asked (choose `n` if prompted to overwrite)

If you prefer to skip interactive init, create `.firebaserc` and `firebase.json` manually:

`.firebaserc` example:
```json
{
  "projects": {
    "default": "<YOUR_PROJECT_ID>"
  }
}
```

`firebase.json` example (this repo uses `build` folder):
```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json","**/.*","**/node_modules/**"],
    "rewrites": [ { "source": "**", "destination": "/index.html" } ]
  }
}
```

Replace `<YOUR_PROJECT_ID>` with your Firebase project ID.

---

**5) Provide production environment variables**

This app uses Vite. Vite injects variables that start with `VITE_` at build-time. Create a file named `.env.production` (do NOT commit secrets):

```
VITE_GEMINI_API_KEY=your_production_api_key_here
```

Note: Client-side environment variables are visible to users. Do NOT place sensitive server-only secrets in client env vars. Consider using a serverless backend (Cloud Functions or other) for sensitive API calls.

---

**6) Build the app for production**

```bash
npm run build
```

Vite will output a production-ready folder at `build/` (this repo is already configured to output to `build`).

---

**7) Deploy to Firebase Hosting**

If you set up `.firebaserc` with `default` project or used `firebase init`, simply run:

```bash
firebase deploy
```

Or specify project explicitly:

```bash
firebase deploy --project <YOUR_PROJECT_ID>
```

After a successful deploy you'll see a Hosting URL such as `https://<PROJECT_ID>.web.app`.

---

**8) Verify the deployment and test features**
- Open the hosting URL in a browser
- Test the chatbot and other features
- If the chatbot returns errors, check the browser console and network tab. Ensure the site was built with the correct `VITE_GEMINI_API_KEY` (build-time value)

---

**9) Troubleshooting & Notes**
- If Firebase says the public directory does not exist, ensure you ran `npm run build` and that `firebase.json` `public` property matches the build output (`build`)
- If you receive EACCES npm errors, adjust npm permissions (see step 1)
- Large bundle warnings are non-blocking; consider code-splitting if needed
- Avoid committing `.env.production`. Use CI secrets for automated deployments

---

**10) Optional: Automatic deploy with GitHub Actions**

Create `.github/workflows/firebase-hosting.yml` with the following content (example):

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Build
        env:
          VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
        run: npm run build
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
          channelId: live
```

Steps to use this workflow:
- Add `VITE_GEMINI_API_KEY` to GitHub repository secrets (Settings → Secrets)
- Create a Firebase service account JSON and add it to `FIREBASE_SERVICE_ACCOUNT` (store the JSON as a secret string)
- Push to `main` branch — the action will build and deploy

---

**Security recommendation**
- Client-side API keys are exposed in built code. For sensitive operations, create a secure server endpoint (Cloud Function or other) and keep server secrets in environment variables not bundled into the client.

---

If you'd like, I can:
- Add the GitHub Actions workflow file to this repo
- Configure environment variables for CI
- Set up a serverless function to proxy the Gemini requests securely

Tell me which of the above you'd like me to do next and I will implement it for you.
