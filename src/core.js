/* =========================
   NEXORA AI CORE v4
   Local skills + Backend routing
========================= */


/* =========================
   LOCAL KNOWLEDGE
========================= */

const knowledge = [

  {
    keys: [
      "भारत की राजधानी",
      "भारत का राजधानी",
      "capital of india"
    ],
    answer:
      "भारत की राजधानी नई दिल्ली (New Delhi) है।\n\n" +
      "3 महत्वपूर्ण बातें:\n" +
      "1. यहाँ भारत की संसद स्थित है।\n" +
      "2. राष्ट्रपति भवन नई दिल्ली में है।\n" +
      "3. यह भारत के केंद्रीय शासन का प्रमुख केंद्र है।"
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
      "ai क्या है",
      "ai kya hai",
      "artificial intelligence kya hai"
    ],
    answer:
      "AI यानी Artificial Intelligence ऐसी technology है जिसमें computer systems ऐसे काम कर सकते हैं जिनमें आमतौर पर human intelligence की जरूरत होती है।\n\n" +
      "उदाहरण:\n" +
      "• भाषा समझना\n" +
      "• तस्वीरों में चीजें पहचानना\n" +
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
      "पानी का formula",
      "water formula",
      "h2o"
    ],
    answer:
      "पानी का chemical formula H₂O है। इसमें दो Hydrogen atoms और एक Oxygen atom होता है।"
  },

  {
    keys: [
      "सौर मंडल क्या है",
      "solar system kya hai",
      "solar system"
    ],
    answer:
      "सौर मंडल सूर्य और उसके चारों ओर घूमने वाले ग्रहों, उपग्रहों, asteroids और अन्य खगोलीय पिंडों का समूह है।"
  },

  {
    keys: [
      "संविधान कब लागू हुआ",
      "भारत का संविधान कब लागू हुआ",
      "constitution kab lagu hua",
      "constitution of india"
    ],
    answer:
      "भारत का संविधान 26 जनवरी 1950 को लागू हुआ था। इसी कारण हर साल 26 जनवरी को गणतंत्र दिवस मनाया जाता है।"
  }

];


/* =========================
   TEXT NORMALIZER
========================= */

function normalize(text){

  return String(text || "")
    .toLowerCase()
    .replace(/[?!.,।,;:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

}


/* =========================
   FIND LOCAL KNOWLEDGE
========================= */

function findKnowledge(question){

  const q =
    normalize(question);


  for(const item of knowledge){

    for(const key of item.keys){

      const k =
        normalize(key);


      if(
        q.includes(k) ||
        k.includes(q)
      ){

        return item.answer;

      }

    }

  }


  return null;

}


/* =========================
   CALCULATOR
========================= */

function calculate(question){

  let expression =
    String(question || "")
      .toLowerCase()
      .trim();


  expression =
    expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/,/g, "");


  /*
   * केवल simple arithmetic allow करें।
   * किसी arbitrary JavaScript code को execute
   * नहीं करना है।
   */

  if(
    !/^[0-9+\-*/().%\s]+$/.test(
      expression
    )
  ){

    return null;

  }


  if(
    !/[0-9]/.test(expression)
  ){

    return null;

  }


  try{

    const result =
      Function(
        `"use strict"; return (${expression})`
      )();


    if(
      typeof result === "number" &&
      Number.isFinite(result)
    ){

      return String(result);

    }

  }catch(error){

    return null;

  }


  return null;

}


/* =========================
   WRITING
========================= */

function writingAnswer(question){

  const q =
    normalize(question);


  if(
    q.includes("paragraph") ||
    q.includes("पैराग्राफ") ||
    q.includes("अनुच्छेद")
  ){

    return (
      "AI यानी Artificial Intelligence आधुनिक technology का एक महत्वपूर्ण हिस्सा है। " +
      "यह computers को information समझने, patterns पहचानने और कुछ ऐसे काम करने में सक्षम बनाती है " +
      "जिनमें सामान्यतः human intelligence की आवश्यकता होती है। " +
      "आज AI का उपयोग education, communication, research, business और कई अन्य क्षेत्रों में किया जा रहा है।"
    );

  }


  if(
    q.includes("caption") ||
    q.includes("कैप्शन")
  ){

    return (
      "✨ Technology के साथ आगे बढ़ें!\n\n" +
      "नई technology सीखें, नई possibilities explore करें और smart तरीके से आगे बढ़ें।\n\n" +
      "#Technology #NexoraAI #AI"
    );

  }


  return null;

}


/* =========================
   CREATOR
========================= */

function creatorAnswer(question){

  const q =
    normalize(question);


  if(
    q.includes("youtube") &&
    (
      q.includes("title") ||
      q.includes("टाइटल")
    )
  ){

    const topic =
      String(question)
        .replace(/youtube/ig, "")
        .replace(/title/ig, "")
        .replace(/generate/ig, "")
        .replace(/करो/g, "")
        .replace(/: /g, " ")
        .trim();


    const subject =
      topic || "AI";


    return (
      "🎬 YouTube Title Ideas\n\n" +
      "1. " + subject + " — पूरी जानकारी आसान भाषा में\n" +
      "2. " + subject + " के बारे में 5 जरूरी बातें\n" +
      "3. " + subject + " कैसे काम करता है? आसान तरीका\n" +
      "4. " + subject + ": Complete Beginner Guide\n" +
      "5. " + subject + " की पूरी जानकारी | Hindi"
    );

  }


  if(
    q.includes("description") ||
    q.includes("डिस्क्रिप्शन") ||
    q.includes("discription")
  ){

    return (
      "📝 YouTube Description\n\n" +
      "इस वीडियो में हम इस topic को आसान भाषा में समझेंगे। " +
      "वीडियो पसंद आए तो Like, Share और Subscribe जरूर करें।\n\n" +
      "#NexoraAI #YouTube #Hindi"
    );

  }


  return null;

}


/* =========================
   GENERAL LOCAL RESPONSES
========================= */

function generalAnswer(question){

  const q =
    normalize(question);


  if(
    q === "hello" ||
    q === "hi" ||
    q === "hey" ||
    q === "नमस्ते" ||
    q === "नमस्कार"
  ){

    return (
      "नमस्ते! मैं Nexora AI हूँ। " +
      "आप मुझसे सवाल पूछ सकते हैं, topics समझ सकते हैं, " +
      "writing करा सकते हैं या calculations कर सकते हैं।"
    );

  }


  if(
    q.includes("nexora ai kya hai") ||
    q.includes("nexora ai क्या है")
  ){

    return (
      "Nexora AI एक modular AI workspace है जिसमें local tools " +
      "और secure AI backend को एक साथ इस्तेमाल किया जा सकता है।"
    );

  }


  return null;

}


/* =========================
   MAIN PROCESSOR
========================= */

export function processQuestion(question){

  const text =
    String(question || "").trim();


  if(!text){

    return {
      answer:"",
      skill:"general",
      skillName:"General"
    };

  }


  /* Calculator */

  const calculation =
    calculate(text);


  if(calculation !== null){

    return {

      answer:
        "🧮 Answer: " +
        calculation,

      skill:
        "calculator",

      skillName:
        "Calculator"

    };

  }


  /* Local knowledge */

  const localKnowledge =
    findKnowledge(text);


  if(localKnowledge){

    return {

      answer:
        localKnowledge,

      skill:
        "knowledge",

      skillName:
        "Knowledge"

    };

  }


  /* Writing */

  const writing =
    writingAnswer(text);


  if(writing){

    return {

      answer:
        writing,

      skill:
        "writing",

      skillName:
        "Writing"

    };

  }


  /* Creator */

  const creator =
    creatorAnswer(text);


  if(creator){

    return {

      answer:
        creator,

      skill:
        "creator",

      skillName:
        "Creator"

    };

  }


  /* General */

  const general =
    generalAnswer(text);


  if(general){

    return {

      answer:
        general,

      skill:
        "general",

      skillName:
        "General"

    };

  }


  /*
   * IMPORTANT:
   *
   * Unknown question के लिए
   * fake local answer नहीं देंगे।
   *
   * index.html इसे देखकर
   * /api/ask को call करेगा।
   */

  return {

    answer:null,

    skill:"backend",

    skillName:"AI Backend",

    needsBackend:true

  };

}


/* =========================
   OPTIONAL HELPERS
========================= */

export function getLocalSkills(){

  return [

    {
      id:"calculator",
      name:"Calculator"
    },

    {
      id:"knowledge",
      name:"Knowledge"
    },

    {
      id:"learning",
      name:"Learning"
    },

    {
      id:"writing",
      name:"Writing"
    },

    {
      id:"creator",
      name:"Creator"
    },

    {
      id:"general",
      name:"General"
    }

  ];

}