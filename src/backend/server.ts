import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';

const serverApp = express();
const PORT = 8000;

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'pos-database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Middleware to parse JSON
serverApp.use(express.json());

// Health check endpoint
serverApp.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

serverApp.get('/products', (req, res) => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    total REAL NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Failed to create products table:', err);
      res.status(500).json({ error: 'Failed to create products table' });
    } else {
      db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
          console.error('Failed to get products:', err);
          res.status(500).json({ error: 'Failed to get products' });
        } else {
          res.status(200).json(rows);
        }
      });
    }
  });
});


// Function to start the server
export const startServer = () => {
  serverApp.listen(PORT, () => {
    console.log(`Server is listing on port ${PORT}`);
  });
  return new Promise((resolve, reject) => {
    console.log('Server started');
  });
};

// Function to check the server's health
export const checkServerHealth = async () => {
  try {
    const response = await fetch(`http://localhost:${PORT}/health`);
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'Server is running') {
        console.log('Backend is running');
      } else {
        console.error('Backend health check failed');
      }
    } else {
      console.error('Backend health check failed');
    }
  } catch (error) {
    console.error('Error checking backend health:', error.message);
  }
};
