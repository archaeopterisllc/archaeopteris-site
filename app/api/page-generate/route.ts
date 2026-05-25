import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const prompt = body.prompt ?? buildLegacyPrompt(body)

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      maxTokens: 16000,
      messages: [{ role: 'user', content: prompt }],
    })

    return Response.json({ code: text })
  } catch (error) {
    console.error('Page generate error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function buildLegacyPrompt({ slug, description, vibe, styles, techs }: {
  slug: string
  description: string
  vibe?: string
  styles?: string
  techs?: string
}) {
  return `You are an expert React/Next.js developer. Create a stunning, production-ready page component.

Page: "${slug}"
Description: ${description}
Vibe: ${vibe || 'modern'}
Style techniques: ${styles || 'glassmorphism dark'}
Tech features: ${techs || 'CSS transitions, hover effects'}

Requirements:
- Tailwind CSS only, dark theme
- Hero: min-h-screen, flex center, large gradient heading
- Bilingual VI/EN inline
- Mobile first responsive
- Return ONLY JSX, no imports, no explanation, no backticks
- Use className NOT class
- Define function App(), end with: render(<App />)`
}
