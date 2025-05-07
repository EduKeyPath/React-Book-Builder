import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import './payment.css';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

export default function PaymentPage() {
    const history = useNavigate();
    
    const CheckoutForm = () => {
        const stripe:any = useStripe();
        const elements = useElements();

        const handleSubmit = async (event:any) => {
            event.preventDefault();

            if (elements == null) {
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (error) {
                // Show error to your customer (for example, payment details incomplete)
                console.log(error.message);
              } else {
                const paymentObj = JSON.stringify(paymentMethod);
                localStorage.setItem('paymentDetails', paymentObj);
                history('/payment-success');
                // console.log('paymentMethod', paymentMethod);
                // Your customer will be redirected to your `return_url`. For some payment
                // methods like iDEAL, your customer will be redirected to an intermediate
                // site first to authorize the payment, then redirected to the `return_url`.
              }
        };

        return (
            <div className='payment-page' style={{marginTop:'100px'}}>
                <form onSubmit={handleSubmit}>
                    <CardElement />
                    <button className="ds-btn ds-btn--primary" type="submit" disabled={!stripe || !elements}>
                        Pay
                    </button>
                </form>
            </div>
        );
    };

    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    )
}