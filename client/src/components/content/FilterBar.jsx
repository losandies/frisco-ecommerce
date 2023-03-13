import React from "react";
import { FaSort } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changeSort } from "../../redux/items/itemsSlice";

const FilterBar = ({ selectedPage }) => {
    const { category, subcategory } = useSelector((state) => state.nav);

    const dispatch = useDispatch();

    return (
        <div className="h-16 flex md:flex-row md:justify-between justify-start md:items-center">
            <div className="text-xl font-bold">
                {category} ⌁ {subcategory}
            </div>
            <div className="toggles flex">
                <div className="gender-select w-60 h-12 border-2 border-neutral-300 rounded-xl flex mr-6">
                    <button className="flex items-center justify-center w-1/2 h-full bg-neutral-300 rounded-l-lg ">
                        Women
                    </button>
                    <button className="flex items-center justify-center w-1/2 h-full">
                        Men
                    </button>
                </div>
                <button className="dropdown bg-neutral-300 w-[7.5rem] h-12 border-2v rounded-xl flex justify-center items-center">
                    <label className="ml-1">Sort</label>
                    <FaSort className="ml-1" />
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 mt-40 mr-[25px] text-xs"
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
