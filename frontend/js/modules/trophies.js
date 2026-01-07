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

    previewContainer.innerHTML = `
      <img 
        src="${url}" 
        alt="Trophies" 
        onerror="this.parentElement.innerHTML='<div style=\'text-align:center;padding:2rem;color:var(--color-text-muted)\'><i class=\'fa-solid fa-triangle-exclamation\' style=\'font-size:2rem;margin-bottom:0.5rem;color:#ff6b6b\'></i><p style=\'margin:0;font-weight:600\'>Service Unavailable</p><small>The external Trophies service is currently down.</small></div>'"
      >
    `;

    // btnCopy logic handled in main.js
  }

  document.addEventListener("tabChanged", (e) => {
    if (e.detail.tab === "trophies") updatePreview();
  });
}
