// wwwroot/js/site.js 
$(document).ready(function () {
    console.log('Site scripts loading...');

    // Initialize everything
    initAccessibilityTools();
    initNewsletter();
    initAnimations();
    restorePreferences();

    console.log('All features initialized successfully');
});

// ===== ACCESSIBILITY FUNCTIONS - FIXED IDs =====
function initAccessibilityTools() {
    console.log('Initializing accessibility tools...');

    // Font size adjustment
    let fontSize = localStorage.getItem('fontSize') ? parseInt(localStorage.getItem('fontSize')) : 16;

    // Using correct IDs from HTML
    $('#font-increase').click(function () {  // Changed from #increase-font
        fontSize += 2;
        if (fontSize > 30) fontSize = 30;
        updateFontSize(fontSize);
        showToast('Font size increased to ' + fontSize + 'px', 'success');
    });

    $('#font-decrease').click(function () {  // Changed from #decrease-font
        fontSize -= 2;
        if (fontSize < 12) fontSize = 12;
        updateFontSize(fontSize);
        showToast('Font size decreased to ' + fontSize + 'px', 'success');
    });

  

    // High contrast toggle
    $('#high-contrast').click(function () {
        $('body').toggleClass('high-contrast');
        const isHighContrast = $('body').hasClass('high-contrast');
        localStorage.setItem('highContrast', isHighContrast);

        showToast(isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled', 'info');
    });

    // Text to speech 
    let isSpeaking = false;
    let currentUtterance = null;

    $('#read-aloud').click(function () {
        if (!isSpeaking) {
            startSpeech();
        }
    });

    $('#stop-speech').click(function () {
        stopSpeech();
    });

    function startSpeech() {
        if ('speechSynthesis' in window) {
            // Get content to read
            const content = getContentToRead();

            if (content) {
                isSpeaking = true;
                $('body').addClass('speaking-mode');
                $('#read-aloud').hide();
                $('#stop-speech').show();

                currentUtterance = new SpeechSynthesisUtterance(content);
                currentUtterance.rate = 0.9;
                currentUtterance.pitch = 1;
                currentUtterance.volume = 1;
                currentUtterance.lang = 'en-US';

                currentUtterance.onend = function () {
                    stopSpeech();
                    showToast('Finished reading content', 'success');
                };

                currentUtterance.onerror = function (event) {
                    console.error('Speech error:', event);
                    stopSpeech();
                    showToast('Error reading text', 'error');
                };

                window.speechSynthesis.speak(currentUtterance);
                showToast('Reading page content...', 'info');
            }
        } else {
            showToast('Text-to-speech not supported in your browser', 'warning');
        }
    }

    function stopSpeech() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        isSpeaking = false;
        $('body').removeClass('speaking-mode');
        $('#read-aloud').show();
        $('#stop-speech').hide();
    }

    function getContentToRead() {
        try {
            // Get all text from main content areas
            let content = '';

            // Hero section
            const heroText = $('.hero-section h1').text() + '. ' + $('.hero-section .lead').text();
            if (heroText && heroText.length > 10) {
                content += heroText + '. ';
            }

            // Page titles
            $('h1, h2, h3').each(function () {
                const text = $(this).text().trim();
                if (text && text.length > 3) {
                    content += text + '. ';
                }
            });

            // Main paragraphs
            $('p, li, .card-text').each(function () {
                const text = $(this).text().trim();
                if (text && text.length > 20 && text.length < 500) {
                    content += text + '. ';
                }
            });

            // Clean up text
            content = content
                .replace(/\s+/g, ' ')
                .replace(/\.\.+/g, '.')
                .trim()
                .substring(0, 5000); // Limit to 5000 characters

            return content || 'Welcome to Disability Awareness. This page contains educational content about disabilities and inclusion.';
        } catch (error) {
            console.error('Error getting content:', error);
            return 'Welcome to Disability Awareness. This page contains educational content.';
        }
    }

    function updateFontSize(size) {
        $('html').css('font-size', size + 'px');
        $('body').css('font-size', size + 'px');
        localStorage.setItem('fontSize', size);
    }
}

// ===== NEWSLETTER FUNCTIONS =====
function initNewsletter() {
    console.log('Initializing newsletter...');

    $('#subscribeBtn').click(function () {
        const email = $('#newsletterEmail').val().trim();

        console.log('Subscribe clicked, email:', email);

        if (!email) {
            showToast('Please enter your email address', 'warning');
            $('#newsletterEmail').focus();
            return;
        }

        if (validateEmail(email)) {
            // Show loading state
            const originalText = $(this).text();
            $(this).text('Subscribing...');
            $(this).prop('disabled', true);

            // Simulate API call (replace with real backend call)
            setTimeout(() => {
                console.log('Subscribing email:', email);

                // Store in local storage for demo
                const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                subscribers.push({
                    email: email,
                    date: new Date().toISOString(),
                    page: window.location.pathname
                });
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));

                // Success message
                showToast('Thank you for subscribing to our newsletter!', 'success');

                // Reset form
                $('#newsletterEmail').val('');
                $(this).text(originalText);
                $(this).prop('disabled', false);

            }, 1500);
        } else {
            showToast('Please enter a valid email address', 'warning');
            $('#newsletterEmail').focus();
        }
    });

    // Enter key support
    $('#newsletterEmail').keypress(function (e) {
        if (e.which === 13) { // Enter key
            e.preventDefault();
            $('#subscribeBtn').click();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Navbar scroll effect
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').click(function (e) {
        const href = $(this).attr('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = $(href);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        }
    });

    // Back to top button
    $('#back-to-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // Show/hide back to top button
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements
        $('.edu-card, .fact-card, .check-item, .service-card, .category-card').each(function () {
            $(this).addClass('animate-pending');
            observer.observe(this);
        });
    }
}

// ===== RESTORE PREFERENCES =====
function restorePreferences() {
    console.log('Restoring user preferences...');

    // Font size
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        const size = parseInt(savedFontSize);
        $('html').css('font-size', size + 'px');
        $('body').css('font-size', size + 'px');
        console.log('Restored font size:', size);
    }

    // High contrast
    if (localStorage.getItem('highContrast') === 'true') {
        $('body').addClass('high-contrast');
        console.log('Restored high contrast mode');
    }
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'info') {
    // Remove existing toast
    $('.toast-notification').remove();

    // Set colors based on type
    let bgColor = 'var(--primary)';
    if (type === 'error') bgColor = '#ef4444';
    if (type === 'success') bgColor = '#10b981';
    if (type === 'warning') bgColor = '#f59e0b';

    // Create toast
    const toast = $('<div class="toast-notification"></div>')
        .text(message)
        .css({
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: bgColor,
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '10000',
            fontSize: '14px',
            animation: 'slideInRight 0.3s ease-out'
        })
        .appendTo('body');

    // Remove after 3 seconds
    setTimeout(() => {
        toast.animate({ opacity: 0, right: '-100px' }, 300, function () {
            $(this).remove();
        });
    }, 3000);
}

// Handle page visibility changes
$(document).on('visibilitychange', function () {
    if (document.hidden && window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        $('body').removeClass('speaking-mode');
        $('#read-aloud').show();
        $('#stop-speech').hide();
    }
});

// Initialize when page loads
$(window).on('load', function () {
    console.log('Page fully loaded');
    // Initialize back to top button visibility
    if ($(window).scrollTop() > 300) {
        $('#back-to-top').show();
    } else {
        $('#back-to-top').hide();
    }
});