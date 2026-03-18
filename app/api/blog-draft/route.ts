import { NextRequest, NextResponse } from "next/server";

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
}
