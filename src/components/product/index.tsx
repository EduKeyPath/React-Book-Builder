import React, { useState, useEffect } from "react";
import './product.css';
import callApi from '../../helper/api';
import Product from './product';
import UpcomingProduct from './upcoming-product';

export default function ProductPage(){
    const [productList, setProductList] = useState([]);
    const [uProductList, setUProductList] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
          const response:any = await callApi('GET', '/data.json');
          const res = response.data.data;
          setProductList(res.product)
          setUProductList(res.upComProduct)
        } catch (error) {
          console.error(error);
        }
    }
    

    return(
        <div className="product-wrap">
            <h1>Product List</h1>
            <div className="row">
                <div className="col-lg-12">
                    <div className="row product-list">
                        {
                            (!!productList.length) ?
                            productList.map((item, k) => {
                                return (
                                    <Product key={k} product={item} />
                                )
                            })
                            : <div className="alert alert-primary text-center" role="alert">No Products</div>
                        }
                    </div>
                </div>
            </div>

            <div className="customer-review">
                <h3 className="mt-5 h4 mb-2">Upcoming Product</h3>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row product-list">
                            {
                                (!!uProductList.length) ?
                                uProductList.map((item, k) => {
                                    return (
                                        <UpcomingProduct key={k} product={item} />
                                    )
                                })
                                : <div className="alert alert-primary text-center" role="alert">No Products</div>
                            }
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}

