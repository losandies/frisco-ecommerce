import React, { useEffect } from "react";

import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutTopBar from "../components/checkout/CheckoutTopBar";
import OrderSummary from "../components/checkout/OrderSummary";

const CheckOut = () => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <CheckoutTopBar />
            <div className="w-full justify-center items-center flex flex-col md:flex-row p-5 sm:p-10 mt-3">
                <CheckoutForm />
                <OrderSummary />
            </div>
        </div>
    );
};

export default CheckOut;
