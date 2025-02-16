import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay";
import Payment from "./models/payment.js";

dotenv.config();

const app=express();

app.use(cors());

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hello")
})

 mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("the mongodb is connected")).catch(err=>console.log(err));

const razorpay =new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order",async (req,res)=>{
    try{
        const options={
            amount:req.body.amount*100,
            currency:"INR",
            receipt:"order_rcptid_"+Date.now(),
            payment_capture:1,
        };
        const order =await razorpay.orders.create(options);


        const newPayment =new Payment({ order_id:order.id,amount:req.body.amount});
        await newPayment.save();
        res.json(order);

    }catch(error){
        res.status(500).json({error:error.message});
    }
})



app.listen(process.env.PORT,()=>{
    console.log("the server is running in port ",process.env.PORT)
});