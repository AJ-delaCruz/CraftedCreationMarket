import React, {Component} from 'react';
import Navbar from "../LandingPage/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";
import Favorites from "../Favorites/Favorites";
import Seller from "./Seller";
import {Navigate} from 'react-router';
import updateShop from "./UpdateShop";
import UpdateShop from "./UpdateShop";

class ShopHomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            shopName: null,
            errorMsg: null,
            updateShop: false,
        };

        // this.submitSignup = this.submitSignup.bind(this);
        // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        // this.usernameChangeHandler = this.usernameChangeHandler.bind(this);

    }



    componentDidMount() {
        axios.get('http://localhost:3001/sellerProfile')
            .then((response) => {
                console.log("seller profile page")
                console.log(response.data);
                this.setState({
                    name: response.data[0].username,
                    shopName: response.data[0].shopName

                });
                console.log(response.data[0].username)
                console.log("shop name is");
                console.log(response.data[0].shopName)

            });


    }

    submitSignup(e) {
        //prevent page from refresh
        e.preventDefault();
        const data = {

            shopName: this.state.shopName,
            // phoneNum: this.state.phoneNum,
            imageUrl: this.state.imageUrl
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get('http://localhost:3001/seller', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            })
            .catch(err => {
                console.log(err);
                //set invalid message
                this.setState({
                    errorMsg: "Invalid."
                });
            });

    }

    render() {
        let redirectVar = null;
        // if(this.state.shopName === "bob"){
        //     redirectVar = <Navigate to= "/newShop"/>
        // }


        return (
            <div>
                {redirectVar}
                {<Navbar/>}
                <div>
                    {/*</div>*/}


                    <div className="shopProfileEdit" style={{
                        margin: "20px",
                        // marginBottom:"-20px",
                        // height: "300px",
                        alignItems: 'center',
                        justifyContent: "space-between",
                        display: 'flex'
                    }}>
                        <div>
                            <NavLink className="btn btn-light btn-outline-secondary " to="/profileUpdate"
                                     style={{marginRight: "20px",}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pencil-square" viewBox="0 0 16 16"
                                     style={{marginRight: "10px", color: "black"}}>
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd"
                                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                                Edit Shop
                            </NavLink>


                            <NavLink className="btn btn-light btn-outline-secondary " to="/favorites">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-heart" viewBox="0 0 16 16"
                                     style={{marginRight: "10px", color: "black"}}>
                                    <path
                                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg>
                                Favorite Shop
                            </NavLink>
                        </div>


                    </div>

                    <div>
                        <h6 style={{fontFamily: 'sans-serif-medium',
                            display: "flex",
                            // marginLeft:"90 %",
                            marginBottom:"-25px",
                            marginRight: "60px",
                            justifyContent: "flex-end",}}>
                            SHOP OWNER</h6>
                    </div>

                    <div className="sellerProfile" style={{
                        marginTop: "10px",
                        alignItems: 'center',
                        justifyContent: "space-between",
                        display: 'flex'
                    }}>
                        <h1 style={{marginLeft: "20px"}}>
                            <img
                                style={{width: '150px', height: '120px', marginRight: "20px"}}
                                alt=""
                                // src={
                                //     this.state.ProfileImg !== null &&
                                //     this.state.ProfileImg.length > 0
                                //         ? this.state.ProfileImg
                                //         : "../images/defaultProfilePic.png"
                                // }
                                src="https://www.etsy.com/images/avatars/default_shop_icon_500x500.png"
                            />
                            {this.state.shopName}
                        </h1>

                        <div style={{
                            borderRadius: "50%",
                            marginRight: "30px",
                            display: "flex",
                            alignItems: 'center',
                            position: "relative",
                            // flexDirection: "column",
                            // backgroundColor: "black"
                        }}>
                            <img
                                style={{width: '100px', height: '70px', marginRight: "30px"}}
                                alt=""
                                // src={
                                //     this.state.ProfileImg !== null &&
                                //     this.state.ProfileImg.length > 0
                                //         ? this.state.ProfileImg
                                //         : "../images/defaultProfilePic.png"
                                // }
                                src="../images/defaultProfilePic.png"/>
                            {/*<div style={{*/}
                            {/*    // position: "absolute",*/}
                            {/*    // bottom: "0",*/}
                            {/*    //  top: "0",*/}
                            {/*    // marginTop:"200px",*/}
                            {/*    flex: "1",*/}
                            {/*    // bottom: "1",*/}
                            {/*    alignItems: 'center',*/}
                            {/*    justifyContent: 'center',*/}
                            {/*    // backgroundColor: "black",*/}
                            {/*}}>*/}
                            {/*    {this.state.name}*/}

                            {/*</div>*/}

                        </div>

                    </div>

                    <div className="profileName" style={{
                        display: "flex",
                        // marginLeft:"90 %",
                        marginRight: "110px",
                        justifyContent: "flex-end",
                        // backgroundColor: "black"
                    }}>
                        {this.state.name}
                    </div>

                    <div className="contact" style={{
                            display: "flex",
                            marginRight: "110px",
                        alignItems: "center",
                            justifyContent: "flex-end"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-envelope" viewBox="0 0 16 16" style={{
                                // display: "flex",
                                marginRight: "10px"}}>
                            <path
                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                        </svg>
                        Contact
                    </div>

                </div>


                {<UpdateShop/>}
                {<Seller/>}
                {<Footer/>}
            </div>


        );
    };
};


export default ShopHomePage;