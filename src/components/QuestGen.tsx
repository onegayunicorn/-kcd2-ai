import React, { useState } from 'react';
import { Scroll, MapPin, Trophy, Sword, Zap, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuest } from '../lib/gemini';
import { Quest } from '../types';
import { cn } from '../lib/utils';

export default function QuestGen() {
  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('Medium');
  const [location, setLocation] = useState('Rattay');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateQuest(location, difficulty);
      setQuest(data as Quest);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const locations = ['Rattay', 'Talmberg', 'Sasau', 'Uzhit', 'Skalitz', 'Ledetchko', 'Merhojed', 'Pribyslavitz'];
  const difficulties = ['Easy', 'Medium', 'Hard', 'Hardcore'];

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b-2 border-kcd-border pb-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-8 bg-kcd-accent"></div>
            <span className="text-[10px] tracking-[0.4em] text-kcd-accent uppercase font-sans font-bold">Procedural Content Engine</span>
          </div>
          <h2 className="text-4xl font-bold uppercase tracking-tight text-white">Quest <span className="text-kcd-accent">Synthesizer</span></h2>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="col-span-12 lg:col-span-4 bg-kcd-surface border border-kcd-border p-8 font-sans space-y-8 self-start">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-kcd-muted uppercase tracking-[0.2em] block">Target Geography</label>
            <div className="grid grid-cols-2 gap-2">
              {locations.map(loc => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={cn(
                    "px-3 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all",
                    location === loc 
                      ? "bg-kcd-accent text-kcd-bg border-kcd-accent shadow-[4px_4px_0px_rgba(193,154,77,0.2)]" 
                      : "bg-kcd-bg border-kcd-border text-kcd-muted hover:border-kcd-accent/50"
                  )}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-kcd-muted uppercase tracking-[0.2em] block">Challenge Tier</label>
            <div className="flex gap-2">
              {difficulties.map(diff => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={cn(
                    "flex-1 px-3 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all",
                    difficulty === diff 
                      ? "bg-kcd-accent text-kcd-bg border-kcd-accent" 
                      : "bg-kcd-bg border-kcd-border text-kcd-muted hover:border-kcd-accent/50"
                  )}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="group w-full py-5 bg-kcd-accent text-kcd-bg font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 relative overflow-hidden"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            Generate Contract
            <motion.div 
               className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" 
            />
          </button>
        </div>

        {/* Output */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {quest ? (
              <motion.div
                key={quest.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-kcd-surface border-2 border-kcd-accent/50 flex flex-col relative min-h-full"
              >
                {/* Ornamental Corners */}
                <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-kcd-accent"></div>
                <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-kcd-accent"></div>
                <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-kcd-accent"></div>
                <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-kcd-accent"></div>
                
                <div className="p-10 space-y-10">
                  <div className="flex justify-between items-start border-b border-kcd-border pb-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Scroll className="w-4 h-4 text-kcd-accent" />
                        <span className="text-[10px] font-bold text-kcd-muted uppercase tracking-[0.3em] font-sans">Active Quest Directive</span>
                      </div>
                      <h3 className="text-4xl font-bold uppercase tracking-tight text-white">{quest.title}</h3>
                    </div>
                    <div className={cn(
                       "px-4 py-2 border text-[10px] font-bold uppercase tracking-[0.2em] font-sans",
                       quest.difficulty === 'Hardcore' ? "bg-red-900/10 text-red-500 border-red-500/50" :
                       quest.difficulty === 'Hard' ? "bg-orange-900/10 text-orange-500 border-orange-500/50" :
                       "bg-green-900/10 text-green-500 border-green-500/50"
                    )}>
                       {quest.difficulty.toUpperCase()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 font-sans">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-kcd-muted font-bold">Region Boundary</span>
                      <div className="text-lg font-bold text-white flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-kcd-accent rounded-full" />
                         {quest.location}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-kcd-muted font-bold">Estimated Yield</span>
                      <div className="text-lg font-bold text-kcd-accent flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-kcd-accent rounded-full" />
                         {quest.reward}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 font-serif">
                    <p className="text-2xl italic text-white/90 leading-snug drop-shadow-lg font-serif">"{quest.description}"</p>
                    
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-kcd-accent uppercase tracking-[0.4em] flex items-center gap-3 font-sans">
                        Tactical Execution Steps
                      </h4>
                      <div className="grid gap-3 font-sans">
                        {quest.objectives.map((obj, i) => (
                          <div key={i} className="flex items-center gap-5 p-4 bg-kcd-bg/40 border border-kcd-border group hover:border-kcd-accent/30 transition-all">
                            <span className="text-xl font-bold text-kcd-muted group-hover:text-kcd-accent transition-colors font-serif italic">{i + 1}</span>
                            <p className="text-sm font-bold uppercase tracking-tight text-white/70 group-hover:text-white transition-colors">{obj}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto p-6 bg-kcd-bg/60 border-t border-kcd-border flex justify-between items-center font-sans">
                   <div className="flex items-center gap-3 text-[10px] text-kcd-muted font-bold tracking-widest uppercase">
                      <AlertCircle className="w-3 h-3 text-kcd-accent" /> Logic Hash: {Math.floor(Math.random() * 89999 + 10000)}
                   </div>
                   <button className="px-6 py-2 bg-kcd-accent/10 border border-kcd-accent/30 text-[10px] font-bold text-kcd-accent hover:bg-kcd-accent hover:text-kcd-bg uppercase tracking-[0.2em] transition-all">
                      Acknowledge Directive
                   </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-[600px] border-2 border-kcd-border bg-kcd-surface flex flex-col items-center justify-center space-y-6 text-center group font-sans">
                 <div className="w-16 h-16 border-2 border-kcd-accent/20 rounded-full flex items-center justify-center group-hover:border-kcd-accent transition-colors duration-700">
                    <Scroll className="w-8 h-8 text-kcd-accent/20 group-hover:text-kcd-accent transition-colors duration-700" />
                 </div>
                 <div>
                    <h3 className="font-bold uppercase tracking-[0.4em] text-kcd-muted">PCG Engine Offline</h3>
                    <p className="text-xs italic text-kcd-muted mt-2">Configure location and challenge tier to synchronize a new contract.</p>
                 </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
