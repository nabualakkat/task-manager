import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import {editProfile, removeAccount} from '../features/auth/asyncActions'
import {authSelector} from '../features/auth/authSlice'
import Layout from './Layout'


const SettingsPage = (props) => {
  const dispatch = useDispatch()
  const {user} = useSelector(authSelector)
  const [name, setName] = useState(user.user.name || '')
  const [email, setEmail] = useState(user.user.email || '')
  const [password, setPassword] = useState('')

  const onNameChange = (e) => setName(e.target.value)
  const onEmailChange = (e) => setEmail(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const onSubmit = (e) => {
    e.preventDefault()
    props.history.push("/tasks")
  }
  const onDelete = (e) => {
    e.preventDefault()
    props.history.push('/')
  }
  return(
    <Layout>
    <div className="form-signin">
      <h1 className="public-header">Manage Account</h1>
      <Form onSubmit={onSubmit}>
        <Form.Control type="text" placeholder="Name" value={name} onChange={onNameChange}/>
        <Form.Control type="email" placeholder="Email" value={email} onChange={onEmailChange}/>
        <Form.Control type="password" placeholder="Password" value={password} onChange={onPasswordChange}/>
        <Button className="submit-button" onClick={() => dispatch(editProfile({name, email, password}))}>Update Profile</Button>
      </Form>
      <Form onSubmit={onDelete}>
        <Button className="submit-button" onClick={() => dispatch(removeAccount())}>Delete Account</Button>
      </Form>          
    </div>
    </Layout>
  )
}

export default SettingsPage