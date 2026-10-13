import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import streakCard from "./api/streak.js";
import quotesCard from "./api/quotes.js";
import visitorCard from "./api/visitor.js";
import themesEndpoint from "./src/studio/themes.js";
import badgesCard from "./src/studio/badges.js";
import trophiesCard from "./src/studio/trophies.js";
import iconEndpoint from "./src/studio/icon.js";
import roadmapEndpoint from "./src/studio/roadmap.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = express.Router();

router.get("/", statsCard);
router.get("/themes", themesEndpoint);
router.get("/badges", badgesCard);
router.get("/trophies", trophiesCard);
router.get("/icon", iconEndpoint);
router.get("/roadmap", roadmapEndpoint);
router.get("/pin", repoCard);
router.get("/top-langs", langCard);
router.get("/wakatime", wakatimeCard);
router.get("/gist", gistCard);
router.get("/streak", streakCard);
router.get("/quotes", quotesCard);
router.get("/visitor", visitorCard);

app.use("/api", router);

app.use(express.static(path.join(__dirname, "frontend")));

const port = process.env.PORT || process.env.port || 4700;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
