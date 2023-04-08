import React, { useState } from "react";
import MyAccountNav from "../components/account/MyAccountNav";
import MyAccountHeader from "../components/account/MyAccountHeader";
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
            <MyAccountHeader />
            {currentTab === "profile" ? <div></div> : null}
        </div>
    );
};

export default MyAccount;
