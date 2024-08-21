import { Request, Response } from "express";
import { pool } from "../database/database";

export const createNewsPosts = async (req: Request, res: Response) => {  
  const { title, date, category, content } = req.body;

  if (!title || !date || !category || !content) {
    return res.status(400).json({ error: "Wszystkie pola nie są wypełnione" });
  }

  const query = "INSERT INTO news_posts (title, date, category, content) VALUES ($1, $2, $3, $4) RETURNING id";
  const values = [title, date, category, content];

  try {
    const result = await pool.query(query, values);
    console.log("Nowy post:", title, date, category, content);
    res.status(201).json({ message: "Post zapisany", id: result.rows[0].id })
  } catch (error) {
    console.error("Error posting:", error);
    res.status(500).json({ error: "Failed to post" });
  }
}

export const editNewsPosts = async (req: Request, res: Response) => {
  const { title, date, category, content, id } = req.body;

  if (!title || !date || !category || !content) {
    return res.status(400).json({ error: "Wszystkie pola nie są wypełnione" });
  }

  const query = "UPDATE news_posts SET title = $1, date = $2, category = $3, content = $4 WHERE id = $5";
  const values = [title, date, category, content, id];

  try {
    const result = await pool.query(query, values);
    console.log("Zaktualizowano post:", title, date, category, content);
    res.status(200).json({ message: "Post updated successfully", result });
  } catch (error) {
    console.error("Error updating the post:", error);
    res.status(500).json({ error: "Failed to update the post" });
  }
}

export const deleteNewsPosts = async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = "DELETE FROM news_posts WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    console.log("Usunięto post:", id);
    res.status(200).json({ message: "Post deleted successfully", result });
  } catch (error) {
    console.error("Error deleting the post:", error);
    res.status(500).json({ error: "Failed to delete the post" });
  }
}

export const getNewsPosts = async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM news_posts ORDER BY date DESC");
  res.json(result.rows);
}