
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {taskSelector, postTask} from '../features/task/taskSlice'

const TaskForm = (props) => {
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const dispatch = useDispatch()

  const onDescriptionChange = (e) => setDescription(e.target.value)
  const onCompletedChange = (e) => setCompleted(e.target.checked)
  const onSubmit = (e) => {
    e.preventDefault()
    props.history.push('/tasks') 
  }
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Task" value={description} onChange={onDescriptionChange}/>
        <input type="checkbox" id="completed" name="completed" value={completed} onChange={onCompletedChange}/>
        <label for="completed"> Completed? </label>
        <button type="submit" onClick={() => dispatch(postTask({description, completed}))}>Add Task</button>
      </form>
    </div>
  )
}

export default TaskForm