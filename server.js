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
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/post", (req, res) => {
  res.sendFile(path.join(__dirname, "post", "index.html"));
});

app.get("/db", (req, res) => {
  const sql = "select * from users";

  con.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}!`);
});
