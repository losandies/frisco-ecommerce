import React from "react";

import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutTopBar from "../components/checkout/CheckoutTopBar";
import OrderSummary from "../components/checkout/OrderSummary";
import { useMediaQuery } from "react-responsive";
import { sizes } from "../screenSizes";

const CheckOut = () => {
    const isMobile = useMediaQuery({ maxWidth: sizes.md });

    return (
        <div className="w-screen h-screen flex flex-col overflow-x-hidden">
            <CheckoutTopBar />
            {isMobile ? (
                <div className="w-full justify-center flex flex-col md:flex-row p-5 sm:p-10 mt-3">
                    <OrderSummary />
                    <CheckoutForm />
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