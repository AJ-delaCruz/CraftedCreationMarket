import React, {Component} from 'react';
import {categories} from "./data";
import {Image} from "react-bootstrap";

class Category extends Component {


    render() {

        let details = categories.map((x, key) => {
            return (
                <div >
                    <img src={x.img} style={{
                        width: "40%",
                        height: "50%",
                        objectFit: "cover",
                        // display: "flow",
                        // padding: "10px",
                        // flexDirection: "column"

                    }}/>

                    <div>{x.title}</div>


                </div>
            )
        })

        return (
            <div>
                Category
                <div className="container">
                    <h2>Category</h2>
                    <div style={{display:"flex"}}>
                        {details }
                    </div>


                </div>
            </div>
        );
    }
}

export default Category;