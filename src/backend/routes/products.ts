import { Router } from 'express';
import { db } from '../database';

const router = Router();

router.get('/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      console.error('Failed to get products:', err);
      res.status(500).json({ error: 'Failed to get products' });
    } else {
      res.json(rows);
    }
  });
});

router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
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

router.post('/products', (req, res) => {
  const { name, family_id, amount, unit, cost_price, selling_price } = req.body;
  db.run('INSERT INTO products (name, family_id, amount, unit, cost_price, selling_price) VALUES (?, ?, ?, ?, ?, ?)', [name, family_id, amount, unit, cost_price, selling_price], function(err) {
    if (err) {
      console.error('Failed to create product:', err);
      res.status(500).json({ error: 'Failed to create product' });
    } else {
      res.status(201).json({ id: this.lastID, name, family_id, amount, unit, cost_price, selling_price });
    }
  });
});

router.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, family_id, amount, unit, cost_price, selling_price } = req.body;
  db.run('UPDATE products SET name = ?, family_id = ?, amount = ?, unit = ?, cost_price = ?, selling_price = ? WHERE id = ?', [name, family_id, amount, unit, cost_price, selling_price, id], function(err) {
    if (err) {
      console.error('Failed to update product:', err);
      res.status(500).json({ error: 'Failed to update product' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ id, name, family_id, amount, unit, cost_price, selling_price });
    }
  });
});

router.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
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

export default router;