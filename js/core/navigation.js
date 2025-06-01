/**
 * Navigation functionality
 */
(function($) {
    // Get core variables
    const { $main, $panels } = window.core || {};
    
    // Variables
    var $nav = $('nav'),
        $nav_links = $nav.find('a');

    // Function to handle panel navigation
    function handlePanelNavigation(e) {
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

        // Set hash
        window.location.hash = href;
    }

    // Attach click handler to nav links
    $nav_links.on('click', handlePanelNavigation);

    // Also attach click handler to other panel links (like the buttons in the home panel)
    $('.button[href^="#"]').on('click', handlePanelNavigation);

    // Initial panel based on hash
    if (window.location.hash) {
        const initialPanel = $panels.filter(window.location.hash);
        if (initialPanel.length > 0) {
            $panels.removeClass('active');
            initialPanel.addClass('active');
        }
    }

    // Export navigation variables for other modules
    window.navigation = {
        $nav,
        $nav_links
    };

})(jQuery);