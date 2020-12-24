import {createSlice} from '@reduxjs/toolkit'
import { token, baseUrl } from '../index'

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState: {
    loading: false,
    tasks: [],
    errorMessage: null
  },
  reducers: {
    getTasks: state => {
      state.loading = true
    },
    getTasksSuccess: (state, {payload}) => {
      state.tasks = payload
      state.loading = false
    },
    getTasksFailure: state => {
      state.loading = false
      state.errorMessage = 'Failed to retreive tasks'
    },
    addTask: state => {
      state.loading = true
    },
    addTaskSuccess: (state, {payload}) => {
      state.loading = false
      state.tasks.push(payload)
    },
    addTaskFailure: (state, {payload}) => {
      state.loading = false
      state.errorMessage = payload 
    },
    updateTask: state => {
      state.loading = true
    },
    updateTaskSuccess: (state, {payload}) => {
      state.loading = false
      state.tasks = state.tasks.map((task) => {
        return task._id === payload._id ? payload : task 
      })
    },
    updateTaskFailure: state => {
      state.loading = false
      state.errorMessage = 'Unable to edit'
    }
  }
})


export const taskSelector = (state) => state.task

export const {
  getTasks, 
  getTasksSuccess, 
  getTasksFailure,
  addTask,
  addTaskSuccess,
  addTaskFailure,
  updateTask,
  updateTaskSuccess,
  updateTaskFailure
} = taskSlice.actions

export default taskSlice.reducer

//Async Get Tasks action

export function fetchTasks() {
  return async dispatch => {
    dispatch(getTasks())
    try{ 
      const response = await fetch(`${baseUrl}/tasks`, {
        method: 'GET',
        headers: {
          'Authorization': token(),
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (response.status === 200){
        dispatch(getTasksSuccess(data))
      }else{
        throw new Error()
      }
    }catch(e) {
      dispatch(getTasksFailure())
    }
  }
}

//Async Add Task Action
export function postTask(formData) {
  return async dispatch => {
    dispatch(addTask())
    try{
      const response = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': token(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.status === 201) {
        dispatch(addTaskSuccess(data))
      }else{
        throw new Error()
      }
    }catch (e) {
      dispatch(addTaskFailure())
    } 
  }
}

//Async Edit Task Action
export function editTask(id, formData) {
  return async dispatch => {
    dispatch(updateTask())
    try{
      const response = await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': token(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.status === 200){
        dispatch(updateTaskSuccess(data))
      }else{
        throw new Error()
      }    
    }catch (e) {
      dispatch(updateTaskFailure())
    }
  }
}