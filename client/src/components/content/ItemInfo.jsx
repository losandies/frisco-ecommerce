import React from "react";
import wutangshirt from "../../assets/wutangshirt.png";

const ItemInfo = () => {
    return (
        <div className="h-full w-full flex justify-center px-10 pt-16">
            <div className="flex flex-col md:flex-row h-full w-[1100px]">
                <div
                    id="picture"
                    className="flex justify-center w-[20%] min-w-[500px]"
                >
                    <img src={wutangshirt} alt="" className="" />
                </div>
                <div className="h-[700px] w-[40%] min-w-[500px] flex flex-col ">
                    <div className="ml-20 mt-20">
                        <div className="name">
                            <h1 className="text-3xl">Vintage Wu-tang Shirt</h1>
                            <h2 className="text-xl font-bold uppercase">
                                Merwani
                            </h2>
                        </div>
                        <div className="price">
                            <h3 className="text-md">$164.99</h3>
                        </div>
                        <div className="sizing mt-20">
                            <h1 className="mb-2">Choose Size</h1>
                            <div className="sizing-buttons flex">
                                <button className="w-24 h-10 mr-4 rounded-lg border-[1px] focus:bg-black focus:text-white border-black">
                                    <span>SM</span>
                                </button>
                                <button className="w-24 h-10 mr-4 rounded-lg border-[1px] focus:bg-black focus:text-white border-black">
                                    <span>MD</span>
                                </button>
                                <button className="w-24 h-10 mr-4 rounded-lg border-[1px] focus:bg-black focus:text-white border-black">
                                    <span>LG</span>
                                </button>
                                <button className="w-24 h-10 mr-4 rounded-lg border-[1px] focus:bg-black focus:text-white border-black">
                                    <span>XL</span>
                                </button>
                            </div>
                        </div>
                        <div className="add-to-cart mt-10 flex">
                            <div className="w-24 h-10 border-black border-[1px] flex justify-around rounded-lg">
                                <button>-</button>
                                <input
                                    className="text-center caret-transparent"
                                    type="number"
                                    value="1"
                                    min="1"
                                    max="5"
                                    step="1"
                                    readonly
                                />
                                <button>+</button>
                            </div>
                            <button className="uppercase text-xs w-72 bg-black text-white ml-5">
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
