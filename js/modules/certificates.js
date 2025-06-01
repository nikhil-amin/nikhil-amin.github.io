/**
 * Certificates module
 */
(function($) {
    // Get dependencies
    const { $nav_links } = window.navigation || {};
    const { formatDate } = window.utils || {};

    // Load certificates from JS file
    function loadCertificates() {
        const container = $('#certificates-container');
        container.empty(); // Clear loading message
        
        // Ensure certificatesData is available
        if (!window.certificatesData || !window.certificatesData.certificates) {
            container.html('<p>Error loading certificates. Please try again later.</p>');
            return;
        }
        
        // Sort certificates by issue date (newest first)
        const sortedCertificates = [...window.certificatesData.certificates].sort((a, b) => {
            return new Date(b.issueDate) - new Date(a.issueDate);
        });
        
        // Create and append certificate cards to the container
        sortedCertificates.forEach(certificate => {
            const certificateCard = $(`
                <div class="certificate-card">
                    <div class="certificate-content">
                        <span class="certificate-issuer">${certificate.issuer}</span>
                        <h3 class="certificate-title">${certificate.title}</h3>
                        <div class="certificate-date">${formatDate(certificate.issueDate)}</div>
                        <p class="certificate-description">${certificate.description}</p>
                        <a href="${certificate.url}" class="certificate-link" target="_blank">View Certificate</a>
                    </div>
                </div>
            `);
            
            container.append(certificateCard);
        });
    }
    
    // Load certificates when the certificates panel becomes active
    if ($nav_links) {
        $nav_links.filter('[href="#certificates"]').on('click', function() {
            setTimeout(loadCertificates, 500); // Slight delay to ensure panel is visible
        });
    }
    
    // Also load certificates if the hash is #certificates on page load
    if(window.location.hash === '#certificates') {
        setTimeout(loadCertificates, 500);
    }

    // Export module functions
    window.certificatesModule = {
        loadCertificates
    };

})(jQuery);