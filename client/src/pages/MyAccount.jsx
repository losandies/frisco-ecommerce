import React, { useState } from "react";
import MyAccountNav from "../components/account/MyAccountNav";
import AltTopBar from "../components/checkout/AltTopBar";

const MyAccount = () => {
    const [currentTab, setCurrentTab] = useState("profile");
    return (
        <div>
            <AltTopBar />
            <MyAccountNav
                setCurrentTab={setCurrentTab}
                currentTab={currentTab}
            />
        </div>
    );
};

export default MyAccount;
