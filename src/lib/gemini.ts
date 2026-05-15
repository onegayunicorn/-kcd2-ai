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
    let errorMessage = `Server error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      const text = await response.text().catch(() => "");
      if (text) errorMessage = text;
    }
    console.error("Gemini API Error Context:", errorMessage);
    throw new Error(errorMessage);
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
    let errorMessage = `Server error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      const text = await response.text().catch(() => "");
      if (text) errorMessage = text;
    }
    console.error("Combat Analysis Error Context:", errorMessage);
    throw new Error(errorMessage);
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
    let errorMessage = `Server error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      const text = await response.text().catch(() => "");
      if (text) errorMessage = text;
    }
    console.error("Quest Generation Error Context:", errorMessage);
    throw new Error(errorMessage);
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
    let errorMessage = `Server error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      const text = await response.text().catch(() => "");
      if (text) errorMessage = text;
    }
    console.error("Quantum Quest Error Context:", errorMessage);
    throw new Error(errorMessage);
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
    let errorMessage = `Server error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      const text = await response.text().catch(() => "");
      if (text) errorMessage = text;
    }
    console.error("Sovereign Analysis Error Context:", errorMessage);
    throw new Error(errorMessage);
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
    let errorMessage = `Server error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      const text = await response.text().catch(() => "");
      if (text) errorMessage = text;
    }
    console.error("Alchemy Error Context:", errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
}
