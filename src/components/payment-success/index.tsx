import React, { useEffect, useState } from "react";

export default function PaymentSuccess() {
    const [orderData, setOrderData] = useState([]);
    const [paymentData, setPaymentData]:any = useState({});
    const [cartTotalItems, setCartTotalItems] = useState(0);
    const [cartTotalAmount, setartTotalAmount] = useState(0);

    useEffect(() => {
        let cartObj = localStorage.getItem('cartData');
        let cartData = JSON.parse(cartObj || '{}');
        if (cartData.cartItems.cartTotalItems) {
            setOrderData(cartData.cartItems.cartItems);
            setCartTotalItems(cartData.cartItems.cartTotalItems);
            setartTotalAmount(cartData.cartItems.cartTotalAmount);
        }

        let paymentObj = localStorage.getItem('paymentDetails');
        let payData = JSON.parse(paymentObj || '{}');
        if (payData.id) {
            setPaymentData(payData);
        }
    }, [])

    return (
        <>
            <section className="payment-success" style={{ marginTop: '10px' }}>
                <h1 className="display-6 text-success">Your order has been placed successfully</h1>

                <h5 className="h5 mt-5 mb-3">Payment Details</h5>
                {
                    !!paymentData.card ?
                        <div>
                            <p className="mb-1">Payment Id : <strong>{paymentData.id}</strong></p>
                            <p className="mb-1">Payment Type: <strong>{paymentData.card.brand} {paymentData.type}</strong></p>
                            <p className="mb-1">Last 4 digit : <strong>{paymentData.card.last4}</strong></p>
                        </div> : null
                }


                <h5 className="h5 mt-5">Order Product</h5>
                {
                    !!orderData ?
                        <div>
                            <div className="cart-wrap">
                                <div className="cart-table-wrap">
                                    <table className="cart-table">
                                        <thead className="cart-table-thead">
                                            <tr>
                                                <th scope="col">Image</th>
                                                <th scope="col">Product Details</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col" className="text-end">Price</th>
                                                <th scope="col" className="text-end">Sub Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="cart-table-tbody">
                                            {
                                                orderData.map((orderData:any, k) => {
                                                    return <tr key={k}>
                                                        <td data-title="Image">
                                                            <img className="order-img" src={orderData.image} alt="" />
                                                        </td>
                                                        <td data-title="Product Details" className="product-details">
                                                            <p><strong>{orderData.name}</strong></p>
                                                            <p>{orderData.listingType}</p>
                                                            <p>{orderData.grade}</p>
                                                        </td>
                                                        <td data-title="Qty">
                                                            <p className="qty">{orderData.cartQty}</p>
                                                        </td>
                                                        <td data-title="Price" className="amount">
                                                            <p className="price">&#8377;{orderData.price}</p>
                                                        </td>
                                                        <td data-title="Sub Total" className="amount">
                                                            <p className="price">&#8377;{orderData.cartQty * orderData.price}</p>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                            <tr className="total-row">
                                                <td><b>Total</b></td>
                                                <td></td>
                                                <td data-title="Total Qty">
                                                    <div className="qty">{cartTotalItems}</div>
                                                </td>
                                                <td></td>
                                                <td data-title="Total Amount" className="total-amount">
                                                    <p className="price">&#8377;{cartTotalAmount}</p>
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div> : null
                }
            </section>
        </>
    )
}