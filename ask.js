export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Only POST requests are allowed."
    });
  }

  return res.status(200).json({
    reply: "Nexora AI Backend Connected ✅"
  });
}