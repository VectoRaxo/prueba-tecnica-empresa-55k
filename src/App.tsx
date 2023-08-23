import { useEffect, useState, useRef } from 'react'
import './App.css'
import './index.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortBycountry, setSortByCountry] = useState(false)
  const OriginalUsers = useRef<User[]>([]) // useRef => Para guardar un valor que se comparta entre renderizados, pero que al cambiar, no vuelva a renderizar el componente

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleReset = () => {
    setUsers(OriginalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        OriginalUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const sortedUsers = sortBycountry
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  return (
    <div className='App' >
      <h1>Prueba Técnica</h1>
      <header >
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>{sortBycountry ? 'No ordenar por país' : 'Ordenar por país'}</button>
        <button onClick={handleReset}>Restaurar borrados</button>
      </header>
      <main>
      <UsersList deleteUser={handleDelete} users={sortedUsers} showColors={showColors} />
      </main>
    </div>
  )
}

export default App
