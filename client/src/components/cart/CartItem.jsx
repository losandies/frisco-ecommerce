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
        <div className="mt-6 h-auto w-full flex flex-col overflow-x-hidden">
            <div className="w-full md:px-4 flex items-center justify-around">
                <div className="name-pricing flex items-center justify-center">
                    <img
                        src={`../src/assets/${item.imgPath}`}
                        alt=""
                        className="w-12 md:w-28 rounded-sm"
                    />
                    <div className="ml-4 w-2/5 md:min-w-[180px] max-w-[100px]">
                        <h1 className="text-[11px] md:text-lg">{item.name}</h1>
                        <h1 className="text-[8px] md:text-sm">{item.brand}</h1>
                    </div>
                </div>
                <div className="w-1/5 flex justify-center">
                    <h3 className="text-[10px] md:text-xs font-semibold uppercase max-w-32">
                        {item.size}
                    </h3>
                </div>
                <div className="tabular-nums w-1/5 flex justify-center">
                    <h3 className="text-xs text-neutral-500">
                        ${(item.price * item.quantity).toFixed(2)}
                    </h3>
                </div>
                <div className="w-1/5 md:w-1/8 flex justify-center">
                    <div className="w-[4rem] h-6 md:w-[6.25rem] md:h-10 border-black border-[1px] flex justify-around items-center rounded-lg">
                        <button
                            className={item.quantity === 1 ? "disabled" : null}
                            onClick={() => dispatch(decreaseItemQuantity(item))}
                        >
                            -
                        </button>
                        <input
                            className="text-center caret-transparent cursor-default h-[22px] w-[10px] md:w-5"
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
                </div>

                <div className="w-1/5 md:w-1/8 flex justify-center">
                    <button
                        className="h-6 w-8 md:h-10 md:w-12 rounded-sm bg-black text-white hover:text-red-500"
                        onClick={() => dispatch(removeFromCart(item))}
                    >
                        ✕
                    </button>
                </div>
            </div>
            <ItemDivider />
        </div>
    );
};

export default CartItem;
