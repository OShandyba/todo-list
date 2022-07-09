import * as React from 'react'
import TaskList from './TaskList'
import Auth from './Auth'
import { useFetch } from './useFetch'
import './App.css'

// const toDoList = localStorage.hasOwnProperty(TASK_LIST_KEY) ? JSON.parse(localStorage.getItem(TASK_LIST_KEY)) : []
// const TASK_LIST_KEY = 'taskList'


function App() {
    const [tasks, fetchTasks] = useFetch({ url: '/tasks' })

    React.useEffect(() => {
        fetchTasks()
    }, [])

    console.log(tasks)

    return (
        <div>
            {tasks != null ? (
                tasks.error === 'Unauthorized' ? (
                    <Auth />
                ) : (
                    <TaskList tasks={tasks} fetchTasks={fetchTasks} />
                )
            ) : (
                '...loading'
            )}
        </div>
    )
}
export default App