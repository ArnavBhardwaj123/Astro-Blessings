# Astro Blessings - Professional Astrology Website

A complete, professional astrology business website with modern design, contact forms, WhatsApp integration, and payment functionality.

## Features

- ✨ **Professional Design**: Modern blue and gold theme with smooth animations
- 🔮 **Astrologer Profiles**: Showcase certified astrologers with verified certificates
- 💬 **WhatsApp Integration**: Direct chat functionality
- 📊 **Excel Integration**: Contact form linked to Google Sheets/Excel
- 💳 **QR Payment System**: Integrated payment section with QR codes
- 📱 **Responsive Design**: Works perfectly on all devices
- ⭐ **USP Section**: Highlight your unique selling propositions
- 🗓️ **Vastu Calendar**: Interactive calendar for auspicious days
- 🎨 **Smooth Animations**: Engaging user experience with scroll animations

## Setup Instructions

### 1. Google Sheets/Excel Integration

To enable the contact form functionality, you need to set up Google Apps Script:

1. **Create a Google Sheet** for storing form submissions
2. **Set up Google Apps Script**:
   - Go to Extensions > Apps Script in your Google Sheet
   - Create a new script with the following code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.phone,
    data.birthDate,
    data.birthTime,
    data.service,
    data.message
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy as Web App**:
   - Click Deploy > New deployment
   - Choose "Web app" as type
   - Set access to "Anyone"
   - Copy the web app URL

4. **Update the JavaScript file** (`script.js`):
   ```javascript
   const googleSheetsURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```

### 2. WhatsApp Configuration

Update the WhatsApp number in `script.js`:
```javascript
const phoneNumber = "919876543210"; // Replace with your actual WhatsApp number
```

### 3. QR Code Payment

Replace the QR code image in the payment section:
```html
<img src="YOUR_QR_CODE_IMAGE_URL" alt="Payment QR Code">
```

### 4. Customization

#### Colors and Branding
- The theme uses professional blue and gold colors
- Update the logo and branding elements
- Customize the astrologer profiles with real photos and information

#### Content Updates
- Update astrologer information and certificates
- Modify Vastu calendar auspicious days
- Customize contact information

#### Images
- Replace placeholder images with your actual photos
- Update the hero image
- Add your actual QR code for payments

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Sections Included

1. **Hero Section**: Eye-catching introduction with call-to-action
2. **About Section**: Unique selling propositions
3. **Astrologers Section**: Professional profiles with certificates
4. **Vastu Calendar**: Interactive calendar for auspicious days
5. **Contact Form**: Google Sheets integrated contact form
6. **Payment Section**: QR code payment integration
7. **Footer**: Complete business information

## Key Features

### Professional Theme
- Blue and gold color scheme for trust and professionalism
- Clean, modern design suitable for business clients
- Smooth animations and transitions

### Astrologer Profiles
- Showcase certified astrologers with verified certificates
- Professional photos and detailed information
- Customer ratings and reviews

### Vastu Calendar
- Interactive monthly calendar
- Highlights auspicious days for Vastu activities
- Clickable days with detailed information

### Form Integration
- Direct integration with Google Sheets
- No third-party email services required
- Easy to manage and track submissions

### Payment System
- QR code payment integration
- Professional payment details display
- Multiple payment method support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Features

- Optimized images and animations
- Smooth scrolling and transitions
- Responsive design for all screen sizes
- Fast loading times
- SEO-friendly structure

## Support

For any questions or customization needs, please contact the development team.

---

**Astro Blessings** - Professional astrology services to guide your life's journey.