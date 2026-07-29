const templates = {
  paragraph: topic =>
    `${topic} एक महत्वपूर्ण विषय है। इसे आसान भाषा में समझने के लिए इसके मुख्य points, उपयोग और examples को देखना जरूरी है। सही जानकारी के साथ इस विषय को बेहतर तरीके से समझा जा सकता है।`,

  caption: topic =>
    `✨ ${topic}\n\nआज की जानकारी कैसी लगी? Useful लगी हो तो Like, Share और Follow जरूर करें।\n\n#NexoraAI #Hindi #Knowledge`,

  message: topic =>
    `नमस्ते,\n\nमैं ${topic} के बारे में जानकारी साझा करना चाहता हूँ। कृपया इसे देखकर अपनी राय बताइए।\n\nधन्यवाद।`
};

function cleanTopic(question = "") {
  return question
    .replace(/write/gi, "")
    .replace(/writing/gi, "")
    .replace(/paragraph/gi, "")
    .replace(/caption/gi, "")
    .replace(/message/gi, "")
    .replace(/लिखो|लिखें|पैराग्राफ|कैप्शन|मैसेज/gi, "")
    .replace(/बनाओ|बनाएं|बना दो/gi, "")
    .trim() || "इस विषय";
}

export function generateWriting(question = "") {
  const q = question.toLowerCase();
  const topic = cleanTopic(question);

  if (
    q.includes("caption") ||
    q.includes("कैप्शन")
  ) {
    return templates.caption(topic);
  }

  if (
    q.includes("message") ||
    q.includes("मैसेज")
  ) {
    return templates.message(topic);
  }

  return templates.paragraph(topic);
}