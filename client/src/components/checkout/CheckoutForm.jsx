import React from "react";

// import states from "../components/checkout/states";

const CheckoutForm = () => {
    return (
        <div className="w-full md:w-1/2 max-w-[600px] md:justify-center">
            <form action="" className="w-full h-full md:mt-10 p-1 pb-4 md:p-5">
                <h2 className="text-2xl font-bold ml-1">Shipping Info</h2>
                <div className="dual-input flex justify-between mt-5">
                    <div className="w-[49%] h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">First Name</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-1"
                        />
                    </div>
                    <div className="w-[49%] h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">Last Name</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-1"
                        />
                    </div>
                </div>
                <div className="single-input mt-3">
                    <div className="w-full h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">Address</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-1"
                        />
                    </div>
                </div>
                <div className="single-input mt-3">
                    <div className="w-full h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">Apt/Suite</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-1"
                        />
                    </div>
                </div>
                <div className="dual-input flex justify-between mt-3">
                    <div className="w-[49%] h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">City</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-1"
                        />
                    </div>
                    <div className="w-[49%] h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">Zip</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-1"
                        />
                    </div>
                </div>
                <div className="w-full h-5 mt-3 flex items-center justify-end">
                    <input type="checkbox" name="" id="" className="mr-2" />
                    <h2>Save as default address?</h2>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
