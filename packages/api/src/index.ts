import cors from "cors";
import express from "express";
import { initializeDatabase, testDb } from "./database/database";
import { createNewsPosts, deleteNewsPosts, editNewsPosts, getNewsPosts } from "./sections/news";
import { createCaseStudyPosts, deleteCaseStudyPosts, editCaseStudyPosts, getCaseStudyPosts } from "./sections/caseStudies";

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
app.delete("/delete-news-posts/:id", deleteNewsPosts);
app.get("/get-news-posts", getNewsPosts);

app.post("/create-case-study-posts", createCaseStudyPosts);
app.post("/edit-case-study-posts", editCaseStudyPosts);
app.delete("/delete-case-study-posts/:id", deleteCaseStudyPosts);
app.get("/get-case-study-posts", getCaseStudyPosts);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));