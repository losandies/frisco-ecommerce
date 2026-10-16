import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const LoadedMap = ({ latitude, longitude }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    });

    const center = {
        lat: latitude,
        lng: longitude,
    };

    const containerStyle = {
        width: "500px",
        height: "400px",
    };

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
            <Marker position={center} />
        </GoogleMap>
    ) : null;
};

const Map = (props) => import.meta.env.VITE_GOOGLE_API_KEY && Number.isFinite(props.latitude) && Number.isFinite(props.longitude)
    ? <LoadedMap {...props} /> : <p className="text-sm text-neutral-500">Map preview is optional. Your saved address appears above.</p>;

export default Map;
