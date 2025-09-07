import { sql } from "./config/db.js";
import { products } from "../frontend/src/seeds/products.js";

const seedProducts = async () => {
  try {
    console.log("Seeding products...");

    for (const product of products) {
      await sql`
        INSERT INTO products (name, price, image)
        VALUES (${product.name}, ${product.price}, ${product.image})
      `;
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.log("Error seeding products:", error);
  } finally {
    process.exit(0);
  }
};

seedProducts();
