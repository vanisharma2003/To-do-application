import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './todo.css'

const Todo = () => {
    const [todos,setTodos]=useState([]);
    const [input,setInput]=useState("");
    const [alert,setAlert]=useState(false);
    const change=(event)=>{
      setInput(event.target.value)
    }
    const addtask=()=>{
      if(input.trim()===""){
        setAlert(true);
       setTimeout(()=>{
        setAlert(false)
       },1000)
       return;
      }
       setTodos((prevtodos)=>{
         return [...prevtodos,{task:input,id:uuidv4()}]
       })
       setInput("")
    }
    const deletetask=(id)=>{
      //we use filter method in array to delete any method is not required in an array
     setTodos((prevtodos)=>{
      return prevtodos.filter((todo)=>todo.id != id);
     });

    }

    const deleteall=()=>{
     setTodos([]);
    }
    const markasdone=(id)=>{
    setTodos((currentTodos)=>(
      currentTodos.map((currentTodo)=>currentTodo.id=id?{...currentTodo,isDone:true}:currentTodo)
    ))
    }
    const markallasdone=()=>{
      setTodos((currenttodos)=>{
      return  currenttodos.map((currenttodo)=>({
          ...currenttodo,isDone:true
        }))
      })
    }
    //see if you are using {} in any function it is neccesary to use return statement but if you use () no need to do so
    const markAllAsDone = () => {
      setTodos((currentTodos) =>
        currentTodos.map((currentTodo) => ({
          ...currentTodo,
          isDone: true
        }))
      );
    };
    
  return (
    <div className='div-main'>
      {alert && (
        <div className='alert'><i class="fa-solid fa-circle-xmark"></i>Please enter something</div>
      )}
      <div className='main'>
      <h1 className='main-heading'>To-Do-Application</h1>
     <div className='task'>
     <input placeholder='Enter task here' value={input} onChange={change}/>
     <button onClick={addtask} className='btn'>Add task</button></div> 
      <ul>
      {todos.map((todo) => {
  return (
    <li key={todo.id}>
      <span style={todo.isDone ? { textDecoration: "line-through" } : {}}>
        {todo.task}
      </span>
      &nbsp;&nbsp;
      {todo.task ? (
        <>
         <i class="fa-solid fa-trash" onClick={() => deletetask(todo.id)}></i>
        <i class="fa-solid fa-check" onClick={() => markasdone(todo.id)}></i>
        </>
      ) : null}
    </li>
  );
})}

      </ul>
      <div ><button onClick={deleteall} className='btn'>Delete All</button>
      <button onClick={markallasdone} className='btn'>Mark all as done</button></div>
    </div>
    </div>
    
  )
}

export default Todo
