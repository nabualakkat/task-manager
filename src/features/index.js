
import { combineReducers } from 'redux'

import authReducer from './auth/authSlice'
import taskReducer from './task/taskSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer
})

export default rootReducer