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
    const allTodos = await pool.query('SELECT * from todo ORDER BY todo_id');
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
})

app.get('/todos/:id', async (req,res)=>{

  try {
    const todo = await pool.query('SELECT * from todo WHERE todo_id = $1', [req.params.id]);
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

app.put('/todos/:id', async (req, res)=>{
   try {
     const {id} = req.params;
     const {description} = req.body;

     const updateTodo = await pool.query("UPDATE todo SET description =$1 WHERE todo_id = $2",[description, id]);
     res.json(`todo with id of id ${id} was updated`);
   } catch (error) {
     console.log(error.message)
   }
});


app.delete('/todos/:id', async (req,res)=>{
 
  try {
    const {id} = req.params;
    const deteleTodo = await pool.query('DELETE from todo WHERE todo_id =$1', [id])
    res.json(`todo with id of ${id} was successfully deleted`);
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
})