export function routeSkill(question = "") {
  const q = question.toLowerCase().trim();

  if (!q) return "general";

  // 1. Calculator
  if (
    /^[0-9+\-*/().%\s×÷^]+$/.test(q) ||
    q.includes("calculate") ||
    q.includes("calculator") ||
    q.includes("गणना") ||
    q.includes("कितना होगा")
  ) {
    return "calculator";
  }

  // 2. Creator — केवल तब जब user content generation माँग रहा हो
  if (
    q.includes("youtube title") ||
    q.includes("youtube description") ||
    q.includes("youtube discription") ||
    q.includes("youtube hashtags") ||
    q.includes("youtube caption") ||
    q.includes("वीडियो टाइटल") ||
    q.includes("वीडियो डिस्क्रिप्शन") ||
    q.includes("वीडियो हैशटैग")
  ) {
    return "creator";
  }

  // 3. Writing — लिखने वाले requests को Creator से पहले पकड़ें
  if (
    q.includes("paragraph") ||
    q.includes("essay") ||
    q.includes("letter") ||
    q.includes("application") ||
    q.includes("message") ||
    q.includes("story") ||
    q.includes("write") ||
    q.includes("writing") ||
    q.includes("लिखो") ||
    q.includes("लिखें") ||
    q.includes("पैराग्राफ") ||
    q.includes("निबंध") ||
    q.includes("पत्र") ||
    q.includes("कहानी") ||
    q.includes("मैसेज")
  ) {
    return "writing";
  }

  // 4. Knowledge
  if (
    q.includes("bharat ki rajdhani") ||
    q.includes("capital of india") ||
    q.includes("भारत की राजधानी") ||
    q.includes("rajasthan ki rajdhani") ||
    q.includes("rajasthan capital") ||
    q.includes("राजस्थान की राजधानी") ||
    q.includes("भारत") ||
    q.includes("india") ||
    q.includes("rajasthan") ||
    q.includes("राजस्थान")
  ) {
    return "knowledge";
  }

  // 5. Learning
  if (
    q.includes("explain") ||
    q.includes("learn") ||
    q.includes("what is") ||
    q.includes("how does") ||
    q.includes("क्या है") ||
    q.includes("समझाओ") ||
    q.includes("समझाएं") ||
    q.includes("कैसे काम करता") ||
    q.includes("कैसे काम करता है")
  ) {
    return "learning";
  }

  // 6. General
  return "general";
}