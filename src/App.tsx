import { useState, useEffect } from 'react'
import './App.css'
import Task from './Task';
import { v4 as uuidv4 } from 'uuid';

export type content = {
  id: string,
  title: string,
  content: string,
  completed: boolean,
}

function App() {
  const [tasksArray, setTasksArray] = useState<Array<{id: string, title: string, content: string, completed: boolean}>>([])

const deleteTask = (key: string) => {
  localStorage.removeItem(key)
  const arrayOfTasks = convertStorageToArray(localStorage)
  setTasksArray(arrayOfTasks)
} 

const convertStorageToArray = (storage: Storage) => {
  const arrayOfTasks: content[] = []
  Object.entries(storage).forEach(([key,val]) => arrayOfTasks.push({...{'id': key}, ...JSON.parse(val)}))
  return arrayOfTasks
}

useEffect(() => {
  if (localStorage.length > 0) {
   const arrayOfTasks = convertStorageToArray(localStorage)
   setTasksArray(arrayOfTasks)
  }
} ,[])

const markCompleted = (id: string, completed: boolean) => {
  const newArray = [...tasksArray]
  const arrayContent = newArray.filter(task => task.id == id).map((item) => {item.completed = completed
    return item
  })[0]
  const stringifiedArray = JSON.stringify(arrayContent)
  localStorage.setItem(id, stringifiedArray)
  const arrayOfTasks = convertStorageToArray(localStorage)
  setTasksArray(arrayOfTasks)
}

const addTask = () => {
  const placeholder =  JSON.stringify({title: '', content: '', completed: false})
  localStorage.setItem(`task-${uuidv4()}`, placeholder)
  const arrayOfTasks = convertStorageToArray(localStorage)
  setTasksArray(arrayOfTasks)
}

const updateTask = (content: content) => {
  const newArray = [...tasksArray]
  newArray.filter(task => task.id == content.id).map(() => {return content})
  const stringifiedArray = JSON.stringify(content)
  localStorage.setItem(content.id, stringifiedArray)
  const arrayOfTasks = convertStorageToArray(localStorage)
  setTasksArray(arrayOfTasks)
}

  return (
    <>
      <h1>Task List</h1>
      <div className="card">
        <button className='button-primary' onClick={() => addTask()}>Add Task</button>
        <ul>
        {tasksArray.map((task) => (
          <Task key={task.id} id={task.id} 
              completed={task.completed}
              markCompleted={markCompleted}
              updateTask={updateTask} 
              title={task.title} 
              content={task.content} 
              deleteTask={deleteTask}/>
        ))}
        </ul>
      </div>
    </>
  )
}

export default App
