import React from 'react'
import { useState } from 'react';
import QRCode from "qrcode.react";
import QrScanner from "react-qr-scanner";
import axios from "axios";



const App = () => {
  const [amount,setAmount]=useState('');
  const [qrValue,setQrValue]=useState("");
  const [scannedData,setScannedData]=useState(null);
  

  const generateQRCode=async ()=>{
    if(!amount){
      return alert("Enter amount");
    }
    const {data}=await axios.post("http:/localhost:5000/create-order",{amount:100});
    setQrValue(JSON.stringify({
      id:data.id,
      amount:amount,
      currency:"INR",
    }));
  };

  const handleScan=async (data)=>{
    const paymentData=JSON.parse(data.text);
    setScannedData(paymentData);
    await processPayment(paymentData);

  }

  const handleError=(err)=>{
    console.log(err);

  }
  const processPayment=async (paymentData)=>{
    const options={
      key:rzp_test_3MdHSwOd1ystAO,
      amount:paymentData.amount*100,
      currency:"INR",
      name:"QR Payment System",
      description:"UPI Payment",
      order_id:paymentData.id,
      handler:function (response){
        alert(`Payment successful! Payment ID: ${response.raorpay_payment_id}`);

      },
      prefill:{
        email:"user@example.com",
        contact:"9345945234"
      },
      theme:{
        color:"#3399cc",
        method:{
          upi:true
        },
      },
  
    };
    const razor=new window.Rayzorpay(options);
    razor.open();
  }
  return (
    <div>
      <h2>QR Code Payment</h2>
      <input type="number" placeholder="Enter Amount" value={amount} onChange={(e)=> setAmount(e.target.value)} />
      <button onClick={generateQRCode}>Generate QR</button>
      {
        qrValue &&
        <QRCode value={qrValue} size={256}/>
      }

      <h3>Scan QR Code</h3>
      <QrScanner delay={300} onError={handleError} onScan={handleScan} style={{width:"100%"}}/>
      {scannedData && (
        <div>
          <h3>Payment Details</h3>
          <p>Order ID:{scannedData.id}</p>
          <p>Amount:{scannedData.amount}</p>
        </div>
      )}

    </div>
  )
}

export default App;