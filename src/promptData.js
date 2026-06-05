export const categories = [
  {
    id: 'market-research',
    name: 'Market Research',
    tags: ['TAM', 'SAM', 'SOM', 'trends', 'segmentation'],
    goals: [
      'estimate TAM, SAM, SOM, growth rates, and segment attractiveness',
      'map demand drivers, adoption barriers, regulatory constraints, and macro trends',
      'identify market segments, buyer groups, budget owners, and high-intent use cases',
      'benchmark pricing models, purchasing cycles, and category maturity signals',
      'surface market risks, data gaps, confidence levels, and validation experiments'
    ]
  },
  {
    id: 'opportunity-assessment',
    name: 'Opportunity Assessment',
    tags: ['scoring', 'profitability', 'moats', 'scale'],
    goals: [
      'score revenue potential, profitability, execution difficulty, and scalability',
      'compare barriers to entry, defensibility, switching costs, and speed to market',
      'prioritize opportunity wedges, beachheads, expansion paths, and monetization options',
      'stress-test assumptions around demand, distribution, competition, and willingness to pay',
      'recommend invest, test, pivot, or avoid decisions with explicit evidence requirements'
    ]
  },
  {
    id: 'startup-validation',
    name: 'Startup Validation',
    tags: ['PMF', 'MVP', 'pricing', 'customer pain'],
    goals: [
      'validate painful problems, current alternatives, and measurable urgency',
      'design customer interviews, smoke tests, landing pages, and MVP experiments',
      'assess willingness to pay, buyer authority, retention signals, and product-market fit indicators',
      'define riskiest assumptions, falsifiable hypotheses, and learning milestones',
      'translate validation evidence into roadmap, positioning, and go/no-go decisions'
    ]
  },
  {
    id: 'competitive-analysis',
    name: 'Competitive Analysis',
    tags: ['competitors', 'pricing', 'positioning', 'sentiment'],
    goals: [
      'map direct, indirect, and substitute competitors across the value chain',
      'compare pricing, packaging, positioning, channels, strengths, and weaknesses',
      'analyze customer sentiment, review themes, switching triggers, and underserved needs',
      'identify white-space positioning, differentiation angles, and competitive threats',
      'produce competitive matrices, battlecards, and strategic recommendations'
    ]
  },
  {
    id: 'ai-opportunity',
    name: 'AI Opportunity',
    tags: ['AI agents', 'automation', 'SaaS', 'digital assets'],
    goals: [
      'discover AI, agentic automation, SaaS, marketplace, and digital asset opportunities',
      'match workflows to AI capabilities, data availability, human-in-the-loop needs, and ROI',
      'evaluate technical feasibility, model risk, integration friction, and enterprise readiness',
      'prioritize niches by urgency, repeatability, distribution access, and defensibility',
      'design proof-of-concept, monetization, and GTM paths for AI-native offerings'
    ]
  }
];

export const frameworks = [
  { id: 'swot', name: 'SWOT', prompt: 'Use SWOT to structure strengths, weaknesses, opportunities, and threats. Separate internal factors from external market factors.' },
  { id: 'five-forces', name: "Porter's Five Forces", prompt: 'Apply Porter\'s Five Forces: rivalry, supplier power, buyer power, threat of new entrants, and substitutes.' },
  { id: 'jtbd', name: 'Jobs To Be Done', prompt: 'Apply Jobs-To-Be-Done. Identify functional, emotional, and social jobs; triggers; anxieties; and desired outcomes.' },
  { id: 'lean-startup', name: 'Lean Startup', prompt: 'Use Lean Startup validation. Convert assumptions into falsifiable hypotheses, MVP tests, metrics, and learning loops.' },
  { id: 'blue-ocean', name: 'Blue Ocean Strategy', prompt: 'Use Blue Ocean Strategy. Identify factors to eliminate, reduce, raise, and create to escape direct competition.' },
  { id: 'first-principles', name: 'First Principles', prompt: 'Use first-principles analysis. Decompose the market, customer pain, constraints, incentives, and economics from fundamentals.' },
  { id: 'opportunity-scoring', name: 'Opportunity Scoring', prompt: 'Use a weighted opportunity scoring model and explain each score with evidence, assumptions, and confidence.' }
];

export const outputFormats = [
  'Executive report', 'Markdown table', 'SWOT analysis', 'Competitive matrix', 'Scoring model', 'Strategic recommendations', 'Investor memo', 'Experiment plan'
];

export const scoringFactors = [
  ['Revenue Potential', 25],
  ['Speed to Revenue', 15],
  ['Competition', 15],
  ['Complexity', 15],
  ['Scalability', 15],
  ['Defensibility', 15]
];

export const chainSteps = [
  'Market Research', 'Competitor Analysis', 'Customer Discovery', 'Opportunity Scoring', 'Go-To-Market Strategy', 'Monetization Strategy', 'Execution Roadmap'
];

export const glossary = [
  ['TAM', 'Total Addressable Market: the maximum annual revenue if the solution captured all relevant demand.'],
  ['SAM', 'Serviceable Available Market: the portion of TAM reachable by the chosen business model, geography, and segment.'],
  ['SOM', 'Serviceable Obtainable Market: the realistic near-term share a company can win given resources and competition.'],
  ['CAC', 'Customer Acquisition Cost: total sales and marketing cost required to acquire one customer.'],
  ['LTV', 'Lifetime Value: gross profit expected from a customer over the full relationship.'],
  ['Market Validation', 'Evidence that a real customer segment has an urgent problem and will adopt or pay for a solution.'],
  ['Product Market Fit', 'A state where a product reliably satisfies a strong market need and shows retention, referrals, and pull.'],
  ['Competitive Moats', 'Durable advantages such as data, brand, switching costs, network effects, scale, or distribution.'],
  ['Network Effects', 'A dynamic where each additional user makes the product or marketplace more valuable for others.']
];

const angles = [
  'market sizing and growth model', 'segment attractiveness map', 'trend and tailwind assessment', 'buyer budget analysis', 'risk and constraint review',
  'profit pool analysis', 'pricing and packaging scan', 'distribution channel review', 'regulatory and compliance scan', 'international expansion lens'
];

export function buildTemplates() {
  return categories.flatMap((category) => Array.from({ length: 50 }, (_, index) => {
    const goal = category.goals[index % category.goals.length];
    const angle = angles[index % angles.length];
    return {
      id: `${category.id}-${String(index + 1).padStart(2, '0')}`,
      categoryId: category.id,
      category: category.name,
      title: `${category.name} ${index + 1}: ${angle}`,
      tags: [...category.tags, angle.split(' ')[0], `template-${index + 1}`],
      objective: `Perform a ${angle} to ${goal}.`,
      emphasis: [
        'Use credible, current evidence and label estimates clearly.',
        'Separate facts, assumptions, inferences, and recommendations.',
        'Identify confidence level, missing data, and next validation steps.'
      ]
    };
  }));
}
