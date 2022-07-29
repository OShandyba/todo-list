import * as React from 'react'
import TaskList from './TaskList'
import Auth from './Auth'
import { useFetch } from './useFetch'
import './App.css'

function App() {
    const [tasks, fetchTasks] = useFetch({ url: '/tasks' })
    const [user, fetchUser] = useFetch({ url: '/user' })

    const reload = () => {
        fetchUser()
        fetchTasks()
    }
    React.useEffect(() => {
        reload()
    }, [])

    console.log(tasks, user)

    return (
        <div>
            {user != null && tasks != null ? (
                user.error === 'Unauthorized' ? (
                    <Auth actionAfterLogin={reload} />
                ) : (
                    <TaskList user={user} tasks={tasks} fetchTasks={fetchTasks} />
                )
            ) : (
                '...loading'
            )}
        </div>
    )
}
export default App