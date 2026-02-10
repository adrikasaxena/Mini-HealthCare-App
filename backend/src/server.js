import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const supportRequestSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    urgency: { type: String, required: true },
    message: { type: String, required: true },
    availability: { type: String },
    language: { type: String },
    consent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SupportRequest = mongoose.model("SupportRequest", supportRequestSchema);

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt =
  "You are a helpful healthcare NGO assistant. Provide concise, friendly answers. " +
  "You are not a doctor; avoid medical diagnosis and advise users to seek professional care. " +
  "Keep responses under 4 sentences.";

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/support", async (req, res) => {
  try {
    const {
      type,
      name,
      phone,
      location,
      urgency,
      message,
      availability,
      language,
      consent,
    } = req.body;

    if (!type || !name || !phone || !location || !urgency || !message) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const entry = await SupportRequest.create({
      type,
      name,
      phone,
      location,
      urgency,
      message,
      availability,
      language,
      consent: Boolean(consent),
    });

    res.json({ id: entry._id.toString() });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit request." });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const trimmedHistory = Array.isArray(history) ? history.slice(-6) : [];
    const input = [
      {
        role: "system",
        content: [{ type: "input_text", text: systemPrompt }],
      },
      ...trimmedHistory.map((item) => ({
        role: item.role === "assistant" ? "assistant" : "user",
        content: [{ type: "input_text", text: item.text }],
      })),
      {
        role: "user",
        content: [{ type: "input_text", text: message }],
      },
    ];

    const response = await openaiClient.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5",
      input,
      temperature: 0.3,
    });

    const reply = response.output_text || "I'm here to help. Please share more details.";
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Chatbot failed to respond." });
  }
});

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing.");
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

start();
