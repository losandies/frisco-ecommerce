import React from "react";
import ItemInfo from "../components/content/ItemInfo";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";

const ItemListing = () => {
    return (
        <div className="flex flex-col h-full">
            <NavBar />
            <div className="h-[80%] w-full flex">
                <SideBar />
                <ItemInfo />
            </div>
            <Footer />
        </div>
    );
};

export default ItemListing;
