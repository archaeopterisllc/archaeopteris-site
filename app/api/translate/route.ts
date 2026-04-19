import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  const { content, fromLocale } = await req.json()
  const toLocale = fromLocale === 'vi' ? 'en' : 'vi'

  const { text } = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    messages: [{ 
      role: 'user', 
      content: `Translate this blog post to ${toLocale === 'vi' ? 'Vietnamese' : 'English'}.
Keep markdown formatting exactly.
Return only translated content, no preamble.

${content}` 
    }]
  })

  return Response.json({ translated: text })
}
