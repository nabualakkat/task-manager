import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Button} from 'react-bootstrap'
import {taskSelector} from '../features/task/taskSlice'
import {editTask, fetchTasks, removeTask} from '../features/task/asyncActions'
import DeleteIcon from '../assets/DeleteIcon'
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
          <DeleteIcon/>
        </Button> 
      </div>
    </Card>
  )
}

export default Task