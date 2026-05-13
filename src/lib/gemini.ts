import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateNPCResponse(
  npcName: string, 
  npcRole: string, 
  userMessage: string, 
  history: { role: string; text: string }[] = [], 
  context?: { reputation: string; worldEvent: string; bias: string }
) {
  const model = "gemini-3-flash-preview";
  
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
    model,
    contents,
    config: {
      systemInstruction,
      temperature: 0.8,
    },
  });

  return response.text || "I have no words for you right now.";
}

export async function analyzeCombatPatterns(playerHistory: string[], enemyType: string) {
  const model = "gemini-3-flash-preview";
  
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
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function generateQuest(location: string, difficulty: string) {
  const model = "gemini-3-flash-preview";
  
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
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function getAlchemyAssistant(potionName: string) {
  const model = "gemini-3-flash-preview";
  
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
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}
