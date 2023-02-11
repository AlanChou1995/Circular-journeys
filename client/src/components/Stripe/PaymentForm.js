import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import './PaymentForm.scss'

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {

      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
}

export default function PaymentForm() {

  const totalPrice = 888
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })

    if (!error) {
      try {
        console.log('PaymentForm:' + paymentMethod)
        const { id } = paymentMethod
        const response = await axios.post("http://localhost:8080/payment", {
          amount: 10000,
          id
        })

        if (response.data.success) {
          console.log("Successful payment")
          setSuccess(true)
        }

      } catch (error) {
        console.log("Error", error)
      }
    } else {
      console.log(error.message)
    }
  }

  return (
    <>
      {!success
        ? <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement className="card-element" options={CARD_OPTIONS} />

            </div>
          </fieldset>
          <div>

            <h4>金額小計 NT${totalPrice} 元</h4>
          </div>
          <button>Pay</button>
        </form>
        : <div>
          <h2>Thank you for your purchase</h2>
        </div>
      }

    </>
  )
}
