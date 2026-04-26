import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { slug, description } = await req.json()

    const prompt = `You are an expert Next.js developer for Archaeopteris LLC (fintech company).
Generate a complete Next.js page component for the "${slug}" page.

Description: ${description}

Requirements:
- Use Tailwind CSS only
- Dark theme (bg-background, text-foreground)
- Emerald green accent: #10b981
- Include: Hero section, main content sections, CTA
- Bilingual: accept a locale prop, show EN/VI content inline using ternary
- Professional fintech style
- Company: Archaeopteris LLC, website: archaeopteris.us
- Return ONLY the TSX component code, no explanation, no markdown backticks.`

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
