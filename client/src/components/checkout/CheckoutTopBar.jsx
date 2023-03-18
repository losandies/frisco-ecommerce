import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { IoIosArrowBack } from "react-icons/io";

const CheckoutTopBar = () => {
    return (
        <div className="h-16 w-full flex items-center border-b-[1px]">
            <Link
                to="/cart"
                className="w-1/3 pl-5 flex items-center hover:underline"
            >
                <IoIosArrowBack /> Back
            </Link>
            <Link to="/home" className="w-1/3 flex justify-center">
                <img
                    src={logo}
                    alt="FRISCO"
                    className="max-w-[180px] h-[50px]"
                />
            </Link>
        </div>
    );
};

export default CheckoutTopBar;
