import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import ItemDivider from "./ItemDivider";
import { clearCart, toggleCheckoutModal } from "../../redux/cart/cartSlice";
import CheckOutModal from "./CheckOutModal";
import { Navigate, useNavigate } from "react-router-dom";

const showCartItems = (cartArray) => (
    <div className="h-[50vh] overflow-scroll scrollbar-hide">
        {cartArray.map((item) => (
            <CartItem item={item} key={item.id} />
        ))}
    </div>
);

const noItemsYet = () => (
    <div className="h-[50vh] max-h-auto w-full flex items-center justify-center">
        <h2 className="text-3xl text-neutral-400">No Items Yet</h2>
    </div>
);

const ShoppingCart = () => {
    const { cart, amountOfItems, totalPrice } = useSelector(
        (state) => state.cart
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let cartIsEmpty = cart.length < 1;

    const increaseItemQuantity = (item) => {
        console.log(item.quantity + 1);
    };

    return (
        <div className="w-full h-full flex justify-center">
            <div className="mt-[3.8rem] w-[80%] max-w-[1300px] h-auto">
                <div className="title">
                    <h1 className="text-3xl font-bold">
                        My Bag: {amountOfItems} items
                    </h1>
                    <ItemDivider />
                </div>
                {cartIsEmpty ? noItemsYet() : showCartItems(cart)}
                <div className="w-full h-32 flex justify-end">
                    <div className="mt-5 w-56 flex flex-col items-center">
                        <h1 className="text-2xl font-bold">
                            Total:
                            <span className="tabular-nums"> ${totalPrice}</span>
                        </h1>
                        <button
                            className={`w-[80%] mt-3 h-12 bg-black text-white font-semibold rounded-sm ${
                                cartIsEmpty
                                    ? "bg-neutral-300 cursor-default"
                                    : null
                            }`}
                            onClick={() =>
                                !cartIsEmpty ? navigate("/checkout") : null
                            }
                        >
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
