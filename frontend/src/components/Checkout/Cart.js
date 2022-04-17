import React, {Component} from 'react';
import Navbar from "../LandingPage/Navbar";
import {Button} from "react-bootstrap";
import Footer from "../Footer/Footer";

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
           inStock: false,
        }
    }
    render() {
        return (
            <div style={{marginBottom: "500px"}}>
                {<Navbar/>}


                <div >
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
                        }}>Continue Shopping</Button>


                        <Button style={{
                            fontWeight: "600",
                            padding: "10px",
                        }}>Checkout</Button>
                    < /div>


                    <div className="bottomContainer"
                         style={{
                             display: "flex",
                             justifyContent: "space-between",
                             // padding:"20px"
                             margin: "20px"
                         }}>

                        <div className="productDetail" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: "1.5"
                        }}>
                            <img style={{
                                width: "400px"
                            }}
                                 src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A"/>

                        </div>


                        <div className="orderSummary"
                             style={{
                                 border: "0.5px solid lightgray",
                                 borderRadius: "20px",
                                 flexDirection: "column",
                                 flex: "1",
                                 // height:"90%"
                                 height: "80vh",
                                 padding: "50px",
                             }}>
                            <h5 style={{display: "flex", fontWeight: "150", justifyContent: "left"}}>BOB'S SHOP</h5>
                            <div className="productDescription" style={{
                                display: "flex",
                                // alignItems: "center",
                                justifyContent: "space-evenly",
                                flexDirection: "column",
                                // padding: "20px"
                                // flex: "1"
                                // padding: "20px",
                                marginBottom:"30px"
                            }}>

                                <div>
                                    21 sales
                                </div>

                            </div>

                            <div className="productDescription" style={{
                                display: "flex",
                                // alignItems: "center",
                                justifyContent: "space-evenly",
                                flexDirection: "column",
                                // padding: "20px"
                                // flex: "1"
                                // padding: "20px",
                                marginBottom:"100px",
                                fontSize:"25px"
                            }}>
                                <div className="productName">
                                    <b>Product:</b> JESSIE THUNDER SHOES

                                </div>


                                <div className="productDesc" style={{}}>
                                    <b>Description:</b> Size 37.5

                                </div>

                                </div>




                            <div className="priceContainer"
                                 style={{
                                     display: "flex",
                                     alignItems: "center",
                                     // marginBottom: "10px"
                                     // justifyContent: "space-between"
                                 }}>
                                <Button>-</Button>
                                <span style={{margin: "10px"}}>2</span>
                                <Button>+</Button>
                            </div>


                            <div className="productSummary"
                                 style={{
                                     display: "flex",
                                     justifyContent: "space-between",
                                     margin: "30px 0px"
                                 }}>
                                <h5 style={{
                                    marginLeft: "20px"}}>$ 70</h5>
                                {!this.state.inStock ?  "In Stock" :  "Out of Stock"}


                            </div>


                            <hr
                                style={{
                                    backgroundColor: "black",
                                    height: "1px",
                                    // margin: "100px",
                                    // border:"none"
                                }}
                            />


                            <div
                                style={{
                                    display: "flex", flexDirection: "column",
                                    justifyContent: "center",
                                    // backgroundColor:"black",
                                    alignItems:"center"
                                }}>
                                <Button style={{
                                    width: "50%",
                                    padding: "10px",
                                    backgroundColor: "white",
                                    color: "black",
                                    margin: "10px",


                                }}>
                                    BUY IT NOW
                                </Button>
                                <Button style={{
                                    width: "50%",
                                    padding: "10px",
                                    margin: "10px"

                                }}>
                                    ADD TO CART
                                </Button>
                            </div>

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


export default Cart;