import { Router } from "express";
import { db } from "../database";

const router = Router();

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

router.post("/families", (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO families (name) VALUES (?)", [name], function (err) {
    if (err) {
      console.error("Failed to create family:", err);
      res.status(500).json({ error: "Failed to create family" });
    } else {
      res.status(201).json({ id: this.lastID, name });
    }
  });
});

router.delete("/families/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM families WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Failed to delete family:", err);
      res.status(500).json({ error: "Failed to delete family" });
    } else {
      res.status(204).end();
    }
  });
});


export default router;
