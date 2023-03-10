import React from "react";
import aaliyah from "../../assets/aaliyah_t.jpeg";
import QuantitySelect from "../misc/QuantitySelect";
import {
    removeFromCart,
    decreaseItemQuantity,
    increaseItemQuantity,
} from "../../redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import ItemDivider from "./ItemDivider";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className=" mt-6  h-auto w-full flex flex-col">
            <div className="w-full px-4 flex items-center justify-around">
                <div className="name-pricing flex items-center justify-center">
                    <img
                        src={`../src/assets/${item.imgPath}`}
                        alt=""
                        className="w-28 rounded-sm"
                    />
                    <div className="ml-4 min-w-[180px]">
                        <h1 className="text-lg">{item.name}</h1>
                        <h1 className="text-sm">{item.brand}</h1>
                    </div>
                </div>
                <div>
                    <h3 className="text-xs w-5 font-semibold uppercase">
                        {item.size}
                    </h3>
                </div>
                <div className="tabular-nums">
                    <h3 className="text-xs text-neutral-500">
                        ${(item.price * item.quantity).toFixed(2)}
                    </h3>
                </div>
                <div className="w-[6.25rem] h-10 border-black border-[1px] flex justify-around rounded-lg">
                    <button
                        className={item.quantity === 1 ? "disabled" : null}
                        onClick={() => dispatch(decreaseItemQuantity(item))}
                    >
                        -
                    </button>
                    <input
                        className="text-center caret-transparent cursor-default w-5"
                        type="number"
                        value={item ? item.quantity : selectedQuantity}
                        min="1"
                        max="5"
                        step="1"
                        readOnly
                    />
                    <button
                        onClick={() => dispatch(increaseItemQuantity(item))}
                    >
                        +
                    </button>
                </div>
                <button
                    className="h-10 w-12 rounded-sm bg-black text-white hover:text-red-500"
                    onClick={() => dispatch(removeFromCart(item))}
                >
                    ✕
                </button>
            </div>
            <ItemDivider />
        </div>
    );
};

export default CartItem;
