import React, { useState } from 'react'
import './Navbr'
import Navbr from './Components/Navbar/Navbr'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LogInPopUp from './Components/LogInPopUp/LogInPopUp'
import Verify from './Pages/Verify/Verify'
import MyOrder from './Pages/MyOrders/MyOrder'
const App = () => {
  const [showLogin, setshowLogin] = useState(false)

  return (
    <>
    {
      showLogin?<LogInPopUp setshowLogin={setshowLogin}/>:<></>
    }
    <div className='app'>
      <Navbr setshowLogin={setshowLogin}/>
      <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path ='/cart' element={<Cart/>}/>
        <Route path = '/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorder' element={<MyOrder/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
    
  )
}

export default App
