import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Navbar, Form, Pagination} from 'react-bootstrap'
import {taskSelector, changeSortBy, changeShow} from '../features/task/taskSlice'
import {fetchTasks} from '../features/task/asyncActions'
import Layout from './Layout'
import Logout from './Logout'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import Pages from './TaskPagination'
import '../App.css'


const TasksPage = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const {showIncomplete, sortBy, limit, skip} = useSelector(taskSelector)
  useEffect(()=>{
    dispatch(fetchTasks(showIncomplete, sortBy, limit, skip))
  },[dispatch, showIncomplete, sortBy, limit, skip])


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
        <div className="filters">
          <div className="filter">
          <label className="switch">
            <input
              name="hide-complete" 
              type="checkbox" 
              onChange={handleShowIncompletedChange}
            />
            <span className="slider round"></span>
          </label>
          <label title className="form-check-label">Hide Complete</label>
          </div>
          <div className="filter">
          <label className="switch">
          <input
            name="sortBy" 
            type="checkbox" 
            onChange={handleSortByChange}
          />
          <span className="slider round"></span>
          </label>
          <label title className="form-check-label">Sort by Date</label>
          </div>
        </div>
        <Button className="add-task-button" onClick={handleShow}>+</Button>
      </Navbar>
      <TaskForm show={show} onHide={handleClose}/>
        <TaskList/>
      <Pagination>
        <Pages/>
      </Pagination>
      
      </Layout>
    </div>
  )
  
}

export default TasksPage