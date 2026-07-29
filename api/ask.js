export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { question } = req.body || {};

    if (!question) {
      return res.status(400).json({ reply: "Please enter a question." });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: question
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        reply: data?.error?.message || "OpenAI API error."
      });
    }