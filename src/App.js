import React from 'react';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Signup from './components/Signup'
import './App.css';
import Login from './components/Login';
import TasksPage from './components/Tasks'

const App = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/tasks">
          <TasksPage/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
