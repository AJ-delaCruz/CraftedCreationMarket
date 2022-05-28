import React from 'react';
import {Navigate} from 'react-router';
import Navbar from "../LandingPage/Navbar";
import Category from "../Product/Category";
import ProductList from "../Product/ProductList";
import Footer from "../Footer/Footer";
import {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
    const userId = localStorage.getItem("user_id");
    const [name, setName] = useState("");

    useEffect(() => {
        const findName = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/user/find?userId=${userId}`);
                setName(res.data.name);
                console.log(res.data.name);

            } catch (err) {
                console.log(err);
            }
        };
        findName();
    },[userId]);

    let redirectVar = null;
    // if(!cookie.load('cookie')){
    //     redirectVar = <Navigate to= "/login"/>
    // }
    return(
        <div >
            {/*{redirectVar} */}

            <Navbar/>
            <h2 style = {{marginTop:"30px", marginLeft:"300px"}}> Welcome back, {name}</h2>
            <Category/>
            <div style = {{padding: "110px", marginTop:"-130px"}}>  <ProductList/></div>

            <Footer/>

        </div>
    )

}
//export Home Component
export default Home;