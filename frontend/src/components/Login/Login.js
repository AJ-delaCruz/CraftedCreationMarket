import React, { useState } from "react";
import jwt_decode from 'jwt-decode';
import styled from "styled-components";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    //button to login
    const submitLogin = () => {
        const data = { username, password }
        // console.log(data);

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/user/login', data)
            .then(res => {
                // console.log(res.data);
                //auth
                const { token } = res.data;
                const decoded = jwt_decode(token);
                // console.log("decoded " + decoded);
                // console.log(decoded);
                // console.log("userId: " + decoded._id);
                // console.log("username:" + decoded.username);

                localStorage.setItem("token", token);
                localStorage.setItem("user_id", decoded._id);
                localStorage.setItem("username", decoded.username);

                //navigate to homepage
                navigate('/');

            })
            .catch(error => {
                console.log(error);
                //set invalid message
                setError(error.response.data.message);

            });

    }


    return (
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form>
                    <Input placeholder="username" type="text" onChange={(e) => {
                        setUsername(e.target.value);
                    }} />

                    <Input placeholder="password" type="password" onChange={(e) => {
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
                        onClick={submitLogin}>
                        Log In
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


export default Login;
