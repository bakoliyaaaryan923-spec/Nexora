import { registerSkill } from "./skill-builder.js";

export function registerDefaultCustomSkills() {

  registerSkill({
    id: "youtube-hooks",
    name: "YouTube Hooks",
    icon: "🎯",
    description: "Generate video opening hooks",
    keywords: [
      "youtube hook",
      "video hook",
      "hook generate",
      "हुक बनाओ",
      "वीडियो की शुरुआत"
    ],

    handler(question) {

      const topic =
        question
          .replace(/youtube hook/gi, "")
          .replace(/video hook/gi, "")
          .replace(/hook generate/gi, "")
          .replace(/हुक बनाओ/g, "")
          .replace(/वीडियो की शुरुआत/g, "")
          .trim();

      const subject =
        topic || "इस topic";

      return (
        "🎯 YouTube Hook Ideas\n\n" +

        `1. क्या आप जानते हैं ${subject} के बारे में ये खास बात?\n\n` +

        `2. अगर आप ${subject} के बारे में जानना चाहते हैं, तो यह वीडियो जरूर देखें।\n\n` +

        `3. सिर्फ कुछ मिनटों में समझिए ${subject} को आसान भाषा में।\n\n` +

        `4. ${subject} से जुड़ी ये 3 बातें शायद आपको नहीं पता होंगी।\n\n` +

        `5. वीडियो शुरू करने से पहले ${subject} के बारे में यह जरूर जान लें।`
      );
    }
  });

}