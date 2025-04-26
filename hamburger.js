document.addEventListener('DOMContentLoaded', function() {
    // Get hamburger menu elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    const body = document.body;
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        // Toggle active class on hamburger icon for animation
        hamburger.classList.toggle('active');
        // Toggle mobile-menu-open class on body to display the menu
        body.classList.toggle('mobile-menu-open');
    });
    
    // Close menu when a navigation link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        });
    });
    
    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        // Check if the click was outside the nav and the hamburger
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && body.classList.contains('mobile-menu-open')) {
            hamburger.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        }
    });
    
    // Close menu with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && body.classList.contains('mobile-menu-open')) {
            hamburger.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        }
    });
}); 