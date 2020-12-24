import {createSlice} from '@reduxjs/toolkit'

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
    }
  }
})

const baseUrl = 'https://alakkat-task-manager.herokuapp.com'

export const taskSelector = (state) => state.task

export const {getTasks, getTasksSuccess, getTasksFailure} = taskSlice.actions
export default taskSlice.reducer

//Async Get Tasks action

export function fetchTasks() {
  return async dispatch => {
    dispatch(getTasks())
    try{ 
      const response = await fetch(`${baseUrl}/tasks`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
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