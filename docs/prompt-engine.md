# Prompt Generation Engine Documentation

The prompt engine is implemented in `src/promptEngine.js` and uses structured data from `src/promptData.js`.

## Design Goals

- Keep generation deterministic, fast, and testable.
- Avoid backend, database, and paid API dependencies.
- Keep the engine pure enough to reuse in future React, TypeScript, agent workflow, or report-generation modules.
- Produce prompts that include role assignment, structured reasoning standards, evidence requirements, output structure, risk analysis, and opportunity scoring.

## Data Model

`src/promptData.js` defines:

- `categories`: five prompt categories with tags and category-specific goals.
- `frameworks`: reusable research frameworks such as SWOT, JTBD, Lean Startup, and Opportunity Scoring.
- `outputFormats`: report and table formats that users can request from an AI model.
- `scoringFactors`: default weighted factors for opportunity assessment.
- `chainSteps`: the seven-step research workflow.
- `glossary`: built-in market research definitions.
- `buildTemplates()`: generates 50 templates per category for a total of 250 templates.

## Engine API

### `generatePrompt(options)`

Returns one fully composed prompt string using:

- selected template
- selected framework
- topic or opportunity
- industry
- geography
- customer type
- research depth
- output format
- additional user context
- weighted opportunity scoring model

### `generateChain(options)`

Returns a seven-step prompt sequence for:

1. Market Research
2. Competitor Analysis
3. Customer Discovery
4. Opportunity Scoring
5. Go-To-Market Strategy
6. Monetization Strategy
7. Execution Roadmap

### `exportPayload(prompt, options)`

Returns a JSON-safe export object with timestamp, app name, options, and prompt content.

## Extensibility

Future modules can add:

- AI-assisted prompt optimization
- research report generation
- web-search integration
- opportunity databases
- startup idea databases
- market intelligence dashboards
- agent workflow builders

Recommended extension path:

1. Add new data objects in `src/promptData.js`.
2. Add pure generation helpers in `src/promptEngine.js`.
3. Add UI bindings in `src/app.js`.
4. Add tests in `tests/prompt-engine.test.js`.
