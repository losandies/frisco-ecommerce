import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../public/assets/logo.jpeg";
import defaultAvatar from "../../../public/assets/default-avatar.jpg";
import { useMediaQuery } from "react-responsive";
import { sizes } from "../../screenSizes";
import { Spiral as Hamburger } from "hamburger-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { toggleMenu } from "../../redux/nav/navigationSlice";
import { getCartTotalItems } from "../../redux/cart/cartSlice";

import MenuItem from "./MenuItem.jsx";
import AccountMenu from "./AccountMenu";
import { logout } from "../../redux/user/userSlice";

const NavBar = () => {
    const { user } = useSelector((state) => state.auth);
    const { amountOfItems } = useSelector((state) => state.cart);
    const { menuOpen } = useSelector((state) => state.nav);

    const dispatch = useDispatch();

    const isMobile = useMediaQuery({ maxWidth: sizes.lg });

    useEffect(() => {
        dispatch(getCartTotalItems());
    }, [menuOpen]);

    return (
        <>
            {isMobile ? (
                <nav
                    className={`flex items-center flex-col justify-center w-full md:px-3`}
                >
                    <div className="flex flex-row justify-between w-full h-16">
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
                                        <Link to="/account">
                                            <img src={defaultAvatar} />
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-neutral-700 font-normal flex items-center justify-center">
                                    <a
                                        href="/login"
                                        className="underline text-xs md:text-base mr-1"
                                    >
                                        Log In
                                    </a>
                                    <span className="text-xs md:text-base">
                                        or
                                    </span>
                                    <a
                                        href="/register"
                                        className="underline text-xs md:text-base ml-1"
                                    >
                                        Register
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`flex justify-center pt-10 text-lg uppercase ${
                            menuOpen
                                ? `flex w-full ${
                                      user ? "h-[250px]" : "h-[200px]"
                                  } text-black z-50`
                                : "opacity-0 h-[1px]"
                        } ease-in-out duration-300`}
                    >
                        <ul className="w-full">
                            <Link
                                to="/"
                                className={`${
                                    menuOpen
                                        ? "text-center tracking-[.25em] flex w-full flex-col"
                                        : "hidden"
                                }`}
                                onClick={() => dispatch(toggleMenu())}
                            >
                                new in
                            </Link>
                            <MenuItem
                                category="Clothing"
                                sub1="shirts"
                                sub2="hoodies"
                                sub3="pants"
                                onClick={() => dispatch(toggleMenu())}
                            />
                            <MenuItem
                                category="Accessories"
                                sub1="Jewelry"
                                sub2="hats"
                                sub3="sunglasses"
                                onClick={() => dispatch(toggleMenu())}
                            />
                            <MenuItem
                                category="Shoes"
                                sub1="casual"
                                sub2="sneakers"
                                sub3="boots"
                                onClick={() => dispatch(toggleMenu())}
                            />
                            <Link
                                to="/cart"
                                className={`${
                                    menuOpen
                                        ? "text-center tracking-[.25em] flex font-bold w-full flex-col"
                                        : "hidden"
                                }`}
                                onClick={() => dispatch(toggleMenu())}
                            >
                                cart({amountOfItems})
                            </Link>
                            {user ? (
                                <h1
                                    className={`${
                                        menuOpen
                                            ? "text-center tracking-[.25em] flex w-full flex-col"
                                            : "hidden"
                                    }`}
                                    onClick={() => dispatch(logout())}
                                >
                                    log out
                                </h1>
                            ) : null}
                        </ul>
                    </div>
                </nav>
            ) : (
                <nav className="flex items-center h-16 w-full px-8 2xl:px-0">
                    <div className="h-full w-full flex flex-row items-center justify-between mt-4">
                        <div className="nav-left flex items-center w-3/5 2xl:ml-8">
                            <a href="/" className="text-2xl">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="max-w-[180px] h-[50px]"
                                />
                            </a>
                        </div>
                        <div className="nav-right flex h-12 w-90 2xl:mr-[4.2rem]">
                            <Link
                                to="/cart"
                                className="flex justify-center items-center h-10 w-24 bg-neutral-200 hover:bg-neutral-300 text-sm text-neutral-700 rounded-lg mr-10"
                            >
                                <MdOutlineShoppingCart className="text-xl" />
                                <h3>{amountOfItems}</h3>
                            </Link>

                            {user ? (
                                <AccountMenu />
                            ) : (
                                <div className="text-neutral-700 font-normal md:mt-1">
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
