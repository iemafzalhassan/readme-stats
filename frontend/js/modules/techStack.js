const POPULAR_ICONS = [
  { name: "JavaScript", color: "F7DF1E", slug: "javascript" },
  { name: "Python", color: "3776AB", slug: "python" },
  { name: "React", color: "61DAFB", slug: "react" },
  { name: "Node.js", color: "339933", slug: "nodedotjs" },
  { name: "Docker", color: "2496ED", slug: "docker" },
  { name: "AWS", color: "232F3E", slug: "amazonaws" },
  { name: "Go", color: "00ADD8", slug: "go" },
  { name: "Kubernetes", color: "326CE5", slug: "kubernetes" },
  { name: "Rust", color: "000000", slug: "rust" },
  { name: "Java", color: "007396", slug: "openjdk" },
  { name: "Git", color: "F05032", slug: "git" },
  { name: "Linux", color: "FCC624", slug: "linux" },
];

export function initTechStack() {
  const listContainer = document.getElementById("tech-icon-list");
  const searchInput = document.getElementById("tech-search");
  const styleSelect = document.getElementById("tech-style");
  const previewContainer = document.getElementById("tech-stack-preview");
  const btnClear = document.getElementById("btn-clear-stack");

  if (!listContainer) return {};

  const renderIcons = (filter = "") => {
    listContainer.innerHTML = "";
    const filtered = POPULAR_ICONS.filter((i) =>
      i.name.toLowerCase().includes(filter.toLowerCase()),
    );

    filtered.forEach((icon) => {
      const chip = document.createElement("div");
      chip.className = "tech-chip";
      chip.textContent = icon.name;
      chip.onclick = () => addBadge(icon);
      listContainer.appendChild(chip);
    });
  };

  renderIcons();
  searchInput.addEventListener("input", (e) => renderIcons(e.target.value));

  function addBadge(icon) {
    const style = styleSelect.value;
    // Clean color
    const color = icon.color; // Using icon default for simplicity in wizard

    const url = `https://img.shields.io/badge/${encodeURIComponent(icon.name)}-%23${color}?style=${style}&logo=${icon.slug}&logoColor=white`;

    const img = document.createElement("img");
    img.src = url;
    img.alt = icon.name;
    img.style.margin = "4px";

    previewContainer.appendChild(img);
  }

  if (btnClear) {
    btnClear.onclick = () => (previewContainer.innerHTML = "");
  }

  return {
    // Exposed methods if needed
  };
}
