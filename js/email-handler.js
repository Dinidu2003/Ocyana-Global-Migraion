/**
 * Email Handler for Ocyana Global Migration
 * This script uses EmailJS service to handle form submissions and send emails
 */

// Function to initialize EmailJS with your account
function initEmailJS() {
    try {
        // Initialize EmailJS
        emailjs.init("6MgztWwU_P9WcNjJi");
        console.log("EmailJS initialized successfully");
        
        // Test EmailJS availability
        if (typeof emailjs === 'undefined') {
            throw new Error("EmailJS library not loaded");
        }
        
        return true;
    } catch (error) {
        console.error("Failed to initialize EmailJS:", error);
        return false;
    }
}

// Function to show fallback contact options when EmailJS fails
function showFallbackMessage() {
    const fallbackModal = document.createElement('div');
    fallbackModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: Arial, sans-serif;
    `;
    
    fallbackModal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; text-align: center;">
            <h3 style="color: #0d47a1; margin-bottom: 20px;">Unable to Send Message</h3>
            <p style="margin-bottom: 20px;">We're experiencing technical difficulties with our contact form. Please use one of these alternative methods:</p>
            
            <div style="margin: 20px 0;">
                <a href="mailto:ocyanamigration@gmail.com?subject=Contact%20Form%20Inquiry&body=Name:%20${encodeURIComponent(document.getElementById('name').value)}%0D%0AEmail:%20${encodeURIComponent(document.getElementById('email').value)}%0D%0APhone:%20${encodeURIComponent(document.getElementById('phone').value)}%0D%0AMessage:%20${encodeURIComponent(document.getElementById('message').value)}" 
                   style="display: inline-block; background: #0d47a1; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">
                    📧 Send Email Directly
                </a>
            </div>
            
            <div style="margin: 20px 0;">
                <a href="https://wa.me/94777638715?text=Hello%20Ocyana%20Global%20Migration,%20I'm%20interested%20in%20your%20services." 
                   target="_blank"
                   style="display: inline-block; background: #25D366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">
                    📱 WhatsApp Us
                </a>
            </div>
            
            <div style="margin: 20px 0;">
                <a href="tel:+94777638715" 
                   style="display: inline-block; background: #42a5f5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">
                    📞 Call Us: +94 77 763 8715
                </a>
            </div>
            
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #ccc; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px;">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(fallbackModal);
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

// Function to handle contact form submission
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const successMessage = document.getElementById('successMessage');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Get form fields
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');
    const serviceInput = form.querySelector('#service');
    const messageInput = form.querySelector('#message');
    
    // Get values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const service = serviceInput.value;
    const message = messageInput.value.trim();
    
    // Clear previous errors
    clearError(nameInput);
    clearError(emailInput);
    clearError(messageInput);
    
    // Validate inputs
    let isValid = true;
    
    // Name validation
    if (!name) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    }
    
    // Email validation
    if (!email) {
        showError(emailInput, 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (!message) {
        showError(messageInput, 'Please enter your message');
        isValid = false;
    }
    
    // If validation fails, stop form submission
    if (!isValid) {
        return;
    }
    
    // Change button text to show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    
    // Get form data with contact-specific variable names
    const templateParams = {
        formType: 'Contact Form',
        
        // Contact-specific variables (will only show in contact section)
        contactName: name,
        contactEmail: email,
        contactPhone: phone || 'Not provided',
        contactService: service || 'Not selected',
        contactSubject: 'General Inquiry',
        contactMessage: message,
        
        // Display controls (only show contact section)
        studentDisplay: 'display: none;',
        parentDisplay: 'display: none;',
        skilledDisplay: 'display: none;',
        unskilledDisplay: 'display: none;',
        supportDisplay: 'display: none;',
        docDisplay: 'display: none;',
        contactDisplay: 'display: block;',
        
        // System information
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        to_name: "Ocyana Global Migration"
    };
    
    // Log form data to console for debugging
    console.log("Sending form data:", templateParams);
    
    // Send email using EmailJS
    emailjs.send("service_qpahzur", "template_js8zym8", templateParams)
        .then(function(response) {
            console.log("SUCCESS! Email sent with response:", response);
            console.log("Form data sent:", templateParams);
            
            // Reset the form
            form.reset();
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }, function(error) {
            console.error("FAILED to send email:", error);
            console.error("Form data that failed:", templateParams);
            alert("Failed to send message. Please try again later or contact us directly at ocyanamigration@gmail.com");
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
}

// Function to handle all form submissions
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formId = form.id;
    // First try to find the success message as the next element sibling
    // Then look for an element with ID successMessage
    // Finally fall back to any element with successMessage in its ID
    const successMessage = form.nextElementSibling?.id === 'successMessage' || form.nextElementSibling?.classList.contains('success-message') ? 
        form.nextElementSibling : 
        document.getElementById('successMessage') || document.querySelector('[id*="successMessage"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Get common form fields - handle different ID patterns
    const nameInput = form.querySelector('#name') || form.querySelector('[name="name"]') || 
                     form.querySelector('#firstName') || form.querySelector('[name="firstName"]');
    const emailInput = form.querySelector('#email') || form.querySelector('[name="email"]') || 
                      form.querySelector('[id*="Email"]') || form.querySelector('[name*="email"]');
    const phoneInput = form.querySelector('#phone') || form.querySelector('[name="phone"]') || 
                      form.querySelector('[id*="Phone"]') || form.querySelector('[name*="phone"]');
    const messageInput = form.querySelector('#message') || form.querySelector('[name="message"]') || 
                        form.querySelector('[id*="message"]') || form.querySelector('[name*="message"]');
    
    // Get values
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';
    
    // Clear previous errors
    if (nameInput) clearError(nameInput);
    if (emailInput) clearError(emailInput);
    if (messageInput) clearError(messageInput);
    
    // Validate inputs
    let isValid = true;
    
    // Name validation (if field exists)
    if (nameInput && !name) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    }
    
    // Email validation (if field exists)
    if (emailInput) {
        if (!email) {
            showError(emailInput, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Message validation (if field exists)
    if (messageInput && !message) {
        showError(messageInput, 'Please enter your message');
        isValid = false;
    }
    
    // If validation fails, stop form submission
    if (!isValid) {
        return;
    }
    
    // Change button text to show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    
    // Build basic template params - Check if this is the contact form
    let templateParams;
    
    if (formId === 'contactForm') {
        // Use contact-specific template structure
        const serviceInput = form.querySelector('#service');
        const service = serviceInput ? serviceInput.value : '';
        
        templateParams = {
            formType: 'Contact Form',
            
            // Contact-specific variables
            contactName: name || 'Not provided',
            contactEmail: email || 'Not provided',
            contactPhone: phone || 'Not provided',
            contactService: service || 'Not selected',
            contactSubject: 'General Inquiry',
            contactMessage: message || 'Not provided',
            
            // Display controls (only show contact section)
            studentDisplay: 'display: none;',
            parentDisplay: 'display: none;',
            skilledDisplay: 'display: none;',
            unskilledDisplay: 'display: none;',
            supportDisplay: 'display: none;',
            docDisplay: 'display: none;',
            contactDisplay: 'display: block;',
            
            // System information
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            to_name: "Ocyana Global Migration"
        };
    } else {
        // Use general template structure for other forms
        templateParams = {
            name: name || 'Not provided',
            email: email || 'Not provided',
            phone: phone || 'Not provided',
            message: message || 'Not provided',
            formType: formId,
            date: new Date().toLocaleDateString(),
            to_name: "Ocyana Global Migration"
        };
    }
    
    // Only process additional fields for non-contact forms
    if (formId !== 'contactForm') {
        // First, let's map firstName and lastName if they exist
        const firstNameInput = form.querySelector('#firstName') || form.querySelector('[name="firstName"]');
        const lastNameInput = form.querySelector('#lastName') || form.querySelector('[name="lastName"]');
        
        if (firstNameInput) {
            templateParams.firstName = firstNameInput.value.trim() || 'Not provided';
        }
        
        if (lastNameInput) {
            templateParams.lastName = lastNameInput.value.trim() || 'Not provided';
        }
        
        // Handle the case where the name field might be a combination of first and last name
        if (name && !templateParams.firstName && !templateParams.lastName) {
            const nameParts = name.split(' ');
            if (nameParts.length > 1) {
                templateParams.firstName = nameParts[0];
                templateParams.lastName = nameParts.slice(1).join(' ');
            }
        }
        
        // Add any other form fields that may exist
        form.querySelectorAll('input, select, textarea').forEach(input => {
            // Skip buttons and submit inputs
            if (input.type === 'button' || input.type === 'submit') {
                return;
            }
            
            // Get both ID and name as potential field identifiers
            const fieldName = input.name || input.id;
            
            if (fieldName) {
                // Handle checkboxes differently
                if (input.type === 'checkbox') {
                    templateParams[fieldName] = input.checked ? 'Yes' : 'No';
                } 
                // Handle file inputs
                else if (input.type === 'file') {
                    templateParams[fieldName] = input.files.length > 0 ? 'File attached (not sent via email)' : 'No file';
                }
                // Handle all other inputs
                else {
                    templateParams[fieldName] = input.value || 'Not provided';
                }
                
                // Map common field patterns to template variables
                if (fieldName.includes('country') || fieldName.includes('Country')) {
                    templateParams.country = input.value || 'Not provided';
                }
                if (fieldName.includes('currentCountry')) {
                    templateParams.currentCountry = input.value || 'Not provided';
                }
                if (fieldName.includes('desiredCountry') || fieldName.includes('destinationCountry')) {
                    templateParams.destinationCountry = input.value || 'Not provided';
                    templateParams.desiredCountry = input.value || 'Not provided';
                }
            }
        });
        
        // Note about file inputs
        const fileInputs = form.querySelectorAll('input[type="file"]');
        if (fileInputs.length > 0) {
            templateParams.hasFileInputs = 'Yes - Files must be handled separately';
            
            // Add names of file inputs for reference
            let fileFieldNames = [];
            fileInputs.forEach(input => {
                fileFieldNames.push(input.name || input.id || 'unnamed');
            });
            templateParams.fileFields = fileFieldNames.join(', ');
        }
        
        // Add form metadata
        templateParams.formId = formId;
        templateParams.formSubmitTime = new Date().toLocaleTimeString();
    }
    
    // Log form data to console for debugging
    console.log("Form ID:", formId);
    console.log("Template structure used:", formId === 'contactForm' ? 'Contact-specific' : 'General');
    console.log("Sending form data:", templateParams);
    console.log("Total fields collected:", Object.keys(templateParams).length);
    
    // Send email using EmailJS
    console.log("Attempting to send email with EmailJS...");
    console.log("Service ID: service_qpahzur");
    console.log("Template ID: template_js8zym8");
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        console.error("EmailJS library not available");
        showFallbackMessage();
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        return;
    }
    
    emailjs.send("service_qpahzur", "template_js8zym8", templateParams)
        .then(function(response) {
            console.log("SUCCESS! Email sent with response:", response);
            console.log("Form data sent:", templateParams);
            
            // Reset the form
            form.reset();
            
            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                alert("Thank you! Your message has been sent successfully.");
            }
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }, function(error) {
            console.error("FAILED to send email:", error);
            console.error("Error details:", {
                status: error.status,
                text: error.text,
                name: error.name,
                message: error.message
            });
            console.error("Form data that failed:", templateParams);
            
            // Show detailed error and fallback options
            showFallbackMessage();
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
}

// Initialize EmailJS when document is ready
document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded, initializing EmailJS...");
    
    // Check if EmailJS library is loaded
    if (typeof emailjs === 'undefined') {
        console.error("EmailJS library not found. Please check the script inclusion.");
        return;
    }
    
    const isInitialized = initEmailJS();
    if (!isInitialized) {
        console.warn("EmailJS initialization failed. Fallback methods will be used.");
    }
    
    // Attach submit handler to contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log("Contact form found, attaching event listener");
        contactForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.warn("Contact form not found");
    }
    
    // Attach submit handler to other forms
    const formIds = ['studentForm', 'parentForm', 'skilledForm', 'unskilledForm', 'supportForm', 'docForm'];
    formIds.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            console.log(`Form ${formId} found, attaching event listener`);
            form.addEventListener('submit', handleFormSubmit);
        }
    });
    
    console.log("Email handler initialization complete");
});
