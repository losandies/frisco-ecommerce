import React from "react";
import { Link } from "react-router-dom";
import wutang from "../../assets/wutangshirt.png";

const Item = ({ id, name, brand, price, imgPath }) => {
    return (
        <div className="max-w-72 max-h-[34rem] flex flex-col lg:ml-7 sm:ml-15 pl-10 md:pl-0 mb-10">
            <div>
                <Link to={`/item/${id}`}>
                    <img
                        src={`../../src/assets/${imgPath}`}
                        className="item-photo h-68 bg-red-200 rounded-lg"
                    ></img>
                    <div className="item-description pl-3 pt-2 flex flex-col items-start">
                        <h1>{name}</h1>
                        <h1 className="text-xs">{brand}</h1>
                        <h3 className="text-xs text-neutral-500">${price}</h3>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Item;
