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
/*import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const runtime = 'edge'; // Vẫn giữ edge

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Đảm bảo dùng đúng biến môi trường ANTHROPIC_API_KEY
    const result = await streamText({
      model: anthropic('claude-3-7-sonnet-20250219'),
     // apiKey: process.env.Claude_API_KEY,
      messages,
      system: "Bạn là trợ lý kỹ thuật cấp cao.",
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Lỗi tại API chat:", error);
    return new Response(JSON.stringify({ error: "Lỗi Server" }), { status: 500 });
  }
}*/
/*import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // Dùng trực tiếp process.env để debug
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.error("LỖI: Không tìm thấy API KEY trong process.env");
    return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 500 });
  }

  const result = await streamText({
    model: anthropic('claude-3-7-sonnet-20250219', { apiKey }),
    messages,
  });

  return result.toDataStreamResponse();
}*/

/*import { openai } from '@ai-sdk/openai'; // Đổi import
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = await streamText({
    model: openai('gpt-4o-mini'), // Dùng gpt-4o-mini cho nhanh và rẻ
    messages,
    system: "Bạn là trợ lý kỹ thuật của dự án Archaeopteris.",
  });
  
  return result.toDataStreamResponse();
}*/
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: "Bạn là trợ lý kỹ thuật của dự án Archaeopteris.",
    });
    
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("LỖI API:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

