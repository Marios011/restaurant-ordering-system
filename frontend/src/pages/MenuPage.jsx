function MenuPage() {
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 8.99 },
    { id: 2, name: 'Cheeseburger', price: 10.5 },
    { id: 3, name: 'Caesar Salad', price: 7.25 },
    { id: 4, name: 'Spaghetti Bolognese', price: 12.0 },
  ]

  return (
    <div className="container mt-4">
      <h1>Menu</h1>
      <ul className="list-group mt-3">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between"
          >
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuPage