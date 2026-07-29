// Nexora AI - Local Core Test

function makeResult(answer, skill = "General") {
  return {
    answer,
    skill,
    skillName: skill,
    local: true,
    needsBackend: false
  };
}

function calculate(text) {
  const expression = text
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .trim();

  if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
    return null;
  }

  try {
    const answer = Function(
      `"use strict"; return (${expression})`
    )();

    if (Number.isFinite(answer)) {
      return makeResult(
        `🧮 Answer: ${answer}`,
        "Calculator"
      );
    }
  } catch {}

  return null;
}

export function processQuestion(question) {

  const text = String(question || "").trim();
  const lower = text.toLowerCase();

  if (!text) {
    return makeResult(
      "कृपया कोई सवाल लिखें।",
      "General"
    );
  }

  // Calculator
  const calculation = calculate(text);

  if (calculation) {
    return calculation;
  }

  // India capital
  if (
    lower.includes("भारत की राजधानी") ||
    lower.includes("capital of india")
  ) {
    return makeResult(
      "भारत की राजधानी नई दिल्ली (New Delhi) है।",
      "Knowledge"
    );
  }

  // Constitution
  if (
    lower.includes("भारत का संविधान कब लागू हुआ") ||
    lower.includes("संविधान कब लागू हुआ") ||
    lower.includes("constitution of india")
  ) {
    return makeResult(
      "भारत का संविधान 26 जनवरी 1950 को लागू हुआ था। इसी कारण 26 जनवरी को भारत में गणतंत्र दिवस मनाया जाता है।",
      "Knowledge"
    );
  }

  // AI
  if (
    lower.includes("ai क्या है") ||
    lower.includes("ai kya hai") ||
    lower.includes("what is ai")
  ) {
    return makeResult(
      "AI यानी Artificial Intelligence ऐसी technology है जिसमें computer systems ऐसे काम कर सकते हैं जिनमें आमतौर पर human intelligence की जरूरत होती है।\n\nउदाहरण:\n• भाषा समझना\n• तस्वीरों को पहचानना\n• सवालों के जवाब देना\n• patterns पहचानना",
      "Learning"
    );
  }

  // Hello
  if (
    lower === "hello" ||
    lower === "hi" ||
    lower === "hey" ||
    lower === "नमस्ते"
  ) {
    return makeResult(
      "नमस्ते! 👋 मैं Nexora AI हूँ।",
      "General"
    );
  }

  // Writing
  if (
    lower.includes("paragraph") ||
    lower.includes("पैराग्राफ")
  ) {
    return makeResult(
      "AI आज की technology का एक महत्वपूर्ण हिस्सा है। यह computers को information समझने, patterns पहचानने और कई intelligent tasks करने में मदद करता है। इसका उपयोग education, communication, business और कई अन्य क्षेत्रों में किया जा रहा है।",
      "Writing"
    );
  }

  // Creator
  if (
    lower.includes("youtube") &&
    (
      lower.includes("title") ||
      lower.includes("टाइटल")
    )
  ) {
    return makeResult(
      "🎬 YouTube Title Ideas\n\n1. AI क्या है? आसान भाषा में समझें\n2. AI कैसे काम करता है?\n3. AI की 5 जरूरी बातें\n4. AI का इस्तेमाल कैसे करें?\n5. AI का Future क्या है?",
      "Creator"
    );
  }

  // Fallback
  return makeResult(
    "मैंने आपका सवाल समझा, लेकिन उसका local answer अभी उपलब्ध नहीं है।",
    "General"
  );
}