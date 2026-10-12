// LoginForm.jsx
import React, { useState } from 'react';
import {sendLoginRequest, sendRegisterRequest} from "../utils/http/authentication.http";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('username', username);
        console.log('password', password);


        // Send the form data to the server
        sendLoginRequest({username, password}).
        then(r => {
            console.log("LOGIN response:", r)
            if(r.error) {
                alert(r.error)
            }
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Login" />
        </form>
    );
};

export default LoginForm;