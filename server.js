const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Use the environment's port or fallback to 3000
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware to parse JSON bodies. Increased limit for Base64 images.
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files (HTML, CSS, JS, Images) from the current directory
app.use(express.static(path.join(__dirname)));

// --- API ENDPOINTS ---

// GET: Fetch all data (Products, Categories, Orders)
app.get('/api/data', (req, res) => {
    if (!fs.existsSync(DB_FILE)) {
        // Fallback if DB doesn't exist yet
        return res.json({ products: [], categories: [], orders: [], settings: {} });
    }
    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading DB:', err);
            return res.status(500).json({ error: 'Failed to read database' });
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
app.post('/api/update', (req, res) => {
    const { type, data } = req.body;
    
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
  console.log(`Visit http://localhost:${PORT}`);
});