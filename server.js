const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto'); // For generating tokens
const app = express();

// Use the environment's port or fallback to 3000
const PORT = process.env.PORT || 3000;

// --- CRITICAL FOR RENDER DEPLOYMENT ---
// Render has an ephemeral filesystem. We must store data in a mounted Disk.
// If DATA_FOLDER env var is set (e.g., /var/data), we use that.
// Otherwise, we fallback to the local directory (for local testing).
const DATA_FOLDER = process.env.DATA_FOLDER || __dirname;
const DB_FILE = path.join(DATA_FOLDER, 'db.json');

// --- INITIALIZATION ---
// If the DB file doesn't exist in the persistent folder (e.g. on first deploy),
// copy the starter data from the code folder so the site isn't empty.
if (!fs.existsSync(DB_FILE)) {
    console.log(`Database not found at ${DB_FILE}. Initializing from template...`);
    const templatePath = path.join(__dirname, 'db.json');
    if (fs.existsSync(templatePath)) {
        try {
            const templateData = fs.readFileSync(templatePath);
            fs.writeFileSync(DB_FILE, templateData);
            console.log('Database initialized successfully.');
        } catch (err) {
            console.error('Error initializing database:', err);
            // Create empty structure if copy fails
            fs.writeFileSync(DB_FILE, JSON.stringify({ products: [], categories: [], orders: [], settings: {} }));
        }
    }
}

// --- CONFIGURATION ---
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ssm@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'awaisali'; 
const AUTH_TOKENS = new Set(); // Store active session tokens

// Middleware to parse JSON bodies. Increased limit for Base64 images.
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files (HTML, CSS, JS, Images) from the current directory
app.use(express.static(path.join(__dirname)));

// --- MIDDLEWARE ---
// Protect write endpoints
const requireAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token && AUTH_TOKENS.has(token)) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized. Please login.' });
    }
};

// --- API ENDPOINTS ---

// POST: Admin Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Generate a random token
        const token = crypto.randomBytes(16).toString('hex');
        AUTH_TOKENS.add(token);
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

// GET: Fetch all data (Products, Categories, Orders)
app.get('/api/data', (req, res) => {
    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB:', err);
            // Return empty structure if file is unreadable temporarily
            return res.json({ products: [], categories: [], orders: [], settings: {} });
        }
        try {
            res.json(JSON.parse(data));
        } catch (e) {
            console.error('Error parsing DB:', e);
            res.json({ products: [], categories: [], orders: [], settings: {} });
        }
    });
});

// POST: Update a specific section (products, categories, orders, settings)
// Protected by requireAuth middleware
app.post('/api/update', (req, res) => {
    const { type, data } = req.body;
    
    // Allow 'orders' to be updated without auth (so customers can buy), 
    // but protect everything else (products, settings).
    const isPublicAction = type === 'orders';
    
    if (!isPublicAction) {
        const token = req.headers['authorization'];
        if (!token || !AUTH_TOKENS.has(token)) {
             return res.status(401).json({ error: 'Unauthorized' });
        }
    }
    
    if (!['products', 'categories', 'orders', 'settings'].includes(type)) {
        return res.status(400).json({ error: 'Invalid data type' });
    }

    // Read current DB
    fs.readFile(DB_FILE, 'utf8', (err, fileData) => {
        let db = { products: [], categories: [], orders: [], settings: {} };
        if (!err && fileData) {
            try {
                db = JSON.parse(fileData);
            } catch (e) {
                console.error('Error parsing existing DB, creating new:', e);
            }
        }

        // Update the specific section
        db[type] = data;

        // Write back to file
        fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error('Error writing DB:', err);
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.json({ success: true });
        });
    });
});

// --- SERVE HTML ---

// Specific route for the root to ensure index.html is served
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for 404s
app.use((req, res) => {
  // If it's an API request, return JSON error
  if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
  }
  // Otherwise serve index for potential client-side routing or 404 page
  res.status(404).send('<h1>404 - Page Not Found</h1><p><a href="/">Go Home</a></p>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Using database file: ${DB_FILE}`);
});