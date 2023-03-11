import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "./FilterBar";
import Item from "./Item";

const ItemList = () => {
    const { items, isLoading } = useSelector((state) => state.items);
    const { currentPage } = useSelector((state) => state.nav);

    const selectedCategory = items.filter(
        (item) => item.subcategory === currentPage.toLowerCase()
    );
    const itemsToShow = () =>
        selectedCategory.map((item) => <Item key={item.id} item={item} />);

    return (
        <div className="h-full w-full px-10 pt-12 mb-[300px]">
            <FilterBar selectedPage={currentPage} />
            <div className="items-container grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-full mt-10">
                {itemsToShow()}
            </div>
        </div>
    );
};

export default ItemList;
