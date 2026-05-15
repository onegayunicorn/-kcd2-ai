import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKeys = [
      process.env.GEMINI_API_KEY,
      process.env.GOOGLE_GENAI_API_KEY,
      process.env.GOOGLE_API_KEY,
      process.env.API_KEY,
      process.env.AISTUDIO_API_KEY
    ];
    
    let apiKey = apiKeys.find(key => key && key.length > 5);
    
    if (!apiKey) {
      // Last ditch: check all env vars for something that looks like an API key
      const possibleKey = Object.entries(process.env).find(([k, v]) => 
        (k.includes("API") || k.includes("KEY") || k.includes("GOOGLE") || k.includes("GEMINI")) && 
        v && v.length > 20
      );
      if (possibleKey) apiKey = possibleKey[1];
    }

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. To fix this, please Open 'Settings' -> 'Secrets' and add a new secret with the name 'GEMINI_API_KEY' and your Google AI Studio API key as the value.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    }) as any;
  }
  return aiInstance;
}

export async function generateNPCResponse(
  npcName: string, 
  npcRole: string, 
  userMessage: string, 
  history: any[] = [], 
  context?: { reputation: string; worldEvent: string; bias: string }
) {
  const ai: any = getAI();
  
  const systemInstruction = `You are ${npcName}, a complex character in Kingdom Come: Deliverance 2. 
  Your role is: ${npcRole}. 
  The time is 1403, and the setting is medieval Bohemia. 
  
  CURRENT CONTEXT:
  - Your reputation with the player is: ${context?.reputation || 'Neutral'}
  - Current World Event: ${context?.worldEvent || 'Peaceful times'}
  - Your personal disposition: ${context?.bias || 'Pragmatic'}

  Your speech MUST reflect these factors. If reputation is low, be dismissive or hostile. If a plague is happening, mention the suffering.
  Be grounded in the setting: use appropriate formal/informal language, reference 'Jesus Christ be praised' or 'God be with you' when appropriate. 
  Do not use modern slang. Keep responses concise and immersive.`;

  const contents = [...history, { role: 'user', parts: [{ text: userMessage }] }];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      systemInstruction,
      temperature: 0.8,
    },
  });

  return response.text || "I have no words for you right now.";
}

export async function analyzeCombatPatterns(playerHistory: string[], enemyType: string) {
  const ai: any = getAI();
  
  const prompt = `You are the Combat AI for a '${enemyType}' in Kingdom Come: Deliverance 2.
  The player has performed the following actions in the last few encounters:
  ${playerHistory.join(', ')}
  
  Analyze these patterns and determine how you will adapt to counter the player.
  
  Return as JSON:
  {
    "analysis": "Brief analysis of player's weaknesses",
    "adaptation_strategy": "How you will change your behavior (e.g. more feints, master strikes)",
    "counter_moves": ["Specific counter 1", "Specific counter 2"],
    "aggression_level": "Low/Medium/High",
    "threat_rating": "0-100"
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function generateQuest(location: string, difficulty: string) {
  const ai: any = getAI();
  
  const prompt = `Generate a procedural side quest for Kingdom Come: Deliverance 2.
  Location: ${location}
  Difficulty: ${difficulty}
  
  STORY TYPES: Investigate rumors, escort NPCs, fetch items, defend locations, solve local disputes.
  THEMES: Historical accuracy, medieval grit, moral ambiguity.

  Return the response as a JSON object with the following structure:
  {
    "title": "Quest Title",
    "description": "Engaging medieval quest description",
    "location": "${location}",
    "difficulty": "${difficulty}",
    "reward": "e.g. 50 Groschen and a Hunter's Bow",
    "objectives": ["Step 1...", "Step 2..."]
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function generateQuantumQuest(
  location: string, 
  baseDifficulty: string, 
  suaParams: { 
    globalDifficulty: number; 
    playerHonor: number;
    playerBrutality: number;
  }
) {
  const ai: any = getAI();
  
  const prompt = `You are the Lead Quest Designer for Kingdom Come: Deliverance 2.
  Synthesize a QUANTUM quest directive that adapts to the player's CURRENT SOVEREIGN STATE.
  
  WORLD PARAMETERS:
  - Location: ${location}
  - Base Challenge: ${baseDifficulty}
  - Adaptive Dynamic Intensity: ${suaParams.globalDifficulty.toFixed(2)}x
  - Player Honor (0-100): ${suaParams.playerHonor}
  - Player Brutality (0-100): ${suaParams.playerBrutality}
  
  NARRATIVE GUIDELINE:
  - If Honor is high: Offer noble, chivalric tasks.
  - If Brutality is high: Offer "wetwork", extortion, or mercenary tasks.
  - If Adaptive Intensity is high (>1.2): Make objectives significantly more complex and combat-heavy.
  
  Return the response as a JSON object:
  {
    "title": "Quest Title",
    "description": "Narrative intro reflecting the player's reputation and the world intensity",
    "reward": "Balanced reward for intensity level",
    "location": "${location}",
    "intensity_signature": "${suaParams.globalDifficulty.toFixed(2)}",
    "objectives": ["Phase 1: Dynamic Objective", "Phase 2: Complex Interaction", "Phase 3: High Stakes Resolution"],
    "quantum_logic_note": "A internal note about why this quest was chosen for the player's current honor/brutality mix"
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function generateSovereignAnalysis(
  rep: { [key: string]: number }, 
  diff: { [key: string]: number }
) {
  const ai: any = getAI();
  
  const prompt = `You are the Sovereign AI Command for Kingdom Come: Deliverance 2.
  Perform a high-level strategic analysis of the player's current impact on Bohemia.
  
  CURRENT DATA VECTORS:
  - Reputation: ${JSON.stringify(rep)}
  - Adaptive Difficulty Matrix: ${JSON.stringify(diff)}
  
  Provide a concise, authoritative assessment of the player's 'Legacy'. 
  If Honor is high, call them a 'Sovereign Paragon'. If Brutality is high, call them a 'Scourge of the Realm'.
  Mention how the world's difficulty/resistance is adapting to their prowess.
  
  Final response MUST be a short paragraph under 60 words.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      temperature: 0.7,
    },
  });

  return response.text || "Analysis pending... System recalibrating.";
}

export async function getAlchemyAssistant(potionName: string) {
  const ai: any = getAI();
  
  const prompt = `Provide the alchemy recipe and brewing steps for a '${potionName}' potion in Kingdom Come: Deliverance 2.
  Ensure it follows the in-game mechanics (base, herbs, grinding, boiling, distillation).
  
  Return as JSON:
  {
    "name": "${potionName}",
    "ingredients": [{ "item": "string", "amount": "string" }],
    "steps": ["Step 1...", "Step 2..."],
    "base": "Water/Wine/Oil/Spirits"
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}

