import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "../components/cart/ShoppingCart";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getCartTotalPrice } from "../redux/cart/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();

    const { amountOfItems } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartTotalPrice());
    }, [amountOfItems]);

    return (
        <div className="flex flex-col min-h-[100vh] w-full relative overflow-x-hidden">
            <div className="content-wrap md:pb-[195px]">
                <NavBar />
                <div className="md:h-[80%] h-[100vh] w-full flex">
                    <SideBar />
                    <ShoppingCart />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Cart;
