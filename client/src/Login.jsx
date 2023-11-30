import { useState } from 'react';
import useAuth from './UserContext';
import axios from 'axios';

const Login = () => {
    const { login } = useAuth();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/user/login', {
                userId,
                password,
            });

            const { token, user } = response.data;

            // Save token and user data using the login function from the context
            login(user, token);

            // Redirect the user or perform any other action after successful login
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error (display error message, etc.)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <div className="mb-4">
                    <label htmlFor="userId" className="block text-gray-700 font-semibold mb-1">User ID</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={handleUserIdChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
