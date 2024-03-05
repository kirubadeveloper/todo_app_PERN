const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const userEmail = "kiruba@gmail.com";

app.get("/todos/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE user_email = $1", [
      userEmail,
    ]);
    res.json(todo.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { user_email, title, progress, date } = req.body;
    console.log(user_email, title, progress, date);
    const id = uuidv4();
    const postTask = await pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date]
    );
    res.status(200).json(postTask); // Send JSON response to client
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" }); // Send JSON response to client
  }
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, user_email, progress, date } = req.body;
  try {
    const editTodo = pool.query(
      "UPDATE todos SET user_email = $1, title=$2, progress=$3, date=$4 WHERE id=$5;",
      [user_email, title, progress, date, id]
    );
    res.json(editTodo);
  } catch (error) {
    console.error(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todos where id=$1;", [id]);
    res.json(deleteTodo);
  } catch (error) {
    console.error(error);
  }
});

//signup

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signup = await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
      [email, hashedPassword]
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token });
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({ detail: err.detail });
    }
  }
});

//login

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!users.rows.length) {
      return res.json({ detail: "User does not exist" });
    }

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    if (success) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server connected in ${PORT}`);
});
