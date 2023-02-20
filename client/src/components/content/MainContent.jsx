import React from "react";
import FilterBar from "./FilterBar";
import Item from "./Item";
import { images } from "./clothingImages";

const content = [
    {
        name: "Fleece Fall Jacket",
        brand: "Maroons",
        price: "84.99",
        category: "clothing",
        imgPath: "wutangshirt.png",
    },
    {
        name: "Vintage Graphic T",
        brand: "Lewis Cupper",
        price: "124.99",
        category: "clothing",
        imgPath: "battleground_t.jpeg",
    },
    {
        name: "Air Force 1",
        brand: "Nike",
        price: "89.99",
        category: "shoes",
        imgPath: "budweiser_thermal.jpeg",
    },
    {
        name: "Fleece Fall Jacket",
        brand: "Maroons",
        price: "84.99",
        category: "clothing",
        imgPath: "outkast_t.jpeg",
    },
    {
        name: "Vintage Graphic T",
        brand: "Lewis Cupper",
        price: "124.99",
        category: "clothing",
        imgPath: "pinks_t.jpeg",
    },
    {
        name: "Air Force 1",
        brand: "Nike",
        price: "89.99",
        category: "shoes",
        imgPath: "self_care_t.jpeg",
    },
    {
        name: "Fleece Fall Jacket",
        brand: "Maroons",
        price: "84.99",
        category: "clothing",
        imgPath: "harvard_t.jpeg",
    },
    {
        name: "Vintage Graphic T",
        brand: "Lewis Cupper",
        price: "124.99",
        category: "clothing",
        imgPath: "fenty_t.jpeg",
    },
    {
        name: "Air Force 1",
        brand: "Nike",
        price: "89.99",
        category: "shoes",
        imgPath: "columbia_t.jpeg",
    },
];

const MainContent = () => {
    return (
        <div className="h-full w-full px-10 pt-12">
            <FilterBar selectedPage={"⚡️ New In"} />
            <div className="items-container grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-full mt-10">
                {content.map((item) => (
                    <Item
                        name={item.name}
                        brand={item.brand}
                        price={item.price}
                        imgPath={item.imgPath}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainContent;
