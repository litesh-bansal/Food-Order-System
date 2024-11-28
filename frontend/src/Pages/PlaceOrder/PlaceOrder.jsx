import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    try {
      event.preventDefault();
      let orderItem = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id]
          orderItem.push(itemInfo)
        }
      })
      let orderData = {
        address: data,
        items: orderItem,
        amount: getTotalCartAmount() + 2,
      }
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url)
      }

    } catch (error) {
      console.log(error)
      alert("Error")
    }
}
useEffect(()=>{
  if(!token)
  {
    alert("please login first to make payment")
    navigate('/cart');
    
  }
  else if(getTotalCartAmount() === 0)
  {
    alert("cart is empty")
    navigate('/cart')
    
  }
},[token])
return (
  <form onSubmit={placeOrder} className='place-order' action="">
    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder='first name' required />
        <input name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder='last name' required />
      </div>
      <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email address' required />
      <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' required />
      <div className="multi-fields">
        <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
        <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
      </div>
      <div className="multi-fields">
        <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' required />
        <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
      </div>
      <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' required />
    </div>
    <div className="place-order-right">
      <div className="cart-total">
        <h2>Cart Total</h2>
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{`$${getTotalCartAmount()}`}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() + getTotalCartAmount() === 0 ? 0 : 2}</b>
          </div>

        </div>
        <button type='submit'>Proceed to payment</button>
      </div>
    </div>
  </form>
)
}

export default PlaceOrder
