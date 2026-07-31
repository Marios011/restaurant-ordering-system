import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import DashBoardPage from './pages/DashBoardPage'
import CreateOrderPage from './pages/CreateOrderPage'

function App() {
	
  const [orders, setOrders] = useState(()=>{
	  const savedOrders=localStorage.getItem('orders')
	  return savedOrders ? JSON.parse(savedOrders) : []
  })
  
   const deleteOrder=(orderId)=>{
	  setOrders((prevOrders) => prevOrders.filter((order)=> order.id !== orderId))
   }
  
  
  useEffect(()=>{
	  localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder])
  }
  
  
  const payOrder=(orderId, paymentMethod)=>{
	  setOrders((prevOrders) =>
	   prevOrders.map((order)=>
		order.id===orderId
			?{
				...order,
				status: 'paid',
				paymentMethod,
			}
			:order
	  )
	)  
  }
  
  
  const removeItemFromOrder = (orderId, itemIndex) => {
    setOrders((prevOrders) =>
    prevOrders.map((order) => {
      if (order.id !== orderId) return order

      const updatedItems = order.items.filter((_, index) => index !== itemIndex)
      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      return {
        ...order,
        items: updatedItems,
        total: updatedTotal,
      }
    })
  )
}
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashBoardPage orders={orders} deleteOrder={deleteOrder} payOrder={payOrder}
            	removeItemFromOrder={removeItemFromOrder}	/>} />
        <Route path="/create-order"
          element={<CreateOrderPage addOrder={addOrder} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
