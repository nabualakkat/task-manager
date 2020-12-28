import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Nav, Navbar, Form, Pagination, Container, Row, Col} from 'react-bootstrap'
import {fetchTasks, taskSelector, changeSortBy, changeShow, loadMore} from '../features/task/taskSlice'
import {authSelector} from '../features/auth/authSlice'
import Layout from './Layout'
import Logout from './Logout'
import Task from './Task'
import TaskForm from './TaskForm'
import '../App.css'


const TasksPage = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const {isAuth} = useSelector(authSelector)
  const {loading, tasks, showIncomplete, sortBy, limit, skip, totalPages, errorMessage,} = useSelector(taskSelector)
  useEffect(()=>{
    dispatch(fetchTasks(showIncomplete, sortBy, limit, skip))
  },[dispatch, showIncomplete, sortBy, limit, skip])
  const renderPagination = () => {
    let items = []
    for(let number = 1; number <= totalPages; number ++) {
      items.push(
        <Pagination.Item onClick={() => dispatch(loadMore(number))} key={number}>
          {number}
        </Pagination.Item>
      )
    }
    return items
  }
  const renderTasks = () => {

    return tasks.map((task) => 
      <Task 
        key={task._id} 
        _id={task._id} 
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
          <Form.Check label="Show Incomplete" name="show-incomplete" type="checkbox" onChange={handleShowIncompletedChange}/>
          <Form.Check label="Sort by Date" name="sortBy" type="checkbox" onChange={handleSortByChange}/>
        </div>
        <Button variant="secondary" onClick={handleShow}>+</Button>
      </Navbar>
      <TaskForm show={show} onHide={handleClose}/>
      {renderTasks()}
      <Pagination>{renderPagination()}</Pagination>
      
      </Layout>
    </div>
  )
  
}

export default TasksPage