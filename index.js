const express = require('express');
const app = express();
const pool = require('./db');
const PORT =3000;

app.use(express.json());

app.get('/',(req, res)=>{
  res.send('hello wtf');
});

app.get('/todos', async (req,res)=>{

  try {
    const allTodos = await pool.query('SELECT * from todo');
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
})

app.get('/todos/:id', async (req,res)=>{

  try {
    const todo = await pool.query('SELECT * from todo WHERE todo_id = ($1)', [req.params.id]);
    res.json(todo.rows[0]);

  } catch (error) {
    console.log(error.message);
  }
})



app.post("/todos", async (req,res)=>{

  try {
    const {description} = req.body;
    const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *", [description]);

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
})