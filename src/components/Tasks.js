import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchTasks, taskSelector} from '../features/task/taskSlice'
import {authSelector} from '../features/auth/authSlice'
import '../App.css'


const TasksPage = () => {
  const dispatch = useDispatch()
  const {isAuth} = useSelector(authSelector)
  const {loading, tasks, errorMessage} = useSelector(taskSelector)
  useEffect(()=>{
    dispatch(fetchTasks())
  },[dispatch])
  
  const renderTasks = () => {
    if (loading) return <p>Loading tasks...</p>

    return tasks.map((task) => 
      <div key={task._id}>
        <h2>{task.description}</h2>
        <p>{task.completed.toString()}</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Redux Tasks</h1>
      {renderTasks()}
    </div>
  )
  
}

export default TasksPage