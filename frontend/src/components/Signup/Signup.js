import React, {Component} from "react";
import '../../App.css';
import axios from 'axios';
import cookie from "react-cookies";
import {Navigate} from "react-router";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zipcode: "",
            email: "",
            phoneNum: "",
            password: "",
            authFlag: false,
            errorMsg: null,
        };

        this.submitSignup = this.submitSignup.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);

    }


    //email change handler
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitSignup(e) {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            // firstName: this.state.firstName,
            // LastName: this.state.LastName,
            // street: this.state.street,
            // city: this.state.city,
            // state: this.state.state,
            // country: this.state.country,
            // zipcode: this.state.zipcode,
            email: this.state.email,
            // phoneNum: this.state.phoneNum,
            password: this.state.password
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
        let redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = <Navigate to="/profile"/>
        }


        return (
            <div>
                {redirectVar}
                <div className="container">
                    <div className="singup-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2>Sign up</h2>
                            </div>

                            {/*<div className="form-group">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        className="form-control"*/}
                            {/*        name="firstName"*/}
                            {/*        placeholder="First Name"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        className="form-control"*/}
                            {/*        name="lastName"*/}
                            {/*        placeholder="Last name"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*    <input type="date" className="form-control" name="dataOfBith"/>*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        className="form-control"*/}
                            {/*        name="address1"*/}
                            {/*        placeholder="Street"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        className="form-control"*/}
                            {/*        name="city"*/}
                            {/*        placeholder="City"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        className="form-control"*/}
                            {/*        name="state"*/}
                            {/*        placeholder="State"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        className="form-control"*/}
                            {/*        name="country"*/}
                            {/*        placeholder="Country"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        className="form-control"*/}
                            {/*        name="zipCode"*/}
                            {/*        placeholder="Zip Code"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <input
                                    onChange={this.emailChangeHandler}
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                />
                            </div>
                            {/*<div className="form-group">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        className="form-control"*/}
                            {/*        name="phoneNumber"*/}
                            {/*        placeholder="Phone number"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <input
                                    onChange={this.passwordChangeHandler}
                                    type="Password"
                                    className="form-control"
                                    // name="password"
                                    placeholder="Password"
                                />
                            </div>
                            <button onClick={this.submitSignup} className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;