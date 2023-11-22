import { useState } from 'react';
import React from 'react';
import { Checkbox,Input } from 'antd';
import { EditOutlined,DeleteOutlined,SaveOutlined } from '@ant-design/icons';
import './App.css'

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo,
}) {
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <Task
            todo={todo}
            handle
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </div>
      ))}
    </div>
  );
}

function CurrentDateTime() {
  const [currentDateTime] = useState(new Date());
 
  const year = currentDateTime.getFullYear();
  const month = currentDateTime.getMonth() + 1; // 月份从 0 开始，因此需要加 1
  const date = currentDateTime.getDate();
  const hours = currentDateTime.getHours();
  const minutes = currentDateTime.getMinutes();
  const seconds = currentDateTime.getSeconds();
 
  return (
    <div>
      <p className='span4'>created on:{year}-{month < 10 ? `0${month}` : month}-{date} {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
    </div>
  );
}

function Task({ todo, onChange, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const save='save',edit='edit',del='delete';
    function onKeyDownchange(e){
      if(e.keyCode == 13){
        if(todo.title===''){
          alert("You're adding a blank list!")}
        else{
          setIsEditing(false)}
      }
    }
    let todoContent;
    if (isEditing) {
      todoContent = (
        <>
          <Input className='input2'
            value={todo.title}
            onChange={e => {
              onChange({
                ...todo,
                title: e.target.value
              });
            }}
            onKeyDown={e=> onKeyDownchange(e)}
            />
          <SaveOutlined title={save}
          className='saveIcon'
          onClick={() => {
            if(todo.title===''){
              alert("You're adding a blank list!")}
            else{
              setIsEditing(false)}
          }}/>
        </>
      );
    } else {
      todoContent = (
        <>
          {todo.title}
          <EditOutlined title={edit}
          className='editIcon'
          onClick={() => setIsEditing(true)}/>
        </>
      );
    }
    return (
        <div className='listDiv'>
          <div className='list'>
            <Checkbox className='checkBox'
                    checked = {todo.done}
                    onChange={e => {
                      onChange({
                        ...todo,
                        done: e.target.checked
                      });
                    }}
            />
            <span className='span3'
                  onDoubleClick={()=>setIsEditing(true)}>
            {todoContent}
            </span>
            <DeleteOutlined title={del}
            className='deleteIcon'
            onClick={() => onDelete(todo.id)}/>
          </div>
          <span>
          {CurrentDateTime()}
          </span>
        </div>
      );
  }