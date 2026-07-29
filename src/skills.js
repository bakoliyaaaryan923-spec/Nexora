import { findSkill } from "./skills-center.js";

export function getSkill(id) {
  const skill = findSkill(id);

  if (skill) {
    return skill;
  }

  return {
    id: "general",
    name: "General",
    icon: "🧠",
    description: "General help"
  };
}

export function getSkillName(id) {
  return getSkill(id).name;
}

export function getSkillIcon(id) {
  return getSkill(id).icon;
}