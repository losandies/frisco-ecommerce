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
            className={`sidebar relative w-60 h-full px-10 ${
                scrollY > 70 ? "pt-[26vh]" : "pt-[4.2rem]"
            }`}
        >
            <div className="fixed">
                <h1 className="text-xl font-bold">Explore</h1>

                <li className="list-none text-sm mt-6">
                    <ul className="my-6">⚡️ New In</ul>
                    <ul className="my-6">🧥 Clothing</ul>
                    <ul className="my-6">👟 Shoes</ul>
                    <ul className="my-6">👜 Accessories</ul>
                    <ul className="my-6">🤸🏽‍♂️ Activewear</ul>
                    <ul className="my-6">🎁 Gifts</ul>
                </li>
            </div>
        </div>
    );
};

export default SideBar;
