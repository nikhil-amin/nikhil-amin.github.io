/**
 * Artworks module
 */
(function($) {
    // Get dependencies
    const { $nav_links } = window.navigation || {};
    const { shuffleArray } = window.utils || {};

    // Load artworks from JS file
    function loadArtworks() {
        const gallery = $('#artwork-gallery');
        gallery.empty(); // Clear loading message
        
        // Ensure artworksData is available
        if (!window.artworksData || !window.artworksData.artworks) {
            gallery.html('<p>Error loading artworks. Please try again later.</p>');
            return;
        }
        
        // Shuffle the artworks array to display them in random order each time
        const shuffledArtworks = shuffleArray(window.artworksData.artworks);
        
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
    if ($nav_links) {
        $nav_links.filter('[href="#artworks"]').on('click', function() {
            setTimeout(loadArtworks, 500); // Slight delay to ensure panel is visible
        });
    }
    
    // Also load artworks if the hash is #artworks on page load
    if(window.location.hash === '#artworks') {
        setTimeout(loadArtworks, 500);
    }

    // Export module functions
    window.artworksModule = {
        loadArtworks
    };

})(jQuery);