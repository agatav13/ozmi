import { Request, Response } from "express";
import { Pool } from "pg";
require("dotenv").config({ path: "../../.env" });

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// testowanie czy baza danych jest podłączona
export const testDb = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connected successfully:", result.rows[0].now);
    res.json({ 
      message: "Database connected successfully",
      currentTime: result.rows[0].now 
    });
  } catch (err: any) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category') THEN
          CREATE TYPE CATEGORY AS ENUM (
            'Szkoła Modelowania Matematycznego', 
            'Współpraca', 
            'Inne'
          );
        END IF;
      END
      $$;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS news_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(1000),
        date DATE,
        category CATEGORY,
        content TEXT
      )
    `);

    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_case_study') THEN
          CREATE TYPE CATEGORY_CASE_STUDY AS ENUM (
            'Przemysł', 
            'E-commerce', 
            'Inne'
          );
        END IF;
      END
      $$;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS case_study_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(1000),
        date DATE,
        category CATEGORY_CASE_STUDY
      )
    `);

    console.log("Table and types created successfully");
  } catch (error) {
    console.error("Error creating table or type:", error);
  } finally {
    client.release();
  }
}