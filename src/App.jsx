import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Shared/Navbar'
import Homepage from './Pages/Homepage'
import OrdersPage from './Pages/OrdersPage'

function App() {

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/orders-page' element={<OrdersPage />}></Route>
      </Routes>

    </>
  )
}

export default App
