import { initStats } from "./modules/stats.js";
import { initStreak } from "./modules/streak.js";
import { initTechStack } from "./modules/techStack.js";
import { initTrophies } from "./modules/trophies.js";
import { initQuotes } from "./modules/quotes.js";
import { initVisitors } from "./modules/visitors.js";

export function initWizard() {
  let currentStep = 1;
  const totalSteps = 8;

  // Modules State
  // We'll initialize modules but they might need "update" calls
  const modTech = initTechStack(); // Returns object with getMarkdown() if we refactor it, or we rely on DOM
  const modQuotes = initQuotes();
  const modVisitors = initVisitors();

  // DOM Elements
  const containerLanding = document.getElementById("landing-page");
  const containerWizard = document.getElementById("wizard-container");
  const btnStart = document.getElementById("btn-start-wizard");
  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prev");
  const progressFill = document.getElementById("progress-fill");
  const stepLabel = document.getElementById("step-label");

  // Step Labels
  const labels = [
    "Profile Basics",
    "Tech Stack",
    "Streak Stats",
    "GitHub Stats",
    "Trophies",
    "Daily Quote",
    "Visitor Count",
    "Finalize",
  ];

  // Navigation Logic
  btnStart.addEventListener("click", () => {
    containerLanding.classList.remove("active");
    containerLanding.classList.add("hidden");
    containerWizard.classList.remove("hidden");
    containerWizard.classList.add("active");
    updateUI();
  });

  btnNext.addEventListener("click", () => {
    if (currentStep < totalSteps) {
      currentStep++;
      updateUI();
    } else {
      // Finish?
    }
  });

  btnPrev.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      updateUI();
    }
  });

  // Live Preview Updaters (Global listeners or specific step logic)
  // We can hook into the 'input' event globally to refresh previews for the current step
  document.addEventListener("input", () => {
    refreshCurrentStepPreview();
  });

  document.addEventListener("change", () => {
    refreshCurrentStepPreview();
  });

  function updateUI() {
    // Nav Buttons
    btnPrev.disabled = currentStep === 1;
    btnNext.textContent = currentStep === totalSteps ? "Finish" : "Next";
    if (currentStep === totalSteps) {
      generateFinalMarkdown();
      btnNext.style.display = "none"; // Hide next on final step
    } else {
      btnNext.style.display = "block";
    }

    // Progress
    const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${percent}%`;
    stepLabel.textContent = labels[currentStep - 1];

    // Steps Visibility
    document
      .querySelectorAll(".wizard-step")
      .forEach((el) => el.classList.remove("active"));
    document.getElementById(`step-${currentStep}`).classList.add("active");

    // Step Indicators
    document.querySelectorAll(".step-dot").forEach((el, idx) => {
      if (idx + 1 <= currentStep) el.classList.add("active");
      else el.classList.remove("active");
    });

    refreshCurrentStepPreview();
  }

  function refreshCurrentStepPreview() {
    const username = document.getElementById("global-username").value;
    // Sync username to hidden inputs if needed, or modules should grab global
    if (currentStep === 7) {
      // Visitor Step
      const vUser = document.getElementById("visitor-username");
      if (vUser) vUser.value = username;
    }

    // Trigger module specific previews
    // We'll implemented "updatePreview(containerID)" helper or similar
    // For now, let's manually trigger basic DOM updates or call module helpers

    if (currentStep === 3) {
      // Streak
      renderImage(
        "preview-streak",
        `/api/streak?username=${username}&theme=${getTheme()}`,
      );
    }
    if (currentStep === 4) {
      // Stats
      renderImage(
        "preview-stats",
        `/api?username=${username}&theme=${getTheme()}`,
      );
    }
    if (currentStep === 5) {
      // Trophies - Use local theme, fallback username
      const theme = document.getElementById("trophy-theme")?.value || "flat";
      const user =
        document.getElementById("trophy-username")?.value || username;
      renderImage(
        "preview-trophies",
        `https://github-profile-trophy.vercel.app/?username=${user}&theme=${theme}&no-frame=true&no-bg=true&margin-w=4`,
      );
    }
    if (currentStep === 6) {
      // Quotes - Use local theme/layout
      const qTheme = document.getElementById("quote-theme")?.value || "radical";
      const qLayout =
        document.getElementById("quote-layout")?.value || "vertical";
      renderImage(
        "preview-quotes",
        `/api/quotes?theme=${qTheme}&layout=${qLayout}`,
      );
    }
    if (currentStep === 7) {
      // Visitors - Use local inputs
      const vLabel =
        document.getElementById("visitor-label")?.value || "VISITORS";
      const vColor =
        document.getElementById("visitor-color")?.value.replace("#", "") ||
        "05CCCD";
      const vStyle = document.getElementById("visitor-style")?.value || "flat";
      const vTheme = document.getElementById("visitor-theme")?.value || "";

      let vUrl = `/api/visitor?username=${username}&label=${encodeURIComponent(vLabel)}&style=${vStyle}`;
      if (vTheme) vUrl += `&theme=${vTheme}`;
      else vUrl += `&color=${vColor}`;

      renderImage("preview-visitors", vUrl);
    }
  }

  function getTheme() {
    return document.getElementById("global-theme").value || "edgeopslabs";
  }

  function renderImage(containerId, url) {
    const container = document.getElementById(containerId);
    if (container)
      container.innerHTML = `<img src="${url}" alt="Preview" style="max-width:100%">`;
  }

  function generateFinalMarkdown() {
    const username = document.getElementById("global-username").value;
    const theme = getTheme();
    const origin = window.location.origin;

    let md = `# Hi there 👋, I'm ${username}!\n\n`;

    // 1. Visitors & Quotes (Header)
    const vLabel = document.getElementById("visitor-label").value || "VISITORS";
    const vColor =
      document.getElementById("visitor-color").value.replace("#", "") ||
      "05CCCD";
    const vStyle = document.getElementById("visitor-style").value || "flat";
    const vTheme = document.getElementById("visitor-theme").value || "";
    let vUrl = `${origin}/api/visitor?username=${username}&label=${encodeURIComponent(vLabel)}&style=${vStyle}`;
    if (vTheme) vUrl += `&theme=${vTheme}`;
    else vUrl += `&color=${vColor}`;

    const qTheme = document.getElementById("quote-theme").value || "radical";
    const qLayout = document.getElementById("quote-layout").value || "vertical";

    md += `<div align="center">\n`;
    md += `  ![Visitors](${vUrl})\n`;
    md += `  <br/>\n`;
    md += `  ![Quote](${origin}/api/quotes?theme=${qTheme}&layout=${qLayout})\n`;
    md += `</div>\n\n`;

    // 2. Tech Stack
    // We need to fetch the stack from the DOM or module
    const stackHTML = document.getElementById("tech-stack-preview").innerHTML;
    // Convert img src to markdown
    // This is tricky if we don't store state. Let's assume the user added items to the DOM container
    // We can parse the DOM images
    const stackImgs = document.querySelectorAll("#tech-stack-preview img");
    if (stackImgs.length > 0) {
      md += `### 🛠 Tech Stack\n`;
      stackImgs.forEach((img) => {
        md += `![${img.alt}](${img.src}) `;
      });
      md += `\n\n`;
    }

    // 3. Stats & Streak Row
    md += `### 📊 GitHub Stats\n`;
    md += `<div align="center">\n`;
    // Streak
    md += `  <img src="${window.location.origin}/api/streak?username=${username}&theme=${theme}" alt="Streak" />\n`;
    // Stats
    md += `  <img src="${window.location.origin}/api?username=${username}&theme=${theme}&show_icons=true" alt="Stats" />\n`;
    md += `</div>\n\n`;

    // 4. Trophies
    const trophyTheme =
      document.getElementById("trophy-theme")?.value || "flat";
    const trophyUser =
      document.getElementById("trophy-username")?.value || username;
    md += `### 🏆 Trophies\n`;
    md += `![Trophies](https://github-profile-trophy.vercel.app/?username=${trophyUser}&theme=${trophyTheme}&no-frame=true&no-bg=true&margin-w=4)\n`;

    // Footer
    md += `\n---\nPossible by [EdgeOps Labs](https://github.com/EdgeOpslabs)`;

    document.getElementById("final-markdown").value = md;
  }

  // Copy Final
  document.getElementById("btn-copy-final").addEventListener("click", () => {
    navigator.clipboard.writeText(
      document.getElementById("final-markdown").value,
    );
    alert("Copied to clipboard!");
  });
}
