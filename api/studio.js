import badgesHandler from "../src/studio/badges.js";
import iconHandler from "../src/studio/icon.js";
import roadmapHandler from "../src/studio/roadmap.js";
import themesHandler from "../src/studio/themes.js";
import trophiesHandler from "../src/studio/trophies.js";

const routes = {
  badges: badgesHandler,
  icon: iconHandler,
  roadmap: roadmapHandler,
  themes: themesHandler,
  trophies: trophiesHandler,
};

export default async (req, res) => {
  let endpoint = req.query?.endpoint;
  if (!endpoint && req.url) {
    const match = req.url.match(/\/api\/(badges|icon|roadmap|themes|trophies)/);
    if (match) {
      endpoint = match[1];
    }
  }

  const handler = routes[endpoint];
  if (handler) {
    return handler(req, res);
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  return res.end(
    JSON.stringify({ error: `Studio endpoint "${endpoint}" not found` }),
  );
};
