import React, { useState } from "react";
import { useSelector } from "react-redux";

const MobileHamburgerMenu = () => {
    const { menuOpen } = useSelector((state) => state.nav);

    const [isFocused, setIsFocused] = useState(false);
    return (
        <div
            className={`flex justify-center pt-10 text-white text-lg uppercase ${
                menuOpen ? "block h-[200px] bg-black" : "bg-white h-[1px]"
            }  w-full ease-in-out duration-300`}
        >
            <ul>
                <li
                    className={`${
                        menuOpen
                            ? "text-center tracking-[.50em] flex flex-col"
                            : "hidden"
                    }`}
                    onClick={() => setIsFocused(true)}
                >
                    new in
                    <ul
                        className={`${
                            isFocused ? "block uppercase" : "hidden"
                        }`}
                    ></ul>
                </li>
                <li
                    className={`${
                        menuOpen
                            ? "block text-center tracking-[.50em]"
                            : "hidden"
                    }`}
                >
                    Clothing
                </li>
                <li
                    className={`${
                        menuOpen
                            ? "block text-center tracking-[.50em]"
                            : "hidden"
                    }`}
                >
                    accessories
                </li>
                <li
                    className={`${
                        menuOpen
                            ? "block text-center tracking-[.50em]"
                            : "hidden"
                    }`}
                >
                    Shoes
                </li>
            </ul>
        </div>
    );
};

export default MobileHamburgerMenu;
