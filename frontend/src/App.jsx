import React from 'react'

const App = () => {
  const amount=500;
  const currency="INR";
  const receiptId="12345";
  const paymenthandler=async (e)=>{
    // alert("the payment is proceed")
    const  response=await fetch("http://localhost:5000/order",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        amount,
        currency,
        receipt:receiptId
      })
    })
    const order=await response.json();
    console.log("order",order);
  }
  return (
    <div>
      <div className='product'>
        <h1>Razorpay payment gateway</h1>
        <button className='button' onClick={paymenthandler}>Pay now</button>

      </div>
    </div>
  )
}

export default App;
