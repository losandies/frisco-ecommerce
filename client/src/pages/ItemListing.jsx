import React from "react";
import ItemInfo from "../components/content/ItemInfo";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import PageContainer from "../components/misc/PageContainer";

const ItemListing = () => {
    return (
        <PageContainer>
            <NavBar />
            <div className="h-full w-full flex mb-[150px]">
                <div>
                    <SideBar />
                </div>
                <ItemInfo />
            </div>
        </PageContainer>
    );
};

export default ItemListing;
