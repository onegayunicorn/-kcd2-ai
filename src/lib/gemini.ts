export async function generateNPCResponse(
  npcName: string, 
  npcRole: string, 
  userMessage: string, 
  history: { role: string; parts: { text: string }[] }[] = [], 
  context?: { reputation: string; worldEvent: string; bias: string }
) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "generateNPCResponse",
      payload: { npcName, npcRole, userMessage, history, context },
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    let errorMessage = text;
    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      // Not JSON
    }
    console.error("Gemini API Error Context:", errorMessage);
    throw new Error(errorMessage || `Server error ${response.status}`);
  }
  return response.json();
}

export async function analyzeCombatPatterns(playerHistory: string[], enemyType: string) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "analyzeCombatPatterns",
      payload: { playerHistory, enemyType },
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    let errorMessage = text;
    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      // Not JSON
    }
    console.error("Combat Analysis Error Context:", errorMessage);
    throw new Error(errorMessage || `Server error ${response.status}`);
  }
  return response.json();
}

export async function generateQuest(location: string, difficulty: string) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "generateQuest",
      payload: { location, difficulty },
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    let errorMessage = text;
    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      // Not JSON
    }
    console.error("Quest Generation Error Context:", errorMessage);
    throw new Error(errorMessage || `Server error ${response.status}`);
  }
  return response.json();
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
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "generateQuantumQuest",
      payload: { location, baseDifficulty, suaParams },
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    let errorMessage = text;
    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      // Not JSON
    }
    console.error("Quantum Quest Error Context:", errorMessage);
    throw new Error(errorMessage || `Server error ${response.status}`);
  }
  return response.json();
}

export async function generateSovereignAnalysis(
  rep: { [key: string]: number }, 
  diff: { [key: string]: number }
) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "generateSovereignAnalysis",
      payload: { rep, diff },
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    let errorMessage = text;
    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      // Not JSON
    }
    console.error("Sovereign Analysis Error Context:", errorMessage);
    throw new Error(errorMessage || `Server error ${response.status}`);
  }
  return response.json();
}

export async function getAlchemyAssistant(potionName: string) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "getAlchemyAssistant",
      payload: { potionName },
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    let errorMessage = text;
    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      // Not JSON
    }
    console.error("Alchemy Error Context:", errorMessage);
    throw new Error(errorMessage || `Server error ${response.status}`);
  }
  return response.json();
}
