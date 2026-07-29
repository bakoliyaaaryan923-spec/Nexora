function cleanTopic(text = "") {
  return text
    .replace(/youtube/gi, "")
    .replace(/video/gi, "")
    .replace(/title/gi, "")
    .replace(/description/gi, "")
    .replace(/discription/gi, "")
    .replace(/hashtags?/gi, "")
    .replace(/caption/gi, "")
    .replace(/generate/gi, "")
    .replace(/बनाओ|बनाएं|लिखो|लिखें|टाइटल|डिस्क्रिप्शन|हैशटैग|कैप्शन/gi, "")
    .replace(/:/g, "")
    .trim();

  return topic || "AI";
}

export function generateTitle(question) {
  const topic = cleanTopic(question);

  return `🎬 YouTube Title Ideas

1. ${topic} — पूरी जानकारी आसान भाषा में
2. ${topic} के बारे में 5 जरूरी बातें
3. ${topic} कैसे काम करता है? आसान तरीका
4. ${topic}: Complete Beginner Guide
5. ${topic} की पूरी जानकारी | Hindi`;
}

export function generateDescription(question) {
  const topic = cleanTopic(question);

  return `📝 YouTube Description

आज के इस वीडियो में हम ${topic} के बारे में आसान भाषा में जानेंगे।

इस वीडियो में आपको ${topic} से जुड़ी जरूरी जानकारी, examples और useful points मिलेंगे।

वीडियो पसंद आए तो Like करें, Share करें और Channel को Subscribe करें।

📌 Topic: ${topic}

#NexoraAI #YouTube #Hindi #Technology`;
}

export function generateIdeas(question) {
  const topic = cleanTopic(question);

  return `💡 Video Ideas — ${topic}

1. ${topic} क्या है?
2. ${topic} कैसे काम करता है?
3. Beginners के लिए ${topic}
4. ${topic} की 5 जरूरी बातें
5. ${topic} की common mistakes
6. ${topic} के useful tips
7. ${topic} का future`;
}

export function generateHashtags(question) {
  const topic = cleanTopic(question);

  const words = topic
    .split(/\s+/)
    .filter(Boolean)
    .map(word => "#" + word.replace(/[^a-zA-Z0-9]/g, ""));

  return `🏷️ Hashtags

${words.join(" ")}
#YouTube #Shorts #NexoraAI #Hindi #Tips`;
}

export function generateCaption(question) {
  const topic = cleanTopic(question);

  return `✍️ Caption

✨ ${topic}

आज की जानकारी useful लगी हो तो Like, Share और Follow जरूर करें।

#NexoraAI #YouTube #Hindi`;
}