export enum ReputationDimension {
  HONOR = "honor",
  BRUTALITY = "brutality",
  CHARITY = "charity",
  PIETY = "piety",
  THIEVERY = "thievery",
  ALCOHOL = "alcohol"
}

export interface Quest {
  title: string;
  description: string;
  reward: string;
  location: string;
  difficulty: string;
  objectives: string[];
  intensity_signature?: string;
  quantum_logic_note?: string;
}

export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface Recipe {
  name: string;
  ingredients: { item: string; amount: string }[];
  steps: string[];
  base: string;
}

export interface Personality {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
}

export interface NPC extends Personality {
  // Can add more specific NPC fields here if needed
}
