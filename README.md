# Opportunity Prompt Studio

Opportunity Prompt Studio is a production-ready static web application for generating expert AI prompts for market research, opportunity assessment, startup validation, competitive intelligence, customer discovery, product research, market sizing, trend analysis, and AI/SaaS opportunity discovery.

The app is designed for ChatGPT, Codex, Claude, Gemini, Grok, DeepSeek, Perplexity, and local LLM workflows. It runs entirely in the browser, requires no backend, uses no paid APIs, and can be deployed directly to GitHub Pages.

## Features

- **Prompt generator engine** for market research, opportunity assessment, startup validation, competitive analysis, and AI opportunity discovery.
- **250 built-in templates** generated from five expert template categories with 50 prompts each.
- **Framework library** covering SWOT, Porter's Five Forces, JTBD, Lean Startup, Blue Ocean Strategy, First Principles, and Opportunity Scoring.
- **Customizable prompt parameters** for industry, geography, customer type, research depth, output format, topic, and context.
- **Weighted opportunity scoring generator** with adjustable weights for revenue potential, speed to revenue, competition, complexity, scalability, and defensibility.
- **Prompt chaining** for market research, competitor analysis, customer discovery, opportunity scoring, GTM, monetization, and roadmap planning.
- **Saved workspace** powered by browser `localStorage` with save, edit, favorite, delete, and copy actions.
- **Export support** for TXT, Markdown, and JSON.
- **Knowledge assets** for TAM, SAM, SOM, CAC, LTV, market validation, product-market fit, competitive moats, and network effects.
- **Responsive UX** with dark mode, light mode, search, filtering, and keyboard-friendly form controls.

## Project Structure

```text
.
├── index.html                 # Static application shell
├── package.json               # Test and build scripts
├── README.md                  # Project and deployment documentation
├── docs/
│   ├── components.md          # UI component documentation
│   ├── examples.md            # Example generated prompts and use cases
│   └── prompt-engine.md       # Prompt generation engine documentation
├── scripts/
│   └── build.js               # Static build sanity check
├── src/
│   ├── app.js                 # Browser UI, state, localStorage, exports
│   ├── promptData.js          # Template categories, frameworks, glossary, scoring factors
│   ├── promptEngine.js        # Pure prompt generation functions
│   └── styles.css             # Responsive theme and layout styles
└── tests/
    └── prompt-engine.test.js  # Node-based prompt engine tests
```

## Local Development

No install step is required because the app has no third-party runtime dependencies.

```bash
npm test
npm run build
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## GitHub Pages Deployment

### Option 1: Deploy from branch

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing this app and the repository root folder.
5. Save. GitHub Pages will serve `index.html` directly.

### Option 2: Deploy from `/docs`

This app is already root-deployable. If your repository requires `/docs` deployment, copy `index.html`, `src/`, `docs/`, and static assets into the Pages source folder and keep relative paths unchanged.

## Production Notes

- The application is static and offline-capable after initial load because all prompt data and logic are bundled as local JavaScript modules.
- User prompts are stored only in the browser's localStorage.
- The prompt engine is intentionally pure and framework-agnostic so future modules can add AI prompt optimization, web search integration, opportunity databases, startup idea databases, market intelligence dashboards, and agent workflows.

## Sample Test Cases

- Verify the engine exposes exactly 250 templates.
- Generate a prompt with custom scoring weights and confirm the weights appear in the output.
- Generate a seven-step prompt chain and confirm each workflow step is present.
- Save a prompt, reload the page, edit it, favorite it, copy it, and delete it from localStorage.
- Export the generated prompt as TXT, Markdown, and JSON.
- Toggle between dark and light mode on desktop and mobile viewport widths.

## Browser Support

The app uses modern ES modules, `localStorage`, `Blob`, and the Clipboard API. It is intended for current versions of Chrome, Edge, Firefox, and Safari.
