import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import ItemDivider from "./ItemDivider";

const ShoppingCart = () => {
    const { cart, total } = useSelector((state) => state.cart);

    const increaseItemQuantity = (item) => {
        console.log(item.quantity + 1);
    };
    return (
        <div className="w-full h-full flex justify-center">
            <div className="mt-[3.8rem] w-[80%] max-w-[1300px] h-auto">
                <div className="title">
                    <h1 className="text-3xl font-bold">
                        My Bag: {total} items
                    </h1>
                    <ItemDivider />
                </div>
                <div>
                    {cart.map((item) => (
                        <CartItem item={item} increase={increaseItemQuantity} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
