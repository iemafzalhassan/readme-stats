import {
  ICON_CATEGORIES,
  ICON_PROVIDERS,
  ICON_CATALOG,
  STACK_PRESETS,
  getIconThumbnailUrl,
} from "./modules/iconCatalog.js";
import { fetchGitHubUserIntelligence } from "./modules/githubAutoFetch.js";
import {
  DOMAIN_TEMPLATES,
  generateTemplateMarkdown,
} from "./modules/templates.js";

const FALLBACK_THEMES = {
  tokyonight: {
    title_color: "70a5fd",
    icon_color: "bf91f3",
    text_color: "38bdae",
    bg_color: "1a1b27",
  },
  catppuccin_mocha: {
    title_color: "94e2d5",
    icon_color: "cba6f7",
    text_color: "cdd6f4",
    bg_color: "1e1e2e",
  },
  dracula: {
    title_color: "ff6e96",
    icon_color: "79dafa",
    text_color: "f8f8f2",
    bg_color: "282a36",
  },
  gruvbox: {
    title_color: "fabd2f",
    icon_color: "fe8019",
    text_color: "8ec07c",
    bg_color: "282828",
  },
  github_dark: {
    title_color: "58A6FF",
    icon_color: "1F6FEB",
    text_color: "C3D1D9",
    bg_color: "0D1117",
  },
  onedark: {
    title_color: "e4bf7a",
    icon_color: "8eb573",
    text_color: "df6d74",
    bg_color: "282c34",
  },
  radical: {
    title_color: "fe428e",
    icon_color: "f8d847",
    text_color: "a9fef7",
    bg_color: "141321",
  },
  aura: {
    title_color: "a277ff",
    icon_color: "ffca85",
    text_color: "61ffca",
    bg_color: "15141b",
  },
  nord: {
    title_color: "81a1c1",
    text_color: "d8dee9",
    icon_color: "88c0d0",
    bg_color: "2e3440",
  },
  blue_navy: {
    title_color: "82AAFF",
    text_color: "82AAFF",
    icon_color: "82AAFF",
    border_color: "ffffff",
    bg_color: "000000",
  },
  neon: {
    title_color: "00EAD3",
    text_color: "FF449F",
    icon_color: "00EAD3",
    border_color: "ffffff",
    bg_color: "000000",
  },
  nightowl: {
    title_color: "c792ea",
    icon_color: "ffeb95",
    text_color: "7fdbca",
    bg_color: "011627",
  },
  rose_pine: {
    title_color: "9ccfd8",
    icon_color: "ebbcba",
    text_color: "e0def4",
    bg_color: "191724",
  },
  synthwave: {
    title_color: "e2e9ec",
    icon_color: "ef8539",
    text_color: "e5289e",
    bg_color: "2b213a",
  },
  cobalt: {
    title_color: "e683d9",
    icon_color: "0480ef",
    text_color: "75eeb2",
    bg_color: "193549",
  },
  monokai: {
    title_color: "eb1f6a",
    icon_color: "e28905",
    text_color: "f1f1eb",
    bg_color: "272822",
  },
  gotham: {
    title_color: "2aa889",
    icon_color: "599cab",
    text_color: "99d1ce",
    bg_color: "0c1014",
  },
  holi: {
    title_color: "5FABEE",
    text_color: "D6E7FF",
    icon_color: "5FABEE",
    border_color: "85A4C0",
    bg_color: "030314",
  },
  default: {
    title_color: "2f80ed",
    icon_color: "4c71f2",
    text_color: "434d58",
    bg_color: "fffefe",
    border_color: "e4e2e2",
  },
};

const state = {
  username: "",
  displayName: "Developer",
  roleTitle: "Full-Stack Engineer & Cloud Architect",
  company: "@OpenSource",
  location: "Global",
  bio: "Passionate developer building high-impact tools, cloud infrastructure, and modern applications.",
  currentWork:
    "Open-source tools, high-performance systems & cloud infrastructure",
  linkedin: "",
  twitter: "",
  blog: "",
  email: "",
  templateId: "devops",
  theme: "tokyonight",
  customColors: null,
  syncPreviewTheme: true,
  iconProvider: "skillicons",
  iconShape: "dark",
  iconSize: 40,
  iconsPerLine: 8,
  themeSyncIcons: false,
  selectedIcons: [...STACK_PRESETS.devops],
  availableRepos: [
    { name: "readme-stats", stars: 120, language: "JavaScript" },
    { name: "convos", stars: 80, language: "TypeScript" },
  ],
  selectedRepos: ["readme-stats"],
  showStats: true,
  showStreak: true,
  showTopLangs: true,
  showPinned: true,
  showVisitor: true,
  showTrophies: true,
  showQuotes: true,
  showWakatime: false,
  wakatimeUser: "",
  hideBorder: false,
  showIcons: true,
  includeAllCommits: true,
  hideRank: false,
  langsLayout: "compact",
  quoteLayout: "horizontal",
  visitorLabel: "PROFILE VIEWS",
  visitorStyle: "flat-square",
  showWatermark: true,
  baseUrl: window.location.origin,
  iconCategoryFilter: "all",
  iconSearchQuery: "",
  themeSearchQuery: "",
  allThemes: { ...FALLBACK_THEMES },
};

function showToast(message) {
  const toast = document.getElementById("studio-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

function cleanHex(c, fallback = "70a5fd") {
  const raw = (c || fallback).toString().replace("#", "").split(",")[0].trim();
  if (raw.length === 3) {
    return raw
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  return raw.slice(0, 6) || fallback;
}

function renderGitHubMarkdownToHtml(md) {
  let html = md;

  html = html.replace(
    /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g,
    (_, lang, code) => {
      const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<pre><code class="language-${lang}">${escaped.trim()}</code></pre>`;
    },
  );

  html = html.replace(
    /\n\|(.+)\|\n\|([\s:|-]+)\|\n((?:\|.*\|\n?)+)/g,
    (_, headerLine, _sepLine, bodyBlock) => {
      const headers = headerLine
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
      const rows = bodyBlock
        .trim()
        .split("\n")
        .map((r) =>
          r
            .split("|")
            .map((c) => c.trim())
            .filter(Boolean),
        );
      const thHtml = headers
        .map((h) => `<th>${formatInlineMd(h)}</th>`)
        .join("");
      const trHtml = rows
        .map(
          (cols) =>
            `<tr>${cols.map((c) => `<td>${formatInlineMd(c)}</td>`).join("")}</tr>`,
        )
        .join("");
      return `<table><thead><tr>${thHtml}</tr></thead><tbody>${trHtml}</tbody></table>`;
    },
  );

  html = html
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>");

  html = html.replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>");

  html = html.replace(/(?:^- .*\n?)+/gm, (listBlock) => {
    const items = listBlock
      .trim()
      .split("\n")
      .map((line) => `<li>${formatInlineMd(line.replace(/^- /, ""))}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });

  return formatInlineMd(html);
}

function formatInlineMd(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>',
    );
}

async function loadThemesFromApi() {
  try {
    const res = await fetch("/api/themes?full=true");
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object" && !Array.isArray(data)) {
        state.allThemes = { ...FALLBACK_THEMES, ...data };
      }
    }
  } catch {
    // Fallback themes already loaded
  }
  const countEl = document.getElementById("theme-total-count");
  if (countEl) {
    countEl.textContent = `${Object.keys(state.allThemes).length}`;
  }
  renderThemeGrid();
  renderActiveThemeInspector();
  refreshStudioOutput();
}

function renderActiveThemeInspector() {
  const labelEl = document.getElementById("active-theme-label");
  const pillsEl = document.getElementById("active-theme-hex-pills");
  const colors =
    state.customColors ||
    state.allThemes[state.theme] ||
    FALLBACK_THEMES.tokyonight;

  if (labelEl)
    labelEl.textContent = state.customColors
      ? "custom (plugged in)"
      : state.theme;

  // Sync Custom Theme Creator fields
  const titleHex = cleanHex(colors.title_color, "70a5fd");
  const textHex = cleanHex(colors.text_color, "38bdae");
  const iconHex = cleanHex(colors.icon_color, "bf91f3");
  const bgHex = cleanHex(colors.bg_color, "1a1b27");
  const borderHex = cleanHex(colors.border_color, "2a2e40");

  const syncField = (pickerId, inputId, hex) => {
    const p = document.getElementById(pickerId);
    const i = document.getElementById(inputId);
    if (p) p.value = "#" + hex;
    if (i) i.value = hex;
  };
  syncField("picker-custom-title", "color-custom-title", titleHex);
  syncField("picker-custom-text", "color-custom-text", textHex);
  syncField("picker-custom-icon", "color-custom-icon", iconHex);
  syncField("picker-custom-bg", "color-custom-bg", bgHex);
  syncField("picker-custom-border", "color-custom-border", borderHex);

  if (!pillsEl) return;

  const items = [
    { name: "BG", hex: `#${cleanHex(colors.bg_color, "1a1b27")}` },
    { name: "Title", hex: `#${cleanHex(colors.title_color, "70a5fd")}` },
    { name: "Icon", hex: `#${cleanHex(colors.icon_color, "bf91f3")}` },
    { name: "Text", hex: `#${cleanHex(colors.text_color, "38bdae")}` },
  ];

  pillsEl.innerHTML = items
    .map(
      (i) => `
      <div class="theme-hex-pill" title="Click to copy ${i.hex}" data-hex="${i.hex}">
        <span class="theme-hex-dot" style="background:${i.hex}"></span>
        <span>${i.name}: ${i.hex}</span>
      </div>
    `,
    )
    .join("");

  pillsEl.querySelectorAll(".theme-hex-pill").forEach((el) => {
    el.addEventListener("click", () => {
      navigator.clipboard.writeText(el.dataset.hex || "");
      showToast(`Copied ${el.dataset.hex}`);
    });
  });
}

function applyThemeToPreviewSurface() {
  const previewEl = document.getElementById("live-readme-preview");
  if (!previewEl) return;

  const colors = state.allThemes[state.theme] || FALLBACK_THEMES.tokyonight;
  if (state.syncPreviewTheme) {
    const bgHex = cleanHex(colors.bg_color, "0d1117");
    const titleHex = cleanHex(colors.title_color, "70a5fd");
    const iconHex = cleanHex(colors.icon_color, "bf91f3");
    const textHex = cleanHex(colors.text_color, "e6edf3");

    previewEl.style.setProperty(
      "--readme-bg",
      bgHex === "ffffff" && !previewEl.classList.contains("gh-light")
        ? "#0d1117"
        : `#${bgHex}`,
    );
    previewEl.style.setProperty("--readme-title", `#${titleHex}`);
    previewEl.style.setProperty("--readme-icon", `#${iconHex}`);
    previewEl.style.setProperty("--readme-text", `#${textHex}`);
    previewEl.style.setProperty("--readme-border", `#${iconHex}38`);
  } else {
    previewEl.style.setProperty("--readme-bg", "#0d1117");
    previewEl.style.setProperty("--readme-title", "#e6edf3");
    previewEl.style.setProperty("--readme-icon", "#58a6ff");
    previewEl.style.setProperty("--readme-text", "#e6edf3");
    previewEl.style.setProperty("--readme-border", "rgba(125,133,144,0.28)");
  }
}

function renderDomainTemplates() {
  const container = document.getElementById("domain-template-grid");
  if (!container) return;
  container.innerHTML = "";

  DOMAIN_TEMPLATES.forEach((tpl) => {
    const card = document.createElement("div");
    card.className = `template-card ${state.templateId === tpl.id ? "active" : ""}`;
    card.innerHTML = `
      <div class="template-card-top">
        <span class="template-name">${tpl.name}</span>
        <span class="template-pill">${tpl.badge}</span>
      </div>
      <div class="template-role">${tpl.roleTag}</div>
      <div class="template-desc">${tpl.desc}</div>
    `;
    card.addEventListener("click", () => {
      state.templateId = tpl.id;
      state.theme = tpl.defaultTheme;
      state.iconProvider = tpl.defaultProvider;
      state.iconShape = tpl.defaultShape;
      if (STACK_PRESETS[tpl.id]) {
        state.selectedIcons = [...STACK_PRESETS[tpl.id]];
      }
      const trackSelect = document.getElementById("select-roadmap-track");
      if (trackSelect && STACK_PRESETS[tpl.id]) {
        trackSelect.value = tpl.id;
      }
      renderDomainTemplates();
      renderIconProviders();
      renderShapeSelect();
      renderIconCatalog();
      renderThemeGrid();
      renderActiveThemeInspector();
      refreshStudioOutput();
      showToast(`Applied "${tpl.name}" blueprint`);
    });
    container.appendChild(card);
  });
}

function renderIconProviders() {
  const container = document.getElementById("icon-provider-grid");
  if (!container) return;
  container.innerHTML = "";

  ICON_PROVIDERS.forEach((prov) => {
    const card = document.createElement("div");
    card.className = `provider-card ${state.iconProvider === prov.id ? "active" : ""}`;
    card.innerHTML = `
      <div class="provider-card-title">${prov.name}</div>
      <div class="provider-card-sub">${prov.badge}</div>
    `;
    card.addEventListener("click", () => {
      state.iconProvider = prov.id;
      state.iconShape = prov.shapes[0].id;
      renderIconProviders();
      renderShapeSelect();
      refreshStudioOutput();
    });
    container.appendChild(card);
  });
}

function renderShapeSelect() {
  const select = document.getElementById("select-icon-shape");
  if (!select) return;
  const prov =
    ICON_PROVIDERS.find((p) => p.id === state.iconProvider) ||
    ICON_PROVIDERS[0];

  select.innerHTML = prov.shapes
    .map(
      (s) =>
        `<option value="${s.id}" ${s.id === state.iconShape ? "selected" : ""}>${s.label}</option>`,
    )
    .join("");
}

function renderIconCategories() {
  const bar = document.getElementById("icon-category-bar");
  if (!bar) return;
  bar.innerHTML = "";

  ICON_CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = `filter-pill ${state.iconCategoryFilter === cat.id ? "active" : ""}`;
    btn.textContent = cat.label;
    btn.addEventListener("click", () => {
      state.iconCategoryFilter = cat.id;
      renderIconCategories();
      renderIconCatalog();
    });
    bar.appendChild(btn);
  });
}

function renderIconCatalog() {
  const grid = document.getElementById("icon-catalog-grid");
  const countEl = document.getElementById("selected-icon-count");
  if (countEl) countEl.textContent = String(state.selectedIcons.length);
  if (!grid) return;

  grid.innerHTML = "";
  const q = state.iconSearchQuery.toLowerCase().trim();

  const filtered = ICON_CATALOG.filter((item) => {
    const matchesCat =
      state.iconCategoryFilter === "all" ||
      item.category === state.iconCategoryFilter;
    const matchesQuery =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  filtered.forEach((icon) => {
    const isSelected = state.selectedIcons.includes(icon.id);
    const tile = document.createElement("div");
    tile.className = `icon-tile ${isSelected ? "selected" : ""}`;

    const thumbUrl = getIconThumbnailUrl(icon);
    const fallbackUrl = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${encodeURIComponent(icon.simpleIcon || icon.id)}.svg`;

    tile.innerHTML = `
      <div class="icon-tile-thumb">
        <img src="${thumbUrl}" alt="${icon.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackUrl}';" />
      </div>
      <span title="${icon.name}">${icon.name}</span>
    `;
    tile.addEventListener("click", () => {
      if (state.selectedIcons.includes(icon.id)) {
        state.selectedIcons = state.selectedIcons.filter(
          (id) => id !== icon.id,
        );
      } else {
        state.selectedIcons.push(icon.id);
      }
      renderIconCatalog();
      refreshStudioOutput();
    });
    grid.appendChild(tile);
  });
}

function renderThemeGrid() {
  const grid = document.getElementById("theme-swatch-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const q = state.themeSearchQuery.toLowerCase().trim();
  const entries = Object.entries(state.allThemes).filter(([name]) =>
    name.toLowerCase().includes(q),
  );

  entries.forEach(([themeKey, colors]) => {
    const bg = `#${cleanHex(colors.bg_color, "1a1b27")}`;
    const title = `#${cleanHex(colors.title_color, "70a5fd")}`;
    const icon = `#${cleanHex(colors.icon_color, "bf91f3")}`;
    const text = `#${cleanHex(colors.text_color, "38bdae")}`;

    const card = document.createElement("div");
    card.className = `theme-swatch-card ${state.theme === themeKey ? "active" : ""}`;
    card.innerHTML = `
      <div class="swatch-preview-strip" style="background:${bg}">
        <span style="font-family:var(--font-mono);font-size:0.62rem;font-weight:700;color:${title}">Aa</span>
        <div class="swatch-dots">
          <span class="swatch-dot" style="background:${title}" title="Title ${title}"></span>
          <span class="swatch-dot" style="background:${icon}" title="Icon ${icon}"></span>
          <span class="swatch-dot" style="background:${text}" title="Text ${text}"></span>
        </div>
      </div>
      <div class="theme-swatch-name" title="${themeKey}">${themeKey}</div>
    `;
    card.addEventListener("click", () => {
      state.theme = themeKey;
      renderThemeGrid();
      renderActiveThemeInspector();
      refreshStudioOutput();
      showToast(`Theme switched to "${themeKey}"`);
    });
    grid.appendChild(card);
  });
}

function renderRepoChecklist() {
  const list = document.getElementById("repo-selector-list");
  if (!list) return;
  list.innerHTML = "";

  if (!state.availableRepos || state.availableRepos.length === 0) {
    list.innerHTML = `<div class="panel-subtitle">No public repositories detected yet. Click Auto-Fetch above.</div>`;
    return;
  }

  state.availableRepos.forEach((repo) => {
    const checked = state.selectedRepos.includes(repo.name);
    const row = document.createElement("label");
    row.className = "toggle-row";
    row.innerHTML = `
      <div class="toggle-row-label">
        <span class="toggle-row-title">${repo.name} ${repo.stars ? `★ ${repo.stars}` : ""}</span>
        <span class="toggle-row-sub">${repo.language || "Repository"}</span>
      </div>
      <input type="checkbox" ${checked ? "checked" : ""} />
    `;
    const input = row.querySelector("input");
    input.addEventListener("change", () => {
      if (input.checked) {
        if (state.selectedRepos.length >= 6) {
          input.checked = false;
          showToast("Maximum 6 pinned repositories allowed");
          return;
        }
        state.selectedRepos.push(repo.name);
      } else {
        state.selectedRepos = state.selectedRepos.filter(
          (n) => n !== repo.name,
        );
      }
      refreshStudioOutput();
    });
    list.appendChild(row);
  });
}

function refreshStudioOutput() {
  const themeColors =
    state.customColors ||
    state.allThemes[state.theme] ||
    FALLBACK_THEMES.tokyonight;
  const md = generateTemplateMarkdown(state, themeColors);

  const rawArea = document.getElementById("raw-markdown-output");
  if (rawArea) {
    rawArea.value = md;
  }

  const previewEl = document.getElementById("live-readme-preview");
  if (previewEl) {
    applyThemeToPreviewSurface();
    previewEl.innerHTML = renderGitHubMarkdownToHtml(md);
  }

  const ghLink = document.getElementById("link-open-gh-profile");
  if (ghLink) {
    ghLink.href = `https://github.com/${encodeURIComponent(state.username)}`;
  }
}

async function handleRoadmapSync() {
  const select = document.getElementById("select-roadmap-track");
  const apiKeyInput = document.getElementById("input-roadmap-api-key");
  const btn = document.getElementById("btn-sync-roadmap");
  const track = select?.value || "devops";
  const apiKey = (apiKeyInput?.value || "").trim();

  if (STACK_PRESETS[track]) {
    state.selectedIcons = [...STACK_PRESETS[track]];
  }

  try {
    if (btn) btn.disabled = true;
    const res = await fetch(
      `/api/roadmap?domain=${encodeURIComponent(track)}&apiKey=${encodeURIComponent(apiKey)}`,
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.topics) && data.topics.length > 0) {
        const lowerTopics = data.topics.map((t) => t.toLowerCase());
        ICON_CATALOG.forEach((icon) => {
          if (
            lowerTopics.some(
              (topic) =>
                topic === icon.name.toLowerCase() ||
                topic.includes(icon.id.toLowerCase()),
            ) &&
            !state.selectedIcons.includes(icon.id) &&
            state.selectedIcons.length < 22
          ) {
            state.selectedIcons.push(icon.id);
          }
        });
      }
    }
  } catch {
    // Curated preset already loaded
  } finally {
    if (btn) btn.disabled = false;
  }

  renderIconCatalog();
  refreshStudioOutput();
  showToast(
    `Loaded roadmap.sh/${track} tool stack (${state.selectedIcons.length} tools)`,
  );
}

async function handleGitHubAutoFetch() {
  const input = document.getElementById("input-github-username");
  const statusPill = document.getElementById("scanner-status-pill");
  const btn = document.getElementById("btn-fetch-github");
  const username = (input?.value || "").trim();
  if (!username) return;

  try {
    if (btn) btn.disabled = true;
    if (statusPill) statusPill.textContent = "Scanning...";

    const intel = await fetchGitHubUserIntelligence(username);
    state.username = intel.username;
    state.displayName = intel.name;
    state.bio = intel.bio;
    state.company = intel.company;
    state.location = intel.location;
    state.blog = intel.blog;
    state.twitter = intel.twitter;
    state.templateId = intel.recommendedTemplate;

    if (intel.detectedIcons.length >= 4) {
      state.selectedIcons = intel.detectedIcons;
    }

    if (intel.topRepos.length > 0) {
      state.availableRepos = intel.topRepos;
      state.selectedRepos = intel.topRepos.slice(0, 4).map((r) => r.name);
    }

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el && val !== undefined) el.value = val;
    };
    setVal("input-display-name", state.displayName);
    setVal("input-bio", state.bio);
    setVal("input-company", state.company);
    setVal("input-location", state.location);
    setVal("input-blog", state.blog);
    setVal("input-twitter", state.twitter);

    const scoreBadge = document.getElementById("readiness-score-badge");
    if (scoreBadge) scoreBadge.textContent = `${intel.readinessScore}%`;

    const summaryEl = document.getElementById("readiness-summary");
    if (summaryEl) {
      summaryEl.textContent = `${intel.publicRepos} public repos · ${intel.totalStars} ★ · Auto-matched "${intel.recommendedTemplate.toUpperCase()}" blueprint`;
    }

    if (statusPill) {
      statusPill.textContent = `✓ ${intel.publicRepos} repos`;
    }

    renderDomainTemplates();
    renderRepoChecklist();
    renderIconCatalog();
    refreshStudioOutput();
    try {
      localStorage.setItem("readme_stats_username", intel.username);
    } catch {
      // Storage unavailable in private browsing
    }
    showToast(`Auto-fetched @${intel.username} (${intel.publicRepos} repos)`);
  } catch (err) {
    if (statusPill) statusPill.textContent = "Ready";
    refreshStudioOutput();
    showToast(err.message || "Could not fetch GitHub profile");
  } finally {
    if (btn) btn.disabled = false;
  }
}

function bindEvents() {
  document.querySelectorAll(".dock-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".dock-tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".dock-panel")
        .forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add("active");
    });
  });

  document
    .getElementById("btn-fetch-github")
    ?.addEventListener("click", handleGitHubAutoFetch);
  document
    .getElementById("input-github-username")
    ?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleGitHubAutoFetch();
    });
  document
    .getElementById("input-github-username")
    ?.addEventListener("input", (e) => {
      state.username = e.target.value.trim();
      refreshStudioOutput();
    });

  document
    .getElementById("btn-sync-roadmap")
    ?.addEventListener("click", handleRoadmapSync);

  const bindInput = (id, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", (e) => {
      state[key] = e.target.value;
      refreshStudioOutput();
    });
  };

  bindInput("input-display-name", "displayName");
  bindInput("input-role-title", "roleTitle");
  bindInput("input-company", "company");
  bindInput("input-location", "location");
  bindInput("input-bio", "bio");
  bindInput("input-current-work", "currentWork");
  bindInput("input-linkedin", "linkedin");
  bindInput("input-twitter", "twitter");
  bindInput("input-blog", "blog");
  bindInput("input-email", "email");

  document
    .getElementById("select-icon-shape")
    ?.addEventListener("change", (e) => {
      state.iconShape = e.target.value;
      refreshStudioOutput();
    });

  document.getElementById("input-icon-size")?.addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10) || 40;
    state.iconSize = val;
    state.iconsPerLine = val >= 48 ? 6 : val <= 32 ? 10 : 8;
    const lbl = document.getElementById("label-icon-size");
    if (lbl) lbl.textContent = `${val}px · ${state.iconsPerLine}/row`;
    refreshStudioOutput();
  });

  document
    .getElementById("check-theme-sync-icons")
    ?.addEventListener("change", (e) => {
      state.themeSyncIcons = e.target.checked;
      refreshStudioOutput();
    });

  document
    .getElementById("check-sync-preview-theme")
    ?.addEventListener("change", (e) => {
      state.syncPreviewTheme = e.target.checked;
      refreshStudioOutput();
    });

  document.getElementById("btn-clear-icons")?.addEventListener("click", () => {
    state.selectedIcons = [];
    renderIconCatalog();
    refreshStudioOutput();
  });

  document
    .getElementById("input-icon-search")
    ?.addEventListener("input", (e) => {
      state.iconSearchQuery = e.target.value;
      renderIconCatalog();
    });

  document
    .getElementById("input-theme-search")
    ?.addEventListener("input", (e) => {
      state.themeSearchQuery = e.target.value;
      renderThemeGrid();
    });

  const bindCheck = (id, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("change", (e) => {
      state[key] = e.target.checked;
      refreshStudioOutput();
    });
  };

  bindCheck("check-show-stats", "showStats");
  bindCheck("check-show-streak", "showStreak");
  bindCheck("check-show-langs", "showTopLangs");
  bindCheck("check-show-pinned", "showPinned");
  bindCheck("check-show-visitor", "showVisitor");
  bindCheck("check-show-trophies", "showTrophies");
  bindCheck("check-show-quotes", "showQuotes");
  bindCheck("check-hide-border", "hideBorder");
  bindCheck("check-show-watermark", "showWatermark");

  document
    .getElementById("select-langs-layout")
    ?.addEventListener("change", (e) => {
      state.langsLayout = e.target.value;
      refreshStudioOutput();
    });

  document
    .getElementById("select-quote-layout")
    ?.addEventListener("change", (e) => {
      state.quoteLayout = e.target.value;
      refreshStudioOutput();
    });

  const btnPreview = document.getElementById("tab-btn-preview");
  const btnMarkdown = document.getElementById("tab-btn-markdown");
  const previewPane = document.getElementById("live-readme-preview");
  const rawPane = document.getElementById("raw-markdown-output");

  btnPreview?.addEventListener("click", () => {
    btnPreview.classList.add("active");
    btnMarkdown?.classList.remove("active");
    previewPane?.classList.remove("hidden");
    rawPane?.classList.add("hidden");
  });

  btnMarkdown?.addEventListener("click", () => {
    btnMarkdown.classList.add("active");
    btnPreview?.classList.remove("active");
    rawPane?.classList.remove("hidden");
    previewPane?.classList.add("hidden");
  });

  rawPane?.addEventListener("input", (e) => {
    if (previewPane) {
      previewPane.innerHTML = renderGitHubMarkdownToHtml(e.target.value);
    }
  });

  const btnGhCanvas = document.getElementById("btn-toggle-gh-canvas");
  btnGhCanvas?.addEventListener("click", () => {
    previewPane?.classList.toggle("gh-light");
    const isLight = previewPane?.classList.contains("gh-light");
    btnGhCanvas.innerHTML = isLight
      ? `<i class="fa-solid fa-sun"></i> GitHub Light Canvas`
      : `<i class="fa-solid fa-circle-half-stroke"></i> GitHub Dark Canvas`;
  });

  const btnUiTheme = document.getElementById("btn-toggle-ui-theme");
  btnUiTheme?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    btnUiTheme.innerHTML = isLight
      ? `<i class="fa-solid fa-sun"></i>`
      : `<i class="fa-solid fa-moon"></i>`;
  });

  const baseUrlInput = document.getElementById("input-base-url");
  if (baseUrlInput) {
    baseUrlInput.value = window.location.origin;
    baseUrlInput.addEventListener("input", (e) => {
      const cleaned = e.target.value.trim().replace(/\/+$/, "");
      state.baseUrl = cleaned || window.location.origin;
      refreshStudioOutput();
    });
  }

  document
    .getElementById("btn-reset-base-url")
    ?.addEventListener("click", () => {
      state.baseUrl = window.location.origin;
      if (baseUrlInput) baseUrlInput.value = window.location.origin;
      refreshStudioOutput();
      showToast("Reset to current host URL");
    });

  document.getElementById("btn-copy-md")?.addEventListener("click", () => {
    const md = document.getElementById("raw-markdown-output")?.value || "";
    navigator.clipboard.writeText(md);
    showToast("Copied README.md to clipboard!");
  });

  document.getElementById("btn-download-md")?.addEventListener("click", () => {
    const md = document.getElementById("raw-markdown-output")?.value || "";
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded README.md!");
  });

  // Plug & Play Custom Theme Creator
  const pickers = [
    { picker: "picker-custom-title", input: "color-custom-title" },
    { picker: "picker-custom-text", input: "color-custom-text" },
    { picker: "picker-custom-icon", input: "color-custom-icon" },
    { picker: "picker-custom-bg", input: "color-custom-bg" },
    { picker: "picker-custom-border", input: "color-custom-border" },
  ];

  pickers.forEach(({ picker, input }) => {
    const pEl = document.getElementById(picker);
    const iEl = document.getElementById(input);
    pEl?.addEventListener("input", (e) => {
      if (iEl) iEl.value = e.target.value.replace("#", "");
    });
    iEl?.addEventListener("input", (e) => {
      const val = e.target.value.trim().replace("#", "");
      if (pEl && val.length === 6) pEl.value = "#" + val;
    });
  });

  document
    .getElementById("btn-apply-custom-theme")
    ?.addEventListener("click", () => {
      const title_color =
        document
          .getElementById("color-custom-title")
          ?.value.trim()
          .replace("#", "") || "70a5fd";
      const text_color =
        document
          .getElementById("color-custom-text")
          ?.value.trim()
          .replace("#", "") || "38bdae";
      const icon_color =
        document
          .getElementById("color-custom-icon")
          ?.value.trim()
          .replace("#", "") || "bf91f3";
      const bg_color =
        document
          .getElementById("color-custom-bg")
          ?.value.trim()
          .replace("#", "") || "1a1b27";
      const border_color =
        document
          .getElementById("color-custom-border")
          ?.value.trim()
          .replace("#", "") || "2a2e40";

      state.customColors = {
        title_color,
        text_color,
        icon_color,
        bg_color,
        border_color,
      };
      renderActiveThemeInspector();
      refreshStudioOutput();
      showToast("Plugged in custom palette live across all cards!");
    });

  document
    .getElementById("btn-reset-custom-theme")
    ?.addEventListener("click", () => {
      state.customColors = null;
      renderActiveThemeInspector();
      refreshStudioOutput();
      showToast("Unplugged custom palette - restored theme default");
    });

  document
    .getElementById("btn-export-theme-json")
    ?.addEventListener("click", () => {
      const title_color =
        document
          .getElementById("color-custom-title")
          ?.value.trim()
          .replace("#", "") || "70a5fd";
      const text_color =
        document
          .getElementById("color-custom-text")
          ?.value.trim()
          .replace("#", "") || "38bdae";
      const icon_color =
        document
          .getElementById("color-custom-icon")
          ?.value.trim()
          .replace("#", "") || "bf91f3";
      const bg_color =
        document
          .getElementById("color-custom-bg")
          ?.value.trim()
          .replace("#", "") || "1a1b27";
      const border_color =
        document
          .getElementById("color-custom-border")
          ?.value.trim()
          .replace("#", "") || "2a2e40";

      const json = JSON.stringify(
        {
          custom_palette: {
            title_color,
            text_color,
            icon_color,
            bg_color,
            border_color,
          },
        },
        null,
        2,
      );

      navigator.clipboard.writeText(json);
      showToast("Theme JSON copied! Plug into themes/index.js or your cards.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDomainTemplates();
  renderIconProviders();
  renderShapeSelect();
  renderIconCategories();
  renderIconCatalog();
  renderThemeGrid();
  renderActiveThemeInspector();
  renderRepoChecklist();
  bindEvents();
  refreshStudioOutput();
  loadThemesFromApi();

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const paramUser = urlParams.get("username") || urlParams.get("user");
    const storedUser = localStorage.getItem("readme_stats_username");
    const initialUser = (paramUser || storedUser || "").trim();

    if (initialUser) {
      const input = document.getElementById("input-github-username");
      if (input) input.value = initialUser;
      handleGitHubAutoFetch();
    }
  } catch {
    // Quiet fallback
  }
});
