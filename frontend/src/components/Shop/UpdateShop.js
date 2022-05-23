import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";


const UpdateShop = () => {
    const userId = localStorage.getItem("user_id");
    const shopName = localStorage.getItem("shop");



    const [showWindow, setShowWindow] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [categories, setCategories] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [error, setError] = useState("");


//button to add product
    const addProduct = () => {
        setShowWindow(false)
        axios.defaults.withCredentials = true;
        const data = {"userId": userId, shopName, title, description, img, categories, quantity, price};
        console.log(data);
        axios.post("http://localhost:3001/products/create",  data)
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


    const handleClose = () => {

        // e.preventDefault();
        setShowWindow(false)

    }

    const handleSave = (e) => {
        e.preventDefault();
        setShowWindow(false)

    }

    const handleOpen = () => {

        // e.preventDefault();
        setShowWindow(true)


    }


    return (
        <div className="update" style={{
            alignItems: 'center',
            // justifyContent: "center",
            display: 'flex',
            // backgroundColor: "#f5fbfd",
            // position: "relative",
            marginLeft: "40px",
            fontFamily: 'sans-serif-medium',
            flexDirection: "row"


        }}>

            <div className="btn btn-light btn-outline-secondary" onClick={handleOpen}
                 style={{
                     display: 'flex',
                     flexDirection: "row",
                     alignItems: 'center'
                 }}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-plus-circle" viewBox="0 0 16 16"
                     style={{
                         marginRight: '10px'
                     }}>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>

                LIST AN ITEM
            </div>


            <div>
                <Modal show={showWindow} onHide={handleClose}
                    // style={{width:"400px"}}
                >
                    <Modal.Header>
                        <Modal.Title>List an item</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>List a product

                        <div style={{
                            // flex: "1",
                            margin: "10px",
                            // alignItems: 'center',
                            justifyContent: "space-between",
                            display: 'flex',
                            backgroundColor: "#f5fbfd",
                            // position: "relative",
                        }}>

                            <div className="addProduct" style={{

                                margin: "50px",

                            }}>
                                <form>
                                    <div className="form-group">
                                        <input
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                            }}
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Product name"
                                            required/>
                                    </div>


                                    <div className="form-group">
                                        <input
                                            onChange={(e) => {
                                                setImg(e.target.value);
                                            }}
                                            // type="file"
                                            type="text"
                                            className="form-control"
                                            name="image"
                                            placeholder="Add a photo"
                                        />

                                    </div>
                                    <div className="form-group">
                                        <input
                                            onChange={(e) => {
                                                setCategories(e.target.value);
                                            }}
                                            type="text"
                                            className="form-control"
                                            name="category"
                                            placeholder="Category"
                                        />


                                    </div>
                                    <div className="form-group">
                                        <input
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                            }}
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            placeholder="Description"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            onChange={(e) => {
                                                setPrice(e.target.value);
                                            }}
                                            type="text"
                                            className="form-control"
                                            name="price"
                                            placeholder="Price"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                            type="text"
                                            className="form-control"
                                            name="quantity"
                                            placeholder="Quantity"
                                        />
                                    </div>
                                </form>
                            </div>


                        </div>


                    </Modal.Body>


                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={addProduct}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );

}

export default UpdateShop;