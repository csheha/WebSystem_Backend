import express from "express";
import mogoose from "mongoose";
import connectDB from "./config/db.js";
connectDB()
const app=express();
const port=5000;

app.use(express.json());
