import pool from "../config/db.js";

export const createUser = async (name, email) => {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
};

export const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

// Removed unused getProducts and deleteUserbyId helpers
export const updateUserById = async (id, fields) => {
  // Build dynamic update for provided fields (name, email)
  const setClauses = [];
  const values = [];
  let idx = 1;

  if (fields.name !== undefined) {
    setClauses.push(`name = $${idx++}`);
    values.push(fields.name);
  }
  if (fields.email !== undefined) {
    setClauses.push(`email = $${idx++}`);
    values.push(fields.email);
  }

  if (setClauses.length === 0) {
    return null;
  }

  values.push(id);
  const query = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0] || null;
};
export const deleteUserById = async(id)=>{
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}


