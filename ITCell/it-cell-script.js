// Sanatani IT Cell JavaScript - Digital Defense Features

class SanataniITCell {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.searchTerm = '';
        this.activeFilters = {
            platform: '',
            type: '',
            status: ''
        };
        
        // Sample report data - in a real application, this would come from a backend
        this.reports = [
            {
                id: 1,
                title: "Anti-Hindu Propaganda Page Removed",
                platform: "facebook",
                type: "hate-speech",
                date: "2024-12-01",
                status: "success",
                reporters: 200,
                impact: "15K followers",
                description: "Successfully reported and removed a Facebook page spreading misinformation about Hindu festivals and practices...",
                tags: ["facebook", "misinformation", "festivals", "coordinated"],
                featured: true
            },
            {
                id: 2,
                title: "Hate Speech Video Taken Down",
                platform: "youtube",
                type: "hate-speech",
                date: "2024-11-15",
                status: "success",
                reporters: 150,
                impact: "50K views prevented",
                description: "YouTube video containing direct hate speech against Sanatan Dharma removed after coordinated community reporting...",
                tags: ["youtube", "hate-speech", "coordinated", "video"],
                featured: true
            },
            {
                id: 3,
                title: "Misinformation Thread Fact-Checked",
                platform: "twitter",
                type: "misinformation",
                date: "2024-11-10",
                status: "success",
                reporters: 89,
                impact: "Fact-checked status",
                description: "Misleading Twitter thread about Hindu history successfully fact-checked and marked as disputed information...",
                tags: ["twitter", "history", "fact-check", "misinformation"],
                featured: true
            },
            {
                id: 4,
                title: "Instagram Account Under Investigation",
                platform: "instagram",
                type: "harassment",
                date: "2024-12-05",
                status: "pending",
                reporters: 67,
                impact: "Under review",
                description: "Reported Instagram account for systematic targeting of Hindu symbols and deities...",
                tags: ["instagram", "symbols", "investigation", "harassment"],
                featured: false
            },
            {
                id: 5,
                title: "Defamatory Post About Hindu Practices",
                platform: "facebook",
                type: "defamation",
                date: "2024-10-20",
                status: "success",
                reporters: 45,
                impact: "12K views",
                description: "Post containing false information about Hindu rituals and practices, designed to create negative sentiment...",
                tags: ["facebook", "defamation", "rituals", "practices"],
                featured: false
            },
            {
                id: 6,
                title: "Mockery of Religious Symbols",
                platform: "instagram",
                type: "harassment",
                date: "2024-12-08",
                status: "rejected",
                reporters: 89,
                impact: "Appeal filed",
                description: "Instagram post mocking Hindu religious symbols and deities in an offensive manner...",
                tags: ["instagram", "symbols", "mockery", "appeal"],
                featured: false
            }
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderFeaturedReports();
        this.setupSmoothScrolling();
        this.setupMobileNavigation();
        this.setupSearchFunctionality();
        this.setupNewsletterForm();
        this.addScrollEffects();
    }

    setupEventListeners() {
        // Navigation
        document.addEventListener('DOMContentLoaded', () => {
            this.setupNavigation();
        });

        // Search functionality
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }

        // Filter functionality
        const categoryFilter = document.getElementById('category-filter');
        const typeFilter = document.getElementById('type-filter');
        const dateFilter = document.getElementById('date-filter');

        [categoryFilter, typeFilter, dateFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => this.applyFilters());
            }
        });

        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Update active navigation
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Update navigation on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }

    setupSearchFunctionality() {
        const searchInput = document.getElementById('search-input');
        
        if (searchInput) {
            // Auto-complete suggestions
            searchInput.addEventListener('input', (e) => {
                this.showSearchSuggestions(e.target.value);
            });
        }
    }

    performSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        if (!searchInput || !searchResults) return;

        this.searchTerm = searchInput.value.toLowerCase().trim();
        
        if (this.searchTerm === '') {
            searchResults.innerHTML = '<p class="no-results">Please enter a search term</p>';
            return;
        }

        const filteredReports = this.reports.filter(report => {
            const matchesSearch = 
                report.title.toLowerCase().includes(this.searchTerm) ||
                report.description.toLowerCase().includes(this.searchTerm) ||
                report.platform.toLowerCase().includes(this.searchTerm) ||
                report.tags.some(tag => tag.toLowerCase().includes(this.searchTerm));
            
            const matchesFilters = this.checkReportFilters(report);
            
            return matchesSearch && matchesFilters;
        });

        this.renderSearchResults(filteredReports);
    }

    applyFilters() {
        const platformFilter = document.getElementById('category-filter');
        const typeFilter = document.getElementById('type-filter');
        const statusFilter = document.getElementById('date-filter');

        this.activeFilters = {
            platform: platformFilter ? platformFilter.value : '',
            type: typeFilter ? typeFilter.value : '',
            status: statusFilter ? statusFilter.value : ''
        };

        this.performSearch();
    }

    checkReportFilters(report) {
        if (this.activeFilters.platform && report.platform !== this.activeFilters.platform) {
            return false;
        }
        
        if (this.activeFilters.type && report.type !== this.activeFilters.type) {
            return false;
        }
        
        if (this.activeFilters.status && report.status !== this.activeFilters.status) {
            return false;
        }
        
        return true;
    }

    renderSearchResults(reports) {
        const searchResults = document.getElementById('search-results');
        
        if (!searchResults) return;

        if (reports.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No results found</h3>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            `;
            return;
        }

        const resultsHTML = reports.map(report => `
            <div class="search-result-item">
                <div class="result-header">
                    <span class="result-category">${this.getPlatformName(report.platform)}</span>
                    <span class="result-type ${report.status}">${report.status.toUpperCase()}</span>
                </div>
                <h3 class="result-title">${report.title}</h3>
                <p class="result-description">${report.description}</p>
                <div class="result-meta">
                    <span><i class="fas fa-calendar"></i> ${this.formatDate(report.date)}</span>
                    <span><i class="fas fa-users"></i> ${report.reporters} reporters</span>
                    <span><i class="fas fa-eye"></i> ${report.impact}</span>
                    <span><i class="fas fa-flag"></i> ${report.type}</span>
                </div>
                <div class="result-tags">
                    ${report.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="result-actions">
                    <button class="btn btn-primary" onclick="sanataniITCell.viewReport(${report.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn btn-outline" onclick="sanataniITCell.reportSimilar(${report.id})">
                        <i class="fas fa-flag"></i> Report Similar
                    </button>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = `
            <div class="search-results-header">
                <h3>Search Results (${reports.length} found)</h3>
                <div class="results-sort">
                    <select onchange="sanataniITCell.sortResults(this.value)">
                        <option value="relevance">Sort by Relevance</option>
                        <option value="date">Sort by Date</option>
                        <option value="reporters">Sort by Impact</option>
                        <option value="title">Sort by Title</option>
                    </select>
                </div>
            </div>
            <div class="search-results-grid">
                ${resultsHTML}
            </div>
        `;
    }

    renderFeaturedReports() {
        const featuredReports = this.reports.filter(report => report.featured);
        const researchGrid = document.querySelector('.research-grid');
        
        if (!researchGrid) return;

        const featuredHTML = featuredReports.map(report => `
            <article class="research-item">
                <div class="research-header">
                    <span class="research-category">${this.getPlatformName(report.platform)} Success</span>
                    <span class="research-date">${this.formatDate(report.date)}</span>
                </div>
                <h3>${report.title}</h3>
                <p>${report.description}</p>
                <div class="research-meta">
                    <span><i class="fas fa-flag"></i> ${report.type} • ${report.reporters} Members</span>
                    <span><i class="fas fa-eye"></i> ${report.impact}</span>
                </div>
                <a href="#contact" class="research-link">View Details</a>
            </article>
        `).join('');

        researchGrid.innerHTML = featuredHTML;
    }

    showSearchSuggestions(query) {
        if (query.length < 2) return;

        const suggestions = this.reports
            .filter(report => 
                report.title.toLowerCase().includes(query.toLowerCase()) ||
                report.platform.toLowerCase().includes(query.toLowerCase()) ||
                report.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            )
            .slice(0, 5)
            .map(report => report.title);

        // In a real application, you would show these suggestions in a dropdown
        console.log('Search suggestions:', suggestions);
    }

    setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                
                if (this.validateEmail(email)) {
                    this.subscribeToNewsletter(email);
                } else {
                    this.showNotification('Please enter a valid email address', 'error');
                }
            });
        }
    }

    subscribeToNewsletter(email) {
        // Simulate newsletter subscription
        setTimeout(() => {
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            document.querySelector('.newsletter-form input[type="email"]').value = '';
        }, 1000);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    handleScroll() {
        const header = document.querySelector('.header');
        
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Animate elements on scroll
        this.animateOnScroll();
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.collection-card, .research-item, .stat-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    }

    addScrollEffects() {
        // Add CSS for scroll animations
        const style = document.createElement('style');
        style.textContent = `
            .collection-card, .research-item, .stat-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .collection-card.animate-in, .research-item.animate-in, .stat-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .header.scrolled {
                background: rgba(10, 10, 10, 0.98);
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    handleResize() {
        // Handle responsive adjustments
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);

        // Add notification styles
        if (!document.querySelector('#notification-styles')) {
            const notificationStyles = document.createElement('style');
            notificationStyles.id = 'notification-styles';
            notificationStyles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--bg-card);
                    border: 1px solid var(--bg-tertiary);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-md);
                    box-shadow: var(--shadow-lg);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    min-width: 300px;
                    animation: slideIn 0.3s ease;
                }
                
                .notification-success {
                    border-left: 4px solid var(--success-color);
                }
                
                .notification-error {
                    border-left: 4px solid #ff4d4f;
                }
                
                .notification-info {
                    border-left: 4px solid var(--primary-color);
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    flex: 1;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: var(--spacing-xs);
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(notificationStyles);
        }
    }

    // Utility methods
    getPlatformName(platform) {
        const platformNames = {
            'facebook': 'Facebook',
            'twitter': 'Twitter',
            'youtube': 'YouTube',
            'instagram': 'Instagram',
            'tiktok': 'TikTok',
            'reddit': 'Reddit'
        };
        return platformNames[platform] || platform;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    viewReport(id) {
        // In a real application, this would open the report details
        const report = this.reports.find(r => r.id === id);
        if (report) {
            console.log(`Viewing report: ${report.title}`);
            this.showNotification(`Opening report details: ${report.title}`, 'info');
        }
    }

    reportSimilar(id) {
        // In a real application, this would open a report form with similar content
        const report = this.reports.find(r => r.id === id);
        if (report) {
            console.log(`Report similar to: ${report.title}`);
            this.showNotification('Report form would open with similar content template', 'info');
        }
    }

    sortResults(sortBy) {
        // Implementation for sorting search results
        console.log(`Sorting results by: ${sortBy}`);
        const searchInput = document.getElementById('search-input');
        if (searchInput && searchInput.value) {
            this.performSearch();
        }
    }
}

// Initialize the Sanatani IT Cell when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sanataniITCell = new SanataniITCell();
});

// Additional utility functions
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

function shareReport(id, title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Check out this success story from Sanatani IT Cell',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href);
        sanataniITCell.showNotification('Link copied to clipboard', 'success');
    }
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData) {
    console.log(`Analytics Event: ${eventName}`, eventData);
    // In a real application, this would send data to analytics service
}

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SanataniITCell;
}
