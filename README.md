<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/bb3bfc2f-3607-405d-b467-93dc210fe0af

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment

This project uses GitHub Actions for CI/CD, triggering a deployment in Coolify whenever code is pushed to the `main` branch.

### Setup

1. **In Coolify:**
   - Go to your Resource (Application) settings.
   - Find the **Webhooks** section.
   - Copy the **Deploy Webhook** URL.

2. **In GitHub:**
   - Go to your repository **Settings** > **Secrets and variables** > **Actions**.
   - Create a new **Repository secret**.
   - Name: `COOLIFY_WEBHOOK`
   - Value: Paste the URL from Coolify.

The deployment will automatically run on every push to `main`, validating the build first to ensure no regressions are introduced.
