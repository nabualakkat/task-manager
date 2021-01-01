import React, { useEffect } from 'react';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {authSelector} from './features/auth/authSlice'
import {getAuth} from './features/auth/asyncActions'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
import Signup from './components/Signup'
import Login from './components/Login';
import TasksPage from './components/Tasks'
import TaskForm from './components/TaskForm'
import SettingsPage from './components/Settings'
import NotFoundPage from './components/NotFoundPage'

const App = () => {
  const dispatch = useDispatch()
  const {isAuth} = useSelector(authSelector)
  useEffect(()=>{
    dispatch(getAuth())
  },[dispatch, isAuth])
  return(
  <>

    <Router>
      <Switch>
        <PublicRoute 
          exact
          isAuth={isAuth} 
          path="/"
          component={Login}/>
        <PublicRoute 
          exact
          isAuth={isAuth} 
          path="/signup"
          component={Signup}/>
        <PrivateRoute 
          exact
          isAuth={isAuth} 
          path="/tasks"
          component={TasksPage}/>
        <PrivateRoute 
          exact
          isAuth={isAuth} 
          path="/add-task"
          component={TaskForm}/>
        <PrivateRoute 
          exact
          isAuth={isAuth} 
          path="/manage-account"
          component={SettingsPage}/>
        <Route path="*" component={NotFoundPage}/>
      </Switch>
    </Router>

  </>
  )
}

export default App;
