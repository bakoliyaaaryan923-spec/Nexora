export function routeSkill(question = "") {
  const q = question.toLowerCase().trim();

  if (!q) return "general";

  // Calculator
  if (
    /^[0-9+\-*/().%\s×÷^]+$/.test(q) ||
    q.includes("calculate") ||
    q.includes("calculator") ||
    q.includes("गणना")
  ) {
    return "calculator";
  }

  // Knowledge — इसे Learning से पहले रखें
  if (
    q.includes("bharat ki rajdhani") ||
    q.includes("capital of india") ||
    q.includes("भारत की राजधानी") ||
    q.includes("rajasthan ki rajdhani") ||
    q.includes("rajasthan capital") ||
    q.includes("राजस्थान की राजधानी") ||
    q.includes("india") ||
    q.includes("भारत") ||
    q.includes("rajasthan") ||
    q.includes("राजस्थान")
  ) {
    return "knowledge";
  }

  // YouTube / Creator
  if (
    q.includes("youtube") ||
    q.includes("video") ||
    q.includes("title") ||
    q.includes("description") ||
    q.includes("discription") ||
    q.includes("hashtag") ||
    q.includes("caption") ||
    q.includes("thumbnail") ||
    q.includes("टाइटल") ||
    q.includes("डिस्क्रिप्शन")
  ) {
    return "creator";
  }

  // Learning
  if (
    q.includes("explain") ||
    q.includes("learn") ||
    q.includes("समझाओ") ||
    q.includes("समझाएं") ||
    q.includes("क्या है") ||
    q.includes("कैसे काम")
  ) {
    return "learning";
  }

  // Writing
  if (
    q.includes("write") ||
    q.includes("writing") ||
    q.includes("लिखो") ||
    q.includes("लिखें") ||
    q.includes("paragraph") ||
    q.includes("story")
  ) {
    return "writing";
  }

  return "general";
}