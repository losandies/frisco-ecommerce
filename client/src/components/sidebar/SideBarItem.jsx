import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchPage } from "../../redux/nav/navigationSlice";

const SideBarItem = ({ category, sub1, sub2, sub3 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state.nav);

    return (
        <li
            className={`flex flex-col ease-in-out duration-300 pt-2 rounded-r-md ${
                isHovered ? "h-32 bg-neutral-300" : "h-10"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h1 className={`uppercase pl-10`}>{category}</h1>
            <ul className={`${isHovered ? "block uppercase" : "hidden"}`}>
                <li className="my-2 pl-[4.8rem] ease-in-out duration-300 hover:text-white hover:font-bold">
                    <h1 onClick={() => dispatch(switchPage(sub1))}>{sub1}</h1>
                </li>
                <li className="my-2 pl-[4.8rem] ease-in-out duration-300 hover:text-white hover:font-bold">
                    <h1 onClick={() => dispatch(switchPage(sub2))}>{sub2}</h1>
                </li>
                <li className="my-2 pl-[4.8rem] ease-in-out duration-300 hover:text-white hover:font-bold">
                    <h1 onClick={() => dispatch(switchPage(sub3))}>{sub3}</h1>
                </li>
            </ul>
        </li>
    );
};

export default SideBarItem;
