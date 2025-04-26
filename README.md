# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## Features

- Responsive design for all screen sizes
- Modern animations and hover effects
- Interactive project cards with 3D tilt effect
- Smooth scrolling navigation
- Direct contact options with mailto links
- Native calendar integration for scheduling calls
- Dark, futuristic theme

## Contact Options

The portfolio includes two easy ways for visitors to contact you:

1. **Direct Email Link**: Clicking the "Email Me Directly" button will open the visitor's default email client with your email address pre-filled in the "To" field and a subject line already set up. This is the simplest solution that works across all devices without requiring any third-party services.

2. **Native Calendar Integration**: The "Schedule a Call" button opens a modal with multiple options for scheduling, including:
   - Downloading an .ics calendar file (works with Apple Calendar, Outlook, and most other calendar apps)
   - Adding the event directly to Google Calendar
   - Suggesting times via email

### How to Customize Calendar Events

1. Update the .ics file data in index.html:
   ```html
   <a href="data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0ABEGIN:VEVENT%0D%0ADTSTART:YYYYMMDDTHHMMSSZ%0D%0ADTEND:YYYYMMDDTHHMMSSZ%0D%0ASUMMARY:Your Event Title%0D%0ADESCRIPTION:Your event description.%0D%0ALOCATION:Your location%0D%0ASTATUS:CONFIRMED%0D%0AEND:VEVENT%0D%0AEND:VCALENDAR" download="your-filename.ics">
   ```

2. Update the Google Calendar link with your event details:
   ```html
   <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Your+Event+Title&details=Your+event+description&dates=YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ&location=Your+Location">
   ```

   Note: The date format should be in UTC time and formatted as: YYYYMMDDTHHMMSSZ
   For example, December 20, 2023 at 3:00 PM UTC would be: 20231220T150000Z

### How to Customize Contact Info

1. Update your email address in both the contact info and mailto links:
   ```html
   <p>your.email@example.com</p>
   <a href="mailto:your.email@example.com?subject=Hello%20from%20your%20website">
   ```

## Customization

- Update the personal information in `index.html`
- Change colors by modifying the CSS variables in `style.css`
- Add or remove projects in the projects section
- Modify animations and effects in `script.js`

## Credits

- Font Awesome for icons
- Google Fonts for typography 