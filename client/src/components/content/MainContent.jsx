import React from "react";
import FilterBar from "./FilterBar";
import Item from "./Item";

const content = [
    {
        name: "Fleece Fall Jacket",
        brand: "Maroons",
        price: "84.99",
        category: "clothing",
    },
    {
        name: "Vintage Graphic T",
        brand: "Lewis Cupper",
        price: "124.99",
        category: "clothing",
    },
    {
        name: "Air Force 1",
        brand: "Nike",
        price: "89.99",
        category: "shoes",
    },
];

const MainContent = () => {
    return (
        <div className="h-full w-full px-10 pt-12">
            <FilterBar selectedPage={"⚡️ New In"} />
            <div className="items-container flex flex-grow w-full h-full mt-6 pl-5">
                {content.map((item) => (
                    <Item
                        name={item.name}
                        brand={item.brand}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainContent;
