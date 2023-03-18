import React from "react";

const CheckOutModal = () => {
    return (
        <div className="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="min-w-[1000px] min-h-[1100px] flex justify-center items-center bg-white opacity  rounded-sm">
                <div className="h-[600px] w-[900px] p-20 flex">
                    <form action="" className="w-1/2 h-full flex">
                        <div className="flex flex-col">
                            <label htmlFor="">Street Name:</label>
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full h-8 border-2"
                            />
                        </div>
                    </form>
                    <div className="h-full w-[2px] bg-gray-400"></div>
                    <form
                        action=""
                        className="w-1/2 h-full flex justify-center"
                    >
                        Again
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckOutModal;
