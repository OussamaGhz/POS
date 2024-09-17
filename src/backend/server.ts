import express from "express";
import productsRouter from "./routes/products";
import familiesRouter from "./routes/families";
import commandesRouter from "./routes/commandes";
import profitRouter from "./routes/profits";

const app = express();
const PORT = 8000;

// Middleware for parsing request body
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

// Use routers
app.use(productsRouter);
app.use(familiesRouter);
app.use(commandesRouter);
app.use(profitRouter);

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
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
