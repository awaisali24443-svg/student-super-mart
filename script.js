
// --- DATA & CONSTANTS ---
const TAX_RATE = 0.00;
const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 200;

// Data containers
let products = [];
let categories = [];
let orders = [];

// Local containers
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// We only check for admin session locally, data is on server
const isAdmin = sessionStorage.getItem('adminAuth') === 'true';

// --- API FUNCTIONS ---
async function fetchData() {
    try {
        // Show initial loader only on home page if needed, or just let it load
        const res = await fetch('/api/data');
        const data = await res.json();
        products = data.products || [];
        categories = data.categories || [];
        orders = data.orders || [];
        
        if (categories.length === 0) {
            categories = ['Produce', 'Dairy & Eggs', 'Bakery', 'Pantry', 'Beverages', 'Snacks', 'Local Specialties'];
        }
        
        initApp(); // Initialize after data is loaded
    } catch (err) {
        console.error('Failed to load data:', err);
    }
}

async function syncData(type, data) {
    try {
        const res = await fetch('/api/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, data })
        });
        if (!res.ok) throw new Error('Server error');
        return true;
    } catch (e) {
        alert('Error saving data to server. Please try again.');
        console.error(e);
        return false;
    }
}

// --- IMAGE COMPRESSION ---
function compressImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800; // Resize large images
                const scaleSize = MAX_WIDTH / img.width;
                const width = (img.width > MAX_WIDTH) ? MAX_WIDTH : img.width;
                const height = (img.width > MAX_WIDTH) ? (img.height * scaleSize) : img.height;

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Compress to JPEG with 0.7 quality
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                resolve(dataUrl);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
}

// --- INIT & ROUTING ---
document.addEventListener('DOMContentLoaded', fetchData);

function initApp() {
    renderHeader();
    renderFooter();
    
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/') initHome();
    else if (path.includes('shop.html')) initShop();
    else if (path.includes('product.html')) initProduct();
    else if (path.includes('checkout.html')) initCheckout();
    else if (path.includes('admin.html')) initAdmin();
    else if (path.includes('success.html')) {
        // Clear cart on success
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

// --- COMPONENTS ---
function renderHeader() {
    const header = document.getElementById('header-container');
    if(!header) return;
    
    // Calculate total items
    const count = cart.reduce((acc, item) => acc + item.qty, 0);

    header.innerHTML = `
    <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
            <a href="index.html" class="flex items-center gap-2 group">
                <div class="bg-emerald-600 text-white p-2 rounded-lg group-hover:bg-emerald-700 transition-colors">
                    <i class="fa-solid fa-basket-shopping text-xl"></i>
                </div>
                <span class="font-bold text-xl tracking-tight text-gray-800">Student Super Mart</span>
            </a>
            
            <nav class="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                <a href="index.html" class="hover:text-emerald-600 transition-colors">Home</a>
                <a href="shop.html" class="hover:text-emerald-600 transition-colors">Shop</a>
                <a href="shop.html?sale=true" class="hover:text-emerald-600 transition-colors">Deals</a>
            </nav>

            <div class="flex items-center gap-4">
                <button onclick="toggleCart()" class="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                    <i class="fa-solid fa-cart-shopping text-xl"></i>
                    ${count > 0 ? `<span id="cart-badge" class="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">${count}</span>` : ''}
                </button>
            </div>
        </div>
    </header>
    ${renderCartSidebar()}
    `;
    
    // Re-attach cart listeners
    updateCartUI();
}

function renderCartSidebar() {
    return `
    <div id="cart-sidebar" class="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-[60] transform translate-x-full cart-sidebar flex flex-col">
        <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-emerald-50">
            <h2 class="font-bold text-lg text-gray-800">Your Cart</h2>
            <button onclick="toggleCart()" class="text-gray-500 hover:text-red-500 p-2"><i class="fa-solid fa-xmark text-xl"></i></button>
        </div>
        
        <div id="cart-items" class="flex-1 overflow-y-auto p-4 space-y-4">
            <!-- Items injected here -->
        </div>

        <div class="p-6 bg-gray-50 border-t border-gray-100">
            <div class="flex justify-between mb-4 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span id="cart-total">Rs. 0</span>
            </div>
            <a href="checkout.html" class="block w-full bg-emerald-600 text-white text-center font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                Checkout
            </a>
        </div>
    </div>
    <div id="cart-overlay" onclick="toggleCart()" class="fixed inset-0 bg-black/20 z-[55] hidden backdrop-blur-sm"></div>
    `;
}

function renderFooter() {
    const footer = document.getElementById('footer-container');
    if(footer) {
        footer.innerHTML = `
        <footer class="bg-white border-t border-gray-200 pt-12 pb-6 mt-12">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div class="flex items-center gap-2 mb-4">
                            <div class="bg-emerald-600 text-white p-1.5 rounded-md">
                                <i class="fa-solid fa-basket-shopping"></i>
                            </div>
                            <span class="font-bold text-lg text-gray-800">Student Super Mart</span>
                        </div>
                        <p class="text-gray-500 text-sm">Delivering happiness and groceries to Shabqadar and surrounding areas.</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-800 mb-4">Quick Links</h4>
                        <ul class="space-y-2 text-sm text-gray-500">
                            <li><a href="index.html" class="hover:text-emerald-600">Home</a></li>
                            <li><a href="shop.html" class="hover:text-emerald-600">Shop</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-800 mb-4">Contact</h4>
                        <ul class="space-y-2 text-sm text-gray-500">
                            <li><i class="fa-solid fa-phone mr-2 text-emerald-600"></i> 0300-1234567</li>
                            <li><i class="fa-solid fa-envelope mr-2 text-emerald-600"></i> info@studentsupermart.com</li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-100 pt-6 text-center text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; 2024 Student Super Mart. All rights reserved.</p>
                    <a href="login.html" class="text-xs hover:text-emerald-600">Admin Login</a>
                </div>
            </div>
        </footer>`;
    }
}

// --- CART LOGIC ---
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.remove('translate-x-full'); // Open
        overlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('translate-x-full'); // Close
        overlay.classList.add('hidden');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    saveCart();
    toggleCart(); // Open cart to show user
    // Make sure cart is open
    const sidebar = document.getElementById('cart-sidebar');
    if(sidebar.classList.contains('translate-x-full')) toggleCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) removeFromCart(productId);
        else saveCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    renderHeader(); // Refresh badge
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!container || !totalEl) return;

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400"><i class="fa-solid fa-basket-shopping text-4xl mb-3"></i><p>Your cart is empty</p></div>`;
        totalEl.textContent = 'Rs. 0';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
        <div class="flex gap-4 items-center">
            <img src="${item.image}" class="w-16 h-16 rounded-lg object-cover bg-gray-100">
            <div class="flex-1">
                <h4 class="font-bold text-sm text-gray-800 line-clamp-1">${item.name}</h4>
                <p class="text-emerald-600 font-bold text-sm">Rs. ${item.price}</p>
                <div class="flex items-center gap-3 mt-2">
                    <button onclick="updateQty('${item.id}', -1)" class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs"><i class="fa-solid fa-minus"></i></button>
                    <span class="text-sm font-medium w-4 text-center">${item.qty}</span>
                    <button onclick="updateQty('${item.id}', 1)" class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>`;
    }).join('');
    
    totalEl.textContent = `Rs. ${total}`;
}


// --- PAGE SPECIFIC ---

// 1. HOME
function initHome() {
    const catContainer = document.getElementById('home-categories');
    const featContainer = document.getElementById('featured-products');
    
    if (catContainer) {
        catContainer.innerHTML = categories.map(cat => `
            <a href="shop.html?cat=${cat}" class="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center border border-gray-100 group">
                <div class="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <i class="fa-solid fa-leaf"></i>
                </div>
                <span class="text-sm font-medium text-gray-700">${cat}</span>
            </a>
        `).join('');
    }

    if (featContainer) {
        const featured = products.filter(p => p.isOnSale).slice(0, 4);
        featContainer.innerHTML = featured.map(p => renderProductCard(p)).join('');
    }
}

// 2. SHOP
function initShop() {
    const params = new URLSearchParams(window.location.search);
    const catFilter = params.get('cat');
    const saleFilter = params.get('sale');
    
    // Setup Sidebar
    const catList = document.getElementById('category-list');
    if (catList) {
        catList.innerHTML = `
            <li><a href="shop.html" class="${!catFilter ? 'text-emerald-600 font-bold' : 'text-gray-600 hover:text-emerald-600'} block">All Categories</a></li>
            ${categories.map(c => `<li><a href="shop.html?cat=${c}" class="${catFilter === c ? 'text-emerald-600 font-bold' : 'text-gray-600 hover:text-emerald-600'} block">${c}</a></li>`).join('')}
        `;
    }

    // Initial Render
    filterAndRenderShop(catFilter, saleFilter);

    // Filter Listeners
    document.getElementById('filter-organic')?.addEventListener('change', () => filterAndRenderShop(catFilter, saleFilter));
    document.getElementById('filter-price')?.addEventListener('input', (e) => {
        document.getElementById('price-display').textContent = `Rs. ${e.target.value}`;
        filterAndRenderShop(catFilter, saleFilter);
    });
}

function filterAndRenderShop(catFilter, saleFilter) {
    const organic = document.getElementById('filter-organic')?.checked;
    const maxPrice = document.getElementById('filter-price')?.value || 5000;

    let filtered = products;
    if (catFilter) filtered = filtered.filter(p => p.category === catFilter);
    if (saleFilter) filtered = filtered.filter(p => p.isOnSale);
    if (organic) filtered = filtered.filter(p => p.isOrganic);
    filtered = filtered.filter(p => p.price <= maxPrice);

    const grid = document.getElementById('product-grid');
    const count = document.getElementById('product-count');
    
    if (count) count.textContent = `${filtered.length} results`;
    if (grid) {
        if (filtered.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500">No products found matching your criteria.</div>`;
        } else {
            grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
        }
    }
}

function renderProductCard(p) {
    return `
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all group relative">
        ${p.isOnSale ? '<span class="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">SALE</span>' : ''}
        <a href="product.html?id=${p.id}" class="block mb-4 overflow-hidden rounded-xl">
            <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
        </a>
        <div>
            <div class="text-xs text-emerald-600 font-bold uppercase mb-1">${p.category}</div>
            <a href="product.html?id=${p.id}" class="block font-bold text-gray-900 mb-2 hover:text-emerald-600">${p.name}</a>
            <div class="flex justify-between items-center">
                <div>
                    <span class="text-lg font-bold text-gray-900">Rs. ${p.price}</span>
                    <span class="text-xs text-gray-500">/${p.unit}</span>
                </div>
                <button onclick="addToCart('${p.id}')" class="bg-emerald-50 text-emerald-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    </div>`;
}

// 3. PRODUCT DETAIL
function initProduct() {
    const id = new URLSearchParams(window.location.search).get('id');
    const product = products.find(p => p.id === id);
    
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    document.getElementById('p-image').src = product.image;
    document.getElementById('p-cat').textContent = product.category;
    document.getElementById('p-name').textContent = product.name;
    document.getElementById('p-desc').textContent = product.description;
    document.getElementById('p-price').textContent = `Rs. ${product.price}`;
    document.getElementById('p-unit').textContent = `/${product.unit}`;
    
    const stockEl = document.getElementById('p-stock');
    if (product.stock > 0) {
        stockEl.textContent = 'In Stock';
        stockEl.className = 'px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium';
    } else {
        stockEl.textContent = 'Out of Stock';
        stockEl.className = 'px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium';
        document.getElementById('btn-add').disabled = true;
        document.getElementById('btn-add').textContent = 'Unavailable';
        document.getElementById('btn-add').classList.add('opacity-50', 'cursor-not-allowed');
    }

    document.getElementById('btn-add').onclick = () => {
        const qty = parseInt(document.getElementById('p-qty').innerText);
        const existing = cart.find(i => i.id === product.id);
        if (existing) existing.qty += qty;
        else cart.push({ ...product, qty });
        saveCart();
        toggleCart();
    };
}

let detailQty = 1;
function increaseQty() { detailQty++; document.getElementById('p-qty').innerText = detailQty; }
function decreaseQty() { if (detailQty > 1) { detailQty--; document.getElementById('p-qty').innerText = detailQty; } }


// 4. CHECKOUT
function initCheckout() {
    const summary = document.getElementById('order-summary');
    if (cart.length === 0) {
        window.location.href = 'shop.html';
        return;
    }

    let subtotal = 0;
    summary.innerHTML = cart.map(item => {
        subtotal += item.price * item.qty;
        return `
        <div class="flex justify-between items-center text-sm">
            <div class="flex items-center gap-3">
                <span class="font-bold text-gray-500">${item.qty}x</span>
                <span class="text-gray-800">${item.name}</span>
            </div>
            <span class="font-medium">Rs. ${item.price * item.qty}</span>
        </div>`;
    }).join('');

    const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    document.getElementById('chk-subtotal').textContent = `Rs. ${subtotal}`;
    document.getElementById('chk-shipping').textContent = shipping === 0 ? 'Free' : `Rs. ${shipping}`;
    document.getElementById('chk-total').textContent = `Rs. ${subtotal + shipping}`;

    document.getElementById('checkout-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('chk-btn');
        btn.textContent = 'Processing...';
        btn.disabled = true;

        const formData = new FormData(e.target);
        const order = {
            id: 'ord-' + Date.now(),
            date: new Date().toISOString(),
            customer: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                address: formData.get('address'),
                city: formData.get('city'),
                zip: formData.get('zip'),
            },
            items: cart,
            total: subtotal + shipping,
            status: 'Pending',
            paymentMethod: formData.get('paymentMethod')
        };

        // Save order to server
        orders.push(order);
        const success = await syncData('orders', orders);
        
        if (success) {
            window.location.href = 'success.html';
        } else {
            btn.textContent = 'Place Order';
            btn.disabled = false;
        }
    });
}

// 5. ADMIN
function initAdmin() {
    // Auth Check
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const pass = document.getElementById('password').value;
            if (email === 'ssm@gmail.com' && pass === 'awaisali') {
                sessionStorage.setItem('adminAuth', 'true');
                window.location.href = 'admin.html';
            } else {
                alert('Invalid Credentials');
            }
        });
        return;
    }

    if (!isAdmin) {
        window.location.href = 'login.html';
        return;
    }

    const main = document.querySelector('main');
    main.innerHTML = `
    <div class="flex flex-col md:flex-row gap-8">
        <aside class="w-full md:w-64 bg-white rounded-xl shadow-sm p-6 h-fit">
            <h2 class="font-bold text-xl mb-6 text-gray-800">Admin Panel</h2>
            <nav class="space-y-2">
                <button onclick="renderAdminSection('orders')" id="nav-orders" class="w-full text-left px-4 py-2 rounded-lg text-emerald-600 bg-emerald-50 font-medium">Orders</button>
                <button onclick="renderAdminSection('products')" id="nav-products" class="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Products</button>
                <button onclick="renderAdminSection('categories')" id="nav-categories" class="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Categories</button>
                <button onclick="adminLogout()" class="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 mt-8">Logout</button>
            </nav>
        </aside>
        <div id="admin-content" class="flex-1 bg-white rounded-xl shadow-sm p-6 min-h-[500px]">
            <!-- Dynamic Content -->
        </div>
    </div>`;
    
    renderAdminSection('orders');
}

function renderAdminSection(section) {
    // Reset nav styles
    document.querySelectorAll('aside nav button').forEach(b => {
        if(!b.id.includes('logout')) b.className = 'w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50';
    });
    document.getElementById(`nav-${section}`).className = 'w-full text-left px-4 py-2 rounded-lg text-emerald-600 bg-emerald-50 font-medium';

    const content = document.getElementById('admin-content');
    
    if (section === 'orders') {
        content.innerHTML = `
            <h3 class="text-2xl font-bold mb-6">Orders</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-gray-100 text-sm text-gray-500">
                            <th class="py-3">Order ID</th>
                            <th class="py-3">Customer</th>
                            <th class="py-3">Total</th>
                            <th class="py-3">Payment</th>
                            <th class="py-3">Status</th>
                            <th class="py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        ${orders.length ? orders.map(o => `
                            <tr class="border-b border-gray-50 hover:bg-gray-50">
                                <td class="py-3 font-medium">#${o.id.slice(-6)}</td>
                                <td class="py-3">${o.customer.firstName} ${o.customer.lastName}</td>
                                <td class="py-3">Rs. ${o.total}</td>
                                <td class="py-3"><span class="px-2 py-1 rounded bg-gray-100 text-xs">${o.paymentMethod}</span></td>
                                <td class="py-3"><span class="px-2 py-1 rounded ${o.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} text-xs font-bold">${o.status}</span></td>
                                <td class="py-3 text-gray-500">${new Date(o.date).toLocaleDateString()}</td>
                            </tr>
                        `).join('') : '<tr><td colspan="6" class="py-8 text-center text-gray-400">No orders yet</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    } else if (section === 'products') {
        content.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">Products</h3>
                <button onclick="showProductForm()" class="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700">Add Product</button>
            </div>
            <div class="grid gap-4">
                ${products.map(p => `
                    <div class="flex items-center gap-4 border border-gray-100 p-4 rounded-lg">
                        <img src="${p.image}" class="w-12 h-12 rounded object-cover bg-gray-100">
                        <div class="flex-1">
                            <h4 class="font-bold text-gray-800">${p.name}</h4>
                            <p class="text-sm text-gray-500">${p.category} • Rs. ${p.price}</p>
                        </div>
                        <button onclick="deleteProduct('${p.id}')" class="text-red-500 hover:text-red-700 p-2"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (section === 'categories') {
        content.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">Categories</h3>
                <div class="flex gap-2">
                    <input id="new-cat-input" placeholder="New Category Name" class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <button onclick="addCategory()" class="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700">Add</button>
                </div>
            </div>
            <ul class="space-y-2">
                ${categories.map(c => `
                    <li class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <span>${c}</span>
                        <button onclick="deleteCategory('${c}')" class="text-red-500 hover:text-red-700 text-sm font-bold">Delete</button>
                    </li>
                `).join('')}
            </ul>
        `;
    }
}

// ADMIN ACTIONS
let uploadedImageBase64 = '';

function showProductForm() {
    uploadedImageBase64 = ''; // Reset
    const content = document.getElementById('admin-content');
    content.innerHTML = `
        <h3 class="text-xl font-bold mb-6">Add New Product</h3>
        <form id="add-product-form" class="space-y-4 max-w-lg">
            <input required id="ap-name" placeholder="Product Name" class="w-full border p-2 rounded">
            <textarea required id="ap-desc" placeholder="Description" class="w-full border p-2 rounded"></textarea>
            <div class="grid grid-cols-2 gap-4">
                <select id="ap-cat" class="border p-2 rounded">
                    ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <input required id="ap-price" type="number" placeholder="Price (Rs)" class="border p-2 rounded">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <input required id="ap-unit" placeholder="Unit (e.g. 1kg, 1 Dozen)" class="border p-2 rounded">
                <input required id="ap-stock" type="number" placeholder="Stock Qty" class="border p-2 rounded">
            </div>
            
            <div class="border p-4 rounded-lg bg-gray-50 text-center">
                <label class="cursor-pointer block">
                    <span class="text-emerald-600 font-bold block mb-1">Upload Image</span>
                    <span class="text-xs text-gray-500 block mb-2">Max 800px width. Auto-compressed.</span>
                    <input type="file" id="ap-image-input" accept="image/*" class="hidden" onchange="handleImagePreview(this)">
                </label>
                <img id="ap-preview" class="mx-auto mt-2 h-32 object-contain hidden">
            </div>

            <div class="flex gap-4">
                <button type="button" onclick="renderAdminSection('products')" class="flex-1 bg-gray-200 py-2 rounded font-bold">Cancel</button>
                <button type="submit" id="btn-save-prod" class="flex-1 bg-emerald-600 text-white py-2 rounded font-bold">Save Product</button>
            </div>
        </form>
    `;

    document.getElementById('add-product-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-save-prod');
        
        // Validation
        if (!uploadedImageBase64) {
            alert('Please upload an image');
            return;
        }

        // Loading State
        btn.textContent = 'Saving...';
        btn.disabled = true;
        btn.classList.add('opacity-75', 'cursor-wait');

        const newProd = {
            id: 'prod-' + Date.now(),
            name: document.getElementById('ap-name').value,
            description: document.getElementById('ap-desc').value,
            category: document.getElementById('ap-cat').value,
            price: Number(document.getElementById('ap-price').value),
            unit: document.getElementById('ap-unit').value,
            stock: Number(document.getElementById('ap-stock').value),
            image: uploadedImageBase64,
            isOnSale: false,
            isOrganic: false
        };

        products.push(newProd);
        const success = await syncData('products', products);

        if (success) {
            alert('Product Saved Successfully!');
            renderAdminSection('products');
        } else {
            btn.textContent = 'Save Product';
            btn.disabled = false;
            btn.classList.remove('opacity-75', 'cursor-wait');
        }
    });
}

async function handleImagePreview(input) {
    if (input.files && input.files[0]) {
        try {
            // Compress Image
            uploadedImageBase64 = await compressImage(input.files[0]);
            
            // Show Preview
            const preview = document.getElementById('ap-preview');
            preview.src = uploadedImageBase64;
            preview.classList.remove('hidden');
        } catch (e) {
            console.error(e);
            alert('Error processing image. Try another one.');
        }
    }
}

async function deleteProduct(id) {
    if(confirm('Delete this product?')) {
        products = products.filter(p => p.id !== id);
        await syncData('products', products);
        renderAdminSection('products');
    }
}

async function addCategory() {
    const input = document.getElementById('new-cat-input');
    const val = input.value.trim();
    if(val && !categories.includes(val)) {
        // Optimistic UI update could go here, but simplest is wait for server
        categories.push(val);
        const success = await syncData('categories', categories);
        if(success) {
            renderAdminSection('categories');
        }
    }
}

async function deleteCategory(cat) {
    if(confirm(`Delete category "${cat}"? Products in this category might be affected.`)) {
        categories = categories.filter(c => c !== cat);
        await syncData('categories', categories);
        renderAdminSection('categories');
    }
}

function adminLogout() {
    sessionStorage.removeItem('adminAuth');
    window.location.href = 'index.html';
}
