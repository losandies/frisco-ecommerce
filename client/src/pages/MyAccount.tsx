import { useEffect, useState } from 'react';
import AccountInfoContainer from '../components/account/AccountInfoContainer';
import AddressDisplay from '../components/account/address/AddressDisplay';
import MyAccountHeader from '../components/account/MyAccountHeader';
import MyAccountNav from '../components/account/MyAccountNav';
import OrdersDisplay from '../components/account/orders/OrdersDisplay';
import ProfileDisplay from '../components/account/profile/ProfileDisplay';
import AltTopBar from '../components/checkout/AltTopBar';
import { useSession } from '../hooks/useSession';

type GeocodingResponse = {
    results?: { geometry?: { location?: { lat: number; lng: number } } }[];
};

const MyAccount = () => {
    const [currentTab, setCurrentTab] = useState('profile');
    const [latitude, setLatitude] = useState<number | undefined>();
    const [longitude, setLongitude] = useState<number | undefined>();
    const { user } = useSession();

    const mapsKey = import.meta.env.VITE_GOOGLE_API_KEY;
    useEffect(() => {
        if (!user?.address || !mapsKey) return;
        const controller = new AbortController();
        const address = `${user.address.street}, ${user.address.city}, ${user.address.state}`;
        const params = new URLSearchParams({ address, key: mapsKey });
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`, {
            signal: controller.signal,
        })
            .then((response) => response.json())
            .then((data: GeocodingResponse) => {
                const location = data.results?.[0]?.geometry?.location;
                if (location) {
                    setLatitude(location.lat);
                    setLongitude(location.lng);
                }
            })
            .catch(() => {
                /* Address management remains available without a map. */
            });
        return () => controller.abort();
    }, [user?.address, mapsKey]);

    if (!user) return null;

    let content = null;

    if (currentTab === 'profile') {
        content = <ProfileDisplay user={user} />;
    } else if (currentTab === 'orders') {
        content = <OrdersDisplay orders={user.orders} />;
    } else if (currentTab === 'addresses') {
        content = (
            <AddressDisplay
                address={user.address}
                latitude={latitude}
                longitude={longitude}
            />
        );
    }

    return (
        <div>
            <AltTopBar />
            <MyAccountNav
                setCurrentTab={setCurrentTab}
                currentTab={currentTab}
            />
            <MyAccountHeader />
            <AccountInfoContainer currentTab={currentTab}>
                {content}
            </AccountInfoContainer>
        </div>
    );
};

export default MyAccount;
