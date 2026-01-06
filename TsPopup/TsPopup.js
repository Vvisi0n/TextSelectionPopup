/*! TsPopup - v0.0.1 - (c) 2025 Vvisi0n; Licensed MIT */

class TextSelectionPopup {
    constructor(options = {}) {
        // Default configuration
        this.defaultOptions = {
            // Set the popup container element ID to textSelectionPopup
            containerId: 'textSelectionPopup',
            // Btn Configuration -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            buttons: [
                {
                    id: 'copyBtn',
                    className: 'popup-btn copy',
                    tooltip: '复制',
                    icon: 'fas fa-copy',
                    action: this.copyAction.bind(this)
                },
                {
                    id: 'searchBtn',
                    className: 'popup-btn search',
                    tooltip: '搜索',
                    icon: 'fas fa-search',
                    action: this.searchAction.bind(this)
                },
                {
                    id: 'translateBtn',
                    className: 'popup-btn translate',
                    tooltip: '翻译',
                    icon: 'fas fa-language',
                    action: this.translateAction.bind(this)
                }
            ],
            // Custom popup style class name
            popupClass: 'text-selection-popup',
            // Popup display position offset
            offsetX: 5,
            offsetY: 5,
            // Debounce time, in ms
            debounceDelay: 50
        };

        // Merge configuration
        this.options = { ...this.defaultOptions, ...options };
        
        // State variables
        this.selectedText = '';
        this.selectionTimer = null;
        this.isMouseDown = false;
        
        // Init popup box
        this.init();
    }

    /**
     * Initialize popup box
     */
    init() {
        // Create popup container
        this.createPopupContainer();
        
        // Bind Event
        this.bindEvents();
        
        // Inject CSS styles (if not present)
        this.injectStyles();
    }

    /**
     * Create popup container
     */
    createPopupContainer() {
        // Check if popup container already exists
        let container = document.getElementById(this.options.containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = this.options.containerId;
            container.className = this.options.popupClass;
            document.body.appendChild(container);
        }
        
        this.container = container;
        
        // Clear container content
        this.container.innerHTML = '';
        
        // Add buttons
        this.options.buttons.forEach(buttonConfig => {
            const button = document.createElement('button');
            button.id = buttonConfig.id;
            button.className = buttonConfig.className;
            button.setAttribute('data-tooltip', buttonConfig.tooltip);
            button.innerHTML = `<i class="${buttonConfig.icon}"></i>`;
            button.addEventListener('click', buttonConfig.action);
            this.container.appendChild(button);
        });
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Listen for mouse down event
        document.addEventListener('mousedown', (e) => {
            if (e.button === 0) // IF left mouse btn is pressed
            { 
                this.isMouseDown = true;
            }
            
            // Click outside the pop-up to close it
            if (!this.container.contains(e.target) && this.container.classList.contains('show')) 
            {
                this.hidePopup();
                window.getSelection().removeAllRanges();
            }
        });

        // Listen for mouse up event (main trigger condition)
        document.addEventListener('mouseup', (e) => {
            if (e.button === 0) // IF left mouse btn is released
            { 
                this.isMouseDown = false;
                
                if (!this.container.contains(e.target)) {
                    clearTimeout(this.selectionTimer);
                    this.selectionTimer = setTimeout(() => {
                        this.handleSelectionChange(true);
                    }, this.options.debounceDelay);
                }
            }
        });

        // Listen for selection change event (auxiliary detection)
        document.addEventListener('selectionchange', () => {
            if (!this.isMouseDown) {
                clearTimeout(this.selectionTimer);
                this.selectionTimer = setTimeout(() => {
                    this.handleSelectionChange(false);
                }, 100);
            }
        });

        // Listen for window scroll event to close pop-up
        window.addEventListener('scroll', () => this.hidePopup());
    }

    /**
     * Handle selection change event
     */
    handleSelectionChange(isMouseUpTriggered) {
        this.selectedText = window.getSelection().toString().trim();
        
        if (this.selectedText && (isMouseUpTriggered || !this.container.classList.contains('show'))) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                this.setPopupPosition(rect);
                this.showPopup();
            }
        } else if (!this.selectedText) {
            this.hidePopup();
        }
    }

    /**
     * Show pop-up
     */
    showPopup() {
        this.container.classList.add('show');
    }

    /**
     * Hide popup
     */
    hidePopup() {
        this.container.classList.remove('show');
        this.selectedText = '';
    }

    /**
     * Set popup position
     */
    setPopupPosition(selectionRect) {
        const popupWidth = this.container.offsetWidth;
        const popupHeight = this.container.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        // Base position: bottom right
        let left = selectionRect.right + this.options.offsetX + scrollX;
        let top = selectionRect.bottom + this.options.offsetY + scrollY;

        // Boundary check and auto adjust
        if (left + popupWidth > viewportWidth + scrollX) 
        {
            left = selectionRect.left - popupWidth - this.options.offsetX + scrollX;
            if (left < scrollX) 
            {
                left = scrollX + this.options.offsetX;
            }
        }

        if (top + popupHeight > viewportHeight + scrollY) 
        {
            top = selectionRect.top - popupHeight - this.options.offsetY + scrollY;
            if (top < scrollY) 
            {
                top = scrollY + viewportHeight - popupHeight - this.options.offsetY;
            }
        }

        if (left < scrollX) 
        {
            left = scrollX + this.options.offsetX;
        }
        if (top < scrollY) 
        {
            top = scrollY + this.options.offsetX;
        }

        // Final boundary check
        left = Math.max(scrollX + this.options.offsetX, Math.min(left, scrollX + viewportWidth - popupWidth - this.options.offsetX));
        top = Math.max(scrollY + this.options.offsetY, Math.min(top, scrollY + viewportHeight - popupHeight - this.options.offsetY));

        this.container.style.left = `${left}px`;
        this.container.style.top = `${top}px`;
    }

    /**
     * Copy function
     */
    copyAction() {
        if (this.selectedText) {
            navigator.clipboard.writeText(this.selectedText)
                .then(() => {
                    const copyBtn = document.getElementById('copyBtn');
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 1000);
                    this.hidePopup();
                })
                .catch(err => {
                    alert('复制失败：' + err);
                });
        }
    }

    /**
     * Search function -- Based on Baidu website search engine
     */
    searchAction() {
        if (this.selectedText) {
            const searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(this.selectedText)}`;
            window.open(searchUrl, '_blank');
            this.hidePopup();
        }
    }

    /**
     * Translation Function
     */
    translateAction() {
        if (this.selectedText) {
            const translateUrl = `https://fanyi.baidu.com/#auto/zh/${encodeURIComponent(this.selectedText)}`;
            window.open(translateUrl, '_blank');
            this.hidePopup();
        }
    }

    /**
     * Add Custom Button
     */
    addButton(buttonConfig) {
        const button = document.createElement('button');
        button.id = buttonConfig.id;
        button.className = buttonConfig.className;
        button.setAttribute('data-tooltip', buttonConfig.tooltip);
        button.innerHTML = `<i class="${buttonConfig.icon}"></i>`;
        button.addEventListener('click', buttonConfig.action);
        this.container.appendChild(button);
    }

    /**
     * Remove Button
     */
    removeButton(buttonId) {
        const button = document.getElementById(buttonId);
        if (button && button.parentNode === this.container) {
            this.container.removeChild(button);
        }
    }

    /**
     * Destroy instance
     */
    destroy() {
        // Remove event listeners
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('selectionchange', this.handleSelectionChange);
        window.removeEventListener('scroll', this.handleScroll);
        
        // Remove popup container
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }

    /**
     * Inject CSS styles
     */
    injectStyles() {
        if (document.getElementById('text-selection-popup-styles')) return;

        // you can change the styles as you like!
        const styles = `
            .text-selection-popup {
                position: absolute;
                visibility: hidden;
                opacity: 0;
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 6px;
                background: #EDF0FA;
                border-radius: 15px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.12);
                z-index: 9999;
                user-select: none;
                transform: translateY(5px) scale(0.95);
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .text-selection-popup.show {
                visibility: visible;
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            .popup-btn {
                width: 36px;
                height: 36px;
                border: none;
                border-radius: 50%;
                background: #f0f2f5;
                color: #333;
                cursor: pointer;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                position: relative;
            }
            .popup-btn:hover {
                background: #E1E5F1;
                transform: scale(1.05);
            }
            .popup-btn.copy { color: #0088ff; }
            .popup-btn.copy:hover { background: #e8f4ff; }
            .popup-btn.search { color: #00c65e; }
            .popup-btn.search:hover { background: #e8f8ef; }
            .popup-btn.translate { color: #ff7d00; }
            .popup-btn.translate:hover { background: #fff4e8; }
            .popup-btn::after {
                content: attr(data-tooltip);
                position: absolute;
                bottom: calc(100% + 6px);
                left: 50%;
                transform: translateX(-50%) scale(0.8);
                opacity: 0;
                padding: 4px 8px;
                background: rgba(0,0,0,0.7);
                color: white;
                font-size: 12px;
                border-radius: 4px;
                white-space: nowrap;
                pointer-events: none;
                transition: all 0.2s ease;
            }
            .popup-btn:hover::after {
                opacity: 1;
                transform: translateX(-50%) scale(1);
            }
            ::selection {
                background: #e8f4ff;
                color: #1d72e3;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.id = 'text-selection-popup-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
}

// Global export
window.TextSelectionPopup = TextSelectionPopup;