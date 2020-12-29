import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Navbar, Form, Pagination} from 'react-bootstrap'
import moment from 'moment'
import {taskSelector, changeSortBy, changeShow} from '../features/task/taskSlice'
import {fetchTasks} from '../features/task/asyncActions'
import Layout from './Layout'
import Logout from './Logout'
import Task from './Task'
import TaskForm from './TaskForm'
import Pages from './TaskPagination'
import '../App.css'


const TasksPage = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const {tasks, showIncomplete, sortBy, limit, skip} = useSelector(taskSelector)
  useEffect(()=>{
    dispatch(fetchTasks(showIncomplete, sortBy, limit, skip))
  },[dispatch, showIncomplete, sortBy, limit, skip])
  const renderTasks = () => {

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

  const handleShowIncompletedChange = (e) =>
  e.target.checked ? dispatch(changeShow('incomplete')) : dispatch(changeShow('')) 
  const handleSortByChange = (e) => 
  e.target.checked ? dispatch(changeSortBy('createdAt:desc')) : dispatch(changeSortBy('completed:desc'))
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <div>
      <Navbar className="main-nav">
        <Navbar.Brand >Task Manager</Navbar.Brand>
        <div className="main-nav-right">
          <Link className="manage-account-button link" to="/manage-account">Manage Account</Link>
          <Logout className="logout-button"/>
        </div>
      </Navbar>
      <Layout>
      <Navbar className="task-nav">
        <div>
          <Form.Check label="Hide Complete" name="hide-complete" type="checkbox" onChange={handleShowIncompletedChange}/>
          <Form.Check label="Sort by Date" name="sortBy" type="checkbox" onChange={handleSortByChange}/>
        </div>
        <Button className="add-task-button" onClick={handleShow}>+</Button>
      </Navbar>
      <TaskForm show={show} onHide={handleClose}/>
      {renderTasks()}
      <Pagination>
        <Pages/>
      </Pagination>
      
      </Layout>
    </div>
  )
  
}

export default TasksPage