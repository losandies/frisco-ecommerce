import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "../components/cart/ShoppingCart";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getCartTotalPrice } from "../redux/cart/cartSlice";
import PageContainer from "../components/misc/PageContainer";

const Cart = () => {
    const dispatch = useDispatch();

    const { amountOfItems } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartTotalPrice());
    }, [amountOfItems]);

    return (
        <PageContainer>
            <NavBar />
            <div className="h-full w-full flex flex-row md:mb-[150px] justify-between">
                <div>
                    <SideBar />
                </div>
                <ShoppingCart />
            </div>
        </PageContainer>
    );
};

export default Cart;
