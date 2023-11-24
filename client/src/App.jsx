import { useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Login from './Login'
import Home from './Home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider>
      <div >
        <Home />
      </div>
    </MantineProvider>
  )
}

export default App
