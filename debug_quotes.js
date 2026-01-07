import handler from "./api/quotes.js";

const req = {
  query: {
    theme: "tokyonight",
    layout: "vertical",
  },
};

const res = {
  setHeader: (k, v) => console.log(`[Header] ${k}: ${v}`),
  send: (data) => console.log("Response:", data),
};

console.log("Running Quotes API handler...");
handler(req, res).catch((err) => console.error("Unhandled:", err));
