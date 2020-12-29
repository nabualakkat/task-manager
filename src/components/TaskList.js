import { createSelector } from '@reduxjs/toolkit'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {taskSelector, changePages} from '../features/task/taskSlice'

import Task from './Task'

const TaskList = () => {
  const dispatch=useDispatch()
  const {showIncomplete, sortBy, limit, skip, tasks, totalTasks} = useSelector(taskSelector)
  tasks.forEach((task) => {
    console.log(task)
  })
  useEffect(()=> {
    dispatch(fetchTasks(showIncomplete, sortBy, limit, skip))
  },[dispatch, showIncomplete, sortBy, limit, skip, totalTasks])
  return tasks.map((task) => 
    <Task 
      key={task._id} 
      _id={task._id}
      createdAt={task.createdAt} 
      description={task.description} 
      completed={task.completed} 
    />
  )
}

export default TaskList