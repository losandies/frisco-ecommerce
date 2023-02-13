import React from "react";
import MainContent from "../components/content/MainContent";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";

const Homepage = () => {
    return (
        <div className="h-[100vh] w-full flex flex-col">
            <NavBar />
            <div className="h-[100vh] w-full flex">
                <SideBar />
                <MainContent />
            </div>
        </div>
    );
};

export default Homepage;
