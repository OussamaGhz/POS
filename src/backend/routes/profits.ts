import { Router } from "express";
import { db } from "../database";

const router = Router();

// Route to calculate and return daily expenses
router.get("/daily-expenses", (req, res) => {
  const query = `
    SELECT SUM(cost_price) as daily_expenses
    FROM products
    WHERE date(date('now')) = date(date('now', 'localtime'))
  `;

  db.get(query, [], (err, row: { daily_expenses: number }) => {
    if (err) {
      console.error("Failed to calculate daily expenses:", err);
      return res.status(500).json({ error: "Failed to calculate daily expenses" });
    }

    res.json({ daily_expenses: row.daily_expenses || 0 });
  });
});

export default router;