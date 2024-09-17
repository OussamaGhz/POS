import { Router } from "express";
import { db } from "../database";

const router = Router();

router.get("/commandes", (req, res) => {
  db.all("SELECT * FROM commandes", [], (err, rows) => {
    if (err) {
      console.error("Failed to get commandes:", err);
      res.status(500).json({ error: "Failed to get commandes" });
    } else {
      res.json(rows);
    }
  });
});

router.post("/commandes", (req, res) => {
  const { total_price, products } = req.body;

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    db.run(
      "INSERT INTO commandes (total_price) VALUES (?)",
      [total_price],
      function (err) {
        if (err) {
          console.error("Failed to create commande:", err);
          db.run("ROLLBACK");
          return res.status(500).json({ error: "Failed to create commande" });
        }

        const commandeId = this.lastID;
        const placeholders = products.map(() => "(?, ?, ?)").join(",");
        const values = products.flatMap((p: { id: number; amount: number }) => [
          commandeId,
          p.id,
          p.amount,
        ]);

        db.run(
          `INSERT INTO commande_products (commande_id, product_id, quantity) VALUES ${placeholders}`,
          values,
          function (err) {
            if (err) {
              console.error("Failed to link products to commande:", err);
              db.run("ROLLBACK");
              return res
                .status(500)
                .json({ error: "Failed to link products to commande" });
            }

            const insertHistoryPromises = products.map((product: any) => {
              return new Promise<void>((resolve, reject) => {
                db.get(
                  "SELECT * FROM products WHERE id = ?",
                  [product.id],
                  (err, row: { id: number; name: string; family_id: number; amount: number; unit: string; cost_price: number; selling_price: number }) => {
                    if (err) {
                      return reject(err);
                    }
                    db.run(
                      `INSERT INTO commande_products_history 
                      (commande_id, product_id, name, family_id, amount, unit, cost_price, selling_price, quantity) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                      [
                        commandeId,
                        row.id,
                        row.name,
                        row.family_id,
                        row.amount,
                        row.unit,
                        row.cost_price,
                        row.selling_price,
                        product.amount,
                      ],
                      (err) => {
                        if (err) {
                          return reject(err);
                        }
                        resolve();
                      }
                    );
                  }
                );
              });
            });

            Promise.all(insertHistoryPromises)
              .then(() => {
                const updateProductAmounts = products.map((product: any) => {
                  return new Promise<void>((resolve, reject) => {
                    db.run(
                      "UPDATE products SET amount = amount - ? WHERE id = ?",
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

                return Promise.all(updateProductAmounts);
              })
              .then(() => {
                db.run("COMMIT");
                res.status(201).json({ id: commandeId, total_price, products });
              })
              .catch((err) => {
                console.error("Failed to update product amounts:", err);
                db.run("ROLLBACK");
                res
                  .status(500)
                  .json({ error: "Failed to update product amounts" });
              });
          }
        );
      }
    );
  });
});

// New route to get products ordered in a specific commande
router.get("/commandes/:id/products", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT cph.product_id, cph.name, cph.family_id, f.name as family_name, cph.amount, cph.unit, cph.cost_price, cph.selling_price, cph.quantity
    FROM commande_products_history cph
    LEFT JOIN families f ON cph.family_id = f.id
    WHERE cph.commande_id = ?
  `;

  db.all(query, [id], (err, rows) => {
    if (err) {
      console.error("Failed to get products for commande:", err);
      res.status(500).json({ error: "Failed to get products for commande" });
    } else {
      res.json(rows);
    }
  });
});

export default router;