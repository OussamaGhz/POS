import express from 'express';
import { Sequelize, Model, DataTypes } from 'sequelize';
import path from 'path';

const app = express();
const PORT = 8000;

const DB_DIRNAME = "src/backend"; 

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(DB_DIRNAME, 'database.sqlite')
});

// Define Product model
class Product extends Model {}
Product.init({
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  quantity: DataTypes.INTEGER,
  total: DataTypes.FLOAT
}, { 
  sequelize, 
  modelName: 'product',
  timestamps: false // Disable createdAt and updatedAt
});

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

// Middleware for parsing request body
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// CRUD routes for Product model
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error('Failed to get products:', err);
    res.status(500).json({ error: 'Failed to get products' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error('Failed to get product:', err);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error('Failed to create product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error('Failed to update product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error('Failed to delete product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is listing on port ${PORT}`);
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
