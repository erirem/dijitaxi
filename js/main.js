// Taxi App - Main Application Logic
class TaxiApp {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupFormValidation();
    this.setupPhoneInput();
  }

  bindEvents() {
    // CTA Button click handler
    const ctaButton = document.querySelector('.cta');
    if (ctaButton) {
      ctaButton.addEventListener('click', (e) => {
        this.handleTaxiRequest(e);
      });
    }

    // Secondary CTA buttons (for empty states)
    const secondaryButtons = document.querySelectorAll('.cta-secondary');
    secondaryButtons.forEach(button => {
      button.addEventListener('click', () => {
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

  setupPhoneInput() {
    const countryBtn = document.getElementById('country-btn');
    const countryDropdown = document.getElementById('country-dropdown');

    console.log('Phone input setup:', { countryBtn, countryDropdown });

    if (!countryBtn || !countryDropdown) {
      console.error('Phone input elements not found');
      return;
    }

    // Load countries dynamically
    this.loadCountries();
    this.bindPhoneEvents();
  }

  loadCountries() {
    const countryDropdown = document.getElementById('country-dropdown');
    countryDropdown.innerHTML = '';

    // Use countries data from external file
    COUNTRIES_DATA.forEach(country => {
      const option = document.createElement('div');
      option.className = 'country-option';
      option.dataset.code = country.code;
      option.dataset.flag = country.flag;
      
      option.innerHTML = `
        <span class="country-flag">${country.flag}</span>
        <span class="country-name">${country.name}</span>
        <span class="country-code">${country.code}</span>
      `;
      
      countryDropdown.appendChild(option);
    });
  }

  bindPhoneEvents() {
    const countryBtn = document.getElementById('country-btn');
    const countryDropdown = document.getElementById('country-dropdown');

    console.log('Binding phone events:', { countryBtn, countryDropdown });

    // Toggle dropdown
    countryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('Country button clicked');
      countryDropdown.classList.toggle('show');
      console.log('Dropdown classes after toggle:', countryDropdown.className);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!countryBtn.contains(e.target)) {
        countryDropdown.classList.remove('show');
      }
    });

    // Handle country selection (event delegation)
    countryDropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.country-option');
      if (option) {
        const flag = option.dataset.flag;
        const code = option.dataset.code;
        
        console.log('Country selected:', { flag, code });
        
        // Update button
        countryBtn.querySelector('.country-flag').textContent = flag;
        countryBtn.querySelector('.country-code').textContent = code;
        
        // Close dropdown
        countryDropdown.classList.remove('show');
      }
    });
  }

  handleTaxiRequest(e) {
    e.preventDefault();
    
    // Get form data
    const formData = this.getFormData();
    
    // Validate form
    if (this.validateForm(formData)) {
      this.submitTaxiRequest(formData);
      this.showSuccessMessage();
    } else {
      this.showValidationErrors();
    }
  }

  getFormData() {
    // Extract form data from actual inputs
    const form = document.querySelector('#call-taxi .card');
    const countryCode = document.querySelector('.country-code').textContent;
    const phoneNumber = document.querySelector('.phone-number-input').value;
    
    return {
      name: form.querySelector('input[type="text"]')?.value || '',
      phone: `${countryCode}${phoneNumber}`,
      countryCode: countryCode,
      phoneNumber: phoneNumber,
      room: form.querySelector('input[value="101"]')?.value || '',
      passengers: form.querySelector('select')?.value || '',
      destination: form.querySelector('input[placeholder*="Airport"]')?.value || '',
      specialRequests: this.getSpecialRequests(),
      notes: form.querySelector('textarea')?.value || ''
    };
  }

  getSpecialRequests() {
    const checkedBoxes = document.querySelectorAll('.check input:checked');
    return Array.from(checkedBoxes).map(checkbox => {
      // Get the text content from the parent label
      const label = checkbox.closest('label');
      return label ? label.textContent.trim() : '';
    }).filter(text => text !== '');
  }

  validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
      errors.push('Name is required');
    }
    
    if (!data.phoneNumber || data.phoneNumber.trim() === '') {
      errors.push('Phone number is required');
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(data.phoneNumber)) {
      errors.push('Please enter a valid phone number');
    }
    
    if (!data.destination || data.destination.trim() === '') {
      errors.push('Destination is required');
    }
    
    if (!data.passengers || data.passengers === '') {
      errors.push('Number of passengers is required');
    }
    
    this.validationErrors = errors;
    return errors.length === 0;
  }

  submitTaxiRequest(data) {
    console.log('Submitting taxi request:', data);
    
    // Show loading state
    this.showLoadingState();
    
    // API call - ready for integration
    fetch('/api/taxi-request', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(data) 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      this.hideLoadingState();
      this.showSuccessMessage();
      // Trigger custom event for parent website
      this.triggerTaxiRequestEvent(result);
    })
    .catch(error => {
      this.hideLoadingState();
      this.showApiError(error);
    });
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
    
    // Clear form after 3 seconds
    setTimeout(() => {
      this.clearForm();
    }, 3000);
  }

  showValidationErrors() {
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
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
  }

  clearForm() {
    const form = document.querySelector('#call-taxi .card');
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        input.checked = false;
      } else {
        input.value = '';
      }
    });
    
    // Reset room to default value
    const roomInput = form.querySelector('input[value="101"]');
    if (roomInput) {
      roomInput.value = '101';
    }
  }

  switchToCallTaxi() {
    const callTaxiButton = document.querySelector('[data-tab="call-taxi"]');
    if (callTaxiButton) {
      callTaxiButton.click();
    }
  }

  showLoadingState() {
    const ctaButton = document.querySelector('.cta');
    if (ctaButton) {
      ctaButton.disabled = true;
      ctaButton.innerHTML = '⏳ Submitting...';
      ctaButton.style.opacity = '0.7';
    }
  }

  hideLoadingState() {
    const ctaButton = document.querySelector('.cta');
    if (ctaButton) {
      ctaButton.disabled = false;
      ctaButton.innerHTML = 'Call a Taxi Now';
      ctaButton.style.opacity = '1';
    }
  }

  showApiError(error) {
    this.clearMessages();
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.innerHTML = `
      <div style="background: #ff4444; color: white; padding: 12px; border-radius: 8px; margin: 16px 0;">
        <strong>❌ Request failed!</strong>
        <p style="margin: 8px 0 0;">${error.message || 'Please try again later.'}</p>
      </div>
    `;
    const form = document.querySelector('#call-taxi .card');
    form.insertBefore(errorContainer, form.firstChild);
  }

  triggerTaxiRequestEvent(result) {
    // Custom event for parent website integration
    const event = new CustomEvent('taxiRequestSubmitted', {
      detail: {
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      }
    });
    document.dispatchEvent(event);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new TaxiApp();
});