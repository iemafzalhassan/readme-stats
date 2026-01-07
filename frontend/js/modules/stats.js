export function initStats() {
  const inputs = [
    "stats-username",
    "stats-theme",
    "stats-hide-border",
    "stats-show-icons",
    "stats-count-private",
    "stats-include-commits",
    "stats-hide-rank",
  ];

  const els = {};
  inputs.forEach((id) => {
    els[id] = document.getElementById(id);
    if (els[id]) {
      els[id].addEventListener("input", updatePreview);
    }
  });

  const previewContainer = document.getElementById("preview-container");
  // const btnCopy = document.getElementById('btn-copy-md'); // Removed, handled in main.js

  function updatePreview() {
    if (!document.getElementById("config-stats").classList.contains("active"))
      return;

    const username = els["stats-username"].value || "iemafzalhassan";
    const theme = els["stats-theme"].value;
    const hideBorder = els["stats-hide-border"].checked;
    const showIcons = els["stats-show-icons"].checked;
    const countPrivate = els["stats-count-private"].checked;
    const includeCommits = els["stats-include-commits"].checked;
    const hideRank = els["stats-hide-rank"].checked;

    let query = `?username=${username}&theme=${theme}`;
    if (hideBorder) query += "&hide_border=true";
    if (showIcons) query += "&show_icons=true";
    if (countPrivate) query += "&count_private=true";
    if (includeCommits) query += "&include_all_commits=true";
    if (hideRank) query += "&hide_rank=true";

    const url = `/api${query}`;
    // Use full URL for copy
    const fullUrl = `${window.location.origin}/api${query}`;

    previewContainer.innerHTML = `<img src="${url}" alt="GitHub Stats">`;

    // Update Copy - Handled in main.js
  }

  document.addEventListener("tabChanged", (e) => {
    if (e.detail.tab === "stats") updatePreview();
  });
}
