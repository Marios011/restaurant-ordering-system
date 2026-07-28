import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import TablesPage from './pages/TablesPage'
import OrdersPage from './pages/OrdersPage'

function App() {
  return (
   <BrowserRouter>
	 <Navbar />		
     <Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/menu" element={<MenuPage />} />
		<Route path="/tables" element={<TablesPage />} />
		<Route path="/orders" element={<OrdersPage />} />
	 </Routes>	
	 </BrowserRouter>
  )
}

export default App
