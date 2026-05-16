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

STRICT Requirements:
- Use Tailwind CSS only, no external libraries
- Dark theme: bg-background, text-foreground
- Emerald green accent: text-emerald-400, border-emerald-500, bg-emerald-600
- Hero section + 2-3 content sections + CTA at bottom
- Include both EN and VI text visible on page
- Professional fintech style matching Archaeopteris LLC brand
- Company: Archaeopteris LLC, website: archaeopteris.us, email: contact@archaeopteris.us
- Return ONLY pure HTML with Tailwind classes, no JSX, no explanation, no markdown backticks. `


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
