/**
 * Blogs module
 */
(function($) {
    // Get dependencies
    const { $nav_links } = window.navigation || {};
    const { formatDate } = window.utils || {};

    // Load blogs from JS file
    function loadBlogs(filter = 'all') {
        const container = $('#blogs-container');
        container.empty(); // Clear loading message
        
        // Ensure blogsData is available
        if (!window.blogsData || !window.blogsData.blogs) {
            container.html('<p>Error loading blogs. Please try again later.</p>');
            return;
        }
        
        // Filter blogs based on selected category
        let filteredBlogs = window.blogsData.blogs;
        if (filter !== 'all') {
            filteredBlogs = window.blogsData.blogs.filter(blog => blog.series === filter);
        }
        
        // Sort blogs by date (newest first)
        filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Create and append blog cards to the container
        filteredBlogs.forEach(blog => {
            const blogCard = $(`
                <div class="blog-card">
                    <div class="blog-content">
                        <span class="blog-series">${blog.series}</span>
                        <h3 class="blog-title">${blog.title}</h3>
                        <div class="blog-date">${formatDate(blog.date)}</div>
                        <a href="${blog.url}" class="blog-link" target="_blank">Read on Medium</a>
                    </div>
                </div>
            `);
            
            container.append(blogCard);
        });
        
        // If no blogs match the filter
        if (filteredBlogs.length === 0) {
            container.html('<p>No blog posts found in this category.</p>');
        }
    }
    
    // Handle filter button clicks
    $('.filter-btn').on('click', function() {
        const filter = $(this).data('filter');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        loadBlogs(filter);
    });

    // Load blogs when the blogs panel becomes active
    if ($nav_links) {
        $nav_links.filter('[href="#blogs"]').on('click', function() {
            setTimeout(() => {
                loadBlogs();
                // Reset filter buttons
                $('.filter-btn[data-filter="all"]').addClass('active');
                $('.filter-btn').not('[data-filter="all"]').removeClass('active');
            }, 500); // Slight delay to ensure panel is visible
        });
    }
    
    // Also load blogs if the hash is #blogs on page load
    if(window.location.hash === '#blogs') {
        setTimeout(() => {
            loadBlogs();
            // Reset filter buttons
            $('.filter-btn[data-filter="all"]').addClass('active');
            $('.filter-btn').not('[data-filter="all"]').removeClass('active');
        }, 500);
    }

    // Export module functions
    window.blogsModule = {
        loadBlogs
    };

})(jQuery);