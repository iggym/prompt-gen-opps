import { buildTemplates, categories, chainSteps, frameworks, glossary, outputFormats, scoringFactors } from './promptData.js';

export const templates = buildTemplates();
export { categories, chainSteps, frameworks, glossary, outputFormats, scoringFactors };

const role = 'Act as a venture capitalist, startup founder, market analyst, competitive intelligence expert, management consultant, product strategist, UX researcher, and growth strategist.';

export function getTemplate(id) {
  return templates.find((template) => template.id === id) ?? templates[0];
}

export function normalizeWeights(weights) {
  return scoringFactors.map(([factor, fallback]) => ({
    factor,
    weight: Number.isFinite(Number(weights?.[factor])) ? Number(weights[factor]) : fallback
  }));
}

export function generatePrompt(options) {
  const template = getTemplate(options.templateId);
  const framework = frameworks.find((item) => item.id === options.frameworkId) ?? frameworks[0];
  const weights = normalizeWeights(options.weights);
  const weightTotal = weights.reduce((sum, item) => sum + item.weight, 0);
  const context = options.context?.trim() || 'No extra context provided.';

  return `${role}

Research Objective
- Topic / opportunity: ${options.topic || 'Unspecified opportunity'}
- Template: ${template.title}
- Category: ${template.category}
- Industry: ${options.industry || 'Unspecified'}
- Geography: ${options.geography || 'Global'}
- Customer type: ${options.customerType || 'Unspecified'}
- Research depth: ${options.depth || 'Standard'}
- Desired output format: ${options.outputFormat || 'Executive report'}
- Additional context: ${context}

Primary Task
${template.objective}

Framework
${framework.prompt}

Required Reasoning Standards
1. Think step by step, but present only concise reasoning, key assumptions, and decision-critical evidence.
2. State what data you would gather, where you would look, and how you would validate uncertain claims.
3. Distinguish facts, estimates, assumptions, risks, and strategic recommendations.
4. Include counterarguments, failure modes, and conditions that would change the conclusion.
5. If web access is available, prioritize recent primary sources, official filings, reputable research, customer reviews, job posts, and pricing pages.

Opportunity Scoring Model
Use a 1-10 score for each factor, multiply by the weight, and provide a weighted total out of 100. Current weights total ${weightTotal}.
${weights.map((item) => `- ${item.factor}: ${item.weight}%`).join('\n')}

Output Structure
1. Executive summary with the top recommendation.
2. Market context: size, growth, trends, segments, and adoption drivers.
3. Customer insight: personas, jobs-to-be-done, pain intensity, buying triggers, and willingness to pay.
4. Competitive intelligence: alternatives, competitor strengths/weaknesses, pricing, positioning, sentiment, and channels.
5. Opportunity assessment: profitability, barriers, defensibility, scalability, speed to market, and risks.
6. Scoring table using the weighted model above.
7. Strategic options: best wedge, differentiation, GTM motion, monetization path, and roadmap.
8. Validation plan: experiments, success metrics, sample interview questions, and next data to collect.
9. Final recommendation: invest, test, pivot, partner, or avoid, with confidence level.

Template Emphasis
${template.emphasis.map((item) => `- ${item}`).join('\n')}`;
}

export function generateChain(options) {
  return chainSteps.map((step, index) => `Step ${index + 1}: ${step}\n${generatePrompt({ ...options, topic: `${options.topic} — ${step}`, outputFormat: index === 3 ? 'Scoring model' : options.outputFormat })}`).join('\n\n---\n\n');
}

export function exportPayload(prompt, options) {
  return {
    generatedAt: new Date().toISOString(),
    app: 'Opportunity Prompt Studio',
    options,
    prompt
  };
}
