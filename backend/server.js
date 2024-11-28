import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"





// app config
const app = express()
const port = 4000

// app.use(cors({
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization", // Include Authorization header
//     credentials: true, // If using cookies
// }));

app.use(cors())
// middleware
app.use(express.json())


//  db connection
connectDB();

// api end points

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order/", orderRouter)
app.get("/",(req, res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})

// mongodb+srv://litesh_bansal:<db_password>@tomato.fdtjc.mongodb.net/?