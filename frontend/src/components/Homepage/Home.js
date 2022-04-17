import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Navigate} from 'react-router';
import Navbar from "../LandingPage/Navbar";
import Category from "../Product/Category";
import ProductList from "../Product/ProductList";
import Footer from "../Footer/Footer";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            users : []
        }
    }
    //get the users data from backend
    componentDidMount(){
        axios.get('http://localhost:3001/home')
            .then((response) => {
                //update the state with the response data
                console.log(response);
                this.setState({
                    users : this.state.users.concat(response.data)
                });
            });
    }

    render(){
        //iterate over books to create a table row
        let details = this.state.users.map((x, key) => {
            return(
                <tr>
                    <td>{x.username}</td>
                    <td>{x.password}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Navigate to= "/login"/>
        // }
        return(
            <div >
                {redirectVar}
                {<Navbar/>}
                {<Category/>}
                {<ProductList/>}
                <div class="container">
                    <h2>Shopping</h2>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Password</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*Display the data*/}
                        {details}
                        </tbody>
                    </table>
                </div>

                {<Footer/>}
            </div>
        )
    }
}
//export Home Component
export default Home;