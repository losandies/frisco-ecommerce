import React from "react";
import Carousel from "./Carousel";

const HomepageContent = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center pb-[105px] md:pb-0">
            <div className="h-full w-full pt-16 flex flex-col items-center">
                <img
                    src="assets/hero2.jpeg"
                    alt=""
                    className="w-screen md:w-screen lg:w-[1000px] md:max-w-[2200px] md:max-h-[1000px] md:h-[400px]"
                />
            </div>
            <div className="my-10">
                <h1 className="pl-2 md:pl-0 mb-5 text-xl">
                    SHOP OUR NEWEST COLLECTION
                </h1>
                <Carousel />
            </div>
        </div>
    );
};

export default HomepageContent;
