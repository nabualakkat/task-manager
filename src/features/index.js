
import { combineReducers } from 'redux'
import authReducer from './auth/authSlice'
import taskReducer from './task/taskSlice'

export const token = () => ('Bearer ' + window.localStorage.getItem('token'))

export const baseUrl = 'https://alakkat-task-manager.herokuapp.com'


const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer
})

export default rootReducer