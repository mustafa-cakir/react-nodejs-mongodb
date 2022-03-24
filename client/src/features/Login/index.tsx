import React from 'react';
import Icons from '../../common/components/Icons';
import axios from 'axios';

const Login = () => {
    const onSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        axios
            .post('/api/auth/login', {
                email,
                password,
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="login">
            <form onSubmit={onSubmitHandler}>
                <div className="ui-input-wrapper has-icon mb-3">
                    <Icons name="search" />
                    <input type="email" placeholder="Email" className="ui-input" name="email" required />
                </div>
                <div className="ui-input-wrapper has-icon mb-3">
                    <Icons name="lock" />
                    <input type="password" placeholder="Password" className="ui-input" name="password" required />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
