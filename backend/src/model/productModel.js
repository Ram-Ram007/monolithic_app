import pool from "../config/db.js";

export const getProducts = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};