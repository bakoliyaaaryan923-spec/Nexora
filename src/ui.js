export function createMessage(text, type = "assistant", skill = "") {
  const div = document.createElement("div");

  div.className = `message ${type}`;

  if (type === "assistant" && skill) {
    const label = document.createElement("div");
    label.className = "skill";
    label.textContent = `⚡ ${skill}`;
    div.appendChild(label);
  }

  const content = document.createElement("div");
  content.textContent = text;

  div.appendChild(content);

  return div;
}

export function showMessage(
  chatElement,
  text,
  type = "assistant",
  skill = ""
) {
  const welcome = chatElement.querySelector(".welcome");

  if (welcome) {
    welcome.remove();
  }

  const message = createMessage(text, type, skill);

  chatElement.appendChild(message);

  message.scrollIntoView({
    behavior: "smooth",
    block: "end"
  });

  return message;
}

export function clearChat(chatElement) {
  chatElement.innerHTML = `
    <div class="welcome">
      <strong>Welcome to Nexora AI</strong>
      Ask a question or choose a skill below.
    </div>
  `;
}

export function setInput(inputElement, text = "") {
  inputElement.value = text;
  inputElement.focus();
}