import {createSlice} from '@reduxjs/toolkit'
//Slice
const authSlice = createSlice({
  name:'authSlice',
  initialState: {
    loading: false,
    isAuth: false,
    user: null,
    errorMessage: null,
  },
  reducers: {
    //Create User
    createUser: state => {
      state.loading = true
    },
    createUserSuccess: (state, {payload}) => {
      state.user = payload
      state.errorMessage = null
      state.isAuth=true
      state.loading = false
    },
    createUserFailure: (state, {payload}) => {
      state.errorMessage = payload
      state.isAuth = false
      state.loading = false
    },
    //Login
    login: state => {
      state.loading = true
    },
    loginSuccess: (state, {payload}) => {
      state.user = payload
      state.isAuth = true
      state.errorMessage = null
      state.loading = false
    },
    loginFailure: (state, {payload}) => {
      state.errorMessage = payload
      state.isAuth = false
      state.loading = false
    },
    //Check if Authenticated
    authenticate: state => {
      state.loading = true
    },
    authenticateSuccess: state => {
      state.loading = false
      state.isAuth = true
    },
    authenticateFailure: state => {
      state.loading = false
      state.isAuth = false
    }
  }
})

const baseUrl = 'https://alakkat-task-manager.herokuapp.com'

//Selector
export const authSelector = (state) => state.auth

export const {
  createUser,
  createUserSuccess, 
  createUserFailure, 
  login, 
  loginSuccess, 
  loginFailure,
  authenticate,
  authenticateSuccess,
  authenticateFailure
} = authSlice.actions


export default authSlice.reducer

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
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        dispatch(authenticateSuccess())
      }else{
        authenticateFailure()
      }
    }catch (e) {
      authenticateFailure()
    }
  }
}