import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { slug, description } = await req.json()

    const prompt = `You are an expert React/Next.js developer. Generate a stunning, modern page component.

Page: "${slug}"
Description: ${description}

STRICT Requirements:
- Use Tailwind CSS only
- Dark theme: bg-gray-900, text-white
- Emerald green (#10b981) and blue (#3b82f6) accents
- Full hero section with gradient heading, subtitle, CTA button
- 2-3 sections with glassmorphism cards (backdrop-blur, bg-white/10)
- Smooth CSS animations (animate-pulse, animate-bounce, transition-all)
- Bilingual: show VI and EN text together
- Export as: render(<YourComponent />)
- Return ONLY the JSX code, no imports, no explanation `


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
