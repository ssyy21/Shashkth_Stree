// Warning Modal Handler
// Provides smooth modal functionality for warning sections

class WarningModal {
    constructor() {
        this.modals = [];
        this.currentModal = null;
        this.init();
    }

    init() {
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('warning-modal')) {
                this.closeModal(e.target);
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal(this.currentModal);
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.add('show');
        document.body.classList.add('modal-open');
        this.currentModal = modal;

        // Focus on modal for accessibility
        const closeBtn = modal.querySelector('.modal-close-btn');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }
    }

    closeModal(modal) {
        if (!modal) return;

        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        this.currentModal = null;
    }

    createModal(config) {
        const { id, title, content, severity = '' } = config;
        
        const modalHTML = `
            <div id="${id}" class="warning-modal modal-${severity}">
                <div class="modal-content-wrapper" tabindex="-1">
                    <div class="modal-header-custom">
                        <h2>${title}</h2>
                        <button class="modal-close-btn" onclick="warningModalHandler.closeModal(document.getElementById('${id}'))" aria-label="Close modal">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body-custom">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        // Insert modal at end of body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Initialize modal handler
const warningModalHandler = new WarningModal();

// Helper function for creating read more buttons
function createReadMoreButton(targetModalId, buttonText = 'Read More') {
    return `<button class="read-more-btn" onclick="warningModalHandler.openModal('${targetModalId}')">${buttonText}</button>`;
}
