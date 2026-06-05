import assert from 'node:assert/strict';
import { generateChain, generatePrompt, templates } from '../src/promptEngine.js';

assert.equal(templates.length, 250, 'template library should include 250 templates');

const prompt = generatePrompt({
  templateId: templates[0].id,
  frameworkId: 'opportunity-scoring',
  topic: 'AI research agents for sales teams',
  industry: 'AI SaaS',
  geography: 'North America',
  customerType: 'B2B',
  depth: 'Expert Analysis',
  outputFormat: 'Scoring model',
  context: 'Focus on mid-market teams.',
  weights: { 'Revenue Potential': 30, 'Speed to Revenue': 15, Competition: 10, Complexity: 15, Scalability: 15, Defensibility: 15 }
});

assert.match(prompt, /Act as a venture capitalist/);
assert.match(prompt, /AI research agents for sales teams/);
assert.match(prompt, /Opportunity Scoring Model/);
assert.match(prompt, /Revenue Potential: 30%/);
assert.match(prompt, /Executive summary/);

const chain = generateChain({ templateId: templates[1].id, frameworkId: 'jtbd', topic: 'vertical AI compliance copilot' });
assert.equal((chain.match(/Step \d:/g) || []).length, 7, 'chain should include seven steps');
console.log('All prompt engine tests passed.');
