import React from 'react';
import {Navigate} from 'react-router';
import Navbar from "../LandingPage/Navbar";
import Category from "../Product/Category";
import ProductList from "../Product/ProductList";
import Footer from "../Footer/Footer";

const Home = () => {

    let redirectVar = null;
    // if(!cookie.load('cookie')){
    //     redirectVar = <Navigate to= "/login"/>
    // }
    return(
        <div >
            {/*{redirectVar} */}

            <Navbar/>
            <Category/>
            {/*<ProductList/>*/}
            <Footer/>

        </div>
    )

}
//export Home Component
export default Home;