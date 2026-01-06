export class Tabs {
  constructor() {
    this.tabs = document.querySelectorAll('.tab-btn');
    this.contents = document.querySelectorAll('.tab-content');
    this.init();
  }

  init() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.switchTab(tab.dataset.target);
      });
    });

    // Activate first tab by default if none active
    if (!document.querySelector('.tab-btn.active')) {
      this.switchTab(this.tabs[0]?.dataset.target);
    }
  }

  switchTab(targetId) {
    this.tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.target === targetId);
    });

    this.contents.forEach(content => {
      content.classList.toggle('active', content.id === targetId);
    });
  }
}
