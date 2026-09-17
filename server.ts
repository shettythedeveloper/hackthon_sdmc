import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Pre-packaged knowledge fallbacks in case API key is missing or offline
const FALLBACK_ANSWERS: Record<string, string> = {
  "vvpat": "VVPAT (Voter Verifiable Paper Audit Trail) is an independent verification printer attached to Electronic Voting Machines. When you press a button, a slip with the serial number, candidate name, and symbol appears behind a transparent glass window for 7 seconds. You can visually verify your vote before it automatically drops into a sealed ballot box.",
  "id": "You can vote using an approved official photo ID. In most jurisdictions, acceptable IDs include a National Voter ID Card (EPIC), Passport, Driver's License, Official Government Photo ID, or Aadhaar/Social Security document. Even if you don't have your physical voter card, you CAN still vote if your name is in the electoral roll and you show a valid approved government photo ID!",
  "procedure": "Inside the polling booth, there are typically 3 polling officers and a presiding officer: (1) First Officer checks your identity on the official electoral roll; (2) Second Officer marks your finger with indelible ink and obtains your signature in the register; (3) Third Officer activates the voting booth; (4) Inside the private voting compartment, you cast your confidential vote on the EVM or ballot paper.",
  "mcc": "The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission to ensure free and fair elections. It takes effect the moment election dates are announced, prohibiting ruling parties from announcing new populist schemes, using state machinery for campaigns, or making inflammatory speeches.",
  "default": "Every democratic election relies on universal adult suffrage, secret ballots, and independent election oversight. To prepare: confirm your name on the voter list beforehand, carry a valid government photo ID, know your designated polling booth, and remember that voting booths are completely private and secret."
};

// API routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/gemini/election-assistant", async (req, res) => {
  try {
    const { query, mode, stageName, voterLevel } = req.body;

    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Query is required" });
      return;
    }

    const ai = getGeminiClient();

    // If no API key configured, use intelligent rule-based civic answers
    if (!ai) {
      const lower = query.toLowerCase();
      let fallbackText = FALLBACK_ANSWERS["default"];
      if (lower.includes("vvpat") || lower.includes("paper") || lower.includes("machine") || lower.includes("evm")) {
        fallbackText = FALLBACK_ANSWERS["vvpat"];
      } else if (lower.includes("id") || lower.includes("card") || lower.includes("document") || lower.includes("bring")) {
        fallbackText = FALLBACK_ANSWERS["id"];
      } else if (lower.includes("step") || lower.includes("inside") || lower.includes("booth") || lower.includes("procedure")) {
        fallbackText = FALLBACK_ANSWERS["procedure"];
      } else if (lower.includes("code") || lower.includes("conduct") || lower.includes("rule") || lower.includes("mcc")) {
        fallbackText = FALLBACK_ANSWERS["mcc"];
      }

      res.json({
        answer: fallbackText,
        source: "Civic Knowledge Base (Built-in)",
        mode: mode || "general",
      });
      return;
    }

    const systemInstruction = `You are "CivicPulse Election Guide", an authoritative, strictly non-partisan, encouraging, and clear civic educator and election procedure specialist.
Your purpose is to help citizens understand democratic election processes, voter registration, voting procedures, electoral integrity (EVM/VVPAT/Ballot rules), timelines, and rights.
Tone guidelines:
- Non-partisan, impartial, factual, reassuring, and accessible.
- Adapt to voter knowledge level: ${voterLevel || "general citizen"} (Keep simple, break down complex jargon, avoid legalese unless defining it clearly).
- Emphasize voter rights: secrecy of ballot, right to cast vote with alternative IDs, accessibility accommodations.
- Keep responses concise (around 120-220 words), well-structured with clear bullet points where helpful.`;

    const prompt = `Context:
- User Mode: ${mode || "general"}
- Active Election Stage: ${stageName || "General Election Process"}
- Voter Knowledge Profile: ${voterLevel || "general citizen"}

User Query: "${query}"

Please provide a clear, easy-to-understand, engaging, and accurate civic guide answer:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const answer = response.text || "No response generated.";
    res.json({
      answer,
      source: "CivicPulse AI Election Navigator",
      mode: mode || "general",
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Graceful fallback on API error
    res.json({
      answer: "During elections, ensuring every eligible citizen can cast a free and secret ballot is the foundation of democracy. Make sure you check your polling station ahead of time, bring an approved photo ID, and know that your vote is 100% confidential behind the voting compartment screen.",
      source: "Civic Emergency Fallback",
      warning: "Live AI generation temporarily unavailable; standard civic guidelines shown.",
    });
  }
});

// Setup Vite or Static serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Election Awareness Platform server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
