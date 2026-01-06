import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import { themes } from "./themes/index.js";
import express from "express";

const app = express();
const router = express.Router();

app.use(express.static("public"));

// router.get("/", statsCard); // Moved to /api/ or handled by static
router.get("/themes", (req, res) => {
  res.json(Object.keys(themes));
});
router.get("/pin", repoCard);
router.get("/top-langs", langCard);
router.get("/wakatime", wakatimeCard);
router.get("/gist", gistCard);

app.use("/api", router);

const port = process.env.PORT || process.env.port || 4700;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
