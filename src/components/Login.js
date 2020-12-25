import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../features/auth/authSlice'
import {postLogin} from '../features/auth/asyncActions'
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {loading, isAuth, errorMessage, user } = useSelector(authSelector)


  const onEmailChange = (e) => setEmail(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="form-signin">
      <h1 className="h3 mb-3 fw-normal">Redux App</h1>
      <form onSubmit={onSubmit}>
        <input className="form-control" type="email" value={email} onChange={onEmailChange} placeholder="Email"/>
        <input className="form-control" type="password" value={password} onChange={onPasswordChange} placeholder="Password"/>
        
        <button
          className="form-control" 
          onClick={()=>dispatch(postLogin({
              email, 
              password 
          }))}>
          Login
        </button>
      </form>
      <Link to="/signup">Sign up</Link>
    </div>
  );
}

export default Login;