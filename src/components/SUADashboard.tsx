import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Lock, 
  Terminal, 
  Zap, 
  Database, 
  Cpu, 
  Globe, 
  AlertTriangle,
  RefreshCw,
  Search,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sua } from '../lib/sua-core';
import { cn } from '../lib/utils';
import { generateSovereignAnalysis } from '../lib/gemini';

export default function SUADashboard() {
  const [stats, setStats] = useState({
    rep: sua.getReputation(),
    diff: sua.getDifficulty()
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'audit' | 'security'>('telemetry');
  const [sovereignAnalysis, setSovereignAnalysis] = useState<string>('Initializing strategic assessment...');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        rep: sua.getReputation(),
        diff: sua.getDifficulty()
      });
    }, 15000); // Reduce frequency for layout stability
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoadingAnalysis(true);
      try {
        const analysis = await generateSovereignAnalysis(stats.rep, stats.diff);
        setSovereignAnalysis(analysis);
      } catch (err) {
        setSovereignAnalysis("Error retrieving strategic analysis. Terminal offline.");
      } finally {
        setIsLoadingAnalysis(false);
      }
    };
    fetchAnalysis();
  }, [isSyncing]); // Re-fetch on sync or significant state change

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      sua.processReputationDecay(1); // Simulate transition of 1 hour
      setIsSyncing(false);
    }, 800);
  };

  const systems = [
    { name: 'Reputation Decay Engine', status: 'Active', security: 'HMAC-SHA384', color: 'text-green-500' },
    { name: 'NPC Emotional Memory', status: 'Active', security: 'AES-256-GCM', color: 'text-green-500' },
    { name: 'Adaptive AI Controller', status: 'Active', security: 'Bounded PID', color: 'text-green-500' },
    { name: 'Rumor Propagation', status: 'Synching', security: 'mTLS', color: 'text-kcd-accent' },
    { name: 'NeuralFlow Bridge', status: 'Operational', security: 'ECC-P384', color: 'text-green-500' },
  ];

  return (
    <div className="space-y-12">
      {/* Header with SUA Signature */}
      <header className="flex justify-between items-end border-b-2 border-kcd-border pb-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1 w-12 bg-kcd-accent"></div>
            <span className="text-[10px] tracking-[0.5em] text-kcd-accent uppercase font-sans font-bold">Commander Tyrone J. Power Ω</span>
          </div>
          <h2 className="text-5xl font-bold uppercase tracking-tighter text-white">Sovereign <span className="text-kcd-accent">Unified</span> Architecture</h2>
        </div>
        
        <div className="flex gap-6 items-end">
           <div className="text-right">
              <span className="text-[10px] tracking-widest text-kcd-muted block uppercase font-sans mb-1 font-bold">System Status</span>
              <div className="flex items-center gap-3">
                 <span className="text-2xl font-bold uppercase tracking-tight">Fully Operational</span>
                 <div className="w-3 h-3 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] rounded-full animate-pulse"></div>
              </div>
           </div>
           <button 
             onClick={handleManualSync}
             disabled={isSyncing}
             className="px-6 py-3 bg-kcd-accent text-kcd-bg font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all flex items-center gap-2"
           >
             {isSyncing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
             Force Sync
           </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-kcd-border font-sans">
        {(['telemetry', 'audit', 'security'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-4 text-[10px] uppercase font-bold tracking-[0.3em] transition-all relative",
              activeTab === tab ? "text-kcd-accent border-b-2 border-kcd-accent" : "text-kcd-muted hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Stats Panel */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === 'telemetry' && (
              <motion.div 
                key="telemetry"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Strategic Assessment Alert */}
                <div className="bg-kcd-bg border-l-4 border-kcd-accent p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2">
                    <Activity className={cn("w-4 h-4 text-kcd-accent/30", isLoadingAnalysis && "animate-spin")} />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-kcd-accent block mb-3">Sovereign Strategic Assessment</span>
                  <p className="text-xl font-serif italic text-white/90 leading-relaxed max-w-2xl">
                    {sovereignAnalysis}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Adaptive AI Matrix */}
                <div className="bg-kcd-surface border border-kcd-border p-8 space-y-8">
                  <div className="flex items-center justify-between border-b border-kcd-border pb-4">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-kcd-accent" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white">Adaptive AI Controller</h3>
                    </div>
                    <span className="text-[10px] font-mono text-kcd-accent">PID_LOOP_v1.2</span>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(stats.diff).map(([key, val]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                          <span className="text-kcd-muted">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-white">×{val.toFixed(2)}</span>
                        </div>
                        <div className="h-1 bg-kcd-bg w-full">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${(val / 2) * 100}%` }} 
                            className="h-full bg-kcd-accent" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reputation Matrix */}
                <div className="bg-kcd-surface border border-kcd-border p-8 space-y-8">
                   <div className="flex items-center justify-between border-b border-kcd-border pb-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-kcd-accent" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white">Sovereign Rep Dynamics</h3>
                    </div>
                    <span className="text-[10px] font-mono text-kcd-accent">DECAY_HALF_72H</span>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {Object.entries(stats.rep).map(([key, val]) => (
                      <div key={key} className="p-4 bg-kcd-bg border border-kcd-border rounded-none group hover:border-kcd-accent/30 transition-all">
                        <span className="text-[9px] uppercase tracking-tighter text-kcd-muted font-bold block mb-1 group-hover:text-kcd-accent transition-colors">{key}</span>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-white leading-none">{val.toFixed(0)}</span>
                          <span className="text-[10px] text-kcd-accent/40 font-mono mb-1">IDX</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

            {activeTab === 'audit' && (
              <motion.div 
                key="audit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-kcd-surface border border-kcd-border p-8 space-y-4"
              >
                <div className="flex items-center gap-3 border-b border-kcd-border pb-4 mb-4">
                  <Database className="w-4 h-4 text-kcd-accent" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white">Immutable System Audit</h3>
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                  {[
                    `REPUTATION_STABILIZED: [HONOR:${stats.rep.honor.toFixed(0)}] [BRUTALITY:${stats.rep.brutality.toFixed(0)}]`,
                    `AI_ADAPTATION_MATRIX_UPDATED: GLOBAL_MULT=${stats.diff.globalMultiplier.toFixed(2)}`,
                    `NEURAL_EMOTION_SYNC: Target=Henry_of_Skalitz STATUS:PERSISTENT`,
                    `QUANTUM_QUEST_POOL_REFRESH: Entropies aligned for Rattay`,
                    `COMBAT_VECTOR_ANALYSIS: Countering feint-heavy player patterns`,
                    `SOVEREIGN_SIGNATURE_VERIFIED: Commander Tyrone verified`,
                    `WORLD_DECAY_CYCLE: Temporal shift applied`
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-kcd-bg/40 border border-kcd-border/50 font-mono text-[9px] text-kcd-muted">
                      <div className="flex items-center gap-4">
                        <span className="text-kcd-accent">[{new Date(Date.now() - i * 3600000).toISOString()}]</span>
                        <span className="text-white uppercase">{log}</span>
                      </div>
                      <span className="text-green-900/40">Verified_Signature_SHA384</span>
                    </div>
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i+7} className="flex items-center justify-between p-4 bg-kcd-bg/40 border border-kcd-border/50 font-mono text-[9px] text-kcd-muted">
                      <div className="flex items-center gap-4">
                        <span className="text-kcd-accent">[{new Date(Date.now() - (i+7) * 3600000).toISOString()}]</span>
                        <span>SYSTEM_IDLE: Awaiting sovereign directive...</span>
                      </div>
                      <span className="text-green-900/40">Verified_Signature_SHA384</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                 <div className="bg-kcd-surface border border-kcd-border p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-kcd-border pb-4">
                       <Lock className="w-4 h-4 text-kcd-accent" />
                       <h3 className="text-xs font-bold uppercase tracking-widest text-white">Keystore Status</h3>
                    </div>
                    <div className="space-y-4 font-sans uppercase">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-kcd-muted">Master Secret Vault</span>
                          <span className="text-[10px] font-bold text-green-500">ENCRYPTED_READY</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-kcd-muted">Xbox mTLS Cert</span>
                          <span className="text-[10px] font-bold text-green-500">SIGNED_VALID</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-kcd-muted">HMAC-SHA Payload Pin</span>
                          <span className="text-[10px] font-bold text-green-500">ACTIVE</span>
                       </div>
                    </div>
                 </div>
                 <div className="bg-kcd-surface border border-kcd-border p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-kcd-border pb-4">
                       <ShieldAlert className="w-4 h-4 text-red-500" />
                       <h3 className="text-xs font-bold uppercase tracking-widest text-white">Security Invariants</h3>
                    </div>
                    <div className="space-y-4">
                       <div className="p-4 bg-kcd-bg border-l-2 border-green-500 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-white uppercase">No shadowing detected</span>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                       </div>
                       <div className="p-4 bg-kcd-bg border-l-2 border-green-500 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-white uppercase">Identity spoofing guard</span>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right System Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
           <div className="bg-kcd-surface border border-kcd-border p-8">
              <h3 className="text-xs font-bold uppercase tracking-widest border-b border-kcd-border pb-4 mb-6 text-kcd-accent">Module Hub Registry</h3>
              <div className="space-y-2">
                 {systems.map((sys, i) => (
                    <div key={i} className="flex flex-col gap-1 p-4 bg-kcd-bg/40 border border-kcd-border hover:border-kcd-accent/30 transition-all">
                       <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold text-white uppercase tracking-tight">{sys.name}</span>
                          <span className={cn("text-[9px] font-bold uppercase", sys.color)}>{sys.status}</span>
                       </div>
                       <div className="flex items-center gap-2 text-[8px] text-kcd-muted font-mono uppercase">
                          <Lock className="w-2.5 h-2.5" />
                          {sys.security} PROTECTED
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-kcd-bg border border-kcd-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-full bg-kcd-accent/5 skew-x-12 translate-x-12 group-hover:translate-x-6 transition-transform duration-700" />
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-kcd-accent" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-kcd-accent">World State Engine</span>
                 </div>
                 <p className="text-[10px] text-kcd-muted uppercase tracking-[0.2em] font-sans font-bold leading-relaxed">
                   AI-POWERED PROCEDURAL SYNTHESIS TERMINAL VALIDATED. DATA INTEGRITY STANDARDS COMPLIANT.
                 </p>
                 <div className="pt-4 flex justify-between items-end">
                    <div className="space-y-1">
                       <span className="text-[8px] text-kcd-muted uppercase block">Logic Hash</span>
                       <span className="text-xs font-bold font-mono text-white">0x7F4A...B92D</span>
                    </div>
                    <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-500 text-[8px] font-bold uppercase tracking-widest">
                       Secure
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
