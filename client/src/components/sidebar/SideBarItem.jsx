import React from "react";
import { useState } from "react";

const SideBarItem = ({ category, sub1, sub2, sub3 }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <li
            className={`flex flex-col pt-2 rounded-r-md ${
                isHovered ? "h-32 bg-neutral-300" : "h-10"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h1 className={`uppercase pl-10`}>{category}</h1>
            <ul className={`${isHovered ? "block uppercase" : "hidden"}`}>
                <li className="my-2 pl-[4.8rem] hover:text-white hover:font-bold">
                    {sub1}
                </li>
                <li className="my-2 pl-[4.8rem] hover:text-white hover:font-bold">
                    {sub2}
                </li>
                <li className="my-2 pl-[4.8rem] hover:text-white hover:font-bold">
                    {sub3}
                </li>
            </ul>
        </li>
    );
};

export default SideBarItem;
