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

        let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Navigate to= "/login"/>
        // }
        return(
            <div >
                {redirectVar}
                {/*{<Navbar/>}*/}
                {/*{<Category/>}*/}
                <Navbar/>
                <Category/>
                <ProductList/>
                {/*{<Footer/>}*/}

            </div>
        )
    }
}
//export Home Component
export default Home;