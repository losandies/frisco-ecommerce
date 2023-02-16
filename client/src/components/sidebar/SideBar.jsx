import React from "react";

const SideBar = () => {
    return (
        <div className="w-60 h-full px-10 pt-[4.2rem]">
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
