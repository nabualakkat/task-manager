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
import './App.css';

const App = () => {
  const dispatch = useDispatch()
  const {isAuth} = useSelector(authSelector)
  useEffect(()=>{
    dispatch(getAuth())
  },[isAuth])
  return(
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
      </Switch>
    </Router>
  )
}

export default App;
