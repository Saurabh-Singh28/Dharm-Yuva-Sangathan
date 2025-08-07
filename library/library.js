// Library Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeLibrary();
});

// Global variables
let currentPage = 1;
let itemsPerPage = 10;
let currentView = 'table'; // 'table' or 'grid'
let filteredFiles = [];
let allFiles = [];

// File data - Enhanced with more dharmic and cultural content
const fileList = [
    {
        name: "Why Gandhi is not Father of the Nation",
        file: "gandhi-not-father.pdf",
        description: "Critical analysis of historical narratives",
        category: "history",
        author: "Research Team",
        date: "2024-01-15",
        downloads: 1250
    },
    {
        name: "Vedic Mathematics Principles",
        file: "vedic-mathematics.pdf",
        description: "Ancient mathematical techniques and their modern applications",
        category: "texts",
        author: "Dr. Bharadwaj",
        date: "2024-01-20",
        downloads: 890
    },
    {
        name: "Dharmic Leadership in Modern Times",
        file: "dharmic-leadership.pdf",
        description: "Applying ancient wisdom to contemporary leadership challenges",
        category: "philosophy",
        author: "Acharya Sharma",
        date: "2024-02-01",
        downloads: 675
    },
    {
        name: "Colonial Impact on Indian Education",
        file: "colonial-education-impact.pdf",
        description: "Analysis of how colonial education affected Indian knowledge systems",
        category: "history",
        author: "Prof. Gupta",
        date: "2024-02-10",
        downloads: 1100
    },
    {
        name: "Ayurveda and Modern Medicine",
        file: "ayurveda-modern-medicine.pdf",
        description: "Integrative approach to healthcare combining ancient and modern practices",
        category: "research",
        author: "Dr. Vaidya",
        date: "2024-02-15",
        downloads: 945
    },
    {
        name: "Bhagavad Gita Commentary",
        file: "bhagavad-gita-commentary.pdf",
        description: "Modern interpretation of timeless wisdom",
        category: "texts",
        author: "Swami Krishnananda",
        date: "2024-02-20",
        downloads: 1500
    },
    {
        name: "Cultural Preservation Strategies",
        file: "cultural-preservation.pdf",
        description: "Methods for preserving and promoting Indian culture",
        category: "reports",
        author: "Cultural Committee",
        date: "2024-03-01",
        downloads: 720
    },
    {
        name: "Sanskrit in Digital Age",
        file: "sanskrit-digital-age.pdf",
        description: "Reviving Sanskrit through modern technology",
        category: "research",
        author: "Tech Sanskritists",
        date: "2024-03-05",
        downloads: 580
    },
    {
        name: "Yoga Philosophy Fundamentals",
        file: "yoga-philosophy.pdf",
        description: "Core principles of yogic philosophy and practice",
        category: "philosophy",
        author: "Yoga Acharya",
        date: "2024-03-10",
        downloads: 1200
    },
    {
        name: "Ancient Indian Architecture",
        file: "ancient-architecture.pdf",
        description: "Principles and techniques of traditional Indian architecture",
        category: "history",
        author: "Architect Shastri",
        date: "2024-03-15",
        downloads: 650
    },
    {
        name: "Dharmic Governance Models",
        file: "dharmic-governance.pdf",
        description: "Traditional governance systems and their relevance today",
        category: "philosophy",
        author: "Political Philosopher",
        date: "2024-03-20",
        downloads: 780
    },
    {
        name: "Vedic Astronomy Insights",
        file: "vedic-astronomy.pdf",
        description: "Ancient astronomical knowledge and its accuracy",
        category: "texts",
        author: "Astronomer Jyotishi",
        date: "2024-03-25",
        downloads: 520
    },
    {
        name: "Indian Classical Music Theory",
        file: "classical-music-theory.pdf",
        description: "Fundamentals of ragas and talas in Indian classical music",
        category: "texts",
        author: "Maestro Pandit",
        date: "2024-04-01",
        downloads: 690
    },
    {
        name: "Ayurvedic Nutrition Guide",
        file: "ayurvedic-nutrition.pdf",
        description: "Dietary principles according to Ayurvedic science",
        category: "research",
        author: "Ayurvedic Nutritionist",
        date: "2024-04-05",
        downloads: 850
    },
    {
        name: "Temple Architecture Symbolism",
        file: "temple-architecture.pdf",
        description: "Spiritual significance of temple design elements",
        category: "history",
        author: "Temple Scholar",
        date: "2024-04-10",
        downloads: 430
    },
    {
        name: "Meditation Techniques Compilation",
        file: "meditation-techniques.pdf",
        description: "Various traditional meditation practices and their benefits",
        category: "philosophy",
        author: "Meditation Master",
        date: "2024-04-15",
        downloads: 1300
    },
    {
        name: "Dharmic Economics Principles",
        file: "dharmic-economics.pdf",
        description: "Economic systems based on dharmic values",
        category: "research",
        author: "Economic Philosopher",
        date: "2024-04-20",
        downloads: 560
    },
    {
        name: "Ancient Indian Metallurgy",
        file: "ancient-metallurgy.pdf",
        description: "Advanced metallurgical techniques of ancient India",
        category: "history",
        author: "Metallurgy Expert",
        date: "2024-04-25",
        downloads: 380
    },
    {
        name: "Upanishads Study Guide",
        file: "upanishads-study.pdf",
        description: "Comprehensive guide to understanding the Upanishads",
        category: "texts",
        author: "Vedanta Scholar",
        date: "2024-05-01",
        downloads: 1150
    },
    {
        name: "Traditional Indian Festivals",
        file: "traditional-festivals.pdf",
        description: "Cultural significance and celebrations of Indian festivals",
        category: "reports",
        author: "Cultural Anthropologist",
        date: "2024-05-05",
        downloads: 920
    }
];

// Dharmic quotes for inspiration
const dharmicQuotes = [
    "हम सनातनी हैं — हमारी जड़ें वेदों में हैं, और हमारी दृष्टि भविष्य में। हम न तो केवल दर्शक हैं, न ही मौन साधक — हम डिजिटल धर्मयुद्ध के योद्धा हैं।",
    "यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवता: - जहाँ नारियों का सम्मान होता है, वहाँ देवता निवास करते हैं।",
    "सत्यमेव जयते - सत्य की ही विजय होती है।",
    "वसुधैव कुटुम्बकम् - संपूर्ण विश्व एक परिवार है।",
    "अहिंसा परमो धर्म: - अहिंसा सबसे बड़ा धर्म है।",
    "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन - तुम्हारा अधिकार केवल कर्म पर है, फल पर नहीं।",
    "धर्मो रक्षति रक्षित: - धर्म उसकी रक्षा करता है जो धर्म की रक्षा करता है।"
];

// Initialize library
function initializeLibrary() {
    allFiles = [...fileList];
    filteredFiles = [...allFiles];
    
    setupEventListeners();
    displayRandomQuote();
    displayFiles();
    updatePagination();
    updateStats();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }
    
    // View toggle
    const viewToggle = document.getElementById('viewToggle');
    if (viewToggle) {
        viewToggle.addEventListener('click', toggleView);
    }
    
    // Mobile navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Display random dharmic quote
function displayRandomQuote() {
    const quoteElement = document.getElementById('randomQuote');
    if (quoteElement) {
        const randomQuote = dharmicQuotes[Math.floor(Math.random() * dharmicQuotes.length)];
        quoteElement.textContent = randomQuote;
    }
}

// Handle search functionality
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    filteredFiles = allFiles.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchTerm) ||
                            file.description.toLowerCase().includes(searchTerm) ||
                            file.author.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categoryFilter || file.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    currentPage = 1;
    displayFiles();
    updatePagination();
}

// Handle category filter
function handleCategoryFilter() {
    handleSearch(); // Reuse search logic with category filter
}

// Filter by category (for footer links)
function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    handleCategoryFilter();
    
    // Scroll to library content
    document.querySelector('.library-content').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Toggle between table and grid view
function toggleView() {
    const viewToggle = document.getElementById('viewToggle');
    const tableView = document.getElementById('fileTable').parentElement;
    const gridView = document.getElementById('filesGrid');
    
    if (currentView === 'table') {
        currentView = 'grid';
        tableView.style.display = 'none';
        gridView.style.display = 'grid';
        viewToggle.innerHTML = '<i class="fas fa-list"></i>';
        viewToggle.title = 'Switch to table view';
    } else {
        currentView = 'table';
        tableView.style.display = 'block';
        gridView.style.display = 'none';
        viewToggle.innerHTML = '<i class="fas fa-th-large"></i>';
        viewToggle.title = 'Switch to grid view';
    }
    
    displayFiles();
}

// Display files based on current view
function displayFiles() {
    if (currentView === 'table') {
        displayTableView();
    } else {
        displayGridView();
    }
}

// Display files in table view
function displayTableView() {
    const tableBody = document.getElementById('fileTableBody');
    const filesContainer = document.getElementById('filesContainer');
    if (!tableBody || !filesContainer) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFiles = filteredFiles.slice(startIndex, endIndex);
    
    // Clear existing content
    tableBody.innerHTML = '';
    
    // Remove existing mobile cards
    const existingCards = filesContainer.querySelectorAll('.mobile-table-card');
    existingCards.forEach(card => card.remove());
    
    if (currentFiles.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 2rem; color: #6c757d;">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                    No files found matching your criteria.
                </td>
            </tr>
        `;
        
        // Add mobile no results card
        const noResultsCard = document.createElement('div');
        noResultsCard.className = 'mobile-table-card';
        noResultsCard.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #6c757d;">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                No files found matching your criteria.
            </div>
        `;
        filesContainer.appendChild(noResultsCard);
        return;
    }
    
    currentFiles.forEach((file, index) => {
        // Create table row
        const row = document.createElement('tr');
        row.style.animationDelay = `${index * 0.1}s`;
        
        row.innerHTML = `
            <td>
                <div class="file-title">${file.name}</div>
                <div class="file-description">${file.description}</div>
            </td>
            <td>
                <span class="category-badge ${file.category}">${file.category}</span>
            </td>
            <td>${file.author}</td>
            <td>${formatDate(file.date)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn btn-download" onclick="startDownload('${file.file}', '${file.name}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="action-btn btn-view" onclick="viewFile('${file.file}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
        
        // Create mobile card
        const mobileCard = document.createElement('div');
        mobileCard.className = 'mobile-table-card';
        mobileCard.style.animationDelay = `${index * 0.1}s`;
        
        mobileCard.innerHTML = `
            <div class="mobile-card-header">
                <div class="mobile-card-title">
                    <h4>${file.name}</h4>
                    <p>${file.description}</p>
                </div>
                <span class="category-badge ${file.category}">${file.category}</span>
            </div>
            <div class="mobile-card-meta">
                <div class="mobile-meta-item">
                    <span class="mobile-meta-label">Author</span>
                    <span class="mobile-meta-value">${file.author}</span>
                </div>
                <div class="mobile-meta-item">
                    <span class="mobile-meta-label">Date</span>
                    <span class="mobile-meta-value">${formatDate(file.date)}</span>
                </div>
                <div class="mobile-meta-item">
                    <span class="mobile-meta-label">Downloads</span>
                    <span class="mobile-meta-value">${file.downloads}</span>
                </div>
                <div class="mobile-meta-item">
                    <span class="mobile-meta-label">Category</span>
                    <span class="mobile-meta-value">${file.category}</span>
                </div>
            </div>
            <div class="mobile-card-actions">
                <button class="action-btn btn-download" onclick="startDownload('${file.file}', '${file.name}')">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="action-btn btn-view" onclick="viewFile('${file.file}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </div>
        `;
        
        filesContainer.appendChild(mobileCard);
    });
}

// Display files in grid view
function displayGridView() {
    const gridContainer = document.getElementById('filesGrid');
    if (!gridContainer) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFiles = filteredFiles.slice(startIndex, endIndex);
    
    gridContainer.innerHTML = '';
    
    if (currentFiles.length === 0) {
        gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #6c757d;">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                No files found matching your criteria.
            </div>
        `;
        return;
    }
    
    currentFiles.forEach((file, index) => {
        const card = document.createElement('div');
        card.className = 'file-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="file-card-header">
                <div class="file-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <span class="category-badge ${file.category}">${file.category}</span>
            </div>
            <h3 class="file-card-title">${file.name}</h3>
            <div class="file-card-meta">
                <p class="file-description">${file.description}</p>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #6c757d;">
                    <span><i class="fas fa-user"></i> ${file.author}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(file.date)}</span>
                </div>
                <div style="font-size: 0.85rem; color: #6c757d;">
                    <i class="fas fa-download"></i> ${file.downloads} downloads
                </div>
            </div>
            <div class="file-card-actions">
                <button class="action-btn btn-download" onclick="startDownload('${file.file}', '${file.name}')">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="action-btn btn-view" onclick="viewFile('${file.file}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </div>
        `;
        
        gridContainer.appendChild(card);
    });
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
    const paginationInfo = document.getElementById('paginationInfo');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Update info
    if (paginationInfo) {
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, filteredFiles.length);
        paginationInfo.textContent = `Showing ${startItem}-${endItem} of ${filteredFiles.length} files`;
    }
    
    // Update buttons
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
    
    // Update page numbers
    if (paginationNumbers) {
        paginationNumbers.innerHTML = '';
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.onclick = () => goToPage(i);
            paginationNumbers.appendChild(pageBtn);
        }
    }
}

// Navigation functions
function goToPage(page) {
    currentPage = page;
    displayFiles();
    updatePagination();
    
    // Scroll to top of files container
    document.querySelector('.files-container').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function nextPage() {
    const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

// Update statistics
function updateStats() {
    const totalFilesElement = document.getElementById('totalFiles');
    if (totalFilesElement) {
        totalFilesElement.textContent = `${allFiles.length}+`;
    }
}

// File operations
function startDownload(fileURL, fileName) {
    // Show progress modal
    showProgressBar();
    
    // Simulate download progress
    let progress = 0;
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressPercent) progressPercent.textContent = Math.round(progress) + '%';
        
        if (progress < 30) {
            if (progressText) progressText.textContent = 'Initializing download...';
        } else if (progress < 70) {
            if (progressText) progressText.textContent = 'Downloading file...';
        } else if (progress < 100) {
            if (progressText) progressText.textContent = 'Finalizing download...';
        } else {
            if (progressText) progressText.textContent = 'Download completed!';
            clearInterval(interval);
            
            // Hide modal after 1 second
            setTimeout(() => {
                hideProgressBar();
                
                // Create download link (simulated)
                const link = document.createElement('a');
                link.href = '#'; // In real implementation, this would be the actual file URL
                link.download = fileName;
                link.textContent = 'Download ' + fileName;
                
                // Show success message
                showNotification('Download completed successfully!', 'success');
            }, 1000);
        }
    }, 200);
}

function viewFile(fileURL) {
    // In a real implementation, this would open the file in a new tab or modal
    showNotification('File viewer would open here in a real implementation.', 'info');
}

function showProgressBar() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.style.display = 'block';
        
        // Reset progress
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const progressPercent = document.getElementById('progressPercent');
        
        if (progressFill) progressFill.style.width = '0%';
        if (progressText) progressText.textContent = 'Preparing download...';
        if (progressPercent) progressPercent.textContent = '0%';
    }
}

function hideProgressBar() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(notificationStyles);

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('downloadModal');
    if (event.target === modal) {
        hideProgressBar();
    }
});

// Refresh quotes periodically
setInterval(displayRandomQuote, 30000); // Change quote every 30 seconds
