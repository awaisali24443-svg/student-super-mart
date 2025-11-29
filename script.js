
// --- DATA & CONSTANTS ---
const CATEGORIES = ['Produce', 'Dairy & Eggs', 'Bakery', 'Pantry', 'Beverages', 'Snacks', 'Local Specialties'];
const TAX_RATE = 0.00;
const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 200;

// Preserved Real Data (Backup if localStorage is empty)
const INITIAL_PRODUCTS = [
  // --- LOCAL SPECIALTIES ---
  {
    id: 'prod-local-1',
    name: 'Rajjar Mithai (Famous)',
    slug: 'rajjar-mithai',
    description: 'The authentic famous sweet of Charsadda. Made with pure ghee and jaggery. A local delight.',
    category: 'Local Specialties',
    price: 850,
    unit: '1kg Box',
    stock: 50,
    isOrganic: false,
    isOnSale: true,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1630402806961-09439601d009?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-local-2',
    name: 'Charsadda Gurr (Jaggery)',
    slug: 'charsadda-gurr',
    description: 'Pure organic Jaggery (Gurr) fresh from the sugarcane fields of Charsadda.',
    category: 'Local Specialties',
    price: 450,
    unit: '1kg',
    stock: 100,
    isOrganic: true,
    isOnSale: false,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1629185199651-7f7223687397?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-local-3',
    name: 'Peshawari Qahwa Leaves',
    slug: 'peshawari-qahwa',
    description: 'Premium green tea leaves for the traditional Peshawari Qahwa.',
    category: 'Local Specialties',
    price: 600,
    unit: '500g Pack',
    stock: 80,
    isOrganic: true,
    isOnSale: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?auto=format&fit=crop&q=80&w=400'
  },
  {
     id: 'prod-local-4',
     name: 'Chapli Kabab Masala (Special)',
     slug: 'chapli-kabab-masala',
     description: 'Authentic spice mix for making Peshawari Chapli Kabab at home.',
     category: 'Local Specialties',
     price: 150,
     unit: '100g Packet',
     stock: 200,
     isOrganic: false,
     isOnSale: false,
     rating: 4.7,
     image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400'
  },
  // --- PANTRY ---
  {
    id: 'prod-pantry-1',
    name: 'Super Basmati Rice (Kainat)',
    slug: 'basmati-rice',
    description: 'Premium long grain Basmati Rice. Perfect for Biryani and Pulao.',
    category: 'Pantry',
    price: 350,
    unit: '1kg',
    stock: 500,
    isOrganic: false,
    isOnSale: true,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-pantry-2',
    name: 'Daal Chana (Split Chickpeas)',
    slug: 'daal-chana',
    description: 'High quality Daal Chana, cleaned and polished.',
    category: 'Pantry',
    price: 400,
    unit: '1kg',
    stock: 200,
    isOrganic: false,
    isOnSale: false,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1585996684447-3843e9944df3?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-pantry-3',
    name: 'Daal Masoor (Red Lentils)',
    slug: 'daal-masoor',
    description: 'Quick cooking split red lentils.',
    category: 'Pantry',
    price: 380,
    unit: '1kg',
    stock: 150,
    isOrganic: false,
    isOnSale: false,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1610725656655-7098e1694a11?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-pantry-4',
    name: 'Daal Maash (Washed)',
    slug: 'daal-maash',
    description: 'Premium white Daal Maash, stone free.',
    category: 'Pantry',
    price: 550,
    unit: '1kg',
    stock: 100,
    isOrganic: false,
    isOnSale: false,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-pantry-5',
    name: 'Dalda Cooking Oil',
    slug: 'dalda-oil',
    description: 'Vitamin enriched cooking oil.',
    category: 'Pantry',
    price: 550,
    unit: '1 Liter',
    stock: 300,
    isOrganic: false,
    isOnSale: true,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-pantry-6',
    name: 'Whole Wheat Flour (Chakki Atta)',
    slug: 'wheat-flour',
    description: 'Freshly ground whole wheat flour.',
    category: 'Pantry',
    price: 160,
    unit: '1kg',
    stock: 300,
    isOrganic: true,
    isOnSale: false,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-pantry-7',
    name: 'White Sugar (Cheeni)',
    slug: 'sugar',
    description: 'Refined white sugar granules.',
    category: 'Pantry',
    price: 155,
    unit: '1kg',
    stock: 400,
    isOrganic: false,
    isOnSale: false,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-pantry-8',
    name: 'Shan Biryani Masala',
    slug: 'shan-biryani',
    description: 'The classic spice mix for perfect Biryani.',
    category: 'Pantry',
    price: 120,
    unit: 'Pack',
    stock: 500,
    isOrganic: false,
    isOnSale: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-pantry-9',
    name: 'National Iodized Salt',
    slug: 'national-salt',
    description: 'Refined iodized table salt.',
    category: 'Pantry',
    price: 60,
    unit: '800g Pack',
    stock: 600,
    isOrganic: false,
    isOnSale: false,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1518110925495-569698eb4621?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-pantry-10',
    name: 'Red Chili Powder',
    slug: 'red-chili',
    description: 'Extra hot ground red chili powder.',
    category: 'Pantry',
    price: 800,
    unit: '1kg',
    stock: 100,
    isOrganic: false,
    isOnSale: false,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1624806992066-5d5482354673?auto=format&fit=crop&q=80&w=400'
  },
  // --- BEVERAGES ---
  {
    id: 'prod-bev-1',
    name: 'Kenya Tea (Loose)',
    slug: 'kenya-tea',
    description: 'Strong premium Kenyan dust tea for strong color and taste.',
    category: 'Beverages',
    price: 1200,
    unit: '1kg',
    stock: 100,
    isOrganic: false,
    isOnSale: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc55449d0f1?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-bev-2',
    name: 'Ahmad Tea (London Blend)',
    slug: 'ahmad-tea',
    description: 'Aromatic and refined Ahmad Tea blend.',
    category: 'Beverages',
    price: 1400,
    unit: '1kg',
    stock: 80,
    isOrganic: false,
    isOnSale: true,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-bev-3',
    name: 'Qamar Tea',
    slug: 'qamar-tea',
    description: 'The local favorite Qamar Tea brand.',
    category: 'Beverages',
    price: 1550,
    unit: '1kg',
    stock: 60,
    isOrganic: false,
    isOnSale: false,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1564890369478-c5af469afff9?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-bev-4',
    name: 'Tapal Danedar',
    slug: 'tapal-danedar',
    description: 'Pakistan\'s favorite strong tea blend.',
    category: 'Beverages',
    price: 1300,
    unit: '950g Pack',
    stock: 150,
    isOrganic: false,
    isOnSale: false,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-bev-5',
    name: 'Rooh Afza',
    slug: 'rooh-afza',
    description: 'The summer refreshing syrup of the east.',
    category: 'Beverages',
    price: 450,
    unit: '800ml Bottle',
    stock: 120,
    isOrganic: false,
    isOnSale: false,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1546830237-77569a9b70b4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-bev-6',
    name: 'Coca Cola',
    slug: 'coca-cola',
    description: 'Chilled soft drink.',
    category: 'Beverages',
    price: 180,
    unit: '1.5 Liter',
    stock: 200,
    isOrganic: false,
    isOnSale: false,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-bev-7',
    name: 'Mineral Water (Nestle)',
    slug: 'mineral-water',
    description: 'Pure drinking water.',
    category: 'Beverages',
    price: 100,
    unit: '1.5 Liter',
    stock: 300,
    isOrganic: false,
    isOnSale: false,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=400'
  },
  // --- SNACKS ---
  {
    id: 'prod-snack-1',
    name: 'Roasted Peanuts (Mong Phali)',
    slug: 'peanuts',
    description: 'Freshly roasted peanuts with shell.',
    category: 'Snacks',
    price: 700,
    unit: '1kg',
    stock: 150,
    isOrganic: true,
    isOnSale: false,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1627038146747-9753e1a067a9?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-snack-2',
    name: 'American Almonds (Badam)',
    slug: 'almonds',
    description: 'High quality sweet American Almonds.',
    category: 'Snacks',
    price: 2200,
    unit: '1kg',
    stock: 50,
    isOrganic: true,
    isOnSale: true,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-snack-3',
    name: 'Pistachios (Pista)',
    slug: 'pista',
    description: 'Salted and roasted Pistachios (Namkeen Pista).',
    category: 'Snacks',
    price: 3500,
    unit: '1kg',
    stock: 40,
    isOrganic: true,
    isOnSale: false,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1615486511484-92e172cc416d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-snack-4',
    name: 'Walnuts (Akhrot)',
    slug: 'walnuts',
    description: 'Paper shell walnuts, easy to break.',
    category: 'Snacks',
    price: 1800,
    unit: '1kg',
    stock: 60,
    isOrganic: true,
    isOnSale: false,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1582833620286-a979c09d57a3?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-snack-5',
    name: 'Mix Nimco',
    slug: 'mix-nimco',
    description: 'Spicy and crunchy Mix Nimco.',
    category: 'Snacks',
    price: 400,
    unit: '500g',
    stock: 100,
    isOrganic: false,
    isOnSale: false,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1610452392723-da7d25e01662?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-snack-6',
    name: 'Lays Masala',
    slug: 'lays-masala',
    description: 'Spicy potato chips.',
    category: 'Snacks',
    price: 100,
    unit: 'Large Pack',
    stock: 200,
    isOrganic: false,
    isOnSale: false,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-snack-7',
    name: 'Sooper Biscuits',
    slug: 'sooper',
    description: 'Egg and Milk cookies, family pack.',
    category: 'Snacks',
    price: 120,
    unit: 'Family Pack',
    stock: 150,
    isOrganic: false,
    isOnSale: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400'
  },
  // --- PRODUCE ---
  {
    id: 'prod-veg-1',
    name: 'Red Onions',
    slug: 'onions',
    description: 'Local dry red onions.',
    category: 'Produce',
    price: 180,
    unit: '1kg',
    stock: 200,
    isOrganic: true,
    isOnSale: false,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-veg-2',
    name: 'Potatoes (Aloo)',
    slug: 'potatoes',
    description: 'Fresh seasonal potatoes.',
    category: 'Produce',
    price: 120,
    unit: '1kg',
    stock: 300,
    isOrganic: true,
    isOnSale: true,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-veg-3',
    name: 'Garlic (Lehsan)',
    slug: 'garlic',
    description: 'Desi Garlic bulbs.',
    category: 'Produce',
    price: 320,
    unit: '1kg',
    stock: 80,
    isOrganic: false,
    isOnSale: false,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1615477265893-b64831818178?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-veg-4',
    name: 'Ginger (Adrak)',
    slug: 'ginger',
    description: 'Fresh washed ginger.',
    category: 'Produce',
    price: 600,
    unit: '1kg',
    stock: 60,
    isOrganic: true,
    isOnSale: false,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1615477815344-96d5e0f7f98d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-veg-5',
    name: 'Tomatoes',
    slug: 'tomatoes',
    description: 'Red ripe tomatoes.',
    category: 'Produce',
    price: 150,
    unit: '1kg',
    stock: 150,
    isOrganic: true,
    isOnSale: false,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-veg-6',
    name: 'Green Chilies',
    slug: 'green-chilies',
    description: 'Spicy fresh green chilies.',
    category: 'Produce',
    price: 200,
    unit: '1kg',
    stock: 80,
    isOrganic: true,
    isOnSale: false,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1596700057209-66c3c72643a6?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-veg-7',
    name: 'Cucumber (Kheera)',
    slug: 'cucumber',
    description: 'Fresh salad cucumbers.',
    category: 'Produce',
    price: 80,
    unit: '1kg',
    stock: 120,
    isOrganic: true,
    isOnSale: false,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-fruit-1',
    name: 'Bananas',
    slug: 'bananas',
    description: 'Sweet yellow bananas.',
    category: 'Produce',
    price: 150,
    unit: 'Dozen',
    stock: 100,
    isOrganic: true,
    isOnSale: false,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-fruit-2',
    name: 'Chaunsa Mangoes',
    slug: 'mangoes',
    description: 'Sweet and juicy seasonal Chaunsa Mangoes.',
    category: 'Produce',
    price: 250,
    unit: '1kg',
    stock: 200,
    isOrganic: true,
    isOnSale: true,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400'
  },
  // --- DAIRY & EGGS ---
  {
    id: 'prod-dairy-1',
    name: 'Buffalo Milk',
    slug: 'buffalo-milk',
    description: 'Fresh pure buffalo milk.',
    category: 'Dairy & Eggs',
    price: 220,
    unit: '1 Liter',
    stock: 40,
    isOrganic: true,
    isOnSale: false,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-dairy-2',
    name: 'Desi Eggs',
    slug: 'desi-eggs',
    description: 'Organic free-range eggs.',
    category: 'Dairy & Eggs',
    price: 450,
    unit: 'Dozen',
    stock: 30,
    isOrganic: true,
    isOnSale: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-dairy-3',
    name: 'Desi Ghee',
    slug: 'desi-ghee',
    description: 'Pure homemade Desi Ghee.',
    category: 'Dairy & Eggs',
    price: 2500,
    unit: '1kg',
    stock: 15,
    isOrganic: true,
    isOnSale: false,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-dairy-4',
    name: 'Yogurt (Dahi)',
    slug: 'yogurt',
    description: 'Fresh thick yogurt.',
    category: 'Dairy & Eggs',
    price: 200,
    unit: '1kg',
    stock: 50,
    isOrganic: true,
    isOnSale: false,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1584278860047-22db9ff82bed?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-dairy-5',
    name: 'Butter (Blue Band)',
    slug: 'butter',
    description: 'Table margarine butter.',
    category: 'Dairy & Eggs',
    price: 400,
    unit: '200g Block',
    stock: 80,
    isOrganic: false,
    isOnSale: false,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400'
  },
  // --- BAKERY ---
  {
    id: 'prod-bakery-1',
    name: 'Fresh Tandoori Naan',
    slug: 'tandoori-naan',
    description: 'Hot and fluffy Naan from the local Tandoor.',
    category: 'Bakery',
    price: 30,
    unit: 'Piece',
    stock: 50,
    isOrganic: false,
    isOnSale: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-bakery-2',
    name: 'Bakery Rusk',
    slug: 'bakery-rusk',
    description: 'Crispy Rusk, perfect for dipping in tea.',
    category: 'Bakery',
    price: 250,
    unit: 'Pack',
    stock: 80,
    isOrganic: false,
    isOnSale: false,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-bakery-3',
    name: 'Milky Bread (Large)',
    slug: 'milky-bread',
    description: 'Soft sliced milky bread, fresh daily.',
    category: 'Bakery',
    price: 220,
    unit: 'Large Loaf',
    stock: 60,
    isOrganic: false,
    isOnSale: false,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-bakery-4',
    name: 'Cake Rusk',
    slug: 'cake-rusk',
    description: 'Premium cake rusk made with eggs.',
    category: 'Bakery',
    price: 450,
    unit: '500g Pack',
    stock: 40,
    isOrganic: false,
    isOnSale: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400'
  }
];

// --- STATE MANAGEMENT ---
// Load products from localStorage or fall back to initial list
let products = JSON.parse(localStorage.getItem('products')) || INITIAL_PRODUCTS;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let user = JSON.parse(localStorage.getItem('user')) || null;
// Mock Orders DB stored in memory/session for demo (or localstorage to persist)
let orders = JSON.parse(localStorage.getItem('orders')) || [
  {
    id: 'ord-123',
    customerName: 'Jane Doe',
    email: 'jane@example.com',
    items: [products[0], products[2]],
    total: 1450,
    status: 'delivered',
    date: new Date().toISOString()
  }
];

// --- UTILS ---
const formatPrice = (p) => `Rs. ${p.toFixed(0)}`;
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
};
const saveUser = () => localStorage.setItem('user', JSON.stringify(user));
const saveOrders = () => localStorage.setItem('orders', JSON.stringify(orders));
const saveProducts = () => localStorage.setItem('products', JSON.stringify(products));

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
  document.getElementById('cart-sidebar').classList.remove('translate-x-full');
  document.getElementById('cart-backdrop').classList.remove('hidden');
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.add('translate-x-full');
  document.getElementById('cart-backdrop').classList.add('hidden');
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
      document.getElementById('cart-footer').style.display = 'none';
    } else {
      document.getElementById('cart-footer').style.display = 'block';
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
      document.getElementById('cart-subtotal').innerText = formatPrice(subtotal);
      document.getElementById('cart-shipping').innerText = shipping === 0 ? 'Free' : formatPrice(shipping);
      document.getElementById('cart-total').innerText = formatPrice(total);
    }
  }
}

function renderHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const authLinks = user 
    ? `<div class="flex items-center gap-2">
         <span class="text-sm font-medium hidden md:block">${user.name}</span>
         <button onclick="logout()" class="text-gray-500 hover:text-red-500 text-sm">Logout</button>
       </div>`
    : `<a href="login.html" class="text-sm font-medium text-gray-600 hover:text-emerald-600">Login</a>`;

  const adminLink = user && user.role === 'admin' 
    ? `<a href="admin.html" class="text-sm font-medium text-gray-600 hover:text-emerald-600">Admin Dashboard</a>` 
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
            ${authLinks}
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
              <li><a href="shop.html?category=Produce" class="hover:text-emerald-500">Produce</a></li>
              <li><a href="shop.html?category=Dairy%20%26%20Eggs" class="hover:text-emerald-500">Dairy & Eggs</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-bold mb-4">Company</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-emerald-500">About Us</a></li>
              <li><a href="#" class="hover:text-emerald-500">Privacy Policy</a></li>
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
function login(email, role) {
  user = {
    id: 'user-123',
    name: email.split('@')[0],
    email,
    role
  };
  saveUser();
  window.location.href = role === 'admin' ? 'admin.html' : 'index.html';
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
}

function initShop() {
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('category');
  const searchParam = params.get('q');
  
  // Render Categories Sidebar
  const catList = document.getElementById('category-list');
  if(catList) {
      catList.innerHTML = `
        <li><a href="shop.html" class="block text-sm ${!catParam ? 'text-emerald-600 font-bold' : 'text-gray-600 hover:text-emerald-600'}">All Products</a></li>
        ${CATEGORIES.map(c => `<li><a href="shop.html?category=${encodeURIComponent(c)}" class="block text-sm ${catParam === c ? 'text-emerald-600 font-bold' : 'text-gray-600 hover:text-emerald-600'}">${c}</a></li>`).join('')}
      `;
  }

  // Filter
  let filtered = products;
  if (catParam) filtered = filtered.filter(p => p.category === catParam);
  if (searchParam) {
      const q = searchParam.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  
  // Render Grid
  const grid = document.getElementById('product-grid');
  const title = document.getElementById('page-title');
  if(title) title.innerText = catParam || 'All Products';
  
  if(grid) {
      grid.innerHTML = filtered.length ? filtered.map(p => createProductCard(p)).join('') : '<p>No products found.</p>';
  }
}

function createProductCard(product) {
    return `
    <a href="product.html?slug=${product.slug}" class="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden block">
      <div class="relative h-48 bg-gray-50 overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        ${product.isOnSale ? '<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">On Sale</span>' : ''}
      </div>
      <div class="p-4 flex flex-col flex-1">
        <div class="flex-1">
          <h3 class="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">${product.name}</h3>
          <p class="text-sm text-gray-500 line-clamp-2 mt-2">${product.description}</p>
        </div>
        <div class="mt-4 flex items-center justify-between">
            <div>
                <p class="text-lg font-bold text-gray-900">${formatPrice(product.price)}</p>
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
        document.body.innerHTML = '<div class="p-10 text-center">Product not found</div>';
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
        qtySpan.innerText = qty;
        btn.innerText = `Add to Cart - ${formatPrice(product.price * qty)}`;
        btn.onclick = () => addToCart(product, qty);
    }
    updateBtn();
}

function initCheckout() {
    const { subtotal, tax, shipping, total, itemCount } = getCartTotals();
    
    // Fill Summary
    const summary = document.getElementById('order-summary');
    if(summary) {
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
    
    document.getElementById('chk-subtotal').innerText = formatPrice(subtotal);
    document.getElementById('chk-shipping').innerText = shipping === 0 ? 'Free' : formatPrice(shipping);
    document.getElementById('chk-total').innerText = formatPrice(total);
    document.getElementById('chk-btn').innerText = `Place Order - ${formatPrice(total)}`;

    // Handle Form
    const form = document.getElementById('checkout-form');
    if(form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const newOrder = {
                id: 'ord-' + Math.floor(Math.random() * 10000),
                customerName: formData.get('firstName') + ' ' + formData.get('lastName'),
                email: formData.get('email'),
                items: [...cart],
                total: total,
                status: 'pending',
                date: new Date().toISOString()
            };
            orders.unshift(newOrder);
            saveOrders();
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
            <button onclick="logout()" class="text-red-600 hover:text-red-800">Logout</button>
        </div>

        <!-- Tabs -->
        <div class="flex gap-4 mb-8 border-b border-gray-200">
            <button onclick="switchAdminTab('orders')" id="tab-orders" class="pb-4 px-4 font-medium border-b-2 border-emerald-600 text-emerald-600">Orders</button>
            <button onclick="switchAdminTab('products')" id="tab-products" class="pb-4 px-4 font-medium text-gray-500 hover:text-gray-800">Products</button>
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
    document.getElementById('tab-orders').className = tab === 'orders' ? 'pb-4 px-4 font-medium border-b-2 border-emerald-600 text-emerald-600' : 'pb-4 px-4 font-medium text-gray-500 hover:text-gray-800';
    document.getElementById('tab-products').className = tab === 'products' ? 'pb-4 px-4 font-medium border-b-2 border-emerald-600 text-emerald-600' : 'pb-4 px-4 font-medium text-gray-500 hover:text-gray-800';

    if(tab === 'orders') renderAdminOrders();
    if(tab === 'products') renderAdminProducts();
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

window.updateOrderStatus = (id, status) => {
    const order = orders.find(o => o.id === id);
    if(order) {
        order.status = status;
        saveOrders();
        renderAdminOrders();
    }
}

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
                        <th class="p-4">Stock</th>
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
                            <td class="p-4">${p.stock}</td>
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

window.deleteProduct = (id) => {
    if(confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderAdminProducts();
    }
}

window.openProductModal = (id = null) => {
    const product = id ? products.find(p => p.id === id) : null;
    const isEdit = !!product;

    const modal = document.getElementById('modal-container');
    modal.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
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
                            <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input name="image" required value="${product ? product.image : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'}" class="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                        </div>
                         <div class="col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" required class="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">${product ? product.description : ''}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select name="category" class="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500">
                                ${CATEGORIES.map(c => `<option value="${c}" ${product && product.category === c ? 'selected' : ''}>${c}</option>`).join('')}
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
}

window.handleProductSubmit = (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
        id: id || 'prod-' + Date.now(),
        name: formData.get('name'),
        slug: formData.get('name').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        image: formData.get('image'),
        description: formData.get('description'),
        category: formData.get('category'),
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        unit: formData.get('unit'),
        isOrganic: formData.get('isOrganic') === 'on',
        isOnSale: formData.get('isOnSale') === 'on',
        rating: 0 // New products start with 0 rating
    };

    if(id) {
        // Edit
        const idx = products.findIndex(p => p.id === id);
        if(idx !== -1) {
            products[idx] = { ...products[idx], ...newProduct, rating: products[idx].rating };
        }
    } else {
        // Create
        products.push(newProduct);
    }
    
    saveProducts();
    document.getElementById('modal-container').innerHTML = '';
    renderAdminProducts();
}


// --- MAIN ENTRY ---
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    
    const path = window.location.pathname;
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
                login(document.getElementById('email').value, document.getElementById('role').value);
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
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
