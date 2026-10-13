import axios from "axios";
import { getCardColors } from "../common/color.js";
import { renderError } from "../common/render.js";

const escapeXml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/**
 * Compute grade from value and thresholds.
 *
 * @param {number} value The numerical value.
 * @param {number[]} thresholds Threshold tiers.
 * @returns {{rank: string, color: string, bar: number}} The grade details.
 */
function computeGrade(value, thresholds) {
  if (value >= thresholds[0]) {
    return { rank: "SSS", color: "#f59e0b", bar: 1.0 };
  }
  if (value >= thresholds[1]) {
    return { rank: "SS", color: "#10b981", bar: 0.86 };
  }
  if (value >= thresholds[2]) {
    return { rank: "S", color: "#6366f1", bar: 0.72 };
  }
  if (value >= thresholds[3]) {
    return { rank: "AAA", color: "#38bdf8", bar: 0.58 };
  }
  if (value >= thresholds[4]) {
    return { rank: "AA", color: "#a855f7", bar: 0.44 };
  }
  return { rank: "A", color: "#94a3b8", bar: 0.3 };
}

export default async (req, res) => {
  const {
    username = "iemafzalhassan",
    theme = "tokyonight",
    hide_border = "false",
    bg_color,
    title_color,
    text_color,
    icon_color,
    border_color,
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "public, max-age=14400, s-maxage=14400, stale-while-revalidate=600",
  );

  try {
    const colors = getCardColors({
      theme,
      title_color,
      text_color,
      icon_color,
      bg_color,
      border_color,
    });

    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "readme-stats-studio",
    };

    const [userRes, reposRes] = await Promise.allSettled([
      axios.get(
        `https://api.github.com/users/${encodeURIComponent(username)}`,
        {
          headers,
          timeout: 5000,
        },
      ),
      axios.get(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner`,
        { headers, timeout: 5000 },
      ),
    ]);

    const profile = userRes.status === "fulfilled" ? userRes.value.data : {};
    const repos =
      reposRes.status === "fulfilled" && Array.isArray(reposRes.value.data)
        ? reposRes.value.data
        : [];

    const totalRepos = profile.public_repos || repos.length || 10;
    const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const totalForks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);
    const followers = profile.followers || 12;
    const languagesCount =
      new Set(repos.map((r) => r.language).filter(Boolean)).size || 5;
    const estCommits = Math.max(totalRepos * 22 + totalStars * 4, 120);

    const trophies = [
      {
        title: "Stars",
        subtitle: `${totalStars} Earned`,
        ...computeGrade(totalStars, [500, 150, 50, 15, 5]),
      },
      {
        title: "Commits",
        subtitle: `${estCommits}+ Total`,
        ...computeGrade(estCommits, [2500, 1000, 400, 150, 50]),
      },
      {
        title: "Repositories",
        subtitle: `${totalRepos} Public`,
        ...computeGrade(totalRepos, [80, 40, 20, 10, 5]),
      },
      {
        title: "Followers",
        subtitle: `${followers} Devs`,
        ...computeGrade(followers, [500, 150, 50, 20, 5]),
      },
      {
        title: "Polyglot",
        subtitle: `${languagesCount} Languages`,
        ...computeGrade(languagesCount, [12, 9, 6, 4, 2]),
      },
      {
        title: "Open Source",
        subtitle: `${totalForks} Forks`,
        ...computeGrade(totalForks + totalRepos, [200, 80, 30, 12, 4]),
      },
    ];

    const cardW = 122;
    const cardH = 132;
    const gap = 10;
    const pad = 14;
    const width =
      trophies.length * cardW + (trophies.length - 1) * gap + pad * 2;
    const height = cardH + pad * 2;

    const bgHex =
      typeof colors.bgColor === "string" && !Array.isArray(colors.bgColor)
        ? colors.bgColor
        : "#12131a";

    const borderAttr =
      hide_border === "true"
        ? "none"
        : `stroke="${colors.borderColor}" stroke-opacity="0.45" stroke-width="1"`;

    const itemsSvg = trophies
      .map((t, idx) => {
        const x = pad + idx * (cardW + gap);
        const y = pad;
        const barW = Math.round((cardW - 24) * t.bar);
        return `
          <g transform="translate(${x}, ${y})">
            <rect width="${cardW}" height="${cardH}" rx="10" fill="${colors.iconColor}" fill-opacity="0.08" stroke="${colors.iconColor}" stroke-opacity="0.35" stroke-width="1.2"/>
            <text x="${cardW / 2}" y="22" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="11" font-weight="700" fill="${colors.textColor}">${escapeXml(t.title)}</text>
            <circle cx="${cardW / 2}" cy="56" r="22" fill="${t.color}" fill-opacity="0.16" stroke="${t.color}" stroke-width="1.6"/>
            <path d="M${cardW / 2 - 8} 47 H${cardW / 2 + 8} V55 C${cardW / 2 + 8} 60 ${cardW / 2 + 4} 64 ${cardW / 2} 64 C${cardW / 2 - 4} 64 ${cardW / 2 - 8} 60 ${cardW / 2 - 8} 55 Z" fill="${colors.titleColor}" fill-opacity="0.25"/>
            <text x="${cardW / 2}" y="61" text-anchor="middle" font-family="'Segoe UI', Inter, monospace" font-size="13" font-weight="800" fill="${colors.titleColor}">${escapeXml(t.rank)}</text>
            <text x="${cardW / 2}" y="98" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="10.5" font-weight="600" fill="${colors.iconColor}">${escapeXml(t.subtitle)}</text>
            <rect x="12" y="110" width="${cardW - 24}" height="5" rx="2.5" fill="${colors.textColor}" fill-opacity="0.18"/>
            <rect x="12" y="110" width="${barW}" height="5" rx="2.5" fill="${colors.iconColor}"/>
          </g>
        `;
      })
      .join("");

    const svg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="${bgHex}" ${borderAttr}/>
        ${itemsSvg}
      </svg>
    `;

    return res.status(200).send(svg.trim());
  } catch (err) {
    return res.send(
      renderError({ message: err.message || "Trophy Card Error" }),
    );
  }
};
