import { getCardColors } from "../src/common/color.js";
import { renderError } from "../src/common/render.js";

const TECH_META = {
  javascript: { label: "JavaScript", abbr: "JS", accent: "#F7DF1E" },
  typescript: { label: "TypeScript", abbr: "TS", accent: "#3178C6" },
  python: { label: "Python", abbr: "PY", accent: "#3776AB" },
  go: { label: "Go", abbr: "GO", accent: "#00ADD8" },
  rust: { label: "Rust", abbr: "RS", accent: "#DEA584" },
  java: { label: "Java", abbr: "JV", accent: "#ED8B00" },
  cpp: { label: "C++", abbr: "C++", accent: "#00599C" },
  csharp: { label: "C#", abbr: "C#", accent: "#512BD4" },
  ruby: { label: "Ruby", abbr: "RB", accent: "#CC342D" },
  php: { label: "PHP", abbr: "PHP", accent: "#777BB4" },
  swift: { label: "Swift", abbr: "SW", accent: "#F05138" },
  kotlin: { label: "Kotlin", abbr: "KT", accent: "#7F52FF" },
  react: { label: "React", abbr: "RE", accent: "#61DAFB" },
  nextjs: { label: "Next.js", abbr: "NX", accent: "#FFFFFF" },
  vuejs: { label: "Vue.js", abbr: "VU", accent: "#4FC08D" },
  angular: { label: "Angular", abbr: "NG", accent: "#DD0031" },
  svelte: { label: "Svelte", abbr: "SV", accent: "#FF3E00" },
  tailwindcss: { label: "Tailwind", abbr: "TW", accent: "#06B6D4" },
  nodejs: { label: "Node.js", abbr: "ND", accent: "#339933" },
  express: { label: "Express", abbr: "EX", accent: "#FFFFFF" },
  nestjs: { label: "NestJS", abbr: "NS", accent: "#E0234E" },
  fastapi: { label: "FastAPI", abbr: "FA", accent: "#009688" },
  django: { label: "Django", abbr: "DJ", accent: "#092E20" },
  spring: { label: "Spring", abbr: "SP", accent: "#6DB33F" },
  graphql: { label: "GraphQL", abbr: "GQL", accent: "#E10098" },
  docker: { label: "Docker", abbr: "DKR", accent: "#2496ED" },
  kubernetes: { label: "Kubernetes", abbr: "K8S", accent: "#326CE5" },
  terraform: { label: "Terraform", abbr: "TF", accent: "#844FBA" },
  ansible: { label: "Ansible", abbr: "ANS", accent: "#EE0000" },
  aws: { label: "AWS", abbr: "AWS", accent: "#FF9900" },
  gcp: { label: "GCP", abbr: "GCP", accent: "#4285F4" },
  azure: { label: "Azure", abbr: "AZ", accent: "#0078D4" },
  linux: { label: "Linux", abbr: "LNX", accent: "#FCC624" },
  git: { label: "Git", abbr: "GIT", accent: "#F05032" },
  githubactions: { label: "GH Actions", abbr: "GHA", accent: "#2088FF" },
  jenkins: { label: "Jenkins", abbr: "JNK", accent: "#D24939" },
  argocd: { label: "ArgoCD", abbr: "ARG", accent: "#EF7B4D" },
  prometheus: { label: "Prometheus", abbr: "PRM", accent: "#E6522C" },
  grafana: { label: "Grafana", abbr: "GRF", accent: "#F46800" },
  helm: { label: "Helm", abbr: "HLM", accent: "#0F1689" },
  nginx: { label: "Nginx", abbr: "NGX", accent: "#009639" },
  postgresql: { label: "PostgreSQL", abbr: "PG", accent: "#4169E1" },
  mongodb: { label: "MongoDB", abbr: "MDB", accent: "#47A248" },
  redis: { label: "Redis", abbr: "RDS", accent: "#DC382D" },
  mysql: { label: "MySQL", abbr: "SQL", accent: "#4479A1" },
  kafka: { label: "Kafka", abbr: "KFK", accent: "#231F20" },
  elasticsearch: { label: "Elastic", abbr: "ELS", accent: "#005571" },
  pytorch: { label: "PyTorch", abbr: "PT", accent: "#EE4C2C" },
  tensorflow: { label: "TensorFlow", abbr: "TF", accent: "#FF6F00" },
  vercel: { label: "Vercel", abbr: "VCL", accent: "#FFFFFF" },
  cloudflare: { label: "Cloudflare", abbr: "CF", accent: "#F38020" },
};

const escapeXml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export default async (req, res) => {
  const {
    icons = "docker,kubernetes,terraform,aws,go,linux",
    shape = "hexagon",
    theme = "tokyonight",
    title = "",
    perline = "6",
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

    const iconKeys = icons
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 24);

    const cols = Math.min(Math.max(parseInt(perline, 10) || 6, 2), 10);
    const rows = Math.max(Math.ceil(iconKeys.length / cols), 1);
    const cellW = 112;
    const cellH = shape === "pill" ? 48 : 88;
    const padX = 24;
    const headerH = title ? 46 : 20;
    const width = Math.max(cols * cellW + padX * 2, 340);
    const height = rows * cellH + headerH + 22;

    const bgHex =
      typeof colors.bgColor === "string" && !Array.isArray(colors.bgColor)
        ? colors.bgColor
        : "#12131a";

    const itemsSvg = iconKeys
      .map((key, idx) => {
        const meta = TECH_META[key] || {
          label: key.charAt(0).toUpperCase() + key.slice(1),
          abbr: key.slice(0, 3).toUpperCase(),
          accent: colors.iconColor,
        };
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const cx = padX + col * cellW + cellW / 2;
        const cy = headerH + row * cellH + cellH / 2;

        if (shape === "pill") {
          const pillW = cellW - 12;
          const pillH = 34;
          const x = cx - pillW / 2;
          const y = cy - pillH / 2;
          return `
            <g transform="translate(${x}, ${y})">
              <rect width="${pillW}" height="${pillH}" rx="17" fill="${colors.iconColor}" fill-opacity="0.12" stroke="${colors.iconColor}" stroke-opacity="0.45" stroke-width="1.2"/>
              <circle cx="18" cy="17" r="9" fill="${meta.accent}" fill-opacity="0.9"/>
              <text x="18" y="20" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="8" font-weight="800" fill="#09090b">${escapeXml(meta.abbr)}</text>
              <text x="33" y="21" font-family="'Segoe UI', Inter, sans-serif" font-size="11.5" font-weight="600" fill="${colors.textColor}">${escapeXml(meta.label.slice(0, 9))}</text>
            </g>
          `;
        }

        if (shape === "circle") {
          return `
            <g transform="translate(${cx}, ${cy - 8})">
              <circle r="24" fill="${colors.iconColor}" fill-opacity="0.12" stroke="${colors.iconColor}" stroke-opacity="0.55" stroke-width="1.5"/>
              <circle r="18" fill="${meta.accent}" fill-opacity="0.18"/>
              <text y="5" text-anchor="middle" font-family="'Segoe UI', Inter, monospace" font-size="13" font-weight="800" fill="${colors.titleColor}">${escapeXml(meta.abbr)}</text>
              <text y="38" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="11" font-weight="600" fill="${colors.textColor}">${escapeXml(meta.label)}</text>
            </g>
          `;
        }

        if (shape === "squircle" || shape === "glass") {
          return `
            <g transform="translate(${cx}, ${cy - 8})">
              <rect x="-26" y="-24" width="52" height="48" rx="14" fill="${colors.iconColor}" fill-opacity="${shape === "glass" ? "0.16" : "0.1"}" stroke="${colors.titleColor}" stroke-opacity="0.45" stroke-width="1.4"/>
              <circle cx="0" cy="-14" r="3" fill="${meta.accent}"/>
              <text y="6" text-anchor="middle" font-family="'Segoe UI', Inter, monospace" font-size="13.5" font-weight="800" fill="${colors.titleColor}">${escapeXml(meta.abbr)}</text>
              <text y="38" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="11" font-weight="600" fill="${colors.textColor}">${escapeXml(meta.label)}</text>
            </g>
          `;
        }

        // Default: Hexagon
        const hexPoints = "0,-25 22,-12.5 22,12.5 0,25 -22,12.5 -22,-12.5";
        return `
          <g transform="translate(${cx}, ${cy - 8})">
            <polygon points="${hexPoints}" fill="${colors.iconColor}" fill-opacity="0.12" stroke="${colors.iconColor}" stroke-opacity="0.65" stroke-width="1.5"/>
            <text y="5" text-anchor="middle" font-family="'Segoe UI', Inter, monospace" font-size="12.5" font-weight="800" fill="${colors.titleColor}">${escapeXml(meta.abbr)}</text>
            <text y="39" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="11" font-weight="600" fill="${colors.textColor}">${escapeXml(meta.label)}</text>
          </g>
        `;
      })
      .join("");

    const borderStroke =
      hide_border === "true"
        ? "none"
        : `stroke="${colors.borderColor}" stroke-opacity="0.4" stroke-width="1"`;

    const titleSvg = title
      ? `<text x="${padX}" y="30" font-family="'Segoe UI', Inter, sans-serif" font-size="15" font-weight="700" fill="${colors.titleColor}">${escapeXml(title)}</text>`
      : "";

    const svg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="10" fill="${bgHex}" ${borderStroke}/>
        ${titleSvg}
        ${itemsSvg}
      </svg>
    `;

    return res.status(200).send(svg.trim());
  } catch (err) {
    return res.send(
      renderError({ message: err.message || "Badge Render Error" }),
    );
  }
};
