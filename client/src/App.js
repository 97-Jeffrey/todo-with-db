import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Todo from "./todo";
const axios = require('axios');

function App(props) {

  const [todos, setTodo] = useState([]);

  useEffect(()=>{
  
    axios.get('/todos')
      .then(res=>{
        console.log(res);
        setTodo(res.data);
        

      })

  },[]);
  console.log(todos)

  const todoList = todos.map(todo=>{

    return(
      <Todo
      key = {todo.todo_id}
      description ={todo.description}
      >
      </Todo>
    )
  })


  return (
    <div className="App">
      <h1> Todo list</h1>
      {todoList}
    </div>
  );
}

export default App;
