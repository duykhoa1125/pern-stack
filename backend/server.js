import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import arcjetMiddleware from "./middleware/arcjetMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet(
  {
    contentSecurityPolicy: false,
  }
));
app.use(morgan("dev"));

const __dirname = path.resolve();

// Apply Arcjet middleware globally (before routes)
app.use(arcjetMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const initDB = async () => {
  try {
    // Check if required environment variables are set
    if (!process.env.PGHOST || !process.env.PGDATABASE || !process.env.PGUSER || !process.env.PGPASSWORD) {
      console.log("Warning: Database environment variables not set. Skipping database initialization in development.");
      if (process.env.NODE_ENV === "production") {
        throw new Error("Database environment variables are required in production");
      }
      return;
    }

    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Database initialized");
  } catch (error) {
    console.log("Database connection error:", error);
    if (process.env.NODE_ENV === "production") {
      throw error; // Re-throw in production to fail the deployment
    }
  }
};

const PORT = process.env.PORT || 3000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
