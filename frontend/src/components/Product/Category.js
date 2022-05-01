import React, {Component} from 'react';
import {categories} from "./data";
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";

class Category extends Component {


    render() {

        let details = categories.map((x)=> {
            return (


                <div key ={x.id} style={{
                    flex: "1",
                    margin: "3px",
                    // height: "10vh",
                    position: "relative",
                }}>
                    <img src={x.img} style={{
                        width: "80%",
                        height: "80%",
                        objectFit: "cover",
                        borderRadius: "50%"


                    }}/>
                    <Link to={`/productList/${x.title}`}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginRight: "45px"
                    }}>
                        {x.title}
                    </div>
                    </Link>

                </div>

            )
        })

        return (


            <div className="container">
                <h2>Category</h2>
                <div style={{
                    display: "flex",
                    padding: "20px",
                    justifyContent: "space-between"
                }}>
                    {details}
                </div>
            </div>
        );
    }
}

export default Category;