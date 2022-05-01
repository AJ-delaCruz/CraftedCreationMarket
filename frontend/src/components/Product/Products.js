import {useEffect, useState} from "react";
import styled from "styled-components";
import {popularProducts} from "./data";
import Product from "./Product";
import axios from "axios";


const Products = ({categories, filters, sort}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    categories
                        ? `http://localhost:3001/products/productList?category=${categories}`
                        :
                        "http://localhost:3001/products/productList"
                );
                setProducts(res.data);
                console.log("GET PRODUCTS");
                console.log(res.data);
                console.log(categories)

            } catch (err) {
                console.log(err);
            }
        };
        getProducts();
    }, [categories]);


    useEffect(() => {
        categories &&
        setFilteredProducts(
            products.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        );
    }, [products, categories, filters]);

    useEffect(() => {
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
             key={products.id}>
            {categories //return products if there's a category
                ? filteredProducts.map((item) => <Product item={item} key={item.id}/>)
                //return products array
                : products.map((item) => <Product item={item} key={item.id}/>)}

        </div>
    );
};

export default Products;
