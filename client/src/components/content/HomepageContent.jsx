import React from "react";
import Carousel from "./Carousel";

const HomepageContent = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="h-full w-full pt-16 flex flex-col items-center">
                <img
                    src="../../src/assets/hero2.jpeg"
                    alt=""
                    className="min-w-[1100px] w-[500px] h-[500px] min-h-[100px]"
                />
            </div>
            <div className="my-10">
                <h1 className="mb-5 text-xl">SHOP OUR NEWEST COLLECTION</h1>
                <Carousel />
            </div>
        </div>
    );
};

export default HomepageContent;
