import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Button} from 'react-bootstrap'
import {taskSelector} from '../features/task/taskSlice'
import {editTask, fetchTasks, removeTask} from '../features/task/asyncActions'
import '../App.css'

const Task = (props) => {

  const dispatch = useDispatch()
  const {showIncomplete, sortBy, limit, skip} = useSelector(taskSelector)
  useEffect(()=>{
    dispatch(fetchTasks(showIncomplete, sortBy, limit, skip))
  },[dispatch, props.completed, limit])
  const onRemoveHandler = () => {
    dispatch(removeTask(props._id))
    dispatch(fetchTasks(showIncomplete, sortBy, limit, skip))
  }
  return(
    <Card className="task-card-layout" style={{ width: '100%' }}>
      <div className="task-card-text-container">
        <Card.Title>{props.description}</Card.Title>
        
        <Card.Subtitle>{props.createdAt}</Card.Subtitle>
      </div>
      <div className="task-card-right">
        <Card.Text>{props.completed ? 'complete' : 'incomplete'}</Card.Text>
        <label className="switch">
          <input className="task-card-checkbox" type="checkbox" checked={props.completed} onChange={() => dispatch(editTask(props._id, {completed: props.completed ? false : true}))}/>
          <span className="slider round"></span>
        </label>
        <Button className="delete-button" size="lg" onClick={onRemoveHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>  
        </Button> 
      </div>
    </Card>
  )
}

export default Task