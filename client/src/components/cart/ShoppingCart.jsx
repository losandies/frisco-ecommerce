import React from "react";
import CartItem from "./CartItem";
import ItemDivider from "./ItemDivider";

const ShoppingCart = () => {
    return (
        <div className="w-full h-full flex justify-center">
            <div className="mt-[3.8rem] w-[80%] max-w-[1300px] h-auto">
                <div className="title">
                    <h1 className="text-3xl font-bold">My Bag: 0 items</h1>
                    <ItemDivider />
                </div>
                <div>
                    <CartItem />
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
