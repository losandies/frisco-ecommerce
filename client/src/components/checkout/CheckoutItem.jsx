import React from "react";
import ItemDivider from "../cart/ItemDivider";
import { removeFromCart } from "../../redux/cart/cartSlice";
import { useDispatch } from "react-redux";

const CheckoutItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className="w-full h-auto mt-4">
            <div className="left flex justify-between">
                <div className="flex">
                    <img
                        src={`../../src/assets/${item.imgPath}`}
                        alt=""
                        className="w-20 h-32"
                    />
                    <div className="p-3 flex flex-col tracking-tight">
                        <h2 className="mb-1 text-xs">{item.name}</h2>
                        <div className="text-gray-400 text-[10px] uppercase">
                            <h2 className="">SIZE: {item.size}</h2>
                            <h2 className="text-gray-400">
                                QTY: {item.quantity}
                            </h2>
                            <h2
                                className="mt-9 font-bold text-[12px] hover:cursor-pointer"
                                onClick={() => dispatch(removeFromCart(item))}
                            >
                                REMOVE
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <h2 className="text-xs tracking-tight p-3">
                        ${item.price}
                    </h2>
                </div>
            </div>
            <ItemDivider />
        </div>
    );
};

export default CheckoutItem;
