import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/cart/cartSlice";

const clothingSizes = ["sm", "md", "lg", "xl"];
const shoeSizes = [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13];
const pantsSizes = [28, 30, 32, 34, 36, 38, 42, 44];
const accessorySize = ["1SZ"];

const ItemInfo = () => {
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("sm");

    const { selectedItem } = useSelector((state) => state.items);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const gatherItemInfo = () => {
        const itemInfo = {
            ...selectedItem,
            size: selectedSize,
            quantity: selectedQuantity,
        };

        // for (let i = 0; i < selectedQuantity; i++) {
        //     dispatch(addToCart(itemInfo));
        // }
        dispatch(addToCart(itemInfo));
    };

    const selectNewSize = (size) => {
        setSelectedSize(size);
        setSelectedQuantity(1);
    };

    useEffect(() => {
        console.log(selectedItem);
    }, []);

    return (
        <div className="h-full w-full flex justify-center px-10 pt-16">
            <div className="flex flex-col md:flex-row h-[700px] w-[1100px]">
                <div
                    id="picture"
                    className="flex justify-center items-center w-[20%] min-w-[500px]"
                >
                    <img
                        src={`/src/assets/${selectedItem.imgPath}`}
                        alt={selectedItem.name}
                        className="h-[600px] w-[400px] rounded-lg"
                    />
                </div>
                <div className="h-[700px] w-[40%] min-w-[500px] flex flex-col justify-center ">
                    <div className="ml-10">
                        <div className="name">
                            <h1 className="text-3xl">{selectedItem.name}</h1>
                            <h2 className="text-xl font-bold uppercase">
                                {selectedItem.brand}
                            </h2>
                        </div>
                        <div className="price">
                            <h3 className="text-md">${selectedItem.price}</h3>
                        </div>
                        <div className="sizing mt-10">
                            <h1 className="mb-2">Choose Size</h1>
                            <div className="sizing-buttons flex flex-wrap">
                                {selectedItem.subcategory === "shirts" ||
                                selectedItem.subcategory === "hoodies" ? (
                                    clothingSizes.map((size) => (
                                        <button
                                            className={`w-24 h-10 mr-2 rounded-lg border-[1px] ${
                                                selectedSize === size
                                                    ? "bg-black text-white"
                                                    : null
                                            }  border-black`}
                                            onClick={() => selectNewSize(size)}
                                        >
                                            <span className="uppercase">
                                                {size}
                                            </span>
                                        </button>
                                    ))
                                ) : selectedItem.category === "shoes" ? (
                                    shoeSizes.map((size) => (
                                        <button
                                            className={`w-24 h-10 mr-2 rounded-lg border-[1px] my-2 ${
                                                selectedSize === size
                                                    ? "bg-black text-white"
                                                    : null
                                            }  border-black`}
                                            onClick={() => selectNewSize(size)}
                                        >
                                            <span>{size}</span>
                                        </button>
                                    ))
                                ) : selectedItem.subcategory === "pants" ? (
                                    pantsSizes.map((size) => (
                                        <button
                                            className={`w-24 h-10 mr-2 rounded-lg border-[1px] my-2 ${
                                                selectedSize === size
                                                    ? "bg-black text-white"
                                                    : null
                                            }  border-black`}
                                            onClick={() => selectNewSize(size)}
                                        >
                                            <span>{size}</span>
                                        </button>
                                    ))
                                ) : selectedItem.category === "accessories" ? (
                                    <button
                                        className={`w-24 h-10 mr-2 rounded-lg border-[1px] my-2 bg-black text-white border-black`}
                                    >
                                        <span>1SZ</span>
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        <div className="add-to-cart mt-10 flex">
                            <div className="w-[6.25rem] h-10 border-black border-[1px] flex justify-around rounded-lg">
                                <button
                                    className={
                                        selectedQuantity === 1
                                            ? "disabled"
                                            : null
                                    }
                                    onClick={() => {
                                        if (selectedQuantity != 1) {
                                            setSelectedQuantity(
                                                selectedQuantity - 1
                                            );
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
                                    readOnly
                                />
                                <button
                                    onClick={() =>
                                        setSelectedQuantity(
                                            selectedQuantity + 1
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="uppercase text-xs w-72 bg-black text-white ml-5"
                                onClick={gatherItemInfo}
                            >
                                add to bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ItemInfo;
