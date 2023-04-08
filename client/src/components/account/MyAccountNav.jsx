import React, { useState } from "react";

const MyAccountNav = ({ setCurrentTab, currentTab }) => {
    return (
        <div className="w-full h-[49px] justify-center items-center flex flex-col">
            <div className="h-12 w-full flex justify-center items-center">
                <div className="w-[80%] h-12 flex">
                    <div
                        className={`w-1/3 h-full bg-white flex items-center justify-center flex-col relative ${
                            currentTab === "profile"
                                ? "text-neutral-600 font-semibold"
                                : "text-gray-300"
                        }`}
                    >
                        <h1
                            className="cursor-pointer uppercase"
                            onClick={() => setCurrentTab("profile")}
                        >
                            Profile
                        </h1>
                    </div>
                    <div
                        className={`w-1/3 h-full bg-white flex items-center justify-center ${
                            currentTab === "orders"
                                ? "text-neutral-600 font-semibold"
                                : "text-gray-300"
                        }`}
                    >
                        <h1
                            className="cursor-pointer uppercase"
                            onClick={() => setCurrentTab("orders")}
                        >
                            Orders
                        </h1>
                    </div>
                    <div
                        className={`w-1/3 h-full bg-white flex items-center justify-center ${
                            currentTab === "addresses"
                                ? "text-neutral-600 font-semibold"
                                : "text-gray-300"
                        }`}
                    >
                        <h1
                            className="cursor-pointer uppercase"
                            onClick={() => setCurrentTab("addresses")}
                        >
                            Addresses
                        </h1>
                    </div>
                </div>
            </div>
            <div className="w-[80%] h-12 flex">
                <div
                    className={`w-1/3 h-[1px] relative flex justify-center transform duration-300 ease-in-out ${
                        currentTab === "orders"
                            ? "ml-[33.33%]"
                            : currentTab === "addresses"
                            ? "ml-[66.66%]"
                            : "ml-0"
                    }`}
                >
                    <div
                        className={`w-[5px] h-[5px] rounded-lg relative top-3 bg-white z-100`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default MyAccountNav;
