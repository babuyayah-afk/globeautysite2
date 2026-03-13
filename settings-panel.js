// ===== GLOBAL SETTINGS PANEL =====
// This file should be included in all pages

(function() {
    // Create settings panel HTML
    if (!document.getElementById('settingsPanel')) {
        const settingsHTML = `
            <div id="settingsPanel" class="settings-panel-wrapper" style="display: none;">
                <div class="settings-overlay" onclick="toggleSettings()"></div>
                <div class="settings-modal">
                    <div class="settings-header">
                        <h3><i class="fas fa-cog" style="color: var(--primary);"></i> Settings</h3>
                        <button class="close-settings" onclick="toggleSettings()"><i class="fas fa-times"></i></button>
                    </div>
                    
                    <div class="settings-content">
                        <!-- Theme Settings -->
                        <div class="settings-group">
                            <h4>Appearance</h4>
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-palette"></i>
                                    Theme Mode
                                </span>
                                <div class="theme-buttons">
                                    <button class="theme-btn ${getCurrentTheme() === 'light' ? 'active' : ''}" onclick="setTheme('light')">
                                        <i class="fas fa-sun"></i> Light
                                    </button>
                                    <button class="theme-btn ${getCurrentTheme() === 'dark' ? 'active' : ''}" onclick="setTheme('dark')">
                                        <i class="fas fa-moon"></i> Dark
                                    </button>
                                </div>
                            </div>
                            
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-text-height"></i>
                                    Font Size
                                </span>
                                <select id="fontSizeSelect" onchange="setFontSize(this.value)">
                                    <option value="14px">Small</option>
                                    <option value="16px" selected>Medium</option>
                                    <option value="18px">Large</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- Currency Settings -->
                        <div class="settings-group">
                            <h4>Currency & Region</h4>
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-coins"></i>
                                    Currency
                                </span>
                                <select id="currencySelect" onchange="setCurrency(this.value)">
                                    <option value="KSh" selected>KSh - Kenyan Shilling</option>
                                    <option value="$">$ - US Dollar</option>
                                    <option value="€">€ - Euro</option>
                                    <option value="£">£ - British Pound</option>
                                </select>
                            </div>
                            
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-map-marker-alt"></i>
                                    Location
                                </span>
                                <select id="locationSelect" onchange="setLocation(this.value)">
                                    <option value="kenya">Kenya</option>
                                    <option value="uganda">Uganda</option>
                                    <option value="tanzania">Tanzania</option>
                                    <option value="international">International</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- Notification Settings -->
                        <div class="settings-group">
                            <h4>Notifications</h4>
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-bell"></i>
                                    Email Notifications
                                </span>
                                <label class="switch">
                                    <input type="checkbox" id="emailNotif" checked onchange="toggleNotification('email', this.checked)">
                                    <span class="slider"></span>
                                </label>
                            </div>
                            
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-sms"></i>
                                    SMS Notifications
                                </span>
                                <label class="switch">
                                    <input type="checkbox" id="smsNotif" onchange="toggleNotification('sms', this.checked)">
                                    <span class="slider"></span>
                                </label>
                            </div>
                            
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-tag"></i>
                                    Promotional Offers
                                </span>
                                <label class="switch">
                                    <input type="checkbox" id="promoNotif" checked onchange="toggleNotification('promo', this.checked)">
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Language Settings -->
                        <div class="settings-group">
                            <h4>Language</h4>
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-language"></i>
                                    Display Language
                                </span>
                                <select id="languageSelect" onchange="setLanguage(this.value)">
                                    <option value="en" selected>English</option>
                                    <option value="sw">Swahili</option>
                                    <option value="fr">French</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- Accessibility -->
                        <div class="settings-group">
                            <h4>Accessibility</h4>
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-universal-access"></i>
                                    High Contrast
                                </span>
                                <label class="switch">
                                    <input type="checkbox" id="highContrast" onchange="toggleHighContrast(this.checked)">
                                    <span class="slider"></span>
                                </label>
                            </div>
                            
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-text-slash"></i>
                                    Reduced Motion
                                </span>
                                <label class="switch">
                                    <input type="checkbox" id="reducedMotion" onchange="toggleReducedMotion(this.checked)">
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Data & Privacy -->
                        <div class="settings-group">
                            <h4>Data & Privacy</h4>
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-cookie"></i>
                                    Cookie Consent
                                </span>
                                <button class="settings-btn" onclick="manageCookies()">Manage</button>
                            </div>
                            
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-download"></i>
                                    Export My Data
                                </span>
                                <button class="settings-btn" onclick="exportUserData()">Export</button>
                            </div>
                            
                            <div class="settings-option">
                                <span class="option-label">
                                    <i class="fas fa-trash"></i>
                                    Delete Account
                                </span>
                                <button class="settings-btn danger" onclick="deleteAccount()">Delete</button>
                            </div>
                        </div>
                        
                        <!-- About -->
                        <div class="settings-group">
                            <h4>About</h4>
                            <div class="settings-option">
                                <span class="option-label">Version</span>
                                <span class="option-value">1.0.0</span>
                            </div>
                            <div class="settings-option">
                                <span class="option-label">Last Updated</span>
                                <span class="option-value">Feb 2025</span>
                            </div>
                        </div>
                        
                        <!-- Save Button -->
                        <div style="padding: 20px; text-align: center;">
                            <button class="save-settings-btn" onclick="saveAllSettings()">
                                <i class="fas fa-save"></i> Save All Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', settingsHTML);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .settings-panel-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: none;
                align-items: flex-start;
                justify-content: flex-end;
            }
            
            .settings-panel-wrapper.active {
                display: flex;
            }
            
            .settings-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
            }
            
            .settings-modal {
                position: relative;
                width: 400px;
                height: 100vh;
                background: var(--card-bg);
                box-shadow: -5px 0 30px rgba(0,0,0,0.2);
                z-index: 10001;
                overflow-y: auto;
                animation: slideLeft 0.3s ease;
            }
            
            @keyframes slideLeft {
                from {
                    transform: translateX(100%);
                }
                to {
                    transform: translateX(0);
                }
            }
            
            .settings-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 25px;
                border-bottom: 1px solid var(--border-color);
                position: sticky;
                top: 0;
                background: var(--card-bg);
                z-index: 10;
            }
            
            .settings-header h3 {
                font-size: 22px;
                font-weight: 800;
                color: var(--text);
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .close-settings {
                background: var(--hover-bg);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text);
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .close-settings:hover {
                background: var(--primary);
                color: white;
            }
            
            .settings-content {
                padding: 20px 25px;
            }
            
            .settings-group {
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 1px solid var(--border-color);
            }
            
            .settings-group:last-child {
                border-bottom: none;
            }
            
            .settings-group h4 {
                font-size: 16px;
                font-weight: 700;
                color: var(--primary);
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .settings-option {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                padding: 8px 0;
            }
            
            .option-label {
                font-weight: 600;
                color: var(--text);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .option-label i {
                width: 20px;
                color: var(--primary);
            }
            
            .option-value {
                color: var(--text);
                opacity: 0.8;
                font-size: 14px;
            }
            
            .theme-buttons {
                display: flex;
                gap: 8px;
            }
            
            .theme-btn {
                padding: 8px 16px;
                border: 2px solid var(--border-color);
                background: transparent;
                border-radius: 30px;
                font-size: 13px;
                font-weight: 600;
                color: var(--text);
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .theme-btn.active {
                background: var(--primary);
                color: white;
                border-color: var(--primary);
            }
            
            .theme-btn:hover {
                border-color: var(--primary);
            }
            
            .settings-panel-wrapper select {
                padding: 8px 16px;
                border: 2px solid var(--border-color);
                border-radius: 30px;
                background: var(--input-bg);
                color: var(--text);
                font-family: 'Quicksand', sans-serif;
                outline: none;
                cursor: pointer;
            }
            
            .settings-panel-wrapper select:focus {
                border-color: var(--primary);
            }
            
            .switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }
            
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 24px;
            }
            
            .slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .slider {
                background-color: var(--primary);
            }
            
            input:checked + .slider:before {
                transform: translateX(26px);
            }
            
            .settings-btn {
                padding: 8px 16px;
                border: 2px solid var(--border-color);
                background: transparent;
                border-radius: 30px;
                font-size: 13px;
                font-weight: 600;
                color: var(--text);
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .settings-btn:hover {
                border-color: var(--primary);
                color: var(--primary);
            }
            
            .settings-btn.danger:hover {
                border-color: var(--danger);
                color: var(--danger);
            }
            
            .save-settings-btn {
                width: 100%;
                padding: 14px;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: white;
                border: none;
                border-radius: 50px;
                font-weight: 700;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            
            .save-settings-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(212,165,165,0.3);
            }
            
            @media (max-width: 768px) {
                .settings-modal {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Helper function to get current theme
    function getCurrentTheme() {
        return document.body.getAttribute('data-theme') || 'light';
    }

    // Toggle settings panel
    window.toggleSettings = function() {
        const panel = document.getElementById('settingsPanel');
        if (panel) {
            panel.classList.toggle('active');
            
            // Load saved settings when opening
            if (panel.classList.contains('active')) {
                loadSavedSettings();
            }
        }
    };

    // Load saved settings from localStorage
    function loadSavedSettings() {
        // Theme
        const theme = localStorage.getItem('gloBeauty_theme') || 'light';
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.includes(theme === 'light' ? 'Light' : 'Dark'));
        });
        
        // Font size
        const fontSize = localStorage.getItem('gloBeauty_fontSize') || '16px';
        const fontSizeSelect = document.getElementById('fontSizeSelect');
        if (fontSizeSelect) {
            fontSizeSelect.value = fontSize;
        }
        
        // Currency
        const currency = localStorage.getItem('gloBeauty_currency') || 'KSh';
        const currencySelect = document.getElementById('currencySelect');
        if (currencySelect) {
            currencySelect.value = currency;
        }
        
        // Location
        const location = localStorage.getItem('gloBeauty_location') || 'kenya';
        const locationSelect = document.getElementById('locationSelect');
        if (locationSelect) {
            locationSelect.value = location;
        }
        
        // Notifications
        const emailNotif = document.getElementById('emailNotif');
        if (emailNotif) {
            emailNotif.checked = localStorage.getItem('gloBeauty_emailNotif') !== 'false';
        }
        
        const smsNotif = document.getElementById('smsNotif');
        if (smsNotif) {
            smsNotif.checked = localStorage.getItem('gloBeauty_smsNotif') === 'true';
        }
        
        const promoNotif = document.getElementById('promoNotif');
        if (promoNotif) {
            promoNotif.checked = localStorage.getItem('gloBeauty_promoNotif') !== 'false';
        }
        
        // Language
        const language = localStorage.getItem('gloBeauty_language') || 'en';
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = language;
        }
        
        // High contrast
        const highContrast = document.getElementById('highContrast');
        if (highContrast) {
            highContrast.checked = localStorage.getItem('gloBeauty_highContrast') === 'true';
        }
        
        // Reduced motion
        const reducedMotion = document.getElementById('reducedMotion');
        if (reducedMotion) {
            reducedMotion.checked = localStorage.getItem('gloBeauty_reducedMotion') === 'true';
        }
    }

    // Theme functions
    window.setTheme = function(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('gloBeauty_theme', theme);
        
        // Update active state
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.includes(theme === 'light' ? 'Light' : 'Dark'));
        });
    };

    // Font size
    window.setFontSize = function(size) {
        document.body.style.fontSize = size;
        localStorage.setItem('gloBeauty_fontSize', size);
    };

    // Currency
    window.setCurrency = function(currency) {
        localStorage.setItem('gloBeauty_currency', currency);
        
        // Update all price displays if function exists
        if (typeof updateAllPrices === 'function') {
            updateAllPrices();
        }
    };

    // Location
    window.setLocation = function(location) {
        localStorage.setItem('gloBeauty_location', location);
    };

    // Notifications
    window.toggleNotification = function(type, enabled) {
        localStorage.setItem(`gloBeauty_${type}Notif`, enabled);
    };

    // High contrast
    window.toggleHighContrast = function(enabled) {
        if (enabled) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
        localStorage.setItem('gloBeauty_highContrast', enabled);
    };

    // Reduced motion
    window.toggleReducedMotion = function(enabled) {
        if (enabled) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
        localStorage.setItem('gloBeauty_reducedMotion', enabled);
    };

    // Language
    window.setLanguage = function(lang) {
        localStorage.setItem('gloBeauty_language', lang);
        // Here you would implement actual language switching
        alert(`Language set to ${lang}. Page refresh required.`);
    };

    // Cookie management
    window.manageCookies = function() {
        alert('Cookie preferences will open here.');
    };

    // Export data
    window.exportUserData = function() {
        const data = {
            theme: localStorage.getItem('gloBeauty_theme'),
            currency: localStorage.getItem('gloBeauty_currency'),
            location: localStorage.getItem('gloBeauty_location'),
            language: localStorage.getItem('gloBeauty_language'),
            notifications: {
                email: localStorage.getItem('gloBeauty_emailNotif'),
                sms: localStorage.getItem('gloBeauty_smsNotif'),
                promo: localStorage.getItem('gloBeauty_promoNotif')
            },
            accessibility: {
                highContrast: localStorage.getItem('gloBeauty_highContrast'),
                reducedMotion: localStorage.getItem('gloBeauty_reducedMotion')
            },
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `globeauty-settings-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    };

    // Delete account
    window.deleteAccount = function() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Clear all localStorage
            localStorage.clear();
            
            // Redirect to login
            window.location.href = 'index.html';
        }
    };

    // Save all settings
    window.saveAllSettings = function() {
        // Show success message
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--primary);
            color: white;
            padding: 16px 28px;
            border-radius: 50px;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(212,165,165,0.3);
            z-index: 10002;
            animation: slideInRight 0.3s ease;
        `;
        toast.innerHTML = '<i class="fas fa-check-circle"></i> ✅ Settings saved successfully!';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
        
        // Close panel
        toggleSettings();
    };

    // Add settings icon to header if not present (fallback)
    document.addEventListener('DOMContentLoaded', function() {
        // This is a fallback - we're adding icons manually in HTML now
        // But keep this for any pages that might not have the icons yet
        
        // Load saved font size
        const savedFontSize = localStorage.getItem('gloBeauty_fontSize');
        if (savedFontSize) {
            document.body.style.fontSize = savedFontSize;
        }
        
        // Load high contrast
        if (localStorage.getItem('gloBeauty_highContrast') === 'true') {
            document.body.classList.add('high-contrast');
        }
        
        // Load reduced motion
        if (localStorage.getItem('gloBeauty_reducedMotion') === 'true') {
            document.body.classList.add('reduced-motion');
        }
    });
})();