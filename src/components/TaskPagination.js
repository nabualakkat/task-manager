import React, {useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {loadMore, taskSelector} from '../features/task/taskSlice'
import {fetchTasks} from '../features/task/asyncActions'
import {Pagination} from 'react-bootstrap'
import '../App.css'

const Pages = () => {
  const dispatch = useDispatch()
  const {showIncomplete,sortBy, skip, totalTasks, limit} = useSelector(taskSelector, shallowEqual)
  const totalPages = limit >= totalTasks ? 0 : Math.ceil(totalTasks/limit)
  useEffect(()=> {
    dispatch(fetchTasks(showIncomplete, sortBy, limit, skip))
  },[dispatch, limit, skip])
  let items = []
  for(let number = 1; number <= totalPages; number ++) {
    items.push(
      <Pagination.Item onClick={() => dispatch(loadMore(number))} key={number} active={(skip+limit)/limit === number ? true : false}>
        {number}
      </Pagination.Item>
    )
  }
  return items
}

export default Pages