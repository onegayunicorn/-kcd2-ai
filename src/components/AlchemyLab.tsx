import React, { useState } from 'react';
import { Beaker, Search, FlaskConical, Flame, RotateCw, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAlchemyAssistant } from '../lib/gemini';
import { Recipe } from '../types';
import { cn } from '../lib/utils';

const commonPotions = ['Marigold Decoction', 'Lazarus Potion', 'Saviour Schnapps', 'Bowman\'s Brew', 'Padfoot Potion', 'Buck\'s Blood', 'Nighthawk Potion'];

export default function AlchemyLab() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecipe = async (name: string) => {
    setLoading(true);
    setSearchTerm('');
    try {
      const data = await getAlchemyAssistant(name);
      setRecipe(data as Recipe);
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
            <span className="text-[10px] tracking-[0.4em] text-kcd-accent uppercase font-sans font-bold">Molecular Synthesis Protocol</span>
          </div>
          <h2 className="text-4xl font-bold uppercase tracking-tight text-white">Alchemy <span className="text-kcd-accent">Codex</span></h2>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Potion List */}
        <div className="space-y-8">
          <div className="relative font-sans">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kcd-muted" />
             <input
                type="text"
                placeholder="Lookup pharmacopeia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-kcd-surface border border-kcd-border rounded-none pl-10 pr-4 py-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-kcd-accent transition-colors placeholder:text-kcd-muted"
             />
          </div>

          <div className="space-y-2 font-sans">
            <label className="text-[10px] font-bold text-kcd-muted uppercase tracking-[0.2em] block mb-4 border-b border-kcd-border pb-2">Common Formulae</label>
            {commonPotions.map(potion => (
              <button
                key={potion}
                onClick={() => fetchRecipe(potion)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-4 py-4 text-[10px] font-bold uppercase tracking-widest transition-all group border",
                  recipe?.name === potion 
                    ? "bg-kcd-accent text-kcd-bg border-kcd-accent" 
                    : "bg-kcd-surface border-kcd-border text-kcd-muted hover:border-kcd-accent/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <FlaskConical className="w-4 h-4" />
                  {potion}
                </div>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-kcd-accent" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Display */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center space-y-8 bg-kcd-surface border border-kcd-border relative"
              >
                 <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-kcd-accent/30"></div>
                 <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-kcd-accent/30"></div>
                 
                 <div className="relative">
                    <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                       className="w-32 h-32 border-2 border-dashed border-kcd-accent/20 rounded-full"
                    />
                    <FlaskConical className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-kcd-accent animate-pulse" />
                 </div>
                 <p className="text-kcd-accent font-sans text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">Extracting Essence...</p>
              </motion.div>
            ) : recipe ? (
              <motion.div
                key={recipe.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-8"
              >
                {/* Ingredients */}
                <div className="md:col-span-2 p-8 bg-kcd-surface border border-kcd-border flex flex-col font-sans">
                   <div className="mb-8">
                      <span className="text-[10px] font-bold text-kcd-muted uppercase tracking-[0.2em] block mb-4 border-b border-kcd-border pb-2">Carrier Agent</span>
                      <div className="p-4 bg-kcd-bg border border-kcd-accent/30 flex items-center gap-4 text-kcd-accent relative overflow-hidden">
                         <div className="w-1.5 h-1.5 bg-kcd-accent rounded-full animate-ping" />
                         <span className="text-lg font-bold uppercase tracking-tight">{recipe.base}</span>
                         <div className="absolute right-0 bottom-0 w-8 h-8 bg-kcd-accent/5 skew-x-12 translate-x-4 translate-y-4" />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <span className="text-[10px] font-bold text-kcd-muted uppercase tracking-[0.2em] block border-b border-kcd-border pb-2">Molecular Components</span>
                      <div className="space-y-2">
                         {recipe.ingredients.map((ing, i) => (
                           <div key={i} className="flex justify-between items-center p-4 bg-kcd-bg border border-kcd-border hover:border-kcd-accent/30 transition-all group">
                              <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest transition-colors group-hover:text-white">{ing.item}</span>
                              <span className="text-[10px] font-bold text-kcd-accent bg-kcd-accent/10 px-3 py-1 border border-kcd-accent/20">X{ing.amount}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Instructions */}
                <div className="md:col-span-3 p-10 bg-kcd-surface border-2 border-kcd-accent/50 relative flex flex-col h-full">
                   {/* Ornamental Corners */}
                   <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-kcd-accent"></div>
                   <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-kcd-accent"></div>
                   <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-kcd-accent"></div>
                   <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-kcd-accent"></div>

                   <div className="flex items-center justify-between mb-8 border-b border-kcd-border pb-6">
                      <h3 className="text-3xl font-bold uppercase tracking-tight text-white">{recipe.name}</h3>
                      <div className="flex items-center gap-2 px-3 py-1 border border-kcd-accent/30 text-kcd-accent font-sans">
                         <Flame className="w-3 h-3" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Synthesis Node</span>
                      </div>
                   </div>

                   <div className="space-y-6 relative flex-1">
                      {recipe.steps.map((step, i) => (
                        <div key={i} className="flex gap-6 group">
                           <div className="w-8 h-8 bg-kcd-bg border border-kcd-accent/30 flex items-center justify-center group-hover:border-kcd-accent transition-all flex-shrink-0 relative">
                              <span className="text-[10px] font-bold text-kcd-muted group-hover:text-kcd-accent font-sans tracking-tighter">{i + 1}</span>
                              {i < recipe.steps.length - 1 && (
                                <div className="absolute top-full left-1/2 w-px h-6 bg-kcd-border" />
                              )}
                           </div>
                           <p className="text-white/80 text-lg leading-snug font-serif italic italic">"{step}"</p>
                        </div>
                      ))}
                   </div>

                   <div className="pt-10 flex gap-4 mt-auto font-sans">
                      <button className="flex-1 py-4 bg-kcd-bg border border-kcd-border text-kcd-muted hover:text-white hover:border-kcd-accent transition-all text-[10px] font-bold uppercase tracking-widest">
                         Purge Apparatus
                      </button>
                      <button className="flex-1 py-4 bg-kcd-accent text-kcd-bg text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(193,154,77,0.1)]">
                         Sync to Codex
                      </button>
                   </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] border-2 border-kcd-border bg-kcd-surface flex flex-col items-center justify-center space-y-6 text-center group font-sans">
                 <div className="w-16 h-16 border-2 border-kcd-accent/20 rounded-full flex items-center justify-center group-hover:border-kcd-accent transition-colors duration-700">
                    <Beaker className="w-8 h-8 text-kcd-accent/20 group-hover:text-kcd-accent transition-colors duration-700" />
                 </div>
                 <div>
                    <h3 className="font-bold uppercase tracking-[0.4em] text-kcd-muted">Laboratory Offline</h3>
                    <p className="text-xs italic text-kcd-muted mt-2">Initialize synthesis by selecting a formula from the codex.</p>
                 </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
