import React, { useState } from 'react';
import { User, MessageSquare, Shield, Heart, Zap, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Personality } from '../types';
import { generateNPCResponse } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

const NPCs: Personality[] = [
  { 
    id: 'henry', 
    name: 'Henry of Skalitz', 
    role: 'Protagonist', 
    description: 'Son of a blacksmith, seeking vengeance and justice in war-torn Bohemia.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=600&h=800' 
  },
  { 
    id: 'theresa', 
    name: 'Theresa', 
    role: 'Lover & Survivor', 
    description: 'Resilient and resourceful survivor from Skalitz who saved Henry.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600&h=800' 
  },
  { 
    id: 'radzig', 
    name: 'Sir Radzig Kobyla', 
    role: 'Royal Hetman', 
    description: 'A wise and strategic noble, lord of Skalitz and Henry\'s mentor.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=800' 
  },
  { 
    id: 'hanush', 
    name: 'Sir Hanush of Leipa', 
    role: 'Lord of Rattay', 
    description: 'Pragmatic and loud lord serving as custodian of Rattay.',
    avatar: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=600&h=800' 
  }
];

export default function NPCSimulator() {
  const [selectedNPC, setSelectedNPC] = useState<Personality | null>(null);
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [reputation, setReputation] = useState('Neutral');
  const [worldEvent, setWorldEvent] = useState('Peaceful');

  const handleTalk = async () => {
    if (!selectedNPC || !input.trim() || loading) return;

    setLoading(true);
    setResponse('');
    try {
      const res = await generateNPCResponse(
        selectedNPC.name, 
        selectedNPC.role, 
        input, 
        [], 
        { reputation, worldEvent, bias: selectedNPC.description }
      );
      setResponse(res);
    } catch (error) {
      console.error(error);
      setResponse("Jesus Christ be praised! I cannot talk right now.");
    } finally {
      setLoading(false);
    }
  };

  const reputationLevels = ['Hostile', 'Dismissive', 'Neutral', 'Friendly', 'Honored'];
  const worldEvents = ['Peaceful', 'War Approaching', 'Plague Outbreak', 'Famine', 'Rattay Tournament', 'Royal Visit'];

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b-2 border-kcd-border pb-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-8 bg-kcd-accent"></div>
            <span className="text-[10px] tracking-[0.4em] text-kcd-accent uppercase font-sans font-bold">Neural Entity Simulation</span>
          </div>
          <h2 className="text-4xl font-bold uppercase tracking-tight text-white">Dynamic <span className="text-kcd-accent">Agent</span> Interface</h2>
        </div>
        <div className="flex gap-4">
           <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-widest text-kcd-muted font-bold font-sans mb-1">Current Reputation</span>
              <div className="flex gap-1">
                {reputationLevels.map(rep => (
                  <button 
                    key={rep}
                    onClick={() => setReputation(rep)}
                    className={cn(
                      "px-2 py-0.5 text-[8px] font-bold uppercase transition-all border",
                      reputation === rep ? "bg-kcd-accent text-kcd-bg border-kcd-accent" : "bg-kcd-bg text-kcd-muted border-kcd-border"
                    )}
                  >
                    {rep}
                  </button>
                ))}
              </div>
           </div>
        </div>
      </header>

      {/* World Context Bar */}
      <div className="p-4 bg-kcd-surface border border-kcd-border flex items-center gap-6">
        <span className="text-[10px] uppercase font-sans tracking-widest text-kcd-accent font-bold">World State:</span>
        <div className="flex-1 flex gap-2">
          {worldEvents.map(event => (
            <button
              key={event}
              onClick={() => setWorldEvent(event)}
              className={cn(
                "px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all",
                worldEvent === event ? "bg-kcd-accent/20 border border-kcd-accent text-kcd-accent" : "bg-kcd-bg border border-kcd-border text-kcd-muted hover:border-kcd-accent/30"
              )}
            >
              {event}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {NPCs.map((npc) => (
          <button
            key={npc.id}
            onClick={() => {
              setSelectedNPC(npc);
              setResponse('');
            }}
            className={cn(
              "p-6 bg-kcd-surface border transition-all duration-300 text-left group overflow-hidden relative",
              selectedNPC?.id === npc.id 
                ? "border-kcd-accent/50 shadow-[0_0_30px_rgba(193,154,77,0.1)]" 
                : "border-kcd-border hover:border-kcd-accent/30"
            )}
          >
            <div className="flex flex-col gap-4 relative z-10">
              <div className="w-full aspect-square bg-kcd-bg border border-kcd-border overflow-hidden relative group-hover:border-kcd-accent/50 transition-colors">
                <img src={npc.avatar} alt={npc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className={cn(
                   "absolute inset-0 bg-gradient-to-t from-kcd-bg via-transparent to-transparent opacity-60 transition-opacity",
                   selectedNPC?.id === npc.id ? "opacity-90" : "opacity-0 group-hover:opacity-40"
                )} />
              </div>
              <div>
                <span className="text-[10px] text-kcd-muted uppercase tracking-[0.2em] font-sans font-bold block mb-1">{npc.role}</span>
                <h4 className="text-lg font-bold text-white tracking-tight">{npc.name}</h4>
              </div>
            </div>
            
            {selectedNPC?.id === npc.id && (
              <motion.div 
                layoutId="npc-active-indicator"
                className="absolute top-0 left-0 w-1 h-full bg-kcd-accent"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedNPC ? (
          <motion.div
            key={selectedNPC.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-12 gap-8"
          >
             {/* Left Column: Entity Profile */}
             <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="bg-kcd-surface border-2 border-kcd-accent/30 p-2 font-sans relative">
                   {/* Portrait Frame */}
                   <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-kcd-accent z-20"></div>
                   <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-kcd-accent z-20"></div>

                   <div className="aspect-[3/4] bg-kcd-bg border border-kcd-border relative overflow-hidden group">
                      <img 
                        src={selectedNPC.avatar} 
                        alt={selectedNPC.name} 
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-kcd-bg via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute bottom-0 left-0 w-full p-8 space-y-2">
                         <motion.div 
                           initial={{ x: -20, opacity: 0 }}
                           animate={{ x: 0, opacity: 1 }}
                           className="flex items-center gap-3"
                         >
                            <div className="h-0.5 w-8 bg-kcd-accent" />
                            <span className="text-[10px] uppercase tracking-[0.3em] text-kcd-accent font-bold">Verified Persona</span>
                         </motion.div>
                         <h3 className="text-4xl font-bold text-white uppercase tracking-tighter leading-none mb-1">
                           {selectedNPC.name.split(' ').map((word, i) => (
                             <span key={i} className={i === 0 ? "block" : "text-kcd-accent block"}>{word}</span>
                           ))}
                         </h3>
                         <span className="text-[11px] uppercase tracking-[0.2em] text-kcd-muted font-bold block">{selectedNPC.role}</span>
                      </div>
                   </div>

                   <div className="p-6 space-y-6 bg-kcd-bg/50 mt-2">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <span className="text-[9px] uppercase text-kcd-muted font-bold">Reliability</span>
                            <div className="h-1 bg-kcd-border w-full">
                               <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-kcd-accent" />
                            </div>
                         </div>
                         <div className="space-y-1">
                            <span className="text-[9px] uppercase text-kcd-muted font-bold">Influence</span>
                            <div className="h-1 bg-kcd-border w-full">
                               <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-kcd-accent" />
                            </div>
                         </div>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-kcd-accent block font-bold border-b border-kcd-border pb-2">Neural Behavioral Profile</span>
                        <div className="text-sm italic text-white/70 leading-relaxed font-serif">
                          "{selectedNPC.description}"
                        </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Center/Main Column: neural Dialogue */}
             <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                <div className="bg-kcd-surface border-2 border-kcd-accent/50 p-8 flex flex-col h-full relative">
                  {/* Ornamental Corners */}
                  <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-kcd-accent"></div>
                  <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-kcd-accent"></div>
                  <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-kcd-accent"></div>
                  <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-kcd-accent"></div>

                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-kcd-bg px-4 py-1 text-[10px] uppercase tracking-[0.4em] border border-kcd-accent text-kcd-accent font-sans font-bold">
                    Neural Interaction Engine
                  </div>

                  <div className="flex-1 min-h-[300px] flex flex-col justify-end gap-12 pb-8">
                     <div className="flex flex-col gap-2 opacity-50">
                        <span className="text-[10px] uppercase font-sans tracking-widest font-bold">Henry of Skalitz</span>
                        <p className="text-xl italic">"{input || "Greeting, traveler..."}"</p>
                     </div>

                     <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] uppercase font-sans tracking-widest text-kcd-accent font-bold">{selectedNPC.name}</span>
                           <div className="h-px bg-kcd-accent/30 flex-1" />
                           <span className="text-[9px] px-2 py-0.5 bg-kcd-accent/10 border border-kcd-accent/30 text-kcd-accent uppercase font-sans font-bold tracking-widest">Generative Link</span>
                        </div>
                        {loading ? (
                          <div className="flex gap-2 p-4 bg-kcd-bg border border-kcd-border">
                             <motion.div animate={{ scaleY: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 h-6 bg-kcd-accent/40" />
                             <motion.div animate={{ scaleY: [1, 2, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.1 }} className="w-1 h-6 bg-kcd-accent" />
                             <motion.div animate={{ scaleY: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 h-6 bg-kcd-accent/40" />
                          </div>
                        ) : response ? (
                           <div className="text-3xl leading-snug font-serif text-white drop-shadow-[0_2px_10px_rgba(193,154,77,0.1)]">
                             <ReactMarkdown>{response}</ReactMarkdown>
                           </div>
                        ) : (
                          <p className="text-xl italic text-kcd-muted opacity-40">Select synthesis to commence dialogue...</p>
                        )}
                     </div>
                  </div>

                  <div className="border-t border-kcd-border pt-8 mt-auto flex items-stretch gap-4">
                    <div className="flex-1 bg-kcd-bg border border-kcd-border flex items-center px-4">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTalk()}
                        placeholder={`Address ${selectedNPC.name}...`}
                        className="bg-transparent w-full text-sm outline-none placeholder-kcd-muted italic py-4"
                      />
                    </div>
                    <button
                      onClick={handleTalk}
                      disabled={loading || !input.trim()}
                      className="bg-kcd-accent text-kcd-bg px-8 flex items-center text-[10px] font-bold uppercase tracking-widest font-sans hover:bg-white transition-all disabled:opacity-50"
                    >
                      {loading ? 'Synthesizing...' : 'Sync [Enter]'}
                    </button>
                  </div>
                </div>
             </div>
          </motion.div>
        ) : (
          <div className="h-[500px] border-2 border-kcd-border bg-kcd-surface flex flex-col items-center justify-center space-y-6 text-center group">
             <div className="w-16 h-16 border-2 border-kcd-accent/20 rounded-full flex items-center justify-center group-hover:border-kcd-accent transition-colors duration-700">
                <MessageSquare className="w-8 h-8 text-kcd-accent/20 group-hover:text-kcd-accent transition-colors duration-700" />
             </div>
             <div>
                <h3 className="font-bold uppercase tracking-[0.4em] text-kcd-muted">Entity Selection Needed</h3>
                <p className="text-xs italic text-kcd-muted mt-2">Initialize neural dialogue stream by choosing a persona above.</p>
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
