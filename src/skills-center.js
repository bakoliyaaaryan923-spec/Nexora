const skills = [
  {
    id: "calculator",
    name: "Calculator",
    icon: "🧮",
    description: "Math and calculations"
  },
  {
    id: "knowledge",
    name: "Knowledge",
    icon: "🌍",
    description: "Local knowledge"
  },
  {
    id: "learning",
    name: "Learning",
    icon: "📚",
    description: "Explain topics"
  },
  {
    id: "writing",
    name: "Writing",
    icon: "✍️",
    description: "Create text"
  },
  {
    id: "creator",
    name: "Creator",
    icon: "🎬",
    description: "Titles, descriptions and ideas"
  },
  {
    id: "general",
    name: "General",
    icon: "🧠",
    description: "General help"
  }
];

export function getAllSkills() {
  return [...skills];
}

export function findSkill(id) {
  return skills.find(skill => skill.id === id) || null;
}

export function addSkill(skill) {
  if (!skill || !skill.id || !skill.name) {
    return false;
  }

  if (skills.some(item => item.id === skill.id)) {
    return false;
  }

  skills.push({
    id: skill.id,
    name: skill.name,
    icon: skill.icon || "⚡",
    description: skill.description || ""
  });

  return true;
}