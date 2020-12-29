import {createSlice} from '@reduxjs/toolkit'
import { token, baseUrl } from '../index'
import {useSelector} from 'react-redux'
import {createSelector} from 'reselect'

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState: {
    loading: false,
    tasks: [],
    errorMessage: null,
    limit: 10,
    skip: 0,
    totalTasks: 1,
    totalPages: 1,
    sortBy: 'completed:desc',
    showIncomplete: ''
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
    },
    deleteTask: state => {
      state.loading = true
    },
    deleteTaskSuccess: (state, {payload}) => {
      state.loading = false
      state.tasks = state.tasks.filter((task) => {
        return task._id !== payload._id
      })
    },
    deleteTaskFailure: state => {
      state.loading = false
      state.errorMessage = 'Unable to delete'
    },
    changeSortBy: (state, {payload}) => {
      state.sortBy = payload
    },
    changeShow: (state, {payload}) => {
      state.showIncomplete = payload
    },
    loadMore: (state, {payload}) => {
      state.skip = (payload-1)*state.limit
    },
    getTotalTasks: state => state.loading = true,

    getTotalTasksSuccess: (state, {payload}) => {
      state.loading = false
      state.totalTasks = payload
    },
    getTotalTasksFailure: state => state.errorMessage = 'unable to fetch data',
    changePages: (state) => {
      state.totalPages = state.limit > state.totalTasks ? 1 : Math.ceil(state.totalTasks/state.limit)
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
  updateTaskFailure,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFailure,
  changeSortBy,
  changeShow,
  loadMore,
  changePages,
  getTotalTasks,
  getTotalTasksSuccess,
  getTotalTasksFailure
} = taskSlice.actions

export default taskSlice.reducer

//Async Get Tasks action

export function getCount() {
  return async dispatch => {
    dispatch(getTotalTasks())
    try{
        const res = await fetch(`${baseUrl}/tasks/count`, {
          method: 'GET',
          headers: {
            'Authorization': token(),
            'Content-Type': 'application/json'
          }
        })
        const pages = await res.json()
        if(res.status === 200){
          dispatch(getTotalTasksSuccess(pages.count))
        }else{
          throw new Error()
        } 
    }catch(e) {
      dispatch(getTotalTasksFailure())
    }
  }
}


export function fetchTasks(showIncomplete, sortBy, limit, skip) {
  const url = `${baseUrl}/tasks?${showIncomplete === 'incomplete' && 'completed=false'}${sortBy === 'createdAt:desc' ? '&sortBy=createdAt:desc' : '&sortBy=completed:asc'}&limit=${limit}&skip=${skip}`
  return async dispatch => {
    dispatch(getTasks())
    try{
      const res = await fetch(`${baseUrl}/tasks/count`, {
        method: 'GET',
        headers: {
          'Authorization': token(),
          'Content-Type': 'application/json'
        }
      })
      const pages = await res.json()
      if(res.status === 200){
        dispatch(getTotalTasksSuccess(pages.count))
      }else{
        throw new Error()
      }
      const response = await fetch(url, {
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

//Async Remove Task Action
export function removeTask(id) {
  return async dispatch => {
    dispatch(deleteTask())
    try{
      const response = await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token(),
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        dispatch(deleteTaskSuccess(data))
      }else{
        throw new Error()
      }
    }catch(e) {
      dispatch(deleteTaskFailure())
    }
  }
}