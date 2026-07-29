import { routeSkill } from "./router.js";

export function processQuestion(question = "") {
  const skill = routeSkill(question);

  return {
    skill,
    question: question.trim(),
    timestamp: Date.now()
  };
}