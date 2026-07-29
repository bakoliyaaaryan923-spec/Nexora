const lessons = [
  {
    keywords: ["ai", "artificial intelligence", "एआई", "आर्टिफिशियल इंटेलिजेंस"],
    answer:
      "AI यानी Artificial Intelligence ऐसी technology है जिसमें computer systems ऐसे काम कर सकते हैं जिनमें आमतौर पर human intelligence की जरूरत होती है।\n\nउदाहरण:\n• भाषा समझना\n• तस्वीरों में चीजें पहचानना\n• सवालों के जवाब देना\n• patterns पहचानना"
  },

  {
    keywords: ["computer", "कंप्यूटर"],
    answer:
      "कंप्यूटर एक electronic device है जो data को input के रूप में लेता है, उसे process करता है और output देता है।\n\nसरल रूप में:\nInput → Processing → Output"
  },

  {
    keywords: ["internet", "इंटरनेट"],
    answer:
      "Internet दुनिया भर के computers और devices को जोड़ने वाला बड़ा network है। इसके जरिए websites, messages, videos और दूसरी online services इस्तेमाल की जाती हैं।"
  },

  {
    keywords: ["solar system", "सौर मंडल"],
    answer:
      "सौर मंडल सूर्य और उसके चारों ओर घूमने वाले ग्रहों तथा अन्य खगोलीय objects का समूह है।\n\nसौर मंडल में 8 ग्रह हैं:\nMercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus और Neptune."
  },

  {
    keywords: ["gravity", "गुरुत्वाकर्षण"],
    answer:
      "गुरुत्वाकर्षण वह आकर्षण बल है जिसके कारण mass वाली वस्तुएँ एक-दूसरे की ओर खिंचती हैं। पृथ्वी का गुरुत्वाकर्षण हमें जमीन पर बनाए रखता है।"
  },

  {
    keywords: ["water", "पानी"],
    answer:
      "पानी का chemical formula H₂O है। एक पानी के molecule में 2 Hydrogen atoms और 1 Oxygen atom होते हैं।"
  }
];

export function explainTopic(question = "") {
  const q = question.toLowerCase().trim();

  const lesson = lessons.find(item =>
    item.keywords.some(keyword =>
      q.includes(keyword.toLowerCase())
    )
  );

  if (lesson) {
    return lesson.answer;
  }

  return null;
}

export function getLessonCount() {
  return lessons.length;
}