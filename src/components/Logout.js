import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { authSelector} from '../features/auth/authSlice'
import {postLogout} from '../features/auth/asyncActions'

const Logout = () => {
  const {loading, isAuth, errorMessage, user} = useSelector(authSelector)
  const dispatch = useDispatch()

  return(
    <button onClick={(() => dispatch(postLogout()))}>Logout</button>
  )
}

export default Logout
