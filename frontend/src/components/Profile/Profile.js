import React, {Component} from 'react';
import Navbar from "../LandingPage/Navbar";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";
import Footer from "../Footer/Footer";
import Favorites from "../Favorites/Favorites"

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            authFlag: false,
            errorMsg: null,
        };

        // this.submitSignup = this.submitSignup.bind(this);
        // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        // this.usernameChangeHandler = this.usernameChangeHandler.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:3001/profile')
            .then((response) => {
                console.log("profile page")
                console.log(response.data);
                this.setState({
                    name: response.data[0].name

                });
                console.log(response.data[0].name)
            });
    }

    submitSignup(e) {
        //prevent page from refresh
        e.preventDefault();
        const data = {

            name: this.state.name,
            // phoneNum: this.state.phoneNum,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/signup', data)
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
                                src="../images/defaultProfilePic.png"
                            />
                            <h1 style={{marginLeft: "30px"}}>
                                {this.state.name}

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
                        {<Favorites/>}
                    </div>
                </div>

                {<Footer/>}
            </div>

        );
    };
};

//export Profile Component
export default Profile;