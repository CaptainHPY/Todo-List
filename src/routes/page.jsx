import React from 'react';
import { Button,Checkbox } from 'antd';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.jsx';
import TaskList from './TaskList.jsx';
import './App.css'

let nextId = 1;
const initialTodos = [];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  const doneCount=todos.reduce((pre,todo)=>pre+(todo.done?1:0),0)

  const total=todos.length

  function handleAddTodo(title) {
    updateTodos(draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    updateTodos(todos.map(todo => {
      if (todo.id === nextTodo.id) {
        return nextTodo;
      } else {
        return todo;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    updateTodos(
      todos.filter(t => t.id !== todoId)
    );
  }

  function handlecheckAllTodo(){
    updateTodos(todos.map(todo => {
      if(doneCount===total){
        return {...todo,done:false};
      }
      else{
        return {...todo,done:true};
      }
    }));
  }

  function clearAllDone(){
    updateTodos(
      todos.filter(todo=>{
        return !todo.done;
      })
    );
  }

  return (
    <div className='comb'>
      <span className='span1'>
        Todo List
      </span>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
      <div className='bottom'
          style={{display:total!==0?'block':'none'}}>
        <Checkbox
          checked={(doneCount===total&&total!==0)?true:false}
          onChange={handlecheckAllTodo}
        />
        <span className='span2'>{doneCount} done/{total} in total</span>
        <Button type="text"
                className='clearAllDone'
                style={{display:doneCount!==0?'inline-block':'none'}}
                onClick={clearAllDone}>
          Clear all done
        </Button>
      </div>
      <footer className="info">
      <p>Press the button or Enter to add a new todo</p>  
			<p>Double-click to edit a todo</p>
			<p>Created by <a href="https://github.com/CaptainHPY">CaptainHPY</a></p>
		  </footer>
    </div>
  );
}