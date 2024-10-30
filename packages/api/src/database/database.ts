import mariadb from "mariadb";
require("dotenv").config({ path: ".env" });

export const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5
})

export async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT DATABASE() AS current_db;")
    console.log(rows);
  } catch (err) {
    console.log("Error connecting to the database:", err)
  } finally {
    if (conn) conn.release();
  }
}
