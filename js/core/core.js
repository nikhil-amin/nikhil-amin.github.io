/**
 * Core functionality for the website
 */
(function($) {
    // Variables
    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $main = $('#main'),
        $panels = $main.children('.panel');

    // Breakpoints
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px']
    });

    // Play initial animations on page load
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Initialize particles.js
    if (window.particlesJS && window.particlesConfig) {
        particlesJS("particles-js", window.particlesConfig);
    }

    // Initialize EmailJS
    if (window.emailjs) {
        emailjs.init("sYK5LQt35V27nbJ4D");
    }

    // Export core variables for other modules
    window.core = {
        $window,
        $body,
        $wrapper,
        $main,
        $panels
    };

})(jQuery);