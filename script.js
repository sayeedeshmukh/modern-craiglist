// NeoList - Modern Classifieds Dashboard
// Main JavaScript functionality

// Global variables
let currentTheme = 'dark';
let currentStep = 1;
let uploadedImages = [];
let listings = [];
let currentFilter = 'all';
let sparkleInterval;
let footerSparkleInterval;
let footerSparkles = [];
let isFooterHovered = false;
let cursorX = 0;
let cursorY = 0;

// DOM Elements
const customCursor = document.getElementById('customCursor');
const cursorTrail = document.getElementById('cursorTrail');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const listingsGrid = document.getElementById('listingsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const postForm = document.getElementById('postForm');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const imagePreviewGrid = document.getElementById('imagePreviewGrid');
const previewCard = document.getElementById('previewCard');
const loadingOverlay = document.getElementById('loadingOverlay');
const toastContainer = document.getElementById('toastContainer');
const sparklesContainer = document.getElementById('sparklesContainer');
const footerSparklesContainer = document.getElementById('footerSparkles');
const footerLogo = document.getElementById('footerLogo');
const listingsScrollWrapper = document.getElementById('listingsScrollWrapper');
const listingsGrid = document.getElementById('listingsGrid');
const scrollProgress = document.getElementById('scrollProgress');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // setupCustomCursor(); // Disabled custom cursor
    setupTheme();
    setupNavigation();
    setupSearch();
    setupFormHandling();
    setupImageUpload();
    setupScrollAnimations();
    loadSampleListings();
    setupFilterButtons();
    setupProfileTabs();
    setupGSAPAnimations();
    setupSparkles();
    setupFooterSparkles();
    setupLogoInteractions();
    setupFooterLogo();
    setupFooterSparkleInteraction();
    setupDynamicScrolling();
    setupMagnetLines();
    
    // Show loading animation briefly
    showLoading();
    setTimeout(hideLoading, 1500);
}

// Custom Cursor
function setupCustomCursor() {
    // Get cursor elements
    const customCursor = document.getElementById('customCursor');
    const cursorTrail = document.getElementById('cursorTrail');
    
    // Check if cursor elements exist
    if (!customCursor || !cursorTrail) {
        console.warn('Cursor elements not found');
        return;
    }
    
    // Check if device supports hover (desktop)
    if (!window.matchMedia('(hover: hover)').matches) {
        // Mobile device - hide custom cursor and show default
        customCursor.style.display = 'none';
        cursorTrail.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    let isInitialized = false;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Show cursor immediately
    customCursor.style.opacity = '1';
    cursorTrail.style.opacity = '1';
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Initialize cursor position on first mouse move
        if (!isInitialized) {
            cursorX = mouseX;
            cursorY = mouseY;
            trailX = mouseX;
            trailY = mouseY;
            isInitialized = true;
            
            // Set initial position
            customCursor.style.left = cursorX + 'px';
            customCursor.style.top = cursorY + 'px';
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
        }
    });
    
    function animateCursor() {
        if (isInitialized) {
            // Smooth cursor movement
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            
            // Smooth trail movement
            trailX += (cursorX - trailX) * 0.25;
            trailY += (cursorY - trailY) * 0.25;
            
            // Update cursor positions
            customCursor.style.left = cursorX + 'px';
            customCursor.style.top = cursorY + 'px';
            
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .category-card, .listing-card, input, textarea, select, .logo-letter, .filter-btn, .load-more-btn, .search-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
            customCursor.style.background = '#DDA0DD';
            customCursor.style.boxShadow = '0 0 30px #DDA0DD, 0 0 60px #DDA0DD';
        });
        
        element.addEventListener('mouseleave', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
            customCursor.style.background = '#FF6B6B';
            customCursor.style.boxShadow = '0 0 20px #FF6B6B, 0 0 40px #FF6B6B';
        });
    });
}

// Theme Management
function setupTheme() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Remove theme toggle logic if present
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.style.display = 'none';
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
    
    showToast('Theme changed to ' + currentTheme + ' mode', 'success');
}

// Navigation
function setupNavigation() {
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Search Functionality
function setupSearch() {
    const searchSuggestionsData = [
        'iPhone 13 Pro Max',
        'MacBook Air M2',
        'Gaming PC Setup',
        'Nike Air Jordan',
        'Tesla Model 3',
        'Apartment for Rent',
        'Web Developer Job',
        'Graphic Design Services'
    ];
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length > 2) {
            const filtered = searchSuggestionsData.filter(item => 
                item.toLowerCase().includes(query)
            );
            showSearchSuggestions(filtered);
        } else {
            hideSearchSuggestions();
        }
    });
    
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length > 2) {
            searchSuggestions.classList.add('active');
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            hideSearchSuggestions();
        }
    });
}

function showSearchSuggestions(suggestions) {
    searchSuggestions.innerHTML = '';
    
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = suggestion;
            div.style.padding = '12px 16px';
            div.style.cursor = 'pointer';
            div.style.borderBottom = '1px solid var(--border-color)';
            div.style.transition = 'background 0.2s ease';
            
            div.addEventListener('mouseenter', () => {
                div.style.background = 'var(--glass-white)';
            });
            
            div.addEventListener('mouseleave', () => {
                div.style.background = 'transparent';
            });
            
            div.addEventListener('click', () => {
                searchInput.value = suggestion;
                hideSearchSuggestions();
                performSearch(suggestion);
            });
            
            searchSuggestions.appendChild(div);
        });
        
        searchSuggestions.classList.add('active');
    } else {
        hideSearchSuggestions();
    }
}

function hideSearchSuggestions() {
    searchSuggestions.classList.remove('active');
}

function performSearch(query) {
    showToast(`Searching for: ${query}`, 'info');
    // Implement actual search functionality here
}

// Form Handling
function setupFormHandling() {
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    
    nextBtn.addEventListener('click', () => {
        if (validateCurrentStep()) {
            if (currentStep < 3) {
                currentStep++;
                updateFormStep();
            }
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateFormStep();
        }
    });
    
    // Form submission
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentStep === 3) {
            submitForm();
        }
    });
    
    // Real-time form validation
    const formInputs = postForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (currentStep === 3) {
                updatePreview();
            }
        });
    });
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    
    let isValid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--error)';
            showToast(`Please fill in ${field.name}`, 'error');
        } else {
            field.style.borderColor = 'var(--glass-blur)';
        }
    });
    
    return isValid;
}

function updateFormStep() {
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    
    // Update form steps
    formSteps.forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.dataset.step) === currentStep) {
            step.classList.add('active');
        }
    });
    
    // Update step indicators
    stepIndicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index + 1 <= currentStep) {
            indicator.classList.add('active');
        }
    });
    
    // Update progress bar
    const progress = (currentStep / 3) * 100;
    progressFill.style.width = progress + '%';
    
    // Update buttons
    prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    nextBtn.style.display = currentStep === 3 ? 'none' : 'inline-flex';
    submitBtn.style.display = currentStep === 3 ? 'inline-flex' : 'none';
    
    // Update preview if on step 3
    if (currentStep === 3) {
        updatePreview();
    }
}

function updatePreview() {
    const formData = new FormData(postForm);
    const title = formData.get('title') || 'Your Listing Title';
    const category = formData.get('category') || 'Category';
    const price = formData.get('price') || '0';
    const description = formData.get('description') || 'Description will appear here...';
    const location = formData.get('location') || 'Location';
    
    previewCard.innerHTML = `
        <div class="listing-image">
            ${uploadedImages.length > 0 ? 
                `<img src="${uploadedImages[0]}" alt="${title}">` : 
                '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 3rem;"><i class="fas fa-image"></i></div>'
            }
            <div class="listing-badges">
                <span class="listing-badge">New</span>
            </div>
        </div>
        <div class="listing-content">
            <h3 class="listing-title">${title}</h3>
            <div class="listing-price">$${price}</div>
            <div class="listing-location">${location}</div>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">${description}</p>
            <div class="listing-meta">
                <span>Category: ${category}</span>
                <span>Just posted</span>
            </div>
        </div>
    `;
}

function submitForm() {
    showLoading();
    
    // Simulate form submission
    setTimeout(() => {
        hideLoading();
        showToast('Your ad has been posted successfully!', 'success');
        
        // Reset form
        postForm.reset();
        uploadedImages = [];
        imagePreviewGrid.innerHTML = '';
        currentStep = 1;
        updateFormStep();
        
        // Add to listings
        const formData = new FormData(postForm);
        const newListing = {
            id: Date.now(),
            title: formData.get('title'),
            category: formData.get('category'),
            price: formData.get('price'),
            description: formData.get('description'),
            location: formData.get('location'),
            contact: formData.get('contact'),
            images: uploadedImages,
            badges: ['New'],
            date: new Date().toISOString(),
            views: 0,
            verified: false
        };
        
        listings.unshift(newListing);
        renderListings();
    }, 2000);
}

// Image Upload
function setupImageUpload() {
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary)';
        uploadArea.style.background = 'var(--glass-white)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--glass-blur)';
        uploadArea.style.background = 'transparent';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--glass-blur)';
        uploadArea.style.background = 'transparent';
        
        const files = e.dataTransfer.files;
        handleImageFiles(files);
    });
    
    imageInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleImageFiles(files);
    });
}

function handleImageFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImages.push(e.target.result);
                renderImagePreviews();
            };
            reader.readAsDataURL(file);
        }
    });
}

function renderImagePreviews() {
    imagePreviewGrid.innerHTML = '';
    
    uploadedImages.forEach((image, index) => {
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        preview.innerHTML = `
            <img src="${image}" alt="Preview ${index + 1}">
            <button class="remove-btn" onclick="removeImage(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        imagePreviewGrid.appendChild(preview);
    });
}

function removeImage(index) {
    uploadedImages.splice(index, 1);
    renderImagePreviews();
}

// Sample Data and Listings
function loadSampleListings() {
    listings = [
        {
            id: 1,
            title: 'MacBook Pro M2 16-inch',
            category: 'electronics',
            price: 2499,
            description: 'Brand new MacBook Pro with M2 chip, 16GB RAM, 512GB SSD. Perfect for developers and creatives.',
            location: 'San Francisco, CA',
            contact: '+1 (555) 123-4567',
            images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
            badges: ['🔥 Trending', '✅ Verified'],
            date: '2024-01-15T10:30:00Z',
            views: 156,
            verified: true
        },
        {
            id: 2,
            title: 'Tesla Model 3 Performance',
            category: 'vehicles',
            price: 45000,
            description: '2022 Tesla Model 3 Performance with FSD, 15k miles, excellent condition.',
            location: 'Los Angeles, CA',
            contact: '+1 (555) 987-6543',
            images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400'],
            badges: ['✨ New'],
            date: '2024-01-14T14:20:00Z',
            views: 89,
            verified: false
        },
        {
            id: 3,
            title: 'Modern 2BR Apartment',
            category: 'real-estate',
            price: 2800,
            description: 'Beautiful 2-bedroom apartment in downtown, fully furnished, amazing city views.',
            location: 'New York, NY',
            contact: '+1 (555) 456-7890',
            images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'],
            badges: ['✅ Verified'],
            date: '2024-01-13T09:15:00Z',
            views: 234,
            verified: true
        },
        {
            id: 4,
            title: 'Senior Frontend Developer',
            category: 'jobs',
            price: 120000,
            description: 'Looking for experienced React/TypeScript developer. Remote work available.',
            location: 'Remote',
            contact: 'jobs@techcompany.com',
            images: ['https://images.unsplash.com/photo-1551434678-e076c223a692?w=400'],
            badges: ['🔥 Trending'],
            date: '2024-01-12T16:45:00Z',
            views: 67,
            verified: true
        },
        {
            id: 5,
            title: 'Nike Air Jordan Retro',
            category: 'fashion',
            price: 180,
            description: 'Limited edition Air Jordan 1 Retro High OG, size 10, never worn.',
            location: 'Chicago, IL',
            contact: '+1 (555) 321-0987',
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
            badges: ['✨ New'],
            date: '2024-01-11T11:30:00Z',
            views: 45,
            verified: false
        },
        {
            id: 6,
            title: 'Web Design Services',
            category: 'services',
            price: 500,
            description: 'Professional web design and development services. Modern, responsive websites.',
            location: 'Austin, TX',
            contact: 'design@webstudio.com',
            images: ['https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400'],
            badges: ['✅ Verified'],
            date: '2024-01-10T13:20:00Z',
            views: 123,
            verified: true
        }
    ];
    
    renderListings();
}

function renderListings() {
    const filteredListings = filterListings(listings, currentFilter);
    
    listingsGrid.innerHTML = filteredListings.map(listing => `
        <div class="listing-card glass-card" data-aos="fade-up">
            <div class="listing-image">
                <img src="${listing.images[0]}" alt="${listing.title}">
                <div class="listing-badges">
                    ${listing.badges.map(badge => `<span class="listing-badge">${badge}</span>`).join('')}
                </div>
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-price">$${listing.price.toLocaleString()}</div>
                <div class="listing-location">${listing.location}</div>
                <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.9rem;">
                    ${listing.description.substring(0, 100)}${listing.description.length > 100 ? '...' : ''}
                </p>
                <div class="listing-meta">
                    <span>${listing.category}</span>
                    <span>${formatDate(listing.date)}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update scroll mode after rendering
    updateScrollMode();
}

function filterListings(listings, filter) {
    switch (filter) {
        case 'trending':
            return listings.filter(listing => listing.badges.includes('🔥 Trending'));
        case 'new':
            return listings.filter(listing => listing.badges.includes('✨ New'));
        case 'verified':
            return listings.filter(listing => listing.verified);
        default:
            return listings;
    }
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentFilter = button.dataset.filter;
            renderListings();
        });
    });
}

// Profile Tabs
function setupProfileTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Load tab content
            loadTabContent(targetTab);
        });
    });
}

function loadTabContent(tab) {
    switch (tab) {
        case 'activity':
            // Load activity chart
            break;
        case 'listings':
            loadUserListings();
            break;
        case 'favorites':
            loadFavorites();
            break;
        case 'settings':
            // Settings are already in HTML
            break;
    }
}

function loadUserListings() {
    const myListingsGrid = document.getElementById('myListingsGrid');
    const userListings = listings.filter(listing => listing.id <= 3); // Simulate user's listings
    
    myListingsGrid.innerHTML = userListings.map(listing => `
        <div class="listing-card glass-card">
            <div class="listing-image">
                <img src="${listing.images[0]}" alt="${listing.title}">
                <div class="listing-badges">
                    ${listing.badges.map(badge => `<span class="listing-badge">${badge}</span>`).join('')}
                </div>
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-price">$${listing.price.toLocaleString()}</div>
                <div class="listing-location">${listing.location}</div>
                <div class="listing-meta">
                    <span>${listing.views} views</span>
                    <span>${formatDate(listing.date)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function loadFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    const favorites = listings.slice(0, 2); // Simulate favorites
    
    favoritesGrid.innerHTML = favorites.map(listing => `
        <div class="listing-card glass-card">
            <div class="listing-image">
                <img src="${listing.images[0]}" alt="${listing.title}">
                <div class="listing-badges">
                    <span class="listing-badge">❤️ Favorite</span>
                </div>
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-price">$${listing.price.toLocaleString()}</div>
                <div class="listing-location">${listing.location}</div>
            </div>
        </div>
    `).join('');
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// GSAP Animations
function setupGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.hero-title .title-line', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.search-container', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 1.2,
        ease: 'power3.out'
    });
    
    gsap.from('.category-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        delay: 1.6,
        ease: 'power3.out'
    });
    
    // Parallax effect for background
    gsap.to('.background-animation', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Stagger animation for listing cards
    gsap.from('.listing-card', {
        duration: 0.6,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.listings-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays < 7) return `${diffDays - 1} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function showLoading() {
    loadingOverlay.classList.add('show');
}

function hideLoading() {
    loadingOverlay.classList.remove('show');
}

// Category card interactions
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        showToast(`Browsing ${category} category`, 'info');
        
        // Filter listings by category
        currentFilter = 'all';
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');
        
        const filteredListings = listings.filter(listing => listing.category === category);
        renderFilteredListings(filteredListings);
    });
});

function renderFilteredListings(filteredListings) {
    listingsGrid.innerHTML = filteredListings.map(listing => `
        <div class="listing-card glass-card" data-aos="fade-up">
            <div class="listing-image">
                <img src="${listing.images[0]}" alt="${listing.title}">
                <div class="listing-badges">
                    ${listing.badges.map(badge => `<span class="listing-badge">${badge}</span>`).join('')}
                </div>
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-price">$${listing.price.toLocaleString()}</div>
                <div class="listing-location">${listing.location}</div>
                <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.9rem;">
                    ${listing.description.substring(0, 100)}${listing.description.length > 100 ? '...' : ''}
                </p>
                <div class="listing-meta">
                    <span>${listing.category}</span>
                    <span>${formatDate(listing.date)}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update scroll mode after rendering
    updateScrollMode();
}

// Load more functionality
loadMoreBtn.addEventListener('click', () => {
    showLoading();
    
    // Simulate loading more content
    setTimeout(() => {
        hideLoading();
        showToast('More listings loaded!', 'success');
        
        // Add more sample listings
        const newListings = [
            {
                id: Date.now(),
                title: 'Gaming PC RTX 4080',
                category: 'electronics',
                price: 2200,
                description: 'High-end gaming PC with RTX 4080, 32GB RAM, 2TB NVMe SSD.',
                location: 'Seattle, WA',
                contact: '+1 (555) 111-2222',
                images: ['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400'],
                badges: ['✨ New'],
                date: new Date().toISOString(),
                views: 23,
                verified: false
            }
        ];
        
        listings.push(...newListings);
        renderListings();
    }, 1500);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// Performance optimization
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any layout-dependent values
        if (window.innerWidth <= 768) {
            // Mobile optimizations
        }
    }, 250);
});

// Service Worker registration (for PWA features)
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

// --- CONTINUOUSLY MOVING STARS/SPARKLES BACKGROUND ---
function setupMovingStars() {
    const container = document.getElementById('sparklesContainer');
    if (!container) return;
    container.innerHTML = '';
    // Create a canvas for stars
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 1;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resizeCanvas);

    // Star properties
    const numStars = 120;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.5 + 1.5,
            speed: Math.random() * 0.4 + 0.2,
            dx: (Math.random() - 0.5) * 0.2,
            dy: Math.random() * 0.7 + 0.2,
            alpha: Math.random() * 0.5 + 0.5
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        for (let s of stars) {
            ctx.save();
            ctx.globalAlpha = s.alpha;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
            ctx.fillStyle = '#fffbe7';
            ctx.shadowColor = '#ffe066';
            ctx.shadowBlur = 16;
            ctx.fill();
            ctx.restore();
        }
    }

    function animateStars() {
        for (let s of stars) {
            s.x += s.dx;
            s.y -= s.dy * s.speed;
            if (s.y < -10) {
                s.x = Math.random() * width;
                s.y = height + 10;
                s.r = Math.random() * 1.5 + 1.5;
                s.speed = Math.random() * 0.4 + 0.2;
                s.dx = (Math.random() - 0.5) * 0.2;
                s.dy = Math.random() * 0.7 + 0.2;
                s.alpha = Math.random() * 0.5 + 0.5;
            }
            if (s.x < -10) s.x = width + 10;
            if (s.x > width + 10) s.x = -10;
        }
        drawStars();
        requestAnimationFrame(animateStars);
    }
    animateStars();
}

// Replace old sparkles setup with new moving stars
function setupSparkles() {
    setupMovingStars();
}

// Footer Sparkles with Dynamic Colors
function setupFooterSparkles() {
    const sparkleColors = [
        '#FF6B6B', // Bright red
        '#4ECDC4', // Bright cyan
        '#45B7D1', // Bright blue
        '#96CEB4', // Bright green
        '#FFEAA7', // Bright yellow
        '#DDA0DD', // Bright purple
        '#FFB6C1', // Bright pink
        '#98D8C8', // Bright mint
        '#F7DC6F', // Bright gold
        '#BB8FCE'  // Bright lavender
    ];
    
    function createFooterSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'footer-sparkle';
        
        // Random position
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 4 + 's';
        sparkle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Random color
        const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        sparkle.style.background = color;
        sparkle.style.boxShadow = `0 0 20px ${color}`;
        sparkle.querySelector('::before')?.style.background = color;
        sparkle.querySelector('::after')?.style.background = color;
        
        // Set pseudo-element colors
        sparkle.style.setProperty('--sparkle-color', color);
        
        footerSparklesContainer.appendChild(sparkle);
        footerSparkles.push(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
                const index = footerSparkles.indexOf(sparkle);
                if (index > -1) {
                    footerSparkles.splice(index, 1);
                }
            }
        }, 7000);
    }
    
    // Create more sparkles
    footerSparkleInterval = setInterval(createFooterSparkle, 150);
    
    // Initial sparkles
    for (let i = 0; i < 30; i++) {
        setTimeout(createFooterSparkle, i * 100);
    }
}

// Footer Logo with GSAP and TypeScript effect
function setupFooterLogo() {
    const footerLogoLetters = document.querySelectorAll('.footer-logo-letter');
    
    footerLogo.addEventListener('mouseenter', () => {
        // Animate each letter with GSAP
        gsap.to(footerLogoLetters, {
            duration: 0.3,
            y: -10,
            scale: 1.2,
            rotation: 360,
            ease: 'back.out(1.7)',
            stagger: 0.05
        });
        
        // Add TypeScript mode
        footerLogoLetters.forEach(letter => {
            letter.classList.add('typescript-mode');
        });
        
        // Create sparkle explosion
        createFooterLogoSparkles();
    });
    
    footerLogo.addEventListener('mouseleave', () => {
        // Reset letters
        gsap.to(footerLogoLetters, {
            duration: 0.3,
            y: 0,
            scale: 1,
            rotation: 0,
            ease: 'power2.out',
            stagger: 0.02
        });
        
        // Remove TypeScript mode
        footerLogoLetters.forEach(letter => {
            letter.classList.remove('typescript-mode');
        });
    });
    
    // Individual letter interactions
    footerLogoLetters.forEach((letter, index) => {
        letter.addEventListener('click', () => {
            gsap.to(letter, {
                duration: 0.2,
                y: -15,
                scale: 1.5,
                rotation: 720,
                ease: 'elastic.out(1, 0.3)',
                onComplete: () => {
                    gsap.to(letter, {
                        duration: 0.3,
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        ease: 'power2.out'
                    });
                }
            });
            
            createClickSparkle(letter);
            playClickSound();
        });
    });
}

function createFooterLogoSparkles() {
    const rect = footerLogo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'fixed';
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        sparkle.style.zIndex = '10000';
        sparkle.style.animation = 'none';
        
        document.body.appendChild(sparkle);
        
        const angle = (i / 15) * Math.PI * 2;
        const distance = 80;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;
        
        gsap.to(sparkle, {
            duration: 1,
            x: targetX - centerX,
            y: targetY - centerY,
            opacity: 0,
            scale: 0,
            ease: 'power2.out',
            onComplete: () => {
                document.body.removeChild(sparkle);
            }
        });
    }
}

// Footer Sparkle Interaction - Award-winning cursor interaction
function setupFooterSparkleInteraction() {
    const footer = document.querySelector('.footer');
    
    footer.addEventListener('mouseenter', () => {
        isFooterHovered = true;
    });
    
    footer.addEventListener('mouseleave', () => {
        isFooterHovered = false;
        // Reset all sparkles
        footerSparkles.forEach(sparkle => {
            sparkle.classList.remove('cursor-near', 'cursor-very-near');
            sparkle.style.setProperty('--cursor-offset-x', '0px');
            sparkle.style.setProperty('--cursor-offset-y', '0px');
        });
    });
    
    footer.addEventListener('mousemove', (e) => {
        if (!isFooterHovered) return;
        
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        const footerRect = footer.getBoundingClientRect();
        const footerCursorX = cursorX - footerRect.left;
        const footerCursorY = cursorY - footerRect.top;
        
        footerSparkles.forEach(sparkle => {
            const sparkleRect = sparkle.getBoundingClientRect();
            const sparkleCenterX = sparkleRect.left + sparkleRect.width / 2 - footerRect.left;
            const sparkleCenterY = sparkleRect.top + sparkleRect.height / 2 - footerRect.top;
            
            const distance = Math.sqrt(
                Math.pow(footerCursorX - sparkleCenterX, 2) + 
                Math.pow(footerCursorY - sparkleCenterY, 2)
            );
            
            // Remove previous classes
            sparkle.classList.remove('cursor-near', 'cursor-very-near');
            
            if (distance < 30) {
                // Very near - make space for cursor
                sparkle.classList.add('cursor-very-near');
                
                // Calculate offset to push sparkle away from cursor
                const angle = Math.atan2(footerCursorY - sparkleCenterY, footerCursorX - sparkleCenterX);
                const pushDistance = 40;
                const offsetX = Math.cos(angle) * pushDistance;
                const offsetY = Math.sin(angle) * pushDistance;
                
                sparkle.style.setProperty('--cursor-offset-x', `${offsetX}px`);
                sparkle.style.setProperty('--cursor-offset-y', `${offsetY}px`);
                
                // Add magnetic effect
                gsap.to(sparkle, {
                    duration: 0.3,
                    scale: 2,
                    opacity: 1,
                    ease: 'power2.out'
                });
                
            } else if (distance < 80) {
                // Near - subtle interaction
                sparkle.classList.add('cursor-near');
                
                const angle = Math.atan2(footerCursorY - sparkleCenterY, footerCursorX - sparkleCenterX);
                const pushDistance = 20;
                const offsetX = Math.cos(angle) * pushDistance;
                const offsetY = Math.sin(angle) * pushDistance;
                
                sparkle.style.setProperty('--cursor-offset-x', `${offsetX}px`);
                sparkle.style.setProperty('--cursor-offset-y', `${offsetY}px`);
                
                gsap.to(sparkle, {
                    duration: 0.4,
                    scale: 1.5,
                    opacity: 0.9,
                    ease: 'power2.out'
                });
                
            } else {
                // Far - reset
                sparkle.style.setProperty('--cursor-offset-x', '0px');
                sparkle.style.setProperty('--cursor-offset-y', '0px');
                
                gsap.to(sparkle, {
                    duration: 0.5,
                    scale: 1,
                    opacity: 0.7,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Logo Interactions
function setupLogoInteractions() {
    const logoLetters = document.querySelectorAll('.logo-letter');
    
    logoLetters.forEach((letter, index) => {
        letter.addEventListener('click', () => {
            // Create sparkle effect on click
            createClickSparkle(letter);
            
            // Animate letter
            gsap.to(letter, {
                duration: 0.3,
                y: -10,
                scale: 1.3,
                rotation: 360,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    gsap.to(letter, {
                        duration: 0.2,
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        ease: 'power2.out'
                    });
                }
            });
            
            // Play sound effect (optional)
            playClickSound();
        });
        
        // Hover effect
        letter.addEventListener('mouseenter', () => {
            gsap.to(letter, {
                duration: 0.2,
                y: -5,
                scale: 1.1,
                ease: 'power2.out'
            });
        });
        
        letter.addEventListener('mouseleave', () => {
            gsap.to(letter, {
                duration: 0.2,
                y: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

function createClickSparkle(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'fixed';
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        sparkle.style.zIndex = '10000';
        sparkle.style.animation = 'none';
        
        document.body.appendChild(sparkle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;
        
        gsap.to(sparkle, {
            duration: 0.8,
            x: targetX - centerX,
            y: targetY - centerY,
            opacity: 0,
            scale: 0,
            ease: 'power2.out',
            onComplete: () => {
                document.body.removeChild(sparkle);
            }
        });
    }
}

function playClickSound() {
    // Create a simple click sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Fallback if Web Audio API is not available
        console.log('Audio not supported');
    }
}



// Dynamic Scrolling System
function setupDynamicScrolling() {
    // Initial setup
    updateScrollMode();
    
    // Listen for window resize
    window.addEventListener('resize', debounce(() => {
        updateScrollMode();
    }, 250));
    
    // Setup scroll progress indicator
    if (listingsScrollWrapper) {
        listingsScrollWrapper.addEventListener('scroll', updateScrollProgress);
    }
    
    // Add smooth scroll behavior
    setupSmoothScroll();
}

function updateScrollMode() {
    if (!listingsGrid) return;
    
    const windowWidth = window.innerWidth;
    const containerWidth = listingsScrollWrapper?.offsetWidth || windowWidth;
    const totalCardsWidth = listingsGrid.children.length * 320; // Approximate card width
    
    // Remove existing classes
    listingsGrid.classList.remove('horizontal-mode', 'vertical-mode');
    
    if (windowWidth <= 768) {
        // Mobile: Always vertical
        listingsGrid.classList.add('vertical-mode');
        listingsGrid.style.display = 'grid';
        listingsGrid.style.gridTemplateColumns = '1fr';
        listingsGrid.style.minWidth = 'auto';
        
        // Update cards for vertical mode
        Array.from(listingsGrid.children).forEach(card => {
            card.classList.add('vertical-mode');
        });
        
    } else if (windowWidth <= 1024) {
        // Tablet: Horizontal if needed
        if (totalCardsWidth > containerWidth) {
            listingsGrid.classList.add('horizontal-mode');
            listingsGrid.style.display = 'flex';
            listingsGrid.style.minWidth = 'max-content';
            
            Array.from(listingsGrid.children).forEach(card => {
                card.classList.remove('vertical-mode');
            });
        } else {
            listingsGrid.classList.add('vertical-mode');
            listingsGrid.style.display = 'grid';
            listingsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
            listingsGrid.style.minWidth = 'auto';
            
            Array.from(listingsGrid.children).forEach(card => {
                card.classList.add('vertical-mode');
            });
        }
        
    } else {
        // Desktop: Horizontal scrolling
        listingsGrid.classList.add('horizontal-mode');
        listingsGrid.style.display = 'flex';
        listingsGrid.style.minWidth = 'max-content';
        
        Array.from(listingsGrid.children).forEach(card => {
            card.classList.remove('vertical-mode');
        });
    }
}

function updateScrollProgress() {
    if (!scrollProgress || !listingsScrollWrapper) return;
    
    const scrollLeft = listingsScrollWrapper.scrollLeft;
    const scrollWidth = listingsScrollWrapper.scrollWidth - listingsScrollWrapper.clientWidth;
    const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
    
    scrollProgress.style.width = `${progress}%`;
}

function setupSmoothScroll() {
    if (!listingsScrollWrapper) return;
    
    // Add smooth scroll behavior
    listingsScrollWrapper.style.scrollBehavior = 'smooth';
    
    // Add scroll snap for better UX
    listingsGrid.style.scrollSnapType = 'x mandatory';
    
    // Add scroll snap to cards
    Array.from(listingsGrid.children).forEach(card => {
        card.style.scrollSnapAlign = 'start';
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Magnet Lines Setup
function setupMagnetLines() {
    const magnetLinesContainer = document.getElementById('magnetLines');
    if (!magnetLinesContainer) return;
    
    const rows = 9;
    const columns = 9;
    const containerSize = 60; // vmin
    const lineColor = 'tomato';
    const lineWidth = 0.8; // vmin
    const lineHeight = 5; // vmin
    const baseAngle = 0;
    
    // Clear container
    magnetLinesContainer.innerHTML = '';
    
    // Create magnet lines
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            // Create horizontal line
            const horizontalLine = document.createElement('div');
            horizontalLine.className = 'magnet-line horizontal';
            horizontalLine.style.left = `${(col / columns) * 100}%`;
            horizontalLine.style.top = `${(row / rows) * 100}%`;
            horizontalLine.style.transform = `translate(-50%, -50%) rotate(${baseAngle}deg)`;
            
            // Create vertical line
            const verticalLine = document.createElement('div');
            verticalLine.className = 'magnet-line vertical';
            verticalLine.style.left = `${(col / columns) * 100}%`;
            verticalLine.style.top = `${(row / rows) * 100}%`;
            verticalLine.style.transform = `translate(-50%, -50%) rotate(${baseAngle + 90}deg)`;
            
            // Add hover effects
            [horizontalLine, verticalLine].forEach(line => {
                line.addEventListener('mouseenter', () => {
                    line.style.background = '#ff6347';
                    line.style.boxShadow = '0 0 10px tomato';
                    line.style.transform = `${line.style.transform} scale(1.1)`;
                });
                
                line.addEventListener('mouseleave', () => {
                    line.style.background = 'tomato';
                    line.style.boxShadow = 'none';
                    line.style.transform = line.style.transform.replace(' scale(1.1)', '');
                });
            });
            
            magnetLinesContainer.appendChild(horizontalLine);
            magnetLinesContainer.appendChild(verticalLine);
        }
    }
    
    // Add magnetic effect on mouse move
    let mouseX = 0, mouseY = 0;
    const container = document.getElementById('magnetLinesContainer');
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        const lines = magnetLinesContainer.querySelectorAll('.magnet-line');
        lines.forEach(line => {
            const lineRect = line.getBoundingClientRect();
            const lineCenterX = lineRect.left + lineRect.width / 2 - rect.left;
            const lineCenterY = lineRect.top + lineRect.height / 2 - rect.top;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - lineCenterX, 2) + 
                Math.pow(mouseY - lineCenterY, 2)
            );
            
            const maxDistance = 100;
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(mouseY - lineCenterY, mouseX - lineCenterX);
                const offsetX = Math.cos(angle) * force * 10;
                const offsetY = Math.sin(angle) * force * 10;
                
                line.style.transform = `${line.style.transform.split(' ')[0]} translate(${offsetX}px, ${offsetY}px)`;
            } else {
                line.style.transform = line.style.transform.split(' ')[0];
            }
        });
    });
}

// --- MAGNET LINES IN FOOTER ---
(function createMagnetLines() {
    const container = document.getElementById('magnetLines');
    if (!container) return;
    container.innerHTML = '';
    // Draw a stylized "magnet"/atom shape with metallic lines
    const lines = [
        { rotate: 0, scale: 1 },
        { rotate: 60, scale: 1 },
        { rotate: 120, scale: 1 },
        { rotate: 180, scale: 1 },
        { rotate: 240, scale: 1 },
        { rotate: 300, scale: 1 },
    ];
    lines.forEach(l => {
        const el = document.createElement('div');
        el.className = 'magnet-line';
        el.style.transform = `rotate(${l.rotate}deg) scaleX(${l.scale})`;
        container.appendChild(el);
    });
})();

// Debug function to check cursor status
function debugCursor() {
    const customCursor = document.getElementById('customCursor');
    const cursorTrail = document.getElementById('cursorTrail');
    
    console.log('Cursor Debug Info:');
    console.log('Custom cursor element:', customCursor);
    console.log('Cursor trail element:', cursorTrail);
    console.log('Body cursor style:', document.body.style.cursor);
    console.log('Device supports hover:', window.matchMedia('(hover: hover)').matches);
    
    if (customCursor) {
        console.log('Cursor opacity:', customCursor.style.opacity);
        console.log('Cursor display:', customCursor.style.display);
        console.log('Cursor position:', customCursor.style.left, customCursor.style.top);
    }
}

// Export functions for global access
window.Craigslist = {
    showToast,
    showLoading,
    hideLoading,
    toggleTheme,
    removeImage,
    updateScrollMode,
    debugCursor
}; 