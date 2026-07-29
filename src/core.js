import { routeSkill } from "./router.js";
import { getSkill } from "./skills.js";
import { calculate, calculatePercentage } from "./calculator.js";
import { findKnowledge } from "./knowledge.js";
import { explainTopic } from "./learning.js";

import {
  generateTitle,
  generateDescription,
  generateIdeas,
  generateHashtags,
  generateCaption
} from "./creator.js";

export function processQuestion(question = "") {
  const text = question.trim();
  const skillName = routeSkill(text);
  const skill = getSkill(skillName);

  let answer = null;

  // Calculator
  if (skillName === "calculator") {
    const percent = text.match(
      /(\d+(?:\.\d+)?)\s*%\s*(?:of|का|की|के)\s*(\d+(?:\.\d+)?)/i
    );

    if (percent) {
      const result = calculatePercentage(percent[1], percent[2]);

      if (result !== null) {
        answer = `🧮 Answer: ${result}`;
      }
    }

    if (answer === null) {
      const result = calculate(text);

      if (result !== null) {
        answer = `🧮 Answer: ${result}`;
      }
    }
  }

  // Knowledge
  if (answer === null && skillName === "knowledge") {
    answer = findKnowledge(text);
  }

  // Learning
  if (answer === null && skillName === "learning") {
    answer = explainTopic(text);
  }

  // Creator
  if (answer === null && skillName === "creator") {
    const q = text.toLowerCase();

    if (q.includes("title") || q.includes("टाइटल")) {
      answer = generateTitle(text);
    } else if (
      q.includes("description") ||
      q.includes("discription") ||
      q.includes("डिस्क्रिप्शन")
    ) {
      answer = generateDescription(text);
    } else if (
      q.includes("hashtag") ||
      q.includes("hashtags") ||
      q.includes("हैशटैग")
    ) {
      answer = generateHashtags(text);
    } else if (
      q.includes("caption") ||
      q.includes("कैप्शन")
    ) {
      answer = generateCaption(text);
    } else {
      answer = generateIdeas(text);
    }
  }

  return {
    skill: skillName,
    skillName: skill.name,
    answer,
    question: text,
    timestamp: Date.now()
  };
}