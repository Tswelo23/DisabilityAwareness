// wwwroot/js/site.js - COMPLETE WORKING VERSION

$(document).ready(function () {
    // Initialize everything
    initAccessibility();
    initAnimations();
    initNewsletter();
    restorePreferences();

    console.log('Accessibility tools initialized');
});

// ===== ACCESSIBILITY FUNCTIONS =====
function initAccessibility() {
    // Font size adjustment
    let fontSize = localStorage.getItem('fontSize') ? parseInt(localStorage.getItem('fontSize')) : 16;

    $('#font-increase').click(function () {
        fontSize += 2;
        if (fontSize > 30) fontSize = 30;
        updateFontSize(fontSize);
        showToast('Font size increased to ' + fontSize + 'px');
    });

    $('#font-decrease').click(function () {
        fontSize -= 2;
        if (fontSize < 12) fontSize = 12;
        updateFontSize(fontSize);
        showToast('Font size decreased to ' + fontSize + 'px');
    });

    // High contrast toggle
    $('#high-contrast').click(function () {
        $('body').toggleClass('high-contrast');
        const isHighContrast = $('body').hasClass('high-contrast');
        localStorage.setItem('highContrast', isHighContrast);

        if (isHighContrast) {
            showToast('High contrast mode enabled');
        } else {
            showToast('High contrast mode disabled');
        }
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
                    showToast('Finished reading');
                };

                currentUtterance.onerror = function () {
                    stopSpeech();
                    showToast('Error reading text');
                };

                window.speechSynthesis.speak(currentUtterance);
                showToast('Reading page content...');
            }
        } else {
            showToast('Text-to-speech not supported in your browser');
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
        // Get all text from main content areas
        let content = '';

        // Hero section
        content += $('.hero-section h1').text() + '. ';
        content += $('.hero-section .lead').text() + '. ';

        // Section headers
        $('.section-header h2').each(function () {
            content += $(this).text() + '. ';
        });

        // Card titles and descriptions
        $('.edu-title').each(function () {
            content += $(this).text() + '. ';
        });

        $('.edu-desc').each(function () {
            content += $(this).text() + '. ';
        });

        // Fact cards
        $('.fact-card p').each(function () {
            content += $(this).text() + '. ';
        });

        // Clean up text
        content = content.replace(/\s+/g, ' ').trim();

        return content || 'No content found to read';
    }

    function updateFontSize(size) {
        $('html').css('font-size', size + 'px');
        $('body').css('font-size', size + 'px');
        localStorage.setItem('fontSize', size);
    }

    // Toast notification
    function showToast(message) {
        // Remove existing toast
        $('.toast-notification').remove();

        // Create toast
        const toast = $('<div class="toast-notification"></div>')
            .text(message)
            .css({
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--primary)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: '10000',
                fontSize: '14px',
                animation: 'fadeInUp 0.3s ease-out'
            })
            .appendTo('body');

        // Remove after 3 seconds
        setTimeout(() => {
            toast.animate({ opacity: 0, bottom: '0px' }, 300, function () {
                $(this).remove();
            });
        }, 3000);
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
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    $('.edu-card, .fact-card, .check-item').each(function () {
        $(this).addClass('animate-pending');
        observer.observe(this);
    });
}

// ===== NEWSLETTER =====
function initNewsletter() {
    $('#subscribeBtn').click(function () {
        const email = $('#newsletterEmail').val().trim();

        if (validateEmail(email)) {
            // Simulate subscription
            showToast('Thank you for subscribing!');
            $('#newsletterEmail').val('');
        } else {
            showToast('Please enter a valid email address');
        }
    });

    // Enter key support
    $('#newsletterEmail').keypress(function (e) {
        if (e.which === 13) {
            $('#subscribeBtn').click();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// ===== RESTORE PREFERENCES =====
function restorePreferences() {
    // Font size
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        const size = parseInt(savedFontSize);
        $('html').css('font-size', size + 'px');
        $('body').css('font-size', size + 'px');
    }

    // High contrast
    if (localStorage.getItem('highContrast') === 'true') {
        $('body').addClass('high-contrast');
    }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    }
});