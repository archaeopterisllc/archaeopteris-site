'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { Button } from '@/components/ui/button'
import { MessageCircle, X, Minimize2 } from 'lucide-react'

export function AIChat() {
  const [open, setOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  })
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Thu gọn — chỉ hiện icon
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-5 h-5 text-primary-foreground" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-background border rounded-lg shadow-2xl flex flex-col"
      style={{ height: messages.length > 0 ? '420px' : '200px', transition: 'height 0.3s ease' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <span className="text-sm font-semibold">AI Assistant</span>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.length === 0 && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            Xin chào! Tôi có thể giúp gì cho bạn?
          </p>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`text-xs ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-2 py-1 rounded-lg max-w-[90%] text-left ${
              m.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            }`}>
              {m.content}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 p-2 border-t">
        <input
          className="flex-1 bg-muted p-2 rounded text-sm outline-none"
          value={input}
          onChange={handleInputChange}
          placeholder="Lệnh cho..."
        />
        <Button type="submit" size="sm">Gửi</Button>
      </form>
    </div>
  )
}

/*'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function AIChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi server');

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err: unknown) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: err instanceof Error ? err.message : 'Có lỗi xảy ra.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-background border rounded-lg shadow-lg">
      <div className="h-64 overflow-y-auto p-3 space-y-2">
        {messages.length === 0 && (
          <p className="text-xs text-muted-foreground text-center mt-8">
            Xin chào! Tôi có thể giúp gì cho bạn?
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`text-xs ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-2 py-1 rounded-lg ${
              m.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-foreground'
            }`}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-xs text-left">
            <span className="inline-block px-2 py-1 rounded-lg bg-muted text-muted-foreground">
              Đang trả lời...
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 p-2 border-t">
        <input
          className="flex-1 bg-muted p-2 rounded text-sm outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Lệnh cho..."
          disabled={loading}
        />
        <Button type="submit" size="sm" disabled={loading}>Gửi</Button>
      </form>
    </div>
  );
}*/

/*'use client';
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
}*/

/*'use client';
import { useChat } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';

export function AIChat() {
  /*const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    // Thêm các callback để bắt lỗi
    onResponse: (response) => console.log("Response nhận được:", response),
    onError: (err) => console.error("Lỗi từ AI SDK:", err),
  });*/
  /*const { messages, input, handleInputChange, handleSubmit, error } = useChat({
  api: '/api/chat',
  onResponse: (response) => console.log("Response nhận được:", response),
  onError: (err) => console.error("Lỗi từ AI SDK:", err),
});


  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-background border rounded-lg shadow-2xl p-4">
      {/* Hiển thị lỗi nếu có */
    /*  {error && <div className="text-red-500 text-[10px] mb-2">Lỗi: {error.message}</div>}
      
      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {messages.map(m => (
          <div key={m.id} className={`text-xs ${m.role === 'user' ? 'text-blue-500' : 'text-foreground'}`}>
            <strong>{m.role === 'user' ? 'Anh: ' : 'Claude/GPT: '}</strong>{m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          className="flex-1 bg-muted p-2 rounded text-sm outline-none"
          value={input} 
          onChange={handleInputChange} 
          placeholder="Lệnh cho..."
        />
        <Button type="submit" size="sm">Gửi</Button>
      </form>
    </div>
  );
}

/*"use client";

import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const sendMessage = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat([...chat, "You: " + message, "AI: " + data.reply]);
    setMessage("");
  };

  return (
    <div className="p-4 border rounded-xl">
      <div className="h-64 overflow-y-auto">
        {chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full"
        placeholder="Ask AI..."
      />

      <button onClick={sendMessage} className="mt-2 px-4 py-2 bg-black text-white">
        Send
      </button>
    </div>
  );
}*/
