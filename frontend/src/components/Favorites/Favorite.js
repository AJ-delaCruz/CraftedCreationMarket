import React  from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import Product from "../Product/Product";

const Favorite = () => {
    const [products, setProducts] = useState([]);

    const userId = localStorage.getItem("user_id");
    console.log(products);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/products/favorite?userId=${userId}`);
                setProducts(res.data);
                console.log("GET PRODUCTS");
                console.log(res.data);

            } catch (err) {
                console.log(err);
            }
        };
        getProducts();
    }, [userId]);

        return (
            <div>
                <div className="profileTopBar" style={{
                    margin: "10px",
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: "space-between",

                }}>

                    <div>
                        <h2 style={{marginLeft: "30px"}}>
                            Favorite Items

                            {/*<Link to="/profileUpdate">*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                            {/*         className="bi bi-pencil-square" viewBox="0 0 16 16"*/}
                            {/*         style={{marginLeft: "10px", color: "black"}}>*/}
                            {/*        <path*/}
                            {/*            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>*/}
                            {/*        <path fill-rule="evenodd"*/}
                            {/*              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>*/}
                            {/*    </svg>*/}
                            {/*</Link>*/}
                        </h2>
                    < /div>





                    <div style={{display: 'flex', justifyContent: "right"}}>
                        <form style={{display: 'flex'}} >
                            {/*onSubmit={this.submitSearch}>*/}
                            <input placeholder="Search your favorites"/>
                            {/*onChange={this.searchHandler} */}
                            <div className="btn btn-light btn-outline-secondary ">
                                <svg
                                    // onClick={this.submitSearch}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-search "
                                    viewBox="0 0 16 16"

                                >
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </div>
                        </form>

                        <select className="Filter">
                            <option selected>Filter</option>
                            <option>Price (asc)</option>
                            <option>Price (desc)</option>
                        </select>

                    </div>
                </div>


                <div className="container" style={{flexWrap: "wrap", alignItems: 'center', display: "flex"}}>
                    {/*{const findItem = popularProducts.filter(x => x.name === this.state.searchFavorite);*/}

                    {/*    this.state.authFlag === true ? popularProducts.map((x, key) => (*/}
                    {/*    <Product item={x} key={x.id}/>*/}
                    {/*)) :*/}
                    {/*    popularProducts.map((x key) => (*/}
                    {/*    <Product item={this.state.searchFavorite} key={this.state.searchFavorite.id}/>*/}
                    {/*    ))*/}
                    {/*}*/}

                    {/*{this.state.searchFavorite !== "" ? this.state.favoriteItems.map((x, key) => (*/}
                    {/*        <Product item={x} key={x.id}/>*/}
                    {/*    ))*/}
                    {/*    :*/}
                    {/*   popularProducts.map((x, key) => (*/}
                    {/*        <Product item={x} key={x.id}/>*/}
                    {/*    ))*/}
                    {/*}*/}
                    {/*{filter}*/}

                    {products.map((item) => <Product item={item} key={item.id}/>)}
                </div>
            </div>

        )

}

//export Favorite Component
export default Favorite;