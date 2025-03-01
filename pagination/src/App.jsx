
import './App.css'
import Pagination from './components/pagination'
import { useState , useEffect } from 'react'


function App() {

  const [data, setData] = useState([])

  // Fetch Data from API
  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users')
      const jsonData = await response.json()
      setData(jsonData.users)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="App">
      <Pagination data={data} maxPageLength={10} />
    </div>
  )
}

export default App
