export function initStreak() {
  const inputs = ["streak-username", "streak-theme"];

  const els = {};
  inputs.forEach((id) => {
    els[id] = document.getElementById(id);
    if (els[id]) els[id].addEventListener("input", updatePreview);
  });

  const previewContainer = document.getElementById("preview-container");
  // const btnCopy = document.getElementById('btn-copy-md');

  function updatePreview() {
    if (!document.getElementById("config-streak").classList.contains("active"))
      return;

    const username = els["streak-username"].value || "iemafzalhassan";
    const theme = els["streak-theme"].value;

    const query = `?username=${username}&theme=${theme}`;
    const url = `/api/streak${query}`;
    const fullUrl = `${window.location.origin}/api/streak${query}`;

    previewContainer.innerHTML = `<img src="${url}" alt="Streak Stats">`;

    // btnCopy handled in main.js
  }

  document.addEventListener("tabChanged", (e) => {
    if (e.detail.tab === "streak") updatePreview();
  });
}
