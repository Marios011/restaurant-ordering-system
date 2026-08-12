import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import DashBoardPage from './pages/DashBoardPage'
import CreateOrderPage from './pages/CreateOrderPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import {fetchOrders, createOrder} from './services/orderService'

function App() {
	
  const [orders, setOrders] = useState([])
  
   const deleteOrder= async(orderId)=>{
	  try{
		  await deleteOrderById(orderId)
		  const updatedOrders = await fetchOrders()
		  setOrders(updatedOrders)
	  }catch(error){
		  console.error('error deleting order:', error)
	  }
   }
   
   
   const [user, setUser]=useState(()=>{
	   const savedUser=localStorage.getItem('user')
	   return savedUser ? JSON.parse(savedUser) : null
   })
  
  

  
  useEffect(()=>{
	  const loadOrders = async () =>{
		  try{
			  const data = await fetchOrders()
			  setOrders(data)
		  }catch(error){
			  console.error('Error fetching orders:', error)
		  }
	  }
	  
	  loadOrders()
	  
  }, [])
  
  
  
  const addOrder = async(orderData, menuItemId) => {
    try{
		const createdOrder=await createOrder(orderData, menuItemId)
		setOrders((prevOrders) => [...prevOrders, createdOrder])
	}catch(error){
		console.error('Error creating order:', error)
	}
  }
  
  
  const payOrder=(orderId, paymentMethod)=>{
	  setOrders((prevOrders) =>
	   prevOrders.map((order)=>
		order.id===orderId
			?{
				...order,
				status: 'Paid',
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


const login=(username, password)=>{
	if(username==='admin' && password==='1234'){
		setUser({username: 'admin', role: 'admin'})
		return true
	}
	
	if(username==='waiter' && password==='1234'){
		setUser({username: 'waiter', role: 'waiter'})
		return true
	}
	return false
}


const logout=()=>{
	setUser(null)
}
  

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
	    <Route path="/login" element={user ? (<Navigate to={user.role==='admin' ? '/admin' : '/'} /> 
		    ):(
			  <LoginPage onLogin={login} />
			)
		  }
		/>
        <Route path="/" element={ user?.role === 'waiter'? (<DashBoardPage orders={orders} deleteOrder={deleteOrder} payOrder={payOrder} logout={logout}
            	removeItemFromOrder={removeItemFromOrder} /> 
				):(
				  <Navigate to="/login" />
				)
			} 
		/>
        <Route path="/create-order"
          element={ user?.role === 'waiter' ? (<CreateOrderPage addOrder={addOrder} />
		   ):(
		     <Navigate to="/login" />
		   )
		  } 
		/>
		<Route path="/admin" element={ user?.role === 'admin' ? ( <AdminPage orders={orders} logout={logout} />
		  ):( 
		    <Navigate to="/login" />
		  )
		 }
		/>

		<Route path="*" element={<Navigate to={user ? (user.role==='admin' ? '/admin' : '/') : '/login'} />} />
		
      </Routes>
    </BrowserRouter>
  )
}

export default App
