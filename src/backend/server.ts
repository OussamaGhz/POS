import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';

const app = express();
const PORT = 8000;

const DB_DIRNAME = "src/backend"; 
const DB_PATH = path.resolve(DB_DIRNAME, 'database.sqlite');

// Create SQLite database instance
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create Product table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    quantity INTEGER,
    total REAL
  )
`, (err) => {
  if (err) {
    console.error('Failed to create product table:', err);
  } else {
    console.log('Product table created or already exists.');
  }
});

// Middleware for parsing request body
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// CRUD routes for Product model
app.get('/products', (req, res) => {
  db.all('SELECT * FROM product', [], (err, rows) => {
    if (err) {
      console.error('Failed to get products:', err);
      res.status(500).json({ error: 'Failed to get products' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM product WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Failed to get product:', err);
      res.status(500).json({ error: 'Failed to get product' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
});

app.post('/products', (req, res) => {
  const { name, price, quantity, total } = req.body;
  db.run('INSERT INTO product (name, price, quantity, total) VALUES (?, ?, ?, ?)', [name, price, quantity, total], function(err) {
    if (err) {
      console.error('Failed to create product:', err);
      res.status(500).json({ error: 'Failed to create product' });
    } else {
      res.status(201).json({ id: this.lastID, name, price, quantity, total });
    }
  });
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, total } = req.body;
  db.run('UPDATE product SET name = ?, price = ?, quantity = ?, total = ? WHERE id = ?', [name, price, quantity, total, id], function(err) {
    if (err) {
      console.error('Failed to update product:', err);
      res.status(500).json({ error: 'Failed to update product' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ id, name, price, quantity, total });
    }
  });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM product WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Failed to delete product:', err);
      res.status(500).json({ error: 'Failed to delete product' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ message: 'Product deleted' });
    }
  });
});

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  return new Promise((resolve, reject) => {
    console.log("Server started");
  });
};

// Function to check the server's health
export const checkServerHealth = async () => {
  try {
    const response = await fetch(`http://localhost:${PORT}/health`);
    if (response.ok) {
      const data = await response.json();
      if (data.status === "Server is running") {
        console.log("Backend is running");
      } else {
        console.error("Backend health check failed");
      }
    } else {
      console.error("Backend health check failed");
    }
  } catch (error) {
    console.error("Error checking backend health:", error.message);
  }
};