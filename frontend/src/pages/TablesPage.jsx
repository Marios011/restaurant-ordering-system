function TablesPage() {
  const tables = [
    { id: 1, name: 'Table 1', seats: 2, status: 'Available' },
    { id: 2, name: 'Table 2', seats: 4, status: 'Occupied' },
    { id: 3, name: 'Table 3', seats: 6, status: 'Available' },
    { id: 4, name: 'Table 4', seats: 4, status: 'Reserved' },
  ]

  return (
    <div className="container mt-4">
      <h1>Tables</h1>
      <ul className="list-group mt-3">
        {tables.map((table) => (
          <li
            key={table.id}
            className="list-group-item d-flex justify-content-between"
          >
            <span>
              {table.name} - {table.seats} seats
            </span>
            <span>{table.status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TablesPage