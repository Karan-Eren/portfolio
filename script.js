// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Performance optimization: Cache DOM elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const heroSection = document.querySelector('.hero');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Calendar options elements
    const scheduleCallBtn = document.getElementById('schedule-call-btn');
    const calendarOptions = document.getElementById('calendar-options');
    const closeCalendarBtn = document.getElementById('close-calendar-btn');
    let bodyOverlay;
    
    // Create overlay for when calendar options are shown
    function createOverlay() {
        bodyOverlay = document.createElement('div');
        bodyOverlay.className = 'body-overlay';
        document.body.appendChild(bodyOverlay);
        
        // Close calendar options when overlay is clicked
        bodyOverlay.addEventListener('click', function() {
            closeCalendarOptions();
        });
    }
    
    // Show calendar options panel
    function showCalendarOptions() {
        if (!bodyOverlay) createOverlay();
        
        calendarOptions.style.display = 'flex';
        
        // Force a reflow
        void calendarOptions.offsetWidth;
        
        // Add active classes
        calendarOptions.classList.add('active');
        bodyOverlay.classList.add('active');
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }
    
    // Close calendar options panel
    function closeCalendarOptions() {
        calendarOptions.classList.remove('active');
        bodyOverlay.classList.remove('active');
        
        // Re-enable scroll after animation completes
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 400);
    }
    
    // Set up event listeners for calendar options
    if (scheduleCallBtn && calendarOptions) {
        createOverlay();
        
        scheduleCallBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCalendarOptions();
        });
    }
    
    if (closeCalendarBtn) {
        closeCalendarBtn.addEventListener('click', closeCalendarOptions);
    }
    
    // Close calendar options with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && calendarOptions && calendarOptions.classList.contains('active')) {
            closeCalendarOptions();
        }
    });
    
    // Calendar event generation
    const createIcsBtn = document.getElementById('create-ics');
    const addToGoogleBtn = document.getElementById('add-to-google');
    
    if (createIcsBtn) {
        createIcsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadIcsFile();
        });
    }
    
    if (addToGoogleBtn) {
        addToGoogleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openGoogleCalendar();
        });
    }
    
    // Function to download ICS file
    function downloadIcsFile() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format dates for ICS file
        const startDate = formatDateForIcs(tomorrow, 10); // 10 AM tomorrow
        const endDate = formatDateForIcs(tomorrow, 11);   // 11 AM tomorrow
        
        const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//Personal Portfolio//EN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Call with Me
DTSTART:${startDate}
DTEND:${endDate}
DESCRIPTION:Discussion about potential collaboration or project details.
LOCATION:Online
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
        
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'schedule_call.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Format date for ICS file
    function formatDateForIcs(date, hour) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedHour = hour.toString().padStart(2, '0');
        
        return `${year}${month}${day}T${formattedHour}0000Z`;
    }
    
    // Open Google Calendar with pre-filled event
    function openGoogleCalendar() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Set time to 10 AM tomorrow
        tomorrow.setHours(10, 0, 0, 0);
        
        const startTime = tomorrow.toISOString().replace(/-|:|\.\d+/g, '');
        
        // End time (1 hour later)
        const endTime = new Date(tomorrow.getTime() + (60 * 60 * 1000)).toISOString().replace(/-|:|\.\d+/g, '');
        
        const eventDetails = {
            action: 'TEMPLATE',
            text: 'Call with Me',
            details: 'Discussion about potential collaboration or project details.',
            location: 'Online',
            dates: startTime + '/' + endTime
        };
        
        const googleCalendarUrl = 'https://calendar.google.com/calendar/render?' + 
            Object.keys(eventDetails)
                .map(key => `${key}=${encodeURIComponent(eventDetails[key])}`)
                .join('&');
        
        window.open(googleCalendarUrl, '_blank');
    }
    
    // Hamburger menu toggle - using classList directly for better performance
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Enhanced typing animation with smoother easing
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ['Software Developer', 'Web Developer', 'Python Programmer', 'C/C++ Developer', 'Problem Solver'];
    const typingDelay = 80; // Faster typing
    const erasingDelay = 40; // Faster erasing
    const newTextDelay = 1500; // Shorter delay between phrases
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, typingDelay);
        }
    }
    
    if (textArray.length) setTimeout(type, newTextDelay);
    
    // Improved smooth scrolling with better easing function
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's the schedule call button
            if (this.id === 'schedule-call-btn') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 600; // Faster scrolling
                let start = null;
                
                window.requestAnimationFrame(step);
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Enhanced easing function for smoother feel
                    const easing = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
                    
                    window.scrollTo({
                        top: startPosition + distance * easing(percentage),
                        behavior: 'auto' // We're handling the animation ourselves
                    });
                    
                    if (progress < duration) window.requestAnimationFrame(step);
                }
            }
        });
    });
    
    // Active navigation with throttling for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavigation();
                updateParallax();
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function updateNavigation() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Enhanced parallax with better performance
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        if (scrollY <= heroSection.offsetHeight) {
            heroSection.style.backgroundPositionY = `${scrollY * 0.4}px`;
            
            // Add cool tilt effect to hero content based on scroll
            const heroContent = document.querySelector('.hero-content');
            const tiltValue = scrollY * 0.02;
            heroContent.style.transform = `translateY(${scrollY * 0.2}px) rotate3d(1, 0, 0, ${tiltValue}deg)`;
            
            // Particle effect for hero section
            createParticles();
        }
    }
    
    function updateHeader() {
        const scrollY = window.pageYOffset;
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Enhanced scroll reveal animation with staggered timing
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('projects-grid')) {
                    animateCards();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.about-content, .projects-grid, .contact-content').forEach(el => {
        observer.observe(el);
    });
    
    function animateCards() {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('active');
            }, 100 * index);
        });
    }
    
    // Cool mouse move effect for project cards
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.3), ${(x - centerX) / 15}px ${(y - centerY) / 15}px 30px rgba(0, 0, 0, 0.2)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Create particle effect for hero section
    function createParticles() {
        const particlesContainer = document.querySelector('.hero');
        if (!document.querySelector('.particles')) {
            const particlesDiv = document.createElement('div');
            particlesDiv.className = 'particles';
            particlesContainer.appendChild(particlesDiv);
            
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                particle.style.width = particle.style.height = `${Math.random() * 15 + 5}px`;
                particlesDiv.appendChild(particle);
            }
        }
    }
    
    // Initial particles
    createParticles();
    
    // Add CSS for new effects
    const styleSheet = document.styleSheets[0];
    const newRules = `
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }
        
        .particle {
            position: absolute;
            border-radius: 50%;
            background: rgba(100, 255, 218, 0.2);
            pointer-events: none;
            animation: float-particle linear infinite;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
            }
            20% {
                opacity: 0.5;
            }
            80% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100vh) translateX(100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        header.scrolled {
            background-color: rgba(10, 25, 47, 0.95);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        .projects-grid .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        
        .projects-grid .project-card.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    if (styleSheet.insertRule) {
        try {
            styleSheet.insertRule(newRules, styleSheet.cssRules.length);
        } catch (e) {
            console.error('Error inserting CSS rule:', e);
        }
    }
}); 