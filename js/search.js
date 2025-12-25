// ==========================================
// HavenHearth - Search Page JavaScript
// ==========================================

// Article database
const articlesDatabase = [
    {
        title: "The Rise of Luxury Sustainable Fashion: 10 Brands Leading the Change",
        excerpt: "Discover how high-end fashion brands are revolutionizing the industry with eco-friendly practices without compromising on style and quality.",
        category: "Fashion & Accessories",
        categoryClass: "fashion",
        date: "March 15, 2025",
        readTime: "8 min read",
        url: "articles/luxury-sustainable-fashion.html",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
        keywords: ["fashion", "sustainable", "luxury", "eco-friendly", "brands", "clothing", "style"]
    },
    {
        title: "Morning Wellness Routines That Actually Work: A Complete Guide",
        excerpt: "Transform your mornings with these science-backed wellness practices that boost energy and mental clarity throughout your day.",
        category: "Health & Beauty",
        categoryClass: "health",
        date: "January 22, 2025",
        readTime: "7 min read",
        url: "articles/wellness-routines.html",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
        keywords: ["health", "wellness", "morning", "routine", "beauty", "meditation", "yoga", "skincare"]
    },
    {
        title: "Urban Garden Transformation: From Concrete to Green Paradise",
        excerpt: "Learn how to create a thriving garden space in the city with expert tips, product recommendations, and practical guidance.",
        category: "Home & Garden",
        categoryClass: "home",
        date: "May 10, 2025",
        readTime: "9 min read",
        url: "articles/urban-garden-transformation.html",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        keywords: ["home", "garden", "urban", "plants", "gardening", "balcony", "green", "nature"]
    },
    {
        title: "10 Boutique Hotels in Europe That Redefine Luxury",
        excerpt: "Discover unique and charming boutique hotels across Europe that offer unforgettable experiences and personalized service.",
        category: "Travel & Accommodation",
        categoryClass: "travel",
        date: "June 28, 2025",
        readTime: "10 min read",
        url: "articles/boutique-hotels-europe.html",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        keywords: ["travel", "hotel", "boutique", "europe", "luxury", "accommodation", "vacation", "tourism"]
    },
    {
        title: "The Ultimate Guide to Artisan Coffee: Beans, Brewers & Techniques",
        excerpt: "Elevate your coffee experience with our comprehensive guide to specialty beans, professional brewing equipment, and expert techniques.",
        category: "Food & Beverage",
        categoryClass: "food",
        date: "August 14, 2025",
        readTime: "11 min read",
        url: "articles/artisan-coffee-guide.html",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
        keywords: ["coffee", "food", "beverage", "artisan", "brewing", "beans", "cafe", "espresso"]
    }
];

// Get search query from URL
function getSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || '';
}

// Perform search
function performSearch(query) {
    if (!query || query.trim() === '') {
        return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results = [];

    articlesDatabase.forEach(article => {
        let score = 0;
        
        // Check title (highest priority)
        if (article.title.toLowerCase().includes(searchTerm)) {
            score += 10;
        }
        
        // Check keywords (high priority)
        const keywordMatch = article.keywords.some(keyword => 
            keyword.includes(searchTerm) || searchTerm.includes(keyword)
        );
        if (keywordMatch) {
            score += 8;
        }
        
        // Check category
        if (article.category.toLowerCase().includes(searchTerm)) {
            score += 7;
        }
        
        // Check excerpt
        if (article.excerpt.toLowerCase().includes(searchTerm)) {
            score += 5;
        }
        
        // If there's any match, add to results
        if (score > 0) {
            results.push({ ...article, score });
        }
    });

    // Sort by relevance score
    results.sort((a, b) => b.score - a.score);
    
    return results;
}

// Display search results
function displayResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    const statsSection = document.getElementById('search-stats');
    const noResultsSection = document.getElementById('no-results');
    const loadingIndicator = document.getElementById('loading');
    const resultsCount = document.getElementById('results-count');
    const searchQueryDisplay = document.getElementById('search-query-display');
    const noResultsQuery = document.getElementById('no-results-query');

    // Hide loading
    loadingIndicator.style.display = 'none';

    if (results.length === 0) {
        // Show no results message
        statsSection.style.display = 'none';
        resultsContainer.style.display = 'none';
        noResultsSection.style.display = 'block';
        noResultsQuery.textContent = query;
    } else {
        // Show results
        statsSection.style.display = 'flex';
        resultsContainer.style.display = 'grid';
        noResultsSection.style.display = 'none';
        
        resultsCount.textContent = results.length;
        searchQueryDisplay.textContent = query;

        // Clear previous results
        resultsContainer.innerHTML = '';

        // Create article cards
        results.forEach((article, index) => {
            const articleCard = document.createElement('article');
            articleCard.className = `article-card ${article.categoryClass}`;
            articleCard.setAttribute('data-aos', 'fade-up');
            articleCard.setAttribute('data-aos-delay', index * 100);
            
            articleCard.innerHTML = `
                <a href="${article.url}">
                    <div class="article-image">
                        <img src="${article.image}" alt="${article.title}">
                        <span class="category-badge ${article.categoryClass}">${article.category}</span>
                    </div>
                    <div class="article-content">
                        <h3>${article.title}</h3>
                        <p class="excerpt">${article.excerpt}</p>
                        <div class="meta">
                            <span class="date"><i class="far fa-calendar"></i> ${article.date}</span>
                            <span class="read-time"><i class="far fa-clock"></i> ${article.readTime}</span>
                        </div>
                    </div>
                </a>
            `;
            
            resultsContainer.appendChild(articleCard);
        });

        // Re-initialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
}

// Filter results by category
function filterByCategory(category) {
    const articles = document.querySelectorAll('.article-card');
    
    articles.forEach(article => {
        if (category === 'all' || article.classList.contains(category)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });

    // Update visible count
    const visibleCount = Array.from(articles).filter(a => a.style.display !== 'none').length;
    document.getElementById('results-count').textContent = visibleCount;
}

// Initialize search page
document.addEventListener('DOMContentLoaded', function() {
    const searchQuery = getSearchQuery();
    const searchInput = document.getElementById('search-input-main');
    const searchForm = document.getElementById('search-form');
    const loadingIndicator = document.getElementById('loading');

    // Set initial search query
    if (searchInput) {
        searchInput.value = searchQuery;
    }

    // Perform initial search if query exists
    if (searchQuery) {
        loadingIndicator.style.display = 'block';
        
        // Simulate slight delay for better UX
        setTimeout(() => {
            const results = performSearch(searchQuery);
            displayResults(results, searchQuery);
        }, 500);
    } else {
        // No query, show message
        document.getElementById('no-results').style.display = 'block';
        document.getElementById('no-results-query').textContent = 'nothing';
        document.querySelector('#no-results p').textContent = 'Enter a search term above to find articles';
    }

    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                // Update URL and perform search
                window.history.pushState({}, '', `search.html?q=${encodeURIComponent(query)}`);
                loadingIndicator.style.display = 'block';
                
                setTimeout(() => {
                    const results = performSearch(query);
                    displayResults(results, query);
                }, 300);
            }
        });
    }

    // Category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter results
            const category = this.getAttribute('data-filter');
            filterByCategory(category);
        });
    });
});

