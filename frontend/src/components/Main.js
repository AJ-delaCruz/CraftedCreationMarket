import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Homepage/Home';
import Navbar from './LandingPage/Navbar';
import Checkout from './Checkout/Checkout';
import Profile from './Profile/Profile';
import Signup from "./Signup/Signup";
import Favorite from "./Favorites/Favorite";
import Category from "./Product/Category";
import ProductList from "./Product/ProductList";
import Seller from "./Shop/Seller";
import ShopHomePage from "./Shop/ShopHomePage";
import UpdateProfile from "./Profile/UpdateProfile";
import NewShop from "./Shop/NewShop";
import UpdateShop from "./Shop/UpdateShop";
import EditShopProduct from "./Shop/EditShopProduct";
import EditShopOwner from "./Shop/EditShopOwner";
import ProductOverview from "./Product/ProductOverview";
import Purchases from "./Checkout/Purchases";
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}

                <Routes>
                    <Route path="/" element={<Navbar />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/purchases" element={<Purchases />} />

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profileUpdate" element={<UpdateProfile />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/favorites" element={<Favorite />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/productlist/:id" element={<ProductList />} />
                    <Route path="/seller" element={<Seller />} />
                    <Route path="/shop" element={<ShopHomePage />} />
                    <Route path="/newShop" element={<NewShop />} />
                    <Route path="/updateShop" element={<UpdateShop />} />
                    <Route path="/editShopProduct" element={<EditShopProduct />} />
                    <Route path="/editShop" element={<EditShopOwner />} />
                    <Route path="/productOverview/:id" element={<ProductOverview />} />



                </Routes>



            </div>
        )
    }
}
//Export The Main Component
export default Main;