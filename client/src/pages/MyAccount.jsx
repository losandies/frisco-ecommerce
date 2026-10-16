import React, { useState } from "react";
import MyAccountNav from "../components/account/MyAccountNav";
import MyAccountHeader from "../components/account/MyAccountHeader";
import AltTopBar from "../components/checkout/AltTopBar";
import ProfileDisplay from "../components/account/profile/ProfileDisplay";
import OrdersDisplay from "../components/account/orders/OrdersDisplay";
import AddressDisplay from "../components/account/address/AddressDisplay";
import AccountInfoContainer from "../components/account/AccountInfoContainer";
import { useEffect } from "react";
import { getCurrentUser } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const MyAccount = () => {
    const [currentTab, setCurrentTab] = useState("profile");
    const [latitude, setLat] = useState();
    const [longitude, setLng] = useState();

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (user?.token) dispatch(getCurrentUser(user.token));
    }, []);

    const mapsKey = import.meta.env.VITE_GOOGLE_API_KEY;
    useEffect(() => {
        if (!user?.address || !mapsKey) return;
        const controller = new AbortController();
        const address = `${user.address.street}, ${user.address.city}, ${user.address.state}`;
        const params = new URLSearchParams({ address, key: mapsKey });
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`, { signal: controller.signal })
            .then(response => response.json())
            .then(data => {
                const location = data.results?.[0]?.geometry?.location;
                if (location) { setLat(location.lat); setLng(location.lng); }
            }).catch(() => { /* Address management remains available without a map. */ });
        return () => controller.abort();
    }, [user?.address, mapsKey]);

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
