import React, {useEffect} from 'react';
import {useState} from "react";
import Product from "../Product/Product";
import Navbar from "../LandingPage/Navbar";
import axios from "axios";


const Purchases = () => {

    const userId = localStorage.getItem("user_id");
    const [orders, setOrders] = useState([]);
    console.log(orders);
console.log(orders[1]._id);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/orders/orderList?userId=${userId}`);
                setOrders(res.data);
                console.log("GET ORDERS");
                // console.log(res.data);


            } catch (err) {
                console.log(err);
            }
        };
        getOrders();
    },[userId]);
    return (

        <div>
            <Navbar/>
            <div style={{padding: "300px", marginTop: "-250px"}}>
                {/*<h3>Order ID: {orders[0]._id}</h3>*/}

                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        {/*<th>ID</th>*/}
                        <th>DATE</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>


                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <img style={{
                                width: "200p", height: "200px"
                            }} src={order.img}/>
                            {/*<td>{order.id}</td>*/}
                            <td>{Date(order.createdAt).substring(0, 15)}</td>
                            <td>{order.title}</td>
                            <td>$ {order.price.toFixed(2)}</td>
                            <td>{order.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Purchases;