import mongoose from "mongoose";

const paymentSchema=new mongoose.Schema({
    order_id:String,
    payment_id:String,
    amount:Number,
    status:{type:String,default:"Pending"},
    createdAt:{type:Date,default:Date.now},
})
export default mongoose.model("Payment",paymentSchema);