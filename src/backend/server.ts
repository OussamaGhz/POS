import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';

const app = express();
const PORT = 3000;

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
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});