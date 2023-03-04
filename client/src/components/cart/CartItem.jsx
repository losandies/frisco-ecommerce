import React from "react";
import aaliyah from "../../assets/aaliyah_t.jpeg";

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
                <div className="w-[6.25rem] h-10 border-black border-[1px] flex justify-around rounded-lg">
                    <button
                    // className={selectedQuantity === 1 ? "disabled" : null}
                    // onClick={() => {
                    //     if (selectedQuantity != 1) {
                    //         setSelectedQuantity(selectedQuantity - 1);
                    //     }
                    // }}
                    >
                        -
                    </button>
                    <input
                        className="text-center caret-transparent cursor-default"
                        type="number"
                        // value={selectedQuantity}
                        min="1"
                        max="5"
                        step="1"
                        readonly
                    />
                    <button
                    // onClick={() =>
                    //     selectedQuantity < 5
                    //         ? setSelectedQuantity(selectedQuantity + 1)
                    //         : null
                    // }
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
