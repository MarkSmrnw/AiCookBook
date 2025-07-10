class ThemeToggle {
    constructor() {
        this.isLightMode = false;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        this.setupButton();
    }

    setupButton() {
        const findAndSetup = () => {
            const button = document.getElementById('theme-toggle');
            const icon = document.getElementById('theme-icon');
            if (button && icon) {
                this.themeButton = button;
                this.themeIcon = icon;
                button.addEventListener('click', () => {this.toggle()});
                return true;
            }
            return false;
        };
        if (!findAndSetup()) {
            setTimeout(() => findAndSetup() || setTimeout(findAndSetup, 500), 100);
        }
    }

    toggle() {
        this.isLightMode = !this.isLightMode;
        this.apply();
        localStorage.setItem('cookAiTheme', this.isLightMode ? 'light' : 'dark');
    }

    apply() {
        window.darkmode = !this.isLightMode;
        if (this.themeIcon) {
            this.themeIcon.innerHTML = this.isLightMode 
                ? `<img src="source/media/symbols/sunn.svg" width="20" height="20" alt="Light mode">`
                : `<img src="source/media/symbols/moon.svg" width="20" height="20" alt="Dark mode" style="filter: brightness(0) invert(1);">`;
        }
        document.querySelectorAll('[class*="darkmode"], [class*="lightmode"]').forEach(el => {
            const from = this.isLightMode ? 'darkmode' : 'lightmode';
            const to = this.isLightMode ? 'lightmode' : 'darkmode';
            if (el.classList.contains(from)) {
                el.classList.remove(from);
                el.classList.add(to);
            }
        });

            
            document.querySelectorAll('.text-black, .text-white').forEach(el => {
                const from = this.isLightMode ? 'text-white' : 'text-black';
                const to = this.isLightMode ? 'text-black' : 'text-white';
                if (el.classList.contains(from)) {
                    el.classList.remove(from);
                    el.classList.add(to);
                }
            });

    const body = document.body;
    if (window.darkmode) {
     body.style.backgroundImage = "linear-gradient(to top, #232526 0%, #414345 100%)"; // Beispiel für dunklen Hintergrund
    } else {
     body.style.backgroundImage = "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)";
    }

        document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("bg-dark", "text-white", "text-black");

        if (window.darkmode) {
            card.classList.add("bg-dark", "text-white");
        } else {
            card.classList.add("text-black");
        }
    });

    document.querySelectorAll(".title").forEach(title => {
        title.classList.remove("text-white", "text-black");
        title.classList.add(this.isLightMode ? "text-black" : "text-white");
    });

    document.querySelector
    }

    loadTheme() {
        if (localStorage.getItem('cookAiTheme') === 'light') {
            this.isLightMode = true;
            window.darkmode = false;
            this.apply();
        } else {
            this.isLightMode = false;
            window.darkmode = true;
            this.apply();
        }
    }
}

new ThemeToggle();