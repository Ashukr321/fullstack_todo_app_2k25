"use client"
import React, { useEffect, useState } from 'react'
import taskService from '../../../services/task/task'

const Page = () => {
  // Create state for tasks
  const [tasks, setTasks] = useState([]);
  console.log(tasks);

  // Destructure getAllTasks from taskService
  const { getAllTasks } = taskService

  useEffect(() => {
    // Fetch all tasks on component mount
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data)
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    }
    fetchTasks()
  }, [getAllTasks])

  return (
    <div>
      <h1>All Tasks</h1>
      {/* Display tasks */}
     
    </div>
  )
}

export default Page
