// UserContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check for saved user and token in localStorage or cookies on page load
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');

        if (savedToken) {
            // setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        // Save user and token to localStorage or cookies upon successful login
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        // Clear user and token from localStorage or cookies upon logout
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, token, login, logout }}>
            {props.children}
        </UserContext.Provider>
    );
};

const useAuth = () => {
    return useContext(UserContext);
};

export default useAuth;

