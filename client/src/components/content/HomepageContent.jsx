import React from "react";
import Carousel from "./Carousel";

const HomepageContent = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="h-full w-full mt-16 flex flex-col items-center">
                <img
                    src="../../src/assets/hero2.jpeg"
                    alt=""
                    className="min-w-[1100px] w-[500px] h-[500px] min-h-[100px]"
                />
            </div>
            <Carousel />
            <h1>hello</h1>
        </div>
    );
};

export default HomepageContent;
