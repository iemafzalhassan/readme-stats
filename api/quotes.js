import axios from "axios";
import { renderError } from "../src/common/render.js";
import { Card } from "../src/common/Card.js";
import { getCardColors } from "../src/common/color.js";

// Simple text wrapper if not in utils
const wrapTextLines = (text, maxChars) => {
  const words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    if (currentLine.length + 1 + words[i].length <= maxChars) {
      currentLine += " " + words[i];
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }
  lines.push(currentLine);
  return lines;
};

export default async (req, res) => {
  const { theme, bg_color, title_color, text_color, icon_color, border_color } =
    req.query;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    `max-age=14400, s-maxage=14400, stale-while-revalidate=600`,
  ); // 4 hours

  try {
    // Fetch a random quote
    let content, author;
    try {
      const { data } = await axios.get("https://api.quotable.io/random");
      content = data.content;
      author = data.author;
    } catch {
      // Fallback if API fails
      const fallbackQuotes = [
        {
          content: "Talk is cheap. Show me the code.",
          author: "Linus Torvalds",
        },
        {
          content:
            "Programs must be written for people to read, and only incidentally for machines to execute.",
          author: "Harold Abelson",
        },
        {
          content: "Truth can only be found in one place: the code.",
          author: "Robert C. Martin",
        },
      ];
      const randomConfig =
        fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      content = randomConfig.content;
      author = randomConfig.author;
    }

    const colors = getCardColors({
      theme: theme || "edgeopslabs",
      title_color,
      text_color,
      icon_color,
      bg_color,
      border_color,
    });

    const card = new Card({
      width: 400,
      height: 200,
      colors,
    });

    card.setHideTitle(true);
    card.setHideBorder(false);

    // Style
    const css = `
        .quote-text { font: 500 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${colors.textColor}; }
        .quote-author { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${colors.titleColor}; }
    `;
    card.setCSS(css);

    // Wrap text
    const lines = wrapTextLines(content, 45); // Approx chars
    const textSvg = lines
      .map(
        (line, i) =>
          `<text class="quote-text" x="50%" y="${50 + i * 22}" text-anchor="middle">${line}</text>`,
      )
      .join("");

    const body = `
        <g transform="translate(0, 20)">
            <text class="quote-text" x="50%" y="30" text-anchor="middle" font-size="30">❝</text>
            ${textSvg}
            <text class="quote-author" x="50%" y="${50 + lines.length * 22 + 30}" text-anchor="middle">- ${author}</text>
        </g>
    `;

    return res.send(card.render(body));
  } catch (err) {
    console.error("API Quote Error:", err);
    return res.send(renderError({ message: "Failed to fetch quote" }));
  }
};
