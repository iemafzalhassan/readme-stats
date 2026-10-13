import { themes } from "../themes/index.js";

export default async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Cache-Control",
    "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
  );

  if (req.query && req.query.full === "true") {
    return res.status(200).json(themes);
  }

  return res.status(200).json(Object.keys(themes));
};
