const escapeXml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export default async (req, res) => {
  const {
    name = "tech",
    label = "",
    color = "6366f1",
    bg = "18181c",
    size = "40",
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
  );

  const cleanColor = String(color).replace("#", "").slice(0, 6) || "6366f1";
  const cleanBg = String(bg).replace("#", "").slice(0, 6) || "18181c";
  const dim = Math.min(Math.max(parseInt(size, 10) || 40, 20), 96);
  const display =
    (label || name)
      .toString()
      .toUpperCase()
      .replace(/[^A-Z0-9+#]/g, "")
      .slice(0, 4) || "DEV";

  const svg = `
    <svg width="${dim}" height="${dim}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#${cleanBg}" stroke="#${cleanColor}" stroke-width="2.2" stroke-opacity="0.85"/>
      <circle cx="24" cy="24" r="16" fill="#${cleanColor}" fill-opacity="0.16"/>
      <text x="24" y="28.5" text-anchor="middle" font-family="'JetBrains Mono', 'Segoe UI', monospace" font-size="${display.length > 3 ? "11" : "13"}" font-weight="800" fill="#${cleanColor}">${escapeXml(display)}</text>
    </svg>
  `;

  return res.status(200).send(svg.trim());
};
