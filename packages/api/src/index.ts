import cors from 'cors';
import express from 'express';
import { Pool } from 'pg';
require('dotenv').config({ path: '../../.env' });

const app = express();
const port = 5000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// pozwala na requesty z frontendu
app.use(cors({ 
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:5500'
  ] 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function initializeDatabase() {
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

    console.log('Table and types created successfully');
  } catch (error) {
    console.error('Error creating table or type:', error);
  } finally {
    client.release();
  }
}

initializeDatabase();

// postgres, testowanie czy jest podłączony
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully:', result.rows[0].now);
    res.json({ 
      message: 'Database connected successfully',
      currentTime: result.rows[0].now 
    });
  } catch (err: any) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// zapisywanie danych z postu do bazy danych
app.post('/news-posts', async (req, res) => {  
  const { title, date, category, content } = req.body;

  if (!title || !date || !category || !content) {
    return res.status(400).json({ error: 'Wszystkie pola nie są wypełnione' });
  }

  const query = 'INSERT INTO news_posts (title, date, category, content) VALUES ($1, $2, $3, $4) RETURNING id';
  const values = [title, date, category, content];

  try {
    const result = await pool.query(query, values);
    console.log('Nowy post:', title, date, category, content);
    res.status(201).json({ message: 'Post zapisany', id: result.rows[0].id })
  } catch (error) {
    console.error('Error posting:', error);
    res.status(500).json({ error: 'Failed to post' });
  }
});

app.post('/edit-news-posts', async (req, res) => {
  const { title, date, category, content, id } = req.body

  if (!title || !date || !category || !content) {
    return res.status(400).json({ error: 'Wszystkie pola nie są wypełnione' });
  }

  const query = 'UPDATE news_posts SET title = $1, date = $2, category = $3, content = $4 WHERE id = $5';
  const values = [title, date, category, content, id];

  try {
    const result = await pool.query(query, values);
    console.log('Zaktualizowano post:', title, date, category, content);
    res.status(200).json({ message: 'Post updated successfully', result });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// żeby posty były wyświetlane na stronie
app.get('/news-posts', async (req, res) => {
  const result = await pool.query('SELECT * FROM news_posts ORDER BY date DESC');
  res.json(result.rows);
})

app.post('/case-study-posts', async (req, res) => {  
  const { title, date, category } = req.body;

  if (!title || !date || !category) {
    return res.status(400).json({ error: 'Wszystkie pola nie są wypełnione' });
  }

  const query = 'INSERT INTO case_study_posts (title, date, category) VALUES ($1, $2, $3) RETURNING id';
  const values = [title, date, category];

  try {
    const result = await pool.query(query, values);
    console.log('Nowy post:', title, date, category);
    res.status(201).json({ message: 'Post zapisany', id: result.rows[0].id })
  } catch (error) {
    console.error('Error posting:', error);
    res.status(500).json({ error: 'Failed to post' });
  }
});

app.get('/case-study-posts', async (req, res) => {
  const result = await pool.query('SELECT * FROM case_study_posts ORDER BY date DESC');
  res.json(result.rows);
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));