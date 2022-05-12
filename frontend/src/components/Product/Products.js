import {useEffect, useState} from "react";
import styled from "styled-components";
import {popularProducts} from "./data";
import Product from "./Product";
import axios from "axios";
import {useSelector} from "react-redux";


const Products = ({categories, filters, sort, searchValue}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);



    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    searchValue !== "" ? `http://localhost:3001/products/productList?title=${searchValue}`
                        :
                        categories
                            ? `http://localhost:3001/products/productList?category=${categories}`
                            :
                            "http://localhost:3001/products/productList"
                );
                setProducts(res.data);
                console.log("GET PRODUCTS");
                console.log(res.data);
                console.log(categories)
                console.log("title search =" + searchValue);

            } catch (err) {
                console.log(err);
            }
        };
        getProducts();
    }, [searchValue, categories]); //changes when click to another category or search


    useEffect(() => {
        setFilteredProducts(
            products.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        );
    }, [searchValue, products, categories, filters]);

    //SORT
    useEffect(() => {
        // if (sort === "newest") {
        //     setFilteredProducts((prev) =>
        //         [...prev].sort((a, b) => a.createdAt - b.createdAt)
        //     );
        // } else
        if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    return (

        <div style={{
            padding: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between"
        }}
        >
            {filteredProducts //return filtered products
                ? filteredProducts.map((item) => <Product item={item} key={item.id}/>)
                //else return all products
                : products.map((item) => <Product item={item} key={item.id}/>)}


            {/*{filteredProducts.map((item) => <Product item={item} key={item.id}/>)}*/}

        </div>
    );
};

export default Products;
