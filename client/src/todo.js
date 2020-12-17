import React from 'react';
import './todo.css';

function Todo(props){

  return(
    <div className='each-todo'>
      {props.description}
    </div>
  )
}

export default Todo;
