import { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Dashboard />
    </div>
  )
}

export default App
