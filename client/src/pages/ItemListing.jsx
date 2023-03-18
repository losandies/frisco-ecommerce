import React from "react";
import ItemInfo from "../components/content/ItemInfo";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";

const ItemListing = () => {
    return (
        <div className="flex flex-col h-full min-h-[100vh] w-full relative">
            <div className="content-wrap pb-[195px]">
                <NavBar />
                <div className="h-full w-full flex">
                    <div>
                        <SideBar />
                    </div>
                    <ItemInfo />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default ItemListing;
