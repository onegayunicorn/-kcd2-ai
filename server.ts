import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import * as geminiService from "./src/server/gemini-service";

async function startServer() {
  console.log("--- Sovereign Unified Architecture Boot Sequence ---");
  
  // Debug environment
  const apiKeys = Object.keys(process.env).filter(key => 
    key.includes("API_KEY") || key.includes("GEMINI") || key.includes("GOOGLE")
  );
  
  console.log("Detected API Keys in environment:");
  if (apiKeys.length === 0) {
    console.log("  [CRITICAL] No relevant API keys found in process.env");
  } else {
    apiKeys.forEach(k => {
      const val = process.env[k] || "";
      console.log(`  - ${k}: ${val ? (val.length > 8 ? val.substring(0, 4) + "..." : "[EXISTS]") : "EMPTY"}`);
    });
  }

  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/gemini", async (req, res) => {
    const { action, payload } = req.body;

    try {
      let result;
      switch (action) {
        case "generateNPCResponse":
          result = await geminiService.generateNPCResponse(
            payload.npcName,
            payload.npcRole,
            payload.userMessage,
            payload.history,
            payload.context
          );
          break;
        case "analyzeCombatPatterns":
          result = await geminiService.analyzeCombatPatterns(
            payload.playerHistory,
            payload.enemyType
          );
          break;
        case "generateQuest":
          result = await geminiService.generateQuest(
            payload.location,
            payload.difficulty
          );
          break;
        case "generateQuantumQuest":
          result = await geminiService.generateQuantumQuest(
            payload.location,
            payload.baseDifficulty,
            payload.suaParams
          );
          break;
        case "generateSovereignAnalysis":
          result = await geminiService.generateSovereignAnalysis(
            payload.rep,
            payload.diff
          );
          break;
        case "getAlchemyAssistant":
          result = await geminiService.getAlchemyAssistant(
            payload.potionName
          );
          break;
        default:
          return res.status(400).json({ error: "Invalid action" });
      }
      res.json(result);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
