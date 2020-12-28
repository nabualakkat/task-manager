import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from 'react-bootstrap'
import { authSelector} from '../features/auth/authSlice'
import {postLogout} from '../features/auth/asyncActions'

const Logout = () => {
  const {loading, isAuth, errorMessage, user} = useSelector(authSelector)
  const dispatch = useDispatch()

  return(
    <Button className="logout-button" variant="primary" onClick={(() => dispatch(postLogout()))}>Logout</Button>
  )
}

export default Logout
