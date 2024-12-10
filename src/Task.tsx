import { useState, useEffect } from 'react'
import type {content} from './App'
import './taskCard.css'

type TaskProps = {
id: string,
title: string,
content: string,
completed: boolean,
markCompleted: (id: string, completed: boolean) => void,
deleteTask: (id: string) => void,
updateTask: (content: content) => void,
}

const Task = ({id, title, content, completed, markCompleted, deleteTask, updateTask}: TaskProps) => {
const [localContent, setLocalContent] = useState({title: '', content: ''})
const [showContentInput, setShowContentInput] = useState(true)
const [showTitleInput, setShowTitleInput] = useState(true)
const [completedLocal, setCompleted] = useState(completed)
const [showTitleError, setShowTitleError] = useState(false)
const [showContentError, setShowContentError] = useState(false)

const addContent = () => {
    updateTask({title: localContent.title, content: localContent.content, id: id, completed: completed})
    const stringValue = JSON.stringify({title: localContent.title, content: localContent.content})
    localStorage.setItem(id, stringValue)
}

const isCompleted = (id: string) => {
  if (!showTitleError && !showContentError && localContent.title.length > 0  && localContent.content.length > 0) {
    markCompleted(id, !completedLocal)
    setCompleted(!completedLocal)
    showEditInputs(false)
  }
}

useEffect(() => {
  setLocalContent({title: title, content: content})
},[title, content, id])

const showEditInputs = (show: boolean) => {
  if (show) {
    setShowTitleInput(true)
    setShowContentInput(true)
  }
  else {
    setShowTitleInput(false)
    setShowContentInput(false)
  }
}

const basicTitleValidation = (value: string) => {
  if (value.length === 0) {
    setShowTitleError(true)
    setShowTitleInput(true)
  }
  else {
    setShowTitleError(false)
    setShowTitleInput(false)
  }
}

const basicContentValidation = (value: string) => {
  if (value.length === 0) {
    setShowContentError(true)
    setShowContentInput(true)
  }
  else {
    setShowContentError(false)
    setShowContentInput(false)
  }
}

  return (
    <li className='task-card' key={id}>
      <div onBlur={() => addContent()}>
      {showTitleInput ?
      <>
       <label htmlFor={`${id}-title-input`} className='visually-hidden'>Enter a title</label>
       <input
       id={`${id}-title-input`}
       type="text"
       className='input-title'
       value={localContent.title}
       placeholder={'Enter a title'}
       onChange={e => setLocalContent({title: e.target.value, content: localContent.content})}
       onBlur={() => basicTitleValidation(localContent.title)}
       />
       {showTitleError && <p className='error-message'>* Enter a title</p>}
       </> : <h2 className='task-card--heading'>{title}</h2> }
      {showContentInput ?
      <>
      <label htmlFor={`${id}-title-content`} className='visually-hidden'>Enter content</label>
      <textarea
      id={`${id}-title-content`}
      className='input-content'
      value={localContent.content}
      placeholder={'Enter content'}
      onChange={e => setLocalContent({title: localContent.title, content: e.target.value})}
      onBlur={() => basicContentValidation(localContent.content)}
      />
      {showContentError && <p className='error-message'>* Enter a description</p>}
      </> :<p className='task-card--content'>{content}</p> }
      </div>  
      <div className='task-card--footer'>
          <button className='button-secondary' onClick={() => showEditInputs(true)}>Edit</button>
        <div className='button-wrapper'>
           <button className='button-delete' onClick={() => deleteTask(id)}>Delete</button>
          <button className={`${completed ? 'button-complete--inverted' : 'button-complete'}`} onClick={() => (isCompleted(id))}>{completed ? 'Completed' : 'Complete'}</button>
        </div>
      </div>
    </li>
  );
};

export default Task;
