import cors from "cors";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { testConnection } from "./database/database";
import { createNewsPosts, deleteNewsPosts, editNewsPosts, getNewsPosts } from "./sections/news";
import { createCaseStudyPosts, deleteCaseStudyPosts, editCaseStudyPosts, getCaseStudyPosts } from "./sections/caseStudies";

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// pozwala na requesty z frontendu
app.use(cors({ 
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:5500"
  ] 
}));

// sprawdza czy ścieżka istnieje, jeżeli nie to ją tworzy
const ensureDirectoryExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "";

    // daje posty z poszczególych sekcji w odpowiednich ścieżkach
    if (req.url.startsWith("/create-news-posts") || req.url.startsWith("/edit-news-posts")) {
      dir = path.join(__dirname, "uploads/news-posts");
    } else if (req.url.startsWith("/create-case-study-posts")) {
      dir = path.join(__dirname, "uploads/case-study-posts");
    } else {
      throw new Error("Invalid request URL");
    }

    ensureDirectoryExists(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // tworzy unikalną nazwe dla zdjęcia
    const fileExtension = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${fileExtension}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

testConnection();

app.post("/create-news-posts", upload.array("images"), createNewsPosts);
app.post("/edit-news-posts", upload.array("newImages"), editNewsPosts);
app.delete("/delete-news-posts/:id", deleteNewsPosts);
app.get("/get-news-posts", getNewsPosts);

app.post("/create-case-study-posts", upload.array("images"), createCaseStudyPosts);
app.post("/edit-case-study-posts", editCaseStudyPosts);
app.delete("/delete-case-study-posts/:id", deleteCaseStudyPosts);
app.get("/get-case-study-posts", getCaseStudyPosts);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
