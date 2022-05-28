import React from 'react';
import Navbar from "../LandingPage/Navbar";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
// import Footer from "../Footer/Footer";

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [birthDay, setbirthDay] = useState("");


    const [image, setImage] = useState(null);
    const [error, setError] = useState("");


    const userId = localStorage.getItem("user_id");


    const updateProfile = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const data = {"userId": userId, name, image,street, state, city, country, zipCode, email,phoneNum, birthDay};
        console.log(data);
        axios.put("http://localhost:3001/user/update",  data)
            .then((res) => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error);
                //set invalid message
                setError(error.response.data);

            });
        console.log("Submit order");
    };

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
                    <div>
                        <h1>
                            Your Public Profile
                        </h1>
                        <p>
                            Everything on this page can be seen by anyone
                        </p>
                    </div>
                    <NavLink className="btn btn-light btn-outline-secondary" to="/profile">
                        View Profile
                    </NavLink>
                </div>


                <div style={{

                    // flex: "1",
                    margin: "10px",

                    // alignItems: 'center',
                    justifyContent: "space-between",
                    display: 'flex',
                    backgroundColor: "#f5fbfd",
                    // position: "relative",
                }}>
                    <form>


                        <div className="container" style={{margin: "50px"}}>
                            <h6>
                                Profile Picture
                                <input
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                    }}
                                    // setFileData(e.target.files[0]);
                                    type="file"
                                    // accept="image/*"
                                    // onChange={this.onChangeFileHandler}
                                    name="fileName"
                                    id="filename"
                                    multiple
                                    style={{
                                        marginLeft: "50px"
                                    }}
                                />
                            </h6>


                            <img
                                style={{
                                    width: '150px',
                                    height: '120px',
                                    objectFit: "cover",
                                    borderRadius: "50%"}}
                                alt=""
                                // src={
                                //     this.state.ProfileImg !== null &&
                                //     this.state.ProfileImg.length > 0
                                //         ? this.state.ProfileImg
                                //         : "../images/defaultProfilePic.png"
                                // }
                                // src="../image/defaultProfilePic.png"
                                src='http://localhost:3001/IMAGE-1653725991836.png'
                            />
                        </div>

                        <div className="profileUpdate" style={{

                            margin: "50px",

                        }}>


                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder={user.name ? user.name : "Name"}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>


                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address1"
                                    placeholder={user.street ? user.street : "Street"}
                                    onChange={(e) => {
                                        setStreet(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    placeholder={user.city ? user.city : "City"}
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    placeholder={user.state ? user.state : "State"}
                                    onChange={(e) => {
                                        setState(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <select name="birth-month" onChange={(e) => {
                                    setCountry(e.target.value);
                                }}>
                                    <option value="">- {user.country ? user.country : "Country"} -</option>
                                    <option value="USA"
                                    >USA
                                    </option>
                                    <option value="UK"
                                    >UK
                                    </option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="zipCode"
                                    placeholder={user.zipCode ? user.zipCode : "Zip Code"}
                                    onChange={(e) => {
                                        setZipCode(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    // onChange={this.emailChangeHandler}
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder={user.email ? user.email : "Email"}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phoneNumber"
                                    placeholder={user.phoneNum ? user.phoneNum : "Phone number"}
                                    onChange={(e) => {
                                        setPhoneNum(e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <div>
                                    <label>Birthday</label>
                                </div>
                                <select name="birth-month"  onChange={(e) => {
                                    setbirthDay(e.target.value);
                                }}>
                                    <option value="">- {user.birthDay ? user.birthDay: "month"} -</option>
                                    <option value="1"
                                    >January
                                    </option>
                                    <option value="2"
                                    >February
                                    </option>
                                    <option value="3"
                                    >March
                                    </option>
                                    <option value="4"
                                    >April
                                    </option>
                                    <option value="5"
                                    >May
                                    </option>
                                    <option value="6"
                                    >June
                                    </option>
                                    <option value="7"
                                    >July
                                    </option>
                                    <option value="8"
                                    >August
                                    </option>
                                    <option value="9"
                                    >September
                                    </option>
                                    <option value="10"
                                    >October
                                    </option>
                                    <option value="11"
                                    >November
                                    </option>
                                    <option value="12"
                                    >December
                                    </option>

                                    {/*<option value="January"*/}
                                    {/*>January*/}
                                    {/*</option>*/}
                                    {/*<option value="February"*/}
                                    {/*>February*/}
                                    {/*</option>*/}
                                    {/*<option value="March"*/}
                                    {/*>March*/}
                                    {/*</option>*/}
                                    {/*<option value="April"*/}
                                    {/*>April*/}
                                    {/*</option>*/}
                                    {/*<option value="May"*/}
                                    {/*>May*/}
                                    {/*</option>*/}
                                    {/*<option value="June"*/}
                                    {/*>June*/}
                                    {/*</option>*/}
                                    {/*<option value="July"*/}
                                    {/*>July*/}
                                    {/*</option>*/}
                                    {/*<option value="August"*/}
                                    {/*>August*/}
                                    {/*</option>*/}
                                    {/*<option value="September"*/}
                                    {/*>September*/}
                                    {/*</option>*/}
                                    {/*<option value="October"*/}
                                    {/*>October*/}
                                    {/*</option>*/}
                                    {/*<option value="November"*/}
                                    {/*>November*/}
                                    {/*</option>*/}
                                    {/*<option value="December"*/}
                                    {/*>December*/}
                                    {/*</option>*/}
                                </select>
                                <select name="birth-day " onChange={(e) => {
                                    setbirthDay(e.target.value.substring(2,3));
                                }}>
                                    <option value="">- {user.birthDay ? user.birthDay.substring(2,3) : "day"}  -</option>
                                    <option value="1"
                                    >1
                                    </option>
                                    <option value="2"
                                    >2
                                    </option>
                                    <option value="3"
                                    >3
                                    </option>
                                    <option value="4"
                                    >4
                                    </option>
                                    <option value="5"
                                    >5
                                    </option>
                                    <option value="6"
                                    >6
                                    </option>
                                    <option value="7"
                                    >7
                                    </option>
                                    <option value="8"
                                    >8
                                    </option>
                                    <option value="9"
                                    >9
                                    </option>
                                    <option value="10"
                                    >10
                                    </option>
                                    <option value="11"
                                    >11
                                    </option>
                                    <option value="12"
                                    >12
                                    </option>
                                    <option value="13"
                                    >13
                                    </option>
                                    <option value="14"
                                    >14
                                    </option>
                                    <option value="15"
                                    >15
                                    </option>
                                    <option value="16"
                                    >16
                                    </option>
                                    <option value="17"
                                    >17
                                    </option>
                                    <option value="18"
                                    >18
                                    </option>
                                    <option value="19"
                                    >19
                                    </option>
                                    <option value="20"
                                    >20
                                    </option>
                                    <option value="21"
                                    >21
                                    </option>
                                    <option value="22"
                                    >22
                                    </option>
                                    <option value="23"
                                    >23
                                    </option>
                                    <option value="24"
                                    >24
                                    </option>
                                    <option value="25"
                                    >25
                                    </option>
                                    <option value="26"
                                    >26
                                    </option>
                                    <option value="27"
                                    >27
                                    </option>
                                    <option value="28"
                                    >28
                                    </option>
                                    <option value="29"
                                    >29
                                    </option>
                                    <option value="30"
                                    >30
                                    </option>
                                    <option value="31"
                                    >31
                                    </option>
                                </select>
                            </div>


                            <button onClick={updateProfile} className="btn btn-primary" style={{marginTop: "10px"}}>Save
                                Changes
                            </button>
                            <p style={{color: "red", fontWeight: "bold"}}>
                                <br/>
                                {/*{this.state.errorMsg}*/}
                            </p>
                        </div>
                    </form>

                </div>

            </div>
            {/*{<Footer/>}*/}
        </div>
    );
};

export default UpdateProfile;