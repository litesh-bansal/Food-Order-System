import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext('null')

const StoreContextProvider = (props) =>{

    const [cartItems, setcartItems] = useState({});
    const url = "https://food-order-system-osao.onrender.com"
    const [token, setToken] = useState("")
    const [food_list,setFoodList] = useState([])
    const addToCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setcartItems((prev)=>({...prev, [itemId]:1}))
        }
        else{
            setcartItems((prev=>({...prev, [itemId]:prev[itemId]+1})))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart = async (itemId)=>{
        setcartItems((prev=>({...prev, [itemId]:prev[itemId]-1})))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price* cartItems[item];
            }
            
        }
        return totalAmount;
    }
    // fetching food list
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            console.log("Data received", response.data);
            if (response.data.success) {
                setFoodList(response.data.data);
                console.log('data fetched successfully')
            } else {
                console.error("Failed to fetch food list:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };
    
    // to keep updates cart items value
   
    const loadCartData = async (token)=>{
        try {
            const response = await axios.post(`${url}/api/cart/get`,{}, {headers: {token}})
            console.log("this is cart data",response.data)
            setcartItems(response.data.cartData)
        } catch (error) {
            console.log("this is the error",error)
        }
        
    }

    // used to stay logged in when we refresh the webpage
    useEffect(()=>{
        console.log("use effect triggered")
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])
    const contextValue = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return(
            <StoreContext.Provider value = {contextValue}>
                {props.children}
            </StoreContext.Provider>
    )
}

export default StoreContextProvider
