
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Modal, FormGroup, FormControl, Button} from 'react-bootstrap'
import Feedback from 'react-bootstrap/esm/Feedback';
import {postTask} from '../features/task/asyncActions'
import Layout from './Layout'
import '../App.css'

const TaskForm = (props) => {
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const onDescriptionChange = (e) => setDescription(e.target.value)
  const hasError = (key) => error === key
  const onAdd = () => {
    if (description === ''){
      setError('task')
    } else {
      dispatch(postTask({description}))
      setDescription('')
    }

  }
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return(
    <Layout>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <FormGroup className="task-form" onSubmit={onSubmit}>
          <FormControl 
            id="input" 
            className={hasError('task') ? "task-form-child is-invalid" : "task-form-child"}
            type="text" 
            placeholder="Task" 
            value={description} 
            onChange={onDescriptionChange}
          />
          <Feedback className={hasError('task') ? "invalid-feedback" : "hidden"}>
            Description required
          </Feedback>
          <Button className="task-form-child add-task-button"  size="lg" type="submit" onClick={onAdd}>Add Task</Button>
        </FormGroup>
      </Modal>
    </Layout>
  )
}

export default TaskForm