-- Table for product families
CREATE TABLE families (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Table for products
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    family_id INTEGER,
    amount REAL NOT NULL,
    unit TEXT NOT NULL,
    cost_price REAL NOT NULL,
    selling_price REAL NOT NULL,
    FOREIGN KEY (family_id) REFERENCES families(id)
);

-- Table for commandes
CREATE TABLE commandes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    total_price REAL NOT NULL
);

-- Table to link commandes with products
CREATE TABLE commande_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commande_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity REAL NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Table for commandes history
CREATE TABLE commandes_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commande_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    total_price REAL NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id)
);

-- Table for daily profit
CREATE TABLE daily_profit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    profit REAL NOT NULL
);

-- Table for monthly profit
CREATE TABLE monthly_profit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    month TEXT NOT NULL,
    profit REAL NOT NULL
);