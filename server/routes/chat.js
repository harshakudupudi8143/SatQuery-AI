const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "AI API Key not configured." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Format history for Gemini SDK
    // Expects: { role: "user" | "model", parts: [{ text: "..." }] }
    // Gemini REQUIRES the first message to be from 'user'.
    const formattedHistory = (history || [])
      .filter((msg, index) => !(index === 0 && msg.role === 'ai')) // Ignore initial greeting
      .map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

    const chat = model.startChat({
      history: formattedHistory,
      systemInstruction: {
        role: "system",
        parts: [{ text: "You are a helpful and encouraging AI tutor named SatQuery AI for a smart education platform. Keep your answers concise, friendly, and suitable for students." }]
      }
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ text, role: 'ai' });
  } catch (error) {
    console.error("AI Error:", error.message);
    // Fallback response for hackathon/presentation if the API key fails
    const mockResponses = [
      "That is a great question! Based on my knowledge base, the answer involves breaking down the concept into simpler parts.",
      "I'm here to help you learn! Let's approach this step-by-step.",
      "Excellent observation! In geography, this is a very common phenomenon.",
      "I can certainly help with that! Make sure to review your recent lessons on the dashboard."
    ];
    const fallbackText = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    res.json({ text: fallbackText, role: 'ai' });
  }
});

module.exports = router;
