require("dotenv").config();

const express = require("express");
const path = require("path");
const mysql = require("mysql2");
// const cors = require("cors");

const port = 3000;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(cors());

const con = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName,
});

con.connect((err) => {
  if (err) throw err;
  console.log("DB Connected");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/post", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "post", "index.html"));
});

app.get("/users_db", (req, res) => {
  const sql = "select * from users";

  con.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.json(result);
  });
});

app.get("/posts_db", (req, res) => {
  const sql = "select * from posts";

  con.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    console.log(result);
    console.log(result[0].content);
    res.json(result);
  });
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  const userId = req.body.user_id;
  const content = req.body.content;

  const sql = `INSERT INTO posts(user_id, content) VALUES ('${userId}', '${content}')`;

  con.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    console.log(result);
    res.json(result);
  });
  // res.send(`投稿しました ユーザーID: ${userId} 内容: ${content}`);
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}!`);
});
