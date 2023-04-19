import React, { useState } from "react";
import MyAccountNav from "../components/account/MyAccountNav";
import MyAccountHeader from "../components/account/MyAccountHeader";
import AltTopBar from "../components/checkout/AltTopBar";
import ProfileDisplay from "../components/account/profile/ProfileDisplay";
import OrdersDisplay from "../components/account/orders/OrdersDisplay";
import AddressDisplay from "../components/account/address/AddressDisplay";
import AccountInfoContainer from "../components/account/AccountInfoContainer";
import { useEffect } from "react";
import Geocode from "react-geocode";
import { useSelector } from "react-redux";

const MyAccount = () => {
    const [currentTab, setCurrentTab] = useState("profile");
    const [latitude, setLat] = useState();
    const [longitude, setLng] = useState();

    const { user } = useSelector((state) => state.auth);

    Geocode.setApiKey(import.meta.env.VITE_GOOGLE_API_KEY);
    Geocode.setLanguage("en");

    useEffect(() => {
        if (user.address) {
            Geocode.fromAddress(
                `${user.address.street}, ${user.address.city}, ${user.address.state}`
            ).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    setLat(lat), setLng(lng);
                },
                (error) => {
                    return error;
                }
            );
        }
    }, []);

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
                    <AddressDisplay latitude={latitude} longitude={longitude} />
                ) : null}
            </AccountInfoContainer>
        </div>
    );
};

export default MyAccount;
