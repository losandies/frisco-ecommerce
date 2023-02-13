import React from "react";
import { FaSort } from "react-icons/fa";

const FilterBar = ({ selectedPage }) => {
    return (
        <div className="w-full h-16 flex justify-between">
            <div className="text-xl font-bold">{selectedPage}</div>
            <div className="toggles flex">
                <div className="gender-select w-60 h-12 border-2 border-slate-200 rounded-xl flex mx-10">
                    <div className="flex items-center justify-center w-1/2 h-full bg-slate-200 rounded-l-lg ">
                        Women
                    </div>
                    <div className="flex items-center justify-center w-1/2 h-full">
                        Men
                    </div>
                </div>
                <div className="sort bg-slate-200 w-[7.5rem] h-12 border-2 border-slate-200 rounded-xl flex justify-center items-center">
                    Sort
                    <FaSort className="ml-1" />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
