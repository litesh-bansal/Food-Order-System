import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://goldan98702:3J98KOeFhob0hIZD@cluster0.c0ubc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("DB is connected"));
}
