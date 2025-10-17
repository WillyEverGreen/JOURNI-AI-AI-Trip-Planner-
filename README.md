# AI-Trip Planner

Minimal README to get the project running locally and ready to push to GitHub.

## Quick setup

1. Copy `.env.local.example` to `.env.local` and fill in your keys (do NOT commit `.env.local`).

2. Install deps:

```bash
npm install
```

3. Start local servers in two terminals:

```bash
# Terminal 1 - API
npm run serve-api

# Terminal 2 - Frontend
npm run dev
```

Open the Vite Local URL (printed by the `npm run dev` command).

## GitHub

1. Create a new repo on GitHub.
2. Add remote and push:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:yourusername/your-repo.git
git push -u origin main
```

## CI

This repo includes a minimal GitHub Actions workflow that installs dependencies and runs ESLint on push.# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
