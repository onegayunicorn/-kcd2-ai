import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { MapPin } from 'lucide-react';

interface Location {
  name: string;
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
}

const locations: Location[] = [
  { name: 'Skalitz', x: 15, y: 15 },
  { name: 'Pribyslavitz', x: 30, y: 10 },
  { name: 'Uzhit', x: 80, y: 15 },
  { name: 'Talmberg', x: 65, y: 45 },
  { name: 'Merhojed', x: 45, y: 40 },
  { name: 'Sasau', x: 20, y: 65 },
  { name: 'Ledetchko', x: 50, y: 75 },
  { name: 'Rattay', x: 80, y: 85 },
];

interface BohemiaMapProps {
  selectedLocation: string;
  highlightedLocation?: string;
  onLocationSelect?: (name: string) => void;
  className?: string;
}

export default function BohemiaMap({ selectedLocation, highlightedLocation, onLocationSelect, className }: BohemiaMapProps) {
  return (
    <div className={cn("relative w-full aspect-[4/3] bg-kcd-bg border border-kcd-border overflow-hidden group", className)}>
      {/* Map Background Grid/Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C19A4D_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Decorative Compass or Elements */}
      <div className="absolute top-4 left-4 font-serif italic text-kcd-accent/20 text-4xl select-none">Bohemia</div>
      
      {/* Simplified Path/Connections between main hubs */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path 
          d="M 20 20 L 35 15 L 55 40 L 70 85 L 50 70 L 25 65 L 40 45 L 55 40" 
          fill="none" 
          stroke="var(--color-kcd-accent)" 
          strokeWidth="0.5" 
          strokeDasharray="2 2"
        />
      </svg>

      {/* Location Markers */}
      {locations.map((loc) => {
        const isSelected = selectedLocation === loc.name;
        const isHighlighted = highlightedLocation === loc.name;
        return (
          <motion.button
            key={loc.name}
            onClick={() => onLocationSelect?.(loc.name)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/pin"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            initial={false}
            animate={{ scale: isSelected || isHighlighted ? 1.2 : 1 }}
          >
            <div className="relative">
              <MapPin 
                className={cn(
                  "w-6 h-6 transition-colors duration-300",
                  isSelected ? "text-kcd-accent fill-kcd-accent/20" : 
                  isHighlighted ? "text-red-500 fill-red-500/20" :
                  "text-kcd-muted hover:text-kcd-accent/50"
                )} 
              />
              {(isSelected || isHighlighted) && (
                <motion.div 
                  layoutId="pulse"
                  className={cn(
                    "absolute inset-0 rounded-full border animate-ping",
                    isSelected ? "border-kcd-accent" : "border-red-500"
                  )} 
                />
              )}
            </div>
            <span className={cn(
              "mt-1 text-[8px] font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap px-1 bg-kcd-bg/80 border border-transparent",
              isSelected ? "text-white border-kcd-accent/30 py-0.5" : 
              isHighlighted ? "text-red-500 border-red-500/30 py-0.5" :
              "text-kcd-muted opacity-0 group-hover/pin:opacity-100"
            )}>
              {loc.name}
            </span>
          </motion.button>
        );
      })}

      {/* Map Legend/Coordinate Readout */}
      <div className="absolute bottom-2 right-2 font-mono text-[8px] text-kcd-muted/30">
        LOC_VECTOR: [{selectedLocation.toUpperCase()}]
      </div>
    </div>
  );
}
