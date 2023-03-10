import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "../components/cart/ShoppingCart";
import ItemList from "../components/content/ItemList";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getCartTotalPrice } from "../redux/cart/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();

    const { totalPrice, amountOfItems } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartTotalPrice());
    }, [amountOfItems]);

    return (
        <div className="flex flex-col h-full">
            <NavBar />
            <div className="h-[80%] w-full flex">
                <SideBar />
                <ShoppingCart />
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
