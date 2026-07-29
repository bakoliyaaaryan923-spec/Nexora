export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "यह request method supported नहीं है।"
    });
  }

  try {
    const { messages, question } = req.body || {};

    // पुराने frontend और नए frontend — दोनों को support करेगा
    const userQuestion =
      question ||
      (Array.isArray(messages)
        ? messages
            .filter(m => m?.role === "user")
            .map(m => m?.content)
            .filter(Boolean)
            .join("\n")
        : "");

    if (!userQuestion.trim()) {
      return res.status(400).json({
        reply: "कृपया कोई सवाल लिखें।"
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        reply: "AI service अभी configure नहीं हुई है।"
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },

        body: JSON.stringify({
          model: "gpt-4o-mini",

          instructions:
            "You are Nexora AI. Answer clearly and helpfully. " +
            "For Hindi questions, answer in simple Hindi. " +
            "Do not claim that you browsed the web unless web access was actually used.",

          input: userQuestion
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);

      return res.status(response.status).json({
        reply:
          "AI service अभी जवाब नहीं दे पा रही है।"
      });
    }

    const answer =
      data?.output_text ||
      data?.output
        ?.flatMap(item => item?.content || [])
        ?.map(item => item?.text)
        ?.filter(Boolean)
        ?.join("\n") ||
      "";

    if (!answer) {
      return res.status(500).json({
        reply: "AI ने कोई जवाब नहीं दिया।"
      });
    }

    return res.status(200).json({
      reply: answer
    });

  } catch (error) {

    console.error("Nexora backend error:", error);

    return res.status(500).json({
      reply:
        "अभी AI से connection नहीं हो पाया।"
    });
  }
}