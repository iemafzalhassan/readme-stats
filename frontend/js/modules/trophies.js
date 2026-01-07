export function initTrophies() {
  const inputs = ["trophy-username", "trophy-theme"];

  const els = {};
  inputs.forEach((id) => {
    els[id] = document.getElementById(id);
    if (els[id]) els[id].addEventListener("input", updatePreview);
  });

  const previewContainer = document.getElementById("preview-trophies");
  // const btnCopy = document.getElementById('btn-copy-md');

  function updatePreview() {
    if (!document.getElementById("step-5").classList.contains("active")) return;

    const username =
      els["trophy-username"]?.value ||
      document.getElementById("global-username").value ||
      "iemafzalhassan";
    const theme = els["trophy-theme"].value;

    // Using external service for now
    const url = `https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&no-frame=true&no-bg=true&margin-w=4`;

    previewContainer.innerHTML = `<img src="${url}" alt="Trophies">`;

    // btnCopy logic handled in main.js
  }

  document.addEventListener("tabChanged", (e) => {
    if (e.detail.tab === "trophies") updatePreview();
  });
}
