const customSkills = [];

export function registerSkill({
  id,
  name,
  icon = "⚡",
  description = "",
  keywords = [],
  handler
}) {
  if (!id || !name || typeof handler !== "function") {
    return false;
  }

  if (customSkills.some(skill => skill.id === id)) {
    return false;
  }

  customSkills.push({
    id,
    name,
    icon,
    description,
    keywords,
    handler
  });

  return true;
}

export function getCustomSkills() {
  return [...customSkills];
}

export function findCustomSkill(question = "") {
  const q = question.toLowerCase();

  return customSkills.find(skill =>
    skill.keywords.some(keyword =>
      q.includes(keyword.toLowerCase())
    )
  ) || null;
}

export function runCustomSkill(skill, question) {
  if (!skill || typeof skill.handler !== "function") {
    return null;
  }

  try {
    return skill.handler(question);
  } catch (error) {
    console.error("Custom skill error:", error);
    return "इस skill को चलाने में समस्या आई।";
  }
}