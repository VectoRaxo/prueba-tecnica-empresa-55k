import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState([])
  const [showColors, setShowColors] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
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
      <header>
        <button onClick={toggleColors} >Colorear filas</button>
      </header>
      <main>
      <UsersList users={users} showColors={showColors} />
      </main>
    </div>
  )
}

export default App
