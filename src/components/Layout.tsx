import React, { useState } from 'react';
import { Shield, Book, Scroll, Beaker, Settings, Sword, LayoutDashboard, MessageSquare, Swords } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const modules = [
  { id: 'dashboard', name: 'Commander Dashboard', icon: LayoutDashboard },
  { id: 'mod-manager', name: 'AI Mod Manager', icon: Settings },
  { id: 'assistant', name: 'Henry\'s Companion', icon: MessageSquare },
  { id: 'npc-sim', name: 'NPC Simulator', icon: Sword },
  { id: 'alchemy', name: 'Alchemy Lab', icon: Beaker },
  { id: 'quests', name: 'Quest Generator', icon: Scroll },
  { id: 'combat', name: 'Combat Feedback', icon: Swords },
];

export default function Layout({ children, activeModule, setActiveModule }: LayoutProps) {
  return (
    <div className="min-h-screen bg-kcd-bg text-kcd-text font-serif">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-kcd-surface border-r-2 border-kcd-border z-50">
        <div className="p-6">
          <div className="flex flex-col mb-10">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-8 bg-kcd-accent"></div>
              <span className="text-[10px] tracking-[0.4em] text-kcd-accent uppercase font-sans font-bold">Neural Engine v4.2</span>
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-white">Kingdom Come</h1>
            <h2 className="text-xl font-bold uppercase tracking-tight text-kcd-accent mt-[-4px]">Deliverance II</h2>
          </div>

          <nav className="space-y-1">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 group relative font-sans",
                  activeModule === mod.id 
                    ? "bg-kcd-accent text-kcd-bg shadow-[0_0_20px_rgba(193,154,77,0.1)]" 
                    : "text-kcd-muted hover:text-kcd-text hover:bg-kcd-accent/5 border border-transparent hover:border-kcd-border/50"
                )}
              >
                <mod.icon className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  activeModule === mod.id ? "scale-110" : "group-hover:scale-110"
                )} />
                {mod.name}
                {activeModule === mod.id && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-kcd-bg/30"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-kcd-bg border border-kcd-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-kcd-accent font-bold font-sans">Processing</span>
              <span className="text-[10px] text-kcd-accent font-bold font-sans">88%</span>
            </div>
            <div className="h-1 bg-kcd-surface w-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '88%' }}
                 className="h-full bg-kcd-accent"
               />
            </div>
            <p className="text-[10px] text-kcd-muted mt-3 font-sans leading-relaxed italic">
              DeepSeek R1 Core connected via Azure Endpoint
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64 min-h-screen relative">
        {/* Top Header Bar */}
        <div className="h-16 border-b-2 border-kcd-border flex items-center justify-between px-8 bg-kcd-surface/30 backdrop-blur-sm sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <span className="text-[10px] tracking-widest text-kcd-muted uppercase font-sans font-bold">Security Status:</span>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-900 border border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]"></div>
                 <span className="text-[10px] uppercase font-sans font-bold text-green-500">Encrypted</span>
              </div>
           </div>
           <div className="text-right">
              <span className="text-[10px] tracking-widest text-kcd-muted block uppercase font-sans font-bold mb-0.5">Session Context</span>
              <span className="text-sm font-bold uppercase tracking-tight">Kuttenberg · 1403 AD</span>
           </div>
        </div>

        <div className="p-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)] relative">
          {/* Ornamental Background Elements */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-kcd-border opacity-50" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-kcd-border opacity-50" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-kcd-border opacity-50" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-kcd-border opacity-50" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative z-10"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
