import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { callPerplexity } from "./perplexity.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// Simple JSON File Storage
// ===============================

const dataPath = path.join(__dirname, "data", "scenarios.json");

// Helper to read
function readScenarios() {
  try {
    const file = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(file);
  } catch {
    return [];
  }
}

// Helper to write
function writeScenarios(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// ===============================
// SCENARIO ROUTES
// ===============================

// Get all scenarios
app.get("/api/scenarios", (req, res) => {
  const scenarios = readScenarios();
  res.json(scenarios);
});

// Save new scenario
app.post("/api/scenarios", (req, res) => {
  const scenarios = readScenarios();
  const newScenario = {
    id: Date.now(),
    ...req.body,
  };

  scenarios.push(newScenario);
  writeScenarios(scenarios);

  res.json(newScenario);
});

// Delete scenario
app.delete("/api/scenarios/:id", (req, res) => {
  const id = Number(req.params.id);
  let scenarios = readScenarios();

  scenarios = scenarios.filter((s) => s.id !== id);
  writeScenarios(scenarios);

  res.json({ success: true });
});

const PPLX_KEY = process.env.PPLX_API_KEY;

// Generate Scenario
app.post("/api/generate", async (req, res) => {
  const { role } = req.body;

  const prompt = `
    Generate a hiring scenario for "${role}".
    Format it EXACTLY like this JSON:
    {
      "title": "...",
      "description": "...",
      "skills": "skill1, skill2, skill3"
    }
  `;

  try {
    const result = await callPerplexity(
      prompt,
      "You are an expert recruiter generating hiring challenges.",
      PPLX_KEY
    );

    // Clean up markdown code blocks if present
    const cleanResult = result.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanResult);
    return res.json(parsed);
  } catch (err) {
    console.error("Generate Error:", err);
    return res.status(500).json({ error: "Failed to generate scenario" });
  }
});

// Evaluate Answer
const evaluationsPath = path.join(__dirname, "data", "evaluations.json");

function readEvaluations() {
  try {
    const file = fs.readFileSync(evaluationsPath, "utf-8");
    return JSON.parse(file);
  } catch {
    return [];
  }
}

function writeEvaluations(data) {
  fs.writeFileSync(evaluationsPath, JSON.stringify(data, null, 2));
}

// Get all evaluations
app.get("/api/evaluations", (req, res) => {
  const evaluations = readEvaluations();
  res.json(evaluations.reverse()); // Newest first
});

// Evaluate Answer & Save
app.post("/api/evaluate", async (req, res) => {
  const { scenario, answer, applicantName, scenarioTitle } = req.body;

  const prompt = `
    Scenario: ${scenario}
    Answer: ${answer}

    Return this JSON ONLY:
    {
      "score": number,
      "summary": string,
      "strengths": string[],
      "weaknesses": string[],
      "skillBreakdown": { "skillName": number }
    }
  `;

  try {
    const result = await callPerplexity(
      prompt,
      "You evaluate interview answers strictly.",
      PPLX_KEY
    );

    // Clean up markdown code blocks if present
    const cleanResult = result.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanResult);

    // Construct full evaluation record
    const fullEvaluation = {
      id: Date.now(),
      applicantName: applicantName || "Anonymous",
      scenarioTitle: scenarioTitle || "Unknown Challenge",
      timestamp: new Date().toISOString(),
      ...parsed,
      skillBreakdown: parsed.skillBreakdown || {}
    };

    // Save to file
    const evaluations = readEvaluations();
    evaluations.push(fullEvaluation);
    writeEvaluations(evaluations);

    return res.json(fullEvaluation);
  } catch (err) {
    console.error("Evaluate Error:", err);
    return res.status(500).json({ error: "Failed to evaluate answer" });
  }
});

app.listen(5000, () => console.log("Server running on 5000"));
