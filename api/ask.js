export default async function handler(req, res) {
// Allow only POST requests
if (req.method !== "POST") {
return res.status(405).json({
reply: "Method not allowed."
});
}

try {
// Check API key
if (!process.env.OPENAI_API_KEY) {
return res.status(500).json({
reply: "OPENAI_API_KEY is not configured on the server."
});
}

const body = req.body || {};

const question =
  typeof body.question === "string"
    ? body.question.trim()
    : "";

const history =
  Array.isArray(body.history)
    ? body.history
    : [];

if (!question) {
  return res.status(400).json({
    reply: "Please enter a question."
  });
}

// Keep the request reasonably small
const safeHistory = history
  .filter(item =>
    item &&
    typeof item.role === "string" &&
    typeof item.content === "string"
  )
  .slice(-12)
  .map(item => ({
    role:
      item.role === "assistant"
        ? "assistant"
        : "user",
    content: item.content.slice(0, 6000)
  }));

// Give the AI a clear role
const input = [
  {
    role: "developer",
    content:
      "You are Nexora AI, a helpful, accurate and friendly AI assistant. " +
      "Answer clearly and directly. " +
      "For educational questions, explain concepts in simple language. " +
      "Do not pretend to have information you do not know. " +
      "If the user asks for current information that requires live data, " +
      "say that live search is needed."
  },

  ...safeHistory,

  {
    role: "user",
    content: question.slice(0, 12000)
  }
];

// Abort slow requests
const controller = new AbortController();

const timeout = setTimeout(() => {
  controller.abort();
}, 30000);

let response;

try {
  response = await fetch(
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
        input: input,
        max_output_tokens: 1200
      }),

      signal: controller.signal
    }
  );
} finally {
  clearTimeout(timeout);
}

let data = {};

try {
  data = await response.json();
} catch {
  data = {};
}

// Handle API errors clearly
if (!response.ok) {

  const apiMessage =
    data?.error?.message ||
    "The AI service returned an error.";

  if (response.status === 401) {
    return res.status(502).json({
      reply:
        "Nexora AI could not authenticate with the AI service. " +
        "Please check the server API key."
    });
  }

  if (response.status === 429) {
    return res.status(503).json({
      reply:
        "The AI service is currently unavailable because " +
        "the API request limit or available API quota has been reached."
    });
  }

  return res.status(502).json({
    reply: apiMessage
  });
}

// Responses API normally exposes the generated text here
const answer =
  data?.output_text ||
  data?.output
    ?.flatMap(item => item?.content || [])
    ?.map(item => item?.text || "")
    ?.filter(Boolean)
    ?.join("\n") ||
  "";

if (!answer.trim()) {
  return res.status(502).json({
    reply: "The AI returned an empty response."
  });
}

return res.status(200).json({
  reply: answer.trim()
});

} catch (error) {

if (error?.name === "AbortError") {
  return res.status(504).json({
    reply:
      "Nexora AI took too long to respond. Please try again."
  });
}

console.error("Nexora API error:", error);

return res.status(500).json({
  reply:
    "Nexora AI encountered a server error. Please try again."
});

}
}