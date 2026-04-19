import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { createClient } from '@supabase/supabase-js'

/*const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
})*/

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { title, keywords, tone, locale } = await req.json()

    if (!title) {
      return Response.json({ error: 'Title is required' }, { status: 400 })
    }

    const prompt = `You are an expert fintech writer for Archaeopteris LLC. Write a professional blog post draft:

    IMPORTANT: Respond ONLY in ${locale === 'vi' ? 'Vietnamese' : 'English'}. Do not use any other language.

**Topic:** ${title}
${keywords ? `**Keywords:** ${keywords}` : ''}
**Tone:** ${tone || 'professional'}
**Language:** ${locale === 'vi' ? 'Vietnamese' : 'English'}
**Audience:** Prop traders, brokers, fintech engineers
**Company:** Archaeopteris LLC
**Website:** archaeopteris.us
**Email:** contact@archaeopteris.us
- Never use archaeopteris.com, always use archaeopteris.us


Requirements:
- Write in Markdown
- Strong hook opening
- 3-5 sections with ## headings
- Include technical depth: numbers, protocols, specifics
- End with a CTA mentioning Archaeopteris LLC (website: archaeopteris.us, email: contact@archaeopteris.us)
- 600-900 words
- Return only Markdown content, no preamble.`

    const { text } = await generateText({
      model: groq('qwen/qwen3-32b'),
      //model: openrouter('qwen/qwen3.6-plus-preview:free'),

      messages: [{ role: 'user', content: prompt }],
    })

    // Auto save vào Supabase
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 80)

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        title,
        slug,
        keywords,
        tone,
        content: text,
        locale: locale || 'en',
        status: 'draft',
      })
      .select()
      .single()

    if (error) console.error('Supabase error:', error)

    return Response.json({ draft: text, postId: post?.id })
  } catch (error) {
    console.error('Blog draft error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/*import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { title, keywords, tone } = await req.json()

    if (!title) {
      return Response.json({ error: 'Title is required' }, { status: 400 })
    }

    const prompt = `You are an expert fintech writer for Archaeopteris LLC. Write a professional blog post draft:

**Topic:** ${title}
${keywords ? `**Keywords:** ${keywords}` : ''}
**Tone:** ${tone || 'professional'}
**Audience:** Prop traders, brokers, fintech engineers

Requirements:
- Write in Markdown
- Strong hook opening
- 3-5 sections with ## headings
- Include technical depth: numbers, protocols, specifics
- End with a CTA relevant to trading infrastructure or development services
- 600-900 words
- Return only Markdown content, no preamble.`

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      messages: [{ role: 'user', content: prompt }],
    })

    return Response.json({ draft: text })
  } catch (error) {
    console.error('Blog draft error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/*import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, keywords, tone } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const prompt = `You are an expert fintech writer for Archaeopteris LLC. Write a professional blog post draft:

**Topic:** ${title}
${keywords ? `**Keywords:** ${keywords}` : ""}
**Tone:** ${tone || "professional"}
**Audience:** Prop traders, brokers, fintech engineers

Requirements:
- Write in Markdown
- Strong hook opening
- 3-5 sections with ## headings
- Include technical depth: numbers, protocols, specifics
- End with a CTA relevant to trading infrastructure or development services
- 600-900 words
- Return only Markdown content, no preamble.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json(
        { error: err.error?.message || "API error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const draft = data.content?.[0]?.text || "";

    return NextResponse.json({ draft });
  } catch (error) {
    console.error("Blog draft error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}*/
