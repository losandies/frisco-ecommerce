import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.jpeg";
import aaliyah from "../../assets/aaliyah_t.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCartTotalItems } from "../../redux/cart/cartSlice";
import { useMediaQuery } from "react-responsive";
import { sizes } from "../../screenSizes";
import { Spiral as Hamburger } from "hamburger-react";
import { useState } from "react";
import { toggleMenu } from "../../redux/nav/navigationSlice";
import MenuItem from "./MenuItem.jsx";

const NavBar = ({ loggedIn }) => {
    const { user } = useSelector((state) => state.auth);
    const { cart, amountOfItems } = useSelector((state) => state.cart);
    const { menuOpen } = useSelector((state) => state.nav);

    const isMobile = useMediaQuery({ maxWidth: sizes.md });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartTotalItems());
        console.log(menuOpen);
    }, [menuOpen]);

    const switchCategories = (category, subcategory) => {
        navigate(`/${category.toLowerCase()}/${subcategory.toLowerCase()}`);
        dispatch(switchPage({ category, subcategory }));
        dispatch(toggleMenu());
    };

    return (
        <>
            {isMobile ? (
                <nav
                    className={`flex items-center flex-col justify-center w-full md:px-3`}
                >
                    <div className="flex flex-row justify-between w-full  h-16">
                        <div className="nav-left flex items-center w-1/3">
                            <Hamburger
                                size={24}
                                onToggle={() => dispatch(toggleMenu())}
                            />
                        </div>
                        <div className="flex justify-center items-center w-1/3">
                            <a href="/" className="text-2xl">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="max-w-[80px] h-[30px]"
                                />
                            </a>
                        </div>
                        <div className="flex justify-end w-1/3 pr-3">
                            {user ? (
                                <div className="avatar flex items-center">
                                    <div className="w-10 mask mask-squircle">
                                        <img src={aaliyah} />
                                    </div>
                                    {/* <h1 className="ml-6">
                                    Hello, {user.firstName}
                                </h1> */}
                                </div>
                            ) : (
                                <div className="text-neutral-700 font-normal">
                                    <a href="/login" className="underline">
                                        Log In
                                    </a>
                                    <span> or </span>
                                    <a href="/register" className="underline">
                                        Register
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`flex justify-center pt-10 text-lg uppercase ${
                            menuOpen
                                ? "flex w-full h-[200px] text-black"
                                : "opacity-0 h-[1px]"
                        } ease-out duration-300`}
                    >
                        <ul className="w-full">
                            <Link
                                to="/"
                                className={`${
                                    menuOpen
                                        ? "text-center tracking-[.25em] flex w-full flex-col"
                                        : "hidden"
                                }`}
                            >
                                new in
                            </Link>
                            <MenuItem
                                category="Clothing"
                                sub1="shirts"
                                sub2="hoodies"
                                sub3="pants"
                            />
                            <MenuItem
                                category="Accessories"
                                sub1="Jewelry"
                                sub2="hats"
                                sub3="sunglasses"
                            />
                            <MenuItem
                                category="Shoes"
                                sub1="casual"
                                sub2="sneakers"
                                sub3="boots"
                            />
                        </ul>
                    </div>
                </nav>
            ) : (
                <nav className="flex items-center h-16 w-full px-8">
                    <div className="h-full w-full flex flex-row items-center justify-between mt-4">
                        <div className="nav-left flex items-center w-3/5">
                            <a href="/" className="text-2xl">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="max-w-[180px] h-[50px]"
                                />
                            </a>
                            <input
                                type="search"
                                name=""
                                id=""
                                className="rounded-lg w-[380px] h-10 p-3 ml-32 outline-slate-200"
                                placeholder="Search for items and brands..."
                            />
                        </div>
                        <div className="nav-right flex items-center w-90">
                            <Link
                                to="/cart"
                                className="flex justify-center items-center h-10 w-24 bg-neutral-200 hover:bg-neutral-300 text-sm text-neutral-700 rounded-lg mr-10"
                            >
                                <MdOutlineShoppingCart className="text-xl" />
                                <h3>{amountOfItems}</h3>
                            </Link>

                            {user ? (
                                <div className="avatar flex items-center">
                                    <div className="w-10 mask mask-squircle">
                                        <img src={aaliyah} />
                                    </div>
                                    <h1 className="ml-6">
                                        Hello, {user.firstName}
                                    </h1>
                                </div>
                            ) : (
                                <div className="text-neutral-700 font-normal">
                                    <a href="/login" className="underline">
                                        Log In
                                    </a>
                                    <span> or </span>
                                    <a href="/register" className="underline">
                                        Register
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default NavBar;
