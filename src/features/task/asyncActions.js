import { token, baseUrl } from '../index'
import {
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
getTotalTasks,
getTotalTasksSuccess,
getTotalTasksFailure
} from './taskSlice'

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