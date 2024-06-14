import cors from 'cors';
import express from 'express';

import { Workspace } from 'types';

const app = express();
const port = 3001;

app.use(cors({ origin: `http://localhost:${port}` }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/workspaces', (_, response) => {
  const workspaces: Workspace[] = [
    { name: 'api', version: '1.0.0' },
    { name: 'types', version: '1.0.0' },
    { name: 'web', version: '1.0.0' },
  ];
  response.json({ data: workspaces })
});

app.post('/data', (req, res) => {
  const title = req.body.title;
  const content = req.body.content
  res.send(`Tytuł: ${title} Treść: ${content}`)
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));