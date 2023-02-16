import React from "react";
import MainContent from "../components/content/MainContent";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";

const Homepage = () => {
    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="h-full w-full flex">
                <SideBar />
                <MainContent />
            </div>
            <Footer />
        </div>
    );
};

export default Homepage;
