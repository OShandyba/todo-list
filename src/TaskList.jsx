import * as React from 'react'
import { useLogout } from './authApi'

const TASK_LIST_KEY = 'taskList'
const toDoList = localStorage.hasOwnProperty(TASK_LIST_KEY) ? JSON.parse(localStorage.getItem(TASK_LIST_KEY)) : []

function TaskList({ tasks }) {
    const [list, setList] = React.useState(toDoList)
    const [, callLogout] = useLogout()
    console.log(tasks)

    React.useEffect(() => {
        localStorage.setItem(TASK_LIST_KEY, JSON.stringify(list))
    }, [list])


    const addToList = (event) => {
        event.preventDefault()

        const task = {
            title: document.getElementById('task').value,
        }
            ({
                task: 'title',
                id: 1
            })
        setList((list) => list.concat({ task, id: list.length && list[list.length - 1].id + 1 }))
    }

    const doneTask = ({ target }) => {
        const id = +target.dataset.taskId

        if (target.classList.contains('edit')) {
            setList(list.map(el => (
                id === el.id ? { ...el, edit: true } : el
            )))
        } else if (target.classList.contains('submit-edit')) {
            const editedTask = document.getElementById(`edit-input-${id}`).value
            setList(list.map(el => (
                id === el.id ? { ...el, task: editedTask, edit: false } : el

            )))
        } else if (target.classList.contains('delete')) {
            setList(list.filter((el) => el.id !== id))
        } else if (target.dataset.hasOwnProperty('taskId')) {
            setList(list.map((el) => (
                id === el.id ? { ...el, done: !el.done } : el
            )))
        }
    }

    const deleteAll = () => setList([])

    const logoutHandler = (event) => {
        callLogout()
    }

    return (
        <div>
            <div>User - username</div>
            <form onSubmit={addToList}>
                ToDo: <input type="text" id="task" />
                <button type="submit">Add</button>
            </form>
            <ul onClick={doneTask}>
                {list.map((el) => (
                    <li className={el.done ? 'completed' : 'inProgress'} key={el.id} data-task-id={el.id}>
                        Task: {el.task}

                        {
                            el.edit ? (
                                <>
                                    <input type="text" id={`edit-input-${el.id}`} />
                                    <button data-task-id={el.id} className="submit-edit">OK</button>
                                </>
                            ) : (
                                <button data-task-id={el.id} className='edit'>edit</button>
                            )
                        }

                        <button data-task-id={el.id} className='delete'>x</button>

                    </li>)
                )
                }
            </ul >
            <div>
                <button onClick={deleteAll} className='clear-list'>Delete all tasks</button>
            </div>
            <button onClick={logoutHandler}>Logout</button>

        </div >
    )
}

export default TaskList