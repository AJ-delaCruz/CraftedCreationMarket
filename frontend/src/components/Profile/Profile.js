import React, {useEffect} from 'react';
import Navbar from "../LandingPage/Navbar";
import {Link, NavLink} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Favorite from "../Favorites/Favorite";
// import Footer from "../Footer/Footer";
// import Favorite from "../Favorites/Favorite"

const Profile = () => {
    const userId = localStorage.getItem("user_id");
    const [user, setUser] = useState("");

    useEffect(() => {
        const findUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/user/find?userId=${userId}`);
                setUser(res.data);
                console.log(res.data);

            } catch (err) {
                console.log(err);
            }
        };
        findUser();
    }, [userId]);
    console.log(user);
    return (
        <div>
            {<Navbar/>}
            <div className="container">
                {/*</div>*/}


                <div className="profile" style={{
                    margin: "10px",
                    // height: "300px",
                    alignItems: 'center',
                    justifyContent: "space-between",
                    display: 'flex'
                }}>
                    <div style={{
                        margin: "10px",
                        alignItems: 'center',
                        display: 'flex'
                    }}>
                        <img
                            style={{width: '150px', height: '120px',}}
                            alt=""
                            // src={
                            //     this.state.ProfileImg !== null &&
                            //     this.state.ProfileImg.length > 0
                            //         ? this.state.ProfileImg
                            //         : "../images/defaultProfilePic.png"
                            // }
                            src="../image/defaultProfilePic.png"
                        />
                        <h1 style={{marginLeft: "30px"}}>
                            {/*{this.state.name}*/}
                            {user.name ? user.name : user.username}
                            <Link to="/profileUpdate">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pencil-square" viewBox="0 0 16 16"
                                     style={{marginLeft: "10px", color: "black"}}>
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd"
                                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </Link>
                        </h1>
                    </div>
                </div>


                <div className="favorites" style={{

                    // flex: "1",
                    margin: "10px",

                    // alignItems: 'center',
                    justifyContent: "space-between",
                    display: 'flex',
                    // backgroundColor: "#f5fbfd",
                    // position: "relative",
                }}>


                </div>
                <div style={{marginBottom: "50px"}}>
                    {<Favorite/>}
                </div>
            </div>

            {/*{<Footer/>}*/}
        </div>

    );

};

//export Profile Component
export default Profile;