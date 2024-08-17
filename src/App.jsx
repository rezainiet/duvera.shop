import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Shared/Navbar'
import Homepage from './Pages/Homepage'

function App() {

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
      </Routes>

    </>
  )
}

export default App
