import React from 'react';
import Footer from "../Footer/Footer";
import Navbar from "../LandingPage/Navbar";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { addProduct, clearCart, updateProduct } from "../../modernRedux/cartRedux";
import { Navigate } from "react-router";


const Checkout = () => {
    const order = useSelector((state) => state.cart);
    const userId = localStorage.getItem("user_id");
    console.log(order.products[0]);
    console.log(userId);
    const [note, setNote] = useState("");
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    //button to order
    const submitOrder = () => {
        // axios.defaults.withCredentials = true;

        order.products.map((newOrder) => {
            console.log(newOrder);
            axios.post("http://localhost:3001/orders/create", { "userId": userId, order: newOrder })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });
        console.log("Submit order");

        dispatch(
            clearCart(order)
        );

        window.location.href = "/purchases";


    };

    const handleQuantity = (type, item) => {
        console.log(item.title);
        console.log(order.products.title);
        // console.log("TITLE "+item.title);

        order.products.map((x) => {
            if (item.title === x.title)

                // if (type === "decrease") {
                //     order.products.quantity > 0 &&  order.products(order.quantity - 1);
                // } else {
                //     order.products.quantity(order.products.quantity + 1);
                // }
                if (type === "decrease") {
                    quantity > 0 && setQuantity(quantity - 1);
                } else {
                    setQuantity(quantity + 1);
                }
            dispatch(
                updateProduct({ item, quantity })
            );
            order.products.remove(x.length - 1);
        });
        console.log(order)
        console.log(item)
    };
    return (

        <div style={{ marginBottom: "100px" }}>
            {<Navbar />}

            <div
                style={{
                    padding: "250px",
                    marginTop: "-250px"
                }}
            >


                <div className="topContainer"
                    style={{
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "space-between",
                        // justifyContent: "flex-end",
                        padding: "20px"
                    }}>


                    <h2 style={{
                        fontWeight: "300",
                        textAlign: "center"
                    }}>{order.quantity > 1 ? order.quantity + " items " : order.quantity + " item "}in your
                        cart</h2>


                    <Link to={`/home`}>
                        <Button style={{
                            fontWeight: "600",
                            padding: "10px",
                        }}>Keep Shopping
                        </Button>
                    </Link>
                </div>


                <div className="bottomContainer"
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>

                    <div className="productInfo"
                        style={{
                            // display: "flex",
                            flex: 3
                        }}
                    >
                        {order.products.map((item) => (
                            <div className="product" key={item._id} style={{
                                display: "flex",
                                // flex:"2"
                                // textAlign: "center",
                                justifyContent: "space-between",
                                // flexDirection:"column",
                                // padding: "20px"

                            }}>


                                <div className="productDetail" style={{
                                    display: "flex",
                                    // textAlign: "center",
                                    // justifyContent: "space-around",
                                    // flexDirection: "column",
                                    // padding: "20px"
                                    flex: "2"
                                }}>

                                    <img style={{ height: "200px", width: "200px" }} src={item.img} />
                                    <div className="productDescription" style={{
                                        display: "flex",
                                        // alignItems: "center",
                                        // justifyContent: "center",
                                        flexDirection: "column",
                                        // padding: "20px"
                                        flex: "1",
                                        margin: "50px"
                                    }}>
                                        <div className="productName">
                                            <b>Product:</b> {item.title}

                                        </div>

                                        <div className="productCategory" style={{}}>
                                            <b>Category:</b> {item.categories}

                                        </div>

                                        <div className="productCategory" style={{}}>
                                            <b>Description:</b> {item.description}

                                        </div>
                                        <div style={{
                                            marginLeft: "-10px"
                                        }}>
                                            <Checkbox />

                                            <span type="checkbox">This order is a gift</span>
                                            <form style={{
                                                marginLeft: "10px"
                                            }}>
                                                <textarea placeholder="add a note" onChange={(e) => {
                                                    setNote(e.target.value);
                                                }} />
                                            </form>

                                        </div>
                                    </div>

                                    {/*productDescription*/}
                                </div>

                                {/*productDetail*/}

                                <div className="priceDetails" style={{
                                    display: "flex",
                                    flex: "1",
                                    alignItems: "center",
                                    // margin: "200px"
                                    justifyContent: "center",
                                    flexDirection: "column"
                                }}>
                                    <div className="priceContainer"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: "20px"
                                            // justifyContent: "space-between"
                                        }}>
                                        <Button onClick={() => handleQuantity("decrease", item)}>-</Button>
                                        <span style={{ margin: "10px" }}>{quantity}</span>
                                        <Button onClick={() => handleQuantity("increase", item)}>+</Button>


                                    </div>

                                    <div className="price"
                                        style={{ fontWeight: "200", fontSize: "35px", marginRight: "20px" }}>
                                        $ {item.price}
                                    </div>

                                </div>
                                {/*priceDetails*/}


                            </div>


                        ))}


                    </div>
                    {/*productInfo*/}

                    <div className="orderSummary"
                        style={{
                            // display: "flex",
                            // margin:"30px 0px",
                            // alignItems: "center",
                            border: "0.5px solid lightgray",
                            borderRadius: "20px",
                            // margin: "200px"
                            // justifyContent: "space-between"
                            flexDirection: "column",
                            flex: "1",
                            // height:"90%"
                            height: "55vh",
                            padding: "20px"
                        }}>
                        <h1 style={{ fontWeight: "150" }}>ORDER SUMMARY</h1>
                        <div className="productSummary"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "30px 0px"
                            }}>


                            <span>Items(s)</span>
                            <span>$ {order.totalPrice}</span>
                        </div>

                        <div className="productSummary"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "30px 0px"
                            }}>
                            <span>Shipping</span>
                            <span style={{ color: "green" }}> Free </span>
                        </div>


                        <hr
                            style={{
                                backgroundColor: "black",
                                height: "1px",
                                // margin: "100px",
                                // border:"none"
                            }}
                        />
                        <div className="productSummary"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "30px 0px",
                                marginBottom: "30px"
                            }}>


                            <h2>Total {order.quantity > 1 ? "(" + order.quantity + " items)" : "(" + order.quantity + " item)"} </h2>
                            <h2>$ {order.totalPrice}</h2>
                            {/*{cart.totalPrice}*/}

                        </div>

                        <Button onClick={submitOrder} style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "black",
                            borderRadius: "50px",
                            // borderRadius: "0%"
                            // display: "flex",
                            // alignItems: "center",
                            // justifyContent: "center",
                            // margin: "30px 0px"
                            // marginTop:"-30px"
                        }}>
                            Place Order
                        </Button>

                    </div>
                    {/*Summary*/}
                </div>
                {/*bottom container*/}

            </div>
            {/*{<Footer/>}*/}
        </div>
    )


}

//export Checkout Component
export default Checkout;