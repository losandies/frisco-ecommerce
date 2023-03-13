import React, { useState } from "react";
import { FaSort } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changeSort } from "../../redux/items/itemsSlice";

const FilterBar = ({ selectedPage }) => {
    const { category, subcategory } = useSelector((state) => state.nav);

    const dispatch = useDispatch();

    const [menuDisplay, setmenuDisplay] = useState(true);
    const [displayMenuStyle, setdisplayMenuStyle] = useState("");

    const showMenu = () => {
        setmenuDisplay(!menuDisplay);
        if (menuDisplay) {
            setdisplayMenuStyle("");
        } else {
            setdisplayMenuStyle("none");
        }
        return menuDisplay;
    };

    return (
        <div className="h-16 flex md:flex-row md:justify-between justify-start md:items-center">
            <div className="text-xl font-bold">
                {category} ⌁ {subcategory}
            </div>
            <div className="toggles flex">
                <button
                    onClick={showMenu}
                    className="dropdown bg-neutral-800 text-white w-[7.5rem] h-12 border-2v rounded-xl flex justify-center items-center"
                >
                    <label className="ml-1">Sort</label>
                    <FaSort className="ml-1" />
                    <ul
                        style={{ display: displayMenuStyle }}
                        tabIndex={0}
                        className="dropdown-content bg-neutral-800 menu p-2 shadow rounded-box w-36 mt-40 mr-[25px] text-xs"
                    >
                        <li onClick={() => dispatch(changeSort("low"))}>
                            <p>Price low to high</p>
                        </li>
                        <li onClick={() => dispatch(changeSort("high"))}>
                            <p>Price high to low</p>
                        </li>
                    </ul>
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
