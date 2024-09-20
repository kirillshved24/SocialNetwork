import React from 'react';

export const Login = () => {
    return (
        <div>
            <h2>Login Page</h2>
            <form>
                <label>
                    Логин:
                    <input type="text" name="username" />
                </label>
                <label>
                    Пароль:
                    <input type="password" name="password" />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
