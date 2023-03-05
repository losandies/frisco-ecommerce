import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "./FilterBar";
import Item from "./Item";

const content = [
    {
        name: "Fleece Fall Jacket",
        brand: "Maroons",
        price: "84.99",
        category: "clothing",
        imgPath: "wutangshirt.png",
        id: 1,
    },
    {
        name: "Vintage Graphic T",
        brand: "Lewis Cupper",
        price: "124.99",
        category: "clothing",
        imgPath: "battleground_t.jpeg",
        id: 2,
    },
    {
        name: "Air Force 1",
        brand: "Nike",
        price: "89.99",
        category: "shoes",
        imgPath: "budweiser_thermal.jpeg",
        id: 3,
    },
    {
        name: "Fleece Fall Jacket",
        brand: "Maroons",
        price: "84.99",
        category: "clothing",
        imgPath: "outkast_t.jpeg",
        id: 4,
    },
    {
        name: "Vintage Graphic T",
        brand: "Lewis Cupper",
        price: "124.99",
        category: "clothing",
        imgPath: "pinks_t.jpeg",
        id: 5,
    },
    {
        name: "Air Force 1",
        brand: "Nike",
        price: "89.99",
        category: "shoes",
        imgPath: "self_care_t.jpeg",
        id: 6,
    },
    {
        name: "Fleece Fall Jacket",
        brand: "Maroons",
        price: "84.99",
        category: "clothing",
        imgPath: "harvard_t.jpeg",
        id: 7,
    },
    {
        name: "Vintage Graphic T",
        brand: "Lewis Cupper",
        price: "124.99",
        category: "clothing",
        imgPath: "fenty_t.jpeg",
        id: 8,
    },
    {
        name: "Air Force 1",
        brand: "Nike",
        price: "89.99",
        category: "shoes",
        imgPath: "columbia_t.jpeg",
        id: 9,
    },
];

const ItemList = () => {
    const { items, isLoading } = useSelector((state) => state.items);
    return (
        <div className="h-full w-full px-10 pt-12">
            <FilterBar selectedPage={"⚡️ New In"} />
            <div className="items-container grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-full mt-10">
                {content.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ItemList;
