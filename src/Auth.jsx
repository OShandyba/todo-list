import * as React from 'react'
import { useRegistration, useLogin } from './authApi'

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
        <div id='login-registration'>
            <form onSubmit={loginHandler}>
                <h2>Login</h2>
                Name: <input type="text" id="login-name-input"></input>
                Password: <input type="password" id="login-password-input"></input>
                <button className="login">Login</button>
            </form>
            <br />
            <form onSubmit={registrateHandler}>
                <h2>Registration</h2>
                Name: <input type="text" id="registration-name-input"></input>
                Password: <input type="password" id="registration-password-input"></input>
                {/* Confirm password: <input type="password" id="registration-confirm-password-input"></input> */}
                <button className="registration">Registration</button>

            </form>
        </div>
    )
}

export default Auth