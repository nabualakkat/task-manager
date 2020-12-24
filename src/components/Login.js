import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { postLogin, authSelector } from '../features/auth/authSlice'
import '../App.css';
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
    <div className="App">
      <h1>Redux App</h1>
      <form onSubmit={onSubmit}>
        <input type="email" value={email} onChange={onEmailChange} placeholder="Email"/>
        <input type="password" value={password} onChange={onPasswordChange} placeholder="Password"/>
        
        <button 
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