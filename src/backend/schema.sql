-- Table for product families
CREATE TABLE families (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cost REAL NOT NULL
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
    date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
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

-- Table to store historical product details for commandes
CREATE TABLE commande_products_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commande_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    family_id INTEGER,
    family_name TEXT NOT NULL,
    amount REAL NOT NULL,
    price REAL NOT NULL,
    cost_price REAL NOT NULL,
    selling_price REAL NOT NULL,
    quantity REAL NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Table for commandes history
CREATE TABLE commandes_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commande_id INTEGER NOT NULL,
    date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    total_price REAL NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id)
);