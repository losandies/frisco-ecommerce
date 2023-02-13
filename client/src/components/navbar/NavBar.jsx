import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../../assets/logo.jpeg";

const NavBar = () => {
    return (
        <nav className="flex items-center h-16 w-full px-8">
            <div className="h-full w-full flex flex-row items-center justify-between mt-4">
                <div className="nav-left flex items-center w-3/5">
                    <a href="" className="text-2xl">
                        <img
                            src={logo}
                            alt=""
                            srcset=""
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
                    <button className="flex justify-center items-center h-10 w-24 bg-slate-100 hover:bg-slate-200 text-sm text-neutral-700 rounded-lg mr-10">
                        <MdOutlineShoppingCart className="text-xl" />
                        <h3>Cart: 2</h3>
                    </button>
                    <div className="text-neutral-700 font-normal">
                        <a href="" className="underline">
                            Log In
                        </a>
                        <span> or </span>
                        <a href="" className="underline">
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
