import * as React from 'react';
import { useRegistration, useLogin } from './authApi';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, FormControl, TextField } from '@mui/material';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';


function Auth({ actionAfterLogin }) {
    const [registrationResult, callRegistration] = useRegistration()
    const [loginResult, callLogin] = useLogin()

    React.useEffect(() => {
        if (registrationResult != null || loginResult != null) {
            const result = registrationResult ?? loginHandler
            if (result.error == null) {
                actionAfterLogin()
            }
        }
    }, [registrationResult, loginResult])

    const loginHandler = (event) => {
        event.preventDefault()
        const username = document.getElementById('login-name-input').value
        const password = document.getElementById('login-password-input').value
        console.log(username, password)
        const body = {
            username,
            password,
        }
        callLogin({
            body: JSON.stringify(body)
        })
    }

    const registrateHandler = (event) => {
        event.preventDefault()
        const username = document.getElementById('registration-name-input').value
        const password = document.getElementById('registration-password-input').value
        console.log(username, password)
        const body = {
            username,
            password,
        }

        callRegistration({
            body: JSON.stringify(body)
        })

    }

    return (
        <Container maxWidth="md">
            <Box id='login-registration' >
                <Paper elevation={4} sx={{ p: '10px', background: 'linear-gradient(to bottom left, #0066cc -1%, #ff99ff 69%)' }} >
                    <FormControl sx={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', display: 'flex', }} >
                        <Box component="form" sx={{ flexDirection: 'column', display: 'flex' }} noValidate autoComplete="off" onSubmit={loginHandler}>
                            <Typography>Login</Typography>
                            <TextField label="Name:" variant="standard" type="text" id="login-name-input"></TextField>
                            <TextField label="Password:" variant="standard" type="password" id="login-password-input" ></TextField>
                            <Button type="submit" sx={{ width: "200px", margin: '20px' }} label="Login" variant="outlined" className="login">Login</Button>
                        </Box>
                        <Box component="form" sx={{ flexDirection: 'column', display: 'flex' }} noValidate autoComplete="off" onSubmit={registrateHandler}>
                            <Typography>Registration</Typography>
                            <TextField label="Name:" variant="standard" type="text" id="registration-name-input"></TextField>
                            <TextField label="Password:" variant="standard" type="password" id="registration-password-input" ></TextField>
                            <Button type="submit" sx={{ width: "200px", margin: '20px' }} label="Registration" variant="outlined" className="Registration">Registration</Button>
                        </Box>
                    </FormControl>
                </Paper>
            </Box>
        </Container>
    )
}

export default Auth