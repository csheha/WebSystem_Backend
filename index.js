import express from "express";
import mogoose from "mongoose";
import connectDB from "./config/db.js";
import userRoutes from "./routing/userRoutes.js";

connectDB();
const app=express();
const port=5000;
app.use(express.json());            //json format ?
app.use('/api',userRoutes)          //api- prefix

app.listen(port, () => 
  {
    console.log(`Server is running on http://localhost:${port}`);       // ?
  });