import { useEffect, useState } from 'react'
import { fetchTables } from '../services/tableService'

function TablesPage() {
  const [tables, setTables] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTables = async () => {
      try {
        const data = await fetchTables()
        if (!Array.isArray(data)) {
          throw new Error('The table service returned an invalid response.')
        }
        setTables(data)
      } catch (loadError) {
        console.error('Error fetching tables:', loadError)
        setError('Unable to load tables. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTables()
  }, [])

  return (
    <div className="container mt-4">
      <h1>Tables</h1>
      {isLoading && <p className="mt-3">Loading tables...</p>}
      {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
      {!isLoading && !error && tables.length === 0 && (
        <p className="mt-3">No tables found.</p>
      )}
      {!isLoading && !error && tables.length > 0 && (
        <ul className="list-group mt-3">
          {tables.map((table) => (
            <li
              key={table.id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>Table {table.tableNumber}</span>
              <span>{table.isOccupied ? 'Occupied' : 'Available'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TablesPage