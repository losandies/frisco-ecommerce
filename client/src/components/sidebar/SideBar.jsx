import React, { useEffect } from "react";
import { useState } from "react";

const SideBar = () => {
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
        <div
            className={`sidebar relative w-60 h-[100vh] pr-10 ${
                scrollY > 70 ? "pt-[26vh]" : "pt-[4.2rem]"
            }`}
        >
            <div className="fixed">
                <h1 className="text-xl font-bold pl-10">Explore</h1>

                <li className="list-none text-sm mt-4 w-60 cursor-pointer ">
                    <ul className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                        ⚡️ New In
                    </ul>
                    <ul className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                        🧥 Clothing
                    </ul>
                    <ul className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                        👟 Shoes
                    </ul>
                    <ul className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                        👜 Accessories
                    </ul>
                    <ul className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                        🤸🏽‍♂️ Activewear
                    </ul>
                    <ul className="h-10 flex transition ease-out items-center hover:bg-neutral-300 pl-10 rounded-r-md">
                        🎁 Gifts
                    </ul>
                </li>
            </div>
        </div>
    );
};

export default SideBar;
