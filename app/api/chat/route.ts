/*import { anthropic } from '@ai-sdk/anthropic';
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
*/
/*import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = await streamText({
    // Chỉ định rõ biến môi trường anh dùng
    model: anthropic('claude-3-7-sonnet-20250219', {
      apiKey: process.env.Claude_API_KEY, 
    }),
    messages,
    system: "Bạn là trợ lý kỹ thuật của dự án Archaeopteris.",
  });
  
  return result.toDataStreamResponse();
}
*/
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const runtime = 'edge'; // Vẫn giữ edge

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Đảm bảo dùng đúng biến môi trường ANTHROPIC_API_KEY
    const result = await streamText({
      model: anthropic('claude-3-7-sonnet-20250219'),
      apiKey: process.env.Claude_API_KEY,
      messages,
      system: "Bạn là trợ lý kỹ thuật cấp cao.",
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Lỗi tại API chat:", error);
    return new Response(JSON.stringify({ error: "Lỗi Server" }), { status: 500 });
  }
}
