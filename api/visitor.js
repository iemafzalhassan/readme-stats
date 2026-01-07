import axios from "axios";
import { renderError } from "../src/common/render.js";
import { themes } from "../themes/index.js";

export default async (req, res) => {
  const {
    username,
    label = "VISITORS",
    theme,
    color,
    style = "flat",
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    `max-age=0, no-cache, no-store, must-revalidate`,
  );

  try {
    let finalColor = color || "05CCCD";

    // Theme handling: Map theme to a specific color (e.g., icon_color)
    if (theme && themes[theme]) {
      finalColor = themes[theme].icon_color;
    }

    // visitorbadge.io expects standard hex without # for some endpoints, or standard params.
    // The previous implementation used `api.visitorbadge.io/api/visitors`.
    // It accepts `countColor`, `style` (flat, plastic, flat-square, for-the-badge, social).

    // Ensure hex format is clean (remove # if present, though URL param usually handles it)
    finalColor = finalColor.replace("#", "");

    const targetUrl = `https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2F${username}&label=${encodeURIComponent(label)}&countColor=%23${finalColor}&style=${style}`;

    const response = await axios.get(targetUrl, {
      responseType: "arraybuffer",
    });
    return res.send(response.data);
  } catch {
    return res.send(renderError({ message: "Visitor API Error" }));
  }
};
