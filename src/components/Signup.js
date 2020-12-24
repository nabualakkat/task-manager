import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { postUser, authSelector } from '../features/auth/authSlice'
import '../App.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {loading, isAuth, errorMessage, user } = useSelector(authSelector)
  const onNameChange = (e) => setName(e.target.value.trim())
  const onEmailChange = (e) => setEmail(e.target.value.trim())
  const onPasswordChange = (e) => setPassword(e.target.value)
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="App">
      <h1>Redux App</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={name} onChange={onNameChange} placeholder="Name"/>
        <input type="email" value={email} onChange={onEmailChange} placeholder="Email"/>
        <input type="password" value={password} onChange={onPasswordChange} placeholder="Password"/>
        <button 
        onClick={()=>dispatch(postUser({
            name, 
            email, 
            password 
        }))}>
          Sign up
        </button>
      </form>

      <Link to="/">Already have an account?</Link>
    </div>
  );
}

export default Signup;

