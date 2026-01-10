/**
 * Student Email Handler for Ocyana Global Migration
 * This script handles EmailJS form submissions specifically for the student.html page
 */

// Function to initialize EmailJS with your account
function initStudentEmailJS() {
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

// 🧠 Function to generate professional email body for student form with clean HTML styling
function generateStudentMessageHtml(formData) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0; padding: 20px; color: #1a1a1a; background-color: #fefefe; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2a6ebb; margin-bottom: 25px; text-align: left; border-bottom: 2px solid #2a6ebb; padding-bottom: 8px;">
        Student Migration Details
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #333; text-align: left;">
        ${Object.entries({
          "Name": formData.studentName,
          "Email": `<a href="mailto:${formData.studentEmail}" style="color: #2a6ebb; text-decoration: none;">${formData.studentEmail}</a>`,
          "Phone": formData.studentPhone,
          "Gender": formData.studentSex,
          "Date of Birth": formData.studentDOB,
          "Marital Status": formData.studentMaritalStatus,
          "Current Country": formData.studentCurrentCountry,
          "Education Level": formData.studentEducationLevel,
          "Desired Country": formData.studentDesiredCountry,
          "Field of Study": formData.studentStudyField,
          "Academic Goals": formData.studentAcademicGoals,
          "Additional Info": formData.studentAdditionalInfo,
          "CV Upload": formData.studentFileUpload,
          "Newsletter": formData.studentNewsletter
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

// ✅ EmailJS send call
function sendStudentForm(formData) {
  const templateParams = {
    formType: "Student Migration Form",
    message_html: generateStudentMessageHtml(formData), // Using message_html to render HTML properly
    // Also including a plain text fallback message
    message: `Student Migration Details - Name: ${formData.studentName}, Email: ${formData.studentEmail}, Phone: ${formData.studentPhone}`,
    // Individual fields for template customization
    studentName: formData.studentName,
    studentEmail: formData.studentEmail,
    studentPhone: formData.studentPhone,
    studentSex: formData.studentSex,
    studentDOB: formData.studentDOB,
    studentMaritalStatus: formData.studentMaritalStatus,
    studentCurrentCountry: formData.studentCurrentCountry,
    studentEducationLevel: formData.studentEducationLevel,
    studentDesiredCountry: formData.studentDesiredCountry,
    studentStudyField: formData.studentStudyField,
    studentAcademicGoals: formData.studentAcademicGoals,
    studentAdditionalInfo: formData.studentAdditionalInfo,
    studentFileUpload: formData.studentFileUpload,
    studentNewsletter: formData.studentNewsletter,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    to_name: "Ocyana Global Migration",
    service: "Student Migration Services"
  };

  emailjs.send("service_qpahzur", "template_js8zym8", templateParams)
    .then(response => {
      console.log("✅ Email successfully sent!", response.status, response.text);
      
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
      
      // Show success message
      if (typeof showSuccessMessage === 'function') {
        showSuccessMessage();
      } else {
        alert("Form submitted successfully!");
      }
    })
    .catch(error => {
      console.error("❌ Failed to send email:", error);
      alert("Failed to submit form. Please try again or contact us directly at ocyanamigration@gmail.com");
    });
}

// Function to handle student form submission
function handleStudentFormSubmit(event) {
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
    const desiredCountryInput = form.querySelector('#desiredCountry');
    const studyFieldInput = form.querySelector('#studyField');
    const academicGoalsInput = form.querySelector('#academicGoals');
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
    const desiredCountry = desiredCountryInput.value;
    const studyField = studyFieldInput.value;
    const academicGoals = academicGoalsInput.value.trim();
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
    clearError(desiredCountryInput);
    clearError(studyFieldInput);
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
    
    if (!desiredCountry) {
        showError(desiredCountryInput, 'Please select your desired study destination');
        isValid = false;
    }
    
    if (!studyField) {
        showError(studyFieldInput, 'Please select your field of study');
        isValid = false;
    }
    

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
    
    // Create formData object for the new send function
    const formData = {
        studentName: middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`,
        studentEmail: email,
        studentPhone: phone,
        studentSex: gender, // Still using studentSex as the property name for backward compatibility
        studentDOB: dob,
        studentMaritalStatus: maritalStatus,
        studentCurrentCountry: currentCountry,
        studentEducationLevel: educationLevel,
        studentDesiredCountry: desiredCountry,
        studentStudyField: studyField,
        studentAcademicGoals: academicGoals || 'Not provided',
        studentAdditionalInfo: additionalInfo || 'Not provided',
        studentFileUpload: cvUploadInput.files[0] ? 'Yes - CV uploaded' : 'No file uploaded',
        studentNewsletter: wantsNewsletter ? 'Yes' : 'No'
    };
    
    // Log form data to console for debugging
    console.log("Sending student form data:", formData);
    
    // Use the new send function
    sendStudentForm(formData);
    
    // Reset form
    form.reset();
    
    // Reset button state
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }, 1500);
}

// Function to handle file upload preview (integrates with existing functionality)
function setupFileUploadPreview() {
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


document.addEventListener("DOMContentLoaded", function() {

    initStudentEmailJS();
    
    
    setupFileUploadPreview();
    
    
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', handleStudentFormSubmit);
        console.log('Student form email handler initialized successfully');
    } else {
        console.warn('Student form not found - email handler not attached');
    }
    

    const formInputs = document.querySelectorAll('#studentForm input, #studentForm select, #studentForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            
            if (this.value.trim() !== '' || this.type === 'checkbox') {
                clearError(this);
            }
        });
        
        input.addEventListener('input', function() {
      
            if (this.classList.contains('error-input')) {
                clearError(this);
            }
        });
    });
});
