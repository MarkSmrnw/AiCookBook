// Klasse für das Dark/Light Mode Toggle System
class ThemeToggle {
    constructor() {
        // Startet standardmäßig im Dark Mode
        this.isLightMode = false;
        
        // Wartet bis die HTML-Seite vollständig geladen ist, dann startet die Initialisierung
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    // Initialisiert das Theme-System
    init() {
        this.setupButton();  // Richtet den Toggle-Button ein
        this.loadTheme();    // Lädt das gespeicherte Theme
    }

    // Sucht und konfiguriert den Theme-Toggle Button
    setupButton() {
        // Funktion zum Finden und Einrichten des Buttons
        const findAndSetup = () => {
            const button = document.getElementById('theme-toggle');  // Sucht Button in der Navbar
            const icon = document.getElementById('theme-icon');      // Sucht das Icon im Button
            
            // Wenn beide Elemente gefunden wurden
            if (button && icon) {
                this.themeButton = button;  // Speichert Button-Referenz
                this.themeIcon = icon;      // Speichert Icon-Referenz
                
                // Fügt Click-Event zum Button hinzu
                button.addEventListener('click', () => this.toggle());
                return true;  // Erfolgreich eingerichtet
            }
            return false;  // Elemente nicht gefunden
        };

        // Versucht sofort den Button zu finden
        if (!findAndSetup()) {
            // Falls nicht gefunden, wartet 100ms und versucht erneut
            // (Navigation wird möglicherweise dynamisch geladen)
            setTimeout(() => findAndSetup() || setTimeout(findAndSetup, 500), 100);
        }
    }

    // Schaltet zwischen Dark und Light Mode um
    toggle() {
        this.isLightMode = !this.isLightMode;  // Wechselt den Zustand
        this.apply();                          // Wendet das neue Theme an
        
        // Speichert die Einstellung im Browser
        localStorage.setItem('cookAiTheme', this.isLightMode ? 'light' : 'dark');
    }

    // Wendet das aktuelle Theme auf alle Elemente an
    apply() {
        // Fügt/entfernt die light-theme Klasse vom Body
        document.body.classList.toggle('light-theme', this.isLightMode);
        
        // Ändert das Icon: Sonne für Light Mode, Mond für Dark Mode
        if (this.themeIcon) this.themeIcon.textContent = this.isLightMode ? '☀️' : '🌙';
        
        // Sucht alle Elemente mit darkmode oder lightmode Klassen
        document.querySelectorAll('[class*="darkmode"], [class*="lightmode"]').forEach(el => {
            const from = this.isLightMode ? 'darkmode' : 'lightmode';  // Alte Klasse
            const to = this.isLightMode ? 'lightmode' : 'darkmode';    // Neue Klasse
            
            // Tauscht die Klassen aus, wenn das Element die alte Klasse hat
            if (el.classList.contains(from)) {
                el.classList.remove(from);  // Entfernt alte Klasse
                el.classList.add(to);       // Fügt neue Klasse hinzu
            }
        });
    }

    // Lädt das gespeicherte Theme beim Seitenaufruf
    loadTheme() {
        // Prüft ob Light Mode im Browser gespeichert ist
        if (localStorage.getItem('cookAiTheme') === 'light') {
            this.isLightMode = true;  // Setzt auf Light Mode
            this.apply();             // Wendet Light Mode an
        }
        // Wenn nichts gespeichert ist, bleibt Dark Mode (Standard)
    }
}

// Erstellt eine neue Instanz der ThemeToggle-Klasse und startet das System
new ThemeToggle();