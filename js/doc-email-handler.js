/**
 * Visa & Documentation Email Handler for Ocyana Global Migration
 * This script handles EmailJS form submissions specifically for the doc.html page
 */

// Function to initialize EmailJS with your account
function initDocEmailJS() {
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

// Function to generate professional email body for visa & documentation form with clean HTML styling
function generateDocMessageHtml(formData) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0; padding: 20px; color: #1a1a1a; background-color: #fefefe; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2a6ebb; margin-bottom: 25px; text-align: left; border-bottom: 2px solid #2a6ebb; padding-bottom: 8px;">
        Visa & Documentation Request Details
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #333; text-align: left;">
        ${Object.entries({
          "Name": formData.docName,
          "Email": `<a href="mailto:${formData.docEmail}" style="color: #2a6ebb; text-decoration: none;">${formData.docEmail}</a>`,
          "Phone": formData.docPhone,
          "Gender": formData.docSex,
          "Date of Birth": formData.docDOB,
          "Marital Status": formData.docMaritalStatus,
          "Country": formData.docCountry,
          "Visa Type": formData.docVisaType,
          "Message": formData.docMessage,
          "Documents": formData.docDocuments,
          "File Names": formData.docFileNames,
          "File Size": formData.docFileSize
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

// Function to validate file upload (optional for doc services)
function validateFileUpload(fileInput) {
    const files = fileInput.files;
    if (!files || files.length === 0) {
        return { isValid: true, message: '' }; // Files are optional
    }
    
    let totalSize = 0;
    const maxFileSize = 5 * 1024 * 1024; // 5MB per file
    const maxTotalSize = 25 * 1024 * 1024; // 25MB total
    const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        totalSize += file.size;
        
        // Check individual file size
        if (file.size > maxFileSize) {
            return { isValid: false, message: `File "${file.name}" is too large. Maximum 5MB per file.` };
        }
        
        // Check file type
        const fileName = file.name.toLowerCase();
        const isValidType = allowedTypes.some(type => fileName.endsWith(type));
        
        if (!isValidType) {
            return { isValid: false, message: `File "${file.name}" is not supported. Please upload PDF, DOC, DOCX, JPG, or PNG files.` };
        }
    }
    
    // Check total size
    if (totalSize > maxTotalSize) {
        return { isValid: false, message: 'Total file size exceeds 25MB limit.' };
    }
    
    return { isValid: true, message: '' };
}

// Function to handle doc form submission
function handleDocFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Get form fields
    const firstNameInput = form.querySelector('#visaFirstName');
    const middleNameInput = form.querySelector('#visaMiddleName');
    const lastNameInput = form.querySelector('#visaLastName');
    const emailInput = form.querySelector('#visaEmail');
    const phoneInput = form.querySelector('#visaPhone');
    const sexInput = form.querySelector('#visaSex');
    const dobInput = form.querySelector('#visaDOB');
    const maritalStatusInput = form.querySelector('#visaMaritalStatus');
    const countryInput = form.querySelector('#visaCountry');
    const visaTypeInput = form.querySelector('#visaType');
    const messageInput = form.querySelector('#visaMessage');
    const documentInput = form.querySelector('#visaDocument');
    
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
    const visaType = visaTypeInput.value;
    const message = messageInput.value.trim();
    
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
    clearError(visaTypeInput);
    clearError(messageInput);
    clearError(documentInput);
    
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
    
    if (!country) {
        showError(countryInput, 'Please select a country of interest');
        isValid = false;
    }
    
    if (!visaType) {
        showError(visaTypeInput, 'Please select a visa type');
        isValid = false;
    }
    
    if (!message) {
        showError(messageInput, 'Please provide details about your requirements');
        isValid = false;
    }
    
    // File validation (optional)
    const fileValidation = validateFileUpload(documentInput);
    if (!fileValidation.isValid) {
        showError(documentInput, fileValidation.message);
        isValid = false;
    }
    
    // If validation fails, stop form submission
    if (!isValid) {
        return;
    }
    
    // Change button text to show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Prepare file information
    let fileInfo = 'No documents uploaded';
    let fileNames = [];
    let totalFileSize = 0;
    
    if (documentInput.files && documentInput.files.length > 0) {
        fileNames = Array.from(documentInput.files).map(file => file.name);
        totalFileSize = Array.from(documentInput.files).reduce((total, file) => total + file.size, 0);
        fileInfo = `${documentInput.files.length} document(s) uploaded (file handling required separately)`;
    }
    
    // Create formData object for HTML email generation
    const formData = {
        docName: `${firstName} ${lastName}`,
        docEmail: email,
        docPhone: phone,
        docSex: gender, // Still using docSex as property name for backward compatibility
        docDOB: dob,
        docMaritalStatus: maritalStatus,
        docCountry: country,
        docVisaType: visaType,
        docMessage: message,
        docDocuments: documentInput.files && documentInput.files.length > 0 ? 'Yes' : 'No',
        docFileNames: fileNames.join(', ') || 'None',
        docFileSize: totalFileSize > 0 ? `${(totalFileSize / (1024 * 1024)).toFixed(2)} MB` : 'N/A'
    };

    // Prepare template parameters with doc-specific variable names
    const templateParams = {
        formType: 'Visa & Documentation Form',
        
        // Add HTML formatted message
        message_html: generateDocMessageHtml(formData),
        // Also including a plain text fallback message
        message: `Visa & Documentation Request - Name: ${formData.docName}, Email: ${email}, Phone: ${phone}`,
        
        // Doc-specific variables (will only show in doc section)
        docName: formData.docName,
        docEmail: email,
        docPhone: phone,
        docSex: gender, // Still using docSex as property name for backward compatibility
        docDOB: dob,
        docMaritalStatus: maritalStatus,
        docCountryOfInterest: country,
        docVisaType: visaType,
        docRequirements: message,
        docAdditionalInfo: message,
        docFileUpload: documentInput.files && documentInput.files.length > 0 ? 'Yes' : 'No',
        docFileNames: formData.docFileNames,
        docFileSize: formData.docFileSize,
        
        // Display controls (only show doc section)
        studentDisplay: 'display: none;',
        parentDisplay: 'display: none;',
        skilledDisplay: 'display: none;',
        unskilledDisplay: 'display: none;',
        supportDisplay: 'display: none;',
        docDisplay: 'display: block;',
        contactDisplay: 'display: none;',
        
        // System information
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        to_name: "Ocyana Global Migration"
    };
    
    // Log form data to console for debugging
    console.log("Sending visa & documentation form data:", templateParams);
    
    // Send email using EmailJS
    emailjs.send("service_qpahzur", "template_js8zym8", templateParams)
        .then(function(response) {
            console.log("SUCCESS! Visa & documentation email sent with response:", response);
            console.log("Visa & documentation form data sent:", templateParams);
            
            // Reset the form
            form.reset();
            
            // Show success message using the existing function
            if (typeof showSuccessMessage === 'function') {
                showSuccessMessage();
            } else {
                alert("Thank you! Your visa & documentation inquiry has been submitted successfully. We will contact you within 24 hours.");
            }
            
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            
        }, function(error) {
            console.error("FAILED to send visa & documentation email:", error);
            console.error("Visa & documentation form data that failed:", templateParams);
            
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
    initDocEmailJS();
    
    // Attach submit handler to doc form
    const docForm = document.getElementById('docForm');
    if (docForm) {
        docForm.addEventListener('submit', handleDocFormSubmit);
        console.log('Visa & Documentation form email handler initialized successfully');
    } else {
        console.warn('Visa & Documentation form not found - email handler not attached');
    }
    
    // Add real-time validation
    const formInputs = document.querySelectorAll('#docForm input, #docForm select, #docForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Clear error when user starts typing/selecting
            if (this.value.trim() !== '' || this.type === 'checkbox' || this.type === 'file') {
                clearError(this);
            }
        });
        
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            if (this.classList.contains('error-input')) {
                clearError(this);
            }
        });
        
        // Special handling for file input
        if (input.type === 'file') {
            input.addEventListener('change', function() {
                if (this.classList.contains('error-input')) {
                    clearError(this);
                }
            });
        }
    });
});
