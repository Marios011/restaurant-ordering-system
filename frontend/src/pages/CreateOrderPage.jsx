import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateOrderPage({ addOrder }) {
  const [step, setStep]= useState('table')
  const [table, setTable] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [orderItems, setOrderItems] = useState([])
  const [saveError, setSaveError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const isSavingRef = useRef(false)

  const navigate = useNavigate()
  
      
  const tables=['1','2','3','4','5','6','7']

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
  
  const handleSelectTable = (tableName)=>{
	  setSaveError('')
	  setTable(tableName)
	  setStep('menu')
  }

  const handleAddItem = (itemToAdd) => {
    setSaveError('')
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
				note: '',
			},
		])
	}
	
  }
  
  
  const increaseQuantity=(itemName)=>{
	  setSaveError('')
	  const updatedItems=orderItems.map((item)=>
		item.name===itemName
		?{...item, quantity: item.quantity+1}
		: item
	  )
	  setOrderItems(updatedItems)
  }
  
  
  const updateItemNote=(itemName, newNote)=>{
	  setSaveError('')
	  const updatedItems=orderItems.map((item)=>
		item.name===itemName
		  ?{...item, note: newNote}
		  :item
	  )
	  setOrderItems(updatedItems)
  }
  
  
  
  const decreaseQuantity = (itemName)=>{
	  setSaveError('')
	  const updatedItems=orderItems
		.map((item) =>
			item.name === itemName
			?{...item, quantity: item.quantity-1}
			:item
		)
		
		.filter((item) => item.quantity>0)
	setOrderItems(updatedItems)
	
  }
  
  
  const updateQuantity=(itemName, newQuantity) =>{
	  setSaveError('')
	  const parsedQuantity=Number(newQuantity)
	  
	  if(parsedQuantity<=0|| isNaN(parsedQuantity)){
		  setOrderItems((prevItems)=>
			prevItems.filter((item)=>item.name !== itemName)
		  )
		return  
	  }
	  
	  const updatedItems=orderItems.map((item)=>
		item.name===itemName
		  ?{...item, quantity: parsedQuantity}
		  :item
	  )
	  
	  setOrderItems(updatedItems)
  }
  

  const handleSaveOrder = async () => {
    if (isSavingRef.current) return
    if (!table || orderItems.length === 0) return

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const newOrder = {
      table,
      items: orderItems,
      total,
      status: 'Open',
    }

    setSaveError('')
    isSavingRef.current = true
    setIsSaving(true)

    try {
      await addOrder(newOrder)
      navigate('/')
    } catch (error) {
      console.error('Error creating order:', error)
      const status = error?.message?.match(/HTTP \d{3}/)?.[0]
      setSaveError(`Unable to save the order${status ? ` (${status})` : ''}. Please try again.`)
    } finally {
      isSavingRef.current = false
      setIsSaving(false)
    }
  }

  return (
    <div className="container mt-4">
      {step === 'table' && (
        <>
          <h1 className="mb-4">Select Table</h1>

          <div className="row g-3">
            {tables.map((tableName) => (
              <div key={tableName} className="col-6 col-md-4">
                <button
                  type="button"
                  className="btn btn-outline-primary w-100 py-4"
                  onClick={() => handleSelectTable(tableName)}
                >
                  {tableName}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {step === 'menu' && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-1">Create Order</h1>
              <p className="mb-0">
                <strong>Selected Table:</strong> {table}
              </p>
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setStep('table')}
            >
              Change Table
            </button>
          </div>

          <div className="mb-4">
            <h3>Categories</h3>
            <div className="d-flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`btn ${
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
                    <span>€{item.price.toFixed(2)}</span>
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
			  
			  <div className="flex-grow-1 me-3">
                  <strong>{item.name}</strong>
                  
				  <input
					type="text"
					className="form-control form-control-sm"
					placeholder="Add note"
					value={item.note || ''}
					onChange={(e) => updateItemNote(item.name, e.target.value)}
				  />
                </div>

                <div className="d-flex align-items-center gap-2">

                  <input
					type="number"
					min="1"
					className="form-control form-control-sm text-center"
					style={{ width: '70px' }}
					value={item.quantity}
					onChange={(e) => updateQuantity(item.name, e.target.value)}
				/>

                  
                <span>€{(item.price * item.quantity).toFixed(2)}</span>
				</div>
              </li>
            ))}
          </ul>
        )}
      </div>
	  
	  {orderItems.length>0 &&(
		<h4 className="mb-4">
			€
			{orderItems
				.reduce((sum,item) => sum+item.price*item.quantity,0)
				.toFixed(2)
			}</h4>
	  )}

      {saveError && <div className="alert alert-danger" role="alert">{saveError}</div>}

      <button className="btn btn-success" onClick={handleSaveOrder} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Order'}
      </button>
	  </>
	  )}
    </div>
  )
}

export default CreateOrderPage