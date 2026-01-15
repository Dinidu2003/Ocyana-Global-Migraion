# Ocyana Global Migration Website

A professional, modern website for Ocyana Global Migration - a trusted partner in overseas migration services.

## 📋 Overview

This is a comprehensive multi-page website designed for a migration consultancy service. The website provides information about various migration pathways and includes integrated email functionality for client inquiries.

## ✨ Features

- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Multiple Service Pages**: Dedicated pages for different migration categories
- **Contact Forms**: Integrated email handling for client inquiries
- **Email Templates**: Professional email templates for different service categories
- **Fast Loading**: Optimized performance with loading screens and smooth transitions

## 📁 Project Structure

```
Ocyana Final/
├── index.html                              # Homepage
├── about.html                              # About us page
├── contact.html                            # Main contact page
├── media.html                              # Media/gallery page
├── privacy.html                            # Privacy policy
├── doc.html                                # Visa and documentation services
├── student.html                            # Student migration services
├── parent.html                             # Parent migration services
├── skilled.html                            # Skilled migration services
├── unskilled.html                          # Unskilled migration services
├── support.html                            # Language and support services
├── js/
│   ├── email-handler.js                    # Main email handling logic
│   ├── contact-email-handler.js            # Contact form handler
│   ├── doc-email-handler.js                # Documentation form handler
│   ├── parent-email-handler.js             # Parent migration form handler
│   ├── skilled-email-handler.js            # Skilled migration form handler
│   ├── student-email-handler.js            # Student migration form handler
│   ├── support-email-handler.js            # Support services form handler
│   └── unskilled-email-handler.js          # Unskilled migration form handler
├── images/                                 # Image assets
├── photos/                                 # Photo gallery assets
├── pdf/                                    # PDF documents
└── email templates/                        # HTML email templates
    ├── contact-email-template.html
    ├── parent-email-template.html
    ├── skilled-email-template.html
    ├── student-email-template.html
    └── universal-email-template.html
```

## 🚀 Services Offered

1. **Student Migration** - Educational pathways and student visa assistance
2. **Parent Migration** - Family reunion and parent visa programs
3. **Skilled Migration** - Professional and skilled worker visa programs
4. **Unskilled Migration** - Labor migration and work permit assistance
5. **Language & Support Services** - Language training and settlement support
6. **Visa & Documentation** - Complete visa processing and documentation services

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox/grid layouts
- **JavaScript (ES6+)** - Interactive features and form handling
- **Font Awesome 6.4.0** - Icon library
- **EmailJS** - Email service integration for contact forms

## 📧 Email Integration

The website uses EmailJS for handling contact form submissions. Each service category has its own dedicated email handler to ensure proper routing and template formatting.

### Email Handlers:
- Main contact form
- Student migration inquiries
- Parent migration inquiries
- Skilled migration inquiries
- Unskilled migration inquiries
- Language & support inquiries
- Documentation requests

## 🎨 Design Features

- Gradient backgrounds and modern color schemes
- Smooth scroll behavior
- Loading animations
- Hover effects and transitions
- Professional typography
- Mobile-first responsive design
- Optimized images and assets

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   ```

2. **Navigate to project directory**
   ```bash
   cd ocyana-final
   ```

3. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```

4. **Configure Email Service**
   - Set up your EmailJS account
   - Update the email handler JavaScript files with your EmailJS credentials
   - Configure email templates in your EmailJS dashboard

## 📝 Configuration

### Email Setup
To configure the email functionality:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create email service and templates
3. Update the email handler files in the `/js` directory with your:
   - Service ID
   - Template IDs
   - Public Key

## 🌐 Deployment

The website can be deployed to:
- **GitHub Pages** - Free static hosting
- **Netlify** - Free tier available
- **Vercel** - Free for personal projects
- **Traditional web hosting** - Any hosting provider supporting static sites

### GitHub Pages Deployment:
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source branch (main/master)
4. Save and wait for deployment

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Contact

**Ocyana Global Migration**
- Email: ocyanamigration@gmail.com
- Website: [Your Website URL]

## 🤝 Contributing

This is a private commercial project. If you're part of the development team, please follow the contribution guidelines provided separately.

## 📋 Maintenance Notes

- Regularly update contact information
- Keep email templates synchronized with service offerings
- Update migration policy information as regulations change
- Maintain SSL certificates if deployed
- Regular security audits for form submissions

## 🔐 Security

- All form submissions are validated
- Email integration uses secure protocols
- No sensitive data stored client-side
- HTTPS recommended for production deployment

---

**Built with ❤️ for Ocyana Global Migration**
