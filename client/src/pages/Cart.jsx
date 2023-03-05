import React from "react";
import ShoppingCart from "../components/cart/ShoppingCart";
import ItemList from "../components/content/ItemList";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";

const Cart = () => {
    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="h-full w-full flex">
                <SideBar />
                <ShoppingCart />
            </div>
            <Footer />
        </div>
    );
};

export default Cart;