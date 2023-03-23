import React from "react";
import ItemDivider from "../cart/ItemDivider";
import { useMediaQuery } from "react-responsive";
import { sizes } from "../../screenSizes";
import AccountReminder from "./AccountReminder";
import { useSelector } from "react-redux";

// import states from "../components/checkout/states";

const CheckoutForm = () => {
    const isMobile = useMediaQuery({ maxWidth: sizes.md });
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="w-full md:w-1/2 max-w-[600px] md:justify-center">
            {isMobile && !user ? <AccountReminder /> : null}
            <form
                action=""
                className="w-full h-full p-1 mt-5 md:mt-0 pb-4 md:p-5 md:pt-0"
            >
                <h2 className="text-2xl font-bold ml-1">Shipping Info</h2>
                <div className="dual-input flex justify-between mt-5">
                    <div className="w-[49%] h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">First Name</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-2"
                        />
                    </div>
                    <div className="w-[49%] h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">Last Name</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-2"
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
                            className="w-[80%] outline-none absolute left-2"
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
                            className="w-[80%] outline-none absolute left-2"
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
                            className="w-[80%] outline-none absolute left-2"
                        />
                    </div>
                    <div className="w-[49%] h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">Zip</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-2"
                        />
                    </div>
                </div>
                <div className="single-input mt-3">
                    <div className="w-full h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">State</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-2"
                        />
                    </div>
                </div>
                <div className="w-full h-5 mt-3 flex items-center justify-end">
                    <input type="checkbox" name="" id="" className="mr-2" />
                    <h2>Save as default address?</h2>
                </div>

                <h2 className="text-2xl font-bold ml-1 mt-5">Payment Method</h2>
                <div className="single-input mt-5">
                    <div className="w-full h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">Cardholder Name</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-2"
                            value="John Doe"
                            readOnly
                        />
                    </div>
                </div>
                <div className="single-input mt-3">
                    <div className="w-full h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">Card Number</p>
                        </div>
                        <input
                            type="text"
                            className="w-[80%] outline-none absolute left-2"
                            value="1111 2342 7777 8273"
                            readOnly
                        />
                    </div>
                </div>
                <div className="dual-input flex justify-between mt-3">
                    <div className="w-[49%] h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">Exp. Month</p>
                        </div>
                        <select
                            type="text"
                            className="w-[95%] outline-none absolute left-1 bottom-2"
                            defaultValue="03"
                            readOnly
                        >
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div className="w-[49%] h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">Exp. Year</p>
                        </div>
                        <select
                            type="text"
                            className="w-[95%] outline-none absolute left-1 bottom-2"
                            defaultValue="2025"
                            readOnly
                        >
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                        </select>
                    </div>
                </div>
                <div className="single-input mt-3">
                    <div className="w-full h-12 border-[1px] rounded-md border-black p-4 relative">
                        <div className="absolute top-1 left-1">
                            <p className="text-[10px]">CVV*</p>
                        </div>
                        <input
                            type="password"
                            className="w-[80%] outline-none absolute left-2"
                            value="392"
                            readOnly
                        />
                    </div>
                </div>
                <button className="w-full h-16 mt-5 rounded-sm bg-black text-white uppercase">
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
