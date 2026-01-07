import { Card } from "../common/Card.js";
import { getCardColors } from "../common/color.js";

class StreakCard extends Card {
  constructor({
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    theme,
    hide_border = false,
    hide_title = false,
    hide_rank = true,
  }) {
    super({
      colors: {
        titleColor: title_color,
        textColor: text_color,
        iconColor: icon_color,
        bgColor: bg_color,
        borderColor: border_color,
        theme,
      },
      width: 495,
      height: 195,
      border_radius: 4.5, // Default radius from Card.js usually
    });

    // Determine colors using the existing helper
    const { titleColor, textColor, iconColor, bgColor, borderColor } =
      getCardColors({
        title_color,
        text_color,
        icon_color,
        bg_color,
        border_color,
        theme,
      });

    // Re-set properties with resolved colors (Card constructor does some, but getCardColors resolves defaults)
    this.colors = { titleColor, textColor, iconColor, bgColor, borderColor };

    this.hideBorder = hide_border;
    this.hideTitle = hide_title;
    this.hideRank = hide_rank;
  }

  render({ total, currentStreak, longestStreak }) {
    this.setTitle("GitHub Streak Stats");

    const { textColor } = this.colors;

    // Custom CSS
    const css = `
      .stat {
        font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
        fill: ${textColor};
      }
      .bold { font-weight: 700; }
    `;
    this.setCSS(css);

    const body = `
       <g transform="translate(0, 55)">
         <svg x="25">
             <!-- Total Contributions -->
             <g transform="translate(0, 0)">
                 <text class="stat bold" y="12.5">Total Contributions:</text>
                 <text class="stat" x="200" y="12.5" data-testid="total-contributions">${total}</text>
             </g>
             
             <!-- Current Streak -->
             <g transform="translate(0, 35)">
                 <text class="stat bold" y="12.5" style="fill:${this.colors.theme === "edgeopslabs" ? "#EF960F" : textColor}">Current Streak:</text>
                 <text class="stat" x="200" y="12.5" data-testid="current-streak">${currentStreak} days</text>
             </g>
             
             <!-- Longest Streak -->
             <g transform="translate(0, 70)">
                 <text class="stat bold" y="12.5">Longest Streak:</text>
                 <text class="stat" x="200" y="12.5" data-testid="longest-streak">${longestStreak} days</text>
             </g>
         </svg> 
       </g>
    `;

    return super.render(body);
  }
}

export { StreakCard };
export default StreakCard;
