const sendBtn = document.getElementById("sendBtn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");

sendBtn.addEventListener("click", async () => {
  const text = question.value.trim();

  if (!text) {
    answer.innerText = "Please enter a question.";
    return;
  }

  answer.innerText = "Thinking...";

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    answer.innerText = data.reply || "No response received.";
  } catch (err) {
    answer.innerText = "Connection Error!";
    console.error(err);
  }
});