import React, { useEffect, useCallback, Suspense } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './cart.css';
import {updateCart, removeCart, clearCart, similarProductList} from '../../redux/action/cartAction';

const SimProduct = React.lazy(() => import('./sim-product'));

export default function CartPage() {
    const history = useNavigate();
    const isLoading = useSelector((state:any) => state.cartReducer.showLoading);
    const cartTotalItems = useSelector((state:any) => state.cartReducer.cartCounter);
    const cartTotalAmount = useSelector((state:any) => state.cartReducer.cartTotal);
    const dispatch:any = useDispatch();
    const cartItems = useSelector((state:any) => {
        return state.cartReducer.cartItems;
    })

    const similarProducts = useSelector((state:any) => {
        return state.cartReducer.similarProduct;
    })

    const handleSimilarProductList = () => {
        dispatch(similarProductList());
    }

    useEffect(() => {
        handleSimilarProductList();
    },[])

    const removeProduct = (indx:any) => {
        dispatch(removeCart(indx));
    }

    const productIncrement = (indx:any, qty:any) => {
        if(qty < 10){
            let data = {indx, qty : qty + 1};
            dispatch(updateCart(data));
        }
    }

    const productDecrement = (indx:any, qty:any) => {
        if(qty > 1){
            let data = {indx, qty : qty - 1};
            dispatch(updateCart(data));
        }
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const proceedCheckout = () => {
        let cartData = {cartItems : {cartItems : cartItems, cartTotalItems : cartTotalItems, cartTotalAmount:cartTotalAmount}}
        localStorage.setItem('cartData', JSON.stringify(cartData));
        handleClearCart();
        history('/payment');
    }

    const goToDetails = useCallback((pId:any) => {
        history(`/product-details/${pId}`);
    },[])

    return (
        <>
            <section className="product-cart">
                <h1>Product Cart</h1>
                {
                    cartItems.length > 0 ?
                    <div className="cart-wrap">
                        <div className="cart-table-wrap">
                            <table className="cart-table">
                                <thead className="cart-table-thead">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Product Details</th>
                                        <th scope="col" className="text-center">Qty</th>
                                        <th scope="col" className="text-end">Price</th>
                                        <th scope="col" className="text-end">Sub Total</th>
                                        <th scope="col" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="cart-table-tbody">
                                    {
                                        cartItems.map((cartItem:any, k:any) => {
                                            return <tr key={k}>
                                                <td scope="row" data-title="Image" className="product-image">
                                                    <img className="cart-img" src={cartItem.image} alt="" />
                                                </td>
                                                <td data-title="Product Details" className="product-details">
                                                    <p><strong>{cartItem.name}</strong></p>
                                                    <p>{cartItem.listingType}</p>
                                                    <p>{cartItem.grade}</p>
                                                </td>
                                                <td data-title="Qty">
                                                    <div className="qty">
                                                        <button onClick={() => productDecrement(k, cartItem.cartQty)} className="ds-btn ds-btn--secondary left">
                                                            <span className='material-icons-outlined ds-btn__icon' aria-hidden='true'>remove</span>
                                                        </button>
                                                        <div className="fld p-1 text-center pt-2" style={{width:'50px', height:'40px'}}>
                                                            {cartItem.cartQty}
                                                        </div>
                                                        <button onClick={() => productIncrement(k, cartItem.cartQty)} className="ds-btn ds-btn--secondary right">
                                                            <span className="material-icons-outlined ds-btn__icon" aria-hidden='true'>add</span>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td data-title="Price" className="amount">
                                                    <p className="price">&#8377;{cartItem.price}</p>
                                                </td>
                                                <td data-title="Sub Total" className="amount">
                                                    <p className="price">&#8377;{cartItem.cartQty * cartItem.price}</p>
                                                </td>
                                                <td data-title="Action" className="action">
                                                    <button type="button" onClick={() => removeProduct(k)} className="ds-btn ds-btn--tertiary ds-btn-icon">
                                                        <span className='material-icons-outlined ds-btn__icon' aria-hidden='true'>close</span>
                                                    </button>
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
                        <div className="d-flex justify-content-between">
                            <button onClick={handleClearCart} className="ds-btn ds-btn--tertiary mt-3">Clear Cart</button>
                            <button onClick={() => proceedCheckout()} className="ds-btn ds-btn--primary mt-3">Proceed to Checkout</button>
                        </div>
                    </div> :
                    <div className="text-center">
                        <div className="alert alert-primary text-center mt-3" role="alert">No Products in the cart</div>
                        <Link to="/product-list" className="ds-btn ds-btn--primary mt-3">
                            Shop Now
                        </Link>
                    </div>
                }                
            </section>

            <section className="product-similar-cart">
                <h2 className="mt-1 h4 mb-2">Similar Product</h2>
                {
                    !!isLoading ? <div className="alert alert-light text-center mt-3" >
                        <div className="spinner-grow text-primary" style={{width: '3rem', height: '3rem'}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : null
                }
                
                {
                    !!similarProducts && similarProducts.length > 0 ?
                    <div className="row product-list">
                        <Suspense fallback={<div>Loading...</div>}>
                            <SimProduct goToDetails={goToDetails} similarProducts={similarProducts} />
                        </Suspense>
                    </div>
                    : null
                }
            </section>
        </>
    )
}