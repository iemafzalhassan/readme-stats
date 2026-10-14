<div align="center">
  <img src="./frontend/assets/favicon.svg" width="90" alt="readme-stats Logo" />
  <h1 style="font-size: 32px; margin: 12px 0 6px;">readme-stats · Studio v2.1</h1>
  <p><b>Dynamic GitHub stats, contribution streaks, top languages, trophies, tech stack badges, and interactive profile studio for your README.</b></p>

  <p>
    <a href="https://readme-stats-olive-nu.vercel.app">
      <img src="https://img.shields.io/badge/Launch%20Live%20Studio-Studio%20v2.1-6366f1?style=for-the-badge&logo=rocket&logoColor=white" alt="Launch Live Studio" />
    </a>
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiemafzalhassan%2Freadme-stats&env=PAT_1&project-name=readme-stats">
      <img src="https://img.shields.io/badge/Deploy%20to-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Deploy to Vercel" />
    </a>
  </p>

  <p>
    <a href="https://github.com/iemafzalhassan/readme-stats/actions">
      <img alt="Tests Passing" src="https://img.shields.io/badge/tests-27%20passed%20%7C%20242%20tests-10b981?style=flat-square&logo=jest" />
    </a>
    <a href="https://github.com/iemafzalhassan/readme-stats/releases">
      <img alt="Release" src="https://img.shields.io/badge/release-v0.2.0-38bdf8?style=flat-square&logo=github" />
    </a>
    <a href="https://github.com/iemafzalhassan/readme-stats/blob/main/LICENSE">
      <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" />
    </a>
    <a href="https://github.com/iemafzalhassan/readme-stats/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/iemafzalhassan/readme-stats?style=flat-square&color=6366f1" />
    </a>
    <a href="https://readme-stats-olive-nu.vercel.app">
      <img alt="Hobby Tier Ready" src="https://img.shields.io/badge/Vercel%20Hobby-11%20Functions%20(Under%2012)-success?style=flat-square&logo=vercel" />
    </a>
  </p>

  <p>
    <a href="#-interactive-studio-v21">Interactive Studio</a> ·
    <a href="#-svg-cards-catalog">Card Catalog</a> ·
    <a href="#-themes--custom-palettes">Themes & Customization</a> ·
    <a href="#-1-click-self-hosting-on-vercel">Self-Hosting</a> ·
    <a href="#-local-development">Development</a>
  </p>
</div>

---

## ⚡ What is readme-stats?

**readme-stats** is a free, high-performance, open-source serverless telemetry suite designed to dynamically generate real-time vector SVG cards for your GitHub profile README, portfolio websites, and developer dashboards.

With **Studio v2.1**, it brings an interactive, mobile-responsive web studio to your browser: scan your GitHub profile, pick from 10 role blueprints (DevOps, SRE, MLOps, Full-Stack, etc.), configure 80+ tech stack emblems across 4 icon providers, choose from 76+ themes or craft a custom palette with live color pickers, and export ready-to-paste GitHub Markdown with a single click.

### Key Highlights
- **100% Free & Independent**: Zero third-party watermarks, zero vendor lock-in.
- **Interactive Web Studio**: Live GitHub profile scanner, role fit score, blueprint generator, and instant markdown preview.
- **10 Serverless Card Types**: Stats, streaks, top languages, pinned repositories, gists, trophies, quotes, visitor counter, and tech stack badges.
- **76+ Themes & Live Theme Studio**: Built-in themes plus a **Plug & Play Custom Palette Builder** with live preview and 1-click reset.
- **Vercel Hobby Tier Compatible**: Architected with consolidated studio dispatchers to stay under the Vercel Hobby 12-function limit (currently 11 functions).
- **Rock-Solid Test Coverage**: 27 test suites and 242 tests running on Node.js ES Modules with strict coverage gates.

---

## 🚀 Interactive Studio (v2.1)

You can generate your entire profile README visually without writing markdown by hand!

👉 **[Launch readme-stats Studio Live](https://readme-stats-olive-nu.vercel.app)**

```
┌────────────────────────────────────────────────────────────────────────┐
│ readme-stats STUDIO v2.1          [🌙]  [Fork]  [Copy .md] [Download] │
├────────────────────────────────────────────────────────────────────────┤
│ github.com/ [ username ]      [ 10 repos ]      [ ✨ Auto-Fetch ]      │
├───────────────────────────────────┬────────────────────────────────────┤
│ 1. Blueprint (10 Role Tracks)     │ 👁️ Live GitHub Markdown Preview   │
│ 2. Profile & Socials              │    - Terminal whoami YAML block    │
│ 3. Tech Stack (80+ Icons)         │    - Cloud & IaC Badges Card       │
│ 4. Themes (76+ & Custom Creator)  │    - Stats + Streak + Languages    │
│ 5. Telemetry Cards & Add-ons      │    - Featured Repositories         │
└───────────────────────────────────┴────────────────────────────────────┘
```

1. **Auto-Scan Profile**: Type your GitHub username and click **Auto-Fetch**. It automatically pulls your public repos, languages, bio, company, and calculates your Role Fit Score.
2. **Select Domain Blueprint**: Pick from curated engineering tracks:
   - ☁️ *DevOps & Cloud Architect*
   - 🛡️ *SRE & Platform Engineer*
   - 🔐 *DevSecOps & Cyber Security*
   - 📊 *Data Engineer & Lakehouse*
   - 🤖 *AIOps / MLOps & AI Systems*
   - 💻 *Software Developer / Full-Stack*
   - 🏛️ *Principal / Staff Engineer*
   - 💼 *CTO / Founder*
   - 🌐 *OSS Maintainer & Contributor*
   - 🧘 *Minimalist Zen*
3. **Customize Stack**: Choose from 4 icon providers (*Skillicons, Devicon, Custom SVG Engine, SimpleIcons*).
4. **Export**: Click **Copy .md** or **Download .md** to save your `README.md`.

---

## 📊 SVG Cards Catalog

All cards are rendered dynamically as crisp SVGs that look razor-sharp on Retina displays and automatically adapt to dark/light GitHub themes.

### 1. GitHub Stats Card (`/api`)

Displays total stars, total commits, pull requests, issues, contribution counts, and an algorithmic rank badge.

```md
[![Anurag's GitHub stats](https://readme-stats-olive-nu.vercel.app/api?username=anuraghazra&show_icons=true&theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api?username=anuraghazra&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</p>

#### Common Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | *(required)* | Your GitHub handle (e.g. `torvalds`) |
| `theme` | `string` | `default` | Any of the 76+ themes (e.g. `tokyonight`, `dracula`, `catppuccin_mocha`) |
| `show_icons` | `boolean` | `false` | Displays visual icons next to each metric |
| `hide_border` | `boolean` | `false` | Removes the outer card border |
| `hide_rank` | `boolean` | `false` | Hides the global rank badge circle |
| `include_all_commits`| `boolean` | `false` | Counts all historical commits instead of just the past year |
| `commits_year` | `number` | `current` | Filter commits count to a specific year (e.g. `2024`) |
| `hide` | `string` | `""` | Comma-separated list to hide: `stars,commits,prs,issues,contribs` |
| `show` | `string` | `""` | Comma-separated extra metrics: `reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage` |
| `card_width` | `number` | auto | Custom width for the card in pixels |
| `border_radius` | `number` | `4.5` | Corner rounding radius |
| `locale` | `string` | `en` | Translation locale (supports 30+ languages: `es`, `fr`, `de`, `ja`, etc.) |

---

### 2. GitHub Streak Card (`/api/streak`)

Visualizes your total contributions, current daily contribution streak, and all-time longest streak.

```md
[![GitHub Streak](https://readme-stats-olive-nu.vercel.app/api/streak?username=anuraghazra&theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/streak?username=anuraghazra&theme=tokyonight" alt="GitHub Streak" />
</p>

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | *(required)* | GitHub handle |
| `theme` | `string` | `default` | Color theme |
| `hide_border` | `boolean` | `false` | Toggle border visibility |
| `hide_title` | `boolean` | `false` | Toggle card title |

---

### 3. Top Languages Card (`/api/top-langs`)

Calculates programming language distribution across your public repositories with support for compact, normal, donut, and pie charts.

```md
[![Top Langs](https://readme-stats-olive-nu.vercel.app/api/top-langs?username=anuraghazra&layout=compact&theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/top-langs?username=anuraghazra&layout=compact&theme=tokyonight" alt="Top Languages Compact" />
</p>

#### Layout Options

```md
<!-- Donut Chart -->
https://readme-stats-olive-nu.vercel.app/api/top-langs?username=anuraghazra&layout=donut&theme=tokyonight

<!-- Pie Chart -->
https://readme-stats-olive-nu.vercel.app/api/top-langs?username=anuraghazra&layout=pie&theme=tokyonight
```

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `layout` | `string` | `normal` | Options: `normal`, `compact`, `donut`, `donut-vertical`, `pie` |
| `langs_count` | `number` | `5` | Maximum number of languages to display (1–20) |
| `exclude_repo` | `string` | `""` | Comma-separated repositories to exclude from calculations |
| `hide` | `string` | `""` | Comma-separated languages to hide (e.g. `html,css`) |
| `hide_progress` | `boolean` | `false` | Hides percentage progress bars |

---

### 4. Pinned Repository Card (`/api/pin`)

Pin any public repository to your README in a sleek card showing stars, forks, language, and repository description.

```md
[![Pinned Repo](https://readme-stats-olive-nu.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&theme=tokyonight" alt="Pinned Repo" />
</p>

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | *(required)* | Owner of the repository |
| `repo` | `string` | *(required)* | Repository name |
| `show_owner` | `boolean` | `false` | Displays the owner's handle in the title |

---

### 5. GitHub Achievements & Trophies (`/api/trophies`)

Generates achievement tier badges (SSS, SS, S, AAA, AA, A) based on repositories, stars, forks, and followers.

```md
[![Trophies](https://readme-stats-olive-nu.vercel.app/api/trophies?username=anuraghazra&theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/trophies?username=anuraghazra&theme=tokyonight" alt="Trophies" />
</p>

---

### 6. Geometric Tech Stack Badges (`/api/badges`)

Renders your architecture and toolchain inside geometric vector frames (hexagon, squircle, circle, pill, or glassmorphic).

```md
<img src="https://readme-stats-olive-nu.vercel.app/api/badges?icons=docker,kubernetes,terraform,aws,go,linux&shape=hexagon&theme=tokyonight" alt="Tech Stack" />
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/badges?icons=docker,kubernetes,terraform,aws,go,linux&shape=hexagon&theme=tokyonight" alt="Tech Stack Badges" />
</p>

| Shape | Description |
| :--- | :--- |
| `hexagon` | Cybernetic hexagonal matrix with theme stroke accents *(default)* |
| `squircle` | Tinted iOS-style squircle badges |
| `circle` | Clean orbital circular icons |
| `pill` | Neon cyber pill badges |
| `glass` | Glassmorphic semi-transparent tiles |

---

### 7. Developer Quotes Card (`/api/quotes`)

Displays curated engineering quotes from pioneers like Linus Torvalds, Grace Hopper, Martin Fowler, and Ken Thompson.

```md
[![Quote](https://readme-stats-olive-nu.vercel.app/api/quotes?theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/quotes?theme=tokyonight" alt="Developer Quote" />
</p>

---

### 8. Profile Views & Visitor Counter (`/api/visitor`)

Track real-time profile visits with a customizable SVG badge.

```md
<img src="https://readme-stats-olive-nu.vercel.app/api/visitor?username=anuraghazra&label=PROFILE%20VIEWS&style=flat-square&theme=tokyonight" alt="Visitors" />
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/visitor?username=anuraghazra&label=PROFILE%20VIEWS&style=flat-square&theme=tokyonight" alt="Profile Views" />
</p>

---

### 9. WakaTime Coding Stats (`/api/wakatime`)

Displays your weekly programming time tracked via WakaTime.

```md
[![Wakatime](https://readme-stats-olive-nu.vercel.app/api/wakatime?username=anuraghazra&theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

---

## 🎨 Themes & Custom Palettes

### Built-in Themes (76+ Available)
Apply any theme by adding `&theme=NAME`. Popular palettes include:

| Theme Name | Preview Palette |
| :--- | :--- |
| `tokyonight` | Deep Navy `#1a1b27`, Cyber Blue `#70a5fd`, Teal `#38bdae`, Purple `#bf91f3` |
| `dracula` | Dark Purple `#282a36`, Pink `#ff6e96`, Cyan `#79dafa` |
| `catppuccin_mocha` | Mocha `#1e1e2e`, Mauve `#cba6f7`, Teal `#94e2d5` |
| `radical` | Deep Violet `#141321`, Hot Pink `#fe428e`, Gold `#f8d847` |
| `gruvbox` | Dark Brown `#282828`, Yellow `#fabd2f`, Aqua `#8ec07c` |
| `github_dark` | GitHub Canvas `#0d1117`, Blue `#58a6ff`, Muted Gray `#c3d1d9` |
| `onedark` | Atom Dark `#282c34`, Amber `#e4bf7a`, Red `#df6d74` |
| `nord` | Arctic Blue `#2e3440`, Frost `#88c0d0`, Snow `#e5e9f0` |
| `transparent` | Transparent background, optimized for dark & light GitHub profiles |

👉 *Browse all available themes in [`themes/index.js`](./themes/index.js) or via the [Studio Theme Tab](https://readme-stats-olive-nu.vercel.app).*

---

### Plug & Play Custom Themes (Zero-Code Customization)

You can pass custom hex colors directly in the card URL to create your own unique palette without modifying any code:

```md
https://readme-stats-olive-nu.vercel.app/api?username=torvalds&title_color=6366f1&text_color=e2e8f0&icon_color=38bdf8&bg_color=09090b&border_color=27272a
```

| Query Parameter | Description | Example |
| :--- | :--- | :--- |
| `&title_color=` | Header and title text color | `6366f1` |
| `&text_color=` | Body and stats metric color | `e2e8f0` |
| `&icon_color=` | Icon and indicator color | `38bdf8` |
| `&bg_color=` | Background color (or gradient: `45,09090b,18181b`) | `09090b` |
| `&border_color=` | Outer card border outline color | `27272a` |

> 💡 **Studio Custom Theme Creator**: Open the [Live Studio](https://readme-stats-olive-nu.vercel.app), navigate to the **Themes** tab, use the 5 visual color pickers, and click **Apply Custom Palette** to preview your custom theme live! Click **Copy Theme JSON** to export your palette.

---

### Responsive GitHub Dark/Light Mode Switching

To make your cards automatically toggle based on the viewer's GitHub appearance setting:

```md
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://readme-stats-olive-nu.vercel.app/api?username=anuraghazra&show_icons=true&theme=tokyonight" />
  <source media="(prefers-color-scheme: light)" srcset="https://readme-stats-olive-nu.vercel.app/api?username=anuraghazra&show_icons=true&theme=default" />
  <img src="https://readme-stats-olive-nu.vercel.app/api?username=anuraghazra&show_icons=true" alt="GitHub Stats" />
</picture>
```

---

## 🚀 1-Click Self-Hosting on Vercel

If you want to track private repository contributions or run an unmetered personal instance with your own GitHub Personal Access Token (PAT):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiemafzalhassan%2Freadme-stats&env=PAT_1&project-name=readme-stats)

### Step-by-Step Instructions

1. **Fork this repository** to your GitHub account.
2. **Generate a GitHub Personal Access Token**:
   - Go to [GitHub Settings -> Developer Settings -> Personal access tokens (classic)](https://github.com/settings/tokens).
   - Generate a token with the `repo` scope (for private repositories) or `read:user` (for public-only).
3. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com/) and click **Add New Project**.
   - Select your forked `readme-stats` repository.
   - In **Environment Variables**, add:
     - `PAT_1`: Your personal access token from step 2.
4. **Click Deploy** 🎉. Your private instance is now ready!

### Serverless Function Limit (Vercel Hobby Tier)
> [!NOTE]
> Vercel Hobby accounts have a limit of **12 serverless functions per project**.
> This codebase consolidates secondary endpoints (`/api/badges`, `/api/trophies`, `/api/quotes`, etc.) into a unified dispatcher (`api/studio.js`), keeping the total function count at **11 functions**. It deploys to Vercel Hobby accounts cleanly out of the box!

### Supported Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PAT_1`, `PAT_2`, ... | GitHub Personal Access Tokens (used with round-robin load balancing) | *Required for private stats* |
| `CACHE_SECONDS` | Default cache TTL in seconds for all generated cards | `86400` (24h) |
| `WHITELIST` | Comma-separated usernames allowed to query your instance | *All allowed* |
| `EXCLUDE_REPO` | Repositories to exclude from stats across all cards | `""` |
| `FETCH_MULTI_PAGE_STARS` | Enables multi-page fetching for users with >100 starred repositories | `false` |

---

## 🛠️ Local Development

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/iemafzalhassan/readme-stats.git
cd readme-stats

# Install dependencies
npm install

# Start local server on port 9000
npm run dev
```

Visit `http://localhost:9000` to open the Studio, or test endpoints directly at `http://localhost:9000/api?username=anuraghazra`.

### Running Tests & Linting

```bash
# Run full Jest test suite (27 suites, 242 tests)
npm test

# Run tests in watch mode
npm run test:watch

# Update snapshots
npm run test:update:snapshot

# Check code formatting & linting
npm run lint
npm run format:check
```

---

## 🤝 Contributing

Contributions are warmly welcomed!

- **Found a bug?** Open an [Issue](https://github.com/iemafzalhassan/readme-stats/issues).
- **Want to add a theme?** Submit a PR updating [`themes/index.js`](./themes/index.js) and preview it in the studio.
- **Want to improve the studio?** Check out [`frontend/`](./frontend/).

---

## 📄 License

This project is open-source software licensed under the **[MIT License](./LICENSE)**. Free to fork, host, modify, and distribute.

<div align="center">
  <sub>Built with ❤️ and JavaScript · Maintained as an independent open-source hobby project.</sub>
</div>
