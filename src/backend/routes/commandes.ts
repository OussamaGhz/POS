import { Router } from 'express';
import { db } from '../database';

const router = Router();

router.get('/commandes', (req, res) => {
  db.all('SELECT * FROM commandes', [], (err, rows) => {
    if (err) {
      console.error('Failed to get commandes:', err);
      res.status(500).json({ error: 'Failed to get commandes' });
    } else {
      res.json(rows);
    }
  });
});

router.post('/commandes', (req, res) => {
  const { date, total_price, products } = req.body;
  db.run('INSERT INTO commandes (date, total_price) VALUES (?, ?)', [date, total_price], function(err) {
    if (err) {
      console.error('Failed to create commande:', err);
      res.status(500).json({ error: 'Failed to create commande' });
    } else {
      const commandeId = this.lastID;
      const placeholders = products.map(() => '(?, ?, ?)').join(',');
      const values = products.flatMap((p: { product_id: number, quantity: number }) => [commandeId, p.product_id, p.quantity]);
      db.run(`INSERT INTO commande_products (commande_id, product_id, quantity) VALUES ${placeholders}`, values, function(err) {
        if (err) {
          console.error('Failed to link products to commande:', err);
          res.status(500).json({ error: 'Failed to link products to commande' });
        } else {
          res.status(201).json({ id: commandeId, date, total_price, products });
        }
      });
    }
  });
});

export default router;