import React, {Component} from 'react';
import axios from "axios";
import Navbar from "../LandingPage/Navbar";
import {NavLink} from "react-router-dom";
import UpdateShop from "./UpdateShop";
import EditShopProduct from "./EditShopProduct";
import Seller from "./Seller";
import Footer from "../Footer/Footer";

class EditShopOwner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            shopName: null,
            errorMsg: null,
            shopOwner: false,
        };

        this.submitSellerPic = this.submitSellerPic.bind(this);


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

    submitSellerPic(e) {
        //prevent page from refresh
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.profilePic);

        console.log(formData);

        axios.put('http://localhost:3001/sellereUpdate', formData)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log(response.data);
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


                        <h6>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={this.profilePicChangeHandler}
                                name="image"
                                multiple
                                style={{
                                    marginLeft: "10px"
                                }}
                            />
                        </h6>

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


                <div style={{display:"flex"}}>
                    {<UpdateShop/>} {<EditShopProduct/>}
                </div>
                {<Seller/>}
                {<Footer/>}
            </div>


        );
    };
};

export default EditShopOwner;