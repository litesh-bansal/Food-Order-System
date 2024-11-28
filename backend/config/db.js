import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://litesh_bansal:Litu2917@tomato.fdtjc.mongodb.net/food-del').then(()=>console.log("DB is connected"));
}