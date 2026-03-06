# Wolf Depot

A simple ecommerce demo — tools, lumber & hardware. Built with React + Vite and deployed to **GitHub Pages** from the `main` branch.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`. For production (e.g. GitHub Pages), the app is built with base path `/Wolf-Depot/`.

## Deploy to GitHub Pages

1. Push this repo to GitHub (e.g. as `Wolf-Depot`).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to the `main` branch; the workflow in `.github/workflows/deploy.yml` will build and deploy.

Your site will be at: **https://&lt;username&gt;.github.io/Wolf-Depot/**

If you use a different repo name, update `base` in `vite.config.js` to match (e.g. `'/your-repo-name/'`).

## Notify QA Wolf after deploy

After each successful deploy to GitHub Pages, the workflow notifies QA Wolf so they can start a test run. To enable it:

1. **Get a trigger from QA Wolf**  
   Have a QAE representative configure a [trigger](https://www.notion.so/Triggers-a3348b3e92154d4a960bf5f7877ccc5d) for deploy-success on your main environment. The `deployment-type` in the workflow must match the value configured in that trigger (e.g. `production` or `staging`).

2. **Add the API key in GitHub**  
   In the repo: **Settings → Secrets and variables → Actions**. Add a secret named `QAWOLF_API_KEY` with your [QA Wolf API key](https://qawolf.notion.site/Deploy-Success-Webhook-dd72e46ceb7f451dae4e9ef06f64a2cc) (from the workspace settings).

3. **Optional**  
   To use a different `deployment-type` (e.g. `staging`), edit the `notify-qa-wolf` job in `.github/workflows/deploy.yml` and set the `deployment-type` input accordingly.
