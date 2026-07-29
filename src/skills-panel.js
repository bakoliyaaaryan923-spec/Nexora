import { getAllSkills } from "./skills-center.js";

export function createSkillsPanel(container, onSkillClick) {
  if (!container) return;

  container.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Nexora Skills";
  title.className = "skills-panel-title";

  const subtitle = document.createElement("p");
  subtitle.textContent = "Available local features";
  subtitle.className = "skills-panel-subtitle";

  const list = document.createElement("div");
  list.className = "skills-panel-list";

  const skills = getAllSkills();

  skills.forEach(skill => {
    const button = document.createElement("button");

    button.className = "skill-card";

    button.innerHTML = `
      <span class="skill-icon">${skill.icon}</span>
      <span class="skill-info">
        <strong>${skill.name}</strong>
        <small>${skill.description}</small>
      </span>
    `;

    button.addEventListener("click", () => {
      if (typeof onSkillClick === "function") {
        onSkillClick(skill);
      }
    });

    list.appendChild(button);
  });

  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(list);
}