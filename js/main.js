// ==========================================
// HavenHearth - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Set current date in header
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Search Functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    // Create clear button if it doesn't exist
    let clearBtn = document.getElementById('search-clear-btn');
    if (searchInput && !clearBtn) {
        clearBtn = document.createElement('button');
        clearBtn.id = 'search-clear-btn';
        clearBtn.innerHTML = '<i class="fas fa-times"></i>';
        clearBtn.style.display = 'none';
        clearBtn.style.background = 'transparent';
        clearBtn.style.border = 'none';
        clearBtn.style.color = 'var(--text-light)';
        clearBtn.style.cursor = 'pointer';
        clearBtn.style.padding = '5px 10px';
        clearBtn.style.fontSize = '1rem';
        searchInput.parentElement.insertBefore(clearBtn, searchBtn);
    }
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Show/hide clear button
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearBtn.style.display = 'inline-block';
            } else {
                clearBtn.style.display = 'none';
                // Reset search when input is cleared
                resetSearch();
            }
        });
        
        // Clear button functionality
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                searchInput.value = '';
                clearBtn.style.display = 'none';
                resetSearch();
            });
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm === '') {
            showSearchMessage('Please enter a search term', 'warning');
            return;
        }

        // Check if we're on the search page
        if (window.location.pathname.includes('search.html')) {
            // On search page, perform in-page search
            const articles = document.querySelectorAll('.article-card');
            let foundCount = 0;

            articles.forEach(article => {
                const title = article.querySelector('h3')?.textContent.toLowerCase() || '';
                const excerpt = article.querySelector('.excerpt')?.textContent.toLowerCase() || '';
                const categoryBadge = article.querySelector('.category-badge')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm.toLowerCase()) || excerpt.includes(searchTerm.toLowerCase()) || categoryBadge.includes(searchTerm.toLowerCase())) {
                    article.style.display = 'block';
                    article.style.animation = 'fadeInUp 0.5s ease';
                    foundCount++;
                } else {
                    article.style.display = 'none';
                }
            });

            updateSearchResults(foundCount, searchTerm);
            
            if (foundCount === 0) {
                showSearchMessage(`No articles found for "${searchTerm}". Try different keywords.`, 'info');
            } else {
                showSearchMessage(`Found ${foundCount} article${foundCount !== 1 ? 's' : ''} matching "${searchTerm}"`, 'success');
            }
        } else {
            // On other pages, redirect to search page
            window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
        }
    }
    
    function resetSearch() {
        const articles = document.querySelectorAll('.article-card');
        articles.forEach(article => {
            article.style.display = 'block';
        });
        
        // Remove search message if exists
        const existingMessage = document.querySelector('.search-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Update results count on category page
        updateSearchResults(articles.length, '');
    }
    
    function showSearchMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.search-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `search-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 5px;
            text-align: center;
            font-weight: 500;
            animation: fadeInUp 0.3s ease;
        `;
        
        if (type === 'success') {
            messageDiv.style.background = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else if (type === 'warning') {
            messageDiv.style.background = '#fff3cd';
            messageDiv.style.color = '#856404';
            messageDiv.style.border = '1px solid #ffeaa7';
        } else if (type === 'info') {
            messageDiv.style.background = '#d1ecf1';
            messageDiv.style.color = '#0c5460';
            messageDiv.style.border = '1px solid #bee5eb';
        }
        
        const articlesContainer = document.getElementById('articles-container');
        if (articlesContainer) {
            articlesContainer.parentElement.insertBefore(messageDiv, articlesContainer);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                messageDiv.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => messageDiv.remove(), 300);
            }, 5000);
        }
    }
    
    function updateSearchResults(count, searchTerm) {
        const resultsText = document.getElementById('results-text');
        if (resultsText) {
            if (searchTerm) {
                resultsText.textContent = `Found ${count} article${count !== 1 ? 's' : ''} for "${searchTerm}"`;
            } else {
                resultsText.textContent = `Showing ${count} article${count !== 1 ? 's' : ''}`;
            }
        }
    }

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articleCards = document.querySelectorAll('.article-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles with animation
            articleCards.forEach((card, index) => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease';
                    }, index * 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                alert(`Thank you for subscribing! We'll send updates to ${email}`);
                emailInput.value = '';
            }
        });
    }

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effect to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in-up');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });

    // Add reading progress bar for article pages
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2C5364, #3282B8);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add parallax effect to hero images
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImages = document.querySelectorAll('.hero-image img');
        
        heroImages.forEach(img => {
            const speed = 0.5;
            img.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.article-card, .category-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run on load

    // Add click animation to buttons
    const buttons = document.querySelectorAll('button, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ==========================================
// Category Page Specific Functions
// ==========================================

function initializeCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if (category) {
        const categoryTitle = document.getElementById('category-title');
        const categoryNames = {
            'fashion': 'Fashion & Accessories',
            'health': 'Health & Beauty',
            'home': 'Home & Garden',
            'travel': 'Travel & Accommodation',
            'finance': 'Finance & Insurance',
            'food': 'Food & Beverage'
        };
        
        if (categoryTitle) {
            categoryTitle.textContent = categoryNames[category] || 'All Articles';
        }
    }
}

// Call category page initialization if on category page
if (window.location.pathname.includes('category.html')) {
    initializeCategoryPage();
}

// ==========================================
// Contact Form Handler
// ==========================================

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);
            this.reset();
        }
    });
}

// ==========================================
// Social Media Share Links
// ==========================================

function initializeSocialShare() {
    // Get current page info
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title.replace(' - HavenHearth', ''));
    
    // Get all share buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        if (button.classList.contains('facebook')) {
            button.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
        } else if (button.classList.contains('twitter')) {
            button.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
        } else if (button.classList.contains('pinterest')) {
            // Get the first article image if available
            const articleImage = document.querySelector('.article-hero-image img');
            const imageUrl = articleImage ? encodeURIComponent(articleImage.src) : '';
            button.href = `https://pinterest.com/pin/create/button/?url=${pageUrl}&description=${pageTitle}&media=${imageUrl}`;
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
        } else if (button.classList.contains('linkedin')) {
            button.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
        }
        
        // Add click event for analytics (optional)
        button.addEventListener('click', function(e) {
            // Track share event (you can add Google Analytics here)
            console.log(`Shared on ${this.classList[1]}: ${decodeURIComponent(pageTitle)}`);
        });
    });
}

// Initialize social share when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSocialShare);
} else {
    initializeSocialShare();
}

