# Component Documentation

The application is implemented with HTML, CSS, and ES modules. Components are DOM sections managed by `src/app.js`.

## Hero and Navigation

The hero communicates the product value proposition and links users to the builder, template library, workspace, and framework documentation. The theme toggle stores the user's light/dark preference in localStorage.

## Prompt Builder

The builder contains:

- template search
- category selector
- template selector
- framework selector
- research depth selector
- topic input
- industry and geography inputs
- customer type selector
- output format selector
- additional context textarea
- weighted scoring sliders

Every input updates the live prompt preview in real time.

## Live Preview

The preview panel renders the generated prompt as read-only text and includes:

- estimated word count
- copy button
- save button
- TXT export
- Markdown export
- JSON export

## Prompt Chaining

The chain section summarizes the seven-step research workflow and can copy the full generated chain to the clipboard.

## Template Library

The library provides searchable cards for the built-in prompt templates. The UI limits the rendered list to the first 80 matching templates for speed while keeping all 250 templates available in the builder.

## Saved Workspace

The workspace stores prompt cards in browser localStorage. Users can:

- save generated prompts
- edit saved prompt text
- favorite prompts
- copy saved prompts
- delete individual prompts
- clear the workspace

## Knowledge Assets

The docs section renders built-in framework guidance and glossary definitions for common market research and startup validation concepts.
