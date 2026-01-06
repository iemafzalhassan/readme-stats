export class TechStackGenerator {
    constructor() {
        this.container = document.getElementById('tab-tech');
        if (this.container) {
            this.init();
        }
    }

    init() {
        this.renderInterface();
        this.bindEvents();
    }

    renderInterface() {
        const content = `
            <section class="preview-section glass-panel">
                 <div class="section-header">
                    <h2>Stack Preview</h2>
                </div>
                <div class="card-preview-container" style="min-height: auto; padding: 20px;">
                    <div id="tech-preview" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
                        <!-- Badges go here -->
                        <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
                    </div>
                </div>
                <div class="action-bar">
                    <button class="btn btn-primary" id="copy-tech-md">
                        <span class="icon">📋</span> Copy Markdown
                    </button>
                </div>
            </section>

             <section class="config-section glass-panel">
                <div class="section-header">
                    <h2>Add Technologies</h2>
                </div>
                <form class="config-grid">
                     <div class="form-group">
                        <label>Badge Style</label>
                        <select id="tech-style" class="input-field">
                            <option value="for-the-badge">For The Badge</option>
                            <option value="flat">Flat</option>
                            <option value="flat-square">Flat Square</option>
                            <option value="plastic">Plastic</option>
                            <option value="social">Social</option>
                        </select>
                    </div>
                    
                    <div class="form-group full-width">
                         <label>Common Techs (Click to Add)</label>
                         <div class="tech-grid" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                            ${this.getCommonTechs().map(tech => 
                                `<button type="button" class="btn btn-sm btn-outline tech-btn" data-tech="${tech.name}" data-color="${tech.color}" data-logo="${tech.logo}">
                                    ${tech.name}
                                </button>`
                            ).join('')}
                         </div>
                    </div>
                </form>
            </section>
        `;
        this.container.innerHTML = content;
    }

    bindEvents() {
        this.preview = this.container.querySelector('#tech-preview');
        this.styleSelect = this.container.querySelector('#tech-style');
        this.selectedTechs = [{name: 'JavaScript', color: 'F7DF1E', logo: 'javascript', logoColor: 'black'}]; // Default
        
        this.styleSelect.addEventListener('change', () => this.updatePreview());
        
        this.container.querySelectorAll('.tech-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tech = {
                    name: btn.dataset.tech,
                    color: btn.dataset.color,
                    logo: btn.dataset.logo
                };
                this.addTech(tech);
            });
        });

        this.container.querySelector('#copy-tech-md').addEventListener('click', () => {
            const md = this.selectedTechs.map(t => this.generateBadgeUrl(t)).map(url => `![${url.name}](${url.url})`).join(' ');
            navigator.clipboard.writeText(md);
            // Show toast (simplified)
            alert('Copied to clipboard!');
        });
    }

    addTech(tech) {
        if (!this.selectedTechs.find(t => t.name === tech.name)) {
            this.selectedTechs.push(tech);
            this.updatePreview();
        }
    }

    updatePreview() {
        this.preview.innerHTML = this.selectedTechs.map(tech => {
            const { url, name } = this.generateBadgeUrl(tech);
            return `<img src="${url}" alt="${name}">`;
        }).join('');
    }

    generateBadgeUrl(tech) {
        const style = this.styleSelect.value;
        const logoColor = tech.logoColor || 'white';
        // Shields.io format: https://img.shields.io/badge/<LABEL>-<COLOR>?style=<STYLE>&logo=<LOGO>&logoColor=<LOGOCOLOR>
        const label = tech.name.replace(/ /g, '%20');
        const color = tech.color.replace('#', '');
        const url = `https://img.shields.io/badge/${label}-${color}?style=${style}&logo=${tech.logo}&logoColor=${logoColor}`;
        return { url, name: tech.name };
    }

    getCommonTechs() {
        return [
            { name: 'JavaScript', color: 'F7DF1E', logo: 'javascript', logoColor: 'black' },
            { name: 'TypeScript', color: '3178C6', logo: 'typescript' },
            { name: 'Python', color: '3776AB', logo: 'python' },
            { name: 'React', color: '61DAFB', logo: 'react', logoColor: 'black' },
            { name: 'Node.js', color: '339933', logo: 'nodedotjs' },
            { name: 'Vue.js', color: '4FC08D', logo: 'vuedotjs' },
            { name: 'Angular', color: 'DD0031', logo: 'angular' },
            { name: 'Docker', color: '2496ED', logo: 'docker' },
            { name: 'Kubernetes', color: '326CE5', logo: 'kubernetes' },
            { name: 'AWS', color: 'FF9900', logo: 'amazonaws' },
            { name: 'Git', color: 'F05032', logo: 'git' },
            { name: 'Linux', color: 'FCC624', logo: 'linux', logoColor: 'black' }
        ];
    }
}
