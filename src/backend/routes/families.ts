import { Router } from "express";
import { db } from "../database";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/families", (req, res) => {
  db.all("SELECT * FROM families", [], (err, rows) => {
    if (err) {
      console.error("Failed to get families:", err);
      res.status(500).json({ error: "Failed to get families" });
    } else {
      res.json(rows);
    }
  });
});

router.post("/families", upload.single("icon"), (req: any, res) => {
  const { name, cost } = req.body;
  const icon = req.file ? req.file.buffer : null;

  db.run(
    "INSERT INTO families (name, cost) VALUES (?, ?)",
    [name, cost],
    function (err) {
      console.log(name, cost, icon);

      if (err) {
        console.error("Failed to create family:", err);
        res.status(500).json({ error: "Failed to create family" });
      } else {
        res.status(201).json({ id: this.lastID, name, cost });
      }
    }
  );
});

router.delete("/families/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM families WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Failed to delete family:", err);
      res.status(500).json({ error: "Failed to delete family" });
    } else {
      // Delete related products
      db.run("DELETE FROM products WHERE family_id = ?", [id], function (err) {
        if (err) {
          console.error("Failed to delete related products:", err);
          res.status(500).json({ error: "Failed to delete related products" });
        } else {
          res.status(204).end();
        }
      });
    }
  });
});

export default router;
