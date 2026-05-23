import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { slug, description, vibe } = await req.json()

    const prompt = `You are an expert React/Next.js developer. Create a stunning, production-ready page component.

Page: "${slug}"
Description: ${description}
Vibe: ${vibe || 'modern'}

Requirements:
- Tailwind CSS only, dark theme (bg-gray-950, bg-gray-900)
- Hero: min-h-screen, flex center, large gradient heading (from-emerald-400 via-teal-300 to-blue-500), subtitle, CTA button
- Glassmorphism cards: bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl
- Animations: transition-all duration-300 hover:scale-105 hover:bg-white/10
- Grid sections: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Typography: text-5xl font-black tracking-tight for hero, text-xl for subtitles
- Spacing: py-24 px-6 max-w-7xl mx-auto for sections
- Bilingual VI/EN inline
- Mobile first responsive
- End with: render(<App />)
- Return ONLY JSX, no imports, no explanation, no backticks `


    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      messages: [{ role: 'user', content: prompt }],
    })

    return Response.json({ code: text })
  } catch (error) {
    console.error('Page generate error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
