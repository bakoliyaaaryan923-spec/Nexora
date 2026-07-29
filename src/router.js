export function routeSkill(question = "") {
  const q = question.toLowerCase().trim();

  if (!q) return "general";

  // Calculator
  if (
    /^[0-9+\-*/().%\s×÷^]+$/.test(q) ||
    q.includes("calculate") ||
    q.includes("calculator") ||
    q.includes("गणना") ||
    q.includes("कितना")
  ) {
    return "calculator";
  }

  // YouTube / Creator tools
  if (
    q.includes("youtube") ||
    q.includes("video") ||
    q.includes("title") ||
    q.includes("description") ||
    q.includes("hashtag") ||
    q.includes("caption") ||
    q.includes("thumbnail")
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

  // Knowledge
  if (
    q.includes("capital") ||
    q.includes("राजधानी") ||
    q.includes("भारत") ||
    q.includes("राजस्थान") ||
    q.includes("india") ||
    q.includes("rajasthan")
  ) {
    return "knowledge";
  }

  // General
  return "general";
}