// RegisterForm.jsx
import React, { useState } from 'react';
import {sendRegisterRequest} from "../utils/http/authentication.http";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('username', username);
        console.log('password', password);
        console.log('email', email);
        sendRegisterRequest({username, password, email}).
        then(r => {
            console.log("register response:", r)
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
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Register" />
        </form>
    );
};

export default RegisterForm;