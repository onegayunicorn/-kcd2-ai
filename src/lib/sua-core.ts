import { ReputationDimension } from '../types';

export interface ReputationState {
  honor: number;
  brutality: number;
  charity: number;
  piety: number;
  thievery: number;
  alcohol: number;
}

export interface AdaptiveDifficulty {
  aggression: number;
  tacticalAwareness: number;
  healthMultiplier: number;
  damageMultiplier: number;
  globalMultiplier: number;
}

class SUACore {
  private static instance: SUACore;
  
  // Internal State (Mocking persisted memory for this iteration)
  private reputation: ReputationState = {
    honor: 50,
    brutality: 0,
    charity: 50,
    piety: 30,
    thievery: 0,
    alcohol: 10
  };

  private difficulty: AdaptiveDifficulty = {
    aggression: 1.0,
    tacticalAwareness: 1.0,
    healthMultiplier: 1.0,
    damageMultiplier: 1.0,
    globalMultiplier: 1.0
  };

  private lastSync: number = Date.now();

  private constructor() {}

  public static getInstance(): SUACore {
    if (!SUACore.instance) {
      SUACore.instance = new SUACore();
    }
    return SUACore.instance;
  }

  /**
   * Exponential Reputation Decay Engine
   * Normalizes reputation towards zero/neutral over time
   */
  public processReputationDecay(hoursElapsed: number) {
    const halfLife = 72; // 3 days
    const decayConstant = Math.log(2) / halfLife;
    const factor = Math.exp(-decayConstant * hoursElapsed);

    (Object.keys(this.reputation) as Array<keyof ReputationState>).forEach(key => {
      // Closer to 0 decays slower, further decays faster
      // Shift towards neutral (usually center of 0-100 is 50, but here let's assume 0 is negative, 100 is positive)
      // Actually let's assume 50 is equilibrium
      const equilibrium = 50;
      this.reputation[key] = equilibrium + (this.reputation[key] - equilibrium) * factor;
    });
    
    this.lastSync = Date.now();
  }

  /**
   * Adaptive AI Controller (PID-style Logic)
   * Adjusts difficulty based on player victory/loss streaks
   */
  public updateDifficulty(playerPerformanceScore: number) {
    // 1.0 is expected performance. >1.0 is player winning too easily.
    const smoothing = 0.15;
    const target = 1.0;
    const error = playerPerformanceScore - target;
    
    // Adjust global multiplier inversely to performance
    // If player is too good (perf > 1), increase difficulty
    this.difficulty.globalMultiplier += error * smoothing;
    
    // Clamp
    this.difficulty.globalMultiplier = Math.max(0.6, Math.min(1.5, this.difficulty.globalMultiplier));
    
    // Propagate to sub-params
    this.difficulty.aggression = 0.5 + (this.difficulty.globalMultiplier - 0.5) * 1.2;
    this.difficulty.tacticalAwareness = this.difficulty.globalMultiplier;
    this.difficulty.healthMultiplier = 0.8 + (this.difficulty.globalMultiplier - 0.5) * 0.8;
    this.difficulty.damageMultiplier = 0.7 + (this.difficulty.globalMultiplier - 0.5) * 1.0;
  }

  public getReputation(): ReputationState {
    return { ...this.reputation };
  }

  public getDifficulty(): AdaptiveDifficulty {
    return { ...this.difficulty };
  }

  public setReputation(newRep: Partial<ReputationState>) {
    this.reputation = { ...this.reputation, ...newRep };
  }
}

export const sua = SUACore.getInstance();
