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
