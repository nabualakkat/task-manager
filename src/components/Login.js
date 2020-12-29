import React, {useState} from 'react';
import { useDispatch} from 'react-redux'
import {FormGroup, FormControl, Button} from 'react-bootstrap'
import {postLogin} from '../features/auth/asyncActions'
import { Link } from 'react-router-dom';
import validator from 'validator'
import '../App.css'
import Feedback from 'react-bootstrap/esm/Feedback';
import Layout from './Layout'


const Login = () => {
  //Hooks
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  //Handlers
  const onEmailChange = (e) => setEmail(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const hasError = (key) => errors.indexOf(key) !== -1
  const onSubmit = (e) => {
    e.preventDefault()
    let errors = []
    if (!validator.isEmail(email)) {
      errors.push("email")
    }
    if (password.length < 7 || password.toLowerCase().includes('password')) {
      errors.push("password")
    }
    setErrors(errors)
    if (errors.length === 0){
      dispatch(postLogin({
        email, 
        password 
      }))
    }  
  }
  return (
    <Layout>
    <div className="form-signin">
      <FormGroup onSubmit={onSubmit}>
        <h1 className="public-header">Task Manager</h1>
        <FormControl className={hasError('email') ? "form-control is-invalid" : "form-control"} type="email" value={email} onChange={onEmailChange} placeholder="Email"/>
        <Feedback className={hasError('email') ? "invalid-feedback" : "hidden"}>
          Invalid Email
        </Feedback>
        <FormControl className={hasError('password') ? "form-control is-invalid" : "form-control"} type="password" value={password} onChange={onPasswordChange} placeholder="Password"/>
        <Feedback className={hasError('password') ? "invalid-feedback" : "hidden"}>
          Password must be at least 7 characters and not include the word 'password'
        </Feedback>
        <Button
          className="submit-button" 
          onClick={onSubmit}
          variant="primary"
          size="lg"
          block>
          Login
        </Button>
      </FormGroup>
      <Link className="link" to="/signup">Sign up</Link>
    </div>
    </Layout>
  );
}

export default Login;