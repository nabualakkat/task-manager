import {createSlice} from '@reduxjs/toolkit'
//Slice
const authSlice = createSlice({
  name:'authSlice',
  initialState: {
    loading: false,
    isAuth: window.localStorage.getItem('token') ? true : false,
    user: null,
    errorMessage: null,
  },
  reducers: {
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
    authenticate: state => {
      state.loading = true
    },
    authenticateSuccess: (state, {payload}) => {
      state.loading = false
      state.user = {...state.user, user: payload}
    },
    authenticateFailure: state => {
      state.loading = false

    },
    logout: state => {
      state.loading = true
    },
    logoutSuccess: state => {
      state.loading = false
      state.isAuth=false
      state.user = null
      state.errorMessage=null
    },
    logoutFailure: state => {
      state.loading = false
      state.isAuth = true
      state.errorMessage = 'Unable to logout'
    },
    updateProfile: state => {
      state.loading = true

    },
    updateProfileSuccess: (state, {payload}) => {
      state.loading = false
      state.user = {...state.user, user: payload}
    },
    updateProfileFailure: state => {
      state.loading = false
      state.errorMessage = 'Unable to update profile'
    },
    deleteAccount: state => {
      state.loading = true
    },
    deleteAccountSuccess: state => {
      state.loading = false
      state.isAuth = false
      state.user = null
    },
    deleteAccountFailure: state => {
      state.loading = false
      state.errorMessage = 'unable to delete account'
    }
  }
})


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
} = authSlice.actions


export default authSlice.reducer

