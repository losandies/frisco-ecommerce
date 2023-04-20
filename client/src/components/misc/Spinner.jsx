import React from "react";
import spinnerGif from "../../../src/assets/spinner.gif";

const Spinner = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <img
                src={spinnerGif}
                alt="spinner"
                className="h-68 max-w-[700px]"
            />
        </div>
    );
};

export default Spinner;
