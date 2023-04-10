import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect } from "react";

const Map = (latitude, longitude) => {
    useEffect(() => {
        console.log(latitude, longitude);
    }, []);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyCkwdNI8MIOXVsa0aNVOdjoOb5dQxEneQE",
    });

    const center = {
        lat: parseInt(latitude),
        lng: parseInt(longitude),
    };

    const containerStyle = {
        width: "400px",
        height: "300px",
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
        ></GoogleMap>
    ) : null;
};

export default Map;
