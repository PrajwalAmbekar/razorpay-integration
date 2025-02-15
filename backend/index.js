import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


app.get('/',(req,res)=>{
    res.send("server is running")
});

//creating order
app.post("/order",(req,res)=>{
    try{
        //creating the instance of razorpay payment
        const razorpay=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        });

    }catch(err){
        console.log(err);
    }
})







app.listen(process.env.PORT,()=>{
    console.log(`the server is running in PORT ${process.env.PORT}`);
})