import cors from "cors";
import express from "express";
import { initializeDatabase, testDb } from "./database/database";
import { createNewsPosts, editNewsPosts, getNewsPosts } from "./sections/news";
import { createCaseStudies, editCaseStudies, getCaseStudies } from "./sections/caseStudies";

const app = express();
const port = 5000;

// pozwala na requesty z frontendu
app.use(cors({ 
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:5500"
  ] 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDatabase();

app.get("/test-db", testDb);

app.post("/create-news-posts", createNewsPosts);
app.post("/edit-news-posts", editNewsPosts);
app.get("/get-news-posts", getNewsPosts);

app.post("/create-case-studies", createCaseStudies);
app.post("/edit-case-studies", editCaseStudies);
app.get("/get-case-studies", getCaseStudies);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));