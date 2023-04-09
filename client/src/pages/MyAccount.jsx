import React, { useState } from "react";
import MyAccountNav from "../components/account/MyAccountNav";
import MyAccountHeader from "../components/account/MyAccountHeader";
import AltTopBar from "../components/checkout/AltTopBar";
import ProfileDisplay from "../components/account/profile/ProfileDisplay";
import OrdersDisplay from "../components/account/orders/OrdersDisplay";
import AddressDisplay from "../components/account/address/AddressDisplay";
import AccountInfoContainer from "../components/account/AccountInfoContainer";

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
            <AccountInfoContainer currentTab={currentTab}>
                {currentTab === "profile" ? (
                    <ProfileDisplay />
                ) : currentTab === "orders" ? (
                    <OrdersDisplay />
                ) : currentTab === "addresses" ? (
                    <AddressDisplay />
                ) : null}
            </AccountInfoContainer>
        </div>
    );
};

export default MyAccount;
