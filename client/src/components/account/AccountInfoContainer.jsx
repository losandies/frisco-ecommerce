import React, { Children } from "react";

const AccountInfoContainer = ({ children }) => {
    return (
        <div className="mt-20 w-full h-full flex justify-center">
            <div className="md:w-[80%] w-[90%]">{children}</div>
        </div>
    );
};

export default AccountInfoContainer;
