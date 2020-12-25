import React from 'react'
import {useDispatch} from 'react-redux'
import {editTask, removeTask} from '../features/task/taskSlice'

const Task = (props) => {
  const dispatch = useDispatch()
  return(
    <div>
      <h2>{props.description}</h2>
      <p>{props.completed ? 'complete' : 'incomplete'}</p>
    <input type="checkbox" checked={props.completed} onChange={() => dispatch(editTask(props._id, {completed: props.completed ? false : true}))}/>
    <button onClick={()=>dispatch(removeTask(props._id))}>Remove</button>
    </div>
  )
}

export default Task