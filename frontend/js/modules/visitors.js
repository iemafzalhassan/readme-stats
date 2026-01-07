export function initVisitors() {
  const inputs = [
    "visitor-username",
    "visitor-color",
    "visitor-label",
    "visitor-style",
    "visitor-theme",
  ];

  const els = {};
  inputs.forEach((id) => {
    els[id] = document.getElementById(id);
  });

  // Check if step-7 is active
  if (!document.getElementById("step-7").classList.contains("active")) return;

  function getVisitorUrl() {
    const username =
      els["visitor-username"]?.value ||
      document.getElementById("global-username").value ||
      "iemafzalhassan";
    const color = els["visitor-color"]?.value.replace("#", "") || "05CCCD";
    const label = els["visitor-label"]?.value || "VISITORS";
    const style = els["visitor-style"]?.value || "flat";
    const theme = els["visitor-theme"]?.value || "";

    // Pass to our API which will proxy/redirect
    let url = `/api/visitor?username=${username}&label=${encodeURIComponent(label)}&style=${style}`;
    if (theme) url += `&theme=${theme}`;
    else url += `&color=${color}`;

    return url;
  }

  return {
    getUrl: getVisitorUrl,
    getMarkdown: () => `![Visitors](${getVisitorUrl()})`,
  };
}
