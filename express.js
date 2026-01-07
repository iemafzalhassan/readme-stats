import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import streakCard from "./api/streak.js";
import quotesCard from "./api/quotes.js";
import visitorCard from "./api/visitor.js";
import { themes } from "./themes/index.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = express.Router();

router.get("/", statsCard);
router.get("/themes", (req, res) => {
  res.json(Object.keys(themes));
});
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
  console.log(`Server running on port ${port}`);
});
