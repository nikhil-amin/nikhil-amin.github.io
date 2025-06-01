(function($) {

    // Initialize particles.js
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#0077ff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#0077ff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Variables
    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $main = $('#main'),
        $panels = $main.children('.panel'),
        $nav = $('nav'),
        $nav_links = $nav.find('a');

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

    // Nav
    $nav_links.on('click', function(e) {
        var $this = $(this),
            href = $this.attr('href');

        // Not a panel link? Bail.
        if (href.charAt(0) != '#' || $panels.filter(href).length == 0)
            return;

        // Prevent default
        e.preventDefault();
        e.stopPropagation();

        // Deactivate all panels
        $panels.removeClass('active');

        // Activate target panel
        $panels.filter(href).addClass('active');

        // Update hash
        window.location.hash = href;
    });

    // Initialize
    (function() {
        var $panel, $link;

        // Get panel, link
        if (window.location.hash) {
            $panel = $panels.filter(window.location.hash);
            $link = $nav_links.filter('[href="' + window.location.hash + '"]');
        }

        // No panel/link? Default to first
        if (!$panel || $panel.length == 0) {
            $panel = $panels.first();
            $link = $nav_links.first();
        }

        // Activate initial panel
        $panels.removeClass('active');
        $panel.addClass('active');

        // Reset scroll
        $window.scrollTop(0);
    })();

    // Fix for "Let's Connect" and "Learn More" buttons
    $('.actions a').on('click', function(e) {
        var href = $(this).attr('href');
        
        // Not a panel link? Bail.
        if (href.charAt(0) != '#' || $panels.filter(href).length == 0)
            return;
            
        // Prevent default
        e.preventDefault();
        e.stopPropagation();
        
        // Deactivate all panels
        $panels.removeClass('active');
        
        // Activate target panel
        $panels.filter(href).addClass('active');
        
        // Update hash
        window.location.hash = href;
    });

    // Initialize EmailJS
    (function() {
        emailjs.init("sYK5LQt35V27nbJ4D"); // Changed to use the public key instead of service ID
    })();

    // Contact form handling with EmailJS
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Show sending indicator
        $('#submit-btn').text('Sending...').prop('disabled', true);
        
        // Send the email using EmailJS
        emailjs.sendForm('service_levktkk', 'template_cfx4et4', this) // Updated to use correct service ID
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

    // Load artworks from JS file
    function loadArtworks() {
        const gallery = $('#artwork-gallery');
        gallery.empty(); // Clear loading message
        
        // Shuffle the artworks array to display them in random order each time
        const shuffledArtworks = [...artworksData.artworks].sort(() => 0.5 - Math.random());
        
        // Create and append artwork items to the gallery
        shuffledArtworks.forEach(artwork => {
            const artworkItem = $(`
                <div class="artwork-item">
                    <img src="${artwork.url}" alt="${artwork.url}" loading="lazy">
                </div>
            `);
            
            gallery.append(artworkItem);
            
            // Add click event to open image in full size
            artworkItem.on('click', function() {
                window.open(artwork.url, '_blank');
            });
        });
    }

    // Load artworks when the artworks panel becomes active
    $nav_links.filter('[href="#artworks"]').on('click', function() {
        setTimeout(loadArtworks, 500); // Slight delay to ensure panel is visible
    });
    
    // Also load artworks if the hash is #artworks on page load
    if(window.location.hash === '#artworks') {
        setTimeout(loadArtworks, 500);
    }

})(jQuery);