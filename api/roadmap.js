import axios from "axios";

const ROADMAP_SLUGS = {
  devops: "devops",
  "data-engineer": "data-engineer",
  "ai-ml": "ai-engineer",
  mlops: "mlops",
  "platform-sre": "devops",
  security: "cyber-security",
  devsecops: "devsecops",
  fullstack: "full-stack",
  backend: "backend",
  frontend: "frontend",
  principal: "software-architect",
};

export default async (req, res) => {
  const { domain = "devops", apiKey = "" } = req.query;
  const slug = ROADMAP_SLUGS[domain] || domain;
  const token = apiKey || process.env.ROADMAP_SH_API_KEY || "";

  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Cache-Control",
    "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600",
  );

  try {
    const headers = {
      Accept: "application/json",
      "User-Agent": "readme-stats-studio",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Attempt fetching official roadmap.sh JSON structure from developer-roadmap open data
    const url = `https://raw.githubusercontent.com/kamranahmedse/developer-roadmap/master/src/data/roadmaps/${encodeURIComponent(slug)}/${encodeURIComponent(slug)}.json`;
    const response = await axios.get(url, { headers, timeout: 4500 });

    const nodes = Array.isArray(response.data?.nodes)
      ? response.data.nodes
          .map((n) => n?.data?.label)
          .filter(
            (lbl) =>
              typeof lbl === "string" && lbl.length > 1 && lbl.length < 28,
          )
      : [];

    return res.status(200).json({
      source: "roadmap.sh",
      slug,
      authenticated: Boolean(token),
      roadmapUrl: `https://roadmap.sh/${slug}`,
      topicsCount: nodes.length,
      topics: [...new Set(nodes)].slice(0, 80),
    });
  } catch {
    return res.status(200).json({
      source: "roadmap.sh-curated",
      slug,
      authenticated: Boolean(token),
      roadmapUrl: `https://roadmap.sh/${slug}`,
      topicsCount: 0,
      topics: [],
    });
  }
};
