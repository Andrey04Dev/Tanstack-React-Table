import { useState } from 'react'
import BasicTable from './components/BasicTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BasicTable/>
    </>
  )
}

export default App
