const CONFIG = {
  apiBase: window.location.origin + "/api",
  defaults: {
    username: "iemafzalhassan",
    theme: "edgeopslabs",
    hide_border: false,
    hide_title: false,
    hide_rank: false,
    show_icons: true,
    line_height: 25,
    custom_title: "",
  },
};

const UI = {
  elements: {
    form: document.getElementById("config-form"),
    inputs: {},
    preview: {
      wrapper: document.getElementById("card-wrapper"),
      badge: document.getElementById("preview-badge"),
    },
    themeSelector: document.getElementById("theme-selector"),
    buttons: {
      copyMarkdown: document.getElementById("copy-markdown"),
      copyHtml: document.getElementById("copy-html"),
      openNewTab: document.getElementById("open-new-tab"),
      themeToggle: document.getElementById("theme-toggle"),
    },
    badges: {
      preview: document.getElementById("preview-badge"),
    },
  },

  state: { ...CONFIG.defaults },

  init() {
    this.cacheElements();
    this.bindEvents();
    this.loadThemes();
    this.updatePreview(); // Initial load
  },

  cacheElements() {
    // Cache form inputs
    const inputs = this.elements.form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      if (input.name) {
        this.elements.inputs[input.name] = input;
      }
    });
  },

  bindEvents() {
    // Form changes
    this.elements.form.addEventListener(
      "input",
      this.debounce(() => {
        this.updateState();
        this.updatePreview();
      }, 500),
    );

    // Buttons
    this.elements.buttons.copyMarkdown.addEventListener("click", () =>
      this.copyToClipboard("markdown"),
    );
    this.elements.buttons.copyHtml.addEventListener("click", () =>
      this.copyToClipboard("html"),
    );
    this.elements.buttons.openNewTab.addEventListener("click", () => {
      window.open(this.generateUrl(), "_blank");
    });

    // Theme Toggle (Light/Dark Mode for UI, not card)
    this.elements.buttons.themeToggle.addEventListener("click", () =>
      this.toggleAppTheme(),
    );
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  updateState() {
    const inputs = this.elements.inputs;
    this.state = {
      username: inputs.username.value || CONFIG.defaults.username,
      theme: inputs.theme.value || CONFIG.defaults.theme,
      hide_border: inputs.hide_border.checked,
      hide_title: inputs.hide_title.checked,
      hide_rank: inputs.hide_rank.checked,
      show_icons: inputs.show_icons.checked,
      line_height: inputs.line_height.value || CONFIG.defaults.line_height,
      custom_title: inputs.custom_title.value,
    };

    // Update theme selection visually
    document.querySelectorAll(".theme-option").forEach((opt) => {
      opt.classList.toggle("active", opt.dataset.theme === this.state.theme);
    });
  },

  generateUrl() {
    const params = new URLSearchParams();
    params.append("username", this.state.username);

    if (this.state.theme && this.state.theme !== "default")
      params.append("theme", this.state.theme);
    if (this.state.hide_border) params.append("hide_border", "true");
    if (this.state.hide_title) params.append("hide_title", "true");
    if (this.state.hide_rank) params.append("hide_rank", "true");
    if (!this.state.show_icons) params.append("show_icons", "false");
    if (this.state.line_height && this.state.line_height !== "25")
      params.append("line_height", this.state.line_height);
    if (this.state.custom_title)
      params.append("custom_title", this.state.custom_title);

    return `${CONFIG.apiBase}?${params.toString()}`;
  },

  async loadThemes() {
    try {
      const res = await fetch(`${CONFIG.apiBase}/themes`);
      const themes = await res.json();

      this.elements.themeSelector.innerHTML = "";

      // Sort: edgeopslabs first, then alphabetical
      themes.sort((a, b) => {
        if (a === "edgeopslabs") return -1;
        if (b === "edgeopslabs") return 1;
        return a.localeCompare(b);
      });

      themes.forEach((theme) => {
        const btn = document.createElement("div");
        btn.className = `theme-option ${theme === this.state.theme ? "active" : ""}`;
        btn.textContent = theme;
        btn.dataset.theme = theme;
        btn.addEventListener("click", () => {
          this.elements.inputs.theme.value = theme;
          this.updateState();
          this.updatePreview();
        });
        this.elements.themeSelector.appendChild(btn);
      });
    } catch (err) {
      console.error("Failed to load themes", err);
      this.elements.themeSelector.innerHTML =
        '<div class="error">Failed to load themes</div>';
    }
  },

  updatePreview() {
    const url = this.generateUrl();
    this.elements.preview.wrapper.innerHTML = `
            <div class="loader">
                <div class="spinner"></div>
                <span>Fetching Preview...</span>
            </div>
        `;
    this.elements.preview.badge.textContent = "Refreshing...";
    this.elements.preview.badge.style.color = "var(--color-sky)";

    // Fetch the SVG directly to display it inline (safer than ID, but img tag easiest for now)
    // Using img tag prevents script execution within SVG if any
    const img = new Image();
    img.src = url;
    img.alt = "Stats Card Preview";

    img.onload = () => {
      this.elements.preview.wrapper.innerHTML = "";
      this.elements.preview.wrapper.appendChild(img);
      this.elements.preview.badge.textContent = "Live";
      this.elements.preview.badge.style.color = "var(--color-success)";
    };

    img.onerror = () => {
      this.elements.preview.wrapper.innerHTML =
        '<div class="error">Failed to load preview</div>';
      this.elements.preview.badge.textContent = "Error";
      this.elements.preview.badge.style.color = "var(--color-error)";
    };
  },

  toggleAppTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
  },

  copyToClipboard(format) {
    const url = this.generateUrl(); // Full URL
    // Currently generating local URL, might need to be relative or configurable for production
    // For copy, we usually want the relative path or the full production URL.
    // Let's assume relative path for now to be safe for deployments, OR construct full URL based on window.location

    // Actually, for a generator people usually want the Markdown to put in their README.
    // This means it should be a full URL.
    // Since we are running locally/vercel, we can use the current origin.

    let text = "";
    if (format === "markdown") {
      text = `[![My Stats](${url})](https://github.com/iemafzalhassan/readme-stats)`;
    } else {
      text = `<a href="https://github.com/iemafzalhassan/readme-stats">
  <img align="center" src="${url}" />
</a>`;
    }

    navigator.clipboard.writeText(text).then(() => {
      // Show toast or temporary success state on button
      const btn =
        format === "markdown"
          ? this.elements.buttons.copyMarkdown
          : this.elements.buttons.copyHtml;
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class="icon">✅</span> Copied!`;
      btn.classList.add("success");
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove("success");
      }, 2000);
    });
  },
};

export const initUI = () => UI.init();
