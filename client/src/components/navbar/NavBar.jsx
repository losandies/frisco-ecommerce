import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.jpeg";
import aaliyah from "../../assets/aaliyah_t.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCartTotal } from "../../redux/cart/cartSlice";

const NavBar = ({ loggedIn }) => {
    const { user } = useSelector((state) => state.auth);
    const { cart, total } = useSelector((state) => state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartTotal());
    });

    return (
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
                        <h3>{total}</h3>
                    </Link>

                    {user ? (
                        <div className="avatar flex items-center">
                            <div className="w-10 mask mask-squircle">
                                <img src={aaliyah} />
                            </div>
                            <h1 className="ml-6">Hello {user.name}</h1>
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
    );
};

export default NavBar;
