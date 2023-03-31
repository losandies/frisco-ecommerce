import React, { useState } from "react";

const MyAccountNav = () => {
    const [currentTab, setCurrentTab] = useState("profile");
    return (
        <div className="w-full justify-center items-center flex flex-col">
            <div className="h-12 w-full flex justify-center items-center border-b-[1px]">
                <div className="w-[80%] h-12 bg-black flex">
                    <div
                        className={`w-1/3 h-full bg-white flex items-center justify-center border-b-[1px] flex-col relative cursor-pointer ${
                            currentTab === "profile"
                                ? "text-black font-bold"
                                : "text-gray-300"
                        }`}
                    >
                        <h1
                            className=""
                            onClick={() => setCurrentTab("profile")}
                        >
                            My Profile
                        </h1>
                    </div>
                    <div
                        className={`w-1/3 h-full bg-white flex items-center justify-center border-b-[1px] cursor-pointer ${
                            currentTab === "orders"
                                ? "text-black font-bold"
                                : "text-gray-300"
                        }`}
                    >
                        <h1
                            className=""
                            onClick={() => setCurrentTab("orders")}
                        >
                            My Orders
                        </h1>
                    </div>
                    <div
                        className={`w-1/3 h-full bg-white flex items-center justify-center border-b-[1px] cursor-pointer ${
                            currentTab === "addresses"
                                ? "text-black font-bold"
                                : "text-gray-300"
                        }`}
                    >
                        <h1
                            className=""
                            onClick={() => setCurrentTab("addresses")}
                        >
                            Addresses
                        </h1>
                    </div>
                </div>
            </div>
            <div className="w-[80%] h-12 flex">
                <div
                    className={`w-1/3 h-12 relative flex justify-center transform duration-300 ease-in-out ${
                        currentTab === "orders"
                            ? "ml-[33.33%]"
                            : currentTab === "addresses"
                            ? "ml-[66.66%]"
                            : "ml-0"
                    }`}
                >
                    <div
                        className={`w-[5px] h-[5px] rounded-lg relative top-3 bg-black `}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default MyAccountNav;
