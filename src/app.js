import { categories, chainSteps, exportPayload, frameworks, generateChain, generatePrompt, glossary, outputFormats, scoringFactors, templates } from './promptEngine.js';

const $ = (id) => document.getElementById(id);
const storageKey = 'opportunityPromptStudio.savedPrompts';
const themeKey = 'opportunityPromptStudio.theme';

const elements = {
  category: $('categorySelect'), template: $('templateSelect'), framework: $('frameworkSelect'), depth: $('depthSelect'),
  topic: $('topicInput'), industry: $('industryInput'), geography: $('geoInput'), customer: $('customerSelect'), format: $('formatSelect'),
  context: $('contextInput'), preview: $('promptPreview'), status: $('copyStatus'), templateSearch: $('templateSearch'),
  weightsGrid: $('weightsGrid'), weightTotal: $('weightTotal'), tokenEstimate: $('tokenEstimate'), librarySearch: $('librarySearch')
};

function init() {
  applyTheme(localStorage.getItem(themeKey) || 'dark');
  $('themeToggle').addEventListener('click', toggleTheme);
  $('templateCount').textContent = `${templates.length}+`;
  hydrateSelects();
  renderWeights();
  bindInputs();
  renderDocs();
  renderLibrary();
  renderChain();
  renderSaved();
  updatePrompt();
}

function hydrateSelects() {
  elements.category.innerHTML = categories.map((item) => `<option value="${item.id}">${item.name}</option>`).join('');
  elements.framework.innerHTML = frameworks.map((item) => `<option value="${item.id}">${item.name}</option>`).join('');
  elements.format.innerHTML = outputFormats.map((item) => `<option>${item}</option>`).join('');
  elements.framework.value = 'opportunity-scoring';
  refreshTemplateOptions();
}

function refreshTemplateOptions() {
  const query = elements.templateSearch.value.toLowerCase();
  const categoryId = elements.category.value;
  const filtered = templates.filter((template) => template.categoryId === categoryId && searchable(template).includes(query));
  elements.template.innerHTML = filtered.map((template) => `<option value="${template.id}">${template.title}</option>`).join('');
}

function searchable(template) {
  return `${template.title} ${template.objective} ${template.tags.join(' ')}`.toLowerCase();
}

function renderWeights() {
  elements.weightsGrid.innerHTML = scoringFactors.map(([factor, weight]) => `
    <label class="range-label">${factor}
      <span><input type="range" min="0" max="40" value="${weight}" data-weight="${factor}" /> <output>${weight}%</output></span>
    </label>`).join('');
  elements.weightsGrid.addEventListener('input', (event) => {
    if (event.target.matches('[data-weight]')) {
      event.target.nextElementSibling.value = `${event.target.value}%`;
      updatePrompt();
    }
  });
}

function bindInputs() {
  document.querySelectorAll('input, select, textarea').forEach((input) => input.addEventListener('input', () => {
    if (input === elements.category || input === elements.templateSearch) refreshTemplateOptions();
    updatePrompt();
    renderChain();
  }));
  $('copyPrompt').addEventListener('click', () => copyText(elements.preview.value, 'Prompt copied.'));
  $('copyChain').addEventListener('click', () => copyText(generateChain(getOptions()), 'Full chain copied.'));
  $('savePrompt').addEventListener('click', savePrompt);
  $('exportTxt').addEventListener('click', () => download('prompt.txt', elements.preview.value, 'text/plain'));
  $('exportMd').addEventListener('click', () => download('prompt.md', `# Generated Market Research Prompt\n\n${elements.preview.value}`, 'text/markdown'));
  $('exportJson').addEventListener('click', () => download('prompt.json', JSON.stringify(exportPayload(elements.preview.value, getOptions()), null, 2), 'application/json'));
  $('librarySearch').addEventListener('input', renderLibrary);
  $('clearWorkspace').addEventListener('click', () => { localStorage.removeItem(storageKey); renderSaved(); });
}

function getOptions() {
  const weights = Object.fromEntries([...document.querySelectorAll('[data-weight]')].map((input) => [input.dataset.weight, Number(input.value)]));
  return {
    templateId: elements.template.value,
    frameworkId: elements.framework.value,
    depth: elements.depth.value,
    topic: elements.topic.value,
    industry: elements.industry.value,
    geography: elements.geography.value,
    customerType: elements.customer.value,
    outputFormat: elements.format.value,
    context: elements.context.value,
    weights
  };
}

function updatePrompt() {
  const prompt = generatePrompt(getOptions());
  elements.preview.value = prompt;
  const words = prompt.trim().split(/\s+/).filter(Boolean).length;
  elements.tokenEstimate.textContent = `~${words} words`;
  const total = Object.values(getOptions().weights).reduce((sum, value) => sum + value, 0);
  elements.weightTotal.textContent = `Total weight: ${total}%${total !== 100 ? ' (AI will normalize in final scoring)' : ''}`;
}

async function copyText(text, message) {
  await navigator.clipboard.writeText(text);
  elements.status.textContent = message;
  setTimeout(() => { elements.status.textContent = ''; }, 2500);
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = Object.assign(document.createElement('a'), { href: url, download: filename });
  link.click();
  URL.revokeObjectURL(url);
}

function savePrompt() {
  const saved = readSaved();
  saved.unshift({ id: crypto.randomUUID(), title: elements.topic.value || 'Untitled prompt', favorite: false, createdAt: new Date().toISOString(), prompt: elements.preview.value });
  localStorage.setItem(storageKey, JSON.stringify(saved));
  renderSaved();
  elements.status.textContent = 'Saved locally.';
}

function readSaved() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || []; } catch { return []; }
}

function renderSaved() {
  const saved = readSaved();
  $('savedPrompts').innerHTML = saved.length ? saved.map((item) => `
    <article class="saved-card ${item.favorite ? 'favorite' : ''}">
      <h3>${escapeHtml(item.title)}</h3><p>${new Date(item.createdAt).toLocaleString()}</p>
      <textarea data-edit="${item.id}">${escapeHtml(item.prompt)}</textarea>
      <div class="button-row"><button data-fav="${item.id}">★ Favorite</button><button data-copy="${item.id}">Copy</button><button class="danger" data-delete="${item.id}">Delete</button></div>
    </article>`).join('') : '<p class="empty">No saved prompts yet.</p>';
  $('savedPrompts').onclick = handleSavedClick;
  $('savedPrompts').oninput = handleSavedEdit;
}

function handleSavedClick(event) {
  const saved = readSaved();
  const id = event.target.dataset.fav || event.target.dataset.delete || event.target.dataset.copy;
  if (!id) return;
  const item = saved.find((entry) => entry.id === id);
  if (event.target.dataset.copy) copyText(item.prompt, 'Saved prompt copied.');
  const next = event.target.dataset.delete ? saved.filter((entry) => entry.id !== id) : saved.map((entry) => entry.id === id ? { ...entry, favorite: !entry.favorite } : entry);
  if (!event.target.dataset.copy) { localStorage.setItem(storageKey, JSON.stringify(next)); renderSaved(); }
}

function handleSavedEdit(event) {
  if (!event.target.dataset.edit) return;
  const saved = readSaved().map((item) => item.id === event.target.dataset.edit ? { ...item, prompt: event.target.value } : item);
  localStorage.setItem(storageKey, JSON.stringify(saved));
}

function renderLibrary() {
  const query = elements.librarySearch.value.toLowerCase();
  const filtered = templates.filter((template) => searchable(template).includes(query)).slice(0, 80);
  $('templateLibrary').innerHTML = filtered.map((template) => `
    <article class="template-card"><span>${template.category}</span><h3>${template.title}</h3><p>${template.objective}</p><small>${template.tags.slice(0, 5).join(' • ')}</small></article>`).join('');
}

function renderChain() {
  $('chainGrid').innerHTML = chainSteps.map((step, index) => `<article><span>Step ${index + 1}</span><h3>${step}</h3><p>${stepDescription(step)}</p></article>`).join('');
}

function stepDescription(step) {
  const map = {
    'Market Research': 'Size the market, segments, trends, and demand drivers.',
    'Competitor Analysis': 'Map rivals, substitutes, pricing, channels, and white space.',
    'Customer Discovery': 'Identify personas, JTBD, pain, triggers, and interview questions.',
    'Opportunity Scoring': 'Apply weighted scoring to prioritize or reject the opportunity.',
    'Go-To-Market Strategy': 'Select beachhead, positioning, channels, and launch sequence.',
    'Monetization Strategy': 'Compare pricing, packaging, unit economics, and expansion revenue.',
    'Execution Roadmap': 'Define milestones, risks, resourcing, and validation checkpoints.'
  };
  return map[step];
}

function renderDocs() {
  $('frameworkDocs').innerHTML = frameworks.map((item) => `<article><h3>${item.name}</h3><p>${item.prompt}</p></article>`).join('');
  $('glossaryDocs').innerHTML = glossary.map(([term, definition]) => `<article><h3>${term}</h3><p>${definition}</p></article>`).join('');
}

function toggleTheme() { applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); }
function applyTheme(theme) { document.documentElement.dataset.theme = theme; localStorage.setItem(themeKey, theme); $('themeToggle').textContent = theme === 'dark' ? '☀️' : '🌙'; }
function escapeHtml(value) { return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char])); }

init();
