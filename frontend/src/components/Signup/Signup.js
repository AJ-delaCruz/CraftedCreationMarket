import React, { useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router";
import { useHistory, Redirect } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    //button to signuo
    const submitSignup = () => {
        const data = { "email": email, "username": username, "password": password }
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/user/signup', data)
            .then(res => {
                console.log(res.data);
                // Navigate to login page after registration
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
                //set invalid message
                setError(error.response.data);
            });
    }

    // let redirectVar = null;
    // if (this.state.authFlag) {
    //     redirectVar =  <Navigate to="/home"/>
    //
    // }
    return (

        <Container>
            {/*{ redirectVar}*/}
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>

                    <Input placeholder="Email" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />

                    <Input placeholder="Username" onChange={(e) => {
                        setUsername(e.target.value);
                    }} />


                    <Input placeholder="Password" type="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />

                    <Button style={{
                        width: "50%",
                        border: "none",
                        padding: "15px",
                        backgroundColor: "blue",
                        color: "white",
                        cursor: "pointer",
                        margin: "10px",
                    }}
                        onClick={submitSignup}>
                        Register
                    </Button>
                </Form>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
width: 100vw;
height: 50vh;
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: #f5fbfd;;
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
display: flex;
align-items: center;
justify-content: center;
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap;
flex-direction: column;
align-items: center;
`;

const Input = styled.input`
flex: 1;
width: 500px;
margin: 20px 10px 0px 0px;
padding: 10px;
text-align: center
`;


export default Signup;


