import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";
import defaultAvatar from "../../assets/default-avatar.jpg";

const AccountMenu = () => {
    const { user } = useSelector((state) => state.auth);
    const [menuIsHovered, setMenuIsHovered] = useState(false);

    return (
        <div
            className="flex flex-col bg-neutral-200 w-[10rem] h-10 hover:h-[7rem] px-2 rounded-lg cursor-default transform duration-[200ms] relative"
            onMouseEnter={() => setMenuIsHovered(true)}
            onMouseLeave={() => setMenuIsHovered(false)}
        >
            <div className="flex flex-row justify-center">
                <div className="w-8 mt-[5px]">
                    <img
                        src={defaultAvatar}
                        className="w-[40px] h-[30px] rounded-2xl"
                    />
                </div>
                <h1 className="mx-2 mt-[10px] text-sm">
                    Hi, {user.firstName}{" "}
                </h1>
            </div>
            <ul
                className={`w-full flex items-center flex-col ease-in text-sm ${
                    menuIsHovered ? "flex h-20" : "opacity-0"
                }`}
            >
                <li
                    className={`my-1 duration-[200ms] w-full ${
                        menuIsHovered ? "h-8" : "h-1"
                    } border-[2px] bg-black text-white flex items-center justify-center rounded-md cursor-pointer`}
                >
                    <Link to="/account">
                        {" "}
                        <h1 className="">Account</h1>
                    </Link>
                </li>
                <li
                    className={`duration-[200ms] w-full ${
                        menuIsHovered ? "h-8" : "h-1"
                    } border-[2px] bg-black text-white flex items-center justify-center rounded-md cursor-pointer`}
                >
                    <h1 className="" onClick={() => dispatch(logout())}>
                        Log Out
                    </h1>
                </li>
            </ul>
        </div>
    );
};

export default AccountMenu;
