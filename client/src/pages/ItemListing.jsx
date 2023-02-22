import React from "react";
import ItemInfo from "../components/content/ItemInfo";
import MainContent from "../components/content/MainContent";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";

const ItemListing = () => {
    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="h-full w-full flex">
                <SideBar />
                <ItemInfo />
            </div>
        </div>
    );
};

export default ItemListing;
