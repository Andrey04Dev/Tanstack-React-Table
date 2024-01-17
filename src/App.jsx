import { useState } from 'react'
import BasicTable from './components/BasicTable'
import SortingTable from './components/SortingTable'
import GlobalFiltering from './components/GlobalFiltering'
import ColumnFiltering from './components/ColumnFiltering'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <BasicTable/> */}
      {/* <SortingTable/> */}
      {/* <GlobalFiltering/> */}
      <ColumnFiltering/>
    </>
  )
}

export default App
