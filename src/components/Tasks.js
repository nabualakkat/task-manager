import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchTasks, editTask, taskSelector} from '../features/task/taskSlice'
import {authSelector} from '../features/auth/authSlice'
import '../App.css'
import Logout from './Logout'
import Task from './Task'


const TasksPage = () => {
  const [completed, setCompleted] = useState(false)
  const dispatch = useDispatch()
  const {isAuth} = useSelector(authSelector)
  const {loading, tasks, errorMessage} = useSelector(taskSelector)
  useEffect(()=>{
    dispatch(fetchTasks())
  },[dispatch])
  
  const renderTasks = () => {

    return tasks.map((task) => 
      <Task key={task._id} _id={task._id} description={task.description} completed={task.completed} />
    )
  }
  return (
    <div>
      <h1>Redux Tasks</h1>
      <Link to="/add-task">+</Link>
      <Logout/>
      {renderTasks()}
    </div>
  )
  
}

export default TasksPage