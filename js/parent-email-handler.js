/**
 * Parent Migration Email Handler for Ocyana Global Migration
 * This script handles EmailJS form submissions specifically for the parent.html page
 */

// Function to initialize EmailJS with your account
function initParentEmailJS() {
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

// Function to generate professional email body for parent form with clean HTML styling
function generateParentMessageHtml(formData) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0; padding: 20px; color: #1a1a1a; background-color: #fefefe; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2a6ebb; margin-bottom: 25px; text-align: left; border-bottom: 2px solid #2a6ebb; padding-bottom: 8px;">
        Parent Migration Details
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #333; text-align: left;">
        ${Object.entries({
          "Name": formData.parentName,
          "Email": `<a href="mailto:${formData.parentEmail}" style="color: #2a6ebb; text-decoration: none;">${formData.parentEmail}</a>`,
          "Phone": formData.parentPhone,
          "Gender": formData.parentSex,
          "Date of Birth": formData.parentDob,
          "Marital Status": formData.parentMaritalStatus,
          "Current Country": formData.parentCurrentCountry,
          "Residency Status": formData.parentResidencyStatus,
          "Parents Location": formData.parentParentsLocation,
          "Urgency": formData.parentUrgency,
          "Family Details": formData.parentFamilyDetails,
          "Additional Info": formData.parentAdditionalInfo,
          "Newsletter": formData.parentNewsletter
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

// Function to handle parent form submission
function handleParentFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Get form fields
    const firstNameInput = form.querySelector('#firstName');
    const middleNameInput = form.querySelector('#middleName');
    const lastNameInput = form.querySelector('#lastName');
    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');
    const sexInput = form.querySelector('#sex');
    const dobInput = form.querySelector('#dob');
    const maritalStatusInput = form.querySelector('#maritalStatus');
    const currentCountryInput = form.querySelector('#currentCountry');
    const residencyStatusInput = form.querySelector('#residencyStatus');
    const parentsLocationInput = form.querySelector('#parentsLocation');
    const urgencyInput = form.querySelector('#urgency');
    const familyDetailsInput = form.querySelector('#familyDetails');
    const additionalInfoInput = form.querySelector('#additionalInfo');
    const agreeInput = form.querySelector('#agree');
    const newsletterInput = form.querySelector('#newsletter');
    
    // Get values
    const firstName = firstNameInput.value.trim();
    const middleName = middleNameInput ? middleNameInput.value.trim() : '';
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const gender = sexInput.value; // Changed variable name for clarity, though HTML ID remains the same
    const dob = dobInput.value;
    const maritalStatus = maritalStatusInput.value;
    const currentCountry = currentCountryInput.value;
    const residencyStatus = residencyStatusInput.value;
    const parentsLocation = parentsLocationInput.value.trim();
    const urgency = urgencyInput.value;
    const familyDetails = familyDetailsInput.value.trim();
    const additionalInfo = additionalInfoInput.value.trim();
    const isAgreed = agreeInput.checked;
    const wantsNewsletter = newsletterInput.checked;
    
    // Clear previous errors
    clearError(firstNameInput);
    clearError(middleNameInput);
    clearError(lastNameInput);
    clearError(emailInput);
    clearError(phoneInput);
    clearError(sexInput);
    clearError(dobInput);
    clearError(maritalStatusInput);
    clearError(currentCountryInput);
    clearError(residencyStatusInput);
    clearError(parentsLocationInput);
    clearError(urgencyInput);
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
    
    if (!currentCountry) {
        showError(currentCountryInput, 'Please select your current country');
        isValid = false;
    }
    
    if (!residencyStatus) {
        showError(residencyStatusInput, 'Please select your residency status');
        isValid = false;
    }
    
    if (!parentsLocation) {
        showError(parentsLocationInput, 'Please enter your parents\' current location');
        isValid = false;
    }
    
    if (!urgency) {
        showError(urgencyInput, 'Please select the urgency level');
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
        parentName: middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`,
        parentEmail: email,
        parentPhone: phone,
        parentSex: gender, // Still using parentSex as the property name for backward compatibility
        parentDob: dob,
        parentMaritalStatus: maritalStatus,
        parentMiddleName: middleName || 'Not provided',
        parentCurrentCountry: currentCountry,
        parentResidencyStatus: residencyStatus,
        parentParentsLocation: parentsLocation,
        parentUrgency: urgency,
        parentFamilyDetails: familyDetails || 'Not provided',
        parentAdditionalInfo: additionalInfo || 'Not provided',
        parentNewsletter: wantsNewsletter ? 'Yes' : 'No'
    };

    // Prepare template parameters with parent-specific variable names
    const templateParams = {
        formType: 'Parent Migration Form',
        
        // Add HTML formatted message
        message_html: generateParentMessageHtml(formData),
        // Also including a plain text fallback message
        message: `Parent Migration Details - Name: ${formData.parentName}, Email: ${email}, Phone: ${phone}`,
        
        // Parent-specific variables (will only show in parent section)
        parentName: formData.parentName,
        parentEmail: email,
        parentPhone: phone,
        parentSex: gender, // Still using parentSex as property name for backward compatibility
        parentDob: dob,
        parentMaritalStatus: maritalStatus,
        parentMiddleName: middleName || 'Not provided',
        parentCurrentCountry: currentCountry,
        parentResidencyStatus: residencyStatus,
        parentParentsLocation: parentsLocation,
        parentUrgency: urgency,
        parentFamilyDetails: familyDetails || 'Not provided',
        parentAdditionalInfo: additionalInfo || 'Not provided',
        parentNewsletter: wantsNewsletter ? 'Yes' : 'No',
        
        // Display controls (only show parent section)
        studentDisplay: 'display: none;',
        parentDisplay: 'display: block;',
        skilledDisplay: 'display: none;',
        unskilledDisplay: 'display: none;',
        supportDisplay: 'display: none;',
        docDisplay: 'display: none;',
        contactDisplay: 'display: none;',
        
        // System information
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        to_name: "Ocyana Global Migration"
    };
    
    // Log form data to console for debugging
    console.log("Sending parent migration form data:", templateParams);
    
    // Send email using EmailJS
    emailjs.send("service_qpahzur", "template_js8zym8", templateParams)
        .then(function(response) {
            console.log("SUCCESS! Parent migration email sent with response:", response);
            console.log("Parent migration form data sent:", templateParams);
            
            // Reset the form
            form.reset();
            
            // Show success message using the existing function
            if (typeof showSuccessMessage === 'function') {
                showSuccessMessage();
            } else {
                alert("Thank you! Your parent migration inquiry has been submitted successfully. We will contact you within 24 hours.");
            }
            
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            
        }, function(error) {
            console.error("FAILED to send parent migration email:", error);
            console.error("Parent migration form data that failed:", templateParams);
            
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
    initParentEmailJS();
    
    // Attach submit handler to parent form
    const parentForm = document.getElementById('parentForm');
    if (parentForm) {
        parentForm.addEventListener('submit', handleParentFormSubmit);
        console.log('Parent migration form email handler initialized successfully');
    } else {
        console.warn('Parent migration form not found - email handler not attached');
    }
    
    // Add real-time validation
    const formInputs = document.querySelectorAll('#parentForm input, #parentForm select, #parentForm textarea');
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
