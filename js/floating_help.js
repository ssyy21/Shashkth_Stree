// Floating Help Component JavaScript

function initializeFloatingHelp() {
    // Create the floating help HTML structure
    const helpHTML = `
        <div class="floating-help-container">
            <button class="help-btn" id="helpBtn" aria-label="Help Menu">
                <span class="help-icon">?</span>
            </button>
            <div class="help-menu" id="helpMenu">
                <a href="#emergency" class="help-menu-item" onclick="handleEmergencyClick(event)">
                    <div class="help-menu-icon icon-emergency">🚨</div>
                    <div class="help-menu-text">
                        <div class="help-menu-title">Emergency Contacts</div>
                        <div class="help-menu-desc">Quick access to emergency services</div>
                    </div>
                </a>
                <a href="issues.html" class="help-menu-item">
                    <div class="help-menu-icon icon-report">📝</div>
                    <div class="help-menu-text">
                        <div class="help-menu-title">Report Issue</div>
                        <div class="help-menu-desc">Report abuse or safety concerns</div>
                    </div>
                </a>
                <a href="therapy.html" class="help-menu-item">
                    <div class="help-menu-icon icon-therapy">📚</div>
                    <div class="help-menu-text">
                        <div class="help-menu-title">Therapy Articles</div>
                        <div class="help-menu-desc">Read helpful mental health resources</div>
                    </div>
                </a>
                <a href="#helpline" class="help-menu-item" onclick="handleHelplineClick(event)">
                    <div class="help-menu-icon icon-helpline">📞</div>
                    <div class="help-menu-text">
                        <div class="help-menu-title">Helpline Numbers</div>
                        <div class="help-menu-desc">24/7 support hotlines</div>
                    </div>
                </a>
            </div>
        </div>
    `;

    // Insert the HTML into the body
    document.body.insertAdjacentHTML('beforeend', helpHTML);

    // Get elements
    const helpBtn = document.getElementById('helpBtn');
    const helpMenu = document.getElementById('helpMenu');

    // Toggle menu on button click
    helpBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.floating-help-container')) {
            closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    function toggleMenu() {
        helpBtn.classList.toggle('active');
        helpMenu.classList.toggle('active');
    }

    function closeMenu() {
        helpBtn.classList.remove('active');
        helpMenu.classList.remove('active');
    }

    // Add pulse effect on page load (optional)
    setTimeout(() => {
        helpBtn.classList.add('pulse');
        setTimeout(() => {
            helpBtn.classList.remove('pulse');
        }, 4000);
    }, 2000);
}

// Handle Emergency Contacts click
function handleEmergencyClick(event) {
    event.preventDefault();
    const emergencyInfo = `
╔══════════════════════════════════╗
║     EMERGENCY CONTACTS           ║
╠══════════════════════════════════╣
║ Women Helpline: 1091            ║
║ Police: 100                      ║
║ Ambulance: 102                   ║
║ Women Safety: 181                ║
║ National Commission for Women:   ║
║ 011-26942369                     ║
╚══════════════════════════════════╝
    `;
    alert(emergencyInfo);
}

// Handle Helpline Numbers click
function handleHelplineClick(event) {
    event.preventDefault();
    const helplineInfo = `
╔══════════════════════════════════╗
║      HELPLINE NUMBERS            ║
╠══════════════════════════════════╣
║ Mental Health: 1800-599-0019    ║
║ Suicide Prevention: 9152987821   ║
║ Domestic Violence: 181           ║
║ Child Helpline: 1098             ║
║ Elder Abuse: 14567               ║
║ Cybercrime: 1930                 ║
╚══════════════════════════════════╝
    `;
    alert(helplineInfo);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFloatingHelp);
} else {
    initializeFloatingHelp();
}