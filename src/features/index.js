
import { combineReducers } from 'redux'
import authReducer from './auth/authSlice'
import taskReducer from './task/taskSlice'

export const token = () => ('Bearer ' + window.localStorage.getItem('token'))

export const baseUrl = process.env.REACT_APP_BASE_URL



const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer
})

export default rootReducer