import { Request, Response } from "express";
import { pool } from "../database/database";

export const createCaseStudyPosts = async (req: Request, res: Response) => {
  const { title, date, category, contentData } = req.body;
  const images = req.files as Express.Multer.File[];

  if (!title || !date || !category) {
    return res.status(400).json({ error: "Wszystkie pola nie są wypełnione" });
  }

  try {
    const query = `
      INSERT INTO case_study_posts (title, date, category) 
      VALUES ($1, $2::timestamp, $3) 
      RETURNING id
    `;
    const values = [title, date, category];

    // dodaje tytuł, date i kategoria do tabelki i przechowuje id tego posta
    const result = await pool.query(query, values);
    const postId = result.rows[0].id;

    // dodaje pola teksowe i zdjęcia
    if (contentData) {
      const contentArray = JSON.parse(contentData);
      const contentInserts = [];

      // do śledzenia indexu zdjęcia
      let imageIndex = 0;

      // przechodzi po wszystkich elementach sprawdzając ich typ i dodaje odpowiednie SQL query razem z wartościami
      for (let i = 0; i < contentArray.length; i++) {
        const element = contentArray[i];

        if (element.type === "text") {
          contentInserts.push({
            query: `
              INSERT INTO case_study_posts_content (post_id, position_number, content_type, content) 
              VALUES ($1, $2, 'text', $3) 
              RETURNING id
            `,
            values: [postId, i + 1, element.content],
          });
        } else {
          const image = images[imageIndex];
          if (image) {
            contentInserts.push({
              query: `
                INSERT INTO case_study_posts_content (post_id, position_number, content_type, content) 
                VALUES ($1, $2, 'photo', $3)
                RETURNING id
              `,
              values: [postId, i + 1, image.filename],
            });
            imageIndex++;
          }
        }
      }

      // wykonuje wszystkie SQL queries
      for (const contentInsert of contentInserts) {
        await pool.query(contentInsert.query, contentInsert.values);
      }
    }

    console.log("Nowy post:", title, date, category);
    res.status(201).json({ message: "Post zapisany", id: postId });
  } catch (error) {
    console.error("Error posting:", error);
    res.status(500).json({ error: "Failed to post" });
  }
};

export const editCaseStudyPosts = async (req: Request, res: Response) => {
  const { title, date, category, id } = req.body;

  if (!title || !date || !category) {
    return res.status(400).json({ error: "Wszystkie pola nie są wypełnione" });
  }

  const query = `
    UPDATE case_study_posts 
    SET title = $1, date = $2::timestamp, category = $3 
    WHERE id = $4
  `;
  const values = [title, date, category, id];

  try {
    const result = await pool.query(query, values);
    console.log("Zaktualizowano post:", title, date, category);
    res.status(200).json({ message: "Post updated successfully", result });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deleteCaseStudyPosts = async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `
    DELETE FROM case_study_posts 
    WHERE id = $1
  `;
  const values = [id];

  try {
    const result = await pool.query(query, values);
    console.log("Usunięto post:", id);
    res.status(200).json({ message: "Post deleted successfully", result });
  } catch (error) {
    console.error("Error deleting the post:", error);
    res.status(500).json({ error: "Failed to delete the post" });
  }
};

export const getCaseStudyPosts = async (req: Request, res: Response) => {
  // p - case_study_posts
  // c - case_study_posts_content
  const result = await pool.query(`
    SELECT p.id AS post_id, p.title, p.date, p.category, c.position_number, c.content_type, c.content
    FROM case_study_posts p
    LEFT JOIN case_study_posts_content c ON p.id = c.post_id
    ORDER BY p.date DESC, p.id DESC, c.position_number ASC;
  `);
  res.json(result.rows);
};
