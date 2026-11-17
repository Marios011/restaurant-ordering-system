import {useEffect, useState} from 'react'
import {fetchProducts} from '../services/menuService'

function MenuPage() {
  const [menuItems, setMenuItems] = useState([])
  const [menuError, setMenuError] = useState('')

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const products = await fetchProducts()
        setMenuItems(products.filter((product) => product.isAvailable))
      } catch (error) {
        console.error('Error fetching menu:', error)
        setMenuError('Unable to load menu. Please try again.')
      }
    }

    loadMenu()
  }, [])

  return (
    <div className="container mt-4">
      <h1>Menu</h1>
      {menuError && <div className="alert alert-danger">{menuError}</div>}
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