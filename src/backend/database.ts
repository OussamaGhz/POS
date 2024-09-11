import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron';

const getDatabasePath = () => {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'database.sqlite');
};

const DB_PATH = getDatabasePath();
console.log('Database path:', DB_PATH);


// Create SQLite database instance
export const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the SQLite database.');
    
  }
});

const createTables = () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS families (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      family_id INTEGER,
      amount REAL NOT NULL,
      unit TEXT NOT NULL,
      cost_price REAL NOT NULL,
      selling_price REAL NOT NULL,
      FOREIGN KEY (family_id) REFERENCES families(id)
    )`,
    `CREATE TABLE IF NOT EXISTS commandes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
      total_price REAL NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS commande_products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      commande_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity REAL NOT NULL,
      FOREIGN KEY (commande_id) REFERENCES commandes(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`,
    `CREATE TABLE IF NOT EXISTS commandes_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      commande_id INTEGER NOT NULL,
      date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
      total_price REAL NOT NULL,
      FOREIGN KEY (commande_id) REFERENCES commandes(id)
    )`,
    `CREATE TABLE IF NOT EXISTS daily_profit (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
      profit REAL NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS monthly_profit (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      month TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
      profit REAL NOT NULL
    )`
  ];

  queries.forEach(query => {
    db.run(query, (err) => {
      if (err) {
        console.error('Failed to create table:', err);
      }
    });
  });
};

createTables();