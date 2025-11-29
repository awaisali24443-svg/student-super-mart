import { Product } from './types';

// Localized Configuration for Pakistan (PKR)
export const TAX_RATE = 0.00; // Usually tax is included in retail price in PK local markets
export const FREE_SHIPPING_THRESHOLD = 5000; // Updated threshold for free shipping
export const SHIPPING_COST = 200; // Local delivery cost

export const CATEGORIES = ['Produce', 'Dairy & Eggs', 'Bakery', 'Pantry', 'Beverages', 'Snacks', 'Local Specialties'] as const;

export const INITIAL_PRODUCTS: Product[] = [
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
    // Brown traditional sweets
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
    // Raw Jaggery/Brown Sugar blocks
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
    // Green tea leaves close up
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
     // Red spice powder bowl
     image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400'
  },

  // --- PANTRY (Rice, Pulses, Flour, Oil, Spices) ---
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
    // Raw white rice grains
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
    // Yellow split lentils
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
    // Red lentils
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
    // White lentils/beans
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
    // Cooking oil pouring or bottle
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
    // Flour scoop
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
    // White sugar
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
    // Biryani rice plate
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
    // White salt
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
    // Red chili powder
    image: 'https://images.unsplash.com/photo-1624806992066-5d5482354673?auto=format&fit=crop&q=80&w=400'
  },

  // --- BEVERAGES (Tea, Cold Drinks) ---
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
    // Black tea loose
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
    // Cup of tea with mint
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
    // Strong tea pouring
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
    // Tea granules close up
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
    // Red drink glass
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
    // Cola glass
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
    // Water bottle
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=400'
  },

  // --- SNACKS & DRY FRUITS ---
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
    // Peanuts in shell
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
    // Almonds
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
    // Pistachios
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
    // Walnuts
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
    // Savory snack bowl
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
    // Potato chips bowl
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
    // Cookies
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
    // Red onions specifically
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
    // Raw potatoes
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
    // Garlic
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
    // Ginger
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
    // Tomatoes
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
    // Green chilies
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
    // Cucumber
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
    // Bananas
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
    // Mangoes
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
    // Milk bottle
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
    // Brown eggs
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
    // Jar of ghee/oil
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
    // Yogurt bowl
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
    // Butter block
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
    // Tandoori Naan specifically
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
    // Rusk or Biscotti
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
    // Sliced white bread
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
    // Cake/Biscuit similar texture
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400'
  }
];
