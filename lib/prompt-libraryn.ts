// ============================================================
// PROMPT LIBRARY — Full Modern Fullstack v2
// For AI Page Generator (Groq/Claude TSX generation)
// ============================================================

export type SnippetCategory =
  | 'vibe' | 'layout' | 'style' | 'animation' | 'tech'
  | 'color' | 'typography' | 'component' | 'interaction' | 'performance'

export type SnippetPriority = 'critical' | 'high' | 'medium' | 'low'

export interface Snippet {
  id: string
  label: string
  category: SnippetCategory
  prompt: string
  conflicts?: string[]
  requires?: string[]
  tags?: string[]
  source?: 'anthropic' | 'community' | 'custom' | 'openai'
  priority?: SnippetPriority   // used by buildPrompt token budget
  tokenWeight?: number          // estimated tokens this prompt uses
}

export interface ValidationResult {
  valid: Snippet[]
  removed: Array<{ snippet: Snippet; reason: string; conflictsWith: string }>
  warnings: string[]
}

// ============================================================
// VIBES — Overall aesthetic direction
// ============================================================
export const VIBES: Snippet[] = [
  {
    id: 'dark-luxury',
    label: '🌑 Dark Luxury',
    category: 'vibe',
    priority: 'high',
    prompt: 'ultra dark luxury aesthetic, deep black backgrounds (#0A0A0F), gold/amber accents (#C9A84C), premium feel, high contrast, editorial typography, sophisticated spacing',
    conflicts: ['minimal-light', 'playful-colorful', 'brutalism', 'memphis'],
    tags: ['dark', 'premium', 'gold'],
  },
  {
    id: 'minimal-light',
    label: '☀️ Minimal Light',
    category: 'vibe',
    priority: 'high',
    prompt: 'clean minimal light design, white/cream backgrounds, subtle gray borders, generous whitespace, refined typography, understated elegance',
    conflicts: ['dark-luxury', 'cyberpunk', 'neon-glow', 'aurora', 'memphis', 'brutalism'],
    tags: ['light', 'clean', 'minimal'],
  },
  {
    id: 'cyberpunk',
    label: '🤖 Cyberpunk',
    category: 'vibe',
    priority: 'high',
    prompt: 'cyberpunk aesthetic, neon cyan/magenta on near-black, glitch effects, grid lines, tech-noir atmosphere, digital rain motifs, HUD-style UI elements',
    conflicts: ['minimal-light', 'japandi', 'editorial', 'organic'],
    tags: ['dark', 'neon', 'tech'],
  },
  {
    id: 'editorial',
    label: '🏛️ Editorial',
    category: 'vibe',
    priority: 'high',
    prompt: 'editorial magazine aesthetic, strong typographic hierarchy, serif display fonts mixed with clean sans-serif, bold headlines, asymmetric layouts, print-inspired design',
    conflicts: ['cyberpunk', 'neon-glow', 'memphis', 'brutalism'],
    tags: ['typography', 'magazine', 'sophisticated'],
  },
  {
    id: 'organic',
    label: '🌊 Organic',
    category: 'vibe',
    priority: 'high',
    prompt: 'organic natural aesthetic, earthy tones (sage green, warm beige, terracotta), flowing blob shapes, soft gradients, nature-inspired textures, warm and inviting',
    conflicts: ['cyberpunk', 'brutalism', 'neon-glow', 'dark-luxury'],
    tags: ['nature', 'warm', 'soft'],
  },
  {
    id: 'glassmorphism',
    label: '🪟 Glassmorphism',
    category: 'vibe',
    priority: 'high',
    prompt: 'glassmorphism design, frosted glass cards with backdrop-filter blur, semi-transparent backgrounds, subtle borders, layered depth, colorful gradient backgrounds behind glass elements',
    conflicts: ['brutalism', 'neumorphism', 'flat-design'],
    requires: ['gradient-bg'],
    tags: ['glass', 'transparent', 'modern'],
  },
  {
    id: 'brutalism',
    label: '⚡ Brutalism',
    category: 'vibe',
    priority: 'high',
    prompt: 'web brutalism, raw bold design, stark black borders, offset shadows, intentionally rough typography, high contrast black/white with 1-2 accent colors, anti-design aesthetic',
    conflicts: ['glassmorphism', 'minimal-light', 'organic', 'editorial', 'japandi', 'dark-luxury', 'card-shadows', 'neon-glow', 'frosted-glass'],
    tags: ['bold', 'raw', 'contrast'],
  },
  {
    id: 'japandi',
    label: '🍃 Japandi',
    category: 'vibe',
    priority: 'high',
    prompt: 'japandi minimalist aesthetic, wabi-sabi philosophy, neutral tones (warm white, beige, charcoal), natural textures, negative space mastery, zen-like calm, functional beauty',
    conflicts: ['cyberpunk', 'brutalism', 'memphis', 'neon-glow', 'playful-colorful'],
    tags: ['japanese', 'minimal', 'calm'],
  },
  {
    id: 'memphis',
    label: '🎨 Memphis',
    category: 'vibe',
    priority: 'high',
    prompt: 'Memphis design movement, bold geometric patterns, bright primary colors + pastels, squiggles and confetti shapes, 80s-inspired retro-modern, playful and energetic',
    conflicts: ['minimal-light', 'dark-luxury', 'japandi', 'editorial', 'glassmorphism', 'neumorphism'],
    tags: ['retro', 'colorful', 'geometric'],
  },
  {
    id: 'aurora',
    label: '🌌 Aurora',
    category: 'vibe',
    priority: 'high',
    prompt: 'aurora borealis inspired, deep dark backgrounds with flowing purple/blue/green/pink gradient orbs, dreamy atmospheric glow effects, cosmic depth',
    conflicts: ['minimal-light', 'brutalism', 'memphis'],
    requires: ['gradient-bg'],
    tags: ['dark', 'gradient', 'dreamy'],
  },
  {
    id: 'neumorphism',
    label: '💎 Neumorphism',
    category: 'vibe',
    priority: 'high',
    prompt: 'neumorphic design, soft UI, extruded elements from background, dual shadow technique (light top-left, dark bottom-right), monochromatic soft palette, tactile depth',
    conflicts: ['glassmorphism', 'brutalism', 'dark-luxury', 'memphis', 'flat-design'],
    tags: ['soft', 'tactile', 'shadows'],
  },
  {
    id: 'retro-futurism',
    label: '🚀 Retro Futurism',
    category: 'vibe',
    priority: 'high',
    prompt: 'retro-futurism aesthetic, 70s-80s vision of the future, warm oranges and deep purples, chrome accents, space-age typography, geometric sci-fi patterns',
    conflicts: ['minimal-light', 'japandi', 'organic'],
    tags: ['retro', 'space', 'warm'],
  },
  {
    id: 'playful-colorful',
    label: '🎉 Playful Colorful',
    category: 'vibe',
    priority: 'high',
    prompt: 'vibrant playful design, bold bright colors, rounded corners everywhere, friendly approachable feel, fun micro-interactions, energetic and optimistic',
    conflicts: ['dark-luxury', 'editorial', 'japandi', 'brutalism'],
    tags: ['colorful', 'fun', 'rounded'],
  },
  {
    id: 'swiss-style',
    label: '🇨🇭 Swiss Style',
    category: 'vibe',
    priority: 'high',
    prompt: 'International Typographic Style, strict grid system, Helvetica/neutral sans-serif, primary colors used sparingly, objectivity and clarity above all, mathematical precision in layout',
    conflicts: ['memphis', 'organic', 'playful-colorful', 'brutalism'],
    tags: ['grid', 'typography', 'systematic'],
  },
  {
    id: 'bento-grid',
    label: '🍱 Bento Grid',
    category: 'vibe',
    priority: 'high',
    prompt: 'Apple-inspired bento grid layout, varying card sizes, clean dark/light cards with strong hierarchy, feature card dominant, supporting cards in grid, modern SaaS aesthetic',
    conflicts: ['brutalism', 'memphis'],
    tags: ['grid', 'cards', 'apple'],
  },
  {
    id: 'claymorphism',
    label: '🧸 Claymorphism',
    category: 'vibe',
    priority: 'high',
    prompt: 'claymorphism 3D inflated look, thick colored drop shadows matching element color, rounded puffy shapes, pastel backgrounds, playful 3D depth without perspective transforms',
    conflicts: ['brutalism', 'glassmorphism', 'neumorphism', 'dark-luxury', 'swiss-style'],
    tags: ['3d', 'playful', 'pastel'],
  },
  {
    id: 'scifi-hud',
    label: '🛸 Sci-Fi HUD',
    category: 'vibe',
    priority: 'high',
    prompt: 'science fiction HUD interface, dark background, cyan/green data readouts, corner bracket decorations, scanline overlays, status indicators, military-spec UI feel',
    conflicts: ['minimal-light', 'organic', 'japandi', 'playful-colorful'],
    tags: ['scifi', 'dark', 'tech'],
  },
  {
    id: 'vaporwave',
    label: '🌆 Vaporwave',
    category: 'vibe',
    priority: 'high',
    prompt: 'vaporwave aesthetic, pink and purple gradients, retro grid floors, chrome text, 80s nostalgia, sunset palette (#FF6EC7, #8B2FC9, #00FFFF), dreamy retro-digital',
    conflicts: ['minimal-light', 'japandi', 'swiss-style', 'organic'],
    tags: ['retro', 'pink', 'gradient'],
  },
]

// ============================================================
// LAYOUTS
// ============================================================
export const LAYOUTS: Snippet[] = [
  {
    id: 'hero-fullscreen',
    label: '🖼️ Hero Fullscreen',
    category: 'layout',
    priority: 'high',
    prompt: 'full viewport height hero section (min-h-screen), centered content, dramatic visual impact, strong headline hierarchy',
    conflicts: ['hero-split', 'hero-centered'],
    tags: ['hero', 'fullscreen'],
  },
  {
    id: 'hero-split',
    label: '↔️ Hero Split',
    category: 'layout',
    priority: 'high',
    prompt: 'split hero layout, left text content right visual/illustration, 50/50 or 60/40 grid, responsive stacks on mobile',
    conflicts: ['hero-fullscreen', 'hero-centered'],
    tags: ['hero', 'split'],
  },
  {
    id: 'hero-centered',
    label: '⬛ Hero Centered',
    category: 'layout',
    priority: 'high',
    prompt: 'centered hero with max-width container, text centered, CTA buttons centered, balanced composition',
    conflicts: ['hero-split', 'hero-fullscreen'],
    tags: ['hero', 'centered'],
  },
  {
    id: 'hero-video-bg',
    label: '🎬 Hero Video BG',
    category: 'layout',
    priority: 'medium',
    prompt: 'hero with full-bleed video background using <video autoPlay muted loop playsInline>, dark overlay for text readability, content centered on top',
    conflicts: ['hero-split'],
    tags: ['hero', 'video'],
  },
  {
    id: 'features-3col',
    label: '⬛⬛⬛ Features 3-Col',
    category: 'layout',
    priority: 'medium',
    prompt: 'features grid with 3 columns on desktop, 2 on tablet, 1 on mobile, icon + title + description cards',
    conflicts: ['features-2col', 'features-bento'],
    tags: ['features', 'grid'],
  },
  {
    id: 'features-2col',
    label: '⬛⬛ Features 2-Col',
    category: 'layout',
    priority: 'medium',
    prompt: 'alternating 2-column feature sections, image/icon left text right then flip, zig-zag storytelling layout',
    conflicts: ['features-3col', 'features-bento'],
    tags: ['features', 'alternating'],
  },
  {
    id: 'features-bento',
    label: '🍱 Features Bento',
    category: 'layout',
    priority: 'medium',
    prompt: 'bento grid features, 1 large hero card + smaller supporting cards, CSS grid with varying sizes (col-span, row-span)',
    conflicts: ['features-3col', 'features-2col'],
    tags: ['features', 'bento'],
  },
  {
    id: 'sticky-sidebar',
    label: '📌 Sticky Sidebar',
    category: 'layout',
    priority: 'medium',
    prompt: 'two-column layout with sticky sidebar (position:sticky top-24), sidebar for navigation/filters, main content scrolls independently',
    tags: ['sidebar', 'sticky'],
  },
  {
    id: 'magazine-grid',
    label: '📰 Magazine Grid',
    category: 'layout',
    priority: 'medium',
    prompt: 'editorial magazine grid, asymmetric columns, large hero article + smaller article cards, varied image sizes, newspaper-inspired layout',
    conflicts: ['features-3col'],
    tags: ['magazine', 'editorial', 'grid'],
  },
  {
    id: 'kanban-board',
    label: '📋 Kanban Board',
    category: 'layout',
    priority: 'medium',
    prompt: 'kanban board layout with horizontal scrollable columns, card-based items per column, column headers with count badge, drag-ready structure',
    tags: ['kanban', 'board', 'columns'],
  },
  {
    id: 'pricing-3tier',
    label: '💰 Pricing 3-Tier',
    category: 'layout',
    priority: 'medium',
    prompt: 'pricing section with 3 tiers (Free/Pro/Enterprise), middle tier highlighted/popular, feature checklist per tier, CTA button per tier',
    tags: ['pricing', 'saas'],
  },
  {
    id: 'testimonials-grid',
    label: '💬 Testimonials Grid',
    category: 'layout',
    priority: 'medium',
    prompt: 'testimonials section with masonry or grid layout, avatar + name + role + quote cards, star ratings',
    conflicts: ['testimonials-carousel'],
    tags: ['social-proof', 'testimonials'],
  },
  {
    id: 'testimonials-carousel',
    label: '🎠 Testimonials Carousel',
    category: 'layout',
    priority: 'medium',
    prompt: 'testimonials carousel with prev/next navigation, auto-advance every 4s, smooth slide transition using useState, dot indicators',
    conflicts: ['testimonials-grid'],
    tags: ['social-proof', 'carousel'],
  },
  {
    id: 'stats-bar',
    label: '📊 Stats Bar',
    category: 'layout',
    priority: 'medium',
    prompt: 'statistics row with 4 large numbers, labels, animated count-up on scroll using IntersectionObserver and useEffect',
    tags: ['stats', 'numbers'],
  },
  {
    id: 'faq-accordion',
    label: '❓ FAQ Accordion',
    category: 'layout',
    priority: 'medium',
    prompt: 'FAQ accordion section, questions expand/collapse with smooth height transition using useState, max 8 questions, chevron rotates on open',
    tags: ['faq', 'accordion'],
  },
  {
    id: 'cta-section',
    label: '🎯 CTA Section',
    category: 'layout',
    priority: 'medium',
    prompt: 'strong call-to-action section, large heading, supporting text, primary + secondary buttons, optional email input',
    tags: ['cta', 'conversion'],
  },
  {
    id: 'footer-full',
    label: '🦶 Footer Full',
    category: 'layout',
    priority: 'low',
    prompt: 'comprehensive footer with logo, tagline, 3-4 link columns, social icons, copyright, newsletter signup',
    conflicts: ['footer-minimal'],
    tags: ['footer'],
  },
  {
    id: 'footer-minimal',
    label: '🦶 Footer Minimal',
    category: 'layout',
    priority: 'low',
    prompt: 'minimal single-row footer, logo left, links center, copyright right',
    conflicts: ['footer-full'],
    tags: ['footer'],
  },
  {
    id: 'logo-strip',
    label: '🏢 Logo Strip',
    category: 'layout',
    priority: 'low',
    prompt: 'social proof logo strip, "trusted by" heading, horizontal row of company logos with grayscale filter, hover reveals color',
    tags: ['social-proof', 'logos'],
  },
]

// ============================================================
// STYLES
// ============================================================
export const STYLES: Snippet[] = [
  {
    id: 'gradient-bg',
    label: '🌈 Gradient Background',
    category: 'style',
    priority: 'high',
    prompt: 'rich gradient backgrounds using radial-gradient and linear-gradient, layered depth with multiple gradient orbs, not flat',
    conflicts: ['flat-design'],
    tags: ['gradient', 'background'],
  },
  {
    id: 'flat-design',
    label: '⬜ Flat Design',
    category: 'style',
    priority: 'high',
    prompt: 'flat design, solid colors only, no shadows or gradients, 2D aesthetic, crisp edges',
    conflicts: ['gradient-bg', 'glassmorphism', 'neumorphism', 'card-shadows', 'neon-glow', 'frosted-glass'],
    tags: ['flat', 'minimal'],
  },
  {
    id: 'card-shadows',
    label: '🃏 Card Shadows',
    category: 'style',
    priority: 'medium',
    prompt: 'cards with layered box-shadows for depth, hover elevates with stronger shadow and subtle scale(1.02) transform',
    conflicts: ['flat-design', 'brutalism'],
    tags: ['cards', 'depth'],
  },
  {
    id: 'border-accents',
    label: '📐 Border Accents',
    category: 'style',
    priority: 'medium',
    prompt: 'strategic borders as design elements, gradient borders via border-image or pseudo-elements, partial borders (top-only accent lines)',
    tags: ['borders', 'detail'],
  },
  {
    id: 'grain-texture',
    label: '🌾 Grain Texture',
    category: 'style',
    priority: 'low',
    prompt: 'subtle SVG grain/noise texture overlay using feTurbulence filter, adds organic depth, opacity 2-5%, applied via pseudo-element',
    tags: ['texture', 'organic'],
  },
  {
    id: 'neon-glow',
    label: '💡 Neon Glow',
    category: 'style',
    priority: 'medium',
    prompt: 'neon glow effects via box-shadow and text-shadow with colored spread, luminous pulsing borders, glow animations on interactive elements',
    conflicts: ['minimal-light', 'japandi', 'flat-design'],
    tags: ['glow', 'neon', 'dark'],
  },
  {
    id: 'frosted-glass',
    label: '❄️ Frosted Glass',
    category: 'style',
    priority: 'medium',
    prompt: 'frosted glass cards: backdrop-filter:blur(20px), background:rgba(255,255,255,0.05), border:1px solid rgba(255,255,255,0.1)',
    conflicts: ['flat-design', 'brutalism'],
    requires: ['gradient-bg'],
    tags: ['glass', 'blur'],
  },
  {
    id: 'geometric-shapes',
    label: '🔷 Geometric Shapes',
    category: 'style',
    priority: 'low',
    prompt: 'decorative SVG geometric shapes as background elements (circles, hexagons, triangles), low opacity 5-15%, adds visual rhythm without clutter',
    tags: ['decorative', 'shapes'],
  },
  {
    id: 'image-overlays',
    label: '🖼️ Image Overlays',
    category: 'style',
    priority: 'low',
    prompt: 'gradient overlays on images for text readability, mix-blend-mode effects, duotone color treatment',
    tags: ['images', 'overlay'],
  },
  {
    id: 'mesh-gradient',
    label: '🕸️ Mesh Gradient',
    category: 'style',
    priority: 'medium',
    prompt: 'CSS mesh gradient background using multiple radial-gradient layers at different positions and colors, smooth organic color blending, no hard edges',
    conflicts: ['flat-design'],
    tags: ['gradient', 'mesh', 'background'],
  },
  {
    id: 'dot-grid',
    label: '⠿ Dot Grid',
    category: 'style',
    priority: 'low',
    prompt: 'subtle dot grid pattern background using CSS radial-gradient with 1px dots, low opacity, gives technical/blueprint feel',
    tags: ['pattern', 'background', 'subtle'],
  },
  {
    id: 'noise-texture',
    label: '📺 Noise Texture',
    category: 'style',
    priority: 'low',
    prompt: 'CSS noise texture overlay using repeating SVG filter, adds film grain organic depth, opacity 3-8%',
    tags: ['texture', 'noise'],
  },
  {
    id: 'parallax-layers',
    label: '🌊 Parallax Layers',
    category: 'style',
    priority: 'medium',
    prompt: 'multi-layer parallax depth, background elements move slower than foreground on scroll, creates cinematic 3D depth illusion',
    tags: ['parallax', 'depth', '3d'],
  },
  {
    id: 'glassmorphism-cards',
    label: '🔮 Glassmorphism Cards',
    category: 'style',
    priority: 'medium',
    prompt: 'cards with heavy frosted glass: backdrop-filter:blur(40px) saturate(180%), semi-transparent fill, layered over gradient blobs',
    conflicts: ['flat-design', 'brutalism'],
    requires: ['gradient-bg'],
    tags: ['glass', 'cards'],
  },
  {
    id: '3d-perspective',
    label: '📦 3D Perspective',
    category: 'style',
    priority: 'medium',
    prompt: 'CSS 3D perspective transforms on cards and sections, perspective:1000px, rotateX/rotateY on hover for depth effect, transform-style:preserve-3d',
    conflicts: ['flat-design'],
    tags: ['3d', 'perspective', 'depth'],
  },
]

// ============================================================
// TYPOGRAPHY
// ============================================================
export const TYPOGRAPHY: Snippet[] = [
  {
    id: 'serif-display',
    label: '📰 Serif Display',
    category: 'typography',
    priority: 'high',
    prompt: 'import Playfair Display or Cormorant Garamond from Google Fonts, use for hero headlines and section titles, pair with clean sans-serif body',
    conflicts: ['mono-display', 'slab-serif'],
    tags: ['serif', 'elegant'],
  },
  {
    id: 'mono-display',
    label: '💻 Mono Display',
    category: 'typography',
    priority: 'high',
    prompt: 'import JetBrains Mono or Space Mono from Google Fonts for headlines, technical/hacker aesthetic, all-caps with wide letter-spacing',
    conflicts: ['serif-display', 'slab-serif'],
    tags: ['monospace', 'tech'],
  },
  {
    id: 'slab-serif',
    label: '🔠 Slab Serif',
    category: 'typography',
    priority: 'high',
    prompt: 'import Roboto Slab or Bitter from Google Fonts, bold slab serifs for impact headlines, strong and authoritative',
    conflicts: ['serif-display', 'mono-display'],
    tags: ['slab', 'bold'],
  },
  {
    id: 'large-headlines',
    label: '🔤 Large Headlines',
    category: 'typography',
    priority: 'medium',
    prompt: 'oversized hero typography 6rem-10rem, fluid sizing with clamp(), font-weight 800-900, tight line-height 0.9-1.1',
    tags: ['display', 'oversized'],
  },
  {
    id: 'gradient-text',
    label: '🌈 Gradient Text',
    category: 'typography',
    priority: 'medium',
    prompt: 'gradient text via background-clip:text and -webkit-text-fill-color:transparent, multi-color gradient on key headlines only',
    tags: ['gradient', 'text-effect'],
  },
  {
    id: 'tracking-wide',
    label: '↔️ Wide Tracking',
    category: 'typography',
    priority: 'low',
    prompt: 'generous letter-spacing on labels (0.1em-0.3em), uppercase small labels with wide tracking for visual hierarchy',
    tags: ['spacing', 'labels'],
  },
  {
    id: 'variable-font',
    label: '🎚️ Variable Font',
    category: 'typography',
    priority: 'medium',
    prompt: 'use variable font with font-variation-settings, animate font-weight on hover for smooth weight transitions, adds sophistication',
    tags: ['variable', 'animation', 'font'],
  },
  {
    id: 'outlined-text',
    label: '⭕ Outlined Text',
    category: 'typography',
    priority: 'low',
    prompt: 'text stroke effect on large headlines using -webkit-text-stroke, mix solid and outlined text in same heading for contrast',
    tags: ['stroke', 'outline', 'display'],
  },
]

// ============================================================
// ANIMATIONS
// ============================================================
export const ANIMATIONS: Snippet[] = [
  {
    id: 'fade-up',
    label: '⬆️ Fade Up on Scroll',
    category: 'animation',
    priority: 'medium',
    prompt: 'elements fade up on scroll via IntersectionObserver + useEffect, CSS @keyframes fadeUp (translateY 30px → 0, opacity 0 → 1), staggered delays',
    conflicts: ['no-animation'],
    tags: ['scroll', 'entrance'],
  },
  {
    id: 'parallax-scroll',
    label: '🌊 Parallax Scroll',
    category: 'animation',
    priority: 'medium',
    prompt: 'parallax: background elements translateY at 0.3x scroll speed, useEffect scroll listener with cleanup, requestAnimationFrame for performance',
    conflicts: ['no-animation', 'virtual-list', 'infinite-scroll'],
    tags: ['parallax', 'scroll'],
  },
  {
    id: 'hover-scale',
    label: '🔍 Hover Scale',
    category: 'animation',
    priority: 'medium',
    prompt: 'scale(1.03) on hover for cards and interactive elements, transition:all 0.3s cubic-bezier(0.4,0,0.2,1), paired with shadow enhancement',
    conflicts: ['no-animation'],
    tags: ['hover', 'micro'],
  },
  {
    id: 'floating-elements',
    label: '🎈 Floating Animation',
    category: 'animation',
    priority: 'low',
    prompt: '@keyframes float: translateY(0) → translateY(-12px) → translateY(0), 3s ease-in-out infinite, vary delays for natural feel',
    conflicts: ['no-animation', 'reduce-motion'],
    tags: ['float', 'decorative'],
  },
  {
    id: 'counter-animation',
    label: '🔢 Counter Animation',
    category: 'animation',
    priority: 'medium',
    prompt: 'animated number count-up using useEffect + requestAnimationFrame with easing, triggered by IntersectionObserver on stats section',
    conflicts: ['no-animation'],
    tags: ['counter', 'numbers'],
  },
  {
    id: 'gradient-shift',
    label: '🌅 Gradient Shift',
    category: 'animation',
    priority: 'low',
    prompt: '@keyframes gradient-shift with background-size:200% and animated background-position, slow 8s loop, subtle color breathing effect',
    conflicts: ['no-animation', 'flat-design'],
    tags: ['gradient', 'animated'],
  },
  {
    id: 'typewriter',
    label: '⌨️ Typewriter Effect',
    category: 'animation',
    priority: 'medium',
    prompt: 'typewriter cycling through words array using useState + setInterval, adds/removes characters, blinking cursor via CSS animation',
    conflicts: ['no-animation'],
    tags: ['text', 'typing'],
  },
  {
    id: 'smooth-transitions',
    label: '✨ Smooth Transitions',
    category: 'animation',
    priority: 'medium',
    prompt: 'all interactive elements: transition:all 0.3s ease, color/opacity/transform all animate smoothly, no jarring state changes',
    conflicts: ['no-animation'],
    tags: ['transition', 'polish'],
  },
  {
    id: 'magnetic-hover',
    label: '🧲 Magnetic Hover',
    category: 'animation',
    priority: 'low',
    prompt: 'magnetic button effect: onMouseMove calculates cursor offset from button center, translates button slightly toward cursor with useRef and useState, resets on mouseLeave',
    conflicts: ['no-animation'],
    tags: ['hover', 'cursor', 'interactive'],
  },
  {
    id: 'particle-system',
    label: '✨ Particle System',
    category: 'animation',
    priority: 'low',
    prompt: 'canvas or CSS particle system, floating dots/stars in background using useEffect array of particles with position/velocity, requestAnimationFrame loop',
    conflicts: ['no-animation', 'flat-design'],
    tags: ['particles', 'background', 'canvas'],
  },
  {
    id: 'morphing-shapes',
    label: '🔵 Morphing SVG',
    category: 'animation',
    priority: 'low',
    prompt: 'SVG blob shapes that smoothly morph using CSS animation on SVG path d attribute or border-radius hack, organic flowing background shapes',
    conflicts: ['no-animation'],
    tags: ['svg', 'morph', 'blob'],
  },
  {
    id: 'scroll-progress',
    label: '📏 Scroll Progress Bar',
    category: 'animation',
    priority: 'low',
    prompt: 'thin progress bar at top showing scroll position, useEffect + scroll listener, width = (scrollY / (docHeight - windowHeight)) * 100%',
    conflicts: ['no-animation'],
    tags: ['scroll', 'progress', 'indicator'],
  },
  {
    id: 'page-transition',
    label: '🎭 Page Transition',
    category: 'animation',
    priority: 'low',
    prompt: 'smooth fade/slide transition effect when sections change, opacity + translateY animation, staggered child animations on entry',
    conflicts: ['no-animation'],
    tags: ['transition', 'page'],
  },
  {
    id: 'glitch-effect',
    label: '⚡ Glitch Effect',
    category: 'animation',
    priority: 'low',
    prompt: 'CSS glitch animation on hover for headers, RGB channel split via text-shadow offsets, clip-path slice animation, @keyframes glitch',
    conflicts: ['no-animation', 'minimal-light', 'japandi'],
    tags: ['glitch', 'cyber', 'hover'],
  },
  {
    id: 'no-animation',
    label: '⏸️ No Animation',
    category: 'animation',
    priority: 'high',
    prompt: 'no animations, static design, all transitions removed, focus purely on content and layout',
    conflicts: ['fade-up', 'parallax-scroll', 'floating-elements', 'counter-animation', 'gradient-shift', 'typewriter', 'hover-scale', 'magnetic-hover', 'particle-system', 'morphing-shapes', 'scroll-progress', 'page-transition', 'glitch-effect'],
    tags: ['static', 'accessible'],
  },
  {
    id: 'reduce-motion',
    label: '♿ Reduce Motion',
    category: 'animation',
    priority: 'medium',
    prompt: 'wrap all animations in @media (prefers-reduced-motion: no-preference), provide instant static fallbacks for users with motion sensitivity',
    tags: ['accessible', 'motion'],
  },
]

// ============================================================
// TECH
// ============================================================
export const TECH: Snippet[] = [
  {
    id: 'use-state',
    label: '⚛️ useState',
    category: 'tech',
    priority: 'high',
    prompt: 'use React.useState for all interactive UI: toggles, tabs, accordions, modals, form fields, counters',
    tags: ['react', 'state'],
  },
  {
    id: 'use-effect',
    label: '🔄 useEffect',
    category: 'tech',
    priority: 'high',
    prompt: 'use React.useEffect for side effects: scroll event listeners, IntersectionObserver, timers, animations on mount, always cleanup on return',
    tags: ['react', 'effects'],
  },
  {
    id: 'use-ref',
    label: '📌 useRef',
    category: 'tech',
    priority: 'medium',
    prompt: 'use React.useRef for DOM element references, scroll position tracking, animation frame IDs, previous value tracking without re-render',
    tags: ['react', 'ref', 'dom'],
  },
  {
    id: 'use-memo',
    label: '🧠 useMemo',
    category: 'tech',
    priority: 'low',
    prompt: 'use React.useMemo for expensive computations (filtered lists, sorted arrays, computed stats), prevents unnecessary recalculation on re-render',
    tags: ['react', 'performance', 'memo'],
  },
  {
    id: 'use-callback',
    label: '🔁 useCallback',
    category: 'tech',
    priority: 'low',
    prompt: 'use React.useCallback for event handlers passed to child-like elements, stable function references, prevents unnecessary re-creation',
    tags: ['react', 'performance', 'callback'],
  },
  {
    id: 'use-reducer',
    label: '🏗️ useReducer',
    category: 'tech',
    priority: 'low',
    prompt: 'use React.useReducer for complex state with multiple sub-values, dispatch actions pattern, cleaner than multiple useState for related state',
    tags: ['react', 'state', 'reducer'],
  },
  {
    id: 'tabs-component',
    label: '📑 Tabs',
    category: 'tech',
    priority: 'medium',
    prompt: 'tabbed interface with useState activeTab, smooth content fade transition, keyboard accessible, sliding indicator underline',
    tags: ['ui', 'navigation'],
  },
  {
    id: 'modal-component',
    label: '🗔 Modal',
    category: 'tech',
    priority: 'medium',
    prompt: 'modal/dialog: useState isOpen, backdrop click closes, Escape key handler via useEffect, smooth fade-in, centered with backdrop blur',
    tags: ['ui', 'overlay'],
  },
  {
    id: 'dark-mode-toggle',
    label: '🌙 Dark Mode Toggle',
    category: 'tech',
    priority: 'medium',
    prompt: 'dark/light mode toggle with useState, CSS custom properties switch, smooth color transition, persist to localStorage via useEffect',
    tags: ['theme', 'toggle'],
  },
  {
    id: 'search-filter',
    label: '🔍 Search/Filter',
    category: 'tech',
    priority: 'medium',
    prompt: 'live search/filter with useState query, useMemo filtered results, highlight matching text, empty state message',
    tags: ['filter', 'search'],
  },
  {
    id: 'infinite-scroll',
    label: '♾️ Infinite Scroll',
    category: 'tech',
    priority: 'medium',
    prompt: 'infinite scroll: IntersectionObserver on sentinel div at bottom, load more items via useState, skeleton loading state',
    conflicts: ['virtual-list', 'parallax-scroll'],
    tags: ['scroll', 'loading'],
  },
  {
    id: 'virtual-list',
    label: '⚡ Virtual List',
    category: 'tech',
    priority: 'low',
    prompt: 'virtualized list: only render visible rows, calculate itemHeight * totalItems for container, slice visible range from data array',
    conflicts: ['infinite-scroll', 'parallax-scroll'],
    tags: ['performance', 'list'],
  },
  {
    id: 'form-validation',
    label: '✅ Form Validation',
    category: 'tech',
    priority: 'medium',
    prompt: 'form with useState values + errors, validate on blur and submit, inline error messages per field, submit button disabled until valid',
    tags: ['form', 'validation'],
  },
  {
    id: 'toast-notification',
    label: '🔔 Toast Notifications',
    category: 'tech',
    priority: 'medium',
    prompt: 'toast system: useState queue array, auto-dismiss after 3s via useEffect setTimeout, success/error/info/warning variants, slide-in from corner',
    tags: ['ui', 'feedback'],
  },
  {
    id: 'copy-clipboard',
    label: '📋 Copy to Clipboard',
    category: 'tech',
    priority: 'low',
    prompt: 'copy button: navigator.clipboard.writeText(), useState copied boolean, show "Copied!" for 2s then reset, visual checkmark feedback',
    tags: ['utility', 'ux'],
  },
  {
    id: 'intersection-observer',
    label: '👁️ Intersection Observer',
    category: 'tech',
    priority: 'medium',
    prompt: 'IntersectionObserver via useEffect + useRef, trigger animations or lazy-load when element enters viewport, disconnect on unmount',
    tags: ['scroll', 'performance'],
  },
  {
    id: 'drag-and-drop',
    label: '✊ Drag & Drop',
    category: 'tech',
    priority: 'medium',
    prompt: 'HTML5 drag-and-drop: onDragStart sets dragged item id, onDragOver preventDefault, onDrop reorders useState array, visual drag-over highlight',
    tags: ['dnd', 'interactive', 'reorder'],
  },
  {
    id: 'web-storage',
    label: '💾 localStorage',
    category: 'tech',
    priority: 'low',
    prompt: 'persist state to localStorage via useEffect: JSON.stringify on save, JSON.parse on load, try/catch for SSR safety, sync across tabs',
    tags: ['storage', 'persist'],
  },
  {
    id: 'keyboard-shortcuts',
    label: '⌨️ Keyboard Shortcuts',
    category: 'tech',
    priority: 'low',
    prompt: 'keyboard shortcut handler via useEffect + keydown listener, Cmd/Ctrl+K for search, Escape to close, arrow keys for navigation, cleanup on unmount',
    tags: ['keyboard', 'accessibility', 'shortcuts'],
  },
  {
    id: 'context-menu',
    label: '🖱️ Context Menu',
    category: 'tech',
    priority: 'low',
    prompt: 'right-click context menu: onContextMenu preventDefault, useState position {x,y} + visible, click-outside closes via useEffect listener',
    tags: ['context', 'menu', 'right-click'],
  },
  {
    id: 'command-palette',
    label: '⌘ Command Palette',
    category: 'tech',
    priority: 'low',
    prompt: 'Cmd+K command palette: modal overlay, fuzzy search commands with useState, keyboard navigation up/down arrows, execute on Enter',
    tags: ['command', 'search', 'keyboard'],
  },
  {
    id: 'multi-select',
    label: '☑️ Multi-Select',
    category: 'tech',
    priority: 'low',
    prompt: 'multi-select checkboxes with useState Set, select-all toggle, bulk action bar appears when items selected, count indicator',
    tags: ['select', 'checkbox', 'bulk'],
  },
  {
    id: 'sortable-list',
    label: '↕️ Sortable List',
    category: 'tech',
    priority: 'low',
    prompt: 'sortable list with click-to-sort columns, useState sortKey + sortDir, useMemo sorted array, visual sort indicator arrows',
    tags: ['sort', 'table', 'list'],
  },
  {
    id: 'debounce-input',
    label: '⏱️ Debounce Input',
    category: 'tech',
    priority: 'low',
    prompt: 'debounced search input: useEffect with 300ms setTimeout cleanup, only fires search after user stops typing',
    tags: ['input', 'performance', 'debounce'],
  },
  {
    id: 'pagination',
    label: '📄 Pagination',
    category: 'tech',
    priority: 'medium',
    prompt: 'pagination: useState currentPage, useMemo paginated slice, prev/next + numbered buttons, shows current range "1-10 of 100"',
    conflicts: ['infinite-scroll'],
    tags: ['pagination', 'navigation'],
  },
  {
    id: 'skeleton-loader',
    label: '💀 Skeleton Loader',
    category: 'tech',
    priority: 'medium',
    prompt: 'skeleton loading placeholders matching content layout, shimmer animation via @keyframes, useState isLoading switches between skeleton and content',
    tags: ['loading', 'skeleton', 'ux'],
  },
  {
    id: 'tooltip',
    label: '💬 Tooltip',
    category: 'tech',
    priority: 'low',
    prompt: 'tooltip on hover: useState showTooltip per element, absolute positioned below/above, fade-in animation, smart positioning stays in viewport',
    tags: ['tooltip', 'hover', 'info'],
  },
  {
    id: 'rating-stars',
    label: '⭐ Rating Stars',
    category: 'tech',
    priority: 'low',
    prompt: 'interactive star rating: useState hover + selected value, filled/half/empty stars, click to set rating, accessible aria-labels',
    tags: ['rating', 'stars', 'input'],
  },
  {
    id: 'color-picker',
    label: '🎨 Color Picker',
    category: 'tech',
    priority: 'low',
    prompt: 'color picker: preset color swatches grid, useState selectedColor, applies color to target element live, custom hex input field',
    tags: ['color', 'picker', 'customization'],
  },
  {
    id: 'file-upload',
    label: '📁 File Upload',
    category: 'tech',
    priority: 'low',
    prompt: 'file upload dropzone: onDragOver/onDrop handlers, useState file list, click to browse fallback, file type/size validation, preview for images',
    tags: ['file', 'upload', 'drag'],
  },
  {
    id: 'countdown-timer',
    label: '⏰ Countdown Timer',
    category: 'tech',
    priority: 'low',
    prompt: 'countdown timer to target date using useEffect setInterval, displays days/hours/minutes/seconds, clears interval on unmount',
    tags: ['timer', 'countdown', 'urgency'],
  },
  {
    id: 'stepper-wizard',
    label: '🧙 Stepper/Wizard',
    category: 'tech',
    priority: 'medium',
    prompt: 'multi-step wizard: useState currentStep, progress indicator bar, next/back navigation, validate each step before advance, summary on final step',
    tags: ['stepper', 'wizard', 'form'],
  },
  {
    id: 'share-api',
    label: '📤 Web Share API',
    category: 'tech',
    priority: 'low',
    prompt: 'native Web Share API: navigator.share() with title/text/url, fallback copy-to-clipboard if not supported, useState share feedback',
    tags: ['share', 'native', 'mobile'],
  },
]

// ============================================================
// COLOR PALETTES
// ============================================================
export const COLORS: Snippet[] = [
  {
    id: 'emerald-teal',
    label: '💚 Emerald/Teal',
    category: 'color',
    priority: 'high',
    prompt: 'color palette: dark bg #030712, primary emerald #10b981, secondary teal #14b8a6, accent #6ee7b7, text #f0fdf4',
    conflicts: ['purple-violet', 'amber-gold', 'rose-pink', 'blue-indigo', 'monochrome', 'orange-fire', 'cyan-electric'],
    tags: ['green', 'dark'],
  },
  {
    id: 'purple-violet',
    label: '💜 Purple/Violet',
    category: 'color',
    priority: 'high',
    prompt: 'color palette: dark #0F0A1E, primary purple #7C3AED, secondary violet #8B5CF6, accent #C4B5FD, glow rgba(124,58,237,0.3)',
    conflicts: ['emerald-teal', 'amber-gold', 'rose-pink', 'monochrome', 'orange-fire', 'cyan-electric'],
    tags: ['purple', 'dark'],
  },
  {
    id: 'amber-gold',
    label: '🟡 Amber/Gold',
    category: 'color',
    priority: 'high',
    prompt: 'color palette: deep dark #0A0806, primary gold #C9A84C, secondary amber #D97706, accent #FDE68A, parchment #F5EFE0',
    conflicts: ['emerald-teal', 'purple-violet', 'blue-indigo', 'rose-pink', 'monochrome'],
    tags: ['gold', 'luxury'],
  },
  {
    id: 'blue-indigo',
    label: '💙 Blue/Indigo',
    category: 'color',
    priority: 'high',
    prompt: 'color palette: dark navy #0D1117, primary blue #3B82F6, secondary indigo #6366F1, accent #93C5FD, electric highlights',
    conflicts: ['amber-gold', 'rose-pink', 'orange-fire', 'monochrome'],
    tags: ['blue', 'tech'],
  },
  {
    id: 'rose-pink',
    label: '🌸 Rose/Pink',
    category: 'color',
    priority: 'high',
    prompt: 'color palette: soft bg #FFF1F2, primary rose #F43F5E, secondary pink #EC4899, accent #FDA4AF, warm and playful',
    conflicts: ['amber-gold', 'blue-indigo', 'monochrome', 'cyan-electric'],
    tags: ['pink', 'playful'],
  },
  {
    id: 'monochrome',
    label: '⚫ Monochrome',
    category: 'color',
    priority: 'high',
    prompt: 'strict monochrome, pure black #000 and white #fff with gray scale, maximum 1 accent color for CTAs only',
    conflicts: ['emerald-teal', 'purple-violet', 'amber-gold', 'rose-pink', 'blue-indigo', 'orange-fire', 'cyan-electric'],
    tags: ['black-white', 'minimal'],
  },
  {
    id: 'orange-fire',
    label: '🔥 Orange/Fire',
    category: 'color',
    priority: 'high',
    prompt: 'color palette: dark charcoal #111, primary orange #F97316, secondary red #EF4444, accent #FED7AA, energy and urgency',
    conflicts: ['emerald-teal', 'purple-violet', 'blue-indigo', 'rose-pink', 'monochrome'],
    tags: ['orange', 'energy'],
  },
  {
    id: 'cyan-electric',
    label: '⚡ Cyan/Electric',
    category: 'color',
    priority: 'high',
    prompt: 'color palette: near-black #050A14, primary cyan #06B6D4, secondary electric blue #0EA5E9, neon accent #67E8F9, electric energy',
    conflicts: ['emerald-teal', 'purple-violet', 'rose-pink', 'monochrome'],
    tags: ['cyan', 'electric', 'dark'],
  },
]

// ============================================================
// COMPONENTS
// ============================================================
export const COMPONENTS: Snippet[] = [
  {
    id: 'hero-badge',
    label: '🏷️ Hero Badge',
    category: 'component',
    priority: 'low',
    prompt: 'small gradient-bordered badge/pill above hero headline, icon + label, "New" or category indicator with pulse animation',
    tags: ['hero', 'badge'],
  },
  {
    id: 'feature-icons',
    label: '🎯 Feature Icons',
    category: 'component',
    priority: 'medium',
    prompt: 'feature cards: colored rounded icon container, emoji or inline SVG icon, title, description, hover lift effect',
    tags: ['features', 'icons'],
  },
  {
    id: 'avatar-group',
    label: '👥 Avatar Group',
    category: 'component',
    priority: 'low',
    prompt: 'overlapping avatar circles with -margin, +N overflow indicator, "Join 10,000+ users" social proof element',
    tags: ['social-proof', 'users'],
  },
  {
    id: 'progress-bar',
    label: '📊 Progress Bar',
    category: 'component',
    priority: 'medium',
    prompt: 'animated skill/stat progress bars, percentage labels, color coded, smooth width animation to final value on scroll via IntersectionObserver',
    tags: ['stats', 'visual'],
  },
  {
    id: 'timeline',
    label: '📅 Timeline',
    category: 'component',
    priority: 'medium',
    prompt: 'vertical timeline, alternating left/right cards, connecting dot-line, dates, descriptions, fade-in on scroll',
    tags: ['history', 'process'],
  },
  {
    id: 'comparison-table',
    label: '⚖️ Comparison Table',
    category: 'component',
    priority: 'medium',
    prompt: 'feature comparison table, ✓/✗ marks, highlight recommended column, sticky header on scroll, mobile horizontal scroll',
    tags: ['pricing', 'comparison'],
  },
  {
    id: 'scroll-indicator',
    label: '⬇️ Scroll Indicator',
    category: 'component',
    priority: 'low',
    prompt: 'animated scroll-down cue at hero bottom, bouncing chevron or mouse icon CSS animation, auto-hides after first scroll',
    tags: ['hero', 'ux'],
  },
  {
    id: 'back-to-top',
    label: '⬆️ Back to Top',
    category: 'component',
    priority: 'low',
    prompt: 'back-to-top button: useState visible after 300px scroll, smooth scrollTo(0,0), fixed bottom-right, fade in/out',
    tags: ['navigation', 'ux'],
  },
  {
    id: 'notification-badge',
    label: '🔴 Notification Badge',
    category: 'component',
    priority: 'low',
    prompt: 'notification count badge on icons, useState count, animate scale on new notification, red dot or numbered badge',
    tags: ['badge', 'notification'],
  },
  {
    id: 'breadcrumbs',
    label: '🍞 Breadcrumbs',
    category: 'component',
    priority: 'low',
    prompt: 'breadcrumb navigation with separator (/ or ›), current page not linked, truncate long paths on mobile',
    tags: ['navigation', 'breadcrumb'],
  },
  {
    id: 'code-block',
    label: '💻 Code Block',
    category: 'component',
    priority: 'medium',
    prompt: 'styled code block with syntax-like coloring, monospace font, copy-to-clipboard button, dark background, line numbers optional',
    tags: ['code', 'developer'],
  },
  {
    id: 'data-table',
    label: '📋 Data Table',
    category: 'component',
    priority: 'medium',
    prompt: 'data table with sortable columns (useState sortKey/dir), striped rows, hover highlight, responsive horizontal scroll on mobile',
    tags: ['table', 'data'],
  },
  {
    id: 'image-gallery',
    label: '🖼️ Image Gallery',
    category: 'component',
    priority: 'medium',
    prompt: 'image gallery grid with lightbox: useState selectedImage, click opens full-screen overlay, prev/next arrows, keyboard navigation, click outside closes',
    tags: ['gallery', 'images', 'lightbox'],
  },
  {
    id: 'map-embed',
    label: '🗺️ Map Embed',
    category: 'component',
    priority: 'low',
    prompt: 'styled map container with rounded corners, custom marker overlay, address card beside map',
    tags: ['map', 'location'],
  },
  {
    id: 'chart-bars',
    label: '📊 Bar Chart',
    category: 'component',
    priority: 'medium',
    prompt: 'CSS-only bar chart with animated height grow on mount, value labels, category labels, color-coded bars, no external library',
    tags: ['chart', 'data-viz'],
  },
  {
    id: 'radar-chart',
    label: '🕸️ Radar Chart',
    category: 'component',
    priority: 'low',
    prompt: 'SVG radar/spider chart, polygon for each dataset, grid lines, axis labels, filled area with opacity, pure SVG + useState for hover',
    tags: ['chart', 'svg', 'comparison'],
  },
]

// ============================================================
// INTERACTIONS
// ============================================================
export const INTERACTIONS: Snippet[] = [
  {
    id: 'hover-reveal',
    label: '👀 Hover Reveal',
    category: 'interaction',
    priority: 'low',
    prompt: 'hidden content reveals on hover, opacity 0→1 transition, overlay information on cards',
    tags: ['hover', 'reveal'],
  },
  {
    id: 'click-to-expand',
    label: '📖 Click to Expand',
    category: 'interaction',
    priority: 'medium',
    prompt: 'expandable sections with useState toggle, max-height transition 0→auto trick with max-height:9999px, chevron rotates 180°',
    tags: ['expand', 'toggle'],
  },
  {
    id: 'active-state-tabs',
    label: '🔘 Active State Tabs',
    category: 'interaction',
    priority: 'medium',
    prompt: 'tab navigation: sliding pill/underline indicator using CSS transform translateX, content fades between tabs',
    tags: ['tabs', 'navigation'],
  },
  {
    id: 'input-focus-effects',
    label: '✏️ Input Focus Effects',
    category: 'interaction',
    priority: 'medium',
    prompt: 'form inputs: floating label animation on focus (translateY + scale), colored focus ring glow, smooth transitions',
    tags: ['form', 'focus'],
  },
  {
    id: 'bilingual-toggle',
    label: '🌐 Bilingual VI/EN',
    category: 'interaction',
    priority: 'high',
    prompt: 'Vietnamese/English language toggle with useState lang, all text content as {vi:..., en:...} objects, instant switch no reload, persist to localStorage',
    tags: ['i18n', 'bilingual'],
  },
  {
    id: 'swipe-gesture',
    label: '👆 Swipe Gesture',
    category: 'interaction',
    priority: 'low',
    prompt: 'touch swipe detection: onTouchStart records startX, onTouchEnd compares with endX, threshold 50px, triggers next/prev on carousel or drawer',
    tags: ['mobile', 'touch', 'gesture'],
  },
  {
    id: 'long-press',
    label: '🖱️ Long Press',
    category: 'interaction',
    priority: 'low',
    prompt: 'long press detection: onMouseDown/onTouchStart sets 500ms timeout, onMouseUp/onTouchEnd clears it, visual press feedback with scale',
    tags: ['mobile', 'press', 'gesture'],
  },
  {
    id: 'pull-to-refresh',
    label: '🔃 Pull to Refresh',
    category: 'interaction',
    priority: 'low',
    prompt: 'pull-to-refresh: touch event tracking, threshold 80px pull distance, loading indicator, useState isPulling + isRefreshing',
    tags: ['mobile', 'refresh', 'gesture'],
  },
]

// ============================================================
// PERFORMANCE
// ============================================================
export const PERFORMANCE: Snippet[] = [
  {
    id: 'lazy-images',
    label: '🐌 Lazy Load Images',
    category: 'performance',
    priority: 'medium',
    prompt: 'images with loading="lazy" + decoding="async", blur placeholder via CSS filter while loading, IntersectionObserver for custom lazy load',
    tags: ['images', 'lazy'],
  },
  {
    id: 'code-splitting',
    label: '✂️ Code Splitting',
    category: 'performance',
    priority: 'low',
    prompt: 'heavy components in React.lazy + Suspense, skeleton fallback, dynamic import only when needed',
    tags: ['loading', 'split'],
  },
  {
    id: 'debounce-input',
    label: '⏱️ Debounce Input',
    category: 'performance',
    priority: 'low',
    prompt: 'debounce search inputs: useEffect cleanup setTimeout pattern, 300ms delay before executing search/filter',
    tags: ['input', 'optimize'],
  },
  {
    id: 'memo-components',
    label: '🧩 Memo Components',
    category: 'performance',
    priority: 'low',
    prompt: 'wrap pure list-item components in React.memo, useCallback for handlers passed as props, prevents unnecessary re-renders in large lists',
    tags: ['memo', 'optimize', 'react'],
  },
  {
    id: 'web-workers',
    label: '⚙️ Web Workers',
    category: 'performance',
    priority: 'low',
    prompt: 'offload heavy computation (data processing, sorting large arrays) to inline Web Worker via Blob URL, postMessage results back',
    tags: ['worker', 'threading', 'compute'],
  },
]

// ============================================================
// ANTHROPIC PROMPT ENGINEERING PRINCIPLES (fixed constraints)
// ============================================================
export const ANTHROPIC_PRINCIPLES: Snippet[] = [
  {
    id: 'role-context',
    label: '🎭 Role + Context',
    category: 'tech',
    priority: 'critical',
    prompt: 'You are an expert senior frontend developer and UI/UX designer with 10 years experience building production React applications.',
    source: 'anthropic',
    tags: ['system', 'role'],
  },
  {
    id: 'output-format',
    label: '📄 Output Format',
    category: 'tech',
    priority: 'critical',
    prompt: 'Output ONLY raw TSX code. No markdown backticks, no explanations, no comments. Start directly with function App()',
    source: 'anthropic',
    tags: ['format', 'output'],
  },
  {
    id: 'quality-bar',
    label: '⭐ Quality Bar',
    category: 'tech',
    priority: 'critical',
    prompt: 'The design must be production-ready, visually stunning, and NOT generic. Avoid cookie-cutter AI-generated aesthetics.',
    source: 'anthropic',
    tags: ['quality', 'design'],
  },
  {
    id: 'mobile-first',
    label: '📱 Mobile First',
    category: 'tech',
    priority: 'critical',
    prompt: 'Mobile-first responsive design mandatory. Start from 375px, use md: lg: xl: breakpoints. Touch targets minimum 44px.',
    source: 'anthropic',
    tags: ['responsive', 'mobile'],
  },
  {
    id: 'no-navbar',
    label: '🚫 No Navbar',
    category: 'tech',
    priority: 'critical',
    prompt: 'CRITICAL: Do NOT create a navbar or header. The site already has one. Do NOT use position:fixed except for essential floating elements. Do NOT use z-index above 40.',
    source: 'custom',
    tags: ['constraint', 'layout'],
  },
  {
    id: 'render-app',
    label: '⚛️ Render App',
    category: 'tech',
    priority: 'critical',
    prompt: 'Structure: single function App() with all logic inside using React.useState/useEffect/useRef. End file with exactly: render(<App />)',
    source: 'custom',
    tags: ['structure', 'required'],
  },
  {
    id: 'no-imports',
    label: '🚫 No Imports',
    category: 'tech',
    priority: 'critical',
    prompt: 'Do NOT use any import statements. React is available globally. Use React.useState, React.useEffect, React.useRef, React.useMemo, React.useCallback etc.',
    source: 'custom',
    tags: ['constraint', 'required'],
  },
  {
    id: 'realistic-content',
    label: '📝 Realistic Content',
    category: 'tech',
    priority: 'high',
    prompt: 'Use realistic, detailed placeholder content. Not "Lorem ipsum". Write actual meaningful copy that fits the topic.',
    source: 'anthropic',
    tags: ['content', 'quality'],
  },
  {
    id: 'tailwind-only',
    label: '🎨 Tailwind Only',
    category: 'tech',
    priority: 'critical',
    prompt: 'Use Tailwind CSS classes exclusively for layout/spacing. For custom animations use inline style={{}} or <style> tag with @keyframes. No CSS modules.',
    source: 'custom',
    tags: ['css', 'tailwind'],
  },
  {
    id: 'google-fonts',
    label: '✍️ Google Fonts',
    category: 'tech',
    priority: 'high',
    prompt: 'Import Google Fonts via @import url() inside a <style> tag at root level. Apply via inline style fontFamily.',
    source: 'custom',
    tags: ['fonts', 'typography'],
  },
]

// ============================================================
// VALIDATION — conflict resolution with priority logic
// ============================================================

const ALL_SNIPPETS_MAP: Record<string, Snippet> = {}

function buildMap() {
  const all = [
    ...VIBES, ...LAYOUTS, ...STYLES, ...TYPOGRAPHY,
    ...ANIMATIONS, ...TECH, ...COLORS, ...COMPONENTS,
    ...INTERACTIONS, ...PERFORMANCE, ...ANTHROPIC_PRINCIPLES,
  ]
  all.forEach(s => { ALL_SNIPPETS_MAP[s.id] = s })
}
buildMap()

const PRIORITY_ORDER: Record<SnippetPriority, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

export function validateSelection(selected: Snippet[]): ValidationResult {
  const result: ValidationResult = { valid: [], removed: [], warnings: [] }

  // Track which ids are "blocked" by already-accepted snippets
  const blockedIds = new Set<string>()
  // Process in priority order: critical > high > medium > low
  const sorted = [...selected].sort((a, b) =>
    (PRIORITY_ORDER[b.priority ?? 'medium'] ?? 2) - (PRIORITY_ORDER[a.priority ?? 'medium'] ?? 2)
  )

  for (const snippet of sorted) {
    if (blockedIds.has(snippet.id)) {
      // Find who blocked it
      const blocker = result.valid.find(v => v.conflicts?.includes(snippet.id))
      result.removed.push({
        snippet,
        reason: 'conflict',
        conflictsWith: blocker?.id ?? 'unknown',
      })
      continue
    }

    result.valid.push(snippet)

    // Block all conflicts of this snippet
    snippet.conflicts?.forEach(c => blockedIds.add(c))
  }

  // Check requires
  result.valid.forEach(snippet => {
    snippet.requires?.forEach(reqId => {
      if (!result.valid.find(v => v.id === reqId)) {
        const req = ALL_SNIPPETS_MAP[reqId]
        result.warnings.push(
          `"${snippet.label}" works best with "${req?.label ?? reqId}" — consider adding it.`
        )
      }
    })
  })

  // Warn if multiple vibes selected (unusual but possible after conflict resolution)
  const vibeCount = result.valid.filter(s => s.category === 'vibe').length
  if (vibeCount > 1) {
    result.warnings.push(`${vibeCount} vibe styles selected — the generated design may feel mixed. Consider using 1.`)
  }

  // Warn if no color selected
  const hasColor = result.valid.some(s => s.category === 'color')
  if (!hasColor) {
    result.warnings.push('No color palette selected — AI will choose its own colors.')
  }

  return result
}

// ============================================================
// BUILD PROMPT — token budget + priority ordering
// ============================================================

const TOKEN_BUDGET = 1800  // rough max tokens for design direction section

// Rough token estimate: 1 token ≈ 4 chars
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

const CATEGORY_ORDER: SnippetCategory[] = [
  'vibe', 'color', 'layout', 'typography', 'style',
  'animation', 'tech', 'component', 'interaction', 'performance',
]

export function buildPrompt(
  selected: Snippet[],
  userDescription: string,
  keywords: string = ''
): string {
  // 1. Always validate first
  const { valid, removed, warnings } = validateSelection(selected)

  // 2. Fixed system constraints (always included, not in budget)
  const FIXED_IDS = ['no-navbar', 'render-app', 'no-imports', 'tailwind-only']
  const systemParts = [
    ANTHROPIC_PRINCIPLES.find(p => p.id === 'role-context')?.prompt ?? '',
    ANTHROPIC_PRINCIPLES.find(p => p.id === 'output-format')?.prompt ?? '',
    ANTHROPIC_PRINCIPLES.find(p => p.id === 'quality-bar')?.prompt ?? '',
    ANTHROPIC_PRINCIPLES.find(p => p.id === 'mobile-first')?.prompt ?? '',
  ]
  const constraintParts = FIXED_IDS.map(id =>
    ANTHROPIC_PRINCIPLES.find(p => p.id === id)?.prompt ?? ''
  )

  // 3. Sort valid snippets by category order then priority
  const designSnippets = valid
    .filter(s => !ANTHROPIC_PRINCIPLES.find(p => p.id === s.id))
    .sort((a, b) => {
      const catA = CATEGORY_ORDER.indexOf(a.category)
      const catB = CATEGORY_ORDER.indexOf(b.category)
      if (catA !== catB) return catA - catB
      return (PRIORITY_ORDER[b.priority ?? 'medium'] ?? 2) - (PRIORITY_ORDER[a.priority ?? 'medium'] ?? 2)
    })

  // 4. Apply token budget — fill until budget runs out, critical/high first
  const included: Snippet[] = []
  const skipped: Snippet[] = []
  let tokenCount = 0

  // Always include critical+high first
  const highPriority = designSnippets.filter(s =>
    (s.priority === 'critical' || s.priority === 'high')
  )
  const lowerPriority = designSnippets.filter(s =>
    s.priority !== 'critical' && s.priority !== 'high'
  )

  for (const snippet of [...highPriority, ...lowerPriority]) {
    const tokens = estimateTokens(snippet.prompt)
    if (tokenCount + tokens <= TOKEN_BUDGET) {
      included.push(snippet)
      tokenCount += tokens
    } else {
      skipped.push(snippet)
    }
  }

  // 5. Also include any explicitly selected Anthropic principles (google-fonts, realistic-content)
  const extraPrinciples = valid.filter(s =>
    ANTHROPIC_PRINCIPLES.find(p => p.id === s.id) &&
    !FIXED_IDS.includes(s.id) &&
    !['role-context', 'output-format', 'quality-bar', 'mobile-first'].includes(s.id)
  )

  // 6. Build sections
  const designLines = included.map(s => `• ${s.prompt}`)
  const extraLines = extraPrinciples.map(s => `• ${s.prompt}`)

  // 7. Debug info (stripped in production via buildPromptClean)
  const debugLines: string[] = []
  if (removed.length > 0) {
    debugLines.push(`[REMOVED CONFLICTS: ${removed.map(r => `${r.snippet.id} (blocked by ${r.conflictsWith})`).join(', ')}]`)
  }
  if (skipped.length > 0) {
    debugLines.push(`[SKIPPED (token budget): ${skipped.map(s => s.id).join(', ')}]`)
  }
  if (warnings.length > 0) {
    debugLines.push(`[WARNINGS: ${warnings.join(' | ')}]`)
  }

  return `${systemParts.join(' ')}

MANDATORY CONSTRAINTS:
${constraintParts.map(c => `• ${c}`).join('\n')}
${extraLines.length ? '\nADDITIONAL SETUP:\n' + extraLines.join('\n') : ''}

DESIGN DIRECTION:
${designLines.join('\n')}
${keywords ? `\nKEYWORDS: ${keywords}` : ''}
${debugLines.length ? '\n' + debugLines.join('\n') : ''}

TASK: ${userDescription}

Build a complete, stunning, production-ready React page component. Every section should have rich content. Make it memorable.`
}

// Production version — no debug lines
export function buildPromptClean(
  selected: Snippet[],
  userDescription: string,
  keywords: string = ''
): string {
  const full = buildPrompt(selected, userDescription, keywords)
  return full.replace(/\[.*?\]\n?/g, '').trim()
}

// ============================================================
// FULL LIBRARY EXPORT
// ============================================================
export const FULL_LIBRARY = {
  vibes: VIBES,
  layouts: LAYOUTS,
  styles: STYLES,
  typography: TYPOGRAPHY,
  animations: ANIMATIONS,
  tech: TECH,
  colors: COLORS,
  components: COMPONENTS,
  interactions: INTERACTIONS,
  performance: PERFORMANCE,
  anthropic: ANTHROPIC_PRINCIPLES,
}

export const TOTAL_SNIPPETS = Object.values(FULL_LIBRARY).reduce(
  (acc, arr) => acc + arr.length, 0
)
// Total: ~150+ snippets with full conflict mapping, priority system, token budget
