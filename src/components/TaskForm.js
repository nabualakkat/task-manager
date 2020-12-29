
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Modal, FormGroup, FormControl,  FormCheck, Button} from 'react-bootstrap'
import {postTask} from '../features/task/taskSlice'
import Layout from './Layout'
import '../App.css'

const TaskForm = (props) => {
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  const onDescriptionChange = (e) => setDescription(e.target.value)
  const onAdd = () => {
    dispatch(postTask({description}))
    setDescription('')
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
          <FormControl id="input" className="task-form-child" type="text" placeholder="Task" value={description} onChange={onDescriptionChange}/>
          <Button className="task-form-child add-task-button"  size="lg" type="submit" onClick={onAdd}>Add Task</Button>
        </FormGroup>
      </Modal>
    </Layout>
  )
}

export default TaskForm