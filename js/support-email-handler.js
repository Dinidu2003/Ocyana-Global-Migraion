/**
 * Support Email Handler for Ocyana Global Migration
 * This script handles EmailJS form submissions specifically for the support.html page
 */

// Function to initialize EmailJS with your account
function initSupportEmailJS() {
    // Using the same public key as the main email handler
    emailjs.init("6MgztWwU_P9WcNjJi");
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show validation error
function showError(input, message) {
    // Get the parent form-group
    const formGroup = input.parentElement;
    
    // Remove any existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        formGroup.removeChild(existingError);
    }
    
    // Add error class to input
    input.classList.add('error-input');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff3333';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    
    // Insert error message after the input
    formGroup.appendChild(errorElement);
}

// Function to clear validation error
function clearError(input) {
    // Get the parent form-group
    const formGroup = input.parentElement;
    
    // Remove error class from input
    input.classList.remove('error-input');
    
    // Remove any existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        formGroup.removeChild(existingError);
    }
}

// Function to generate professional email body for support form with clean HTML styling
function generateSupportMessageHtml(formData) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0; padding: 20px; color: #1a1a1a; background-color: #fefefe; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2a6ebb; margin-bottom: 25px; text-align: left; border-bottom: 2px solid #2a6ebb; padding-bottom: 8px;">
        Support Request Details
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #333; text-align: left;">
        ${Object.entries({
          "Name": formData.supportName,
          "Email": `<a href="mailto:${formData.supportEmail}" style="color: #2a6ebb; text-decoration: none;">${formData.supportEmail}</a>`,
          "Phone": formData.supportPhone,
          "Gender": formData.supportSex,
          "Date of Birth": formData.supportDOB,
          "Marital Status": formData.supportMaritalStatus,
          "Country": formData.supportCountry,
          "Destination": formData.supportDestination,
          "Service": formData.supportService,
          "Education Level": formData.supportLevel,
          "Goals": formData.supportGoals,
          "Additional Info": formData.supportAdditional,
          "Wants Updates": formData.supportUpdates
        }).map(([key, value]) => `
          <tr style="border-bottom: 1px solid #eaeaea;">
            <td style="padding: 10px 15px; font-weight: 600; width: 160px; vertical-align: top;">${key}:</td>
            <td style="padding: 10px 15px; vertical-align: top;">${value || '-'}</td>
          </tr>
        `).join('')}
      </table>
    </div>
  `;
}

// Function to handle support form submission
function handleSupportFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Get form fields
    const firstNameInput = form.querySelector('#lsFirstName');
    const middleNameInput = form.querySelector('#lsMiddleName');
    const lastNameInput = form.querySelector('#lsLastName');
    const emailInput = form.querySelector('#lsEmail');
    const phoneInput = form.querySelector('#lsPhone');
    const sexInput = form.querySelector('#lsSex');
    const dobInput = form.querySelector('#lsDOB');
    const maritalStatusInput = form.querySelector('#lsMaritalStatus');
    const countryInput = form.querySelector('#lsCountry');
    const destinationInput = form.querySelector('#lsDestination');
    const serviceInput = form.querySelector('#lsService');
    const levelInput = form.querySelector('#lsLevel');
    const goalsInput = form.querySelector('#lsGoals');
    const additionalInput = form.querySelector('#lsAdditional');
    const agreeInput = form.querySelector('#lsAgree');
    const updatesInput = form.querySelector('#lsUpdates');
    
    // Get values
    const firstName = firstNameInput.value.trim();
    const middleName = middleNameInput ? middleNameInput.value.trim() : '';
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const gender = sexInput.value; // Changed variable name for clarity, though HTML ID remains the same
    const dob = dobInput.value;
    const maritalStatus = maritalStatusInput.value;
    const country = countryInput.value;
    const destination = destinationInput.value;
    const service = serviceInput.value;
    const level = levelInput.value;
    const goals = goalsInput.value.trim();
    const additional = additionalInput.value.trim();
    const isAgreed = agreeInput.checked;
    const wantsUpdates = updatesInput.checked;
    
    // Clear previous errors
    clearError(firstNameInput);
    if (middleNameInput) clearError(middleNameInput);
    clearError(lastNameInput);
    clearError(emailInput);
    clearError(phoneInput);
    clearError(sexInput);
    clearError(dobInput);
    clearError(maritalStatusInput);
    clearError(countryInput);
    clearError(destinationInput);
    clearError(serviceInput);
    clearError(agreeInput);
    
    // Validate inputs
    let isValid = true;
    
    // Required field validation
    if (!firstName) {
        showError(firstNameInput, 'Please enter your first name');
        isValid = false;
    }
    
    if (!lastName) {
        showError(lastNameInput, 'Please enter your last name');
        isValid = false;
    }
    
    if (!email) {
        showError(emailInput, 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!phone) {
        showError(phoneInput, 'Please enter your phone number');
        isValid = false;
    }
    
    if (!gender) {
        showError(sexInput, 'Please select your gender');
        isValid = false;
    }
    
    if (!dob) {
        showError(dobInput, 'Please enter your date of birth');
        isValid = false;
    }
    
    if (!maritalStatus) {
        showError(maritalStatusInput, 'Please select your marital status');
        isValid = false;
    }
    
    if (!country) {
        showError(countryInput, 'Please select your current country');
        isValid = false;
    }
    
    if (!destination) {
        showError(destinationInput, 'Please select your destination country');
        isValid = false;
    }
    
    if (!service) {
        showError(serviceInput, 'Please select the service you need');
        isValid = false;
    }
    
    // Agreement validation
    if (!isAgreed) {
        showError(agreeInput, 'Please agree to the Terms and Conditions');
        isValid = false;
    }
    
    // If validation fails, stop form submission
    if (!isValid) {
        return;
    }
    
    // Change button text to show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Create formData object for HTML email generation
    const formData = {
        supportName: `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`,
        supportEmail: email,
        supportPhone: phone,
        supportSex: gender, // Still using supportSex as property name for backward compatibility
        supportDOB: dob,
        supportMaritalStatus: maritalStatus,
        supportCountry: country,
        supportDestination: destination,
        supportService: service,
        supportLevel: level || 'Not specified',
        supportGoals: goals || 'Not provided',
        supportAdditional: additional || 'Not provided',
        supportUpdates: wantsUpdates ? 'Yes' : 'No'
    };

    // Prepare template parameters with support-specific variable names
    const templateParams = {
        formType: 'Language & Interview Support Form',
        
        // Add HTML formatted message
        message_html: generateSupportMessageHtml(formData),
        // Also including a plain text fallback message
        message: `Support Request Details - Name: ${formData.supportName}, Email: ${email}, Phone: ${phone}`,
        
        // Support-specific variables (will only show in support section)
        supportName: formData.supportName,
        supportEmail: email,
        supportPhone: phone,
        supportSex: gender, // Still using supportSex as property name for backward compatibility
        supportDOB: dob,
        supportMaritalStatus: maritalStatus,
        supportCurrentCountry: country,
        supportDestinationCountry: destination,
        supportServiceNeeded: service,
        supportLanguageLevel: level || 'Not specified',
        supportGoals: goals || 'Not provided',
        supportAdditionalInfo: additional || 'Not provided',
        supportNewsletter: wantsUpdates ? 'Yes' : 'No',
        
        // Display controls (only show support section)
        studentDisplay: 'display: none;',
        parentDisplay: 'display: none;',
        skilledDisplay: 'display: none;',
        unskilledDisplay: 'display: none;',
        supportDisplay: 'display: block;',
        docDisplay: 'display: none;',
        contactDisplay: 'display: none;',
        
        // System information
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        to_name: "Ocyana Global Migration"
    };
    
    // Log form data to console for debugging
    console.log("Sending support form data:", templateParams);
    
    // Send email using EmailJS
    emailjs.send("service_qpahzur", "template_js8zym8", templateParams)
        .then(function(response) {
            console.log("SUCCESS! Support email sent with response:", response);
            console.log("Support form data sent:", templateParams);
            
            // Reset the form
            form.reset();
            
            // Show success message using the existing function
            if (typeof showSuccessMessage === 'function') {
                showSuccessMessage();
            } else {
                alert("Thank you! Your language & interview support inquiry has been submitted successfully. We will contact you within 24 hours.");
            }
            
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            
        }, function(error) {
            console.error("FAILED to send support email:", error);
            console.error("Support form data that failed:", templateParams);
            
            // Show error message
            alert("Failed to submit your inquiry. Please try again later or contact us directly at ocyanamigration@gmail.com");
            
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
}

// Initialize when document is ready
document.addEventListener("DOMContentLoaded", function() {
    // Initialize EmailJS
    initSupportEmailJS();
    
    // Attach submit handler to support form
    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        supportForm.addEventListener('submit', handleSupportFormSubmit);
        console.log('Language & Interview Support form email handler initialized successfully');
    } else {
        console.warn('Language & Interview Support form not found - email handler not attached');
    }
    
    // Add real-time validation
    const formInputs = document.querySelectorAll('#supportForm input, #supportForm select, #supportForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Clear error when user starts typing/selecting
            if (this.value.trim() !== '' || this.type === 'checkbox') {
                clearError(this);
            }
        });
        
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            if (this.classList.contains('error-input')) {
                clearError(this);
            }
        });
    });
});
