// ============================================================
// PROMPT LIBRARY — Full Modern Fullstack
// For AI Page Generator (Groq/Claude TSX generation)
// ============================================================

export type SnippetCategory = 
  | 'vibe' | 'layout' | 'style' | 'animation' | 'tech' 
  | 'color' | 'typography' | 'component' | 'interaction' | 'performance'

export interface Snippet {
  id: string
  label: string
  category: SnippetCategory
  prompt: string          // what gets injected into AI prompt
  conflicts?: string[]    // snippet ids that conflict
  requires?: string[]     // snippet ids that work best together
  tags?: string[]
  source?: 'anthropic' | 'community' | 'custom' | 'openai'
}

// ============================================================
// VIBES — Overall aesthetic direction
// ============================================================
export const VIBES: Snippet[] = [
  {
    id: 'dark-luxury',
    label: '🌑 Dark Luxury',
    category: 'vibe',
    prompt: 'ultra dark luxury aesthetic, deep black backgrounds (#0A0A0F), gold/amber accents (#C9A84C), premium feel, high contrast, editorial typography, sophisticated spacing',
    conflicts: ['minimal-light', 'playful-colorful', 'brutalism', 'memphis'],
    tags: ['dark', 'premium', 'gold'],
  },
  {
    id: 'minimal-light',
    label: '☀️ Minimal Light',
    category: 'vibe',
    prompt: 'clean minimal light design, white/cream backgrounds, subtle gray borders, generous whitespace, refined typography, understated elegance',
    conflicts: ['dark-luxury', 'cyberpunk', 'neon-glow', 'aurora', 'memphis', 'brutalism'],
    tags: ['light', 'clean', 'minimal'],
  },
  {
    id: 'cyberpunk',
    label: '🤖 Cyberpunk',
    category: 'vibe',
    prompt: 'cyberpunk aesthetic, neon cyan/magenta on near-black, glitch effects, grid lines, tech-noir atmosphere, digital rain motifs, HUD-style UI elements',
    conflicts: ['minimal-light', 'japandi', 'editorial', 'organic'],
    tags: ['dark', 'neon', 'tech'],
  },
  {
    id: 'editorial',
    label: '🏛️ Editorial',
    category: 'vibe',
    prompt: 'editorial magazine aesthetic, strong typographic hierarchy, serif display fonts mixed with clean sans-serif, bold headlines, asymmetric layouts, print-inspired design',
    conflicts: ['cyberpunk', 'neon-glow', 'memphis', 'brutalism'],
    tags: ['typography', 'magazine', 'sophisticated'],
  },
  {
    id: 'organic',
    label: '🌊 Organic',
    category: 'vibe',
    prompt: 'organic natural aesthetic, earthy tones (sage green, warm beige, terracotta), flowing blob shapes, soft gradients, nature-inspired textures, warm and inviting',
    conflicts: ['cyberpunk', 'brutalism', 'neon-glow', 'dark-luxury'],
    tags: ['nature', 'warm', 'soft'],
  },
  {
    id: 'glassmorphism',
    label: '🪟 Glassmorphism',
    category: 'vibe',
    prompt: 'glassmorphism design, frosted glass cards with backdrop-filter blur, semi-transparent backgrounds, subtle borders, layered depth, colorful gradient backgrounds behind glass elements',
    conflicts: ['brutalism', 'neumorphism', 'flat-design'],
    requires: ['gradient-bg'],
    tags: ['glass', 'transparent', 'modern'],
  },
  {
    id: 'brutalism',
    label: '⚡ Brutalism',
    category: 'vibe',
    prompt: 'web brutalism, raw bold design, stark black borders, offset shadows, intentionally rough typography, high contrast black/white with 1-2 accent colors, anti-design aesthetic',
    conflicts: ['glassmorphism', 'minimal-light', 'organic', 'editorial', 'japandi', 'dark-luxury'],
    tags: ['bold', 'raw', 'contrast'],
  },
  {
    id: 'japandi',
    label: '🍃 Japandi',
    category: 'vibe',
    prompt: 'japandi minimalist aesthetic, wabi-sabi philosophy, neutral tones (warm white, beige, charcoal), natural textures, negative space mastery, zen-like calm, functional beauty',
    conflicts: ['cyberpunk', 'brutalism', 'memphis', 'neon-glow', 'playful-colorful'],
    tags: ['japanese', 'minimal', 'calm'],
  },
  {
    id: 'memphis',
    label: '🎨 Memphis',
    category: 'vibe',
    prompt: 'Memphis design movement, bold geometric patterns, bright primary colors + pastels, squiggles and confetti shapes, 80s-inspired retro-modern, playful and energetic',
    conflicts: ['minimal-light', 'dark-luxury', 'japandi', 'editorial', 'glassmorphism'],
    tags: ['retro', 'colorful', 'geometric'],
  },
  {
    id: 'aurora',
    label: '🌌 Aurora',
    category: 'vibe',
    prompt: 'aurora borealis inspired, deep dark backgrounds with flowing purple/blue/green/pink gradient orbs, dreamy atmospheric glow effects, cosmic depth',
    conflicts: ['minimal-light', 'brutalism', 'memphis'],
    requires: ['gradient-bg'],
    tags: ['dark', 'gradient', 'dreamy'],
  },
  {
    id: 'neumorphism',
    label: '💎 Neumorphism',
    category: 'vibe',
    prompt: 'neumorphic design, soft UI, extruded elements from background, dual shadow technique (light top-left, dark bottom-right), monochromatic soft palette, tactile depth',
    conflicts: ['glassmorphism', 'brutalism', 'dark-luxury'],
    tags: ['soft', 'tactile', 'shadows'],
  },
  {
    id: 'retro-futurism',
    label: '🚀 Retro Futurism',
    category: 'vibe',
    prompt: 'retro-futurism aesthetic, 70s-80s vision of the future, warm oranges and deep purples, chrome accents, space-age typography, geometric sci-fi patterns',
    conflicts: ['minimal-light', 'japandi', 'organic'],
    tags: ['retro', 'space', 'warm'],
  },
  {
    id: 'playful-colorful',
    label: '🎉 Playful Colorful',
    category: 'vibe',
    prompt: 'vibrant playful design, bold bright colors, rounded corners, friendly illustrations, fun micro-interactions, approachable and energetic feel',
    conflicts: ['dark-luxury', 'editorial', 'japandi'],
    tags: ['colorful', 'fun', 'rounded'],
  },
  {
    id: 'swiss-style',
    label: '🇨🇭 Swiss Style',
    category: 'vibe',
    prompt: 'International Typographic Style, strict grid system, Helvetica/neutral sans-serif, primary colors used sparingly, objectivity and clarity above all, mathematical precision in layout',
    conflicts: ['memphis', 'organic', 'playful-colorful', 'brutalism'],
    tags: ['grid', 'typography', 'systematic'],
  },
  {
    id: 'bento-grid',
    label: '🍱 Bento Grid',
    category: 'vibe',
    prompt: 'Apple-inspired bento grid layout, varying card sizes, clean dark/light cards with strong hierarchy, feature card dominant, supporting cards in grid, modern SaaS aesthetic',
    conflicts: ['brutalism', 'memphis'],
    tags: ['grid', 'cards', 'apple'],
  },
]

// ============================================================
// LAYOUTS — Page structure
// ============================================================
export const LAYOUTS: Snippet[] = [
  {
    id: 'hero-fullscreen',
    label: '🖼️ Hero Fullscreen',
    category: 'layout',
    prompt: 'full viewport height hero section (min-h-screen), centered content, dramatic visual impact, strong headline hierarchy',
    tags: ['hero', 'fullscreen'],
  },
  {
    id: 'hero-split',
    label: '↔️ Hero Split',
    category: 'layout',
    prompt: 'split hero layout, left text content right visual/illustration, 50/50 or 60/40 grid, responsive stacks on mobile',
    conflicts: ['hero-fullscreen', 'hero-centered'],
    tags: ['hero', 'split'],
  },
  {
    id: 'hero-centered',
    label: '⬛ Hero Centered',
    category: 'layout',
    prompt: 'centered hero with max-width container, text centered, CTA buttons centered, balanced composition',
    conflicts: ['hero-split'],
    tags: ['hero', 'centered'],
  },
  {
    id: 'features-3col',
    label: '⬛⬛⬛ Features 3-Col',
    category: 'layout',
    prompt: 'features grid with 3 columns on desktop, 2 on tablet, 1 on mobile, icon + title + description cards',
    conflicts: ['features-2col', 'features-bento'],
    tags: ['features', 'grid'],
  },
  {
    id: 'features-2col',
    label: '⬛⬛ Features 2-Col',
    category: 'layout',
    prompt: 'alternating 2-column feature sections, image/icon left text right then flip, zig-zag storytelling layout',
    conflicts: ['features-3col', 'features-bento'],
    tags: ['features', 'alternating'],
  },
  {
    id: 'features-bento',
    label: '🍱 Features Bento',
    category: 'layout',
    prompt: 'bento grid features, 1 large hero card + smaller supporting cards, CSS grid with varying sizes (col-span, row-span)',
    conflicts: ['features-3col', 'features-2col'],
    tags: ['features', 'bento'],
  },
  {
    id: 'pricing-3tier',
    label: '💰 Pricing 3-Tier',
    category: 'layout',
    prompt: 'pricing section with 3 tiers (Free/Pro/Enterprise), middle tier highlighted/popular, feature checklist per tier, CTA button per tier',
    tags: ['pricing', 'saas'],
  },
  {
    id: 'testimonials-grid',
    label: '💬 Testimonials Grid',
    category: 'layout',
    prompt: 'testimonials section with masonry or grid layout, avatar + name + role + quote cards, star ratings',
    conflicts: ['testimonials-carousel'],
    tags: ['social-proof', 'testimonials'],
  },
  {
    id: 'testimonials-carousel',
    label: '🎠 Testimonials Carousel',
    category: 'layout',
    prompt: 'testimonials carousel with prev/next navigation, auto-advance, smooth slide transition using useState',
    conflicts: ['testimonials-grid'],
    tags: ['social-proof', 'carousel'],
  },
  {
    id: 'stats-bar',
    label: '📊 Stats Bar',
    category: 'layout',
    prompt: 'statistics row with 4 large numbers, labels, animated count-up using useEffect and requestAnimationFrame on scroll',
    tags: ['stats', 'numbers'],
  },
  {
    id: 'faq-accordion',
    label: '❓ FAQ Accordion',
    category: 'layout',
    prompt: 'FAQ accordion section, questions expand/collapse with smooth transition using useState, max 8 questions',
    tags: ['faq', 'accordion'],
  },
  {
    id: 'cta-section',
    label: '🎯 CTA Section',
    category: 'layout',
    prompt: 'strong call-to-action section, large heading, supporting text, primary + secondary buttons, optional email input for lead capture',
    tags: ['cta', 'conversion'],
  },
  {
    id: 'navbar-sticky',
    label: '📌 Sticky Navbar',
    category: 'layout',
    prompt: 'NOTE: do NOT create a navbar - the site already has one. Skip this.',
    tags: ['nav'],
  },
  {
    id: 'footer-full',
    label: '🦶 Footer Full',
    category: 'layout',
    prompt: 'comprehensive footer with logo, tagline, 3-4 link columns, social icons, copyright, newsletter signup',
    conflicts: ['footer-minimal'],
    tags: ['footer'],
  },
  {
    id: 'footer-minimal',
    label: '🦶 Footer Minimal',
    category: 'layout',
    prompt: 'minimal single-row footer, logo left, links center, copyright right',
    conflicts: ['footer-full'],
    tags: ['footer'],
  },
  {
    id: 'logo-strip',
    label: '🏢 Logo Strip',
    category: 'layout',
    prompt: 'social proof logo strip, "trusted by" heading, horizontal row of company/partner logos with opacity and grayscale filter, hover to color',
    tags: ['social-proof', 'logos'],
  },
]

// ============================================================
// STYLES — Visual style details
// ============================================================
export const STYLES: Snippet[] = [
  {
    id: 'gradient-bg',
    label: '🌈 Gradient Background',
    category: 'style',
    prompt: 'rich gradient backgrounds using radial-gradient and linear-gradient, layered depth with multiple gradient orbs, not flat',
    conflicts: ['flat-design'],
    tags: ['gradient', 'background'],
  },
  {
    id: 'flat-design',
    label: '⬜ Flat Design',
    category: 'style',
    prompt: 'flat design, solid colors, no shadows or gradients, 2D aesthetic, crisp edges',
    conflicts: ['gradient-bg', 'glassmorphism', 'neumorphism', 'card-shadows'],
    tags: ['flat', 'minimal'],
  },
  {
    id: 'card-shadows',
    label: '🃏 Card Shadows',
    category: 'style',
    prompt: 'cards with layered box-shadows, depth perception, hover elevates card with stronger shadow and subtle scale transform',
    conflicts: ['flat-design', 'brutalism'],
    tags: ['cards', 'depth'],
  },
  {
    id: 'border-accents',
    label: '📐 Border Accents',
    category: 'style',
    prompt: 'strategic use of borders as design elements, gradient borders, partial borders (top only), border-image for multi-color effects',
    tags: ['borders', 'detail'],
  },
  {
    id: 'grain-texture',
    label: '🌾 Grain Texture',
    category: 'style',
    prompt: 'subtle grain/noise texture overlay using SVG filter feTurbulence, adds organic depth to flat backgrounds, low opacity 2-5%',
    tags: ['texture', 'organic'],
  },
  {
    id: 'neon-glow',
    label: '💡 Neon Glow',
    category: 'style',
    prompt: 'neon glow effects, box-shadow and text-shadow with colored glow, luminous borders, pulsing glow animations',
    conflicts: ['minimal-light', 'japandi', 'flat-design'],
    tags: ['glow', 'neon', 'dark'],
  },
  {
    id: 'frosted-glass',
    label: '❄️ Frosted Glass',
    category: 'style',
    prompt: 'frosted glass cards with backdrop-filter: blur(20px), semi-transparent backgrounds rgba(255,255,255,0.05), subtle white border',
    requires: ['gradient-bg'],
    tags: ['glass', 'blur'],
  },
  {
    id: 'geometric-shapes',
    label: '🔷 Geometric Shapes',
    category: 'style',
    prompt: 'decorative geometric shapes as background elements, SVG circles/hexagons/triangles, subtle opacity, adds visual interest without cluttering',
    tags: ['decorative', 'shapes'],
  },
  {
    id: 'image-overlays',
    label: '🖼️ Image Overlays',
    category: 'style',
    prompt: 'gradient overlays on images for text readability, mix-blend-mode effects, duotone color treatment on images',
    tags: ['images', 'overlay'],
  },
]

// ============================================================
// TYPOGRAPHY — Font and text styling
// ============================================================
export const TYPOGRAPHY: Snippet[] = [
  {
    id: 'serif-display',
    label: '📰 Serif Display',
    category: 'typography',
    prompt: 'import Playfair Display or Cormorant Garamond from Google Fonts, use for hero headlines and section titles, pair with clean sans-serif body',
    conflicts: ['mono-display', 'slab-serif'],
    tags: ['serif', 'elegant'],
  },
  {
    id: 'mono-display',
    label: '💻 Mono Display',
    category: 'typography',
    prompt: 'import JetBrains Mono or Space Mono from Google Fonts for headlines, technical/hacker aesthetic, all-caps tracking',
    conflicts: ['serif-display', 'slab-serif'],
    tags: ['monospace', 'tech'],
  },
  {
    id: 'slab-serif',
    label: '🔠 Slab Serif',
    category: 'typography',
    prompt: 'import Roboto Slab or Bitter from Google Fonts, bold slab serifs for impact headlines, strong and authoritative',
    conflicts: ['serif-display', 'mono-display'],
    tags: ['slab', 'bold'],
  },
  {
    id: 'large-headlines',
    label: '🔤 Large Headlines',
    category: 'typography',
    prompt: 'oversized typography, hero headline 6rem-10rem, use clamp() for fluid sizing, bold weight 800-900, tight line-height 0.9-1.1',
    tags: ['display', 'oversized'],
  },
  {
    id: 'gradient-text',
    label: '🌈 Gradient Text',
    category: 'typography',
    prompt: 'gradient text effect using background-clip:text and -webkit-text-fill-color:transparent, multi-color gradient on key headlines',
    tags: ['gradient', 'text-effect'],
  },
  {
    id: 'tracking-wide',
    label: '↔️ Wide Tracking',
    category: 'typography',
    prompt: 'generous letter-spacing on labels and captions (0.1em-0.3em), all-caps small labels with wide tracking for hierarchy',
    tags: ['spacing', 'labels'],
  },
]

// ============================================================
// ANIMATIONS — Motion and transitions
// ============================================================
export const ANIMATIONS: Snippet[] = [
  {
    id: 'fade-up',
    label: '⬆️ Fade Up on Scroll',
    category: 'animation',
    prompt: 'elements fade up and appear on scroll using IntersectionObserver API with useEffect, CSS @keyframes fadeUp, staggered delays for groups',
    conflicts: ['no-animation'],
    tags: ['scroll', 'entrance'],
    source: 'community',
  },
  {
    id: 'parallax-scroll',
    label: '🌊 Parallax Scroll',
    category: 'animation',
    prompt: 'parallax scrolling effect, background elements move at different speeds, use transform:translateY with scroll event listener and useEffect cleanup',
    conflicts: ['no-animation', 'virtual-list'],
    tags: ['parallax', 'scroll'],
  },
  {
    id: 'hover-scale',
    label: '🔍 Hover Scale',
    category: 'animation',
    prompt: 'subtle scale transform on hover for interactive elements, transition-all duration-300, hover:scale-105, with shadow enhancement',
    conflicts: ['no-animation'],
    tags: ['hover', 'micro'],
  },
  {
    id: 'floating-elements',
    label: '🎈 Floating Animation',
    category: 'animation',
    prompt: 'floating/bobbing animation for decorative elements using @keyframes float with translateY, different delays for natural feel',
    conflicts: ['no-animation', 'reduce-motion'],
    tags: ['float', 'decorative'],
  },
  {
    id: 'counter-animation',
    label: '🔢 Counter Animation',
    category: 'animation',
    prompt: 'animated number count-up for statistics using useEffect with requestAnimationFrame, easing function, triggers on IntersectionObserver',
    conflicts: ['no-animation'],
    tags: ['counter', 'numbers'],
  },
  {
    id: 'gradient-shift',
    label: '🌅 Gradient Shift',
    category: 'animation',
    prompt: 'animated gradient background that slowly shifts colors using @keyframes with background-position or hue-rotate filter',
    conflicts: ['no-animation', 'flat-design'],
    tags: ['gradient', 'animated'],
  },
  {
    id: 'typewriter',
    label: '⌨️ Typewriter Effect',
    category: 'animation',
    prompt: 'typewriter text animation cycling through words using useState and setInterval, smooth cursor blink, array of rotating phrases',
    conflicts: ['no-animation'],
    tags: ['text', 'typing'],
  },
  {
    id: 'smooth-transitions',
    label: '✨ Smooth Transitions',
    category: 'animation',
    prompt: 'all interactive elements have transition-all duration-300 ease, color changes, opacity, transform all animate smoothly',
    conflicts: ['no-animation'],
    tags: ['transition', 'polish'],
  },
  {
    id: 'no-animation',
    label: '⏸️ No Animation',
    category: 'animation',
    prompt: 'minimal to no animations, static design, respect prefers-reduced-motion, focus on content not motion',
    conflicts: ['fade-up', 'parallax-scroll', 'floating-elements', 'counter-animation', 'gradient-shift', 'typewriter', 'hover-scale'],
    tags: ['static', 'accessible'],
  },
  {
    id: 'reduce-motion',
    label: '♿ Reduce Motion',
    category: 'animation',
    prompt: 'respect prefers-reduced-motion media query, wrap all animations in @media (prefers-reduced-motion: no-preference), provide static fallbacks',
    tags: ['accessible', 'motion'],
  },
]

// ============================================================
// TECH — React/JS features
// ============================================================
export const TECH: Snippet[] = [
  {
    id: 'use-state',
    label: '⚛️ useState',
    category: 'tech',
    prompt: 'use React.useState for interactive UI elements like toggles, tabs, accordions, modals, form fields',
    tags: ['react', 'state'],
  },
  {
    id: 'use-effect',
    label: '🔄 useEffect',
    category: 'tech',
    prompt: 'use React.useEffect for side effects: scroll listeners, IntersectionObserver, timers, animations triggered on mount',
    tags: ['react', 'effects'],
  },
  {
    id: 'tabs-component',
    label: '📑 Tabs',
    category: 'tech',
    prompt: 'tabbed interface with useState for active tab, smooth content transition, keyboard accessible, horizontal or vertical tabs',
    tags: ['ui', 'navigation'],
  },
  {
    id: 'modal-component',
    label: '🗔 Modal',
    category: 'tech',
    prompt: 'modal/dialog with useState open/close, backdrop click to close, escape key handler, smooth fade-in animation, centered overlay',
    tags: ['ui', 'overlay'],
  },
  {
    id: 'dark-mode-toggle',
    label: '🌙 Dark Mode Toggle',
    category: 'tech',
    prompt: 'dark/light mode toggle with useState, CSS custom properties for theme colors, smooth transition between modes, localStorage persist preference',
    tags: ['theme', 'toggle'],
  },
  {
    id: 'search-filter',
    label: '🔍 Search/Filter',
    category: 'tech',
    prompt: 'live search/filter functionality with useState, filter array on input change, highlight matching text, no results state',
    tags: ['filter', 'search'],
  },
  {
    id: 'infinite-scroll',
    label: '♾️ Infinite Scroll',
    category: 'tech',
    prompt: 'infinite scroll with IntersectionObserver on sentinel element, load more items when bottom reached, loading skeleton state',
    conflicts: ['virtual-list', 'parallax-scroll'],
    tags: ['scroll', 'loading'],
  },
  {
    id: 'virtual-list',
    label: '⚡ Virtual List',
    category: 'tech',
    prompt: 'virtualized list for large datasets, only render visible items, calculate item height and scroll position manually',
    conflicts: ['infinite-scroll', 'parallax-scroll'],
    tags: ['performance', 'list'],
  },
  {
    id: 'form-validation',
    label: '✅ Form Validation',
    category: 'tech',
    prompt: 'form with useState for field values and errors, real-time validation, error messages per field, disabled submit until valid',
    tags: ['form', 'validation'],
  },
  {
    id: 'toast-notification',
    label: '🔔 Toast Notifications',
    category: 'tech',
    prompt: 'toast notification system with useState queue, auto-dismiss after 3s, success/error/info variants, slide-in animation',
    tags: ['ui', 'feedback'],
  },
  {
    id: 'copy-clipboard',
    label: '📋 Copy to Clipboard',
    category: 'tech',
    prompt: 'copy to clipboard button with navigator.clipboard.writeText, useState for copied state, visual feedback "Copied!" for 2s',
    tags: ['utility', 'ux'],
  },
  {
    id: 'intersection-observer',
    label: '👁️ Intersection Observer',
    category: 'tech',
    prompt: 'IntersectionObserver with useEffect and useRef to trigger animations/lazy load when elements enter viewport, cleanup on unmount',
    tags: ['scroll', 'performance'],
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
    prompt: 'color palette: dark background #030712, primary emerald #10b981, secondary teal #14b8a6, accent #6ee7b7, text #f0fdf4',
    conflicts: ['purple-violet', 'amber-gold', 'rose-pink', 'blue-indigo'],
    tags: ['green', 'dark'],
  },
  {
    id: 'purple-violet',
    label: '💜 Purple/Violet',
    category: 'color',
    prompt: 'color palette: dark #0F0A1E, primary purple #7C3AED, secondary violet #8B5CF6, accent #C4B5FD, glow rgba(124,58,237,0.3)',
    conflicts: ['emerald-teal', 'amber-gold', 'rose-pink'],
    tags: ['purple', 'dark'],
  },
  {
    id: 'amber-gold',
    label: '🟡 Amber/Gold',
    category: 'color',
    prompt: 'color palette: deep dark #0A0806, primary gold #C9A84C, secondary amber #D97706, accent #FDE68A, parchment text #F5EFE0',
    conflicts: ['emerald-teal', 'purple-violet', 'blue-indigo'],
    tags: ['gold', 'luxury'],
  },
  {
    id: 'blue-indigo',
    label: '💙 Blue/Indigo',
    category: 'color',
    prompt: 'color palette: dark navy #0D1117, primary blue #3B82F6, secondary indigo #6366F1, accent #93C5FD, electric highlights',
    conflicts: ['amber-gold', 'rose-pink'],
    tags: ['blue', 'tech'],
  },
  {
    id: 'rose-pink',
    label: '🌸 Rose/Pink',
    category: 'color',
    prompt: 'color palette: soft backgrounds, primary rose #F43F5E, secondary pink #EC4899, accent #FDA4AF, playful feminine palette',
    conflicts: ['amber-gold', 'blue-indigo'],
    tags: ['pink', 'playful'],
  },
  {
    id: 'monochrome',
    label: '⚫ Monochrome',
    category: 'color',
    prompt: 'strict monochrome palette, pure black and white with gray scale only, maximum 1 accent color for CTAs',
    conflicts: ['emerald-teal', 'purple-violet', 'amber-gold', 'rose-pink', 'blue-indigo'],
    tags: ['black-white', 'minimal'],
  },
]

// ============================================================
// COMPONENTS — Specific UI components
// ============================================================
export const COMPONENTS: Snippet[] = [
  {
    id: 'hero-badge',
    label: '🏷️ Hero Badge',
    category: 'component',
    prompt: 'small badge/pill above hero headline, gradient border, icon + label text, "New" or category indicator',
    tags: ['hero', 'badge'],
  },
  {
    id: 'feature-icons',
    label: '🎯 Feature Icons',
    category: 'component',
    prompt: 'feature cards with icon containers (colored bg rounded, icon emoji or SVG), title, description, hover state',
    tags: ['features', 'icons'],
  },
  {
    id: 'avatar-group',
    label: '👥 Avatar Group',
    category: 'component',
    prompt: 'overlapping avatar circles with +N indicator for social proof, "Join 10,000+ users" style element',
    tags: ['social-proof', 'users'],
  },
  {
    id: 'progress-bar',
    label: '📊 Progress Bar',
    category: 'component',
    prompt: 'animated progress bars for skills/stats, percentage labels, color coded, animates to final value on scroll',
    tags: ['stats', 'visual'],
  },
  {
    id: 'timeline',
    label: '📅 Timeline',
    category: 'component',
    prompt: 'vertical timeline component, alternating left/right content, dot markers with connecting line, dates and descriptions',
    tags: ['history', 'process'],
  },
  {
    id: 'comparison-table',
    label: '⚖️ Comparison Table',
    category: 'component',
    prompt: 'feature comparison table, checkmarks and X marks, highlight one column as recommended, sticky header',
    tags: ['pricing', 'comparison'],
  },
  {
    id: 'scroll-indicator',
    label: '⬇️ Scroll Indicator',
    category: 'component',
    prompt: 'animated scroll down indicator at hero bottom, bouncing arrow or mouse icon, fade out on scroll',
    tags: ['hero', 'ux'],
  },
  {
    id: 'back-to-top',
    label: '⬆️ Back to Top',
    category: 'component',
    prompt: 'back to top button that appears after scrolling 300px, useState for visibility, smooth scroll to top, fixed bottom-right position',
    tags: ['navigation', 'ux'],
  },
]

// ============================================================
// INTERACTIONS — User experience details
// ============================================================
export const INTERACTIONS: Snippet[] = [
  {
    id: 'hover-reveal',
    label: '👀 Hover Reveal',
    category: 'interaction',
    prompt: 'content hidden by default reveals on hover, opacity transition, overlay information on cards, smooth fade',
    tags: ['hover', 'reveal'],
  },
  {
    id: 'click-to-expand',
    label: '📖 Click to Expand',
    category: 'interaction',
    prompt: 'expandable sections with useState toggle, smooth height transition, chevron rotation indicator',
    tags: ['expand', 'toggle'],
  },
  {
    id: 'active-state-tabs',
    label: '🔘 Active State Tabs',
    category: 'interaction',
    prompt: 'tab navigation with clear active indicator, sliding underline or pill indicator, content switch with fade transition',
    tags: ['tabs', 'navigation'],
  },
  {
    id: 'input-focus-effects',
    label: '✏️ Input Focus Effects',
    category: 'interaction',
    prompt: 'form inputs with floating labels, focus ring glow effect, smooth label animation on focus/blur',
    tags: ['form', 'focus'],
  },
  {
    id: 'bilingual-toggle',
    label: '🌐 Bilingual VI/EN',
    category: 'interaction',
    prompt: 'Vietnamese/English language toggle with useState, all text content in both languages as objects, instant switch no reload',
    tags: ['i18n', 'bilingual'],
  },
]

// ============================================================
// PERFORMANCE — Optimization snippets
// ============================================================
export const PERFORMANCE: Snippet[] = [
  {
    id: 'lazy-images',
    label: '🐌 Lazy Load Images',
    category: 'performance',
    prompt: 'images with loading="lazy" attribute, IntersectionObserver for custom lazy loading, blur placeholder while loading',
    tags: ['images', 'lazy'],
  },
  {
    id: 'code-splitting',
    label: '✂️ Code Splitting',
    category: 'performance',
    prompt: 'heavy components wrapped in React.lazy and Suspense, skeleton loading fallback, import only when needed',
    tags: ['loading', 'split'],
  },
  {
    id: 'debounce-input',
    label: '⏱️ Debounce Input',
    category: 'performance',
    prompt: 'debounce search/filter inputs with useEffect and setTimeout cleanup, 300ms delay before filtering',
    tags: ['input', 'optimize'],
  },
]

// ============================================================
// ANTHROPIC PROMPT ENGINEERING PRINCIPLES
// (from Anthropic prompt library best practices)
// ============================================================
export const ANTHROPIC_PRINCIPLES: Snippet[] = [
  {
    id: 'role-context',
    label: '🎭 Role + Context',
    category: 'tech',
    prompt: 'You are an expert senior frontend developer and UI/UX designer with 10 years experience building production React applications.',
    source: 'anthropic',
    tags: ['system', 'role'],
  },
  {
    id: 'output-format',
    label: '📄 Output Format',
    category: 'tech',
    prompt: 'Output ONLY raw TSX code. No markdown backticks, no explanations, no comments. Start directly with function App()',
    source: 'anthropic',
    tags: ['format', 'output'],
  },
  {
    id: 'quality-bar',
    label: '⭐ Quality Bar',
    category: 'tech',
    prompt: 'The design must be production-ready, visually stunning, and NOT generic. Avoid cookie-cutter AI-generated aesthetics.',
    source: 'anthropic',
    tags: ['quality', 'design'],
  },
  {
    id: 'mobile-first',
    label: '📱 Mobile First',
    category: 'tech',
    prompt: 'Mobile-first responsive design mandatory. Start from 375px, then md:, lg:, xl: breakpoints. Touch targets minimum 44px.',
    source: 'anthropic',
    tags: ['responsive', 'mobile'],
  },
  {
    id: 'no-navbar',
    label: '🚫 No Navbar',
    category: 'tech',
    prompt: 'CRITICAL: Do NOT create a navbar or header. The site already has one. Do NOT use position:fixed except for essential floating elements. Do NOT use z-index above 40.',
    source: 'custom',
    tags: ['constraint', 'layout'],
  },
  {
    id: 'render-app',
    label: '⚛️ Render App',
    category: 'tech',
    prompt: 'Structure: single function App() with all logic inside using React.useState/useEffect. End file with: render(<App />)',
    source: 'custom',
    tags: ['structure', 'required'],
  },
  {
    id: 'no-imports',
    label: '🚫 No Imports',
    category: 'tech',
    prompt: 'Do NOT use any import statements. React is available globally. Use React.useState, React.useEffect, React.useRef etc.',
    source: 'custom',
    tags: ['constraint', 'required'],
  },
  {
    id: 'realistic-content',
    label: '📝 Realistic Content',
    category: 'tech',
    prompt: 'Use realistic, detailed placeholder content. Not "Lorem ipsum". Write actual meaningful copy that fits the topic.',
    source: 'anthropic',
    tags: ['content', 'quality'],
  },
  {
    id: 'tailwind-only',
    label: '🎨 Tailwind Only',
    category: 'tech',
    prompt: 'Use Tailwind CSS classes exclusively. For custom styles use inline style={{}} prop or <style> tag with @keyframes.',
    source: 'custom',
    tags: ['css', 'tailwind'],
  },
  {
    id: 'google-fonts',
    label: '✍️ Google Fonts',
    category: 'tech',
    prompt: 'Import Google Fonts via @import in a <style> tag. Define font-family in inline styles or CSS classes.',
    source: 'custom',
    tags: ['fonts', 'typography'],
  },
]

// ============================================================
// CONFLICT MAP — For UI to check compatibility
// ============================================================
export function getConflicts(selectedIds: string[]): string[] {
  const allSnippets = [...VIBES, ...LAYOUTS, ...STYLES, ...ANIMATIONS, ...TECH, ...COLORS, ...COMPONENTS, ...INTERACTIONS, ...PERFORMANCE, ...ANTHROPIC_PRINCIPLES]
  const conflicts = new Set<string>()
  
  selectedIds.forEach(id => {
    const snippet = allSnippets.find(s => s.id === id)
    if (snippet?.conflicts) {
      snippet.conflicts.forEach(c => conflicts.add(c))
    }
  })
  
  return Array.from(conflicts)
}

export function buildPrompt(selected: Snippet[], userDescription: string, keywords: string): string {
  const required = ANTHROPIC_PRINCIPLES.filter(p => 
    ['no-navbar', 'render-app', 'no-imports', 'tailwind-only'].includes(p.id)
  )
  
  const systemParts = [
    ANTHROPIC_PRINCIPLES.find(p => p.id === 'role-context')?.prompt,
    ANTHROPIC_PRINCIPLES.find(p => p.id === 'output-format')?.prompt,
    ANTHROPIC_PRINCIPLES.find(p => p.id === 'quality-bar')?.prompt,
  ]
  
  const constraintParts = required.map(p => p.prompt)
  const selectedParts = selected.map(s => s.prompt)
  
  return `${systemParts.join(' ')}

CONSTRAINTS (mandatory):
${constraintParts.join('\n')}

DESIGN DIRECTION:
${selectedParts.join('\n')}

${keywords ? `KEYWORDS: ${keywords}` : ''}

TASK: ${userDescription}

Build a complete, stunning, production-ready page component.`
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

export const TOTAL_SNIPPETS = Object.values(FULL_LIBRARY).reduce((acc, arr) => acc + arr.length, 0)
// Total: ~90+ snippets with conflict mapping and prompt injection
