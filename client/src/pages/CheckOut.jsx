import React, { useEffect } from "react";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import { useMediaQuery } from "react-responsive";
import { sizes } from "../screenSizes";
import AltTopBar from "../components/checkout/AltTopBar";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/user/userSlice";

const CheckOut = () => {
    const isMobile = useMediaQuery({ maxWidth: sizes.md });
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            getCurrentUser(user.token);
        }
    }, []);

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
