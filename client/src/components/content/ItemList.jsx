import React from "react";
import { useSelector } from "react-redux";
import FilterBar from "./FilterBar";
import Item from "./Item";

const ItemList = () => {
    const { items, sortDirection } = useSelector((state) => state.items);
    const { subcategory } = useSelector((state) => state.nav);

    const selectedCategory = items.filter(
        (item) => item.subcategory === subcategory.toLowerCase()
    );

    const sortItems = (sortDirection) =>
        sortDirection === "high"
            ? selectedCategory
                  .sort((a, b) =>
                      parseInt(a.price) < parseInt(b.price) ? 1 : -1
                  )
                  .map((item) => <Item key={item.id} item={item} />)
            : sortDirection === "low"
            ? selectedCategory
                  .sort((a, b) =>
                      parseInt(a.price) > parseInt(b.price) ? 1 : -1
                  )
                  .map((item) => <Item key={item.id} item={item} />)
            : selectedCategory.map((item) => (
                  <Item key={item.id} item={item} />
              ));

    return (
        <div className="h-full w-full flex flex-col justify-center px-10 md:pt-12 mb-[100px]">
            <FilterBar />
            <div className="items-container place-items-center grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-full mt-10 md:mb-[200px]">
                {sortItems(sortDirection)}
            </div>
        </div>
    );
};

export default ItemList;
