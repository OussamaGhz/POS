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
  const { total_price, products } = req.body;

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    db.run('INSERT INTO commandes (total_price) VALUES (?)', [total_price], function(err) {
      if (err) {
        console.error('Failed to create commande:', err);
        db.run('ROLLBACK');
        return res.status(500).json({ error: 'Failed to create commande' });
      }

      const commandeId = this.lastID;
      const placeholders = products.map(() => '(?, ?, ?)').join(',');
      const values = products.flatMap((p: { id: number, amount: number }) => [commandeId, p.id, p.amount]);

      db.run(`INSERT INTO commande_products (commande_id, product_id, quantity) VALUES ${placeholders}`, values, function(err) {
        if (err) {
          console.error('Failed to link products to commande:', err);
          db.run('ROLLBACK');
          return res.status(500).json({ error: 'Failed to link products to commande' });
        }

        const updateProductAmounts = products.map((product: any) => {
          return new Promise<void>((resolve, reject) => {
            db.run(
              'UPDATE products SET amount = amount - ? WHERE id = ?',
              [product.amount, product.id],
              (err) => {
                if (err) {
                  return reject(err);
                }
                resolve();
              }
            );
          });
        });

        Promise.all(updateProductAmounts)
          .then(() => {
            db.run('COMMIT');
            res.status(201).json({ id: commandeId, total_price, products });
          })
          .catch((err) => {
            console.error('Failed to update product amounts:', err);
            db.run('ROLLBACK');
            res.status(500).json({ error: 'Failed to update product amounts' });
          });
      });
    });
  });
});
export default router;