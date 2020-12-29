import {createSlice} from '@reduxjs/toolkit'

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