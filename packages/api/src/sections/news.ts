import { Request, Response } from "express";
import { pool } from "../database/database";
import fs from "fs";
import path from "path";

export const createNewsPosts = async (req: Request, res: Response) => {  
  const { title, date, category, content } = req.body;
  const images = req.files as Express.Multer.File[];

  if (!title || !date || !category || !content) {
    return res.status(400).json({ error: "Wszystkie pola nie są wypełnione" });
  }

  const imageNames = JSON.stringify(images.map(image => image.filename));

  const query = "INSERT INTO news_posts (user_id, title, date, category, content, images) VALUES (?, ?, ?, ?, ?, ?);";
  const values = [1, title, date, category, content, imageNames];

  try {
    const result = await pool.query(query, values);
    console.log("Nowy post:", title, date, category, content);
    res.status(201).json({ message: "Post zapisany", id: result.id });
  } catch (error) {
    console.error("Error posting:", error);
    res.status(500).json({ error: "Failed to post" });
  }
}

export const editNewsPosts = async (req: Request, res: Response) => {
  const { id, title, date, category, content, existingImages } = req.body;
  const newImages = req.files as Express.Multer.File[];

  if (!id || !title || !date || !category || !content) {
    return res.status(400).json({ error: "Wszystkie pola nie są wypełnione" });
  }

  // dołącza nowo dodane zdjęcia do tych, które już były w poście
  const existingImagesArray = JSON.parse(existingImages);
  const newImageNames = newImages ? newImages.map(image => image.filename) : [];
  const allImages = JSON.stringify([...existingImagesArray, ...newImageNames]);

  const query = "UPDATE news_posts SET title = ?, date = ?, category = ?, content = ?, images = ? WHERE id = ?;";
  const values = [title, date, category, content, allImages, id];

  try {
    // bierze zdjęcia ze starej wersji postu
    const oldPost = await pool.query("SELECT images FROM news_posts WHERE id = ?;", [id]);
    const oldImages = oldPost[0].images;
    
    const result = await pool.query(query, values);
    
    // usuwa odpowiednie zdjęcia z foldera w którym są przechowywane
    const imagesToDelete = oldImages.filter((img: string) => !existingImages.includes(img));

    imagesToDelete.forEach((img: string) => {
      const imagePath = path.join(__dirname, "../uploads/news-posts", img);
      fs.unlink(imagePath, (err) => {
        if (err) console.error(`Failed to delete image: ${img}`, err);
      });
    });

    console.log("Zaktualizowano post:", id);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating the post:", error);
    res.status(500).json({ error: "Failed to update the post" });
  }
}

export const deleteNewsPosts = async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `
    DELETE FROM news_posts 
    WHERE id = ?;
  `;
  const values = [id];

  try {
    await pool.query(query, values);
    console.log("Usunięto post:", id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting the post:", error);
    res.status(500).json({ error: "Failed to delete the post" });
  }
}

export const getNewsPosts = async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM news_posts ORDER BY date DESC, id DESC;");
  res.json(result);
}
