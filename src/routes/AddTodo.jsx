import React from 'react';
import { useState } from 'react';
import { Input } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import './App.css'

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const add='add'
  function onKeyDownchange(e){
      if(e.keyCode == 13){
        if(title===''){
          alert("You're adding a blank list!")}
        else{
          setTitle('');
          onAddTodo(title);
        }    
      }
    }

  return (
    <div className='addtodoContainer'>
      <Input id='inputTodo'className='input1'
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e=> onKeyDownchange(e)}
      />
      <FormOutlined title={add}
      className='addIcon'
      onClick={() => {
        if(title===''){
          alert("You're adding a blank list!")}
        else{
          setTitle('');
          onAddTodo(title);
        }
      }}/>
    </div>
  )
}