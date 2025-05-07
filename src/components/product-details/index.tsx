import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import ReactImageZoom from 'react-image-zoom';
import callApi from '../../helper/api';
import ReviewsPage from './reviews';
import './product-details.css';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, updateCart} from '../../redux/action/cartAction';

export default function ProductDetails() {
    const history = useNavigate();
    let pId:any = useParams();
    const [reviews, setReviews] = useState([]);
    const [productList, setProductList]:any = useState({});
    const [productDet, setProductDet]:any = useState({});
    const [largeImg, setLargeImg] = useState('');
    // const largeImgZoom = { zoomWidth: 500, img: largeImg };
    const [currIndx, setCurrIndx]:any = useState();
    const dispatch = useDispatch();
    const curCartItems:any = useSelector((store:any) => store.cartReducer.cartItems)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response:any = await callApi('GET', '/data.json');
                const productList = response.data.data.product;
                setProductList(productList);
                const reviewList = response.data.data.cusReviews;
                let product = productList.find((item:any) => {
                    let itemId = item.id.toString();
                    let currId = pId.pId.toString();
                    return itemId === currId;
                })
                setProductDet(product);
                setLargeImg(product.image);
                setReviews(reviewList);

                let curIdx = productList.findIndex((item:any) => {
                    return item.id.toString() === pId.pId.toString();
                })
                setCurrIndx(curIdx);

            } catch (error) {
                console.error(error);
            }
        }
        getProducts();
    }, []);

    const prevProd:any = () => {
        let curIdx = currIndx - 1;
        setCurrIndx(curIdx);
        setProductDet(productList[curIdx])
        setLargeImg(productList[curIdx].image);
    }

    const nextProd:any = () => {
        let curIdx = currIndx + 1;
        setCurrIndx(curIdx);
        setProductDet(productList[curIdx])
        setLargeImg(productList[curIdx].image);
    }

    const goCart = (pd:any) => {
        let indx = curCartItems.findIndex((item:any) => {
            return item.id === pd.id
        })

        if(indx > -1){
            let data = {indx, qty : curCartItems[indx].cartQty + 1};
            dispatch(updateCart(data));
        } else {
            dispatch(addToCart(pd));
        }
        history(`/cart/`);
    }

    return (
        <div className="product-details-wrap">
            <h1>Product Details</h1>
            {productList.length - 1 === currIndx}
            <div className="product-details d-flex align-items-center">
                <button onClick={() => prevProd(productDet.id)} className={`ds-btn ds-btn--tertiary ds-btn-icon left-icon me-2 ${(currIndx === 0) ? 'disabled' : ''}`} aria-label="Go to previous product">
                    <span className="material-icons-outlined ds-btn__icon" aria-hidden="true">
                        chevron_left
                    </span>
                </button>
                <div className="card w-100 p-2">
                    {
                        (productDet.isHighDemand === 'yes') ?
                            <span className="badge rounded-pill bg-danger position-absolute high">High Demand</span>
                            : null
                    }
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6 col-xl-5">
                            <div className="d-lg-flex">
                                <div className="large-img me-lg-2">
                                    {
                                        !!largeImg ?
                                            <>
                                                <img src={largeImg} alt="..." />
                                                {/* <ReactImageZoom {...largeImgZoom} /> */}
                                            </>
                                            : 'Loading...'
                                    }
                                </div>
                                <div className="other-imgs">
                                    {
                                        !!productDet.otherImages ?
                                            productDet.otherImages.map((item:any, k:any) => {
                                                return <button type="button" className="multi-img" onClick={() => setLargeImg(item)} key={k}><img src={item} className="img-thumbnail" alt="..." /></button>
                                            }) : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 col-xl-7">
                            <div className="card-body">
                                <h2 className="card-title">{productDet.name}</h2>
                                <p className="card-text">{productDet.des}</p>
                                <p><strong>Listing :</strong> {productDet.listingType}</p>
                                <p><strong>Book Type :</strong> {productDet.bookType}</p>
                                <p><strong>Grade :</strong> {productDet.grade}</p>
                                <p><strong>Qty (Instock) :</strong> {productDet.qty}</p>
                                <p className="amount">&#8377;{productDet.price}</p>

                                <button className="ds-btn ds-btn--primary mt-2" onClick={() => goCart(productDet)}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => nextProd(productDet.id)} className={`ds-btn ds-btn--tertiary ds-btn-icon right-icon ms-2 ${(productList.length - 1 === currIndx) ? 'disabled' : ''}`} aria-label="Go to next product">
                    <span className="material-icons-outlined ds-btn__icon" aria-hidden="true">
                        chevron_right
                    </span>
                </button>
            </div>

            <div className="customer-review">
                <h2 className="mt-5 h4 mb-2">Customer Review</h2>
                <div className="row">
                    {
                        (!!reviews.length) ?
                            reviews.map((item, k) => {
                                return (
                                    <ReviewsPage key={k} reviews={item} />
                                )
                            })
                            : <div className="alert alert-primary text-center" role="alert">No Review</div>
                    }
                </div>
            </div>

        </div>
    )
}