import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import { FormControl, FormGroup, Button } from 'react-bootstrap'
import {postUser} from '../features/auth/asyncActions'
import { Link } from 'react-router-dom';
import Feedback from 'react-bootstrap/esm/Feedback';
import validator from 'validator'
import Layout from './Layout'
import '../App.css'


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const dispatch = useDispatch()
  const onNameChange = (e) => setName(e.target.value.trim())
  const onEmailChange = (e) => setEmail(e.target.value.trim())
  const onPasswordChange = (e) => setPassword(e.target.value)
  const hasError = (key) => errors.indexOf(key) !== -1
  const onSubmit = (e) => {
    e.preventDefault()
    let errors = []
    if (name === '') {
      errors.push("name")
    }
    if (!validator.isEmail(email)) {
      errors.push("email")
    }
    if (password.length < 7 || password.toLowerCase().includes('password')) {
      errors.push("password")
    }
    setErrors(errors)
    if (errors.length === 0){
      dispatch(postUser({
        name,
        email, 
        password 
      }))
    }  
  }
  return (
    <Layout>
    <div className="form-signin">
      <h1 className="public-header">Task Manager</h1>
      <FormGroup onSubmit={onSubmit}>
        <FormControl className={hasError('name') ? "form-control is-invalid" : "form-control"} type="text" value={name} onChange={onNameChange} placeholder="Name"/>
        <Feedback className={hasError('name') ? "invalid-feedback" : "hidden"}>
          Name required
        </Feedback>
        <FormControl className={hasError('email') ? "form-control is-invalid" : "form-control"} type="email" value={email} onChange={onEmailChange} placeholder="Email"/>
        <Feedback className={hasError('email') ? "invalid-feedback" : "hidden"}>
          Invalid Email
        </Feedback>
        <FormControl className={hasError('password') ? "form-control is-invalid" : "form-control"} type="password" value={password} onChange={onPasswordChange} placeholder="Password"/>
        <Feedback className={hasError('password') ? "invalid-feedback" : "hidden"}>
          Password must be at least 6 characters and cannot include "password"
        </Feedback>
        <Button 
        className="submit-button"
        onClick={onSubmit}
        variant="primary"
        size="lg"
        block>
          Sign up
        </Button>
      </FormGroup>

      <Link className="link" to="/">Already have an account?</Link>
    </div>
    </Layout>
  );
}

export default Signup;

