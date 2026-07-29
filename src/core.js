/* =====================================================
   NEXORA AI — FREE LOCAL CORE v5
   No API required
===================================================== */


/* =====================================================
   HELPERS
===================================================== */

function clean(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[?!.,;:।]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


function result(answer, skill) {
  return {
    answer,
    skill,
    skillName: skill,
    local: true,
    needsBackend: false
  };
}


/* =====================================================
   CALCULATOR
===================================================== */

function calculator(question) {

  let q = String(question || "")
    .trim()
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/,/g, "");

  if (!/^[0-9+\-*/().%\s]+$/.test(q)) {
    return null;
  }

  if (!/[0-9]/.test(q)) {
    return null;
  }

  try {

    const value = Function(
      `"use strict"; return (${q})`
    )();

    if (
      typeof value === "number" &&
      Number.isFinite(value)
    ) {

      return result(
        `🧮 Answer: ${value}`,
        "Calculator"
      );

    }

  } catch {}

  return null;
}


/* =====================================================
   KNOWLEDGE DATABASE
===================================================== */

const knowledge = [

  {
    keys: [
      "भारत की राजधानी",
      "capital of india"
    ],
    answer:
      "भारत की राजधानी नई दिल्ली (New Delhi) है।\n\n" +
      "• यहाँ भारत की संसद स्थित है।\n" +
      "• राष्ट्रपति भवन नई दिल्ली में है।\n" +
      "• यह भारत की केंद्र सरकार का प्रमुख केंद्र है।"
  },

  {
    keys: [
      "राजस्थान की राजधानी",
      "capital of rajasthan"
    ],
    answer:
      "राजस्थान की राजधानी जयपुर है।"
  },

  {
    keys: [
      "भारत का संविधान कब लागू हुआ",
      "संविधान कब लागू हुआ",
      "constitution kab lagu hua",
      "constitution of india"
    ],
    answer:
      "भारत का संविधान 26 जनवरी 1950 को लागू हुआ था।\n\n" +
      "इसी कारण 26 जनवरी को भारत में गणतंत्र दिवस मनाया जाता है।"
  },

  {
    keys: [
      "भारत का स्वतंत्रता दिवस",
      "independence day of india"
    ],
    answer:
      "भारत का स्वतंत्रता दिवस 15 अगस्त को मनाया जाता है। भारत 15 अगस्त 1947 को स्वतंत्र हुआ था।"
  },

  {
    keys: [
      "भारत का गणतंत्र दिवस",
      "republic day of india"
    ],
    answer:
      "भारत का गणतंत्र दिवस 26 जनवरी को मनाया जाता है। संविधान 26 जनवरी 1950 को लागू हुआ था।"
  },

  {
    keys: [
      "भारत के प्रधानमंत्री",
      "prime minister of india"
    ],
    answer:
      "भारत के प्रधानमंत्री का पद केंद्र सरकार में एक प्रमुख संवैधानिक पद है।"
  },

  {
    keys: [
      "पानी का formula",
      "water formula",
      "chemical formula of water"
    ],
    answer:
      "पानी का chemical formula H₂O है। इसमें दो Hydrogen atoms और एक Oxygen atom होते हैं।"
  },

  {
    keys: [
      "ai क्या है",
      "ai kya hai",
      "artificial intelligence kya hai",
      "what is ai"
    ],
    answer:
      "AI यानी Artificial Intelligence ऐसी technology है जिसमें computer systems ऐसे काम कर सकते हैं जिनमें आमतौर पर human intelligence की जरूरत होती है।\n\n" +
      "उदाहरण:\n" +
      "• भाषा समझना\n" +
      "• तस्वीरों को पहचानना\n" +
      "• सवालों के जवाब देना\n" +
      "• patterns पहचानना"
  },

  {
    keys: [
      "कंप्यूटर क्या है",
      "computer kya hai",
      "what is computer"
    ],
    answer:
      "कंप्यूटर एक electronic device है जो data को process करके useful information देता है।"
  },

  {
    keys: [
      "सौर मंडल क्या है",
      "solar system kya hai",
      "what is solar system"
    ],
    answer:
      "सौर मंडल सूर्य और उसके चारों ओर घूमने वाले ग्रहों, उपग्रहों, asteroids और अन्य खगोलीय पिंडों का समूह है।"
  },

  {
    keys: [
      "पृथ्वी क्या है",
      "earth kya hai",
      "what is earth"
    ],
    answer:
      "पृथ्वी सूर्य से तीसरा ग्रह है और अभी तक ज्ञात एकमात्र ऐसा ग्रह है जहाँ जीवन मौजूद है।"
  },

  {
    keys: [
      "सूर्य क्या है",
      "sun kya hai",
      "what is sun"
    ],
    answer:
      "सूर्य हमारे सौर मंडल का तारा है। यह पृथ्वी सहित ग्रहों को प्रकाश और ऊर्जा देता है।"
  },

  {
    keys: [
      "चंद्रमा क्या है",
      "moon kya hai",
      "what is moon"
    ],
    answer:
      "चंद्रमा पृथ्वी का प्राकृतिक उपग्रह है। यह पृथ्वी के चारों ओर परिक्रमा करता है।"
  },

  {
    keys: [
      "भारत की मुद्रा",
      "currency of india"
    ],
    answer:
      "भारत की आधिकारिक मुद्रा भारतीय रुपया (₹) है।"
  },

  {
    keys: [
      "भारत की भाषा",
      "official language india"
    ],
    answer:
      "भारत में अनेक भाषाएँ बोली जाती हैं। केंद्र सरकार की आधिकारिक भाषाएँ हिंदी और अंग्रेज़ी हैं।"
  }

];


function findKnowledge(question) {

  const q = clean(question);

  for (const item of knowledge) {

    for (const key of item.keys) {

      const k = clean(key);

      if (
        q.includes(k) ||
        k.includes(q)
      ) {
        return result(
          item.answer,
          "Knowledge"
        );
      }

    }

  }

  return null;
}


/* =====================================================
   LEARNING
===================================================== */

function learning(question) {

  const q = clean(question);

  if (
    q.includes("ai क्या है") ||
    q.includes("ai kya hai")
  ) {

    return result(
      "📚 AI यानी Artificial Intelligence ऐसी technology है जिसमें computer systems information को समझने, patterns पहचानने और कुछ intelligent tasks करने में सक्षम होते हैं।\n\n" +
      "आसान उदाहरण:\n" +
      "1. Voice assistants\n" +
      "2. Image recognition\n" +
      "3. Translation\n" +
      "4. AI chatbots",
      "Learning"
    );

  }

  if (
    q.includes("आसान भाषा में समझाओ") ||
    q.includes("explain")
  ) {

    return result(
      "📚 इस topic को आसान भाषा में समझने के लिए इसे छोटे parts में बाँटना सबसे अच्छा तरीका है।\n\n" +
      "पहले definition समझें, फिर examples देखें और अंत में उसका practical use समझें।",
      "Learning"
    );

  }

  return null;
}


/* =====================================================
   WRITING
===================================================== */

function writing(question) {

  const q = clean(question);

  if (
    q.includes("paragraph") ||
    q.includes("पैराग्राफ") ||
    q.includes("अनुच्छेद")
  ) {

    let topic = question
      .replace(/paragraph/ig, "")
      .replace(/पैराग्राफ/ig, "")
      .replace(/लिखो/g, "")
      .trim();

    if (!topic) {
      topic = "AI";
    }

    return result(
      `✍️ ${topic} पर Paragraph\n\n` +
      `${topic} आज के समय में एक महत्वपूर्ण विषय है। इसका प्रभाव हमारे दैनिक जीवन, शिक्षा और technology पर दिखाई देता है। सही जानकारी और समझ के साथ हम ${topic} का बेहतर उपयोग कर सकते हैं।`,
      "Writing"
    );

  }


  if (
    q.includes("caption") ||
    q.includes("कैप्शन")
  ) {

    return result(
      "✍️ Caption\n\n" +
      "✨ आज कुछ नया सीखें, आगे बढ़ें और technology का smart तरीके से उपयोग करें!\n\n" +
      "#NexoraAI #Technology #AI",
      "Writing"
    );

  }


  if (
    q.includes("email") ||
    q.includes("ईमेल")
  ) {

    return result(
      "✉️ Email Draft\n\n" +
      "नमस्कार,\n\n" +
      "मैं इस विषय के संबंध में आवश्यक जानकारी साझा करना चाहता/चाहती हूँ। कृपया इसे देखें और आवश्यक कार्रवाई करें।\n\n" +
      "धन्यवाद।",
      "Writing"
    );

  }

  return null;
}


/* =====================================================
   CREATOR
===================================================== */

function creator(question) {

  const q = clean(question);

  if (
    q.includes("youtube") &&
    (
      q.includes("title") ||
      q.includes("टाइटल")
    )
  ) {

    return result(
      "🎬 YouTube Title Ideas\n\n" +
      "1. AI क्या है? पूरी जानकारी आसान भाषा में\n" +
      "2. AI कैसे काम करता है? आसान तरीके से समझें\n" +
      "3. AI की 5 जरूरी बातें जो आपको पता होनी चाहिए\n" +
      "4. AI सीखने की शुरुआत कैसे करें?\n" +
      "5. AI का इस्तेमाल कहाँ-कहाँ होता है?",
      "Creator"
    );

  }


  if (
    q.includes("description") ||
    q.includes("discription") ||
    q.includes("डिस्क्रिप्शन")
  ) {

    return result(
      "🎬 YouTube Description\n\n" +
      "इस वीडियो में हम इस topic को आसान भाषा में समझेंगे। वीडियो पसंद आए तो Like, Share और Subscribe जरूर करें।\n\n" +
      "#NexoraAI #AI #Hindi",
      "Creator"
    );

  }


  if (
    q.includes("youtube") &&
    (
      q.includes("tags") ||
      q.includes("tag")
    )
  ) {

    return result(
      "🎬 Suggested Tags\n\n" +
      "#AI #ArtificialIntelligence #Technology #NexoraAI #Hindi #AITools",
      "Creator"
    );

  }


  if (
    q.includes("hook") ||
    q.includes("हुक")
  ) {

    return result(
      "🎬 YouTube Hook\n\n" +
      "क्या आप जानते हैं कि AI आपकी रोजमर्रा की जिंदगी को कितनी तेजी से बदल रहा है? इस वीडियो में जानिए इसकी सबसे जरूरी बातें!",
      "Creator"
    );

  }

  return null;
}


/* =====================================================
   TRANSLATION
===================================================== */

function translation(question) {

  const q = clean(question);

  if (
    q.startsWith("translate") ||
    q.startsWith("अनुवाद") ||
    q.includes("हिंदी में translate")
  ) {

    return result(
      "🌐 Translation tool अभी Free Local Mode में सीमित है।\n\n" +
      "आप छोटा common phrase दें तो मैं उपलब्ध local translations में मदद कर सकता हूँ।",
      "Translation"
    );

  }

  return null;
}


/* =====================================================
   GENERAL
===================================================== */

function general(question) {

  const q = clean(question);

  if (
    q === "hello" ||
    q === "hi" ||
    q === "hey" ||
    q === "नमस्ते" ||
    q === "नमस्कार"
  ) {

    return result(
      "नमस्ते! 👋 मैं Nexora AI हूँ।\n\n" +
      "आप calculation, knowledge, learning, writing और creator tools इस्तेमाल कर सकते हैं।",
      "General"
    );

  }


  if (
    q.includes("nexora ai kya hai") ||
    q.includes("nexora ai क्या है")
  ) {

    return result(
      "Nexora AI एक modular browser-based AI workspace है जिसमें अलग-अलग local skills एक ही जगह इस्तेमाल किए जा सकते हैं।",
      "General"
    );

  }


  if (
    q.includes("help") ||
    q.includes("मदद")
  ) {

    return result(
      "🧠 Nexora AI में आप ये काम कर सकते हैं:\n\n" +
      "🧮 Calculation\n" +
      "🌍 Knowledge\n" +
      "📚 Learning\n" +
      "✍️ Writing\n" +
      "🎬 YouTube Creator tools\n" +
      "🌐 Basic translation",
      "General"
    );

  }

  return null;
}


/* =====================================================
   MAIN ENGINE
===================================================== */

export function processQuestion(question) {

  const text =
    String(question || "").trim();

  if (!text) {

    return result(
      "कृपया कोई सवाल लिखें।",
      "General"
    );

  }


  /* 1 — Calculator */

  const calc =
    calculator(text);

  if (calc) {
    return calc;
  }


  /* 2 — Knowledge */

  const know =
    findKnowledge(text);

  if (know) {
    return know;
  }


  /* 3 — Learning */

  const learn =
    learning(text);

  if (learn) {
    return learn;
  }


  /* 4 — Writing */

  const write =
    writing(text);

  if (write) {
    return write;
  }


  /* 5 — Creator */

  const create =
    creator(text);

  if (create) {
    return create;
  }


  /* 6 — Translation */

  const translate =
    translation(text);

  if (translate) {
    return translate;
  }


  /* 7 — General */

  const generalAnswer =
    general(text);

  if (generalAnswer) {
    return generalAnswer;
  }


  /* =================================================
     UNKNOWN QUESTION
     
     Free Local Mode में fake answer नहीं देंगे।
     Existing frontend इसे backend पर भेज सकता है।
  ================================================= */

  return {
    answer:
      "इस सवाल का local answer अभी उपलब्ध नहीं है।\n\n" +
      "आप Knowledge, Learning, Writing, Creator या Calculator feature आज़मा सकते हैं।",

    skill:
      "General",

    skillName:
      "General",

    local:
      true,

    needsBackend:
      false
  };

}


/* =====================================================
   SKILL LIST
===================================================== */

export function getLocalSkills() {

  return [

    {
      id: "calculator",
      name: "Calculator",
      description: "Math and calculations"
    },

    {
      id: "knowledge",
      name: "Knowledge",
      description: "Local knowledge"
    },

    {
      id: "learning",
      name: "Learning",
      description: "Explain topics"
    },

    {
      id: "writing",
      name: "Writing",
      description: "Create text"
    },

    {
      id: "creator",
      name: "Creator",
      description: "Titles, descriptions and ideas"
    },

    {
      id: "translation",
      name: "Translation",
      description: "Basic translation"
    },

    {
      id: "general",
      name: "General",
      description: "General help"
    }

  ];

}