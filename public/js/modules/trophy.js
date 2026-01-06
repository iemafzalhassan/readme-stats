export class TrophyGenerator {
    constructor() {
        this.container = document.getElementById('tab-trophy');
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
                    <h2>Trophy Preview</h2>
                </div>
                 <div class="card-preview-container" style="overflow-x: auto;">
                    <div id="trophy-preview">
                        <img src="" alt="Trophies" id="trophy-img" style="opacity: 0.5; max-width: none;">
                    </div>
                </div>
                 <div class="action-bar">
                    <button class="btn btn-primary" id="copy-trophy-md">Copy Markdown</button>
                    <button class="btn btn-secondary" id="copy-trophy-html">Copy HTML</button>
                </div>
            </section>
             <section class="config-section glass-panel">
                 <div class="section-header"><h2>Configuration</h2></div>
                 <form class="config-grid">
                    <div class="form-group">
                        <label>GitHub Username</label>
                        <input type="text" id="trophy-username" class="input-field" placeholder="iemafzalhassan">
                    </div>
                    <div class="form-group full-width">
                        <label>Theme</label>
                         <select id="trophy-theme" class="input-field">
                            <option value="edgeopslabs">EdgeOps Labs (Custom)</option>
                            <option value="flat">Flat</option>
                            <option value="onedark">OneDark</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Layout</label>
                         <select id="trophy-margin" class="input-field">
                            <option value="0">Compacted</option>
                            <option value="4">Spaced (Default)</option>
                            <option value="8">Wide</option>
                        </select>
                    </div>
                 </form>
            </section>
        `;
    }

    bindEvents() {
        this.usernameInput = this.container.querySelector('#trophy-username');
        this.themeSelect = this.container.querySelector('#trophy-theme');
        this.marginSelect = this.container.querySelector('#trophy-margin');
        this.img = this.container.querySelector('#trophy-img');
        
        [this.usernameInput, this.themeSelect, this.marginSelect].forEach(el => 
            el.addEventListener('input', () => this.updatePreview())
        );
        
        this.container.querySelector('#copy-trophy-md').addEventListener('click', () => {
             const url = this.generateUrl();
             navigator.clipboard.writeText(`[![Trophies](${url})](https://github.com/ryo-ma/github-profile-trophy)`);
             alert('Copied!');
        });
        
        this.container.querySelector('#copy-trophy-html').addEventListener('click', () => {
             const url = this.generateUrl();
             navigator.clipboard.writeText(`<a href="https://github.com/ryo-ma/github-profile-trophy"><img src="${url}" alt="Trophies" /></a>`);
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
        const margin = this.marginSelect.value;
        
        let url = `https://github-profile-trophy.vercel.app/?username=${username}`;
        
        if (theme === 'edgeopslabs') {
             // Custom theme via parameters is limited in trophy api without 'theme' param support for custom URLs,
             // checking if it supports bg color. 
             // It supports no-bg=true. We might just use no-bg=true for better integration or find a closest match.
             // Actually, it supports 'theme=git-lab' which is blue-ish? 
             // Let's use no-frame=true&no-bg=true to blend with our liquid background for preview,
             // but for export we might want a solid background.
             // Let's stick to existing themes for now or use 'onedark' as close enough, or customize via `bg` param if available.
             // Research says it supports `bg` param? No, it supports `theme`.
             // Let's map edgeopslabs to 'discord' or 'onedark' for now, or 'flat'.
             // Actually, let's use `no-bg=true` so it looks transparent on the profile.
             url += `&no-bg=true&no-frame=true`;
        } else {
             url += `&theme=${theme}`;
        }
        
        url += `&margin-w=${margin}`;
        return url;
    }
}
