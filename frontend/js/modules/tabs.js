export function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const groups = document.querySelectorAll(".config-group");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all
      tabs.forEach((t) => t.classList.remove("active"));
      groups.forEach((g) => g.classList.remove("active"));

      // Add to current
      tab.classList.add("active");
      const targetId = tab.dataset.tab;
      document.getElementById(`config-${targetId}`).classList.add("active");

      // Trigger update event for the specific module to refresh preview
      document.dispatchEvent(
        new CustomEvent("tabChanged", { detail: { tab: targetId } }),
      );
    });
  });
}
