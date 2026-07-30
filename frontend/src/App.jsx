import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import DashBoardPage from './pages/DashBoardPage'
import CreateOrderPage from './pages/CreateOrderPage'

function App() {
  const [orders, setOrders] = useState([])

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder])
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashBoardPage orders={orders} />} />
        <Route path="/create-order"
          element={<CreateOrderPage addOrder={addOrder} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
