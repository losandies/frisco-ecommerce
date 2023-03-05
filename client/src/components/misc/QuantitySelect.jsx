import React from "react";
import { useState } from "react";

const QuantitySelect = () => {
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    return (
        <div className="w-[6.25rem] h-10 border-black border-[1px] flex justify-around rounded-lg">
            <button
                className={selectedQuantity === 1 ? "disabled" : null}
                onClick={() => {
                    if (selectedQuantity != 1) {
                        setSelectedQuantity(selectedQuantity - 1);
                    }
                }}
            >
                -
            </button>
            <input
                className="text-center caret-transparent cursor-default"
                type="number"
                value={selectedQuantity}
                min="1"
                max="5"
                step="1"
                readonly
            />
            <button
                onClick={() =>
                    selectedQuantity < 5
                        ? setSelectedQuantity(selectedQuantity + 1)
                        : null
                }
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelect;
