import * as React from 'react'
import { useLogout } from './authApi'
import { fetcher } from './useFetch'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


const TASK_LIST_KEY = 'taskList'
const toDoList = localStorage.hasOwnProperty(TASK_LIST_KEY) ? JSON.parse(localStorage.getItem(TASK_LIST_KEY)) : []

function TaskList({ tasks, fetchTasks, user }) {
    const [list, setList] = React.useState(toDoList)
    const [, callLogout] = useLogout()
    const [editing, setEditing] = React.useState({})

    React.useEffect(() => {
        localStorage.setItem(TASK_LIST_KEY, JSON.stringify(list))
    }, [list])


    const addToList = (event) => {
        event.preventDefault()

        const task = {
            title: document.getElementById('task-input').value
        }
        fetcher({
            method: 'POST',
            url: '/task',
            body: JSON.stringify(task)
        }).then(() => {
            fetchTasks()
        })
    }
    console.log(editing)

    const onClickHandler = ({ target }) => {
        const id = target.dataset.taskId

        if (target.classList.contains('edit')) {
            setEditing({ ...editing, [id]: true })
        } else if (target.classList.contains('submit-edit')) {
            const newTaskTitle = document.getElementById(`edit-input-${id}`).value
            fetcher({
                method: 'PATCH',
                url: `/task/${id}`,
                body: JSON.stringify({ title: newTaskTitle })
            }).then(() => {
                fetchTasks()
                setEditing({ [id]: false })
            })
        } else if (target.classList.contains('delete')) {
            fetcher({
                method: 'DELETE',
                url: `/task/${id}`,
            }).then(() => {
                fetchTasks()
            })
        } else if (target.dataset.hasOwnProperty('taskId')) {
            fetcher({
                method: 'PATCH',
                url: `/task/${id}`,
                body: JSON.stringify({ done: true })
            }).then(() => {
                fetchTasks()
            })
        }
    }

    const deleteAll = () => {
        fetcher({
            method: 'DELETE',
            url: `/tasks`
        }).then(() => {
            fetchTasks()
        })
    }

    const logoutHandler = () => {
        callLogout()
    }

    return (

        <div>
            <div>User - {user.username}</div>
            <form onSubmit={addToList}>
                ToDo: <input type="text" id="task-input" />
                <button type="submit">Add</button>
            </form>
            <ul onClick={onClickHandler}>
                {tasks.error == null ? tasks.map((task) => (
                    <li className={task.done ? 'completed' : 'inProgress'} key={task.id} data-task-id={task.id}>
                        Task: {task.title}

                        {
                            editing[task.id] ? (
                                <>
                                    <input type="text" id={`edit-input-${task.id}`} />
                                    <button data-task-id={task.id} className="submit-edit">OK</button>
                                </>

                            ) : (
                                <button data-task-id={task.id} className='edit'>edit</button>
                            )
                        }

                        <button data-task-id={task.id} className='delete'>x</button>

                    </li>)
                ) : <span></span>}
            </ul >
            <div>
                <button onClick={deleteAll} className='clear-list'>Delete all tasks</button>
            </div>
            <button onClick={logoutHandler}>Logout</button>

        </div >
    )
}

export default TaskList