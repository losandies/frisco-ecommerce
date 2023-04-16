import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map = ({ latitude, longitude }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyCkwdNI8MIOXVsa0aNVOdjoOb5dQxEneQE",
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

export default Map;
