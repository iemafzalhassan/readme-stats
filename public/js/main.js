import { Tabs } from './modules/tabs.js';
import { StatsGenerator } from './modules/stats.js';
import { TechStackGenerator } from './modules/techStack.js';
import { StreakGenerator } from './modules/streak.js';
import { TrophyGenerator } from './modules/trophy.js';

// Global Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    new Tabs();
    new StatsGenerator();
    new TechStackGenerator();
    new StreakGenerator();
    new TrophyGenerator();
});
