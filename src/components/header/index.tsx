import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './header.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const history = useNavigate();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [user, setUser]:any = useState({});
    const cartCounter = useSelector((state:any) => state.cartReducer.cartCounter);
    const spaceMenu:any = useRef();
    const signOutMenu:any = useRef();

    useEffect(() => {
        let userObj = localStorage.getItem('pocLMReact');
        let userData = JSON.parse(userObj || '{}');
        if (userData.name) {
            setUser(userData);
        }
    }, []);

    const showDropdownMenu = () => {
        setToggleMenu(!toggleMenu);
    }

    const menuRedirect = (menuName:any) => {
        if(menuName === '/'){
            showDropdownMenu();
            localStorage.removeItem('pocLMReact');
            localStorage.removeItem('paymentDetails');
            localStorage.removeItem('cartData');
            history("/");
        } else{
            showDropdownMenu();
            history(menuName);
        }
    }

    // const signOut = () => {
    //     localStorage.removeItem('pocLMReact');
    //     localStorage.removeItem('paymentDetails');
    //     localStorage.removeItem('cartData');
    //     history("/");
    // }

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-white fixed-top">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        <Link to="/product-list">
                            <img src="" alt="Bootstrap" width="140" />
                        </Link>
                    </span>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-lg-0 mob-menu">
                            <li className="nav-item">
                                <Link role="button" className="ds-btn ds-btn--tertiary" to="/product-list">Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link role="button" className="ds-btn ds-btn--tertiary" to="/about">About</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-lg-0">
                            <li className="me-3">
                                <Link role="button" className="ds-btn ds-btn--tertiary ds-btn-icon mt-1" aria-labelledby="cartIcon" to="/cart">
                                    <span className="sr-only" id="cartIcon">Shopping cart</span>
                                    <span className="material-icons-outlined ds-btn__icon">
                                        shopping_cart
                                    </span>
                                    <span className="badge bg-danger position-absolute">{cartCounter}</span>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <button type="button" onClick={showDropdownMenu} className="ds-btn ds-btn--tertiary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Bootstrap" width="25" />
                                </button>
                                {
                                    !!toggleMenu ?
                                        <ul className="dropdown-menu">
                                            {
                                                !!user.name ?
                                                    <li className="dropdown-item">
                                                        {user.name}
                                                        <p className="small mb-0">{user.loginId}</p>
                                                    </li> : null
                                            }
                                            <li className="dropdown-item show-mob-menu1">
                                                <button ref={spaceMenu} className="nav-link" type="button" onClick={() => menuRedirect('/product-list')}>
                                                    Product
                                                </button>
                                            </li>
                                            <li className="dropdown-item show-mob-menu1">
                                                <button ref={spaceMenu} className="nav-link" type="button" onClick={() => menuRedirect('/about')}>
                                                    About
                                                </button>
                                            </li>
                                            <li className="dropdown-item">
                                                <button ref={spaceMenu} className="nav-link" type="button" onClick={() => menuRedirect('/space/books')}>
                                                    My Space
                                                </button>
                                            </li>
                                            <li className="dropdown-item">
                                                <button ref={signOutMenu} className="nav-link" type="button" onClick={() => menuRedirect('/')}>
                                                    Sign Out
                                                </button>
                                            </li>
                                        </ul>
                                    : null
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}