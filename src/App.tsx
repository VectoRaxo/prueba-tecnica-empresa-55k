import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  return (
    <div className='App'>
      <h1>Prueba Técnica</h1>
      <UsersList users={users} />
    </div>
  )
}

export default App
