import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage'
import OrdersPage from './Pages/OrdersPage'
import PendingOrders from './Pages/PendingOrders'
import ShippedOrders from './Pages/ShippedOrders'
import AllOrders from './Pages/AllOrders'

function App() {

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/orders-page' element={<OrdersPage />}></Route>
        <Route path='/orders/pending' element={<PendingOrders />}></Route>
        <Route path='/orders/shipping' element={<ShippedOrders />}></Route>
        <Route path='/orders/all' element={<AllOrders />}></Route>
      </Routes>

    </>
  )
}

export default App
