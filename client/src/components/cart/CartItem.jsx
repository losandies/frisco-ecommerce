import React from "react";
import aaliyah from "../../assets/aaliyah_t.jpeg";
import QuantitySelect from "../misc/QuantitySelect";

const CartItem = () => {
    return (
        <div className=" mt-6 px-4 h-auto w-full flex">
            <div className="w-full flex items-center justify-between">
                <div className="name-pricing flex items-center justify-center">
                    <img src={aaliyah} alt="" className="w-28" />
                    <div className="ml-4">
                        <h1 className="text-lg">Aaliyah Shirt</h1>
                        <h1 className="text-sm">Mercer</h1>
                    </div>
                </div>
                <div>
                    <h3 className="text-xs text-neutral-500">$129.99</h3>
                </div>
                <QuantitySelect />
            </div>
        </div>
    );
};

export default CartItem;
