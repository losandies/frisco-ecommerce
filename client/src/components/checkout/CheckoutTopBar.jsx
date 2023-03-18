import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

const CheckoutTopBar = () => {
    return (
        <div className="h-16 w-full flex items-center">
            <div className="w-1/3">Back</div>
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
