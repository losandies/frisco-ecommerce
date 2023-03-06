import React from "react";
import aaliyah from "../../assets/aaliyah_t.jpeg";
import QuantitySelect from "../misc/QuantitySelect";
import { removeFromCart } from "../../redux/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className=" mt-6 px-4 h-auto w-full flex">
            <div className="w-full flex items-center justify-between">
                <div className="name-pricing flex items-center justify-center">
                    <img
                        src={`../src/assets/${item.imgPath}`}
                        alt=""
                        className="w-28"
                    />
                    <div className="ml-4 min-w-[180px]">
                        <h1 className="text-lg">{item.name}</h1>
                        <h1 className="text-sm">{item.brand}</h1>
                    </div>
                </div>
                <div>
                    <h3 className="text-xs text-neutral-500">${item.price}</h3>
                </div>
                <div className="w-[6.25rem] h-10 border-black border-[1px] flex justify-around rounded-lg">
                    <button className={item.quantity === 1 ? "disabled" : null}>
                        -
                    </button>
                    <input
                        className="text-center caret-transparent cursor-default"
                        type="number"
                        value={item ? item.quantity : selectedQuantity}
                        min="1"
                        max="5"
                        step="1"
                        readonly
                    />
                    <button onClick={() => (item.quantity += 1)}>+</button>
                </div>
                <button
                    className="h-10 w-12 rounded-sm bg-black text-white hover:text-red-500"
                    onClick={() => dispatch(removeFromCart(item.id))}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default CartItem;
