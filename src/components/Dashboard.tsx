import React from 'react';
import { Activity, Users, Database, Zap, Shield, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { sua } from '../lib/sua-core';

export default function Dashboard() {
  const stats = [
    { label: 'SOVEREIGN HONOR', value: sua.getReputation().honor.toFixed(0), icon: Shield, color: 'text-blue-400' },
    { label: 'SOVEREIGN BRUTALITY', value: sua.getReputation().brutality.toFixed(0), icon: Swords, color: 'text-red-500' },
    { label: 'ADAPTIVE INTENSITY', value: `×${sua.getDifficulty().globalMultiplier.toFixed(2)}`, icon: Zap, color: 'text-kcd-accent' },
    { label: 'CONNECTED NEURAL NODES', value: '850', icon: Users, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b-2 border-kcd-border pb-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-8 bg-kcd-accent"></div>
            <span className="text-[10px] tracking-[0.4em] text-kcd-accent uppercase font-sans font-bold">Commander Insight System — SUA v4.2</span>
          </div>
          <h2 className="text-4xl font-bold uppercase tracking-tight text-white">Neural <span className="text-kcd-accent">Network</span> Dashboard</h2>
        </div>
        <div className="text-right">
           <span className="text-[10px] tracking-widest text-kcd-muted block uppercase font-sans mb-1 font-bold">KCD2 XBOX INTEGRATION</span>
           <div className="flex items-center gap-3">
              <span className="text-xl font-bold">Bridge Protocol Active</span>
              <div className="w-3 h-3 bg-green-900 border border-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.3)]"></div>
           </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-kcd-surface border border-kcd-border group relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("p-2 bg-kcd-bg border border-kcd-border group-hover:border-kcd-accent/50 transition-colors", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</p>
              <p className="text-[10px] font-bold text-kcd-muted uppercase tracking-widest font-sans">{stat.label}</p>
            </div>
            <div className="absolute right-0 bottom-0 w-12 h-12 bg-kcd-accent/5 group-hover:bg-kcd-accent/10 transition-colors skew-x-12 translate-x-4 translate-y-4" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health */}
        <div className="lg:col-span-2 p-8 bg-kcd-surface border-2 border-kcd-accent/30 relative overflow-hidden">
          {/* Ornamental Corners */}
          <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-kcd-accent/50"></div>
          <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-kcd-accent/50"></div>
          <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-kcd-accent/50"></div>
          <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-kcd-accent/50"></div>

          <div className="flex items-center justify-between mb-8 border-b border-kcd-border pb-4">
            <h3 className="text-xl font-bold uppercase tracking-tight text-white">Neural Engine <span className="text-kcd-accent">Health</span></h3>
            <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest border border-green-500/20 font-sans">Operational</span>
          </div>
          
          <div className="space-y-6">
            {[
              { name: 'DeepSeek R1 Core', val: '99.8%' },
              { name: 'ReadSpeaker Neural TTS', val: '98.5%' },
              { name: 'Xbox UWP Injection', val: '100%' },
              { name: 'Azure Cloud Pipeline', val: '94.2%' }
            ].map(system => (
              <div key={system.name} className="space-y-3 font-sans">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-kcd-muted">{system.name}</span>
                  <span className="text-kcd-accent">{system.val}</span>
                </div>
                <div className="h-1 bg-kcd-bg w-full overflow-hidden border border-kcd-border">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: system.val }}
                    className="h-full bg-kcd-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Integration logs */}
        <div className="p-8 bg-kcd-surface border border-kcd-border flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest border-b border-kcd-border pb-4 mb-6 font-sans text-kcd-accent">Integration Logic Stream</h3>
          <div className="space-y-4 flex-1 overflow-auto max-h-[300px] scrollbar-thin scrollbar-thumb-kcd-border scrollbar-track-transparent pr-2">
            {[
              { time: '14:22:15', msg: 'NPC_DIALOGUE_GEN: HENRY_SKALITZ', type: 'info' },
              { time: '14:21:02', msg: 'ALCHEMY_SYNC: MARIGOLD_RECIPE', type: 'success' },
              { time: '14:18:45', msg: 'MOD_LOADER_XBOX: SUCCESS_PACK_04', type: 'success' },
              { time: '14:15:30', msg: 'LATENCY_SPIKE: AZURE_NORTH_WA', type: 'warning' },
              { time: '14:12:10', msg: 'QUEST_PCG: DYNAMIC_EVENT_TRIGGER', type: 'info' },
              { time: '14:08:55', msg: 'AUTH_XBOX_LIVE: TOKEN_REFRESH', type: 'success' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 font-mono text-[10px] leading-relaxed border-b border-kcd-border/30 pb-2">
                <span className="text-kcd-muted opacity-40 flex-shrink-0">{log.time}</span>
                <span className={cn(
                  "font-bold uppercase tracking-tighter",
                  log.type === 'success' ? 'text-green-600' : 
                  log.type === 'warning' ? 'text-yellow-600' : 'text-kcd-accent'
                )}>{log.msg}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-kcd-border">
             <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-kcd-muted font-bold font-sans">
                <span>Active Threads</span>
                <span className="text-kcd-accent">142</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
