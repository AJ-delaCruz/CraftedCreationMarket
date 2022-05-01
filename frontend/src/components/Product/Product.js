import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";


const Product = ({item}) => {

    return (
        // <Link to={`/productOverview/${item._id}`}>
        <ProductContainer key = {item.id}>


            {/*<img src={item.img} style={{height: "200px"}}/>*/}

            <ProductImage src={item.img}/>

            <div style={{
                position: "absolute", bottom: "0", left: "0", margin: "10px"
            }}>

                    {"$" + item.price}

            </div>
            <ProductInfo>
                {/*<div className="productDesc">*/}
                <ProductOverview>
                    <Link to={`/productOverview/${item._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color = "black"
                             className="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </Link>
                </ProductOverview>

                <HeartIcon>
                    {/*<Link to={`/productOverview/${item._id}`}>*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                         className="bi bi-heart HeartIcon" viewBox="-4 1 25 12">

                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                    {/*</Link>*/}
                </HeartIcon>

            </ProductInfo>
        </ProductContainer>
        // </Link>

    );
};

export default Product;

const ProductOverview = styled.div`
 width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const HeartIcon = styled.div`
 width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;


const ProductInfo = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  justify-content: flex-end;
  transition: all 0.5s ease;
  cursor: pointer;
  opacity: 0;
`;

const ProductContainer = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${ProductInfo}{
    opacity: 1;
  }
  
`;


const ProductImage = styled.img`
  height: 75%;
  z-index: 2;
  
`;
