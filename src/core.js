import { routeSkill } from "./router.js";
import { getSkill } from "./skills.js";
import { calculate, calculatePercentage } from "./calculator.js";
import { findKnowledge } from "./knowledge.js";
import { explainTopic } from "./learning.js";
import { generateWriting } from "./writing.js";
import { generalAnswer } from "./general.js";

import {
  generateTitle,
  generateDescription,
  generateIdeas,
  generateHashtags,
  generateCaption
} from "./creator.js";

import {
  findCustomSkill,
  runCustomSkill
} from "./skill-builder.js";


export function processQuestion(question = "") {

  const text = question.trim();

  if (!text) {
    return {
      skill: "general",
      skillName: "General",
      answer: "कृपया कोई सवाल लिखें।",
      question: text,
      timestamp: Date.now()
    };
  }


  /*
   * CUSTOM SKILLS
   * इन्हें पहले check किया जाता है,
   * ताकि future में नए modules आसानी से जुड़ सकें।
   */

  const customSkill =
    findCustomSkill(text);

  if (customSkill) {

    const customAnswer =
      runCustomSkill(
        customSkill,
        text
      );

    if (customAnswer !== null) {

      return {
        skill: customSkill.id,
        skillName:
          `${customSkill.icon} ${customSkill.name}`,
        answer: customAnswer,
        question: text,
        timestamp: Date.now()
      };

    }
  }


  /*
   * NORMAL SKILL ROUTER
   */

  const skillName =
    routeSkill(text);

  const skill =
    getSkill(skillName);


  let answer = null;


  /*
   * CALCULATOR
   */

  if (skillName === "calculator") {

    const percent =
      text.match(
        /(\d+(?:\.\d+)?)\s*%\s*(?:of|का|की|के)\s*(\d+(?:\.\d+)?)/i
      );


    if (percent) {

      const result =
        calculatePercentage(
          percent[1],
          percent[2]
        );

      if (result !== null) {
        answer =
          `🧮 Answer: ${result}`;
      }
    }


    if (answer === null) {

      const result =
        calculate(text);

      if (result !== null) {
        answer =
          `🧮 Answer: ${result}`;
      }
    }
  }


  /*
   * KNOWLEDGE
   */

  if (
    answer === null &&
    skillName === "knowledge"
  ) {

    answer =
      findKnowledge(text);
  }


  /*
   * LEARNING
   */

  if (
    answer === null &&
    skillName === "learning"
  ) {

    answer =
      explainTopic(text);
  }


  /*
   * CREATOR
   */

  if (
    answer === null &&
    skillName === "creator"
  ) {

    const q =
      text.toLowerCase();


    if (
      q.includes("title") ||
      q.includes("टाइटल")
    ) {

      answer =
        generateTitle(text);

    }

    else if (
      q.includes("description") ||
      q.includes("discription") ||
      q.includes("डिस्क्रिप्शन")
    ) {

      answer =
        generateDescription(text);

    }

    else if (
      q.includes("hashtag") ||
      q.includes("hashtags") ||
      q.includes("हैशटैग")
    ) {

      answer =
        generateHashtags(text);

    }

    else if (
      q.includes("caption") ||
      q.includes("कैप्शन")
    ) {

      answer =
        generateCaption(text);

    }

    else {

      answer =
        generateIdeas(text);
    }
  }


  /*
   * WRITING
   */

  if (
    answer === null &&
    skillName === "writing"
  ) {

    answer =
      generateWriting(text);
  }


  /*
   * GENERAL
   */

  if (
    answer === null &&
    skillName === "general"
  ) {

    answer =
      generalAnswer(text);
  }


  /*
   * FINAL FALLBACK
   */

  if (answer === null) {

    answer =
      generalAnswer(text);
  }


  return {

    skill: skillName,

    skillName:
      skill.name,

    answer,

    question: text,

    timestamp: Date.now()

  };
}