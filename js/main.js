/* ========================================
   MAIN APPLICATION LOGIC
   ======================================== */

class TaxiApp {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupFormValidation();
  }

  bindEvents() {
    // CTA Button click handler
    const ctaButton = document.querySelector('.cta');
    if (ctaButton) {
      ctaButton.addEventListener('click', (e) => {
        this.handleTaxiRequest(e);
      });
    }

    // Secondary CTA buttons in empty states
    const secondaryButtons = document.querySelectorAll('.cta-secondary');
    secondaryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.switchToCallTaxi();
      });
    });
  }

  setupFormValidation() {
    // Basic form validation can be added here
    const form = document.querySelector('.card');
    if (form) {
      // Add form validation logic
      console.log('Form validation setup complete');
    }
  }

  handleTaxiRequest(e) {
    e.preventDefault();
    
    // Get form data
    const formData = this.getFormData();
    
    // Validate form
    if (this.validateForm(formData)) {
      this.submitTaxiRequest(formData);
    } else {
      this.showValidationErrors();
    }
  }

  getFormData() {
    // Extract form data
    return {
      name: document.querySelector('input[placeholder*="name"]')?.value || '',
      phone: document.querySelector('input[placeholder*="phone"]')?.value || '',
      room: document.querySelector('.control:has(.bell)')?.textContent || '',
      passengers: document.querySelector('.control:has(.person)')?.textContent || '',
      destination: document.querySelector('input[placeholder*="destination"]')?.value || '',
      specialRequests: this.getSpecialRequests(),
      notes: document.querySelector('.textarea')?.value || ''
    };
  }

  getSpecialRequests() {
    const checkedBoxes = document.querySelectorAll('.check input:checked');
    return Array.from(checkedBoxes).map(checkbox => checkbox.nextElementSibling.textContent);
  }

  validateForm(data) {
    // Basic validation
    const required = ['name', 'phone', 'destination'];
    return required.every(field => data[field] && data[field].trim() !== '');
  }

  submitTaxiRequest(data) {
    // Simulate API call
    console.log('Submitting taxi request:', data);
    
    // Show success message
    this.showSuccessMessage();
    
    // In real implementation, this would make an API call
    // fetch('/api/taxi-request', { method: 'POST', body: JSON.stringify(data) })
  }

  showSuccessMessage() {
    alert('Taxi request submitted successfully!');
  }

  showValidationErrors() {
    alert('Please fill in all required fields.');
  }

  switchToCallTaxi() {
    // Switch to Call a Taxi tab
    const callTaxiButton = document.querySelector('[data-tab="call-taxi"]');
    if (callTaxiButton) {
      callTaxiButton.click();
    }
  }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  new TaxiApp();
});
