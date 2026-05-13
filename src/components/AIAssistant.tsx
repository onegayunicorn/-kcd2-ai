import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeMarkdown from './SafeMarkdown';
import { generateNPCResponse } from '../lib/gemini';
import { Message } from '../types';
import { cn } from '../lib/utils';

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'God be with you, Henry. What is on your mind today?', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ 
        role: m.role === 'user' ? 'user' : 'model', 
        parts: [{ text: m.content }] 
      }));
      
      const response = await generateNPCResponse(
        "Henry's Companion", 
        "A wise medieval mentor and game guide", 
        input,
        history as any
      );

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col bg-kcd-surface border-2 border-kcd-accent/30 overflow-hidden relative">
      {/* Ornamental Corners */}
      <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-kcd-accent/50 z-20 pointer-events-none"></div>
      <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-kcd-accent/50 z-20 pointer-events-none"></div>
      <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-kcd-accent/50 z-20 pointer-events-none"></div>
      <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-kcd-accent/50 z-20 pointer-events-none"></div>

      {/* Header */}
      <div className="p-4 border-b border-kcd-border bg-kcd-bg/40 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-kcd-accent/10 border border-kcd-accent/30 flex items-center justify-center">
            <Bot className="w-6 h-6 text-kcd-accent" />
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-tight text-white text-sm">Neural Engagement</h3>
            <p className="text-[10px] text-kcd-muted uppercase tracking-[0.3em] font-sans font-bold">Dynamic Narrative Sync • Live</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-2 py-1 bg-kcd-accent/10 border border-kcd-accent/20 text-[9px] text-kcd-accent font-bold uppercase tracking-widest font-sans">
            DeepSeek R1
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-kcd-border scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex flex-col gap-1 max-w-[85%]",
                msg.role === 'user' ? "ml-auto text-right items-end" : "items-start"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                {msg.role === 'assistant' && <span className="text-[9px] px-1 bg-kcd-accent/10 border border-kcd-accent/30 text-kcd-accent uppercase font-sans font-bold">AI Generative Response</span>}
                <span className="text-[10px] uppercase font-sans tracking-widest font-bold text-kcd-muted">
                  {msg.role === 'user' ? 'Henry of Skalitz' : 'Narrative Engine'}
                </span>
              </div>
              <div className={cn(
                "p-5 border text-lg leading-snug font-serif",
                msg.role === 'user' 
                  ? "bg-kcd-surface border-kcd-border italic text-kcd-text" 
                  : "bg-kcd-bg border-kcd-accent/30 text-white shadow-[0_0_20px_rgba(193,154,77,0.05)]"
              )}>
                <SafeMarkdown content={msg.content} />
                <p className="text-[9px] mt-4 opacity-20 font-sans tracking-widest uppercase">{msg.timestamp}</p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="flex flex-col gap-1 items-start"
            >
              <span className="text-[10px] uppercase font-sans tracking-widest font-bold text-kcd-muted">Narrative Engine</span>
              <div className="p-5 border border-kcd-accent/20 bg-kcd-bg/50">
                <div className="flex gap-2">
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="h-1 w-3 bg-kcd-accent" />
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="h-1 w-3 bg-kcd-accent" />
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="h-1 w-3 bg-kcd-accent" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-6 bg-kcd-bg/80 backdrop-blur-md border-t-2 border-kcd-border">
        <div className="flex items-stretch gap-3">
          <div className="bg-kcd-accent text-kcd-bg px-6 py-3 font-bold text-xs flex items-center gap-3 uppercase tracking-tighter self-stretch font-sans">
             <div className="w-2 h-2 rounded-full bg-kcd-bg animate-pulse"></div>
             Direct Input
          </div>
          <div className="flex-1 bg-kcd-surface border border-kcd-border flex items-center px-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message to the narrative engine..."
              className="bg-transparent w-full text-sm outline-none placeholder-kcd-muted italic py-3"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-kcd-surface border border-kcd-border px-6 flex items-center text-[10px] text-kcd-accent hover:text-white hover:bg-kcd-accent transition-all uppercase tracking-widest font-bold font-sans disabled:opacity-50"
          >
            {isTyping ? 'Syncing...' : 'Press [Sync]'}
          </button>
        </div>
      </div>
    </div>
  );
}
