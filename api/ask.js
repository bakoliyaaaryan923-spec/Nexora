export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed"
    });
  }

  try {
    const { question, history = [] } = req.body || {};

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        reply: "Please enter a question."
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        reply: "AI backend is not configured yet."
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            item =>
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-10)
      : [];

    const input = [
      {
        role: "developer",
        content:
          "You are Nexora AI. Answer clearly, accurately and helpfully. " +
          "Use simple language when appropriate. " +
          "Do not claim to have capabilities that are unavailable."
      },

      ...safeHistory,

      {
        role: "user",
        content: question.slice(0, 12000)
      }
    ];

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization":
            `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({
          model: "gpt-4o-mini",
          input,
          max_output_tokens: 1200
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);

      return res.status(response.status).json({
        reply:
          data?.error?.message ||
          "AI service is temporarily unavailable."
      });
    }

    return res.status(200).json({
      reply:
        data?.output_text ||
        "No response received."
    });

  } catch (error) {
    console.error("Nexora backend error:", error);

    return res.status(500).json({
      reply:
        "Nexora backend error. Please try again."
    });
  }
}