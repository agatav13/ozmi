import cors from 'cors';
import express from 'express';
import { Pool } from 'pg';
require('dotenv').config({ path: '../../.env' });

import { FormDataTypeWithId } from 'types';

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
app.use(cors({ origin: `http://localhost:3000` }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// postgres
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

const posts: FormDataTypeWithId[] = [];  // zastąpic na baze danych

app.post('/news-posts', (req, res) => {
  const { title, category, content } = req.body;

  if (!title || !category || !content) {
    return res.status(400).json({ error: 'Wszystkie pola nie są wypełnione' });
  }

  const newPost: FormDataTypeWithId = {
    id: posts.length + 1,
    title,
    category,
    content
  };

  // Zapisać dane do bazy danych
  console.log('Nowy post:', newPost);
  posts.push(newPost);

  res.status(201).json({
    message: 'Post utworzony',
    post: newPost
  });
});

app.get('/news-posts', (req, res) => {
  res.json(posts);
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));