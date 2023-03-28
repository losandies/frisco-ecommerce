import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { switchPage, toggleMenu } from "../../redux/nav/navigationSlice";

const MenuItem = ({ category, sub1, sub2, sub3 }) => {
    const { menuOpen } = useSelector((state) => state.nav);

    const [isFocused, setIsFocused] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const switchCategories = (category, subcategory) => {
        navigate(`/${category.toLowerCase()}/${subcategory.toLowerCase()}`);
        dispatch(switchPage({ category, subcategory }));
        dispatch(toggleMenu());
    };

    return (
        <li
            className={`${
                menuOpen
                    ? "text-center tracking-[.25em] flex w-full flex-col ease-in duration-500"
                    : "hidden"
            }`}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
        >
            <h1>{category}</h1>
            <ul
                className={`${
                    isFocused
                        ? "flex text-sm tracking-widest w-full py-1 justify-center uppercase text-black font-light px-10"
                        : "hidden"
                }`}
            >
                <li className="w-1/3">
                    <h1 onClick={() => switchCategories(category, sub1)}>
                        {sub1}
                    </h1>
                </li>
                <li className="w-1/3">
                    <h1 onClick={() => switchCategories(category, sub2)}>
                        {sub2}
                    </h1>
                </li>
                <li className="w-1/3">
                    <h1 onClick={() => switchCategories(category, sub3)}>
                        {sub3}
                    </h1>
                </li>
            </ul>
        </li>

        // <li
        //             className={`${
        //                 menuOpen
        //                     ? "text-center tracking-[.50em] flex flex-col"
        //                     : "hidden"
        //             }`}
        //             onClick={() => setIsFocused(true)}
        //         >
        //             new in
        //             <ul
        //                 className={`${
        //                     isFocused ? "block uppercase" : "hidden"
        //                 }`}
        //             ></ul>
        //         </li>
        //         <li
        //             className={`${
        //                 menuOpen
        //                     ? "block text-center tracking-[.50em]"
        //                     : "hidden"
        //             }`}
        //         >
        //             Clothing
        //         </li>
        //         <li
        //             className={`${
        //                 menuOpen
        //                     ? "block text-center tracking-[.50em]"
        //                     : "hidden"
        //             }`}
        //         >
        //             accessories
        //         </li>
        //         <li
        //             className={`${
        //                 menuOpen
        //                     ? "block text-center tracking-[.50em]"
        //                     : "hidden"
        //             }`}
        //         >
        //             Shoes
        //         </li>
    );
};

export default MenuItem;