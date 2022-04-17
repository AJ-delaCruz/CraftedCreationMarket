import React from "react";

const Product = ({item}) => {

    return (
        <div className="container" style={{
            flex: "1",
            margin: "10px",
            height: "300px",
            alignItems: 'center',
            justifyContent: "center",
            display: 'flex',
            backgroundColor: "#f5fbfd",
            position: "relative"
        }}>

            <img src={item.img} style={{height: "200px"}}/>
            <div style={{
                position: "absolute",
                bottom: "0",
                left:"0",
                margin:"10px"
            }}>
                {"$" + item.price}
            </div>
            {/*<div className="productDesc">*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-heart" viewBox="-4 1 25 12" style={{
                position: "absolute",
                top: "20",
                right: "20",
                borderRadius: "50%",
                backgroundColor: "white",
                width: "30px",
                height: "30px",
                transition: "all 0.5s ease",
                '&:hover': {
                backgroundColor: "black",
            }


            }}>
                <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>

        </div>
    );
};

export default Product;