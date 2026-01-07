import { streakFetcher } from "../src/fetchers/streak-fetcher.js";
import { StreakCard } from "../src/cards/streak-card.js";
import { renderError } from "../src/common/render.js";
import { clampValue, parseBoolean } from "../src/common/ops.js";
import { setCacheHeaders, DURATIONS } from "../src/common/cache.js";

export default async (req, res) => {
  const { username, theme, hide_border, hide_title, hide_rank, cache_seconds } =
    req.query;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    const stats = await streakFetcher(username);

    const cacheSeconds = clampValue(
      parseInt(cache_seconds || DURATIONS.TWO_HOURS, 10),
      DURATIONS.TWO_HOURS,
      DURATIONS.ONE_DAY,
    );

    setCacheHeaders(res, cacheSeconds);

    const card = new StreakCard({
      theme: theme || "edgeopslabs",
      hide_border: parseBoolean(hide_border),
      hide_title: parseBoolean(hide_title),
      hide_rank: parseBoolean(hide_rank),
    });

    return res.send(card.render(stats));
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
    return res.send(
      renderError({
        message: err.message,
        secondaryMessage: err.secondaryMessage,
        renderOptions: { theme },
      }),
    );
  }
};
