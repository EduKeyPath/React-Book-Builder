import React from "react";
import {
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Login from './login';
import Header from './components/header';
import ProductPage from './components/product';
import ProductDetailsPage from './components/product-details';
import CartPage from './components/cart';
import PaymentPage from './components/payment';
import PaymentSuccess from './components/payment-success';
import AboutComponent from './components/about/about';
import SpaceComponent from './components/space/space';
import NoPageComponent from './components/page-not-found/page';
import CreateCourses from './components/space/create-course/create-course';

function Routing() {
    let location = useLocation();
    let locStr = location.pathname.split(',');

    return (
        <>
            {
                !!locStr && locStr[0] === '/' ?
                null : <Header />
            }
            
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/about" element={<AboutComponent/>}></Route>
                <Route path="/space/:view" element={<SpaceComponent />}></Route>
                <Route path="/product-list" element={<ProductPage />}></Route>
                <Route path="/product-details/:pId" element={<ProductDetailsPage />}></Route>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="/payment" element={<PaymentPage />}></Route>
                <Route path="/payment-success" element={<PaymentSuccess />}></Route>
                <Route path="/create-course" element={<CreateCourses />}></Route>
                <Route path="*" element={<NoPageComponent />}></Route>
            </Routes>
        </>
    );
}

export default Routing;
