
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Modal, FormGroup, FormControl,  FormCheck, Button} from 'react-bootstrap'
import {postTask} from '../features/task/taskSlice'
import Layout from './Layout'
import '../App.css'

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
    <Layout>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <FormGroup className="task-form" onSubmit={onSubmit}>
          <FormControl className="task-form-child" type="text" placeholder="Task" value={description} onChange={onDescriptionChange}/>
          <FormCheck className="task-form-child"  label="Complete" type="checkbox" id="completed" name="completed" value={completed} onChange={onCompletedChange}/>
          <Button className="task-form-child"  size="lg" type="submit" onClick={() => dispatch(postTask({description, completed}))}>Add Task</Button>
        </FormGroup>
      </Modal>
    </Layout>
  )
}

export default TaskForm