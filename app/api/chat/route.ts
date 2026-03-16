import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: anthropic('claude-3-7-sonnet-20250219'),
    messages,
    system: "Bạn là trợ lý kỹ thuật của dự án Archaeopteris. Sử dụng các component trong thư mục @/components/ui để đề xuất giải pháp."
  });
  return result.toDataStreamResponse();
}
