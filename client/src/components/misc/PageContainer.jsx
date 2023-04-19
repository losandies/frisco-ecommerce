import React from "react";
import Footer from "../footer/Footer";

const PageContainer = ({ children }) => {
    return (
        <div className="flex flex-col min-h-[100vh] w-screen 2xl:items-center relative overflow-x-hidden">
            <div className="content-wrap min-h-[100vh] 2xl:w-[1400px] md:pb-[195px]">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default PageContainer;
