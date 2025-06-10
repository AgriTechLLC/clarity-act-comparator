# Deploying Your Clarity ACT Comparator App

This guide will walk you through the steps to deploy your application.

## 1. Set Your Gemini API Key

Your application uses the Gemini API, which requires an API key. This key needs to be available as an environment variable named `GEMINI_API_KEY`.

**For Local Development:**

Create a file named `.env` in the root of your project and add the following line:

```
GEMINI_API_KEY="your_gemini_api_key_here"
```

Replace `"your_gemini_api_key_here"` with your actual Gemini API key. This file is included in the `.gitignore` and should not be committed to your repository.

**For Production Deployment:**

When you deploy your application to a hosting service, you will need to set the `GEMINI_API_KEY` as an environment variable in the settings of your hosting provider. Refer to the documentation of your chosen hosting service for instructions on how to set environment variables.

## 2. Build Your Application

Before you can deploy, you need to build the application. This process will compile your code and assets into a `dist` directory.

1.  **Install Dependencies:** If you haven't already, open your terminal and run:

    ```bash
    npm install
    ```

2.  **Build the Project:** Run the build command:

    ```bash
    npm run build
    ```

This will create a `dist` folder in your project's root directory. This folder contains all the static files for your application.

## 3. Deploy to a Hosting Service

You can deploy the contents of the `dist` directory to any static web hosting service. Here are a few popular options:

### Vercel

Vercel is a popular platform for deploying front-end applications.

1.  Sign up for a Vercel account and connect your Git repository.
2.  Import your project into Vercel.
3.  Vercel will automatically detect that you are using Vite.
4.  Configure your project settings:
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
    *   **Install Command:** `npm install`
5.  Add your `GEMINI_API_KEY` as an environment variable in the project settings on Vercel.
6.  Deploy your project.

### Netlify

Netlify is another excellent option for deploying static sites.

1.  Sign up for a Netlify account and connect your Git repository.
2.  Create a new site from your repository.
3.  Configure your build settings:
    *   **Build command:** `npm run build`
    *   **Publish directory:** `dist`
4.  Add your `GEMINI_API_KEY` as an environment variable in your site's settings under "Build & deploy" > "Environment".
5.  Trigger a deploy.

### GitHub Pages

You can also host your application for free on GitHub Pages.

1.  Your code needs to be in a GitHub repository.
2.  You will need to configure your `vite.config.ts` to set the correct base path for your repository. If your repository is at `https://github.com/your-username/your-repo-name`, you need to add a `base` property to your `vite.config.ts`:

    ```javascript
    // vite.config.ts
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      base: '/your-repo-name/', // Set this to your repository name
      plugins: [react()],
      // ... other config
    });
    ```

3.  Build your application with `npm run build`.
4.  Commit and push the `dist` directory to your GitHub repository (you might need to remove `dist` from your `.gitignore` file).
5.  In your repository's settings, go to the "Pages" section and select the `gh-pages` branch (or the main branch with the `/dist` folder) as the source for GitHub Pages.

After following these steps, your application will be deployed and accessible via a public URL. 