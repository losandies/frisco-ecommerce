import React from "react";
import ItemList from "../components/content/ItemList";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";

const Homepage = () => {
    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="h-full w-full flex">
                <SideBar />
                <ItemList />
            </div>
            <Footer />
        </div>
    );
};

export default Homepage;
