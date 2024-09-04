-- Create table for product families
CREATE TABLE product_families (
    family_id INTEGER PRIMARY KEY,
    family_name VARCHAR NOT NULL
);

-- Create table for products
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_name VARCHAR NOT NULL,
    family_id INTEGER,
    unit_type VARCHAR NOT NULL,
    stock_amount DECIMAL,
    cost_price DECIMAL,
    selling_price DECIMAL,
    FOREIGN KEY (family_id) REFERENCES product_families(family_id)
);

-- Create table for purchase history
CREATE TABLE purchase_history (
    purchase_id INTEGER PRIMARY KEY,
    product_id INTEGER NOT NULL,
    purchase_date TIMESTAMP NOT NULL,
    added_stock DECIMAL NOT NULL,
    cost_price DECIMAL NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Create table for orders
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    order_date TIMESTAMP NOT NULL,
    total_price DECIMAL NOT NULL
);

-- Create table for order details
CREATE TABLE order_details (
    detail_id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity DECIMAL NOT NULL,
    unit_price DECIMAL NOT NULL,
    total_price DECIMAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
