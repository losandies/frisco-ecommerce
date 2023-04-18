import React, { useEffect } from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { sizes } from "../../screenSizes";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
    const isMobile = useMediaQuery({ maxWidth: sizes.lg });

    const [scrollY, setScrollY] = useState(0);

    const watchScroll = () => {
        window.addEventListener("scroll", () => {
            setScrollY(window.pageYOffset);
        });
    };

    useEffect(() => {
        watchScroll();
    });

    return (
        <>
            {isMobile ? (
                <div className="hidden"></div>
            ) : (
                <div
                    className={`sidebar relative w-60 h-full pr-10 ${
                        scrollY > 70 ? "pt-[30vh]" : "pt-[4.2rem]"
                    }`}
                >
                    <div className="fixed">
                        <h1 className="text-xl font-bold pl-10">Explore</h1>

                        <ul className="list-none text-sm mt-4 w-60 cursor-pointer">
                            <li className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                                <Link to="/" className="uppercase">
                                    New In
                                </Link>
                            </li>
                            <SideBarItem
                                category="Clothing"
                                sub1="Shirts"
                                sub2="Hoodies"
                                sub3="Pants"
                            />
                            <SideBarItem
                                category="Shoes"
                                sub1="Sneakers"
                                sub2="Boots"
                                sub3="Casual"
                            />
                            <SideBarItem
                                category="Accessories"
                                sub1="Hats"
                                sub2="Jewelry"
                                sub3="Sunglasses"
                            />
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default SideBar;
