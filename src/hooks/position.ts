import { useState, useEffect, useCallback } from "react";

import { LatLng, LatLngExpression } from "leaflet";

const defaultSettings = {
    enableHighAccuracy: false,
    timeout: Infinity,
    maximumAge: 0,
};

const defaultPosition: LatLngExpression = {
    lat: 45.377778,
    lng: 20.386111
};

export const usePosition = (settings = defaultSettings) => {
    const [position, setPosition] = useState<LatLngExpression>(new LatLng(0, 0));
    const [error, setError] = useState(null);

    const positionCallback = useCallback((position: Position) => {
        setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
    }, [setPosition]);

    const errorCallback = useCallback((error) => {
        setPosition(defaultPosition);
        setError(error);
    }, [setError]);

    useEffect(() => {
        try {
            const geolocation = navigator.geolocation;
            if (!geolocation) {
                const error = new Error("Geolocation is not supported");
                throw error;
            };
            geolocation.getCurrentPosition(positionCallback, errorCallback, settings);
        } catch (error) {
            setPosition(defaultPosition);
            setError(error);
        }
    }, [errorCallback, positionCallback, settings]);
    return { position, setPosition, error };
};