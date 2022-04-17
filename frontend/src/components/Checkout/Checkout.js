import React, {Component} from 'react';
import '../../App.css';
import Footer from "../Footer/Footer";
import Navbar from "../LandingPage/Navbar";
import {Button} from "react-bootstrap";

class Checkout extends Component {

    render() {
        return (
            <div style={{marginBottom: "100px"}}>
                {<Navbar/>}
                <h1>Checkout page</h1>


                <div>
                    <div className="bagTitle">
                        <h1 style={{fontWeight: "300", textAlign: "center"}}>Bag</h1>
                    </div>

                    <div className="topContainer"
                         style={{
                             display: "flex",
                             textAlign: "center",
                             justifyContent: "space-between",
                             padding: "20px"
                         }}>

                        <Button style={{
                            fontWeight: "600",
                            padding: "10px",
                        }}>Continue</Button>


                        <Button style={{
                            fontWeight: "600",
                            padding: "10px",
                        }}>Checkout Now</Button>
                    < /div>


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
                            <div className="product1" style={{
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
                                    <img
                                        src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A"/>

                                    <div className="productDescription" style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        // padding: "20px"
                                        flex: "1"
                                    }}>
                                        <div className="productName">
                                            <b>Product:</b> JESSIE THUNDER SHOES

                                        </div>

                                        <div className="productCategory" style={{}}>
                                            <b>Category:</b> 93813718293

                                        </div>

                                        <div className="productCategory" style={{}}>
                                            <b>Description:</b> Size 37.5

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
                                        <Button>-</Button>
                                        <span style={{margin: "10px"}}>2</span>
                                        <Button>+</Button>
                                    </div>

                                    <div className="price"
                                         style={{fontWeight: "200", fontSize: "35px"}}>
                                        $30
                                    </div>

                                </div>
                                {/*priceDetails*/}
                            </div>
                            {/*product*/}


                            {/******************************************************************************/}
                            <hr
                                style={{
                                    backgroundColor: "black",
                                    height: "1px",
                                    // margin: "100px",
                                    // border:"none"
                                }}
                            />


                            <div className="products" style={{
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
                                    <img
                                        src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A"/>

                                    <div className="productDescription" style={{
                                        display: "flex",
                                        // alignItems: "center",
                                        justifyContent: "space-evenly",
                                        flexDirection: "column",
                                        // padding: "20px"
                                        // flex: "1"
                                        padding: "20px"
                                    }}>
                                        <div className="productName">
                                            <b>Product:</b> JESSIE THUNDER SHOES

                                        </div>

                                        <div className="productCategory" style={{}}>
                                            <b>Category:</b> 93813718293

                                        </div>

                                        <div className="productCategory" style={{}}>
                                            <b>Description:</b> Size 37.5

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
                                        <Button>-</Button>
                                        <span style={{margin: "10px"}}>2</span>
                                        <Button>+</Button>
                                    </div>

                                    <div className="price"
                                         style={{fontWeight: "200", fontSize: "35px"}}>
                                        $30
                                    </div>

                                </div>
                                {/*priceDetails*/}
                            </div>
                            {/*product*/}

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
                            <h1 style={{fontWeight: "150"}}>ORDER SUMMARY</h1>

                            <div className="productSummary"
                                 style={{
                                     display: "flex",
                                     justifyContent: "space-between",
                                     margin: "30px 0px"
                                 }}>


                                    <span>Subtotal</span>
                                    <span>$ 80</span>
                                </div>

                            <div className="productSummary"
                                 style={{
                                     display: "flex",
                                     justifyContent: "space-between",
                                     margin: "30px 0px"
                                 }}>
                                    <span>Shipping</span>
                                    <span>$ 80</span>
                                </div>


                            <div className="productSummary"
                                 style={{
                                     display: "flex",
                                     justifyContent: "space-between",
                                     margin: "30px 0px"
                                 }}>
                                    <span>Discount</span>
                                    <span>$ 80</span>

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
                                     marginBottom:"30px"
                                 }}>


                                <h2>Total </h2>
                                <h2>$ 80</h2>

                            </div>

                            <Button style={{
                                width:"100%",
                                padding:"10px",
                                // display: "flex",
                                // alignItems: "center",
                                // justifyContent: "center",
                                // margin: "30px 0px"
                                // marginTop:"-30px"
                            }}>
                                CHECKOUT NOW
                            </Button>

                        </div>
                        {/*Summary*/}
                    </div>
                    {/*bottom container*/}

                </div>
                {<Footer/>}
            </div>
        )
    }
}

//export Checkout Component
export default Checkout;