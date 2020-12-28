import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
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
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={onNameChange}/>
        <input type="email" placeholder="Email" value={email} onChange={onEmailChange}/>
        <input type="password" placeholder="Password" value={password} onChange={onPasswordChange}/>
        <button onClick={() => dispatch(editProfile({name, email, password}))}>Update Profile</button>
      </form>
      <form onSubmit={onDelete}>
        <button onClick={() => dispatch(removeAccount())}>Delete Account</button>
      </form>          
    </div>
    </Layout>
  )
}

export default SettingsPage