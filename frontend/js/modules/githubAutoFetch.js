import { ICON_CATALOG } from "./iconCatalog.js";

const LANGUAGE_TO_ICON = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  go: "go",
  rust: "rust",
  java: "java",
  "c++": "cpp",
  "c#": "csharp",
  kotlin: "kotlin",
  swift: "swift",
  ruby: "ruby",
  php: "php",
  shell: "bash",
  hcl: "terraform",
  dockerfile: "docker",
  html: "html5",
  css: "css3",
  vue: "vuejs",
  svelte: "svelte",
};

const KEYWORD_TO_ICON = {
  docker: "docker",
  kubernetes: "kubernetes",
  k8s: "kubernetes",
  terraform: "terraform",
  aws: "aws",
  gcp: "gcp",
  azure: "azure",
  ansible: "ansible",
  jenkins: "jenkins",
  "github-actions": "githubactions",
  argocd: "argocd",
  helm: "helm",
  prometheus: "prometheus",
  grafana: "grafana",
  nginx: "nginx",
  react: "react",
  nextjs: "nextjs",
  "next-js": "nextjs",
  vue: "vuejs",
  tailwind: "tailwindcss",
  nodejs: "nodejs",
  express: "express",
  nestjs: "nestjs",
  fastapi: "fastapi",
  django: "django",
  postgres: "postgresql",
  postgresql: "postgresql",
  mongodb: "mongodb",
  redis: "redis",
  kafka: "kafka",
  pytorch: "pytorch",
  tensorflow: "tensorflow",
  linux: "linux",
  devops: "docker",
};

export async function fetchGitHubUserIntelligence(username) {
  const cleanUser = (username || "").trim();
  if (!cleanUser) {
    throw new Error("Please enter a GitHub username.");
  }

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}`),
    fetch(
      `https://api.github.com/users/${encodeURIComponent(cleanUser)}/repos?sort=pushed&per_page=100`,
    ),
  ]);

  if (!userRes.ok) {
    throw new Error(
      userRes.status === 404
        ? `GitHub user "${cleanUser}" not found.`
        : `GitHub API rate limit or error (${userRes.status}).`,
    );
  }

  const profile = await userRes.json();
  const repos = reposRes.ok ? await reposRes.json() : [];
  const ownRepos = Array.isArray(repos) ? repos.filter((r) => !r.fork) : [];

  // Sort top repositories by stars + forks + recency
  const topRepos = [...ownRepos]
    .sort((a, b) => {
      const scoreA = (a.stargazers_count || 0) * 3 + (a.forks_count || 0) * 2;
      const scoreB = (b.stargazers_count || 0) * 3 + (b.forks_count || 0) * 2;
      return scoreB - scoreA;
    })
    .slice(0, 8)
    .map((r) => ({
      name: r.name,
      description: r.description || "Open-source project on GitHub",
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      language: r.language || "",
      url: r.html_url,
    }));

  // Aggregate languages & topics
  const detectedSet = new Set();
  const langCounts = {};

  ownRepos.forEach((repo) => {
    if (repo.language) {
      const langKey = repo.language.toLowerCase();
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      if (LANGUAGE_TO_ICON[langKey]) {
        detectedSet.add(LANGUAGE_TO_ICON[langKey]);
      }
    }

    const searchBlob = [
      repo.name || "",
      repo.description || "",
      ...(Array.isArray(repo.topics) ? repo.topics : []),
    ]
      .join(" ")
      .toLowerCase();

    Object.entries(KEYWORD_TO_ICON).forEach(([kw, iconId]) => {
      if (searchBlob.includes(kw)) {
        detectedSet.add(iconId);
      }
    });
  });

  // Always include git & github if very few detected
  detectedSet.add("git");
  detectedSet.add("linux");

  const validCatalogIds = new Set(ICON_CATALOG.map((i) => i.id));
  const detectedIcons = [...detectedSet].filter((id) =>
    validCatalogIds.has(id),
  );

  // Infer best matching domain persona
  const bioLower =
    `${profile.bio || ""} ${profile.company || ""}`.toLowerCase();
  let recommendedTemplate = "fullstack";

  if (
    bioLower.includes("devops") ||
    bioLower.includes("cloud") ||
    detectedSet.has("terraform") ||
    detectedSet.has("kubernetes")
  ) {
    recommendedTemplate =
      bioLower.includes("sre") || bioLower.includes("platform")
        ? "platform-sre"
        : "devops";
  } else if (
    bioLower.includes("cto") ||
    bioLower.includes("founder") ||
    bioLower.includes("ceo")
  ) {
    recommendedTemplate = "cto-founder";
  } else if (
    bioLower.includes("principal") ||
    bioLower.includes("staff") ||
    bioLower.includes("architect")
  ) {
    recommendedTemplate = "principal";
  } else if (
    bioLower.includes("ai") ||
    bioLower.includes("machine learning") ||
    detectedSet.has("pytorch")
  ) {
    recommendedTemplate = "ai-ml";
  } else if (
    (profile.public_repos || 0) > 40 &&
    (profile.followers || 0) > 50
  ) {
    recommendedTemplate = "oss-contributor";
  }

  // Calculate Profile Completeness / Readiness Score
  let score = 45;
  const tips = [];
  if (profile.name) score += 10;
  else tips.push("Add display name on GitHub");
  if (profile.bio) score += 12;
  else tips.push("Add a concise role bio");
  if (profile.blog) score += 8;
  else tips.push("Link portfolio or website");
  if (profile.twitter_username) score += 5;
  if (ownRepos.length >= 4) score += 10;
  if (detectedIcons.length >= 6) score += 10;

  const totalStars = ownRepos.reduce(
    (acc, r) => acc + (r.stargazers_count || 0),
    0,
  );

  return {
    username: profile.login || cleanUser,
    name: profile.name || profile.login || cleanUser,
    bio:
      profile.bio ||
      "Building resilient cloud-native systems and scalable developer tools.",
    company: profile.company || "",
    location: profile.location || "",
    blog: profile.blog || "",
    twitter: profile.twitter_username || "",
    avatarUrl: profile.avatar_url || "",
    followers: profile.followers || 0,
    publicRepos: profile.public_repos || 0,
    totalStars,
    topRepos,
    detectedIcons: detectedIcons.slice(0, 16),
    topLanguages: Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([l]) => l),
    recommendedTemplate,
    readinessScore: Math.min(score, 100),
    tips,
  };
}
