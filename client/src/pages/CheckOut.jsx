import React from "react";

import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutTopBar from "../components/checkout/AltTopBar";
import OrderSummary from "../components/checkout/OrderSummary";
import { useMediaQuery } from "react-responsive";
import { sizes } from "../screenSizes";
import AltTopBar from "../components/checkout/AltTopBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartTotalItems } from "../redux/cart/cartSlice";

const CheckOut = () => {
    const isMobile = useMediaQuery({ maxWidth: sizes.md });

    const dispatch = useDispatch();

    return (
        <div className="w-screen h-screen flex flex-col overflow-x-hidden">
            <AltTopBar />
            {isMobile ? (
                <div className="w-full justify-center flex flex-col md:flex-row p-5 sm:p-10 mt-3">
                    <div>
                        <OrderSummary />
                    </div>
                    <div className="mt-10">
                        <CheckoutForm />
                    </div>
                </div>
            ) : (
                <div className="w-full justify-center flex flex-col md:flex-row p-5 sm:p-10 mt-3">
                    <CheckoutForm />
                    <OrderSummary />
                </div>
            )}
        </div>
    );
};

export default CheckOut;
