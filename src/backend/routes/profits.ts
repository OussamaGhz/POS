import { Router } from 'express';
import { db } from '../database';

const router = Router();

router.get('/daily_profit', (req, res) => {
  db.all('SELECT * FROM daily_profit', [], (err, rows) => {
    if (err) {
      console.error('Failed to get daily profit:', err);
      res.status(500).json({ error: 'Failed to get daily profit' });
    } else {
      res.json(rows);
    }
  });
});

router.post('/daily_profit', (req, res) => {
  const { date, profit } = req.body;
  db.run('INSERT INTO daily_profit (date, profit) VALUES (?, ?)', [date, profit], function(err) {
    if (err) {
      console.error('Failed to create daily profit:', err);
      res.status(500).json({ error: 'Failed to create daily profit' });
    } else {
      res.status(201).json({ id: this.lastID, date, profit });
    }
  });
});

router.get('/monthly_profit', (req, res) => {
  db.all('SELECT * FROM monthly_profit', [], (err, rows) => {
    if (err) {
      console.error('Failed to get monthly profit:', err);
      res.status(500).json({ error: 'Failed to get monthly profit' });
    } else {
      res.json(rows);
    }
  });
});

router.post('/monthly_profit', (req, res) => {
  const { month, profit } = req.body;
  db.run('INSERT INTO monthly_profit (month, profit) VALUES (?, ?)', [month, profit], function(err) {
    if (err) {
      console.error('Failed to create monthly profit:', err);
      res.status(500).json({ error: 'Failed to create monthly profit' });
    } else {
      res.status(201).json({ id: this.lastID, month, profit });
    }
  });
});

export default router;