/* ========================================
   TAB NAVIGATION FUNCTIONALITY
   ======================================== */

class TabManager {
  constructor() {
    this.tabButtons = document.querySelectorAll('.tab-btn');
    this.tabPanels = document.querySelectorAll('.tab-panel');
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.switchTab(e.target.closest('.tab-btn'));
      });
    });
  }

  switchTab(activeButton) {
    const targetTab = activeButton.getAttribute('data-tab');
    
    // Remove active class from all buttons and panels
    this.tabButtons.forEach(btn => btn.classList.remove('active'));
    this.tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked button and corresponding panel
    activeButton.classList.add('active');
    const targetPanel = document.getElementById(targetTab);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new TabManager();
});
