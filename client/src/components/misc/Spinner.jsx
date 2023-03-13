import React from "react";
import spinnerGif from "../../assets/spinner.gif";

const Spinner = () => {
    return (
        <img src={spinnerGif} alt="spinner" className="h-68 max-w-[700px]" />
    );
};

export default Spinner;
