import {
  createUser,
  createUserSuccess, 
  createUserFailure, 
  login, 
  loginSuccess, 
  loginFailure,
  authenticate,
  authenticateSuccess,
  authenticateFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,
  deleteAccount,
  deleteAccountSuccess,
  deleteAccountFailure
} from './authSlice'
import {baseUrl, token} from '../index'


//Async Signup action
export function postUser(formData) {
  return async dispatch => {
    dispatch(createUser())
    try{
      const response = await fetch(`${baseUrl}/users`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.status === 201){
        dispatch(createUserSuccess(data))
        data.token && localStorage.setItem('token', data.token)
      }else{
        throw new Error()
      }
    }catch(e){
      dispatch(createUserFailure('Bad Request'))
    }
  }
}

//Async Login action
export function postLogin(formData) {
  return async dispatch => {
    dispatch(login())
    try{      
      const response = await fetch(`${baseUrl}/users/login`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    if (response.status === 200){
      dispatch(loginSuccess(data))
      data.token && localStorage.setItem('token', data.token)
    }else{
      throw new Error()
    }
    }catch(e) {
      dispatch(loginFailure('Login Failed'))
    }
  }
}

//Async Authenticate Action
export function getAuth(){
  return async dispatch => {
    dispatch(authenticate())
    try{
      const response = await fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': token(),
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()

      if (response.status === 200) {
        dispatch(authenticateSuccess(data))
      }else{
        dispatch(authenticateFailure())
      }
    }catch (e) {
      dispatch(authenticateFailure())
    }
  }
}

//Async Logout Action
export function postLogout() {
  return async dispatch => {
    dispatch(logout())
    try{
      const response = await fetch(`${baseUrl}/users/logout`,{
        method: 'POST',
        headers: {
          'Authorization': token()
        }
      })
      if(response.status === 200) {
        
        dispatch(logoutSuccess())
        window.localStorage.removeItem('token')
        
      }else{
        throw new Error()
      }

    }catch (e) {
      dispatch(logoutFailure())
    }
  }
}

//Async Edit Profile Action
export function editProfile(formData) {
  return async dispatch => {
    dispatch(updateProfile())
    try{
      const response = await fetch(`${baseUrl}/users/me`,{
        method: 'PATCH',
        headers: {
          'Authorization': token(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if(response.status === 200) {
        dispatch(updateProfileSuccess(data))
      }else{
        throw new Error()
      }
    }catch (e) {
      dispatch(updateProfileFailure())
    }
  }
}

//Async Remove Account Action
export function removeAccount() {
  return async dispatch => {
    dispatch(deleteAccount())
    try{
      const response = await fetch(`${baseUrl}/users/me`,{
        method: 'DELETE',
        headers: {
          'Authorization': token(),
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      console.log(data)
      if(response.status === 200) {
        window.localStorage.removeItem('token')
        dispatch(deleteAccountSuccess())
      }else{
        throw new Error()
      }
    }catch (e) {
      dispatch(deleteAccountFailure())
    }
  }
}

