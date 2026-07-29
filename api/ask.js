export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages = [] } = req.body || {};

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured."
      });
    }

    const safeMessages = Array.isArray(messages)
      ? messages
          .filter(
            m =>
              m &&
              ["user", "assistant"].includes(m.role) &&
              typeof m.content === "string"
          )
          .slice(-20)
      : [];

    if (!safeMessages.length) {
      return res.status(400).json({
        error: "No messages provided."
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          instructions:
            "You are Nexora AI. Give clear, helpful and accurate answers. " +
            "Answer in the language the user uses. " +
            "For school-style questions, explain concepts clearly.",
          input: safeMessages,
          max_output_tokens: 1500
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Provider error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "AI provider returned an error."
      });
    }

    return res.status(200).json({
      reply:
        data?.output_text ||
        "No response was returned."
    });

  } catch (error) {
    console.error("Backend error:", error);

    return res.status(500).json({
      error: "Nexora backend error."
    });
  }
}