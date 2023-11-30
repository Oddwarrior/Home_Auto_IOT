import { useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Login from './Login'
import Home from './Home'
import useAuth from './UserContext';

function App() {
  const { token } = useAuth();
  return (
    <MantineProvider>
      <div >
        {token && <Home />}
        {!token && <Login />}
      </div>
    </MantineProvider>
  )
}

export default App
