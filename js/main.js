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
    // Extract form data from actual inputs
    const form = document.querySelector('#call-taxi .card');
    return {
      name: form.querySelector('input[type="text"]')?.value || '',
      phone: form.querySelector('input[type="tel"]')?.value || '',
      room: form.querySelector('input[value="101"]')?.value || '',
      passengers: form.querySelector('select')?.value || '',
      destination: form.querySelector('input[placeholder*="Airport"]')?.value || '',
      specialRequests: this.getSpecialRequests(),
      notes: form.querySelector('textarea')?.value || ''
    };
  }

  getSpecialRequests() {
    const checkedBoxes = document.querySelectorAll('.check input:checked');
    return Array.from(checkedBoxes).map(checkbox => checkbox.nextElementSibling.textContent);
  }

  validateForm(data) {
    // Enhanced validation
    const errors = [];
    
    // Required fields
    if (!data.name || data.name.trim() === '') {
      errors.push('Name is required');
    }
    
    if (!data.phone || data.phone.trim() === '') {
      errors.push('Phone number is required');
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(data.phone)) {
      errors.push('Please enter a valid phone number');
    }
    
    if (!data.destination || data.destination.trim() === '') {
      errors.push('Destination is required');
    }
    
    if (!data.passengers || data.passengers === '') {
      errors.push('Number of passengers is required');
    }
    
    // Store errors for display
    this.validationErrors = errors;
    return errors.length === 0;
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
    this.clearMessages();
    const successContainer = document.createElement('div');
    successContainer.className = 'success-message';
    successContainer.innerHTML = `
      <div style="background: #44ff44; color: #141414; padding: 12px; border-radius: 8px; margin: 16px 0;">
        <strong>✅ Taxi request submitted successfully!</strong>
        <p style="margin: 8px 0 0;">We'll contact you shortly to confirm your taxi.</p>
      </div>
    `;
    
    const form = document.querySelector('#call-taxi .card');
    form.insertBefore(successContainer, form.firstChild);
    
    // Clear form after success
    setTimeout(() => {
      this.clearForm();
    }, 3000);
  }

  showValidationErrors() {
    // Create error display
    this.clearMessages();
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.innerHTML = `
      <div style="background: #ff4444; color: white; padding: 12px; border-radius: 8px; margin: 16px 0;">
        <strong>Please fix the following errors:</strong>
        <ul style="margin: 8px 0 0 20px;">
          ${this.validationErrors.map(error => `<li>${error}</li>`).join('')}
        </ul>
      </div>
    `;
    
    const form = document.querySelector('#call-taxi .card');
    form.insertBefore(errorContainer, form.firstChild);
  }

  clearMessages() {
    // Remove existing error/success messages
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
  }

  clearForm() {
    // Clear all form inputs
    const form = document.querySelector('#call-taxi .card');
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        input.checked = false;
      } else {
        input.value = '';
      }
    });
    
    // Reset room to default
    const roomInput = form.querySelector('input[value="101"]');
    if (roomInput) {
      roomInput.value = '101';
    }
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
