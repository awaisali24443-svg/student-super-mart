

// --- DATA & CONSTANTS ---
const TAX_RATE = 0.00;
const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 200;

// Data containers (Will be loaded from Server)
let products = [];
let categories = [];
let orders = [];

// Local containers (Per device/user)
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let user = JSON.parse(localStorage.getItem('user')) || null;

// --- API FUNCTIONS ---
async function fetchData() {
    try {
        const res = await fetch('/api/data');
        const data = await res.json();
        products = data.products || [];
        categories = data.categories || [];
        orders = data.orders || [];
        
        // Ensure default categories if empty
        if (categories.length === 0) {
            categories = ['Produce', 'Dairy & Eggs', 'Bakery', 'Pantry', 'Beverages', 'Snacks', 'Local Specialties'];
        }
        console.log('Data loaded from server');
    } catch (err) {
        console.error('Failed to load data:', err);
        alert('Error loading store data. Please refresh.');
    }
}

async function syncData(type, data) {
    try {
        await fetch('/api/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, data })
        });
    } catch (err) {
        console.error(`Failed to sync ${type}:`, err);
        alert(`Error saving ${type}. Please try again.`);
    }
}

// --- UTILS ---
const formatPrice = (p) => `Rs. ${p.toFixed(0)}`;

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
};
const saveUser = () => localStorage.setItem('user', JSON.stringify(user));

// Server-side saves
const saveOrders = () => syncData('orders', orders);
const saveProducts = () => syncData('products', products);
const saveCategories = () => syncData('categories', categories);

function getCategoryIcon(cat) {
  const map = {
    'Produce': 'fa-carrot',
    'Dairy & Eggs': 'fa-cow',
    'Bakery': 'fa-bread-slice',
    'Pantry': 'fa-jar',
    'Beverages': 'fa-bottle-water',
    'Snacks': 'fa-cookie-bite',
    'Local Specialties': 'fa-star'
  };
  return map[cat] || 'fa-basket-shopping';
}

// --- CART FUNCTIONS ---
function addToCart(product, quantity = 1) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function updateCartQuantity(id, quantity) {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  const item = cart.find(i => i.id === id);
  if (item) item.quantity = quantity;
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

function getCartTotals() {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : (subtotal === 0 ? 0 : SHIPPING_COST);
  const total = subtotal + tax + shipping;
  return { subtotal, tax, shipping, total, itemCount: cart.reduce((acc, item) => acc + item.quantity, 0) };
}

// --- UI RENDERING ---
function openCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const backdrop = document.getElementById('cart-backdrop');
  if (sidebar && backdrop) {
    sidebar.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
  }
}

function closeCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const backdrop = document.getElementById('cart-backdrop');
  if (sidebar && backdrop) {
    sidebar.classList.add('translate-x-full');
    backdrop.classList.add('hidden');
  }
}

function updateCartUI() {
  const { itemCount, subtotal, shipping, total } = getCartTotals();
  
  // Update badge
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.innerText = itemCount;
    badge.style.display = itemCount > 0 ? 'flex' : 'none';
  }

  // Render items
  const container = document.getElementById('cart-items');
  if (container) {
    if (cart.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-gray-500">
          <i class="fa-solid fa-basket-shopping text-4xl mb-4 text-gray-300"></i>
          <p>Your basket is empty.</p>
        </div>
      `;
      const footer = document.getElementById('cart-footer');
      if (footer) footer.style.display = 'none';
    } else {
      const footer = document.getElementById('cart-footer');
      if (footer) footer.style.display = 'block';
      container.innerHTML = cart.map(item => `
        <div class="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
          <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg bg-gray-50">
          <div class="flex-1">
            <div class="flex justify-between items-start">
              <h3 class="font-medium text-gray-900 line-clamp-2 text-sm">${item.name}</h3>
              <button onclick="removeFromCart('${item.id}')" class="text-gray-400 hover:text-red-500"><i class="fa-solid fa-trash-can text-sm"></i></button>
            </div>
            <p class="text-sm text-gray-500">${item.unit}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="font-bold text-gray-900">${formatPrice(item.price)}</span>
              <div class="flex items-center gap-2 border rounded-md px-2 py-1">
                <button onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})" class="text-gray-500 hover:text-emerald-600 w-6">-</button>
                <span class="text-sm font-medium w-4 text-center">${item.quantity}</span>
                <button onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})" class="text-gray-500 hover:text-emerald-600 w-6">+</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
      
      // Update footer totals
      const subEl = document.getElementById('cart-subtotal');
      const shipEl = document.getElementById('cart-shipping');
      const totEl = document.getElementById('cart-total');
      if (subEl) subEl.innerText = formatPrice(subtotal);
      if (shipEl) shipEl.innerText = shipping === 0 ? 'Free' : formatPrice(shipping);
      if (totEl) totEl.innerText = formatPrice(total);
    }
  }
}

function renderHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  // Only show Admin Dashboard link if user is logged in (admin)
  const adminLink = user && user.role === 'admin' 
    ? `<a href="admin.html" class="text-sm font-medium text-white bg-emerald-700 px-4 py-2 rounded hover:bg-emerald-800">Admin Dashboard</a>` 
    : '';
  
  const logoutBtn = user 
    ? `<button onclick="logout()" class="text-sm font-medium text-gray-500 hover:text-red-500">Logout</button>`
    : '';

  container.innerHTML = `
    <header class="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <a href="index.html" class="flex items-center gap-2 text-2xl font-bold text-emerald-600">
            <i class="fa-solid fa-leaf"></i>
            <span>FreshMarket</span>
          </a>
          <nav class="hidden md:flex items-center space-x-8">
            <a href="shop.html" class="text-sm font-medium text-gray-600 hover:text-emerald-600">Shop</a>
            ${adminLink}
          </nav>
          <div class="flex items-center space-x-4">
            ${logoutBtn}
            <button onclick="openCart()" class="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <i class="fa-solid fa-cart-shopping text-xl"></i>
              <span id="cart-count" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce" style="display:none">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Cart Sidebar Injection -->
    <div id="cart-backdrop" onclick="closeCart()" class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm hidden transition-opacity"></div>
    <div id="cart-sidebar" class="fixed inset-y-0 right-0 z-[70] bg-white w-full max-w-md shadow-xl flex flex-col transform translate-x-full transition-transform duration-300 ease-in-out">
        <div class="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900">Your Cart</h2>
          <button onclick="closeCart()" class="text-gray-400 hover:text-gray-600 p-2"><i class="fa-solid fa-xmark text-xl"></i></button>
        </div>
        <div id="cart-items" class="flex-1 overflow-y-auto p-4 space-y-4"></div>
        <div id="cart-footer" class="border-t border-gray-100 p-4 space-y-4 bg-gray-50">
           <div class="space-y-2 text-sm text-gray-600">
              <div class="flex justify-between"><span>Subtotal</span><span id="cart-subtotal">Rs. 0</span></div>
              <div class="flex justify-between"><span>Shipping</span><span id="cart-shipping">Rs. 0</span></div>
              <div class="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200"><span>Total</span><span id="cart-total">Rs. 0</span></div>
           </div>
           <a href="checkout.html" class="block w-full text-center bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200">Checkout Now</a>
        </div>
    </div>
  `;
  updateCartUI();
}

function renderFooter() {
  const container = document.getElementById('footer-container');
  if(container) {
    container.innerHTML = `
      <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <i class="fa-solid fa-leaf text-emerald-500"></i>
              <span>FreshMarket</span>
            </div>
            <p class="text-sm text-gray-400">Fresh groceries delivered to your doorstep in Shabqadar, Charsadda & Peshawar.</p>
          </div>
          <div>
            <h3 class="text-white font-bold mb-4">Shop</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="shop.html" class="hover:text-emerald-500">All Products</a></li>
              ${categories.slice(0, 3).map(c => `<li><a href="shop.html?category=${encodeURIComponent(c)}" class="hover:text-emerald-500">${c}</a></li>`).join('')}
            </ul>
          </div>
          <div>
            <h3 class="text-white font-bold mb-4">Company</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-emerald-500">About Us</a></li>
              <li><a href="login.html" class="hover:text-emerald-500">Admin Login</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-bold mb-4">Newsletter</h3>
            <div class="flex">
              <input type="email" placeholder="Email address" class="bg-gray-800 text-white px-3 py-2 rounded-l w-full outline-none">
              <button class="bg-emerald-600 text-white px-4 py-2 rounded-r hover:bg-emerald-700">Join</button>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

// --- AUTH FUNCTIONS ---
function login(email) {
  // Only Admin Login allowed
  user = {
    id: 'admin-001',
    name: 'Administrator',
    email: email,
    role: 'admin'
  };
  saveUser();
  window.location.href = 'admin.html';
}

function logout() {
  user = null;
  saveUser();
  window.location.href = 'index.html';
}

// --- PAGE SPECIFIC LOGIC ---

function initHome() {
  const featuredContainer = document.getElementById('featured-products');
  if (featuredContainer) {
    const featured = products.filter(p => p.isOnSale).slice(0, 4);
    featuredContainer.innerHTML = featured.map(p => createProductCard(p)).join('');
  }

  const categoryContainer = document.getElementById('home-categories');
  if (categoryContainer) {
    categoryContainer.innerHTML = categories.map(cat => `
        <a href="shop.html?category=${encodeURIComponent(cat)}" class="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center hover:shadow-md transition-shadow hover:border-emerald-200">
            <div class="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                <i class="fa-solid ${getCategoryIcon(cat)}"></i>
            </div>
            <span class="font-medium text-gray-700 text-center text-sm">${cat}</span>
        </a>
    `).join('');
  }
}

function initShop() {
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('category');
  const searchParam = params.get('q');
  const saleParam = params.get('sale');

  // Sidebar Inputs
  const organicInput = document.getElementById('filter-organic');
  const priceInput = document.getElementById('filter-price');
  const priceDisplay = document.getElementById('price-display');

  // Render Sidebar Categories
  const catList = document.getElementById('category-list');
  if(catList) {
      catList.innerHTML = `
        <li><a href="shop.html" class="block text-sm ${!catParam ? 'text-emerald-600 font-bold' : 'text-gray-600 hover:text-emerald-600'}">All Products</a></li>
        ${categories.map(c => `<li><a href="shop.html?category=${encodeURIComponent(c)}" class="block text-sm ${catParam === c ? 'text-emerald-600 font-bold' : 'text-gray-600 hover:text-emerald-600'}">${c}</a></li>`).join('')}
      `;
  }

  function renderGrid() {
      let filtered = products;

      // 1. URL Filters
      if (catParam) filtered = filtered.filter(p => p.category === catParam);
      if (searchParam) {
          const q = searchParam.toLowerCase();
          filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      if (saleParam) filtered = filtered.filter(p => p.isOnSale);

      // 2. Client Side Filters
      if (organicInput && organicInput.checked) {
          filtered = filtered.filter(p => p.isOrganic);
      }
      if (priceInput) {
          const maxPrice = Number(priceInput.value);
          filtered = filtered.filter(p => p.price <= maxPrice);
          if (priceDisplay) priceDisplay.innerText = `Rs. ${maxPrice}`;
      }

      // Update Counts & Title
      const title = document.getElementById('page-title');
      const count = document.getElementById('product-count');
      if (title) title.innerText = catParam || (saleParam ? 'Current Deals' : 'All Products');
      if (count) count.innerText = `${filtered.length} items found`;

      // Render
      const grid = document.getElementById('product-grid');
      if(grid) {
          grid.innerHTML = filtered.length ? filtered.map(p => createProductCard(p)).join('') : '<div class="col-span-full text-center text-gray-500 py-8">No products found matching your criteria.</div>';
      }
  }

  // Event Listeners for Filters
  if (organicInput) organicInput.addEventListener('change', renderGrid);
  if (priceInput) priceInput.addEventListener('input', renderGrid);

  // Initial Render
  renderGrid();
}

function createProductCard(product) {
    return `
    <a href="product.html?slug=${product.slug}" class="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden block">
      <div class="relative h-48 bg-gray-50 overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        ${product.isOrganic ? '<span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">Organic</span>' : ''}
        ${product.isOnSale ? '<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">On Sale</span>' : ''}
      </div>
      <div class="p-4 flex flex-col flex-1">
        <div class="flex-1">
          <h3 class="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">${product.name}</h3>
          <div class="flex items-center gap-1 my-1">
            <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
            <span class="text-xs text-gray-500">${product.rating || '4.5'}</span>
          </div>
          <p class="text-sm text-gray-500 line-clamp-2 mt-2">${product.description}</p>
        </div>
        <div class="mt-4 flex items-center justify-between">
            <div>
                <div class="flex flex-col">
                     <span class="text-lg font-bold text-emerald-700">${formatPrice(product.price)}</span>
                     ${product.isOnSale ? `<span class="text-xs text-gray-400 line-through">${formatPrice(product.price * 1.2)}</span>` : ''}
                </div>
                <p class="text-xs text-gray-400">per ${product.unit}</p>
            </div>
            <button onclick="event.preventDefault(); addToCart(products.find(p => p.id === '${product.id}'))" class="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-700 shadow-md">
                <i class="fa-solid fa-cart-plus"></i>
            </button>
        </div>
      </div>
    </a>
    `;
}

function initProduct() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const product = products.find(p => p.slug === slug);
    
    if(!product) {
        document.body.innerHTML = '<div class="p-10 text-center"><h1 class="text-xl">Product not found</h1><a href="shop.html" class="text-emerald-600 underline">Back to Shop</a></div>';
        return;
    }

    document.getElementById('p-image').src = product.image;
    document.getElementById('p-cat').innerText = product.category;
    document.getElementById('p-name').innerText = product.name;
    document.getElementById('p-desc').innerText = product.description;
    document.getElementById('p-price').innerText = formatPrice(product.price);
    document.getElementById('p-unit').innerText = '/ ' + product.unit;
    document.getElementById('p-stock').innerText = `In Stock: ${product.stock}`;
    
    // Add to cart logic with quantity
    let qty = 1;
    const qtySpan = document.getElementById('p-qty');
    const btn = document.getElementById('btn-add');
    
    window.increaseQty = () => { if(qty < product.stock) qty++; updateBtn(); };
    window.decreaseQty = () => { if(qty > 1) qty--; updateBtn(); };
    
    function updateBtn() {
        if(qtySpan) qtySpan.innerText = qty;
        if(btn) {
            btn.innerText = `Add to Cart - ${formatPrice(product.price * qty)}`;
            btn.onclick = () => addToCart(product, qty);
        }
    }
    updateBtn();
}

function initCheckout() {
    const { subtotal, tax, shipping, total } = getCartTotals();
    
    // Fill Summary
    const summary = document.getElementById('order-summary');
    if(summary) {
        if (cart.length === 0) {
             summary.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
        } else {
             summary.innerHTML = cart.map(item => `
              <div class="flex gap-4 mb-4">
                 <div class="relative">
                    <img src="${item.image}" class="w-16 h-16 rounded-lg object-cover">
                    <span class="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">${item.quantity}</span>
                 </div>
                 <div class="flex-1">
                     <h4 class="font-medium text-gray-900">${item.name}</h4>
                     <p class="text-sm text-gray-500">${formatPrice(item.price)}</p>
                 </div>
                 <span class="font-medium">${formatPrice(item.price * item.quantity)}</span>
              </div>
            `).join('');
        }
    }
    
    const els = {
        sub: document.getElementById('chk-subtotal'),
        ship: document.getElementById('chk-shipping'),
        tot: document.getElementById('chk-total'),
        btn: document.getElementById('chk-btn')
    };

    if(els.sub) els.sub.innerText = formatPrice(subtotal);
    if(els.ship) els.ship.innerText = shipping === 0 ? 'Free' : formatPrice(shipping);
    if(els.tot) els.tot.innerText = formatPrice(total);
    if(els.btn) els.btn.innerText = `Place Order - ${formatPrice(total)}`;

    // Handle Form
    const form = document.getElementById('checkout-form');
    if(form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            
            els.btn.innerText = "Processing...";
            els.btn.disabled = true;

            const formData = new FormData(form);
            const paymentMethod = formData.get('paymentMethod');
            const newOrder = {
                id: 'ord-' + Math.floor(Math.random() * 10000),
                customerName: formData.get('firstName') + ' ' + formData.get('lastName'),
                email: formData.get('email'),
                items: [...cart],
                total: total,
                status: 'pending',
                paymentMethod: paymentMethod,
                date: new Date().toISOString()
            };
            
            orders.unshift(newOrder);
            await saveOrders();
            clearCart();
            window.location.href = 'success.html';
        };
    }
}

// --- ADMIN FUNCTIONS ---

function initAdmin() {
    if(!user || user.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    const container = document.querySelector('main.container');
    if(container) {
      container.innerHTML = `
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div class="flex items-center gap-4">
                 <span class="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">Logged in as Admin</span>
                 <button onclick="logout()" class="text-red-600 hover:text-red-800">Logout</button>
            </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-4 mb-8 border-b border-gray-200">
            <button onclick="switchAdminTab('orders')" id="tab-orders" class="pb-4 px-4 font-medium border-b-2 border-emerald-600 text-emerald-600">Orders</button>
            <button onclick="switchAdminTab('products')" id="tab-products" class="pb-4 px-4 font-medium text-gray-500 hover:text-gray-800">Inventory</button>
            <button onclick="switchAdminTab('categories')" id="tab-categories" class="pb-4 px-4 font-medium text-gray-500 hover:text-gray-800">Categories</button>
        </div>

        <!-- Content Area -->
        <div id="admin-content"></div>

        <!-- Modal Container -->
        <div id="modal-container"></div>
      `;
    }
    
    // Default Tab
    switchAdminTab('orders');
}

window.switchAdminTab = (tab) => {
    // Update Tab UI
    ['orders', 'products', 'categories'].forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if(t === tab) el.className = 'pb-4 px-4 font-medium border-b-2 border-emerald-600 text-emerald-600';
        else el.className = 'pb-4 px-4 font-medium text-gray-500 hover:text-gray-800';
    });

    if(tab === 'orders') renderAdminOrders();
    if(tab === 'products') renderAdminProducts();
    if(tab === 'categories') renderAdminCategories();
}

function renderAdminOrders() {
    const content = document.getElementById('admin-content');
    content.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-gray-50 text-gray-500 text-sm uppercase">
                    <tr>
                        <th class="p-4">Order ID</th>
                        <th class="p-4">Customer</th>
                        <th class="p-4">Total</th>
                        <th class="p-4">Payment</th>
                        <th class="p-4">Date</th>
                        <th class="p-4">Status</th>
                        <th class="p-4">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    ${orders.map(order => `
                        <tr class="hover:bg-gray-50">
                            <td class="p-4 font-mono text-sm text-gray-600">${order.id}</td>
                            <td class="p-4">
                                <div class="font-medium text-gray-900">${order.customerName}</div>
                                <div class="text-xs text-gray-500">${order.email}</div>
                            </td>
                            <td class="p-4 font-bold text-gray-900">${formatPrice(order.total)}</td>
                            <td class="p-4 text-sm text-gray-600">${order.paymentMethod || 'COD'}</td>
                            <td class="p-4 text-sm text-gray-600">${new Date(order.date).toLocaleDateString()}</td>
                            <td class="p-4">
                                <span class="px-2 py-1 rounded-full text-xs font-bold uppercase
                                ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-blue-100 text-blue-800'}">
                                ${order.status.replace('_', ' ')}
                                </span>
                            </td>
                            <td class="p-4">
                                <select 
                                onchange="updateOrderStatus('${order.id}', this.value)"
                                class="border border-gray-300 rounded px-2 py-1 text-sm bg-white outline-none focus:border-emerald-500">
                                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                                    <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
                                    <option value="out_for_delivery" ${order.status === 'out_for_delivery' ? 'selected' : ''}>Out for Delivery</option>
                                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                                </select>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

window.updateOrderStatus = async (id, status) => {
    const order = orders.find(o => o.id === id);
    if(order) {
        order.status = status;
        await saveOrders();
        renderAdminOrders();
    }
}

// --- ADMIN CATEGORIES ---
function renderAdminCategories() {
    const content = document.getElementById('admin-content');
    content.innerHTML = `
        <div class="flex justify-end mb-4">
            <button onclick="addCategory()" class="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700">
                <i class="fa-solid fa-plus mr-2"></i> Add Category
            </button>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-2xl mx-auto">
             <table class="w-full text-left">
                <thead class="bg-gray-50 text-gray-500 text-sm uppercase">
                    <tr>
                        <th class="p-4">Category Name</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    ${categories.map(c => `
                        <tr class="hover:bg-gray-50">
                            <td class="p-4 font-medium text-gray-900">${c}</td>
                            <td class="p-4 text-right">
                                <button onclick="deleteCategory('${c}')" class="text-red-600 hover:text-red-800 bg-red-50 p-2 rounded-lg"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

window.addCategory = async () => {
    const name = prompt("Enter new category name:");
    if(name && !categories.includes(name)) {
        categories.push(name);
        await saveCategories();
        renderAdminCategories();
    } else if (categories.includes(name)) {
        alert("Category already exists!");
    }
}

window.deleteCategory = async (name) => {
    if(confirm(`Delete category "${name}"? Products in this category will need updating.`)) {
        categories = categories.filter(c => c !== name);
        await saveCategories();
        renderAdminCategories();
    }
}

// --- ADMIN PRODUCTS ---
function renderAdminProducts() {
    const content = document.getElementById('admin-content');
    content.innerHTML = `
        <div class="flex justify-end mb-4">
            <button onclick="openProductModal()" class="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700">
                <i class="fa-solid fa-plus mr-2"></i> Add Product
            </button>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-gray-50 text-gray-500 text-sm uppercase">
                    <tr>
                        <th class="p-4">Product</th>
                        <th class="p-4">Price</th>
                        <th class="p-4 text-center">Stock</th>
                        <th class="p-4">Category</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    ${products.map(p => `
                        <tr class="hover:bg-gray-50">
                            <td class="p-4 flex items-center gap-3">
                                <img src="${p.image}" class="w-10 h-10 rounded object-cover bg-gray-100">
                                <span class="font-medium text-gray-900">${p.name}</span>
                            </td>
                            <td class="p-4">Rs. ${p.price}</td>
                            <td class="p-4 text-center">
                                <div class="flex items-center justify-center gap-2">
                                    <span class="font-bold ${p.stock < 10 ? 'text-red-600' : 'text-gray-900'}">${p.stock}</span>
                                </div>
                            </td>
                            <td class="p-4"><span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">${p.category}</span></td>
                            <td class="p-4 text-right space-x-2">
                                <button onclick="openProductModal('${p.id}')" class="text-blue-600 hover:text-blue-800"><i class="fa-solid fa-pen"></i></button>
                                <button onclick="deleteProduct('${p.id}')" class="text-red-600 hover:text-red-800"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

window.deleteProduct = async (id) => {
    if(confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        await saveProducts();
        renderAdminProducts();
    }
}

// Global variable to hold image data during modal editing
let currentImageBase64 = '';

window.openProductModal = (id = null) => {
    const product = id ? products.find(p => p.id === id) : null;
    const isEdit = !!product;
    currentImageBase64 = product ? product.image : '';

    const modal = document.getElementById('modal-container');
    modal.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 class="text-xl font-bold">${isEdit ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onclick="document.getElementById('modal-container').innerHTML = ''" class="text-gray-400 hover:text-gray-600">
                        <i class="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>
                <form onsubmit="handleProductSubmit(event, '${id || ''}')" class="p-6 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input name="name" required value="${product ? product.name : ''}" class="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                        </div>
                         <div class="col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                            <div class="flex items-center gap-4">
                                <div id="preview-container" class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                    ${product ? `<img src="${product.image}" class="w-full h-full object-cover">` : '<div class="w-full h-full flex items-center justify-center text-gray-400"><i class="fa-solid fa-image"></i></div>'}
                                </div>
                                <div class="flex-1">
                                    <input type="file" id="image-upload" accept="image/*" class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer">
                                    <p class="text-xs text-gray-400 mt-1">Upload your own image (Max 1MB recommended)</p>
                                    <div class="relative flex items-center py-2">
                                        <div class="flex-grow border-t border-gray-200"></div>
                                        <span class="flex-shrink-0 mx-4 text-gray-400 text-xs">OR USE URL</span>
                                        <div class="flex-grow border-t border-gray-200"></div>
                                    </div>
                                    <input name="imageUrl" placeholder="Paste Image URL" value="${product && product.image.startsWith('http') ? product.image : ''}" class="w-full border rounded-lg px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-emerald-500">
                                </div>
                            </div>
                        </div>
                         <div class="col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" required class="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">${product ? product.description : ''}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select name="category" class="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                                ${categories.map(c => `<option value="${c}" ${product && product.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Price (Rs.)</label>
                            <input name="price" type="number" required value="${product ? product.price : ''}" class="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input name="stock" type="number" required value="${product ? product.stock : ''}" class="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                        </div>
                         <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Unit (e.g. 1kg, 500g)</label>
                            <input name="unit" required value="${product ? product.unit : '1kg'}" class="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                        </div>
                    </div>
                     <div class="flex gap-6 mt-4">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="isOrganic" ${product && product.isOrganic ? 'checked' : ''}>
                            <span class="text-sm font-medium">Organic</span>
                        </label>
                         <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="isOnSale" ${product && product.isOnSale ? 'checked' : ''}>
                            <span class="text-sm font-medium">On Sale</span>
                        </label>
                     </div>
                    <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
                        <button type="button" onclick="document.getElementById('modal-container').innerHTML = ''" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Handle Image Upload
    document.getElementById('image-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                currentImageBase64 = evt.target.result;
                document.getElementById('preview-container').innerHTML = `<img src="${currentImageBase64}" class="w-full h-full object-cover">`;
                // Clear URL input to avoid confusion
                document.querySelector('input[name="imageUrl"]').value = ''; 
            };
            reader.readAsDataURL(file);
        }
    });
}

window.handleProductSubmit = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Determine Image Source (Upload vs URL)
    let finalImage = currentImageBase64;
    const urlInput = formData.get('imageUrl');
    if (urlInput && urlInput.trim() !== '') {
        finalImage = urlInput;
    }
    // Fallback if nothing
    if (!finalImage) finalImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400';

    const newProduct = {
        id: id || 'prod-' + Date.now(),
        name: formData.get('name'),
        slug: formData.get('name').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        image: finalImage,
        description: formData.get('description'),
        category: formData.get('category'),
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        unit: formData.get('unit'),
        isOrganic: formData.get('isOrganic') === 'on',
        isOnSale: formData.get('isOnSale') === 'on',
        rating: id ? (products.find(p => p.id === id)?.rating || 0) : 0
    };

    if(id) {
        // Edit
        const idx = products.findIndex(p => p.id === id);
        if(idx !== -1) {
            products[idx] = { ...products[idx], ...newProduct };
        }
    } else {
        // Create
        products.push(newProduct);
    }
    
    await saveProducts();
    document.getElementById('modal-container').innerHTML = '';
    renderAdminProducts();
}


// --- MAIN ENTRY ---
document.addEventListener('DOMContentLoaded', async () => {
    renderHeader();
    renderFooter();
    
    // IMPORTANT: Wait for data to load before checking routes
    await fetchData();

    const path = window.location.pathname;
    // Simple routing check based on filename
    if (path.includes('shop.html')) initShop();
    else if (path.includes('product.html')) initProduct();
    else if (path.includes('checkout.html')) initCheckout();
    else if (path.includes('admin.html')) initAdmin();
    else if (path.includes('login.html')) {
        // Login Logic
        const loginForm = document.getElementById('login-form');
        if(loginForm) {
            loginForm.onsubmit = (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                if (email === 'ssm@gmail.com' && password === 'awaisali') {
                    login(email);
                } else {
                    alert('Invalid Admin Credentials!');
                }
            };
        }
    } else {
        initHome(); // Default to home logic
    }
});

// --- SERVICE WORKER REGISTRATION ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}