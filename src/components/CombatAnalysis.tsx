import React, { useState } from 'react';
import { Swords, ShieldAlert, Zap, Brain, ChevronRight, Activity, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeCombatPatterns } from '../lib/gemini';
import { cn } from '../lib/utils';
import { sua } from '../lib/sua-core';

interface CombatState {
  analysis: string;
  adaptation_strategy: string;
  counter_moves: string[];
  aggression_level: string;
  threat_rating: string;
}

const ENEMY_TYPES = ['Cuman Raider', 'Bandit Thug', 'Wayward Knight', 'Rattay Guard'];
const COMBAT_ACTIONS = [
  'Overhead Strike x3', 
  'Perfect Block -> Riposte', 
  'Spamming Stamina Potion', 
  'Clinch abuse', 
  'Feint Left -> Strike Right', 
  'Short-sword poke spam', 
  'Heavy shield defense'
];

export default function CombatAnalysis() {
  const [playerActions, setPlayerActions] = useState<string[]>([]);
  const [enemyType, setEnemyType] = useState(ENEMY_TYPES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CombatState | null>(null);

  const addAction = (action: string) => {
    if (playerActions.length >= 10) {
      setPlayerActions(prev => [...prev.slice(1), action]);
    } else {
      setPlayerActions(prev => [...prev, action]);
    }
  };

  const clearActions = () => setPlayerActions([]);

  const handleAnalyze = async () => {
    if (playerActions.length === 0) return;
    setLoading(true);
    try {
      const data = await analyzeCombatPatterns(playerActions, enemyType);
      setResult(data);
      
      // Update SUA Adaptive Engine based on threat rating and action volume
      // Higher threat rating + more actions = player is performing well, so increase difficulty
      const performanceScore = (parseInt(data.threat_rating) / 50) * (playerActions.length / 5);
      sua.updateDifficulty(Math.max(0.7, Math.min(1.5, performanceScore)));
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b-2 border-kcd-border pb-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-8 bg-kcd-accent"></div>
            <span className="text-[10px] tracking-[0.4em] text-kcd-accent uppercase font-sans font-bold">Tactical Adaptation Engine</span>
          </div>
          <h2 className="text-4xl font-bold uppercase tracking-tight text-white">Combat <span className="text-kcd-accent">Feedback</span> Sync</h2>
        </div>
        <div className="text-right">
           <span className="text-[10px] tracking-widest text-kcd-muted block uppercase font-sans mb-1 font-bold">Neural Combat Analysis</span>
           <div className="flex items-center gap-3">
              <span className="text-xl font-bold">Enemy Learning: Active</span>
              <div className="w-3 h-3 bg-red-900 border border-red-500 rounded-full animate-pulse"></div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Player Action Recording */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="bg-kcd-surface border border-kcd-border p-8 font-sans">
            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-kcd-border pb-4 mb-6 text-kcd-accent">Record Player Patterns</h3>
            
            <div className="grid grid-cols-1 gap-2 mb-8">
              {COMBAT_ACTIONS.map(action => (
                <button
                  key={action}
                  onClick={() => addAction(action)}
                  className="px-4 py-3 bg-kcd-bg border border-kcd-border text-left text-[10px] font-bold uppercase tracking-widest hover:border-kcd-accent/50 transition-all group flex justify-between items-center"
                >
                  {action}
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-kcd-accent" />
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase text-kcd-muted font-bold">Action Buffer (Last 10)</span>
                <button onClick={clearActions} className="text-[9px] text-red-500 font-bold uppercase hover:underline">Clear</button>
              </div>
              <div className="bg-kcd-bg p-4 border border-kcd-border min-h-[150px] space-y-2">
                {playerActions.length === 0 ? (
                  <p className="text-[10px] italic text-kcd-muted opacity-40">No actions recorded...</p>
                ) : (
                  playerActions.map((action, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      key={i} 
                      className="text-[9px] font-mono text-kcd-text border-l-2 border-kcd-accent pl-2"
                    >
                      {action}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="p-6 bg-kcd-surface border border-kcd-border">
            <label className="text-[10px] font-bold text-kcd-muted uppercase tracking-[0.2em] block mb-4">Target Adversary</label>
            <div className="grid grid-cols-2 gap-2">
              {ENEMY_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setEnemyType(type)}
                  className={cn(
                    "px-3 py-3 text-[9px] font-bold uppercase tracking-widest border transition-all",
                    enemyType === type ? "bg-kcd-accent text-kcd-bg border-kcd-accent" : "bg-kcd-bg border border-kcd-border text-kcd-muted hover:border-kcd-accent/30"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || playerActions.length === 0}
              className="w-full mt-6 py-4 bg-red-900/20 border border-red-500/50 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-30 flex items-center justify-center gap-3"
            >
              {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
              Sync Combat Feedback
            </button>
          </div>
        </div>

        {/* Right: Neural Feedback */}
        <div className="col-span-12 lg:col-span-7">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-kcd-surface border-2 border-red-900/50 p-10 space-y-10 relative overflow-hidden"
              >
                {/* Ornamental Corners */}
                <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
                <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
                <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
                <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>

                <div className="flex justify-between items-start border-b border-kcd-border pb-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Target className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.3em] font-sans">Adversary Response Log</span>
                    </div>
                    <h3 className="text-4xl font-bold uppercase tracking-tight text-white">{enemyType} Adaptation</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-red-500/60 font-bold uppercase block mb-1">Threat Rating</span>
                    <span className="text-4xl font-bold text-red-500 font-mono">{result.threat_rating}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 font-sans">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-widest text-kcd-muted font-bold">Observed Weakness</span>
                    <p className="text-sm font-bold text-white border-l-2 border-red-500 pl-4 leading-relaxed">
                      {result.analysis}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-widest text-kcd-muted font-bold">Aggression Bias</span>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                        result.aggression_level === 'High' ? "bg-red-500 text-white" : "bg-kcd-bg text-red-500 border border-red-500/30"
                      )}>
                        {result.aggression_level}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="p-6 bg-kcd-bg border border-red-900/30">
                    <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold block mb-4">Neural Strategy Overhaul</span>
                    <p className="text-2xl font-serif italic text-white/90 leading-snug drop-shadow-lg">
                      "{result.adaptation_strategy}"
                    </p>
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-[10px] font-bold text-kcd-accent uppercase tracking-[0.4em] flex items-center gap-3 font-sans">
                        Counter-Move Initialization
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.counter_moves.map((move, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-kcd-surface border border-kcd-border group hover:border-red-500/50 transition-all">
                             <div className="w-8 h-8 flex items-center justify-center bg-red-900/20 text-red-500 border border-red-500/30 font-bold font-mono text-[10px]">
                               {i + 1}
                             </div>
                             <span className="text-[11px] font-bold uppercase tracking-tight text-white/70 group-hover:text-white transition-colors">
                               {move}
                             </span>
                          </div>
                        ))}
                      </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-kcd-border flex justify-between items-center text-[10px] font-bold uppercase text-kcd-muted tracking-[0.2em] font-sans">
                  <span>Logic Frame: {Math.floor(Math.random() * 9999 + 1000)}</span>
                  <span className="text-red-500 animate-pulse">Synchronizing to World State...</span>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[600px] border-2 border-kcd-border bg-kcd-surface flex flex-col items-center justify-center space-y-6 text-center group font-sans">
                 <div className="w-16 h-16 border-2 border-red-900/20 rounded-full flex items-center justify-center group-hover:border-red-500 transition-colors duration-700">
                    <Swords className="w-8 h-8 text-red-900/20 group-hover:text-red-500 transition-colors duration-700" />
                 </div>
                 <div>
                    <h3 className="font-bold uppercase tracking-[0.4em] text-kcd-muted">Combat Buffer Empty</h3>
                    <p className="text-xs italic text-kcd-muted mt-2">Record player actions to generate adaptive combat feedback.</p>
                 </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
