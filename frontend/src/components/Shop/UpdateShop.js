import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

class UpdateShop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productName: "",
            imageUrl: null,
            category: "",
            description: "",
            price: 0,
            quantity: 0,
            errorMsg: null,
            updateShop: false,

            showWindow: false,
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);

        this.productNameChangeHandler = this.productNameChangeHandler.bind(this);
        this.imageUrlChangeHandler = this.imageUrlChangeHandler.bind(this);


        this.priceChangeHandler = this.priceChangeHandler.bind(this);
        this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
        this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);

    }

    productNameChangeHandler = (e) => {
        this.setState({
            productName: e.target.value
        })
    }

    imageUrlChangeHandler = (e) => {
        this.setState({
            imageUrl: e.target.files[0]
        })
        console.log(this.state.imageUrl);
    }

    priceChangeHandler = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    quantityChangeHandler = (e) => {
        this.setState({
            quantity: e.target.value
        })

    }


    categoryChangeHandler = (e) => {
        this.setState({
            category: e.target.value
        })
    }

    descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })

    }

    handleClose(e) {
        e.preventDefault();
        this.setState({
            showWindow: false
        })


    }

    handleSave(e) {
        e.preventDefault();
        this.setState({
            showWindow: false
        })
        const formData = new FormData();
        formData.append('image', this.state.imageUrl);
        formData.append('productName', this.state.productName);
        formData.append('category', this.state.category);
        formData.append('description', this.state.description);
        formData.append('price', this.state.price);
        formData.append('quantity', this.state.quantity);
        console.log(formData);
        const data = {
            productName: this.state.productName,
            imageUrl: this.state.imageUrl,
            category: this.state.category,
            description: this.state.description,
            price: this.state.price,
            quantity: this.state.quantity,

        }
        // console.log(data);

        axios.post('http://localhost:3001/sell', formData)
            .then(response => {
                console.log("Status Code : ", response.status);
                // console.log(response.data);
                console.log(formData)
                console.log(response.data)
                // console.log(data)
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
                this.setState({
                    errorMsg: "Invalid."
                });
            });


    }

    handleOpen(e) {
        e.preventDefault();
        this.setState({
            showWindow: true
        })

    }


    render() {


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

                <div className="btn btn-light btn-outline-secondary" onClick={this.handleOpen}
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
                    <Modal show={this.state.showWindow} onHide={this.handleClose}
                        // style={{width:"400px"}}
                    >
                        <Modal.Header>
                            <Modal.Title>List an item</Modal.Title>
                        </Modal.Header>


                        <Modal.Body>Woohoo, you're reading this text in a modal!

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
                                                onChange={this.productNameChangeHandler}
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Product name"
                                                required/>
                                        </div>


                                        <div className="form-group">
                                            <input
                                                onChange={this.imageUrlChangeHandler}
                                                type="file"
                                                className="form-control"
                                                name="image"
                                                placeholder="Add a photo"
                                            />
                                            {/*<img src={this.state.imageUrl !== null && this.state.imageUrl.length > 0*/}
                                            {/*    ? "./public/images/" + this.state.imageUrl*/}
                                            {/*    : "../images/defaultProfilePic.png"*/}
                                            {/*}/>*/}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                onChange={this.categoryChangeHandler}
                                                type="text"
                                                className="form-control"
                                                name="category"
                                                placeholder="Category"
                                            />


                                        </div>
                                        <div className="form-group">
                                            <input
                                                onChange={this.descriptionChangeHandler}
                                                type="text"
                                                className="form-control"
                                                name="description"
                                                placeholder="Description"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                onChange={this.priceChangeHandler}
                                                type="text"
                                                className="form-control"
                                                name="price"
                                                placeholder="Price"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                onChange={this.quantityChangeHandler}
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
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default UpdateShop;