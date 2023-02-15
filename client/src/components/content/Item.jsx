import React from "react";

const Item = ({ name, brand, price }) => {
    return (
        <div className="w-64 h-96 flex flex-col mr-6">
            <div className="item-photo w-64 h-72 bg-red-200 rounded-lg"></div>
            <div className="item-description pl-3 pt-2">
                <h1>{name}</h1>
                <h1 className="text-xs">{brand}</h1>
                <h3 className="text-xs text-neutral-500">${price}</h3>
            </div>
        </div>
    );
};

export default Item;
