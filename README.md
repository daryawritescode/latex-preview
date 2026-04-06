# LaTeX Preview

A minimalist, high-fidelity real-time previewer for Markdown and $\\LaTeX$. Built for speed, precision, and a "modern-as-fuck" aesthetic.

![LaTeX Preview](https://github.com/daryawritescode/latex-preview/blob/main/src/assets/hero.png)

## Core Features
- **Zero Latency Rendering**: Powered by [KaTeX](https://katex.org/) and `react-markdown`.
- **Modern UI**: Dark-mode first design with glassmorphic interfaces and buttery smooth animations via `framer-motion`.
- **Zen Mode**: Focus on your equations with a single-click fullscreen environment.
- **Local Persistence**: Automatically caches your work to `localStorage` so you never lose a derivation.
- **Copy & Export**: Quick-action buttons to copy raw code or clear the workspace.

## Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Build Engine**: [Vite 8](https://vitejs.dev/) (Next-gen bundling)
- **Styling**: Vanilla Modern CSS (Glassmorphism / Neon design system)
- **Icons**: [Lucide React](https://lucide.dev/)
- **CI/CD**: GitHub Actions with automated deployment to GitHub Pages.

## Getting Started

### Local Development
```bash
# Clone the repo
git clone https://github.com/daryawritescode/latex-preview.git

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Building for Production
```bash
# Build & Lint
npm run build

# Preview build
npm run preview
```

## Infrastructure & CI/CD
The project uses GitHub Actions for automated quality control:
- **Linting**: Strict ESLint flat-config enforcement.
- **Type Checking**: TypeScript 5.9 strict mode.
- **Automated Deployment**: Every push to `main` is automatically built and deployed to [GitHub Pages](https://daryawritescode.github.io/latex-preview/).

## License
MIT License. Feel free to fork and build your own genius.
