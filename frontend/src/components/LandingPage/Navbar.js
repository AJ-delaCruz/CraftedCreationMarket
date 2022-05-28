import React from 'react';
import {Link, NavLink} from 'react-router-dom';
// import cookie from 'react-cookies';
// import {Navigate} from 'react-router';
// import Product from "../Product/Product";
// import {sellerItems} from "../Shop/data";
// import {popularProducts} from "../Product/data";
// import Category from "../Product/Category";
import {useDispatch, useSelector} from "react-redux";
import Badge from '@mui/material/Badge';
import {useState} from 'react';
import {searchProduct} from "../../modernRedux/searchRedux";
import {useEffect} from "react";
import {useLocation} from "react-router";


const Navbar = () => {

    const quantity = useSelector(state => state.cart.quantity);
    // console.log(quantity);

    const [search, setSearch] = useState("");
    // console.log(search);
    const dispatch = useDispatch();

    const location = useLocation();
    // console.log(location.pathname.split("/")[1]);
    const path = location.pathname.split("/")[1]
    // console.log("path = " +path)

    useEffect(() => {
        if(path !== "home") {
            dispatch(
                searchProduct(" ")
            );
        }
        // console.log("newsearch = "+search);

    })

    //redux
    const handleClick = (e) => {
        e.preventDefault();
        // console.log(search);
        dispatch(
            searchProduct(search)
        );
    };
    //handle logout to destroy the cookie
    // const handleLogout = () => {
    //     cookie.remove('cookie', {path: '/'})
    //     localStorage.clear();
    // }
    //
    //
    // const searchHandler = (e) => {
    //
    // }
    //
    // const submitSearch = (e) => {
    //     e.preventDefault();
    // };
    //
    // let navLogin = null;
    // if (cookie.load('cookie')) {
    //     // console.log("Able to read cookie");
    //     navLogin = (
    //         <ul className="nav navbar-nav navbar-right">
    //             <li><NavLink to="/" onClick={handleLogout}><span className="glyphicon glyphicon-user"/>Logout</NavLink>
    //             </li>
    //         </ul>
    //     );
    // } else {
    //     //Else display login button
    //     // console.log("Not Able to read cookie");
    //     navLogin = (
    //         <ul className="nav navbar-nav navbar-right">
    //             <li><NavLink to="/login"><span className="glyphicon glyphicon-log-in"/> Login</NavLink></li>
    //         </ul>
    //     )
    // }
    let redirectVar = null;
    // if(cookie.load('cookie')){
    //     redirectVar = <Navigate to="/home"/>
    // } else redirectVar = <Navigate to="/login"/>

    // if (!cookie.load('cookie')) {
    //     redirectVar = <Navigate to="/login"/>
    // }

    return (
        <div className="navigationBar">
            {redirectVar}
            <nav id="navbar-example2" className="navbar navbar-dark bg-light ">
                <Link to={`/home`} style={{textDecoration: "none"}}>
                {/*      onClick={() => setSearch("lol") && handleClick}*/}
                {/*>*/}
                    <h2 style={{color: "#fa8072", paddingLeft: "50px"}} className="title">
                        Etsy
                    </h2>
                </Link>
                <div style={{display: 'flex'}}>
                    <form style={{
                        display: 'flex',
                    }}
                          onClick={handleClick}
                        // onSubmit={submitSearch}

                    >
                        <input type="text" placeholder="Search for anything"
                               style={{width: "1000px"}}
                            // onChange={searchHandler}
                               onChange={(e) => setSearch(e.target.value)}
                        />
                        {/*onChange={this.searchHandler}*/}
                        <div className="btn btn-light btn-outline-secondary ">
                            <svg
                                // onClick={submitSearch}
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search "
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </div>
                    </form>
                </div>
                <ul className="nav nav-pills">
                    <li className="nav-item ">
                        <NavLink className="btn btn-light btn-outline-secondary" to="/home">
                            Home
                        </NavLink>
                    </li>

                    <li className="nav-item ">
                        <NavLink
                            className="btn btn-light btn-outline-secondary "
                            to="/signup"
                        >
                            Signup
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            className="btn btn-light btn-outline-secondary "
                            to="/profile"
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="btn btn-light btn-outline-secondary "
                            to="/shop"
                        >
                            Shop
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            className="btn btn-light btn-outline-secondary "
                            to="/favorites"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-heart" viewBox="0 0 16 16">
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </NavLink>
                    </li>


                    <li className="nav-item">

                        <NavLink className="btn btn-light btn-outline-secondary " to="/checkout">
                            <Badge badgeContent={quantity} color="primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-cart"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                            </Badge>
                        </NavLink>


                    </li>


                    <li className="nav-item">
                        <NavLink
                            className="btn btn-light btn-outline-secondary "
                            to="/logout"
                        >
                            Logout
                        </NavLink>
                    </li>
                </ul>

            </nav>

        </div>

    );
};
export default Navbar;
