'use client';
import { useChat } from '@ai-sdk/react';
import { Button } from '@/components/ui/button'; // Tận dụng folder UI sẵn có của anh

export function AIChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-background border rounded-lg shadow-2xl p-4">
      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {messages.map(m => (
          <div key={m.id} className={`text-xs ${m.role === 'user' ? 'text-blue-500' : 'text-foreground'}`}>
            <strong>{m.role === 'user' ? 'Anh: ' : 'Claude: '}</strong>{m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          className="flex-1 bg-muted p-2 rounded text-sm outline-none"
          value={input} 
          onChange={handleInputChange} 
          placeholder="Lệnh cho Claude..."
        />
        <Button type="submit" size="sm">Gửi</Button>
      </form>
    </div>
  );
}
