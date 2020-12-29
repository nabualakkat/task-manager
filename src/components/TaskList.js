import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import {taskSelector} from '../features/task/taskSlice'
import {fetchTasks} from '../features/task/asyncActions'

import Task from './Task'

const TaskList = () => {
  const dispatch=useDispatch()
  const {showIncomplete, sortBy, limit, skip, tasks, totalTasks} = useSelector(taskSelector)
  useEffect(()=> {
    dispatch(fetchTasks(showIncomplete, sortBy, limit, skip))
  },[dispatch, showIncomplete, sortBy, limit, skip, totalTasks])
  return tasks.map((task) => 
    <Task 
      key={task._id} 
      _id={task._id}
      createdAt= {moment(task.createdAt).format("MMM Do, YYYY - h:mm a")  } 
      description={task.description} 
      completed={task.completed} 
    />
  )
}

export default TaskList