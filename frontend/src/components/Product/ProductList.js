import Product from "./Product";
import {popularProducts} from "./data";
import React, {Component} from "react";
import Navbar from "../LandingPage/Navbar";
import {sellerItems} from "../Shop/data";
import Category from "./Category";
class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchItem: "",
            // favoriteItems: [],
            authFlag: false,
            errorMsg: "",
            msg: "",

        }
        // this.searchHandler = this.searchHandler.bind(this);
        // this.submitSearch = this.submitSearch.bind(this);
    }
    searchHandler = (child) => {
        this.setState({searchItem: child}) //pass data from navbar search to list the products
        // this.setState({msg: child})
    }


    render() {
        const {searchItem} = this.state;
        // console.log(searchItem)
        // const findItem = popularProducts.filter(x => x.name === this.state.searchItem);
        // console.log("test");
        // console.log(findItem);
        // this.setState({
        //     favoriteItems: popularProducts.filter(x => x.name === searchItem)
        // })


           let favoriteItems =  popularProducts.filter(x => x.name === searchItem)


        let filter = searchItem !== "" ? favoriteItems.map((x, key) => (

                <Product item={x} key={x.id}/>
            ))
            :
            popularProducts.map((x, key) => (
                <Product item={x} key={x.id}/>
            ))
        return (
            // <div className="container" style={{flexWrap: "wrap", alignItems: 'center', display: "flex"}}>
            <div>
                {/*{popularProducts.map((x) => (*/}
                {/*    <Product item={x} key={x.id}/>*/}
                {/*))}*/}


                <Navbar parentCallback = {this.searchHandler}/>

                <div className="container" style={{flexWrap: "wrap", alignItems: 'center', display: "flex"}}>
                {<Category/>}
                    {filter}

                {/*{searchItem !== "" ? this.state.favoriteItems.map((x, key) => (*/}
                {/*        <Product item={x} key={x.id}/>*/}
                {/*    ))*/}
                {/*    :*/}
                {/*    popularProducts.map((x, key) => (*/}
                {/*        <Product item={x} key={x.id}/>*/}
                {/*    ))*/}
                {/*}*/}
                </div>
            </div>
        );
    };
}
//     handleCallback = (childData) =>{
//         this.setState({msg: childData})
//     }
//
//     render() {
//         const {msg} = this.state;
//         return(
//             <div>
//
//                 <Navbar parentCallback = {this.handleCallback}/>
//                 {<Category/>}
//                 <h1> {msg}</h1>
//             </div>
//         );
//     }
// }
export default ProductList;