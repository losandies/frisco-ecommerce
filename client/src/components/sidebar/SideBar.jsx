import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
    const [scrollY, setScrollY] = useState(0);
    const { currentPage } = useSelector((state) => state.nav);
    const [clothingClicked, setClothingClicked] = useState(false);
    const [shoesClicked, setShoesClicked] = useState(false);
    const [accClicked, setAccClicked] = useState(false);
    const [activeClicked, setActiveClicked] = useState(false);

    const watchScroll = () => {
        window.addEventListener("scroll", () => {
            setScrollY(window.pageYOffset);
        });
    };

    useEffect(() => {
        watchScroll();
    });

    useEffect(() => {
        console.log(currentPage);
    }, [currentPage]);

    return (
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
                    {/* ['👜','👟','🧥'] */}
                    {/* <SideBarItem
                        category="🤸🏽‍♂️ Activewear"
                        sub1="Shirts"
                        sub2="Hoodies"
                        sub3=""
                    /> */}
                    {/* <li
                        className="flex transition duration-300 ease-in flex-col h-10 justify-center hover:bg-neutral-300 pl-10 rounded-r-md hover:h-32 hover:pt-[10px] hover:justify-start"
                        onMouseEnter={() => setClothingClicked(true)}
                        onMouseLeave={() => setClothingClicked(false)}
                    >
                        <h1>🧥 Clothing</h1>
                        <ul className={clothingClicked ? "block" : "hidden"}>
                            <li>Shirts</li>
                            <li>Hoodies</li>
                            <li>Pants</li>
                        </ul>
                    </li>
                    <li className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                        👟 Shoes
                    </li>
                    <li className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                        👜 Accessories
                    </li>
                    <li className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                        🤸🏽‍♂️ Activewear
                    </li>
                    <li className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                        🎁 Gifts
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
