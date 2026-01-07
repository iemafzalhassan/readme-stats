export function initQuotes() {
  const inputs = ["quote-theme", "quote-layout"];
  const containerId = "step-quotes";

  const els = {};
  inputs.forEach((id) => {
    els[id] = document.getElementById(id);
  });

  function getQuoteUrl() {
    const theme = els["quote-theme"]?.value || "radical";
    const layout = els["quote-layout"]?.value || "vertical";

    // Use local API
    const username = document.getElementById("global-username").value;
    return `/api/quotes?theme=${theme}&layout=${layout}`;
  }

  return {
    getUrl: getQuoteUrl,
    getMarkdown: () => `![Quote](${getQuoteUrl()})`,
  };
}
