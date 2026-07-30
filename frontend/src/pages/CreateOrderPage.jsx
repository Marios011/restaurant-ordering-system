import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateOrderPage({ addOrder }) {
  const [table, setTable] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [orderItems, setOrderItems] = useState([])

  const navigate = useNavigate()

  const menuData = {
    Starters: [
      { id: 1, name: 'Greek Salad', price: 8.0 },
      { id: 2, name: 'Caesar Salad', price: 7.25 },
      { id: 3, name: 'Bruschetta', price: 6.5 },
    ],
    Main: [
      { id: 4, name: 'Margherita Pizza', price: 8.99 },
      { id: 5, name: 'Cheeseburger', price: 10.5 },
      { id: 6, name: 'Spaghetti Bolognese', price: 12.0 },
    ],
    Drinks: [
      { id: 7, name: 'Cola', price: 2.5 },
      { id: 8, name: 'Water', price: 1.5 },
      { id: 9, name: 'Orange Juice', price: 3.0 },
    ],
  }
  
  const categories = Object.keys(menuData)

  const handleAddItem = (itemToAdd) => {
    const existingItem = orderItems.find((item) => item.name === itemToAdd.name)
	
	if(existingItem){
		const updatedItems = orderItems.map((item)=>
			item.name===itemToAdd.name
			?{...item, quantity: item.quantity + 1}
			: item
		)
		setOrderItems(updatedItems)
	}else{
		setOrderItems([
			...orderItems,
			{
				name: itemToAdd.name,
				price: itemToAdd.price,
				quantity: 1,
			},
		])
	}
	
  }

  const handleSaveOrder = () => {
    if (!table || orderItems.length === 0) return

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const newOrder = {
      id: Date.now(),
      table,
      items: orderItems,
      total,
      status: 'Open',
    }

    addOrder(newOrder)
    navigate('/')
  }

  return (
    <div className="container mt-4">
      <h1>Create Order</h1>

      <div className="mb-3">
        <label className="form-label">Table</label>
        <select
          className="form-select"
          value={table}
          onChange={(e) => setTable(e.target.value)}
          required
        >
          <option value="">Select a table</option>
          <option value="Table 1">Table 1</option>
          <option value="Table 2">Table 2</option>
          <option value="Table 3">Table 3</option>
          <option value="Table 4">Table 4</option>
        </select>
      </div>

      <div className="mb-4">
        <h3>Categories</h3>
		<div className="d-flex gap-2 flex-wrap">
		 {categories.map((category)=>(
			<button key={category} type="button" className={`btn ${
				selectedCategory === category
				? 'btn-primary'
				: 'btn-outline-primary'
			}`}
			onClick={() => setSelectedCategory(category)}
			>
			{category}
			</button>
		 ))}
		</div>
      </div>

      <div className="mb-4">
        <h3>Items</h3>
        {!selectedCategory ? (
          <p>Select a category first.</p>
        ) : (
          <div className="list-group">
            {menuData[selectedCategory].map((item) => (
              <button
                key={item.id}
                type="button"
                className="list-group-item list-group-item-action d-flex justify-content-between"
                onClick={() => handleAddItem(item)}
              >
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </button>
            ))}
          </div>
        )}
      </div>


      <div className="mb-4">
        <h3>Current Order</h3>

        {orderItems.length === 0 ? (
          <p>No items added.</p>
        ) : (
          <ul className="list-group">
            {orderItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
	  
	  {orderItems.length>0 &&(
		<h4 className="mb-4">
			Total: $
			{orderItems
				.reduce((sum,item) => sum+item.price*item.quantity,0)
				.toFixed(2)
			}</h4>
	  )}

      <button className="btn btn-success" onClick={handleSaveOrder}>
        Save Order
      </button>
    </div>
  )
}

export default CreateOrderPage