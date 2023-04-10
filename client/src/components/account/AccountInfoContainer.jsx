import React, { Children } from "react";

const AccountInfoContainer = ({ currentTab, children }) => {
    return (
        <div className="mt-20 w-full h-full flex justify-center">
            <div className="md:w-[60%] w-[90%]">
                {/* <div className="">
                    <h1 className="text-2xl mt-5">
                        {currentTab === "orders"
                            ? "Your Orders"
                            : currentTab === "profile"
                            ? "Your Profile"
                            : currentTab === "addresses"
                            ? "Your Address"
                            : null}
                    </h1>
                </div> */}
                {children}
            </div>
        </div>
    );
};

export default AccountInfoContainer;
