import { Request, Response } from "express";
import { pool } from "../database/database";

export const createCaseStudyPosts = async (req: Request, res: Response) => {  
  const { title, date, category } = req.body;

  if (!title || !date || !category) {
    return res.status(400).json({ error: "Wszystkie pola nie są wypełnione" });
  }

  const query = "INSERT INTO case_study_posts (title, date, category) VALUES ($1, $2, $3) RETURNING id";
  const values = [title, date, category];

  try {
    const result = await pool.query(query, values);
    console.log("Nowy post:", title, date, category);
    res.status(201).json({ message: "Post zapisany", id: result.rows[0].id })
  } catch (error) {
    console.error("Error posting:", error);
    res.status(500).json({ error: "Failed to post" });
  }
}

export const editCaseStudyPosts = async (req: Request, res: Response) => {
  const { title, date, category, id } = req.body

  if (!title || !date || !category) {
    return res.status(400).json({ error: "Wszystkie pola nie są wypełnione" });
  }

  const query = "UPDATE case_study_posts SET title = $1, date = $2, category = $3 WHERE id = $4";
  const values = [title, date, category, id];

  try {
    const result = await pool.query(query, values);
    console.log("Zaktualizowano post:", title, date, category);
    res.status(200).json({ message: "Post updated successfully", result });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
}

export const deleteCaseStudyPosts = async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = "DELETE FROM case_study_posts WHERE id = $1";
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

export const getCaseStudyPosts = async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM case_study_posts ORDER BY date DESC");
  res.json(result.rows);
}