import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckOutModal from "../components/cart/CheckOutModal";
import ShoppingCart from "../components/cart/ShoppingCart";
import ItemList from "../components/content/ItemList";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getCartTotalPrice } from "../redux/cart/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();

    const { totalPrice, amountOfItems, checkoutModalOpen } = useSelector(
        (state) => state.cart
    );

    useEffect(() => {
        dispatch(getCartTotalPrice());
    }, [amountOfItems]);

    return (
        <div className="flex flex-col min-h-[100vh] w-full relative overflow-x-hidden">
            <div className="content-wrap pb-[195px]">
                <NavBar />
                <div className="h-[80%] w-full flex">
                    <SideBar />
                    <ShoppingCart />
                </div>
                <Footer />
            </div>
            {/* {checkoutModalOpen ? <CheckOutModal /> : null} */}
        </div>
    );
};

export default Cart;
