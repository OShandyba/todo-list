import * as React from 'react'
import { useLogout } from './authApi'
import { fetcher } from './useFetch'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';



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
        <Container maxWidth="lg">
            <Box sx={{ position: 'relative' }} >
                <Paper elevation={4} sx={{ width: '100%', padding: '10px', background: 'linear-gradient(to bottom left, #0066cc -1%, #ff99ff 69%)' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            User - {user.username}
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={logoutHandler} variant="contained" sx={{ ml: '180px', color: 'black', background: 'linear-gradient(to bottom left, #9900cc 14%, #cc99ff 97%)' }} >Logout</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Box onSubmit={addToList} component="form" sx={{}} noValidate autoComplete="off">
                                <Grid >
                                    <TextField label="Task to do" id="task-input" type="text" multiline maxRows={6} sx={{ width: '100%' }} InputLabelProps={{ shrink: true, }} />
                                </Grid>
                                <Grid item xs={3} sx={{ paddingTop: '5px' }}>
                                    <Button type="submit" variant="contained">add</Button>
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid >
                            <Grid onClick={onClickHandler}>
                                <List sx={{ paddingLeft: '10px' }}>
                                    {tasks.error == null ? tasks.map((task) => (
                                        <ListItem key={task.id} sx={{ display: 'flex' }}>
                                            {
                                                editing[task.id] ? (
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <TextField sx={{ width: '100%' }} multiline maxRows={6} defaultValue={`${task.title}`} type="text" id={`edit-input-${task.id}`} label="Editing" variant="outlined" />
                                                        <Button data-task-id={task.id} className="submit-edit" sx={{ mt: '5px', py: '2px', px: '8px' }} variant="contained" >OK</Button>
                                                    </Box>
                                                ) : (
                                                    <>
                                                        <Box sx={{ width: '100%', textDecoration: task.done ? 'line-through' : 'none' }} data-task-id={task.id} >
                                                            {task.title}
                                                        </Box>
                                                        <Button sx={{ color: 'black' }} data-task-id={task.id} className='edit'>edit</Button>
                                                    </>
                                                )
                                            }

                                            <Button sx={{ color: 'black', alignItems: 'justify' }} data-task-id={task.id} className='delete'>x</Button>
                                        </ListItem>)
                                    ) : <Box component="span" m="{1}"></Box>}

                                </List>
                            </Grid>

                        </Grid>

                        <Grid item xs={12}>
                            <Button onClick={deleteAll} className='clear-list' variant="contained">Dellete all tasks</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
        // <div>
        //     <div>User - {user.username}</div>
        //     <form onSubmit={addToList}>
        //         ToDo: <input type="text" id="task-input" />
        //         <button type="submit">Add</button>
        //     </form>
        //     <ul onClick={onClickHandler}>
        //         {tasks.error == null ? tasks.map((task) => (
        //             <li className={task.done ? 'completed' : 'inProgress'} key={task.id} data-task-id={task.id}>
        //                 Task: {task.title}

        //                 {
        //                     editing[task.id] ? (
        //                         <>
        //                             <input type="text" id={`edit-input-${task.id}`} />
        //                             <button data-task-id={task.id} className="submit-edit">OK</button>
        //                         </>

        //                     ) : (
        //                         <button data-task-id={task.id} className='edit'>edit</button>
        //                     )
        //                 }

        //                 <button data-task-id={task.id} className='delete'>x</button>

        //             </li>)
        //         ) : <span></span>}
        //     </ul >
        //     <div>
        //         <button onClick={deleteAll} className='clear-list'>Delete all tasks</button>
        //     </div>
        //     <button onClick={logoutHandler}>Logout</button>

        // </div >
    )
}

export default TaskList