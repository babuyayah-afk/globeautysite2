// ===== GLOBAL SEARCH FUNCTIONALITY =====
// This file should be included in all pages

(function() {
    // Create search HTML if it doesn't exist
    if (!document.getElementById('globalSearch')) {
        const searchHTML = `
            <div id="globalSearch" class="global-search-wrapper" style="display: none;">
                <div class="search-overlay" onclick="toggleSearch()"></div>
                <div class="search-modal">
                    <div class="search-header">
                        <h3><i class="fas fa-search" style="color: var(--primary);"></i> Search GloBeauty</h3>
                        <button class="close-search" onclick="toggleSearch()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="search-input-wrapper">
                        <i class="fas fa-search"></i>
                        <input type="text" id="searchInput" placeholder="Search for products, brands, or articles..." autocomplete="off">
                        <button class="clear-search" onclick="clearSearch()" id="clearSearchBtn" style="display: none;"><i class="fas fa-times-circle"></i></button>
                    </div>
                    <div class="search-results" id="searchResults">
                        <div class="search-initial">Start typing to search products, brands, and articles...</div>
                    </div>
                    <div class="search-footer">
                        <span><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i> navigate</span>
                        <span><i class="fas fa-enter"></i> select</span>
                        <span><i class="fas fa-esc"></i> esc to close</span>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', searchHTML);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .global-search-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: none;
                align-items: flex-start;
                justify-content: center;
            }
            
            .global-search-wrapper.active {
                display: flex;
            }
            
            .search-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
            }
            
            .search-modal {
                position: relative;
                width: 90%;
                max-width: 600px;
                background: var(--card-bg);
                border-radius: 30px;
                box-shadow: var(--shadow);
                margin-top: 100px;
                z-index: 10001;
                overflow: hidden;
                border: 2px solid var(--border-color);
                animation: slideDown 0.3s ease;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .search-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 25px;
                border-bottom: 1px solid var(--border-color);
            }
            
            .search-header h3 {
                font-size: 20px;
                font-weight: 800;
                color: var(--text);
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .close-search {
                background: var(--hover-bg);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text);
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .close-search:hover {
                background: var(--primary);
                color: white;
            }
            
            .search-input-wrapper {
                padding: 20px 25px;
                position: relative;
                border-bottom: 1px solid var(--border-color);
            }
            
            .search-input-wrapper i {
                position: absolute;
                left: 35px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--primary);
                font-size: 18px;
            }
            
            .search-input-wrapper input {
                width: 100%;
                padding: 15px 20px 15px 50px;
                border: 2px solid var(--border-color);
                border-radius: 50px;
                font-size: 16px;
                font-family: 'Quicksand', sans-serif;
                background: var(--input-bg);
                color: var(--text);
                transition: all 0.3s;
            }
            
            .search-input-wrapper input:focus {
                border-color: var(--primary);
                outline: none;
                box-shadow: 0 0 0 4px rgba(212,165,165,0.1);
            }
            
            .clear-search {
                position: absolute;
                right: 35px;
                top: 50%;
                transform: translateY(-50%);
                background: transparent;
                border: none;
                color: var(--text);
                opacity: 0.5;
                cursor: pointer;
                font-size: 18px;
            }
            
            .clear-search:hover {
                opacity: 1;
                color: var(--secondary);
            }
            
            .search-results {
                max-height: 400px;
                overflow-y: auto;
                padding: 0 25px;
            }
            
            .search-initial {
                text-align: center;
                padding: 40px 20px;
                color: var(--text);
                opacity: 0.5;
                font-style: italic;
            }
            
            .search-result-item {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px 0;
                border-bottom: 1px solid var(--border-color);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .search-result-item:hover {
                background: var(--hover-bg);
                padding-left: 15px;
                margin-left: -15px;
                margin-right: -15px;
                padding-right: 15px;
            }
            
            .search-result-item.selected {
                background: var(--hover-bg);
                border-left: 4px solid var(--primary);
                padding-left: 11px;
            }
            
            .result-icon {
                width: 50px;
                height: 50px;
                background: var(--hover-bg);
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--primary);
                font-size: 20px;
            }
            
            .result-info {
                flex: 1;
            }
            
            .result-name {
                font-weight: 800;
                margin-bottom: 5px;
                color: var(--text);
            }
            
            .result-category {
                font-size: 13px;
                color: var(--text);
                opacity: 0.6;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .result-category i {
                font-size: 12px;
            }
            
            .result-price {
                font-weight: 700;
                color: var(--secondary);
            }
            
            .search-footer {
                display: flex;
                justify-content: center;
                gap: 20px;
                padding: 15px 25px;
                background: var(--hover-bg);
                border-top: 1px solid var(--border-color);
                font-size: 13px;
                color: var(--text);
                opacity: 0.7;
            }
            
            .search-footer span {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .no-results {
                text-align: center;
                padding: 40px 20px;
                color: var(--text);
                opacity: 0.7;
            }
            
            .no-results i {
                font-size: 48px;
                color: var(--border-color);
                margin-bottom: 15px;
            }
            
            .search-highlight {
                background: var(--accent);
                color: var(--dark);
                padding: 2px 4px;
                border-radius: 4px;
                font-weight: 700;
            }
            
            @media (max-width: 768px) {
                .search-modal {
                    width: 95%;
                    margin-top: 50px;
                }
                
                .search-footer {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Product database reference
    let searchProducts = [];
    let searchBrands = ['CeraVe', 'The Ordinary', 'L\'Oréal', 'Neutrogena', 'Nivea', 'GloBeauty'];
    let searchCategories = ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Tools', 'Body Care', 'Lip Care'];
    
    // Get products from global variable if available
    function loadProducts() {
        // Try to get from window.products (from home.html)
        if (typeof window.products !== 'undefined' && window.products.length > 0) {
            searchProducts = window.products;
            console.log('Search loaded', searchProducts.length, 'products');
        } else {
            // Try to get from localStorage
            const stored = localStorage.getItem('gloBeauty_products');
            if (stored) {
                try {
                    searchProducts = JSON.parse(stored);
                } catch (e) {
                    console.log('Error parsing stored products');
                }
            }
            
            // If still no products, use default sample
            if (searchProducts.length === 0) {
                searchProducts = [
                    { id: 1, name: "Vitamin C Brightening Serum", category: "skincare", categoryDisplay: "Skincare", price: 45.99, icon: "fa-droplet", brand: "globeauty" },
                    { id: 2, name: "Hyaluronic Acid Moisturizer", category: "skincare", categoryDisplay: "Skincare", price: 38.50, icon: "fa-water", brand: "globeauty" },
                    { id: 3, name: "Gentle Foaming Cleanser", category: "skincare", categoryDisplay: "Skincare", price: 24.99, icon: "fa-soap", brand: "globeauty" },
                    { id: 4, name: "Long-wear Foundation", category: "makeup", categoryDisplay: "Makeup", price: 42.99, icon: "fa-paint-roller", brand: "globeauty" },
                    { id: 5, name: "Hydrating Lipstick", category: "makeup", categoryDisplay: "Makeup", price: 22.99, icon: "fa-paint-brush", brand: "globeauty" },
                    { id: 6, name: "Nourishing Shampoo", category: "haircare", categoryDisplay: "Haircare", price: 28.99, icon: "fa-hand-holding-heart", brand: "globeauty" },
                    { id: 7, name: "Floral Eau de Parfum", category: "fragrance", categoryDisplay: "Fragrance", price: 65.99, icon: "fa-feather-alt", brand: "globeauty" },
                    { id: 8, name: "Jade Roller Set", category: "tools", categoryDisplay: "Beauty Tools", price: 29.99, icon: "fa-gem", brand: "globeauty" }
                ];
            }
        }
    }

    // Toggle search
    window.toggleSearch = function() {
        const searchWrapper = document.getElementById('globalSearch');
        if (searchWrapper) {
            searchWrapper.classList.toggle('active');
            
            if (searchWrapper.classList.contains('active')) {
                setTimeout(() => {
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput) {
                        searchInput.focus();
                        searchInput.value = '';
                    }
                    loadProducts();
                    clearSearch();
                }, 100);
            }
        }
    };

    // Clear search
    window.clearSearch = function() {
        const searchInput = document.getElementById('searchInput');
        const clearBtn = document.getElementById('clearSearchBtn');
        const resultsDiv = document.getElementById('searchResults');
        
        if (searchInput) searchInput.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
        if (resultsDiv) resultsDiv.innerHTML = '<div class="search-initial">Start typing to search products, brands, and articles...</div>';
    };

    // Perform search
    window.performSearch = function() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        const query = searchInput.value.toLowerCase().trim();
        const clearBtn = document.getElementById('clearSearchBtn');
        const resultsDiv = document.getElementById('searchResults');
        
        if (!resultsDiv) return;
        
        if (query.length > 0) {
            if (clearBtn) clearBtn.style.display = 'block';
            
            // Make sure products are loaded
            if (searchProducts.length === 0) {
                loadProducts();
            }
            
            // Search in products
            const productResults = searchProducts.filter(p => 
                (p.name && p.name.toLowerCase().includes(query)) || 
                (p.description && p.description.toLowerCase().includes(query)) ||
                (p.brand && p.brand.toLowerCase().includes(query))
            );
            
            // Search in brands
            const brandResults = searchBrands.filter(b => 
                b.toLowerCase().includes(query)
            ).map(b => ({ type: 'brand', name: b }));
            
            // Search in categories
            const categoryResults = searchCategories.filter(c => 
                c.toLowerCase().includes(query)
            ).map(c => ({ type: 'category', name: c }));
            
            let html = '';
            
            if (productResults.length === 0 && brandResults.length === 0 && categoryResults.length === 0) {
                html = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h4>No results found for "${query}"</h4>
                        <p style="margin-top: 10px; font-size: 14px;">Try checking your spelling or use different keywords</p>
                    </div>
                `;
            } else {
                // Show brand results
                if (brandResults.length > 0) {
                    html += '<div style="padding: 10px 0;"><strong style="color: var(--primary);">BRANDS</strong></div>';
                    brandResults.forEach(brand => {
                        const highlightedName = brand.name.replace(new RegExp(query, 'gi'), match => `<span class="search-highlight">${match}</span>`);
                        html += `
                            <div class="search-result-item" onclick="selectBrand('${brand.name}')">
                                <div class="result-icon"><i class="fas fa-tag"></i></div>
                                <div class="result-info">
                                    <div class="result-name">${highlightedName}</div>
                                    <div class="result-category">Brand</div>
                                </div>
                            </div>
                        `;
                    });
                }
                
                // Show category results
                if (categoryResults.length > 0) {
                    html += '<div style="padding: 10px 0;"><strong style="color: var(--primary);">CATEGORIES</strong></div>';
                    categoryResults.forEach(cat => {
                        const highlightedName = cat.name.replace(new RegExp(query, 'gi'), match => `<span class="search-highlight">${match}</span>`);
                        html += `
                            <div class="search-result-item" onclick="selectCategory('${cat.name}')">
                                <div class="result-icon"><i class="fas fa-folder"></i></div>
                                <div class="result-info">
                                    <div class="result-name">${highlightedName}</div>
                                    <div class="result-category">Category</div>
                                </div>
                            </div>
                        `;
                    });
                }
                
                // Show product results
                if (productResults.length > 0) {
                    html += '<div style="padding: 10px 0;"><strong style="color: var(--primary);">PRODUCTS</strong></div>';
                    productResults.slice(0, 5).forEach(product => {
                        const highlightedName = product.name.replace(new RegExp(query, 'gi'), match => `<span class="search-highlight">${match}</span>`);
                        const brandName = getBrandDisplay(product.brand);
                        const price = product.price ? `KSh ${Math.round(product.price * 130).toLocaleString()}` : '';
                        html += `
                            <div class="search-result-item" onclick="selectProduct(${product.id})">
                                <div class="result-icon"><i class="fas ${product.icon || 'fa-box'}"></i></div>
                                <div class="result-info">
                                    <div class="result-name">${highlightedName}</div>
                                    <div class="result-category">
                                        <span>${brandName}</span>
                                        <span>•</span>
                                        <span>${product.categoryDisplay || product.category}</span>
                                    </div>
                                </div>
                                <div class="result-price">${price}</div>
                            </div>
                        `;
                    });
                    
                    if (productResults.length > 5) {
                        html += `<div style="text-align: center; padding: 10px;">+ ${productResults.length - 5} more products</div>`;
                    }
                }
            }
            
            resultsDiv.innerHTML = html;
        } else {
            if (clearBtn) clearBtn.style.display = 'none';
            resultsDiv.innerHTML = '<div class="search-initial">Start typing to search products, brands, and articles...</div>';
        }
    };

    function getBrandDisplay(brand) {
        const brands = {
            'cerave': 'CeraVe',
            'theordinary': 'The Ordinary',
            'loreal': 'L\'Oréal',
            'neutrogena': 'Neutrogena',
            'nivea': 'Nivea',
            'globeauty': 'GloBeauty'
        };
        return brands[brand] || brand || 'GloBeauty';
    }

    // Select product
    window.selectProduct = function(productId) {
        // Close search
        toggleSearch();
        
        // Check if we're on home page and have showProductInfo function
        if (typeof window.showProductInfo === 'function') {
            window.showProductInfo(productId);
        } else {
            // Navigate to home page with product ID
            window.location.href = `home.html?product=${productId}`;
        }
    };

    // Select brand
    window.selectBrand = function(brandName) {
        toggleSearch();
        
        // Map brand name to filter value
        const brandMap = {
            'CeraVe': 'cerave',
            'The Ordinary': 'theordinary',
            'L\'Oréal': 'loreal',
            'Neutrogena': 'neutrogena',
            'Nivea': 'nivea',
            'GloBeauty': 'globeauty'
        };
        
        const brandValue = brandMap[brandName] || brandName.toLowerCase();
        
        // Navigate to home with brand filter
        window.location.href = `home.html?brand=${brandValue}`;
    };

    // Select category
    window.selectCategory = function(categoryName) {
        toggleSearch();
        
        const categoryMap = {
            'Skincare': 'skincare',
            'Makeup': 'makeup',
            'Haircare': 'haircare',
            'Fragrance': 'fragrance',
            'Tools': 'tools',
            'Body Care': 'body',
            'Lip Care': 'lipcare'
        };
        
        const categoryValue = categoryMap[categoryName] || categoryName.toLowerCase();
        window.location.href = `home.html?category=${categoryValue}`;
    };

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
        
        // Escape to close search
        if (e.key === 'Escape') {
            const searchWrapper = document.getElementById('globalSearch');
            if (searchWrapper && searchWrapper.classList.contains('active')) {
                toggleSearch();
            }
        }
        
        // Arrow key navigation in search results
        if (document.getElementById('globalSearch')?.classList.contains('active')) {
            const results = document.querySelectorAll('.search-result-item');
            if (results.length > 0) {
                const selected = document.querySelector('.search-result-item.selected');
                let index = -1;
                
                if (selected) {
                    index = Array.from(results).indexOf(selected);
                }
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (selected) {
                        selected.classList.remove('selected');
                        if (index < results.length - 1) {
                            results[index + 1].classList.add('selected');
                        } else {
                            results[0].classList.add('selected');
                        }
                    } else {
                        results[0].classList.add('selected');
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (selected) {
                        selected.classList.remove('selected');
                        if (index > 0) {
                            results[index - 1].classList.add('selected');
                        } else {
                            results[results.length - 1].classList.add('selected');
                        }
                    } else {
                        results[0].classList.add('selected');
                    }
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    const selected = document.querySelector('.search-result-item.selected');
                    if (selected) {
                        selected.click();
                    }
                }
            }
        }
    });

    // Setup search input listener
    function setupSearchInput() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            // Remove existing listener to avoid duplicates
            searchInput.removeEventListener('input', performSearch);
            searchInput.addEventListener('input', performSearch);
            
            searchInput.removeEventListener('keydown', handleSearchKeyDown);
            searchInput.addEventListener('keydown', handleSearchKeyDown);
        }
    }
    
    function handleSearchKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Select first result
            const firstResult = document.querySelector('.search-result-item');
            if (firstResult) {
                firstResult.click();
            }
        }
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        loadProducts();
        setupSearchInput();
        
        // Close search when clicking outside
        window.addEventListener('click', function(event) {
            const searchWrapper = document.getElementById('globalSearch');
            const searchTrigger = event.target.closest('[onclick="toggleSearch()"]') || event.target.closest('.search-trigger');
            
            if (searchWrapper && searchWrapper.classList.contains('active') && 
                !event.target.closest('.search-modal') && 
                !searchTrigger) {
                toggleSearch();
            }
        });
    });
})();