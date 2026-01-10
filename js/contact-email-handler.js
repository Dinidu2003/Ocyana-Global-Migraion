/**
 * Contact Email Handler for Ocyana Global Migration
 * This script handles EmailJS form submissions specifically for the contact.html page
 */

// Function to initialize EmailJS with your account
function initContactEmailJS() {
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

// 🧠 Function to generate professional email body for contact form with clean HTML styling
function generateContactMessageHtml(formData) {
  // Fix up the values to ensure they're display-friendly
  const serviceName = formData.contactService ? 
    (formData.contactService === 'student' ? 'Student Migration' : 
     formData.contactService === 'parent' ? 'Parent Migration' :
     formData.contactService === 'skilled' ? 'Skilled Migration' :
     formData.contactService === 'unskilled' ? 'Unskilled Migration' :
     formData.contactService === 'support' ? 'Language Support' :
     formData.contactService === 'other' ? 'Other Services' : formData.contactService) 
    : 'Not Selected';
  
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0; padding: 20px; color: #1a1a1a; background-color: #fefefe; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2a6ebb; margin-bottom: 25px; text-align: left; border-bottom: 2px solid #2a6ebb; padding-bottom: 8px;">
        Contact Form Inquiry
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #333; text-align: left;">
        ${Object.entries({
          "Name": formData.contactName,
          "Email": `<a href="mailto:${formData.contactEmail}" style="color: #2a6ebb; text-decoration: none;">${formData.contactEmail}</a>`,
          "Phone": formData.contactPhone,
          "Service Interested In": serviceName,
          "Message": formData.contactMessage
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
function sendContactForm(formData) {
  const htmlContent = generateContactMessageHtml(formData);
  
  const templateParams = {
    formType: "Contact Form",
    message_html: htmlContent, // Using message_html to render HTML properly
    // Add HTML as a message - this is the key part to make it display in the template
    message: htmlContent,
    
    // Individual fields for template customization
    contactName: formData.contactName,
    contactEmail: formData.contactEmail,
    contactPhone: formData.contactPhone,
    contactService: formData.contactService || 'Not Selected',
    contactSubject: 'Website Contact Form Inquiry',
    contactMessage: formData.contactMessage,
    
    // Also include standard fields that the template might be expecting
    name: formData.contactName,
    email: formData.contactEmail,
    phone: formData.contactPhone,
    subject: 'Website Contact Form Inquiry',
    
    // Display controls for email template sections
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
    to_name: "Ocyana Global Migration",
    service: "Contact Form Inquiry"
  };

  // For debugging - log the template params
  console.log("Contact Form - EmailJS Template Params:", templateParams);
  
  // Use template_universal from the CONTACT_FORM_FIX_README.md
  emailjs.send("service_qpahzur", "template_js8zym8", templateParams)
    .then(response => {
      console.log("✅ Email successfully sent!", response.status, response.text);
      
      // Show success message
      if (typeof showSuccessMessage === 'function') {
        showSuccessMessage();
      } else {
        alert("Form submitted successfully!");
      }
    })
    .catch(error => {
      console.error("❌ Failed to send email:", error);
      console.error("Error details:", JSON.stringify(error));
      
      // Check if we have the fallback mechanism
      if (typeof showContactFallbackModal === 'function') {
        showContactFallbackModal();
      } else {
        alert("Failed to submit form. Please try again or contact us directly at ocyanamigration@gmail.com");
      }
    });
}

// Function to handle contact form submission
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
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
    clearError(phoneInput);
    clearError(serviceInput);
    clearError(messageInput);
    
    // Validate inputs
    let isValid = true;
    
    if (!name) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    }
    
    if (!email) {
        showError(emailInput, 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
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
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Create formData object for the new send function
    const formData = {
        contactName: name,
        contactEmail: email,
        contactPhone: phone || 'Not provided',
        contactService: service || 'Not selected',
        contactMessage: message
    };
    
    // Log form data to console for debugging
    console.log("Sending contact form data:", formData);
    
    // Use the new send function
    sendContactForm(formData);
    
    // Reset form
    form.reset();
    
    // Reset button state
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }, 1500);
}

// Function to show a fallback modal when EmailJS fails
function showContactFallbackModal() {
    // Check if a fallback modal already exists
    let fallbackModal = document.getElementById('contactFallbackModal');
    
    if (!fallbackModal) {
        // Create the modal
        fallbackModal = document.createElement('div');
        fallbackModal.id = 'contactFallbackModal';
        fallbackModal.style.position = 'fixed';
        fallbackModal.style.top = '0';
        fallbackModal.style.left = '0';
        fallbackModal.style.width = '100%';
        fallbackModal.style.height = '100%';
        fallbackModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        fallbackModal.style.display = 'flex';
        fallbackModal.style.justifyContent = 'center';
        fallbackModal.style.alignItems = 'center';
        fallbackModal.style.zIndex = '1000';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.borderRadius = '8px';
        modalContent.style.padding = '30px';
        modalContent.style.maxWidth = '500px';
        modalContent.style.width = '90%';
        modalContent.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        
        // Add content
        modalContent.innerHTML = `
            <div style="text-align: right; margin-bottom: 10px;">
                <button id="closeFallbackModal" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            <h2 style="color: #0d47a1; margin-bottom: 20px;">Contact Form Error</h2>
            <p style="margin-bottom: 20px;">We're having trouble sending your message through our form system. Please use one of these alternative methods to contact us:</p>
            <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <p style="font-weight: bold; margin-bottom: 10px;"><i class="fas fa-envelope" style="margin-right: 10px; color: #0d47a1;"></i> Email Us:</p>
                <a href="mailto:ocyanamigration@gmail.com" style="color: #0d47a1; text-decoration: none; display: block; padding: 5px 0;">ocyanamigration@gmail.com</a>
            </div>
            <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <p style="font-weight: bold; margin-bottom: 10px;"><i class="fas fa-phone" style="margin-right: 10px; color: #0d47a1;"></i> Call Us:</p>
                <a href="tel:+94777638715" style="color: #0d47a1; text-decoration: none; display: block; padding: 5px 0;">+94 77 763 8715</a>
            </div>
            <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <p style="font-weight: bold; margin-bottom: 10px;"><i class="fab fa-whatsapp" style="margin-right: 10px; color: #0d47a1;"></i> WhatsApp:</p>
                <a href="https://wa.me/94777638715" style="color: #0d47a1; text-decoration: none; display: block; padding: 5px 0;">+94 77 763 8715</a>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <a href="contact-backup.html" style="display: inline-block; background-color: #0d47a1; color: white; padding: 12px 25px; border-radius: 30px; text-decoration: none; font-weight: 600;">Use Backup Contact Form</a>
            </div>
        `;
        
        fallbackModal.appendChild(modalContent);
        document.body.appendChild(fallbackModal);
        
        // Close modal when clicking the X
        document.getElementById('closeFallbackModal').addEventListener('click', function() {
            document.body.removeChild(fallbackModal);
        });
        
        // Close modal when clicking outside
        fallbackModal.addEventListener('click', function(event) {
            if (event.target === fallbackModal) {
                document.body.removeChild(fallbackModal);
            }
        });
    } else {
        fallbackModal.style.display = 'flex';
    }
}

// Function to show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // Scroll to the success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide the message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Initialize EmailJS
    initContactEmailJS();
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
        console.log('Contact form email handler initialized successfully');
    } else {
        console.warn('Contact form not found - email handler not attached');
    }
    
    // Add blur and input event listeners for validation
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Only clear errors if the field is not empty
            if (this.value.trim() !== '') {
                clearError(this);
            }
        });
        
        input.addEventListener('input', function() {
            // Clear errors as soon as the user starts typing
            if (this.classList.contains('error-input')) {
                clearError(this);
            }
        });
    });
});
