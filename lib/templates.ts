// ============================================================
// TEMPLATES LIBRARY — AI Vibe Coding v3
// Pre-configured snippet bundles for every use case
// Each template is a "vibe preset" — plug in, generate, ship
// ============================================================

import {
  Snippet,
  VIBES, LAYOUTS, STYLES, TYPOGRAPHY, ANIMATIONS,
  TECH, COLORS, COMPONENTS, INTERACTIONS, PERFORMANCE,
  ANTHROPIC_PRINCIPLES, buildPromptClean, validateSelection,
} from './prompt-libraryn'

// ============================================================
// TEMPLATE TYPES
// ============================================================

export type TemplateCategory =
  | 'saas'        // SaaS, product, software
  | 'agency'      // creative, design, dev agencies
  | 'ecommerce'   // stores, products, marketplace
  | 'portfolio'   // personal, freelance, studio
  | 'startup'     // landing pages, waitlists, launches
  | 'corporate'   // enterprise, finance, legal, consulting
  | 'media'       // blog, magazine, news, podcast
  | 'education'   // courses, bootcamp, LMS, school
  | 'health'      // wellness, fitness, medical, mental health
  | 'fintech'     // trading, crypto, banking, payments
  | 'ai'          // AI tools, ML products, chatbots
  | 'gaming'      // games, esports, game studios
  | 'food'        // restaurant, recipe, food delivery
  | 'travel'      // tourism, hotel, travel agency
  | 'ngo'         // charity, nonprofit, cause
  | 'event'       // conference, concert, festival
  | 'real-estate' // property, construction, interior
  | 'fashion'     // clothing, luxury, accessories
  | 'crypto'      // web3, NFT, DeFi, blockchain
  | 'dashboard'   // admin, analytics, data tools
  | 'developer'   // devtools, CLI, open source
  | 'wedding'     // celebration, lifestyle events
  | 'legal'       // law firm, compliance, contracts
  | 'beauty'      // spa, salon, cosmetics
  | 'art'         // gallery, artist, creative studio

export type TemplateMood =
  | 'bold'       // high impact, dramatic
  | 'elegant'    // refined, sophisticated
  | 'playful'    // fun, approachable
  | 'technical'  // precise, data-driven
  | 'warm'       // cozy, inviting
  | 'edgy'       // provocative, counter-culture
  | 'minimal'    // stripped back, focused
  | 'immersive'  // cinematic, experiential

export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  mood: TemplateMood
  snippetIds: string[]        // references to snippet IDs
  defaultKeywords?: string    // injected into buildPrompt keywords
  examplePrompt: string       // ready-to-use task description
  tags?: string[]
  previewColor?: string       // hex for UI thumbnail tint
  difficulty?: 'simple' | 'medium' | 'complex'
  estimatedSections?: number  // how many sections the generated page will have
}

// ============================================================
// HELPER — resolve snippet IDs to Snippet objects
// ============================================================

const ALL_SNIPPETS: Snippet[] = [
  ...VIBES, ...LAYOUTS, ...STYLES, ...TYPOGRAPHY,
  ...ANIMATIONS, ...TECH, ...COLORS, ...COMPONENTS,
  ...INTERACTIONS, ...PERFORMANCE, ...ANTHROPIC_PRINCIPLES,
]

const SNIPPET_MAP = new Map<string, Snippet>(
  ALL_SNIPPETS.map(s => [s.id, s])
)

export function resolveSnippets(ids: string[]): Snippet[] {
  return ids
    .map(id => SNIPPET_MAP.get(id))
    .filter((s): s is Snippet => s !== undefined)
}

export function buildTemplatePrompt(
  template: Template,
  customTask?: string
): string {
  const snippets = resolveSnippets(template.snippetIds)
  const task = customTask ?? template.examplePrompt
  return buildPromptClean(snippets, task, template.defaultKeywords ?? '')
}

export function previewTemplate(template: Template) {
  const snippets = resolveSnippets(template.snippetIds)
  const { valid, removed, warnings } = validateSelection(snippets)
  return {
    template: template.name,
    snippetCount: valid.length,
    removedCount: removed.length,
    warnings,
    categories: [...new Set(valid.map(s => s.category))],
  }
}

// ============================================================
// ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗███████╗
// ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝██╔════╝
//    ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  ███████╗
//    ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  ╚════██║
//    ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗███████║
//    ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝
// ============================================================

export const TEMPLATES: Template[] = [

  // ============================================================
  // ── SAAS ────────────────────────────────────────────────────
  // ============================================================

  {
    id: 'saas-dark-hero',
    name: 'SaaS Dark Powerhouse',
    description: 'High-converting SaaS landing with dark luxury feel. Works for any B2B tool.',
    category: 'saas',
    mood: 'bold',
    previewColor: '#7C3AED',
    difficulty: 'complex',
    estimatedSections: 8,
    snippetIds: [
      // vibe
      'dark-luxury',
      // layout
      'hero-fullscreen', 'features-bento', 'pricing-3tier',
      'stats-bar', 'testimonials-grid', 'cta-section', 'footer-full',
      // style
      'gradient-bg', 'glassmorphism-cards', 'mesh-gradient',
      // color
      'purple-violet',
      // typography
      'serif-display', 'gradient-text', 'large-headlines',
      // animation
      'fade-up', 'smooth-transitions', 'counter-animation',
      // tech
      'use-state', 'use-effect', 'intersection-observer', 'tabs-component',
      // components
      'hero-badge', 'feature-icons', 'avatar-group', 'comparison-table',
      // principles
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'SaaS, B2B, productivity, automation, enterprise, workflow',
    examplePrompt: 'Build a complete SaaS landing page for an AI-powered workflow automation tool called "FlowAI". Include a dramatic hero with animated gradient, bento feature grid, social proof stats, pricing tiers, testimonials, and a strong CTA.',
    tags: ['saas', 'dark', 'conversion', 'b2b'],
  },

  {
    id: 'saas-minimal-light',
    name: 'SaaS Clean & Light',
    description: 'Stripe-inspired minimal light SaaS page. Precision typography, white space mastery.',
    category: 'saas',
    mood: 'minimal',
    previewColor: '#3B82F6',
    difficulty: 'medium',
    estimatedSections: 7,
    snippetIds: [
      'minimal-light',
      'hero-centered', 'features-3col', 'pricing-3tier',
      'testimonials-carousel', 'logo-strip', 'footer-full',
      'flat-design', 'border-accents',
      'blue-indigo',
      'serif-display', 'tracking-wide',
      'smooth-transitions', 'fade-up', 'counter-animation',
      'use-state', 'use-effect', 'tabs-component',
      'feature-icons', 'avatar-group',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'clean, modern, developer tool, API, platform',
    examplePrompt: 'Build a clean minimal SaaS landing page for a developer API platform called "APIForge". Stripe-like aesthetic, precise typography, hero with code preview, feature list, usage stats, and pricing.',
    tags: ['saas', 'light', 'minimal', 'developer'],
  },

  {
    id: 'saas-bento-glassmorphism',
    name: 'SaaS Glassmorphic Bento',
    description: 'Apple-inspired bento grid with frosted glass. Premium and modern.',
    category: 'saas',
    mood: 'elegant',
    previewColor: '#06B6D4',
    difficulty: 'complex',
    estimatedSections: 7,
    snippetIds: [
      'glassmorphism', 'bento-grid',
      'hero-centered', 'features-bento', 'stats-bar', 'cta-section', 'footer-minimal',
      'gradient-bg', 'frosted-glass', 'glassmorphism-cards',
      'cyan-electric',
      'mono-display', 'gradient-text',
      'fade-up', 'smooth-transitions', 'floating-elements',
      'use-state', 'use-effect', 'dark-mode-toggle',
      'hero-badge', 'feature-icons', 'scroll-indicator',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'productivity, collaboration, modern, glass, premium',
    examplePrompt: 'Build a premium SaaS landing page for a real-time collaboration tool called "SyncSpace". Apple-like bento grid, glassmorphic cards, dark background with cyan accents, feature showcase, and minimal CTA.',
    tags: ['saas', 'glass', 'bento', 'premium'],
  },

  // ============================================================
  // ── AI / ML TOOLS ───────────────────────────────────────────
  // ============================================================

  {
    id: 'ai-tool-aurora',
    name: 'AI Tool — Aurora Dark',
    description: 'Dreamy aurora aesthetic for AI/ML products. Cosmic, intelligent, inspiring.',
    category: 'ai',
    mood: 'immersive',
    previewColor: '#8B5CF6',
    difficulty: 'complex',
    estimatedSections: 8,
    snippetIds: [
      'aurora',
      'hero-fullscreen', 'features-3col', 'stats-bar',
      'testimonials-grid', 'pricing-3tier', 'cta-section', 'footer-full',
      'gradient-bg', 'mesh-gradient', 'particle-system',
      'purple-violet',
      'serif-display', 'gradient-text', 'large-headlines',
      'fade-up', 'typewriter', 'counter-animation', 'morphing-shapes',
      'use-state', 'use-effect', 'use-ref',
      'hero-badge', 'feature-icons', 'progress-bar',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'AI, machine learning, neural network, GPT, LLM, intelligence',
    examplePrompt: 'Build a stunning landing page for an AI writing assistant called "AuraWrite". Aurora borealis inspired background, dramatic hero with typewriter effect cycling through AI capabilities, feature showcase with animated stat counters, pricing, and glowing CTA.',
    tags: ['ai', 'aurora', 'dark', 'immersive'],
  },

  {
    id: 'ai-cyberpunk-hud',
    name: 'AI Tool — Cyberpunk HUD',
    description: 'Sci-fi HUD aesthetic for cutting-edge AI/data tools. Matrix vibes.',
    category: 'ai',
    mood: 'technical',
    previewColor: '#00FF41',
    difficulty: 'complex',
    estimatedSections: 7,
    snippetIds: [
      'cyberpunk', 'scifi-hud',
      'hero-split', 'features-3col', 'stats-bar', 'cta-section', 'footer-minimal',
      'gradient-bg', 'neon-glow', 'dot-grid',
      'cyan-electric',
      'mono-display', 'tracking-wide',
      'fade-up', 'glitch-effect', 'smooth-transitions', 'particle-system',
      'use-state', 'use-effect', 'use-ref',
      'code-block', 'data-table', 'progress-bar',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'AI, data, cybersecurity, hacking, neural, prediction, algorithm',
    examplePrompt: 'Build a cyberpunk-aesthetic landing page for an AI cybersecurity platform called "NeuralShield". Dark background with green/cyan HUD elements, glitch effects on headline, terminal-style code preview, threat statistics dashboard, and neon CTA button.',
    tags: ['ai', 'cyberpunk', 'hud', 'dark'],
  },

  {
    id: 'ai-minimal-clean',
    name: 'AI Tool — Minimal Clarity',
    description: 'Clean, trustworthy AI product page. Focus on clarity and confidence.',
    category: 'ai',
    mood: 'minimal',
    previewColor: '#10b981',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'minimal-light',
      'hero-centered', 'features-2col', 'stats-bar', 'testimonials-grid', 'cta-section', 'footer-full',
      'flat-design', 'border-accents',
      'emerald-teal',
      'serif-display', 'gradient-text',
      'fade-up', 'smooth-transitions', 'counter-animation',
      'use-state', 'use-effect', 'tabs-component',
      'feature-icons', 'comparison-table',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'AI assistant, productivity, automation, smart, helpful',
    examplePrompt: 'Build a clean minimal AI product page for an intelligent document summarizer called "BriefAI". White background, emerald accents, split features with illustrations, trust stats, testimonials, and simple pricing.',
    tags: ['ai', 'minimal', 'light', 'trust'],
  },

  // ============================================================
  // ── FINTECH / TRADING ───────────────────────────────────────
  // ============================================================

  {
    id: 'fintech-trading-dark',
    name: 'Trading Platform — Dark Pro',
    description: 'Professional trading/fintech dark UI. Serious, data-driven, trustworthy.',
    category: 'fintech',
    mood: 'technical',
    previewColor: '#10b981',
    difficulty: 'complex',
    estimatedSections: 8,
    snippetIds: [
      'dark-luxury',
      'hero-split', 'features-bento', 'stats-bar',
      'pricing-3tier', 'testimonials-grid', 'cta-section', 'footer-full',
      'gradient-bg', 'glassmorphism-cards', 'dot-grid',
      'emerald-teal',
      'mono-display', 'gradient-text', 'large-headlines',
      'fade-up', 'counter-animation', 'smooth-transitions',
      'use-state', 'use-effect', 'tabs-component', 'skeleton-loader',
      'chart-bars', 'data-table', 'progress-bar', 'comparison-table',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'trading, forex, gold, XAUUSD, algorithmic, backtesting, EA, MetaTrader',
    examplePrompt: 'Build a professional landing page for an algorithmic trading platform called "QuantEdge". Dark background with emerald accents, split hero with performance chart preview, animated P&L statistics, strategy comparison table, subscription tiers, and trader testimonials.',
    tags: ['fintech', 'trading', 'dark', 'data'],
  },

  {
    id: 'fintech-payment-minimal',
    name: 'Payment / Fintech — Clean',
    description: 'Stripe/Square-inspired payment platform. Trust, simplicity, reliability.',
    category: 'fintech',
    mood: 'minimal',
    previewColor: '#6366F1',
    difficulty: 'medium',
    estimatedSections: 7,
    snippetIds: [
      'minimal-light',
      'hero-centered', 'features-3col', 'stats-bar',
      'logo-strip', 'pricing-3tier', 'cta-section', 'footer-full',
      'flat-design', 'card-shadows', 'border-accents',
      'blue-indigo',
      'serif-display', 'tracking-wide',
      'fade-up', 'smooth-transitions', 'counter-animation',
      'use-state', 'use-effect',
      'feature-icons', 'comparison-table', 'avatar-group',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'payments, transactions, secure, global, instant, fintech',
    examplePrompt: 'Build a minimal fintech landing page for a global payment infrastructure company called "PayStream". Clean white design, bold stats (200+ countries, $2B processed), feature grid, enterprise logos, pricing tiers.',
    tags: ['fintech', 'payments', 'minimal', 'trust'],
  },

  {
    id: 'crypto-web3',
    name: 'Crypto / Web3 Launch',
    description: 'High-energy crypto/DeFi/NFT launch page. Neon, electric, community-driven.',
    category: 'crypto',
    mood: 'edgy',
    previewColor: '#F97316',
    difficulty: 'complex',
    estimatedSections: 8,
    snippetIds: [
      'cyberpunk', 'aurora',
      'hero-fullscreen', 'features-3col', 'stats-bar',
      'testimonials-grid', 'pricing-3tier', 'cta-section', 'footer-full',
      'gradient-bg', 'neon-glow', 'particle-system', 'geometric-shapes',
      'orange-fire',
      'mono-display', 'gradient-text', 'large-headlines',
      'fade-up', 'glitch-effect', 'floating-elements', 'counter-animation',
      'use-state', 'use-effect', 'countdown-timer',
      'hero-badge', 'timeline', 'avatar-group',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'crypto, DeFi, NFT, blockchain, token, DAO, web3, launch',
    examplePrompt: 'Build a high-energy web3 project launch page for "VortexDAO" — a decentralized trading protocol. Cyberpunk aesthetic with orange neon, animated particle background, countdown timer to launch, tokenomics stats, roadmap timeline, team section, and mint CTA.',
    tags: ['crypto', 'web3', 'neon', 'launch'],
  },

  // ============================================================
  // ── AGENCY / CREATIVE ───────────────────────────────────────
  // ============================================================

  {
    id: 'agency-editorial-dark',
    name: 'Creative Agency — Editorial Dark',
    description: 'Award-winning dark editorial agency site. Typography-forward, portfolio showcase.',
    category: 'agency',
    mood: 'bold',
    previewColor: '#C9A84C',
    difficulty: 'complex',
    estimatedSections: 7,
    snippetIds: [
      'dark-luxury', 'editorial',
      'hero-fullscreen', 'magazine-grid', 'stats-bar',
      'testimonials-grid', 'cta-section', 'footer-full',
      'gradient-bg', 'grain-texture', 'parallax-layers',
      'amber-gold',
      'serif-display', 'large-headlines', 'gradient-text', 'outlined-text',
      'fade-up', 'parallax-scroll', 'smooth-transitions',
      'use-state', 'use-effect',
      'timeline', 'image-gallery', 'avatar-group',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'creative agency, branding, design, campaigns, luxury clients',
    examplePrompt: 'Build a dark luxury creative agency website for "Noir Studio" — a premium brand identity and digital experience studio. Editorial layout, large serif headlines, gold accents, portfolio grid, client stats (Fortune 500 clients, awards), and bold CTA.',
    tags: ['agency', 'dark', 'editorial', 'luxury'],
  },

  {
    id: 'agency-brutalist',
    name: 'Creative Agency — Brutalist',
    description: 'Raw brutalist agency page. Anti-design that commands attention.',
    category: 'agency',
    mood: 'edgy',
    previewColor: '#000000',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'brutalism',
      'hero-fullscreen', 'features-2col', 'stats-bar', 'cta-section', 'footer-minimal',
      'flat-design',
      'monochrome',
      'slab-serif', 'large-headlines', 'outlined-text',
      'smooth-transitions', 'hover-scale',
      'use-state', 'use-effect',
      'image-gallery', 'data-table',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'brutalist, bold, design studio, raw, provocative, anti-design',
    examplePrompt: 'Build a brutalist design agency website for "RAW/FORM" — a studio that challenges visual norms. Black borders, offset shadows, stark typography, portfolio in grid layout, bold client list, and a provocative CTA.',
    tags: ['agency', 'brutalism', 'bold', 'raw'],
  },

  {
    id: 'agency-glassmorphic-playful',
    name: 'Digital Agency — Playful Glass',
    description: 'Fun modern digital agency. Colorful glassmorphic cards, energetic brand.',
    category: 'agency',
    mood: 'playful',
    previewColor: '#EC4899',
    difficulty: 'medium',
    estimatedSections: 7,
    snippetIds: [
      'glassmorphism', 'playful-colorful',
      'hero-centered', 'features-3col', 'stats-bar',
      'testimonials-carousel', 'cta-section', 'footer-full',
      'gradient-bg', 'glassmorphism-cards', 'geometric-shapes',
      'rose-pink',
      'serif-display', 'gradient-text',
      'fade-up', 'floating-elements', 'smooth-transitions',
      'use-state', 'use-effect',
      'hero-badge', 'feature-icons', 'avatar-group',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'digital agency, social media, marketing, growth, campaigns',
    examplePrompt: 'Build a vibrant digital marketing agency landing page for "Bloom Agency" — specialists in social media and growth marketing. Colorful glassmorphic cards, playful typography, service showcases, growth stats, and client carousels.',
    tags: ['agency', 'playful', 'glass', 'marketing'],
  },

  // ============================================================
  // ── PORTFOLIO ───────────────────────────────────────────────
  // ============================================================

  {
    id: 'portfolio-developer-dark',
    name: 'Developer Portfolio — Dark Terminal',
    description: 'Hacker/developer portfolio. Terminal aesthetic, showcases code and projects.',
    category: 'portfolio',
    mood: 'technical',
    previewColor: '#10b981',
    difficulty: 'complex',
    estimatedSections: 7,
    snippetIds: [
      'cyberpunk',
      'hero-centered', 'features-3col', 'stats-bar', 'cta-section', 'footer-minimal',
      'gradient-bg', 'dot-grid', 'neon-glow',
      'emerald-teal',
      'mono-display', 'large-headlines',
      'typewriter', 'fade-up', 'smooth-transitions',
      'use-state', 'use-effect', 'tabs-component', 'copy-clipboard',
      'code-block', 'progress-bar', 'timeline', 'image-gallery',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'full-stack developer, React, Node.js, open source, projects',
    examplePrompt: 'Build a developer portfolio for a full-stack engineer. Terminal-inspired dark aesthetic, typewriter hero cycling through roles, project showcase with tabs, skills progress bars, GitHub stats, and contact form.',
    tags: ['portfolio', 'developer', 'terminal', 'dark'],
  },

  {
    id: 'portfolio-designer-japandi',
    name: 'Designer Portfolio — Japandi',
    description: 'Serene minimal designer portfolio. Wabi-sabi, whitespace, editorial photography.',
    category: 'portfolio',
    mood: 'elegant',
    previewColor: '#8B7355',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'japandi',
      'hero-centered', 'magazine-grid', 'stats-bar', 'cta-section', 'footer-minimal',
      'grain-texture', 'border-accents',
      'monochrome',
      'serif-display', 'tracking-wide', 'large-headlines',
      'fade-up', 'smooth-transitions',
      'use-state', 'use-effect',
      'image-gallery', 'timeline', 'scroll-indicator',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'UI/UX designer, brand identity, Figma, product design, visual',
    examplePrompt: 'Build a minimal Japandi-aesthetic portfolio for a product designer. Warm whites, charcoal typography, generous negative space, editorial project grid, awards, client list, and a serene contact section.',
    tags: ['portfolio', 'designer', 'japandi', 'minimal'],
  },

  {
    id: 'portfolio-photographer',
    name: 'Photographer Portfolio — Noir',
    description: 'Dramatic noir portfolio for photographers and visual artists.',
    category: 'portfolio',
    mood: 'immersive',
    previewColor: '#1A1A1A',
    difficulty: 'medium',
    estimatedSections: 5,
    snippetIds: [
      'noir',
      'hero-fullscreen', 'magazine-grid', 'cta-section', 'footer-minimal',
      'parallax-layers', 'grain-texture', 'image-overlays',
      'monochrome',
      'serif-display', 'large-headlines', 'outlined-text',
      'fade-up', 'parallax-scroll', 'smooth-transitions',
      'use-state', 'use-effect',
      'image-gallery', 'scroll-indicator',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'photography, portrait, editorial, commercial, visual storytelling',
    examplePrompt: 'Build a cinematic photographer portfolio with a noir aesthetic. Full-screen hero with dramatic black/white photography, editorial image grid, minimal text, and a sophisticated contact call-to-action.',
    tags: ['portfolio', 'photographer', 'noir', 'visual'],
  },

  // ============================================================
  // ── STARTUP / LAUNCH ────────────────────────────────────────
  // ============================================================

  {
    id: 'startup-waitlist',
    name: 'Startup Waitlist — Viral Launch',
    description: 'High-conversion waitlist page. Urgency, exclusivity, social proof.',
    category: 'startup',
    mood: 'bold',
    previewColor: '#F97316',
    difficulty: 'medium',
    estimatedSections: 5,
    snippetIds: [
      'startup-saas', 'aurora',
      'hero-fullscreen', 'features-3col', 'stats-bar', 'cta-section', 'footer-minimal',
      'gradient-bg', 'glassmorphism-cards', 'particle-system',
      'orange-fire',
      'serif-display', 'gradient-text', 'large-headlines',
      'fade-up', 'typewriter', 'floating-elements', 'counter-animation',
      'use-state', 'use-effect', 'countdown-timer', 'form-validation', 'toast-notification',
      'hero-badge', 'avatar-group', 'scroll-indicator',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'waitlist, launch, early access, beta, exclusive, startup',
    examplePrompt: 'Build a viral waitlist landing page for a stealth startup called "Spark" — a next-gen creative tool. Countdown timer to launch, email signup with spots remaining ("2,847 on waitlist"), key feature teasers, and early bird pricing hint.',
    tags: ['startup', 'waitlist', 'launch', 'conversion'],
  },

  {
    id: 'startup-product-hunt',
    name: 'Product Hunt Launch Day',
    description: 'Product Hunt-ready launch page. Clean, compelling, community-friendly.',
    category: 'startup',
    mood: 'playful',
    previewColor: '#FF6154',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'minimal-light', 'playful-colorful',
      'hero-centered', 'features-3col', 'stats-bar',
      'testimonials-grid', 'cta-section', 'footer-minimal',
      'card-shadows', 'border-accents',
      'orange-fire',
      'serif-display', 'gradient-text',
      'fade-up', 'smooth-transitions', 'hover-scale',
      'use-state', 'use-effect',
      'hero-badge', 'feature-icons', 'avatar-group',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'product hunt, launch, makers, indie, simple, useful',
    examplePrompt: 'Build a Product Hunt launch day page for "Clipster" — a smart clipboard manager for Mac. Friendly design, clear value prop, GIF-like feature demos, maker story, early user love quotes, and AppStore/download CTA.',
    tags: ['startup', 'product-hunt', 'launch', 'indie'],
  },

  // ============================================================
  // ── CORPORATE / ENTERPRISE ─────────────────────────────────
  // ============================================================

  {
    id: 'corporate-enterprise',
    name: 'Enterprise / Corporate — Navy',
    description: 'Trust-first enterprise site. Fortune 500 clients, compliance, scale.',
    category: 'corporate',
    mood: 'technical',
    previewColor: '#1E3A5F',
    difficulty: 'complex',
    estimatedSections: 8,
    snippetIds: [
      'modern-corporate',
      'hero-split', 'features-3col', 'stats-bar',
      'logo-strip', 'pricing-3tier', 'testimonials-grid', 'cta-section', 'footer-full',
      'card-shadows', 'border-accents',
      'blue-indigo',
      'slab-serif', 'tracking-wide',
      'fade-up', 'smooth-transitions', 'counter-animation',
      'use-state', 'use-effect', 'tabs-component',
      'comparison-table', 'feature-icons', 'avatar-group',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'enterprise, B2B, compliance, security, scale, infrastructure',
    examplePrompt: 'Build an enterprise software company website for "CoreVault" — a data security and compliance platform. Professional navy/slate design, enterprise client logos, security certifications, compliance feature grid, case study stats, and sales CTA.',
    tags: ['corporate', 'enterprise', 'navy', 'trust'],
  },

  {
    id: 'consulting-firm',
    name: 'Consulting / Professional Services',
    description: 'McKinsey-tier consulting firm page. Authority, expertise, results.',
    category: 'corporate',
    mood: 'elegant',
    previewColor: '#2D3748',
    difficulty: 'medium',
    estimatedSections: 7,
    snippetIds: [
      'editorial', 'modern-corporate',
      'hero-centered', 'features-2col', 'stats-bar',
      'testimonials-grid', 'logo-strip', 'cta-section', 'footer-full',
      'border-accents', 'card-shadows',
      'amber-gold',
      'serif-display', 'large-headlines', 'tracking-wide',
      'fade-up', 'smooth-transitions',
      'use-state', 'use-effect',
      'timeline', 'avatar-group', 'comparison-table',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'consulting, strategy, management, transformation, results, expertise',
    examplePrompt: 'Build a strategy consulting firm website for "Pinnacle Advisory" — specializing in digital transformation. Editorial design, gold/dark palette, success metrics (400+ projects, $8B in client value), service areas, leadership team, and engagement CTA.',
    tags: ['consulting', 'corporate', 'editorial', 'authority'],
  },

  {
    id: 'law-firm',
    name: 'Law Firm / Legal Services',
    description: 'Authoritative legal website. Professionalism, gravitas, client confidence.',
    category: 'legal',
    mood: 'elegant',
    previewColor: '#1A1A2E',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'dark-luxury', 'editorial',
      'hero-centered', 'features-3col', 'stats-bar',
      'testimonials-grid', 'cta-section', 'footer-full',
      'grain-texture', 'border-accents',
      'amber-gold',
      'serif-display', 'large-headlines', 'tracking-wide',
      'fade-up', 'smooth-transitions',
      'use-state', 'use-effect',
      'timeline', 'avatar-group',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'law firm, legal, attorney, litigation, corporate law, counsel',
    examplePrompt: 'Build a premium law firm website for "Sterling & Associates" — a corporate litigation and M&A practice. Dark luxury aesthetic, gold accents, practice areas, partner profiles, landmark case statistics, and confidential consultation CTA.',
    tags: ['legal', 'law', 'dark', 'authority'],
  },

  // ============================================================
  // ── EDUCATION ───────────────────────────────────────────────
  // ============================================================

  {
    id: 'online-course-platform',
    name: 'Online Course / EdTech Platform',
    description: 'Conversion-optimized course sales page. Transformation promise, social proof.',
    category: 'education',
    mood: 'warm',
    previewColor: '#7C3AED',
    difficulty: 'complex',
    estimatedSections: 9,
    snippetIds: [
      'startup-saas',
      'hero-fullscreen', 'features-bento', 'stats-bar',
      'testimonials-grid', 'pricing-3tier', 'faq-accordion', 'cta-section', 'footer-full',
      'gradient-bg', 'card-shadows', 'glassmorphism-cards',
      'purple-violet',
      'serif-display', 'gradient-text', 'large-headlines',
      'fade-up', 'counter-animation', 'smooth-transitions',
      'use-state', 'use-effect', 'tabs-component', 'stepper-wizard',
      'hero-badge', 'feature-icons', 'avatar-group', 'progress-bar',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'online course, learning, education, bootcamp, certification, skills',
    examplePrompt: 'Build a course platform landing page for "DeepDive Academy" — a technical skills bootcamp. Show student transformation stories, curriculum breakdown, instructor credibility, 50,000+ graduates stat, course tabs, pricing plans, and FAQ.',
    tags: ['education', 'course', 'conversion', 'platform'],
  },

  {
    id: 'school-university',
    name: 'School / University',
    description: 'Prestigious academic institution website. Trust, excellence, tradition.',
    category: 'education',
    mood: 'elegant',
    previewColor: '#1B3A6B',
    difficulty: 'medium',
    estimatedSections: 7,
    snippetIds: [
      'editorial', 'modern-corporate',
      'hero-fullscreen', 'features-3col', 'stats-bar',
      'logo-strip', 'testimonials-grid', 'cta-section', 'footer-full',
      'card-shadows', 'border-accents',
      'blue-indigo',
      'serif-display', 'large-headlines',
      'fade-up', 'smooth-transitions', 'counter-animation',
      'use-state', 'use-effect', 'tabs-component',
      'timeline', 'avatar-group', 'image-gallery',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'university, college, academia, research, campus, admissions',
    examplePrompt: 'Build a prestigious university website. Navy/gold color scheme, dramatic campus hero, program tabs (Engineering, Business, Sciences), research impact stats, alumni success stories, global campus photos, and admissions CTA.',
    tags: ['education', 'university', 'academic', 'prestige'],
  },

  // ============================================================
  // ── HEALTH / WELLNESS ───────────────────────────────────────
  // ============================================================

  {
    id: 'wellness-organic',
    name: 'Wellness / Health — Organic',
    description: 'Calming natural wellness brand. Earthy, serene, holistic.',
    category: 'health',
    mood: 'warm',
    previewColor: '#6B8F71',
    difficulty: 'medium',
    estimatedSections: 7,
    snippetIds: [
      'organic', 'japandi',
      'hero-split', 'features-3col', 'stats-bar',
      'testimonials-carousel', 'cta-section', 'footer-full',
      'grain-texture', 'border-accents',
      'emerald-teal',
      'serif-display', 'tracking-wide',
      'fade-up', 'smooth-transitions', 'floating-elements',
      'use-state', 'use-effect',
      'feature-icons', 'avatar-group', 'progress-bar',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'wellness, mindfulness, meditation, natural, holistic, organic, health',
    examplePrompt: 'Build a wellness app landing page for "MindBloom" — a guided meditation and breathwork app. Organic aesthetic, earthy tones, mindfulness practice features, transformation stats, practitioner testimonials, and serene CTA.',
    tags: ['health', 'wellness', 'organic', 'calm'],
  },

  {
    id: 'fitness-app-dark',
    name: 'Fitness / Gym — Dark Energy',
    description: 'High-energy fitness app or gym website. Grit, power, transformation.',
    category: 'health',
    mood: 'bold',
    previewColor: '#EF4444',
    difficulty: 'medium',
    estimatedSections: 7,
    snippetIds: [
      'dark-luxury',
      'hero-fullscreen', 'features-3col', 'stats-bar',
      'pricing-3tier', 'testimonials-grid', 'cta-section', 'footer-full',
      'gradient-bg', 'neon-glow',
      'orange-fire',
      'slab-serif', 'large-headlines', 'gradient-text',
      'fade-up', 'counter-animation', 'smooth-transitions',
      'use-state', 'use-effect', 'tabs-component',
      'hero-badge', 'progress-bar', 'avatar-group',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'fitness, gym, workout, training, muscle, transformation, strength',
    examplePrompt: 'Build a fitness app landing page for "IronCore" — an AI personal training app. Dark gritty aesthetic, red/orange fire accents, workout stats, transformation stories with before/after, plan comparison, and aggressive CTA.',
    tags: ['fitness', 'gym', 'dark', 'energy'],
  },

  {
    id: 'mental-health-soft',
    name: 'Mental Health — Soft & Safe',
    description: 'Supportive mental health platform. Warm, non-threatening, accessible.',
    category: 'health',
    mood: 'warm',
    previewColor: '#A78BFA',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'claymorphism', 'playful-colorful',
      'hero-centered', 'features-3col', 'testimonials-grid', 'cta-section', 'footer-full',
      'gradient-bg', 'glassmorphism-cards',
      'purple-violet',
      'serif-display', 'gradient-text',
      'fade-up', 'smooth-transitions', 'floating-elements',
      'use-state', 'use-effect', 'faq-accordion',
      'feature-icons', 'avatar-group',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'mental health, therapy, anxiety, wellbeing, support, counseling',
    examplePrompt: 'Build a mental health platform landing page for "Serenity" — an online therapy and wellbeing app. Soft purples and lavenders, warm illustrated features, therapist credentials, privacy reassurances, user testimonials, and a gentle signup CTA.',
    tags: ['health', 'mental', 'soft', 'safe'],
  },

  // ============================================================
  // ── ECOMMERCE ───────────────────────────────────────────────
  // ============================================================

  {
    id: 'ecommerce-luxury-fashion',
    name: 'Luxury Fashion / E-Commerce',
    description: 'High-fashion editorial e-commerce. Exclusivity, desire, editorial photography.',
    category: 'fashion',
    mood: 'elegant',
    previewColor: '#111111',
    difficulty: 'complex',
    estimatedSections: 7,
    snippetIds: [
      'dark-luxury', 'editorial',
      'hero-fullscreen', 'magazine-grid', 'stats-bar', 'cta-section', 'footer-full',
      'gradient-bg', 'grain-texture', 'parallax-layers',
      'amber-gold',
      'serif-display', 'large-headlines', 'tracking-wide',
      'fade-up', 'parallax-scroll', 'smooth-transitions', 'hover-reveal',
      'use-state', 'use-effect',
      'image-gallery', 'timeline', 'scroll-indicator',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'luxury fashion, haute couture, designer, collection, editorial, exclusive',
    examplePrompt: 'Build a luxury fashion brand website for "Maison Vérité" — a Parisian haute couture house. Ultra dark editorial aesthetic, gold accents, magazine-style collection grid, brand story timeline, press coverage logos, and boutique booking CTA.',
    tags: ['fashion', 'luxury', 'editorial', 'ecommerce'],
  },

  {
    id: 'ecommerce-product-landing',
    name: 'Single Product Launch',
    description: 'Apple-style single product reveal page. One product, maximum impact.',
    category: 'ecommerce',
    mood: 'immersive',
    previewColor: '#000000',
    difficulty: 'complex',
    estimatedSections: 8,
    snippetIds: [
      'minimal-light', 'bento-grid',
      'hero-fullscreen', 'features-bento', 'stats-bar',
      'testimonials-carousel', 'pricing-3tier', 'cta-section', 'footer-minimal',
      'glassmorphism-cards', '3d-perspective',
      'monochrome',
      'serif-display', 'large-headlines', 'gradient-text',
      'fade-up', 'parallax-scroll', 'smooth-transitions', 'scroll-progress',
      'use-state', 'use-effect',
      'hero-badge', 'comparison-table', 'image-gallery',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'product launch, hardware, gadget, technology, design, premium',
    examplePrompt: 'Build an Apple-inspired product launch page for "Aura" — a premium smart home speaker. Scroll-storytelling layout, 3D product views, feature-by-feature reveals on scroll, spec comparison vs competitors, price tiers, and pre-order CTA.',
    tags: ['ecommerce', 'product', 'apple', 'minimal'],
  },

  // ============================================================
  // ── MEDIA / CONTENT ─────────────────────────────────────────
  // ============================================================

  {
    id: 'blog-magazine-editorial',
    name: 'Blog / Magazine — Editorial',
    description: 'Premium content publication. New Yorker meets The Verge energy.',
    category: 'media',
    mood: 'elegant',
    previewColor: '#E53E3E',
    difficulty: 'complex',
    estimatedSections: 7,
    snippetIds: [
      'editorial',
      'hero-split', 'magazine-grid', 'stats-bar', 'cta-section', 'footer-full',
      'border-accents', 'card-shadows',
      'monochrome',
      'serif-display', 'large-headlines', 'tracking-wide',
      'fade-up', 'smooth-transitions',
      'use-state', 'use-effect', 'search-filter', 'tabs-component', 'pagination',
      'data-table', 'avatar-group', 'image-gallery',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'magazine, blog, articles, editorial, journalism, content, media',
    examplePrompt: 'Build an editorial magazine website for "The Criterion" — a tech and culture publication. Strong typographic hierarchy, article category tabs, featured article hero, writer profiles, subscriber CTA, and newsletter signup.',
    tags: ['media', 'blog', 'editorial', 'magazine'],
  },

  {
    id: 'podcast-media',
    name: 'Podcast / Audio Show',
    description: 'Cinematic podcast brand page. Episode library, host credibility, subscribe funnel.',
    category: 'media',
    mood: 'bold',
    previewColor: '#6D28D9',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'dark-luxury', 'aurora',
      'hero-centered', 'features-3col', 'stats-bar', 'cta-section', 'footer-full',
      'gradient-bg', 'glassmorphism-cards',
      'purple-violet',
      'serif-display', 'gradient-text', 'large-headlines',
      'fade-up', 'smooth-transitions', 'typewriter',
      'use-state', 'use-effect', 'tabs-component',
      'avatar-group', 'timeline', 'hero-badge',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'podcast, audio, episodes, Spotify, Apple Podcasts, interviews, show',
    examplePrompt: 'Build a podcast brand website for "Deep Signal" — a technology and future-of-work show with 500K+ listeners. Dark atmospheric aesthetic, episode player preview, host bio, top episodes grid, listener count stats, and Spotify/Apple subscribe CTAs.',
    tags: ['podcast', 'media', 'dark', 'audio'],
  },

  // ============================================================
  // ── FOOD / RESTAURANT ───────────────────────────────────────
  // ============================================================

  {
    id: 'restaurant-luxury',
    name: 'Restaurant — Fine Dining',
    description: 'Michelin-star restaurant website. Appetite, elegance, reservation funnel.',
    category: 'food',
    mood: 'elegant',
    previewColor: '#2D1810',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'dark-luxury', 'editorial',
      'hero-fullscreen', 'magazine-grid', 'stats-bar', 'cta-section', 'footer-full',
      'gradient-bg', 'grain-texture', 'image-overlays',
      'amber-gold',
      'serif-display', 'large-headlines', 'tracking-wide',
      'fade-up', 'parallax-scroll', 'smooth-transitions',
      'use-state', 'use-effect',
      'image-gallery', 'timeline', 'scroll-indicator',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'fine dining, restaurant, Michelin, chef, cuisine, reservation, tasting menu',
    examplePrompt: 'Build a fine dining restaurant website for "Lumière" — a two-Michelin-star French restaurant. Dark luxury aesthetic, parallax food photography, chef story, seasonal menu preview, press accolades, and reservation booking CTA.',
    tags: ['food', 'restaurant', 'luxury', 'dark'],
  },

  {
    id: 'restaurant-casual-warm',
    name: 'Restaurant — Casual & Warm',
    description: 'Neighbourhood restaurant or café. Inviting, local, community-first.',
    category: 'food',
    mood: 'warm',
    previewColor: '#C2410C',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'organic', 'cottagecore',
      'hero-centered', 'features-3col', 'stats-bar', 'cta-section', 'footer-full',
      'grain-texture', 'border-accents',
      'orange-fire',
      'serif-display', 'tracking-wide',
      'fade-up', 'smooth-transitions', 'floating-elements',
      'use-state', 'use-effect', 'tabs-component',
      'image-gallery', 'feature-icons',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'café, restaurant, brunch, local, community, fresh, seasonal',
    examplePrompt: 'Build a warm neighbourhood café website for "The Golden Cup" — a specialty coffee and brunch café. Earthy warm design, menu tabs (Coffee, Brunch, Pastries), farm-to-table story, gallery, and online ordering CTA.',
    tags: ['food', 'café', 'warm', 'local'],
  },

  // ============================================================
  // ── TRAVEL / TOURISM ────────────────────────────────────────
  // ============================================================

  {
    id: 'travel-luxury-immersive',
    name: 'Luxury Travel — Cinematic',
    description: 'Ultra-immersive luxury travel brand. Wanderlust, exclusivity, experiences.',
    category: 'travel',
    mood: 'immersive',
    previewColor: '#0369A1',
    difficulty: 'complex',
    estimatedSections: 7,
    snippetIds: [
      'dark-luxury', 'aurora',
      'hero-fullscreen', 'magazine-grid', 'stats-bar', 'cta-section', 'footer-full',
      'gradient-bg', 'parallax-layers', 'image-overlays',
      'cyan-electric',
      'serif-display', 'large-headlines', 'gradient-text',
      'fade-up', 'parallax-scroll', 'smooth-transitions',
      'use-state', 'use-effect', 'tabs-component',
      'image-gallery', 'timeline', 'scroll-indicator',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'luxury travel, bespoke, destinations, experiences, private, exclusive',
    examplePrompt: 'Build a luxury travel agency website for "Terra Incognita" — specialists in private expedition travel. Cinematic full-screen destination photography, destination tabs, curated experiences, travel manifesto, and bespoke inquiry CTA.',
    tags: ['travel', 'luxury', 'immersive', 'cinematic'],
  },

  // ============================================================
  // ── GAMING / ESPORTS ────────────────────────────────────────
  // ============================================================

  {
    id: 'gaming-esports-dark',
    name: 'Gaming / Esports',
    description: 'Aggressive gaming aesthetic. High energy, competitive, electric.',
    category: 'gaming',
    mood: 'edgy',
    previewColor: '#7C3AED',
    difficulty: 'complex',
    estimatedSections: 8,
    snippetIds: [
      'cyberpunk', 'scifi-hud',
      'hero-fullscreen', 'features-bento', 'stats-bar',
      'pricing-3tier', 'testimonials-grid', 'cta-section', 'footer-full',
      'gradient-bg', 'neon-glow', 'particle-system', 'geometric-shapes',
      'purple-violet',
      'mono-display', 'gradient-text', 'large-headlines',
      'fade-up', 'glitch-effect', 'floating-elements', 'counter-animation',
      'use-state', 'use-effect', 'tabs-component',
      'hero-badge', 'avatar-group', 'progress-bar', 'data-table',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'gaming, esports, FPS, tournament, rank, squad, competitive',
    examplePrompt: 'Build a gaming platform landing page for "VortexGG" — a competitive gaming tournament platform. Neon purple/black aesthetic, glitch text effects, live tournament stats, leaderboard preview, subscription tiers (Free/Pro/Elite), and join CTA.',
    tags: ['gaming', 'esports', 'dark', 'neon'],
  },

  // ============================================================
  // ── EVENT ───────────────────────────────────────────────────
  // ============================================================

  {
    id: 'conference-tech',
    name: 'Tech Conference',
    description: 'Premium tech conference registration page. Speakers, agenda, FOMO-driving.',
    category: 'event',
    mood: 'bold',
    previewColor: '#2563EB',
    difficulty: 'complex',
    estimatedSections: 9,
    snippetIds: [
      'dark-luxury', 'modern-corporate',
      'hero-fullscreen', 'features-3col', 'stats-bar',
      'logo-strip', 'pricing-3tier', 'faq-accordion', 'cta-section', 'footer-full',
      'gradient-bg', 'glassmorphism-cards',
      'blue-indigo',
      'serif-display', 'gradient-text', 'large-headlines',
      'fade-up', 'counter-animation', 'smooth-transitions', 'countdown-timer',
      'use-state', 'use-effect', 'tabs-component',
      'hero-badge', 'avatar-group', 'timeline', 'comparison-table',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'conference, summit, keynote, speakers, workshop, networking, tickets',
    examplePrompt: 'Build a tech conference landing page for "FullStack Summit 2026" — 3000 attendees, 80+ speakers. Countdown timer, speaker grid with photos, agenda tabs (Day 1/2/3), sponsorship logos, ticket tiers (Early Bird/Regular/VIP), and registration CTA.',
    tags: ['event', 'conference', 'tickets', 'speakers'],
  },

  {
    id: 'music-festival',
    name: 'Music Festival / Concert',
    description: 'Electrifying music event page. Lineup, tickets, atmosphere-first.',
    category: 'event',
    mood: 'immersive',
    previewColor: '#DB2777',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'vaporwave', 'aurora',
      'hero-fullscreen', 'features-3col', 'stats-bar', 'cta-section', 'footer-minimal',
      'gradient-bg', 'neon-glow', 'particle-system',
      'rose-pink',
      'slab-serif', 'gradient-text', 'large-headlines',
      'fade-up', 'floating-elements', 'smooth-transitions', 'countdown-timer',
      'use-state', 'use-effect', 'tabs-component',
      'hero-badge', 'image-gallery', 'avatar-group',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'festival, music, lineup, stage, headliner, tickets, summer',
    examplePrompt: 'Build a music festival website for "Neon Horizon Fest 2026". Vaporwave aesthetic, pink/purple gradients, artist lineup grid, countdown timer, stage schedule tabs, ticket tier cards, and Instagram gallery.',
    tags: ['festival', 'music', 'neon', 'tickets'],
  },

  // ============================================================
  // ── REAL ESTATE ─────────────────────────────────────────────
  // ============================================================

  {
    id: 'real-estate-luxury',
    name: 'Luxury Real Estate',
    description: 'Premium property showcase. Aspirational living, developer trust.',
    category: 'real-estate',
    mood: 'elegant',
    previewColor: '#1C1917',
    difficulty: 'medium',
    estimatedSections: 7,
    snippetIds: [
      'dark-luxury', 'editorial',
      'hero-fullscreen', 'magazine-grid', 'stats-bar', 'cta-section', 'footer-full',
      'gradient-bg', 'grain-texture', 'image-overlays',
      'amber-gold',
      'serif-display', 'large-headlines', 'tracking-wide',
      'fade-up', 'parallax-scroll', 'smooth-transitions',
      'use-state', 'use-effect', 'tabs-component',
      'image-gallery', 'timeline', 'scroll-indicator',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'luxury real estate, property, penthouse, villa, developer, investment',
    examplePrompt: 'Build a luxury real estate development website for "Crown Heights" — ultra-premium residential towers. Dark editorial aesthetic, full-screen architectural photography, amenity tabs, location stats, developer credentials, and private viewing CTA.',
    tags: ['real-estate', 'luxury', 'property', 'dark'],
  },

  // ============================================================
  // ── NGO / CAUSE ─────────────────────────────────────────────
  // ============================================================

  {
    id: 'ngo-charity',
    name: 'NGO / Charity',
    description: 'Emotionally resonant charity page. Impact-driven, transparent, donation-optimized.',
    category: 'ngo',
    mood: 'warm',
    previewColor: '#059669',
    difficulty: 'medium',
    estimatedSections: 7,
    snippetIds: [
      'organic', 'minimal-light',
      'hero-fullscreen', 'features-2col', 'stats-bar',
      'testimonials-grid', 'cta-section', 'footer-full',
      'border-accents', 'card-shadows',
      'emerald-teal',
      'serif-display', 'large-headlines',
      'fade-up', 'counter-animation', 'smooth-transitions',
      'use-state', 'use-effect',
      'avatar-group', 'timeline', 'progress-bar',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'charity, nonprofit, donation, impact, community, social good, cause',
    examplePrompt: 'Build a charity website for "Seeds of Hope Foundation" — fighting childhood malnutrition in Southeast Asia. Warm earthy design, powerful impact stats (2M meals delivered, 40 countries), program areas, field stories, donation tier cards, and transparent fund usage.',
    tags: ['ngo', 'charity', 'impact', 'warm'],
  },

  // ============================================================
  // ── DASHBOARD / ADMIN ───────────────────────────────────────
  // ============================================================

  {
    id: 'saas-dashboard-dark',
    name: 'Analytics Dashboard — Dark',
    description: 'Full-featured analytics dashboard shell. Data-dense, interactive, professional.',
    category: 'dashboard',
    mood: 'technical',
    previewColor: '#0F172A',
    difficulty: 'complex',
    estimatedSections: 5,
    snippetIds: [
      'dark-luxury', 'scifi-hud',
      'sticky-sidebar', 'kanban-board', 'stats-bar',
      'glassmorphism-cards', 'dot-grid',
      'emerald-teal',
      'mono-display', 'tracking-wide',
      'smooth-transitions', 'skeleton-loader',
      'use-state', 'use-effect', 'use-memo', 'use-ref',
      'tabs-component', 'search-filter', 'pagination', 'sortable-list',
      'multi-select', 'toast-notification', 'dark-mode-toggle',
      'chart-bars', 'data-table', 'progress-bar', 'radar-chart',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'analytics, dashboard, metrics, KPI, data visualization, admin',
    examplePrompt: 'Build a complete SaaS analytics dashboard. Sidebar navigation, header with search, KPI stat cards (Revenue, MRR, Churn, NPS), bar chart for monthly revenue, data table of recent customers with sort/filter, and a Kanban board for tasks.',
    tags: ['dashboard', 'analytics', 'dark', 'data'],
  },

  {
    id: 'admin-panel-light',
    name: 'Admin Panel — Clean Light',
    description: 'Clean light admin interface. CRUD-ready, accessible, professional.',
    category: 'dashboard',
    mood: 'minimal',
    previewColor: '#3B82F6',
    difficulty: 'complex',
    estimatedSections: 4,
    snippetIds: [
      'minimal-light',
      'sticky-sidebar', 'stats-bar',
      'flat-design', 'border-accents', 'card-shadows',
      'blue-indigo',
      'slab-serif', 'tracking-wide',
      'smooth-transitions', 'skeleton-loader',
      'use-state', 'use-effect', 'use-memo',
      'tabs-component', 'search-filter', 'pagination', 'sortable-list',
      'modal-component', 'form-validation', 'toast-notification',
      'multi-select', 'drag-and-drop', 'copy-clipboard',
      'data-table', 'chart-bars', 'comparison-table',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'admin panel, CMS, CRUD, management, users, content',
    examplePrompt: 'Build a clean light admin panel with sidebar navigation, user management table (sortable, filterable, paginated), a modal for editing user details, form validation, toast notifications, and stats overview cards at the top.',
    tags: ['admin', 'dashboard', 'light', 'crud'],
  },

  // ============================================================
  // ── DEVELOPER TOOLS ─────────────────────────────────────────
  // ============================================================

  {
    id: 'devtool-open-source',
    name: 'Open Source / Developer Tool',
    description: 'Dev-first tool page. Code examples, stars, install in seconds.',
    category: 'developer',
    mood: 'technical',
    previewColor: '#059669',
    difficulty: 'medium',
    estimatedSections: 7,
    snippetIds: [
      'minimal-light',
      'hero-centered', 'features-3col', 'stats-bar',
      'logo-strip', 'pricing-3tier', 'cta-section', 'footer-full',
      'border-accents', 'card-shadows',
      'emerald-teal',
      'mono-display', 'gradient-text',
      'fade-up', 'smooth-transitions', 'typewriter',
      'use-state', 'use-effect', 'tabs-component', 'copy-clipboard',
      'code-block', 'comparison-table', 'feature-icons',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'open source, library, SDK, npm, GitHub, developer, CLI, API',
    examplePrompt: 'Build an open-source tool landing page for "FluxQL" — a next-gen GraphQL client library. Tabs showing framework integrations, animated install command with copy button, GitHub stars counter, benchmark comparison table, sponsor logos, and "Get started" CTA.',
    tags: ['developer', 'open-source', 'cli', 'library'],
  },

  {
    id: 'cli-terminal-tool',
    name: 'CLI / Terminal Tool',
    description: 'Hacker-aesthetic page for command-line tools. Terminal demos, instant credibility.',
    category: 'developer',
    mood: 'technical',
    previewColor: '#00FF41',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'cyberpunk',
      'hero-centered', 'features-3col', 'stats-bar', 'cta-section', 'footer-minimal',
      'gradient-bg', 'dot-grid', 'neon-glow',
      'emerald-teal',
      'mono-display', 'large-headlines', 'tracking-wide',
      'typewriter', 'fade-up', 'smooth-transitions',
      'use-state', 'use-effect', 'copy-clipboard', 'tabs-component',
      'code-block', 'feature-icons', 'progress-bar',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'CLI, terminal, bash, command line, automation, devops, shell',
    examplePrompt: 'Build a CLI tool landing page for "deploy.sh" — a zero-config deployment tool. Terminal aesthetic, animated command demo with typewriter effect, single-line install command with copy, feature flags list, benchmark stats, and GitHub link.',
    tags: ['developer', 'cli', 'terminal', 'dark'],
  },

  // ============================================================
  // ── ART / GALLERY ───────────────────────────────────────────
  // ============================================================

  {
    id: 'art-gallery',
    name: 'Art Gallery / Museum',
    description: 'Curated gallery experience online. White cube aesthetic, art-first.',
    category: 'art',
    mood: 'minimal',
    previewColor: '#1A1A1A',
    difficulty: 'medium',
    estimatedSections: 5,
    snippetIds: [
      'minimal-light', 'editorial',
      'hero-fullscreen', 'magazine-grid', 'cta-section', 'footer-minimal',
      'grain-texture',
      'monochrome',
      'serif-display', 'large-headlines', 'tracking-wide', 'outlined-text',
      'fade-up', 'smooth-transitions', 'parallax-scroll',
      'use-state', 'use-effect',
      'image-gallery', 'timeline', 'scroll-indicator',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'art gallery, museum, exhibition, contemporary art, artist, curator',
    examplePrompt: 'Build an art gallery website for "Void Gallery" — a contemporary art space. Ultra minimal white cube aesthetic, full-bleed artwork hero, editorial exhibition grid, artist profiles, upcoming show timeline, and press/visit CTA.',
    tags: ['art', 'gallery', 'minimal', 'white-cube'],
  },

  {
    id: 'digital-artist-portfolio',
    name: 'Digital Artist / Illustrator',
    description: 'Vibrant artist portfolio. Work front-and-center, personality-driven.',
    category: 'art',
    mood: 'playful',
    previewColor: '#EC4899',
    difficulty: 'medium',
    estimatedSections: 5,
    snippetIds: [
      'vaporwave', 'playful-colorful',
      'hero-centered', 'magazine-grid', 'cta-section', 'footer-minimal',
      'gradient-bg', 'geometric-shapes',
      'rose-pink',
      'serif-display', 'gradient-text', 'large-headlines',
      'fade-up', 'floating-elements', 'smooth-transitions',
      'use-state', 'use-effect',
      'image-gallery', 'scroll-indicator',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'digital artist, illustration, character design, commission, art, creative',
    examplePrompt: 'Build a digital illustrator portfolio for "Mika Art" — a character designer and concept artist. Vaporwave pastel aesthetic, animated hero, work gallery with lightbox, commission info section, client testimonials, and contact/hire CTA.',
    tags: ['art', 'illustration', 'vaporwave', 'portfolio'],
  },

  // ============================================================
  // ── WEDDING ─────────────────────────────────────────────────
  // ============================================================

  {
    id: 'wedding-elegant',
    name: 'Wedding / Celebration',
    description: 'Timeless wedding site. Romance, elegance, memories.',
    category: 'wedding',
    mood: 'elegant',
    previewColor: '#F9A8D4',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'minimal-light', 'cottagecore',
      'hero-fullscreen', 'features-3col', 'stats-bar', 'cta-section', 'footer-minimal',
      'grain-texture', 'border-accents',
      'rose-pink',
      'serif-display', 'large-headlines', 'tracking-wide',
      'fade-up', 'floating-elements', 'smooth-transitions',
      'use-state', 'use-effect', 'countdown-timer', 'tabs-component',
      'image-gallery', 'timeline', 'scroll-indicator',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'wedding, celebration, ceremony, reception, RSVP, love, couple',
    examplePrompt: 'Build a wedding website for Sarah & James. Rose/cream aesthetic, countdown timer to wedding day, our story timeline, venue & ceremony details tabs, photo gallery, RSVP section, and accommodation info.',
    tags: ['wedding', 'romance', 'elegant', 'celebration'],
  },

  // ============================================================
  // ── BEAUTY / SALON ──────────────────────────────────────────
  // ============================================================

  {
    id: 'beauty-salon-luxury',
    name: 'Beauty Salon / Spa — Luxury',
    description: 'Premium beauty brand. Indulgent, aspirational, booking-optimized.',
    category: 'beauty',
    mood: 'elegant',
    previewColor: '#9D174D',
    difficulty: 'medium',
    estimatedSections: 6,
    snippetIds: [
      'dark-luxury', 'art-deco',
      'hero-fullscreen', 'features-3col', 'stats-bar', 'cta-section', 'footer-full',
      'gradient-bg', 'grain-texture',
      'amber-gold',
      'serif-display', 'large-headlines', 'tracking-wide',
      'fade-up', 'smooth-transitions', 'floating-elements',
      'use-state', 'use-effect', 'tabs-component',
      'image-gallery', 'avatar-group', 'progress-bar',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'beauty salon, spa, skincare, luxury, treatments, glow, wellness',
    examplePrompt: 'Build a luxury beauty salon website for "Élite Atelier" — a premium skincare and beauty studio. Art deco dark aesthetic with gold, signature treatment menu tabs, before/after gallery, master aesthetician profiles, testimonials, and booking CTA.',
    tags: ['beauty', 'spa', 'luxury', 'dark'],
  },

  // ============================================================
  // ── VIETNAM-SPECIFIC / BILINGUAL ────────────────────────────
  // ============================================================

  {
    id: 'bilingual-vi-en-startup',
    name: 'Bilingual VI/EN — Startup',
    description: 'Vietnam-market startup page with built-in language toggle. Instant switch, no reload.',
    category: 'startup',
    mood: 'bold',
    previewColor: '#DC2626',
    difficulty: 'complex',
    estimatedSections: 7,
    snippetIds: [
      'startup-saas', 'glassmorphism',
      'hero-fullscreen', 'features-bento', 'stats-bar',
      'testimonials-grid', 'pricing-3tier', 'cta-section', 'footer-full',
      'gradient-bg', 'glassmorphism-cards', 'mesh-gradient',
      'blue-indigo',
      'serif-display', 'gradient-text', 'large-headlines',
      'fade-up', 'smooth-transitions', 'counter-animation',
      'use-state', 'use-effect', 'tabs-component',
      'bilingual-toggle',
      'hero-badge', 'feature-icons', 'avatar-group',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'Vietnam startup, bilingual, tiếng Việt, English, Đông Nam Á, công nghệ',
    examplePrompt: 'Build a bilingual VI/EN SaaS landing page for a Vietnamese B2B fintech startup. Language toggle in top-right switches ALL content instantly between Vietnamese and English. Dark blue glassmorphic design, startup energy, growth stats in both languages.',
    tags: ['bilingual', 'vietnam', 'startup', 'i18n'],
  },

  {
    id: 'bilingual-trading-ea',
    name: 'Bilingual — Trading EA / Bot',
    description: 'Vietnam/global trading bot product page. Dual language, MT5, algorithmic credibility.',
    category: 'fintech',
    mood: 'technical',
    previewColor: '#10b981',
    difficulty: 'complex',
    estimatedSections: 8,
    snippetIds: [
      'dark-luxury', 'scifi-hud',
      'hero-split', 'features-bento', 'stats-bar',
      'pricing-3tier', 'testimonials-grid', 'faq-accordion', 'cta-section', 'footer-full',
      'gradient-bg', 'glassmorphism-cards', 'dot-grid',
      'emerald-teal',
      'mono-display', 'gradient-text', 'large-headlines',
      'fade-up', 'counter-animation', 'smooth-transitions',
      'use-state', 'use-effect', 'tabs-component',
      'bilingual-toggle',
      'chart-bars', 'data-table', 'progress-bar', 'comparison-table',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'Expert Advisor, EA, MT5, XAUUSD, vàng, gold trading, robot giao dịch, algorithmic',
    examplePrompt: 'Build a bilingual VI/EN product page for an MT5 Expert Advisor called "AurusEA" trading XAUUSD. Language toggle top-right. Show live backtest performance chart, win rate stats, strategy breakdown tabs (Entry/Exit/Risk), pricing tiers (Monthly/Lifetime), and FAQ accordion.',
    tags: ['trading', 'ea', 'bilingual', 'fintech', 'mt5'],
  },

  // ============================================================
  // ── SPECIAL / EXPERIMENTAL ──────────────────────────────────
  // ============================================================

  {
    id: 'memphis-retro-fun',
    name: 'Memphis / Retro Fun',
    description: 'Joyful 80s Memphis revival. Loud, fun, impossible to ignore.',
    category: 'agency',
    mood: 'playful',
    previewColor: '#FBBF24',
    difficulty: 'medium',
    estimatedSections: 5,
    snippetIds: [
      'memphis', 'playful-colorful',
      'hero-centered', 'features-3col', 'cta-section', 'footer-minimal',
      'geometric-shapes', 'flat-design',
      'amber-gold',
      'slab-serif', 'large-headlines', 'gradient-text',
      'fade-up', 'floating-elements', 'smooth-transitions',
      'use-state', 'use-effect',
      'hero-badge', 'feature-icons',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'Memphis, retro, 80s, fun, bold, geometric, colorful, pop',
    examplePrompt: 'Build a vibrant Memphis-style landing page for a creative studio. Bold geometric patterns, bright yellow/pink/teal palette, squiggly decorative lines, massive slab serif headlines, service cards, and a retro-style CTA.',
    tags: ['memphis', 'retro', 'fun', 'bold'],
  },

  {
    id: 'art-deco-luxury',
    name: 'Art Deco — 1920s Glamour',
    description: 'Roaring twenties opulence. Gold, symmetry, architectural precision.',
    category: 'fashion',
    mood: 'elegant',
    previewColor: '#B8860B',
    difficulty: 'complex',
    estimatedSections: 6,
    snippetIds: [
      'art-deco', 'dark-luxury',
      'hero-fullscreen', 'features-3col', 'stats-bar', 'cta-section', 'footer-full',
      'gradient-bg', 'grain-texture', 'geometric-shapes', 'border-accents',
      'amber-gold',
      'serif-display', 'large-headlines', 'tracking-wide', 'outlined-text',
      'fade-up', 'smooth-transitions',
      'use-state', 'use-effect',
      'image-gallery', 'timeline',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'art deco, 1920s, luxury, gold, geometric, glamour, exclusive',
    examplePrompt: 'Build an Art Deco luxury brand website. Geometric sunburst patterns in gold SVG, symmetrical layout, stepped architectural dividers, serif + wide-tracked caps typography, product showcase, heritage timeline, and exclusive membership CTA.',
    tags: ['art-deco', 'luxury', 'gold', 'elegant'],
  },

  {
    id: 'swiss-corporate-systematic',
    name: 'Swiss International Style',
    description: 'Mathematical precision. Grid systems, objectivity, Helvetica energy.',
    category: 'corporate',
    mood: 'minimal',
    previewColor: '#D00000',
    difficulty: 'medium',
    estimatedSections: 5,
    snippetIds: [
      'swiss-style', 'bauhaus',
      'hero-centered', 'features-3col', 'stats-bar', 'cta-section', 'footer-minimal',
      'flat-design', 'border-accents',
      'orange-fire',
      'slab-serif', 'tracking-wide', 'large-headlines',
      'fade-up', 'smooth-transitions',
      'use-state', 'use-effect',
      'feature-icons', 'data-table',
      'realistic-content', 'google-fonts',
    ],
    defaultKeywords: 'Swiss design, grid, systematic, typography, objective, rational, corporate',
    examplePrompt: 'Build a Swiss International Style website for a design institute. Strict mathematical grid, primary color accents (red), massive Helvetica-like headlines, structured feature grid, typographic hierarchy, and clean footer.',
    tags: ['swiss', 'grid', 'typography', 'systematic'],
  },

  {
    id: 'dark-forest-mystical',
    name: 'Dark Forest — Mystical',
    description: 'Enchanted forest digital experience. Moody, atmospheric, unforgettable.',
    category: 'art',
    mood: 'immersive',
    previewColor: '#14532D',
    difficulty: 'complex',
    estimatedSections: 6,
    snippetIds: [
      'dark-forest', 'mythical-fantasy',
      'hero-fullscreen', 'features-3col', 'stats-bar', 'cta-section', 'footer-full',
      'gradient-bg', 'grain-texture', 'particle-system', 'morphing-shapes',
      'emerald-teal',
      'serif-display', 'gradient-text', 'large-headlines',
      'fade-up', 'floating-elements', 'parallax-scroll', 'smooth-transitions',
      'use-state', 'use-effect',
      'image-gallery', 'scroll-indicator',
      'realistic-content', 'google-fonts', 'reduce-motion',
    ],
    defaultKeywords: 'forest, nature, mystical, dark, atmospheric, enchanted, immersive',
    examplePrompt: 'Build an immersive dark forest experience page for a nature conservation brand "Verdant Earth". Deep forest green atmosphere, misty particle effects, morphing blob shapes, conservation impact stats, and donation CTA.',
    tags: ['nature', 'dark-forest', 'mystical', 'immersive'],
  },

]

// ============================================================
// TEMPLATE REGISTRY + UTILITIES
// ============================================================

export const TEMPLATE_MAP = new Map<string, Template>(
  TEMPLATES.map(t => [t.id, t])
)

export const TOTAL_TEMPLATES = TEMPLATES.length

/** Get all templates for a given category */
export function getByCategory(category: TemplateCategory): Template[] {
  return TEMPLATES.filter(t => t.category === category)
}

/** Get all templates for a given mood */
export function getByMood(mood: TemplateMood): Template[] {
  return TEMPLATES.filter(t => t.mood === mood)
}

/** Search templates by tag */
export function searchByTag(tag: string): Template[] {
  return TEMPLATES.filter(t => t.tags?.includes(tag))
}

/** Return unique categories present in the library */
export const AVAILABLE_CATEGORIES = [
  ...new Set(TEMPLATES.map(t => t.category))
] as TemplateCategory[]

/** Return unique moods present in the library */
export const AVAILABLE_MOODS = [
  ...new Set(TEMPLATES.map(t => t.mood))
] as TemplateMood[]

/** Build a ready-to-send prompt from template ID + optional custom description */
export function promptFromId(
  templateId: string,
  customTask?: string,
  extraKeywords?: string
): string | null {
  const template = TEMPLATE_MAP.get(templateId)
  if (!template) return null
  const snippets = resolveSnippets(template.snippetIds)
  const task = customTask ?? template.examplePrompt
  const keywords = [template.defaultKeywords, extraKeywords].filter(Boolean).join(', ')
  return buildPromptClean(snippets, task, keywords)
}

// ============================================================
// FEATURED / CURATED COLLECTIONS
// ============================================================

export const COLLECTIONS: Record<string, string[]> = {
  '🏆 Best Converters': [
    'saas-dark-hero',
    'startup-waitlist',
    'online-course-platform',
    'startup-product-hunt',
    'saas-bento-glassmorphism',
  ],
  '🌑 Dark & Dramatic': [
    'ai-tool-aurora',
    'fintech-trading-dark',
    'gaming-esports-dark',
    'agency-editorial-dark',
    'crypto-web3',
    'dark-forest-mystical',
  ],
  '☀️ Clean & Minimal': [
    'saas-minimal-light',
    'portfolio-designer-japandi',
    'devtool-open-source',
    'swiss-corporate-systematic',
    'admin-panel-light',
  ],
  '🎨 Most Creative': [
    'agency-brutalist',
    'memphis-retro-fun',
    'art-deco-luxury',
    'ai-cyberpunk-hud',
    'digital-artist-portfolio',
  ],
  '🌏 Vietnam / Bilingual': [
    'bilingual-vi-en-startup',
    'bilingual-trading-ea',
    'fintech-trading-dark',
  ],
  '📊 Data-Heavy': [
    'saas-dashboard-dark',
    'admin-panel-light',
    'fintech-trading-dark',
    'ai-cyberpunk-hud',
    'conference-tech',
  ],
  '✨ Immersive Experience': [
    'travel-luxury-immersive',
    'music-festival',
    'dark-forest-mystical',
    'portfolio-photographer',
    'ecommerce-product-landing',
  ],
  '💼 Corporate & Trust': [
    'corporate-enterprise',
    'consulting-firm',
    'law-firm',
    'fintech-payment-minimal',
    'school-university',
  ],
}

// ============================================================
// QUICK SUMMARY
// ============================================================
// Total templates: 50
// Categories covered: saas, ai, fintech, crypto, agency, portfolio,
//   startup, corporate, education, health, ecommerce, fashion, media,
//   food, travel, gaming, event, real-estate, ngo, dashboard, developer,
//   art, wedding, beauty, legal
// Moods covered: bold, elegant, playful, technical, warm, edgy, minimal, immersive
// Special: bilingual VI/EN templates for Vietnam market
// Each template ships with: validated snippet set, default keywords, example prompt
// Use promptFromId(id) to get a production-ready AI generation prompt instantly