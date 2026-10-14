<div align="center">
  <img src="./frontend/assets/favicon.svg" width="80" alt="readme-stats Logo" />
  <h1>readme-stats</h1>
  <p><b>Dynamic GitHub stats, contribution streak, top languages, trophies, tech stack badges, and interactive profile studio for your README.</b></p>

  <p>
    <a href="https://readme-stats-olive-nu.vercel.app">
      <img src="https://img.shields.io/badge/Launch%20Studio-Live%20Demo-6366f1?style=flat-square&logo=rocket&logoColor=white" alt="Launch Live Studio" />
    </a>
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiemafzalhassan%2Freadme-stats&env=PAT_1&project-name=readme-stats">
      <img src="https://img.shields.io/badge/Deploy%20with-Vercel-black?style=flat-square&logo=vercel&logoColor=white" alt="Deploy to Vercel" />
    </a>
    <a href="https://github.com/iemafzalhassan/readme-stats/actions">
      <img alt="Tests" src="https://img.shields.io/badge/tests-27%20passed%20%7C%20242%20tests-10b981?style=flat-square&logo=jest" />
    </a>
    <a href="https://github.com/iemafzalhassan/readme-stats/releases">
      <img alt="Release" src="https://img.shields.io/badge/release-v0.2.0-38bdf8?style=flat-square&logo=github" />
    </a>
    <a href="https://github.com/iemafzalhassan/readme-stats/blob/main/LICENSE">
      <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" />
    </a>
  </p>
</div>

---

## Features

- **GitHub Stats Card**: Total stars, commits, PRs, issues, and rank.
- **Contribution Streak Card**: Track current streaks, longest streaks, and total contributions.
- **Top Languages Card**: Compact bars, donut charts, and pie charts of languages used across public repositories.
- **Pinned Repository Card**: Embed repo details (stars, forks, description, primary language) directly in markdown.
- **Achievements & Trophies**: Tier badges based on account milestones.
- **Tech Stack Badges**: Clean geometric frames (hexagon, squircle, circle, pill, glass) for tools and technologies.
- **Developer Quotes & Visitor Counter**: Daily engineering quotes and profile visitor counters.
- **Interactive Profile Studio**: Visual web UI to configure blueprints, icons, cards, and export markdown.
- **76+ Built-in Themes & Custom Palettes**: Choose from pre-made themes or pass custom hex colors via URL query parameters.
- **Vercel Hobby Tier Compatible**: 1-click self-hosting with all endpoints consolidated into 11 serverless functions.

---

## Live Profile Studio

You can design and preview your entire profile visually using the web studio:

👉 **[https://readme-stats-olive-nu.vercel.app](https://readme-stats-olive-nu.vercel.app)**

- Auto-fetch public profile repositories and languages.
- Choose from 10 role blueprints (DevOps, SRE, MLOps, Full-Stack, Data, Minimal, etc.).
- Pick stack icons across 4 providers (Skillicons, Shields, Iconify, Custom SVG).
- Custom Theme Builder with live color pickers and instant preview.
- Copy or download ready-to-use GitHub profile `README.md`.

---

## Cards Catalog & Examples

### 1. GitHub Stats Card

Add dynamic stats to your README by passing your GitHub username:

```md
[![Anurag's GitHub stats](https://readme-stats-olive-nu.vercel.app/api?username=anuraghazra&show_icons=true&theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api?username=anuraghazra&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</p>

#### Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | *(required)* | GitHub handle |
| `theme` | `string` | `default` | Name of theme (e.g. `tokyonight`, `dracula`, `catppuccin_mocha`) |
| `show_icons` | `boolean` | `false` | Display icons beside stats |
| `hide_border` | `boolean` | `false` | Hide the card outline border |
| `hide_rank` | `boolean` | `false` | Hide the rank badge circle |
| `include_all_commits` | `boolean` | `false` | Count all-time commits instead of last year |
| `commits_year` | `number` | `current` | Target specific year commits (e.g. `2024`) |
| `hide` | `string` | `""` | Comma-separated stats to hide: `stars,commits,prs,issues,contribs` |
| `show` | `string` | `""` | Additional stats: `reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage` |
| `card_width` | `number` | auto | Custom width in pixels |
| `border_radius` | `number` | `4.5` | Corner radius |
| `locale` | `string` | `en` | Translation language code (`es`, `fr`, `de`, `ja`, etc.) |

---

### 2. GitHub Streak Card

Visualizes total contributions, current daily contribution streak, and longest streak:

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
| `hide_border` | `boolean` | `false` | Hide card border |
| `hide_title` | `boolean` | `false` | Hide card title |

---

### 3. Top Languages Card

Calculates language distribution across public repositories:

```md
[![Top Langs](https://readme-stats-olive-nu.vercel.app/api/top-langs?username=anuraghazra&layout=compact&theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/top-langs?username=anuraghazra&layout=compact&theme=tokyonight" alt="Top Languages Compact" />
</p>

#### Layout Options

- **Compact progress bar**: `&layout=compact`
- **Donut chart**: `&layout=donut`
- **Pie chart**: `&layout=pie`
- **Vertical donut**: `&layout=donut-vertical`
- **Standard list**: `&layout=normal`

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | *(required)* | GitHub handle |
| `layout` | `string` | `normal` | Chart layout style |
| `langs_count` | `number` | `5` | Maximum number of languages to show (1–20) |
| `exclude_repo` | `string` | `""` | Comma-separated repos to ignore |
| `hide` | `string` | `""` | Comma-separated language names to hide |
| `hide_progress` | `boolean` | `false` | Hide percentage bars |

---

### 4. Pinned Repository Card

Pin public repositories with stars, forks, and language badges:

```md
[![Pinned Repo](https://readme-stats-olive-nu.vercel.app/api/pin?username=iemafzalhassan&repo=readme-stats&theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/pin?username=iemafzalhassan&repo=readme-stats&theme=tokyonight" alt="Pinned Repo" />
</p>

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | *(required)* | Repository owner |
| `repo` | `string` | *(required)* | Repository name |
| `show_owner` | `boolean` | `false` | Display owner handle in title |

---

### 5. GitHub Achievements & Trophies

Generates achievement tier badges based on stars, commits, followers, and repositories:

```md
[![Trophies](https://readme-stats-olive-nu.vercel.app/api/trophies?username=anuraghazra&theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/trophies?username=anuraghazra&theme=tokyonight" alt="Trophies" />
</p>

---

### 6. Tech Stack Badges

Display architecture and toolchain icons in vector frames:

```md
<img src="https://readme-stats-olive-nu.vercel.app/api/badges?icons=docker,kubernetes,terraform,aws,go,linux&shape=hexagon&theme=tokyonight" alt="Tech Stack" />
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/badges?icons=docker,kubernetes,terraform,aws,go,linux&shape=hexagon&theme=tokyonight" alt="Tech Stack Badges" />
</p>

| Shape | Description |
| :--- | :--- |
| `hexagon` | Hexagonal vector frames *(default)* |
| `squircle` | Rounded squircle tiles |
| `circle` | Clean circular icons |
| `pill` | Capsule pill badges |
| `glass` | Translucent glassmorphic tiles |

---

### 7. Developer Quotes Card

Curated engineering quotes from pioneers and software leaders:

```md
[![Quote](https://readme-stats-olive-nu.vercel.app/api/quotes?theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/quotes?theme=tokyonight" alt="Developer Quote" />
</p>

---

### 8. Profile Views & Visitor Counter

Count page visits on your profile README or site:

```md
<img src="https://readme-stats-olive-nu.vercel.app/api/visitor?username=iemafzalhassan&label=PROFILE%20VIEWS&style=flat-square&theme=tokyonight" alt="Visitors" />
```

<p align="center">
  <img src="https://readme-stats-olive-nu.vercel.app/api/visitor?username=iemafzalhassan&label=PROFILE%20VIEWS&style=flat-square&theme=tokyonight" alt="Profile Views" />
</p>

---

### 9. WakaTime Coding Stats

Weekly coding activity tracked via WakaTime:

```md
[![Wakatime](https://readme-stats-olive-nu.vercel.app/api/wakatime?username=anuraghazra&theme=tokyonight)](https://github.com/iemafzalhassan/readme-stats)
```

---

## Themes & Customization

### Built-in Themes

Pass `&theme=THEME_NAME` to any card endpoint. Available themes include:

| Theme | Preview Colors |
| :--- | :--- |
| `tokyonight` | Navy `#1a1b27`, Blue `#70a5fd`, Teal `#38bdae` |
| `dracula` | Dark `#282a36`, Pink `#ff6e96`, Cyan `#79dafa` |
| `catppuccin_mocha` | Mocha `#1e1e2e`, Mauve `#cba6f7`, Teal `#94e2d5` |
| `radical` | Violet `#141321`, Pink `#fe428e`, Gold `#f8d847` |
| `gruvbox` | Dark `#282828`, Yellow `#fabd2f`, Aqua `#8ec07c` |
| `github_dark` | Canvas `#0d1117`, Blue `#58a6ff`, Gray `#c3d1d9` |
| `onedark` | Atom Dark `#282c34`, Amber `#e4bf7a`, Red `#df6d74` |
| `nord` | Arctic `#2e3440`, Frost `#88c0d0`, Snow `#e5e9f0` |

Browse all 76+ themes in [`themes/index.js`](./themes/index.js) or test them in the [Live Studio](https://readme-stats-olive-nu.vercel.app).

---

### Custom Palette Overrides

You can pass custom hex colors directly via URL parameters without editing code:

```md
https://readme-stats-olive-nu.vercel.app/api?username=torvalds&title_color=6366f1&text_color=e2e8f0&icon_color=38bdf8&bg_color=09090b&border_color=27272a
```

| Parameter | Description | Example |
| :--- | :--- | :--- |
| `title_color` | Header / title text color | `6366f1` |
| `text_color` | Body and stats metric color | `e2e8f0` |
| `icon_color` | Icons and accent color | `38bdf8` |
| `bg_color` | Card background (hex or gradient: `deg,color1,color2`) | `09090b` |
| `border_color` | Border line color | `27272a` |

---

### Responsive Dark & Light Mode

To make cards switch automatically with the viewer's GitHub theme, wrap them in a `<picture>` element:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://readme-stats-olive-nu.vercel.app/api?username=iemafzalhassan&show_icons=true&theme=tokyonight" />
  <source media="(prefers-color-scheme: light)" srcset="https://readme-stats-olive-nu.vercel.app/api?username=iemafzalhassan&show_icons=true&theme=default" />
  <img src="https://readme-stats-olive-nu.vercel.app/api?username=iemafzalhassan&show_icons=true" alt="GitHub Stats" />
</picture>
```

---

## Deploy Your Own Instance (Vercel)

Deploying your own instance lets you track private repository stats and use your own GitHub token to avoid shared rate limits:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiemafzalhassan%2Freadme-stats&env=PAT_1&project-name=readme-stats)

1. **Fork this repository** to your GitHub account.
2. **Create a GitHub Personal Access Token (classic)**:
   - Go to [GitHub Settings → Personal access tokens](https://github.com/settings/tokens).
   - Create a token with `repo` (for private repos) or `read:user` (for public stats).
3. **Deploy on Vercel**:
   - Import your fork in [Vercel](https://vercel.com/).
   - Add environment variable `PAT_1` with your token.
4. **Deploy** 🎉.

### Environment Variables

| Variable | Description |
| :--- | :--- |
| `PAT_1`, `PAT_2`, ... | Personal Access Tokens (rotated automatically if multiple provided) |
| `CACHE_SECONDS` | Cache duration in seconds (default: `86400`) |
| `WHITELIST` | Comma-separated usernames allowed to use your instance |
| `EXCLUDE_REPO` | Repositories to exclude from stats calculations |
| `FETCH_MULTI_PAGE_STARS` | Set to `true` to fetch all stars if user has >100 starred repos |

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/iemafzalhassan/readme-stats.git
cd readme-stats

# Install dependencies
npm install

# Start local server on port 9000
npm run dev
```

Open `http://localhost:9000` to access the Studio.

### Running Tests

```bash
# Run Jest test suite
npm test

# Run linter & formatter check
npm run lint
npm run format:check
```

---

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
- Found a bug? Open an [Issue](https://github.com/iemafzalhassan/readme-stats/issues).
- Want to add a new theme? Add it to [`themes/index.js`](./themes/index.js) and open a PR.

---

## License

This project is licensed under the [MIT License](./LICENSE).
