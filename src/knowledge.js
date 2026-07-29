const knowledge = [
  {
    keywords: [
      "bharat ki rajdhani",
      "capital of india",
      "भारत की राजधानी"
    ],
    answer:
      "भारत की राजधानी नई दिल्ली (New Delhi) है।\n\n3 महत्वपूर्ण बातें:\n1. यहाँ भारत की संसद स्थित है।\n2. राष्ट्रपति भवन नई दिल्ली में है।\n3. यह भारत के केंद्रीय शासन का प्रमुख केंद्र है।"
  },

  {
    keywords: [
      "rajasthan ki rajdhani",
      "rajasthan capital",
      "राजस्थान की राजधानी"
    ],
    answer:
      "राजस्थान की राजधानी जयपुर (Jaipur) है।\n\nजयपुर को Pink City के नाम से भी जाना जाता है।"
  },

  {
    keywords: [
      "ai kya hai",
      "what is ai",
      "artificial intelligence",
      "एआई क्या है"
    ],
    answer:
      "AI यानी Artificial Intelligence ऐसी technology है जिसमें computers ऐसे काम कर सकते हैं जिनमें सामान्यतः human intelligence की जरूरत होती है।\n\nउदाहरण: भाषा समझना, patterns पहचानना और predictions करना।"
  },

  {
    keywords: [
      "computer kya hai",
      "what is computer",
      "कंप्यूटर क्या है"
    ],
    answer:
      "कंप्यूटर एक electronic device है जो data को process करके useful information देता है।\n\nइसके मुख्य चरण हैं: Input → Processing → Output → Storage."
  },

  {
    keywords: [
      "water formula",
      "pani ka formula",
      "पानी का formula",
      "पानी का सूत्र"
    ],
    answer:
      "पानी का chemical formula H₂O है। इसमें 2 Hydrogen atoms और 1 Oxygen atom होते हैं।"
  },

  {
    keywords: [
      "solar system",
      "saur mandal",
      "सौर मंडल"
    ],
    answer:
      "सौर मंडल सूर्य और उसके चारों ओर घूमने वाले ग्रहों तथा अन्य खगोलीय objects का समूह है। इसमें 8 ग्रह हैं: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus और Neptune।"
  },

  {
    keywords: [
      "earth",
      "पृथ्वी",
      "prithvi"
    ],
    answer:
      "पृथ्वी सूर्य से तीसरा ग्रह है और अब तक ज्ञात जीवन वाला एकमात्र ग्रह है।"
  },

  {
    keywords: [
      "gravity",
      "गुरुत्वाकर्षण",
      "गुरुत्वाकर्षण क्या है"
    ],
    answer:
      "गुरुत्वाकर्षण वह आकर्षण बल है जिसके कारण वस्तुएँ एक-दूसरे की ओर खिंचती हैं। पृथ्वी का गुरुत्वाकर्षण हमें जमीन पर बनाए रखता है।"
  }
];

export function findKnowledge(question = "") {
  const q = question.toLowerCase().trim();

  const item = knowledge.find(entry =>
    entry.keywords.some(keyword => q.includes(keyword.toLowerCase()))
  );

  return item ? item.answer : null;
}

export function addKnowledge(keywords, answer) {
  if (!Array.isArray(keywords) || !answer) {
    return false;
  }

  knowledge.push({
    keywords,
    answer
  });

  return true;
}

export function getKnowledgeCount() {
  return knowledge.length;
}