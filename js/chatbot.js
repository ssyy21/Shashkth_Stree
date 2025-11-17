// Chatbot Component - Need Help? FAQ System

function initializeChatbot() {
    // Create the chatbot HTML structure
    const chatbotHTML = `
        <div class="chatbot-container">
            <button class="chatbot-btn" id="chatbotBtn" aria-label="Need Help?">
                <span class="chatbot-icon">💬</span>
                <span class="chatbot-text">Need Help?</span>
            </button>
            <div class="chat-modal" id="chatModal">
                <div class="chat-header">
                    <div class="chat-header-title">Shashkth Stree Support</div>
                    <button class="chat-close-btn" id="chatCloseBtn" aria-label="Close chat">×</button>
                </div>
                <div class="chat-body" id="chatBody">
                    <!-- Messages will be inserted here -->
                </div>
            </div>
        </div>
    `;

    // Insert the HTML into the body
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Get elements
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatModal = document.getElementById('chatModal');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatBody = document.getElementById('chatBody');

    // FAQ Database - 5 pre-defined messages
    const faqData = [
        {
            question: "How can I report abuse or harassment?",
            answer: "You can report abuse by visiting our <strong>Issues</strong> section where we cover various types of harassment including workplace harassment, cyberbullying, mental abuse, and stress. Each section has a 'Report Now' button to file a complaint confidentially."
        },
        {
            question: "What therapy resources are available?",
            answer: "We offer comprehensive therapy resources including:<br>• Individual Therapy<br>• Couple Therapy<br>• Family Therapy<br>Visit our <strong>Therapy</strong> page to learn more about each option and find the right support for your situation."
        },
        {
            question: "How can I contribute or donate?",
            answer: "You can support our mission through our <strong>Fundraising</strong> page. We have multiple causes including:<br>• Pad Distribution for Women<br>• Education for Underprivileged Girls<br>• Safe Shelter for Women & Kids<br>• Meals & Nutrition for Children<br>Every contribution makes a difference!"
        },
        {
            question: "What emergency resources do you provide?",
            answer: "We provide 24/7 emergency support including:<br>• Women Helpline: 1091<br>• National Commission for Women: 011-26942369<br>• Police Emergency: 100<br>• Mental Health Helpline: 9152987821<br>For immediate help, please use our floating help button (?) on the right side."
        },
        {
            question: "Is my information kept confidential?",
            answer: "Yes, absolutely! We prioritize your privacy and safety. All information shared through our platform is kept strictly confidential. We follow strict data protection policies and your identity is protected when reporting issues or seeking help."
        }
    ];

    // State
    let chatState = 'initial'; // 'initial' or 'faq-shown'

    // Open chat
    chatbotBtn.addEventListener('click', function() {
        chatModal.classList.add('active');
        chatbotBtn.classList.add('minimized');
        
        if (chatState === 'initial') {
            initializeChat();
            chatState = 'faq-shown';
        }
    });

    // Close chat
    chatCloseBtn.addEventListener('click', function() {
        chatModal.classList.remove('active');
        chatbotBtn.classList.remove('minimized');
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && chatModal.classList.contains('active')) {
            chatModal.classList.remove('active');
            chatbotBtn.classList.remove('minimized');
        }
    });

    // Initialize chat with welcome message and FAQ options
    function initializeChat() {
        // Welcome message from bot
        addBotMessage("Hello! 👋 Welcome to Shashkth Stree Support. How can I help you today?");
        
        // Show FAQ options after a brief delay
        setTimeout(() => {
            showFAQOptions();
        }, 500);
    }

    // Add bot message
    function addBotMessage(message) {
        const messageHTML = `
            <div class="chat-message bot">
                <div class="message-avatar">🤖</div>
                <div>
                    <div class="message-content">${message}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        chatBody.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    // Add user message
    function addUserMessage(message) {
        const messageHTML = `
            <div class="chat-message user">
                <div>
                    <div class="message-content">${message}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        chatBody.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingHTML = `
            <div class="chat-message bot typing-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        chatBody.insertAdjacentHTML('beforeend', typingHTML);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingMessage = chatBody.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    // Show FAQ options as buttons
    function showFAQOptions() {
        const faqHTML = `
            <div class="chat-message bot">
                <div class="message-avatar">🤖</div>
                <div>
                    <div class="message-content">
                        Please choose a question below:
                        <div class="faq-options">
                            ${faqData.map((faq, index) => `
                                <button class="faq-btn" data-index="${index}">
                                    ${faq.question}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        chatBody.insertAdjacentHTML('beforeend', faqHTML);
        scrollToBottom();

        // Add click handlers to FAQ buttons
        const faqButtons = chatBody.querySelectorAll('.faq-btn');
        faqButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                handleFAQClick(index);
            });
        });
    }

    // Handle FAQ button click
    function handleFAQClick(index) {
        const faq = faqData[index];
        
        // Add user's question
        addUserMessage(faq.question);
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot "thinking" time
        setTimeout(() => {
            removeTypingIndicator();
            addBotMessage(faq.answer);
            
            // Ask if they need more help
            setTimeout(() => {
                addBotMessage("Do you have any other questions?");
                setTimeout(() => {
                    showFAQOptions();
                }, 300);
            }, 500);
        }, 1000);
    }

    // Get current time
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        setTimeout(() => {
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 100);
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
    initializeChatbot();
}
