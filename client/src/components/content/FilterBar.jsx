import React from "react";
import { FaSort } from "react-icons/fa";

const FilterBar = ({ selectedPage }) => {
    return (
        <div className="h-16 flex md:flex-row md:justify-between justify-start md:items-center">
            <div className="text-xl font-bold">{selectedPage}</div>
            <div className="toggles flex">
                <div className="gender-select w-60 h-12 border-2 border-slate-200 rounded-xl flex mr-6">
                    <button className="flex items-center justify-center w-1/2 h-full bg-slate-200 rounded-l-lg ">
                        Women
                    </button>
                    <button className="flex items-center justify-center w-1/2 h-full">
                        Men
                    </button>
                </div>
                <button className="dropdown bg-slate-200 w-[7.5rem] h-12 border-2v rounded-xl flex justify-center items-center">
                    <label className="ml-1">Sort</label>
                    <FaSort className="ml-1" />
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 mt-40 mr-[25px] text-xs"
                    >
                        <li>
                            <a>Price low to high</a>
                        </li>
                        <li>
                            <a>Price high to low</a>
                        </li>
                    </ul>
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
