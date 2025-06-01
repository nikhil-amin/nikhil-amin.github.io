/**
 * Contact form module
 */
(function($) {
    // Contact form handling with EmailJS
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Show sending indicator
        $('#submit-btn').text('Sending...').prop('disabled', true);
        
        // Ensure EmailJS is available
        if (!window.emailjs) {
            alert('Sorry, there was an error with the contact form. Please try again later.');
            $('#submit-btn').text('Send Message').prop('disabled', false);
            return;
        }
        
        // Send the email using EmailJS
        emailjs.sendForm('service_levktkk', 'template_cfx4et4', this)
            .then(function() {
                // Success message
                alert('Thank you for your message! I will get back to you soon.');
                $('#contact-form')[0].reset();
                $('#submit-btn').text('Send Message').prop('disabled', false);
            }, function(error) {
                // Error message
                console.error('Email sending failed:', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
                $('#submit-btn').text('Send Message').prop('disabled', false);
            });
    });

})(jQuery);