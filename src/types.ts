export type Personality = {
  name: string;
  avatar: string;
  id: string;
  description: string;
  role: string;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  location: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Hardcore';
  reward: string;
  objectives: string[];
};

export type Recipe = {
  name: string;
  ingredients: { item: string; amount: string }[];
  steps: string[];
  base: string;
};
