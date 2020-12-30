import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import Feedback from 'react-bootstrap/esm/Feedback'
import validator from 'validator'
import {editProfile, removeAccount} from '../features/auth/asyncActions'
import {authSelector} from '../features/auth/authSlice'
import Layout from './Layout'


const SettingsPage = (props) => {
  const dispatch = useDispatch()
  const {user} = useSelector(authSelector)
  const [name, setName] = useState(user.user.name)
  const [email, setEmail] = useState(user.user.email)
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const onNameChange = (e) => setName(e.target.value.trim())
  const onEmailChange = (e) => setEmail(e.target.value.toLowerCase().trim())
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
      dispatch(editProfile({
        name,
        email, 
        password 
      }))
      props.history.push('/tasks')
    }
  }

  const onDelete = (e) => {
    e.preventDefault()
    dispatch(removeAccount())
    props.history.push('/')
  }
  return(
    <Layout>
    <div className="form-signin">
      <h1 className="public-header">Manage Account</h1>
      <Form.Group>
        <Form.Control 
          className={hasError('name') ? "form-control is-invalid" : "form-control"} 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={onNameChange}
        />
        <Feedback className={hasError('name') ? "invalid-feedback" : "hidden"}>
          Name required
        </Feedback>
        <Form.Control 
          className={hasError('email') ? "form-control is-invalid" : "form-control"} 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={onEmailChange}
        />
        <Feedback className={hasError('email') ? "invalid-feedback" : "hidden"}>
          Invalid Email
        </Feedback>
        <Form.Control 
          className={hasError('password') ? "form-control is-invalid" : "form-control"} 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={onPasswordChange}
        />
        <Feedback className={hasError('password') ? "invalid-feedback" : "hidden"}>
          {password.toLowerCase().includes('password') ? "Cannot include the word 'password'" : "Password must be at least 7 characters"}
        </Feedback>
        <Button className="submit-button" onClick={onSubmit}>
          Update Profile
        </Button>
      </Form.Group>
      <Form.Group onSubmit={onDelete}>
        <Button className="submit-button" onClick={onDelete}>Delete Account</Button>
      </Form.Group>          
    </div>
    </Layout>
  )
}

export default SettingsPage