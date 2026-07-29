export function processQuestion(question) {
  const q = String(question || "")
    .toLowerCase()
    .trim();

  // Calculator
  const expression = q
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-");

  if (/^[0-9+\-*/().%\s]+$/.test(expression)) {
    try {
      const answer = Function(
        `"use strict"; return (${expression})`
      )();

      if (
        typeof answer === "number" &&
        Number.isFinite(answer)
      ) {
        return {
          answer: `🧮 Answer: ${answer}`,
          skill: "calculator",
          skillName: "Calculator",
          local: true
        };
      }
    } catch {}
  }

  // Local knowledge
  if (
    q.includes("भारत की राजधानी") ||
    q.includes("capital of india")
  ) {
    return {
      answer:
        "भारत की राजधानी नई दिल्ली (New Delhi) है।\n\n" +
        "3 महत्वपूर्ण बातें:\n" +
        "1. यहाँ भारत की संसद स्थित है।\n" +
        "2. राष्ट्रपति भवन नई दिल्ली में है।\n" +
        "3. यह भारत के केंद्रीय शासन का प्रमुख केंद्र है।",
      skill: "knowledge",
      skillName: "Knowledge",
      local: true
    };
  }

  if (
    q.includes("राजस्थान की राजधानी") ||
    q.includes("capital of rajasthan")
  ) {
    return {
      answer: "राजस्थान की राजधानी जयपुर है।",
      skill: "knowledge",
      skillName: "Knowledge",
      local: true
    };
  }

  if (
    q === "hello" ||
    q === "hi" ||
    q === "hey" ||
    q === "नमस्ते"
  ) {
    return {
      answer:
        "नमस्ते! मैं Nexora AI हूँ। आप मुझसे कुछ भी पूछ सकते हैं।",
      skill: "general",
      skillName: "General",
      local: true
    };
  }

  // Unknown → Backend
  return {
    answer: null,
    skill: "backend",
    skillName: "Nexora AI",
    local: false,
    needsBackend: true
  };
}