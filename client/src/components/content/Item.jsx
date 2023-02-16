import React from "react";
import wutang from "../../assets/wutangshirt.png";

const Item = ({ name, brand, price, img_path }) => {
    return (
        <div className="max-w-72 max-h-[34rem] flex flex-col lg:ml-7 sm:ml-15 pl-10 md:pl-0">
            <img
                src={wutang}
                className="item-photo w-72 h-68 bg-red-200 rounded-lg"
            ></img>
            <div className="item-description pl-3 pt-2 flex flex-col items-start">
                <h1>{name}</h1>
                <h1 className="text-xs">{brand}</h1>
                <h3 className="text-xs text-neutral-500">${price}</h3>
            </div>
        </div>
    );
};

export default Item;
