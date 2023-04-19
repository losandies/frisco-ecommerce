import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "../components/cart/ShoppingCart";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getCartTotalPrice } from "../redux/cart/cartSlice";
import PageContainer from "../components/misc/PageContainer";

const Cart = () => {
    const { amountOfItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

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
