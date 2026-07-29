const generalAnswers = [
  {
    keywords: ["hello", "hi", "नमस्ते", "नमस्कार"],
    answer:
      "नमस्ते! मैं Nexora AI हूँ। आप मुझसे knowledge, learning, writing, creator और calculation से जुड़े सवाल पूछ सकते हैं।"
  },

  {
    keywords: ["nexora kya hai", "nexora ai", "nexora क्या है"],
    answer:
      "Nexora AI एक modular browser-based AI workspace है। इसमें अलग-अलग local skills को एक ही interface से इस्तेमाल किया जा सकता है।"
  },

  {
    keywords: ["help", "madad", "मदद", "क्या कर सकते हो"],
    answer:
      "मैं अभी इन local features में मदद कर सकता हूँ:\n\n🧮 Calculation\n📚 Topic explanation\n🌍 Local knowledge\n✍️ Writing\n🎬 YouTube creator tools"
  }
];

export function generalAnswer(question = "") {
  const q = question.toLowerCase().trim();

  const match = generalAnswers.find(item =>
    item.keywords.some(keyword =>
      q.includes(keyword.toLowerCase())
    )
  );

  if (match) {
    return match.answer;
  }

  return (
    "मैं अभी Free Local Mode में चल रहा हूँ।\n\n" +
    "इस सवाल का specific local answer अभी मेरी knowledge base में नहीं है।\n\n" +
    "आप Calculation, Knowledge, Learning, Writing या Creator feature आज़मा सकते हैं।"
  );
}