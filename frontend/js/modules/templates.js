import { renderTechStackMarkdown } from "./iconCatalog.js";

export const DOMAIN_TEMPLATES = [
  {
    id: "devops",
    name: "DevOps & Cloud Architect",
    roleTag: "roadmap.sh/devops · Cloud · CI/CD · IaC",
    badge: "DEVOPS",
    defaultTheme: "tokyonight",
    defaultProvider: "skillicons",
    defaultShape: "dark",
    desc: "Terminal whoami YAML block, Cloud/IaC stack, CI/CD & Kubernetes telemetry, and pinned infra repos.",
  },
  {
    id: "data-engineer",
    name: "Data Engineer & Big Data",
    roleTag: "roadmap.sh/data-engineer · Spark · Kafka · Warehousing",
    badge: "DATA ENG",
    defaultTheme: "catppuccin_mocha",
    defaultProvider: "shields",
    defaultShape: "for-the-badge",
    desc: "Built around the Data Engineer roadmap: batch/streaming pipelines, lakehouse architecture, dbt/Airflow, and metrics.",
  },
  {
    id: "ai-ml",
    name: "AIOps / MLOps & AI Engineer",
    roleTag: "roadmap.sh/mlops · LLMs · PyTorch · Model Serving",
    badge: "AIOPS / MLOPS",
    defaultTheme: "radical",
    defaultProvider: "iconify",
    defaultShape: "brand",
    desc: "Showcases LLM pipelines, distributed training, MLflow/Kubeflow orchestration, and AI research repositories.",
  },
  {
    id: "platform-sre",
    name: "SRE & Platform Engineer",
    roleTag: "roadmap.sh/devops · Kubernetes · Observability · SLOs",
    badge: "SRE / PLATFORM",
    defaultTheme: "gruvbox",
    defaultProvider: "custom-svg",
    defaultShape: "hexagon",
    desc: "Reliability engineering blueprint with eBPF/Service Mesh, Hexagon SVG stack card, OpenTelemetry, and streak stats.",
  },
  {
    id: "devsecops",
    name: "DevSecOps & Cyber Security",
    roleTag: "roadmap.sh/devsecops · Zero-Trust · Supply Chain Security",
    badge: "DEVSECOPS",
    defaultTheme: "gotham",
    defaultProvider: "custom-svg",
    defaultShape: "pill",
    desc: "Security-first profile highlighting container scanning, Vault secrets management, IAM, and hardened infrastructure.",
  },
  {
    id: "fullstack",
    name: "Software Developer / Full-Stack",
    roleTag: "roadmap.sh/full-stack · Web Apps · APIs · Cloud",
    badge: "FULL-STACK",
    defaultTheme: "dracula",
    defaultProvider: "skillicons",
    defaultShape: "dark",
    desc: "Balanced product builder profile featuring current work, full-stack icons, stats + streak grid, and top repos.",
  },
  {
    id: "principal",
    name: "Principal / Staff Engineer",
    roleTag: "roadmap.sh/software-architect · Distributed Systems · Scale",
    badge: "PRINCIPAL",
    defaultTheme: "github_dark",
    defaultProvider: "iconify",
    defaultShape: "theme-icon",
    desc: "High-signal executive technical blueprint with theme-tinted vector icons, systems architecture focus, and flagship repos.",
  },
  {
    id: "cto-founder",
    name: "CTO / CEO / Tech Founder",
    roleTag: "Executive Leadership · Product Vision · Ventures",
    badge: "EXECUTIVE",
    defaultTheme: "blue_navy",
    defaultProvider: "shields",
    defaultShape: "flat-square",
    desc: "Executive profile emphasizing company vision, flagship products, leadership philosophy, and advisory contact links.",
  },
  {
    id: "oss-contributor",
    name: "OSS Maintainer & Contributor",
    roleTag: "Open Source Ecosystems · Community · Tooling",
    badge: "OPEN SOURCE",
    defaultTheme: "aura",
    defaultProvider: "shields",
    defaultShape: "for-the-badge",
    desc: "Built for active open-source maintainers with featured repositories, PR/Issue velocity, native trophies, and sponsor links.",
  },
  {
    id: "minimal-zen",
    name: "Minimalist Zen",
    roleTag: "Clean Code · Essentialist · High Contrast",
    badge: "MINIMAL",
    defaultTheme: "nord",
    defaultProvider: "iconify",
    defaultShape: "theme-title",
    desc: "Ultra-clean, distraction-free layout with subtle theme-tinted icons and compact side-by-side telemetry.",
  },
];

function buildSocialBadges(state, themeColors) {
  const cleanHex = (c, fallback = "1a1b27") =>
    (c || fallback).toString().replace("#", "").split(",")[0];
  const bg = cleanHex(themeColors.bg_color, "18181b");
  const iconClr = cleanHex(themeColors.icon_color, "38bdf8");

  const badges = [];
  if (state.showVisitor) {
    const vUser = encodeURIComponent(state.username || "anuraghazra");
    const vUrl = `${state.baseUrl}/api/visitor?username=${vUser}&label=${encodeURIComponent(state.visitorLabel || "PROFILE VIEWS")}&style=${state.visitorStyle || "flat-square"}&theme=${encodeURIComponent(state.theme)}&v=v0.2.0`;
    badges.push(`<img src="${vUrl}" alt="Visitors" />`);
  }
  if (state.linkedin) {
    badges.push(
      `<a href="https://linkedin.com/in/${encodeURIComponent(state.linkedin)}"><img src="https://img.shields.io/badge/LinkedIn-${bg}?style=flat-square&logo=linkedin&logoColor=${iconClr}" alt="LinkedIn" /></a>`,
    );
  }
  if (state.twitter) {
    const handle = state.twitter.replace(/^@/, "");
    badges.push(
      `<a href="https://x.com/${encodeURIComponent(handle)}"><img src="https://img.shields.io/badge/X_%2F_Twitter-%40${encodeURIComponent(handle)}-${bg}?style=flat-square&logo=x&logoColor=${iconClr}" alt="X" /></a>`,
    );
  }
  if (state.blog) {
    const url = state.blog.startsWith("http")
      ? state.blog
      : `https://${state.blog}`;
    badges.push(
      `<a href="${url}"><img src="https://img.shields.io/badge/Portfolio_%26_Blog-${bg}?style=flat-square&logo=safari&logoColor=${iconClr}" alt="Website" /></a>`,
    );
  }
  if (state.email) {
    badges.push(
      `<a href="mailto:${state.email}"><img src="https://img.shields.io/badge/Email-${encodeURIComponent(state.email)}-${bg}?style=flat-square&logo=gmail&logoColor=${iconClr}" alt="Email" /></a>`,
    );
  }

  return badges.length > 0
    ? `<p align="center">\n  ${badges.join(" ")}\n</p>\n\n`
    : "";
}

function buildPinnedReposSection(state) {
  if (
    !state.showPinned ||
    !state.selectedRepos ||
    state.selectedRepos.length === 0
  ) {
    return "";
  }
  const repoUser = encodeURIComponent(state.username || "anuraghazra");
  const customQuery = state.customColors
    ? `&title_color=${state.customColors.title_color}&text_color=${state.customColors.text_color}&icon_color=${state.customColors.icon_color}&bg_color=${state.customColors.bg_color}&border_color=${state.customColors.border_color}`
    : "";
  const vParam = "&v=v0.2.0";

  const cards = state.selectedRepos.slice(0, 6).map((repoName) => {
    const pinUrl = `${state.baseUrl}/api/pin?username=${repoUser}&repo=${encodeURIComponent(repoName)}&theme=${encodeURIComponent(state.theme)}&hide_border=${state.hideBorder}${customQuery}${vParam}`;
    return `  <a href="https://github.com/${repoUser}/${encodeURIComponent(repoName)}">\n    <img src="${pinUrl}" alt="${repoName}" />\n  </a>`;
  });

  return `### Featured Repositories\n\n<p align="center">\n${cards.join("\n")}\n</p>\n\n`;
}

function buildMetricsSection(state) {
  const parts = [];
  const u = encodeURIComponent(state.username || "anuraghazra");
  const t = encodeURIComponent(state.theme);
  const hb = state.hideBorder ? "true" : "false";
  const customQuery = state.customColors
    ? `&title_color=${state.customColors.title_color}&text_color=${state.customColors.text_color}&icon_color=${state.customColors.icon_color}&bg_color=${state.customColors.bg_color}&border_color=${state.customColors.border_color}`
    : "";
  const vParam = "&v=v0.2.0";

  if (state.showStats) {
    const statsUrl = `${state.baseUrl}/api?username=${u}&theme=${t}&show_icons=${state.showIcons}&include_all_commits=${state.includeAllCommits}&hide_rank=${state.hideRank}&hide_border=${hb}${customQuery}${vParam}`;
    parts.push(`  <img src="${statsUrl}" height="175" alt="GitHub Stats" />`);
  }

  if (state.showStreak) {
    const streakUrl = `${state.baseUrl}/api/streak?username=${u}&theme=${t}&hide_border=${hb}${customQuery}${vParam}`;
    parts.push(`  <img src="${streakUrl}" height="175" alt="GitHub Streak" />`);
  }

  if (state.showTopLangs) {
    const langUrl = `${state.baseUrl}/api/top-langs?username=${u}&theme=${t}&layout=${encodeURIComponent(state.langsLayout || "compact")}&hide_border=${hb}&langs_count=8${customQuery}${vParam}`;
    parts.push(`  <img src="${langUrl}" height="175" alt="Top Languages" />`);
  }

  if (parts.length === 0) return "";

  return `### GitHub Activity & Stats\n\n<p align="center">\n${parts.join("\n")}\n</p>\n\n`;
}

function buildAddonsSection(state) {
  let out = "";
  const u = encodeURIComponent(state.username || "anuraghazra");
  const t = encodeURIComponent(state.theme);
  const hb = state.hideBorder ? "true" : "false";
  const customQuery = state.customColors
    ? `&title_color=${state.customColors.title_color}&text_color=${state.customColors.text_color}&icon_color=${state.customColors.icon_color}&bg_color=${state.customColors.bg_color}&border_color=${state.customColors.border_color}`
    : "";
  const vParam = "&v=v0.2.0";

  if (state.showTrophies) {
    out += `### GitHub Achievements\n\n<p align="center">\n  <img src="${state.baseUrl}/api/trophies?username=${u}&theme=${t}&hide_border=${hb}${customQuery}${vParam}" alt="Trophies" />\n</p>\n\n`;
  }

  if (state.showWakatime && state.wakatimeUser) {
    out += `### Weekly Coding Breakdown (WakaTime)\n\n<p align="center">\n  <img src="${state.baseUrl}/api/wakatime?username=${encodeURIComponent(state.wakatimeUser)}&theme=${t}&layout=compact&hide_border=${hb}${customQuery}${vParam}" alt="WakaTime" />\n</p>\n\n`;
  }

  if (state.showQuotes) {
    out += `<p align="center">\n  <img src="${state.baseUrl}/api/quotes?theme=${t}&layout=${encodeURIComponent(state.quoteLayout || "horizontal")}${customQuery}${vParam}" alt="Developer Quote" />\n</p>\n\n`;
  }

  if (state.showWatermark) {
    out += `<p align="center">\n  <sub>Crafted with <a href="https://github.com/iemafzalhassan/readme-stats"><b>readme-stats Studio</b></a> · Theme: <code>${state.theme}</code></sub>\n</p>\n`;
  }

  return out;
}

export function generateTemplateMarkdown(state, themeColors = {}) {
  const name = state.displayName || state.username || "Developer";
  const role = state.roleTitle || "DevOps & Platform Engineer";
  const bio =
    state.bio ||
    "Designing resilient distributed architectures, automating cloud-native workflows, and shipping open-source developer tools.";
  const company = state.company ? ` at **${state.company}**` : "";
  const location = state.location ? ` · 📍 ${state.location}` : "";
  const currentWork =
    state.currentWork ||
    "Cloud-native automation, high-throughput APIs, and open-source developer tooling";

  const socialBlock = buildSocialBadges(state, themeColors);
  const stackBlock = renderTechStackMarkdown({
    selectedIds: state.selectedIcons,
    provider: state.iconProvider,
    shape: state.iconShape,
    size: state.iconSize,
    perline: state.iconsPerLine,
    themeName: state.theme,
    themeColors,
    themeSync: state.themeSyncIcons,
    baseUrl: state.baseUrl,
  });

  const pinnedBlock = buildPinnedReposSection(state);
  const metricsBlock = buildMetricsSection(state);
  const addonsBlock = buildAddonsSection(state);

  if (
    state.templateId === "devops" ||
    state.templateId === "platform-sre" ||
    state.templateId === "devsecops"
  ) {
    const focusMap = {
      devops: "Cloud Infrastructure, CI/CD Pipelines & Infrastructure-as-Code",
      "platform-sre": "Kubernetes Platforms, GitOps, High-Availability & SLOs",
      devsecops:
        "Zero-Trust Architecture, Container Security, Vault & Supply Chain Defense",
    };
    return `<h1 align="center">${name}</h1>\n<p align="center"><b>${role}</b>${company}${location}</p>\n\n${socialBlock}\`\`\`yaml\nwhoami:\n  handle: "${state.username}"\n  role: "${role}"\n  domain_track: "https://roadmap.sh/${state.templateId === "platform-sre" ? "devops" : state.templateId}"\n  focus: "${focusMap[state.templateId]}"\n  currently_building: "${currentWork}"\n\`\`\`\n\n### Cloud, Infrastructure & Platform Stack\n\n${stackBlock}\n\n${pinnedBlock}${metricsBlock}${addonsBlock}`;
  }

  if (state.templateId === "data-engineer") {
    return `<h1 align="center">${name}</h1>\n<p align="center"><b>${role} · Data Engineering & Lakehouse Architecture</b>${company}${location}</p>\n\n${socialBlock}\`\`\`yaml\ndata_pipeline_profile:\n  engineer: "${state.username}"\n  architecture: ["Medallion Lakehouse", "Real-Time Streaming", "elt / dbt"]\n  current_focus: "${currentWork}"\n  summary: "${bio}"\n\`\`\`\n\n### Data Engineering, Streaming & Warehouse Stack\n\n${stackBlock}\n\n${pinnedBlock}${metricsBlock}${addonsBlock}`;
  }

  if (state.templateId === "ai-ml") {
    return `<h1 align="center">${name}</h1>\n<p align="center"><b>${role} · AIOps / MLOps & AI Systems</b>${company}${location}</p>\n\n${socialBlock}### Research, MLOps & Production AI Focus\n\n- 🧠 **Current R&D & Pipelines**: ${currentWork}\n- ⚡ **Core Architecture**: LLM Serving, RAG & Vector Databases, Distributed Training, and Automated MLOps.\n- 📌 **Summary**: ${bio}\n\n### AI, MLOps & Compute Stack\n\n${stackBlock}\n\n${pinnedBlock}${metricsBlock}${addonsBlock}`;
  }

  if (state.templateId === "principal") {
    return `# ${name}\n**${role}**${company}${location}\n\n> ${bio}\n\n${socialBlock}### Architectural Focus & Engineering Domains\n\n- **Distributed Systems & Scale**: Designing fault-tolerant services, high-throughput event pipelines, and multi-region cloud topologies.\n- **Current Technical Initiative**: ${currentWork}.\n- **Engineering Standards**: RFC-driven design, observability-first systems, and mentoring senior engineering teams.\n\n### Core Technology & Systems Radar\n\n${stackBlock}\n\n${pinnedBlock}${metricsBlock}${addonsBlock}`;
  }

  if (state.templateId === "cto-founder") {
    return `<h1 align="center">${name}</h1>\n<p align="center"><b>${role}</b>${company}${location}</p>\n<p align="center"><i>"${bio}"</i></p>\n\n${socialBlock}### Executive Overview & Ventures\n\n| Area | Focus |\n| :--- | :--- |\n| **Current Venture / Focus** | ${currentWork} |\n| **Technical Strategy** | Cloud-native scalability, AI-assisted engineering velocity & resilient product architecture |\n| **Collaboration** | Open to strategic advisory, architecture reviews, and high-impact open-source partnerships |\n\n### Technology & Platform Ecosystem\n\n${stackBlock}\n\n${pinnedBlock}${metricsBlock}${addonsBlock}`;
  }

  if (state.templateId === "oss-contributor") {
    return `<h1 align="center">Hey there, I'm ${name} 👋</h1>\n<p align="center"><b>${role} · Open-Source Maintainer</b>${location}</p>\n\n${socialBlock}<p align="center">${bio}</p>\n\n- 🌱 **Currently Maintaining & Building**: ${currentWork}\n- 🤝 **Open-Source Philosophy**: Building composable, well-documented tools that empower the developer community.\n\n### Languages, Frameworks & Tooling\n\n${stackBlock}\n\n${pinnedBlock}${metricsBlock}${addonsBlock}`;
  }

  if (state.templateId === "minimal-zen") {
    return `<h2 align="center">${name}</h2>\n<p align="center">${role}${company}${location}</p>\n<p align="center"><sub>${bio}</sub></p>\n\n${socialBlock}${stackBlock}\n\n${metricsBlock}${pinnedBlock}${addonsBlock}`;
  }

  return `<h1 align="center">Hi, I'm ${name} 👋</h1>\n<p align="center"><b>${role}</b>${company}${location}</p>\n<p align="center">${bio}</p>\n\n${socialBlock}- 🔭 **Currently working on**: ${currentWork}\n- ⚡ **Core stack**: Full-cycle software engineering, scalable backend APIs, and modern cloud deployment\n\n### Tech Stack & Tooling\n\n${stackBlock}\n\n${pinnedBlock}${metricsBlock}${addonsBlock}`;
}
