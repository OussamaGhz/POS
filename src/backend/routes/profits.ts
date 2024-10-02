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
      return res
        .status(500)
        .json({ error: "Failed to calculate daily expenses" });
    }

    res.json({ daily_expenses: row.daily_expenses || 0 });
  });
});

// Route to calculate and return daily profit
router.get("/daily-profit", (req, res) => {
  const gainsQuery = `
    SELECT SUM(total_price) as daily_gains
    FROM commandes
    WHERE date(date('now')) = date(date('now', 'localtime'))
  `;

  const expensesQuery = `
    SELECT SUM(cost_price) as daily_expenses
    FROM products
    WHERE date(date('now')) = date(date('now', 'localtime'))
  `;

  db.get(gainsQuery, [], (err, gainsRow: { daily_gains: number }) => {
    if (err) {
      console.error("Failed to get daily gains:", err);
      return res.status(500).json({ error: "Failed to get daily gains" });
    }

    db.get(expensesQuery, [], (err, expensesRow: { daily_expenses: number }) => {
      if (err) {
        console.error("Failed to get daily expenses:", err);
        return res.status(500).json({ error: "Failed to get daily expenses" });
      }

      const dailyProfit = (gainsRow.daily_gains || 0) - (expensesRow.daily_expenses || 0);
      res.json({ daily_profit: dailyProfit });
    });
  });
});

export default router;