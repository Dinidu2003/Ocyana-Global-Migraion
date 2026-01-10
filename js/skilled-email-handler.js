/**
 * Skilled Migration Email Handler for Ocyana Global Migration
 * This script handles EmailJS form submissions specifically for the skilled.html page
 */

// Function to initialize EmailJS with your account
function initSkilledEmailJS() {
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

// Function to validate file upload
function validateFileUpload(fileInput) {
    const file = fileInput.files[0];
    if (!file) {
        return { isValid: false, message: 'Please upload your CV' };
    }
    
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        return { isValid: false, message: 'File size must be less than 5MB' };
    }
    
    // Check file type
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValidType = allowedTypes.some(type => fileName.endsWith(type));
    
    if (!isValidType) {
        return { isValid: false, message: 'Please upload a PDF, DOC, or DOCX file' };
    }
    
    return { isValid: true, message: '' };
}

// Function to generate professional email body for skilled migration form with clean HTML styling
function generateSkilledMessageHtml(formData) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0; padding: 20px; color: #1a1a1a; background-color: #fefefe; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2a6ebb; margin-bottom: 25px; text-align: left; border-bottom: 2px solid #2a6ebb; padding-bottom: 8px;">
        Skilled Migration Details
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #333; text-align: left;">
        ${Object.entries({
          "Name": formData.skilledName,
          "Email": `<a href="mailto:${formData.skilledEmail}" style="color: #2a6ebb; text-decoration: none;">${formData.skilledEmail}</a>`,
          "Phone": formData.skilledPhone,
          "Gender": formData.skilledSex,
          "Date of Birth": formData.skilledDOB,
          "Marital Status": formData.skilledMaritalStatus,
          "Current Country": formData.skilledCurrentCountry,
          "Education Level": formData.skilledEducationLevel,
          "Occupation": formData.skilledOccupation,
          "Work Experience": formData.skilledWorkExperience,
          "Desired Country": formData.skilledDesiredCountry,
          "English Test": formData.skilledEnglishTest,
          "Migration Goals": formData.skilledMigrationGoals,
          "Additional Info": formData.skilledAdditionalInfo,
          "CV Upload": formData.skilledFileUpload,
          "Newsletter": formData.skilledNewsletter
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

// Function to handle skilled form submission
function handleSkilledFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Get form fields
    const firstNameInput = form.querySelector('#firstName');
    const middleNameInput = form.querySelector('#middleName');
    const lastNameInput = form.querySelector('#lastName');
    const sexInput = form.querySelector('#sex');
    const dobInput = form.querySelector('#dob');
    const maritalStatusInput = form.querySelector('#maritalStatus');
    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');
    const currentCountryInput = form.querySelector('#currentCountry');
    const educationLevelInput = form.querySelector('#educationLevel');
    const occupationInput = form.querySelector('#occupation');
    const workExperienceInput = form.querySelector('#workExperience');
    const desiredCountryInput = form.querySelector('#desiredCountry');
    const englishTestInput = form.querySelector('#englishTest');
    const migrationGoalsInput = form.querySelector('#migrationGoals');
    const additionalInfoInput = form.querySelector('#additionalInfo');
    const cvUploadInput = form.querySelector('#cvUpload');
    const agreeInput = form.querySelector('#agree');
    const newsletterInput = form.querySelector('#newsletter');
    
    // Get values
    const firstName = firstNameInput.value.trim();
    const middleName = middleNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const gender = sexInput.value; // Changed variable name for clarity, though HTML ID remains the same
    const dob = dobInput.value;
    const maritalStatus = maritalStatusInput.value;
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const currentCountry = currentCountryInput.value;
    const educationLevel = educationLevelInput.value;
    const occupation = occupationInput.value.trim();
    const workExperience = workExperienceInput.value;
    const desiredCountry = desiredCountryInput.value;
    const englishTest = englishTestInput.value;
    const migrationGoals = migrationGoalsInput.value.trim();
    const additionalInfo = additionalInfoInput.value.trim();
    const isAgreed = agreeInput.checked;
    const wantsNewsletter = newsletterInput.checked;
    
    // Clear previous errors
    clearError(firstNameInput);
    clearError(middleNameInput);
    clearError(lastNameInput);
    clearError(sexInput);
    clearError(dobInput);
    clearError(maritalStatusInput);
    clearError(emailInput);
    clearError(phoneInput);
    clearError(currentCountryInput);
    clearError(educationLevelInput);
    clearError(occupationInput);
    clearError(workExperienceInput);
    clearError(desiredCountryInput);
    clearError(cvUploadInput);
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
    
    if (!currentCountry) {
        showError(currentCountryInput, 'Please select your current country');
        isValid = false;
    }
    
    if (!educationLevel) {
        showError(educationLevelInput, 'Please select your education level');
        isValid = false;
    }
    
    if (!occupation) {
        showError(occupationInput, 'Please enter your occupation');
        isValid = false;
    }
    
    if (!workExperience) {
        showError(workExperienceInput, 'Please select your work experience');
        isValid = false;
    }
    
    if (!desiredCountry) {
        showError(desiredCountryInput, 'Please select your preferred destination');
        isValid = false;
    }
    
    // File validation
    const fileValidation = validateFileUpload(cvUploadInput);
    if (!fileValidation.isValid) {
        showError(cvUploadInput, fileValidation.message);
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
        skilledName: middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`,
        skilledEmail: email,
        skilledPhone: phone,
        skilledSex: gender, // Still using skilledSex as the property name for backward compatibility
        skilledDOB: dob,
        skilledMaritalStatus: maritalStatus,
        skilledCurrentCountry: currentCountry,
        skilledEducationLevel: educationLevel,
        skilledOccupation: occupation,
        skilledWorkExperience: workExperience,
        skilledDesiredCountry: desiredCountry,
        skilledEnglishTest: englishTest || 'Not taken yet',
        skilledMigrationGoals: migrationGoals || 'Not provided',
        skilledAdditionalInfo: additionalInfo || 'Not provided',
        skilledFileUpload: cvUploadInput.files[0] ? 'Yes - CV uploaded' : 'No file uploaded',
        skilledNewsletter: wantsNewsletter ? 'Yes' : 'No'
    };
    
    // Prepare template parameters with skilled-specific variable names
    const templateParams = {
        formType: 'Skilled Migration Form',
        
        // Add HTML formatted message
        message_html: generateSkilledMessageHtml(formData),
        // Also including a plain text fallback message
        message: `Skilled Migration Details - Name: ${formData.skilledName}, Email: ${email}, Phone: ${phone}`,
        
        // Individual fields for template customization
        skilledName: formData.skilledName,
        skilledEmail: email,
        skilledPhone: phone,
        skilledSex: gender, // Still using skilledSex as property name for backward compatibility
        skilledDOB: dob,
        skilledMaritalStatus: maritalStatus,
        skilledCurrentCountry: currentCountry,
        skilledEducationLevel: educationLevel,
        skilledOccupation: occupation,
        skilledWorkExperience: workExperience,
        skilledDesiredCountry: desiredCountry,
        skilledEnglishTest: englishTest || 'Not taken yet',
        skilledMigrationGoals: migrationGoals || 'Not provided',
        skilledAdditionalInfo: additionalInfo || 'Not provided',
        skilledFileUpload: cvUploadInput.files[0] ? 'Yes - CV uploaded' : 'No file uploaded',
        skilledNewsletter: wantsNewsletter ? 'Yes' : 'No',
        
        // Display controls (only show skilled section)
        studentDisplay: 'display: none;',
        parentDisplay: 'display: none;',
        skilledDisplay: 'display: block;',
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
    console.log("Sending skilled migration form data:", templateParams);
    
    // Send email using EmailJS
    emailjs.send("service_qpahzur", "template_js8zym8", templateParams)
        .then(function(response) {
            console.log("SUCCESS! Skilled migration email sent with response:", response);
            console.log("Skilled migration form data sent:", templateParams);
            
            // Reset the form
            form.reset();
            
            // Reset file upload display
            const filePreview = document.getElementById('filePreview');
            if (filePreview) {
                filePreview.style.display = 'none';
            }
            
            // Reset file upload label
            const fileUploadText = document.querySelector('.file-upload-text');
            if (fileUploadText) {
                fileUploadText.textContent = 'Choose a file';
            }
            
            // Show success message using the existing function
            if (typeof showSuccessMessage === 'function') {
                showSuccessMessage();
            } else {
                alert("Thank you! Your skilled migration application has been submitted successfully. We will contact you within 24 hours.");
            }
            
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            
        }, function(error) {
            console.error("FAILED to send skilled migration email:", error);
            console.error("Skilled migration form data that failed:", templateParams);
            
            // Show error message
            alert("Failed to submit your application. Please try again later or contact us directly at ocyanamigration@gmail.com");
            
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
}

// Function to handle file upload preview (integrates with existing functionality)
function setupSkilledFileUploadPreview() {
    const fileInput = document.getElementById('cvUpload');
    const filePreview = document.getElementById('filePreview');
    const fileUploadText = document.querySelector('.file-upload-text');
    const removeFileBtn = document.getElementById('removeFileBtn');
    
    if (fileInput && filePreview && fileUploadText) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const fileName = document.querySelector('.file-name');
                if (fileName) {
                    fileName.textContent = file.name;
                }
                fileUploadText.textContent = file.name;
                filePreview.style.display = 'flex';
                
                // Clear any existing file upload errors
                clearError(fileInput);
            }
        });
        
        if (removeFileBtn) {
            removeFileBtn.addEventListener('click', function() {
                fileInput.value = '';
                filePreview.style.display = 'none';
                fileUploadText.textContent = 'Choose a file';
            });
        }
    }
}

// Initialize when document is ready
document.addEventListener("DOMContentLoaded", function() {
    // Initialize EmailJS
    initSkilledEmailJS();
    
    // Setup file upload preview
    setupSkilledFileUploadPreview();
    
    // Attach submit handler to skilled form
    const skilledForm = document.getElementById('skilledForm');
    if (skilledForm) {
        skilledForm.addEventListener('submit', handleSkilledFormSubmit);
        console.log('Skilled migration form email handler initialized successfully');
    } else {
        console.warn('Skilled migration form not found - email handler not attached');
    }
    
    // Add real-time validation
    const formInputs = document.querySelectorAll('#skilledForm input, #skilledForm select, #skilledForm textarea');
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
