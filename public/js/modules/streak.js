export class StreakGenerator {
    constructor() {
        this.container = document.getElementById('tab-streak');
        if (this.container) {
            this.init();
        }
    }

    init() {
        this.renderInterface();
        this.bindEvents();
    }

    renderInterface() {
        this.container.innerHTML = `
            <section class="preview-section glass-panel">
                <div class="section-header">
                    <h2>Streak Preview</h2>
                </div>
                 <div class="card-preview-container">
                    <div id="streak-preview">
                        <img src="" alt="Streak Stats" id="streak-img" style="opacity: 0.5;">
                    </div>
                </div>
                 <div class="action-bar">
                    <button class="btn btn-primary" id="copy-streak-md">Copy Markdown</button>
                    <button class="btn btn-secondary" id="copy-streak-html">Copy HTML</button>
                </div>
            </section>
             <section class="config-section glass-panel">
                 <div class="section-header"><h2>Configuration</h2></div>
                 <form class="config-grid">
                    <div class="form-group">
                        <label>GitHub Username</label>
                        <input type="text" id="streak-username" class="input-field" placeholder="iemafzalhassan">
                    </div>
                    <div class="form-group full-width">
                        <label>Theme</label>
                         <select id="streak-theme" class="input-field">
                            <option value="edgeopslabs">EdgeOps Labs (Custom)</option>
                            <option value="default">Default</option>
                            <option value="dark">Dark</option>
                            <option value="highcontrast">High Contrast</option>
                        </select>
                    </div>
                 </form>
            </section>
        `;
    }

    bindEvents() {
        this.usernameInput = this.container.querySelector('#streak-username');
        this.themeSelect = this.container.querySelector('#streak-theme');
        this.img = this.container.querySelector('#streak-img');
        
        [this.usernameInput, this.themeSelect].forEach(el => 
            el.addEventListener('input', () => this.updatePreview())
        );
        
        this.container.querySelector('#copy-streak-md').addEventListener('click', () => {
             const url = this.generateUrl();
             navigator.clipboard.writeText(`[![GitHub Streak](${url})](https://git.io/streak-stats)`);
             alert('Copied!');
        });
        
        this.container.querySelector('#copy-streak-html').addEventListener('click', () => {
             const url = this.generateUrl();
             navigator.clipboard.writeText(`<a href="https://git.io/streak-stats"><img src="${url}" alt="GitHub Streak" /></a>`);
             alert('Copied!');
        });
    }

    updatePreview() {
        if(!this.usernameInput.value) return;
        this.img.src = this.generateUrl();
        this.img.style.opacity = '1';
    }

    generateUrl() {
        const username = this.usernameInput.value;
        const theme = this.themeSelect.value;
        let url = `https://github-readme-streak-stats.herokuapp.com/?user=${username}`;
        
        if (theme === 'edgeopslabs') {
            // Mapping EdgeOps Colors
            // #104BAF - bg
            // #60C0E9 - ring/highlight
            // #FFFFFF - text
            url += `&background=104BAF&ring=60C0E9&fire=60C0E9&currStreakNum=FFFFFF&sideNums=FFFFFF&currStreakLabel=FFFFFF&sideLabels=FFFFFF&dates=FFFFFF`;
        } else {
             url += `&theme=${theme}`;
        }
        
        url += `&hide_border=true`;
        return url;
    }
}
