export const skills = {
  calculator: {
    name: "Calculator",
    description: "Calculations and percentages"
  },

  creator: {
    name: "Creator",
    description: "YouTube titles, descriptions, ideas and hashtags"
  },

  learning: {
    name: "Learning",
    description: "Simple topic explanations"
  },

  writing: {
    name: "Writing",
    description: "Writing assistance"
  },

  knowledge: {
    name: "Knowledge",
    description: "Local knowledge and common facts"
  },

  general: {
    name: "General",
    description: "General local assistant"
  }
};

export function getSkill(name) {
  return skills[name] || skills.general;
}