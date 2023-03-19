import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotalPrice } from "../../redux/cart/cartSlice";
import ItemDivider from "../cart/ItemDivider";

import CheckoutItem from "./CheckoutItem";

const OrderSummary = () => {
    const dispatch = useDispatch();
    const { cart, totalPrice, amountOfItems } = useSelector(
        (state) => state.cart
    );

    const salesTax = (totalPrice * 0.06).toFixed(2);
    const shippingCost = 5;

    const getTotal = (subtotal, shipping, tax) => {
        return (subtotal + tax + shipping).toFixed(2);
    };

    useEffect(() => {
        dispatch(getCartTotalPrice());
    }, [amountOfItems]);

    return (
        <div className="h-full md:w-1/2 max-w-[600px] w-full">
            <div className="w-full h-28 text-white flex flex-col justify-center px-5 bg-black">
                <h2 className="text-2xl">Have an account already?</h2>
                <span>
                    <Link to="/login" className="underline">
                        Log In
                    </Link>
                    {""} now to make managing your orders easier.
                </span>
            </div>
            <div className="px-5 mt-8">
                <h1 className="font-bold">Order Summary</h1>
                <div className="flex justify-between mt-3">
                    <h1>Subtotal</h1>
                    <h1>${totalPrice}</h1>
                </div>
                <div className="flex justify-between mt-1">
                    <h1>Standard Shipping</h1>
                    <h1>${shippingCost}.00</h1>
                </div>
                <div className="flex justify-between mt-1 mb-7">
                    <h1>Sales Tax</h1>
                    <h1>${salesTax}</h1>
                </div>
                <ItemDivider />
                <div className="flex justify-between mt-5 mb-5 font-bold">
                    <h1>Total</h1>
                    <h1>
                        $
                        {getTotal(
                            parseFloat(totalPrice),
                            parseFloat(shippingCost),
                            parseFloat(salesTax)
                        )}
                    </h1>
                </div>
                <ItemDivider />
                <div className="mt-5">
                    <h2 className="font-bold">Shopping Bag({amountOfItems})</h2>
                    <div className="h-96 overflow-scroll scrollbar-hide">
                        {cart.map((item) => (
                            <CheckoutItem item={item} key={item.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
