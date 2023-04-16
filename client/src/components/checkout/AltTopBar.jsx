import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { IoIosArrowBack } from "react-icons/io";

const AltTopBar = () => {
    const pagePath = window.location.href;

    return (
        <div className="h-16 py-6 md:py-0 w-full flex items-center border-b-[1px]">
            <Link
                to={`${
                    pagePath.endsWith("checkout")
                        ? "/cart"
                        : pagePath.endsWith("account")
                        ? "/"
                        : null
                }`}
                className="w-1/3 pl-5 flex items-center hover:underline"
            >
                <IoIosArrowBack /> Back
            </Link>
            <Link to="/" className="w-1/3 flex justify-center">
                <img
                    src={logo}
                    alt="FRISCO"
                    className="max-w-[80px] h-[30px] md:max-w-[180px] md:h-[50px]"
                />
            </Link>
        </div>
    );
};

export default AltTopBar;
