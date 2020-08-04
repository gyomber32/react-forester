import { useState, useEffect, useCallback, useRef } from "react";
import { getAddress } from "../api/address";
import { getLocationByCityName } from "../api/city";
import { LatLng } from "leaflet";


const defaultSettings = {
    enableHighAccuracy: false,
    timeout: Infinity,
    maximumAge: 0,
};

const defaultPosition: LatLng = new LatLng(45.377778, 20.386111);

const getPosition = () => {
    const geolocation = navigator.geolocation;
    if (!geolocation) {
        const error = new Error("Geolocation is not supported");
        throw error;
    };
    return new Promise((succesCallback: PositionCallback, errorCallback: PositionErrorCallback) => {
        geolocation.getCurrentPosition(succesCallback, errorCallback);
    });
};

export const usePosition = (settings = defaultSettings) => {
    const [position, setPosition] = useState<LatLng>(new LatLng(0, 0));
    const [address, setAddress] = useState({ country: "", city: "" });
    const [error, setError] = useState(null);
    const [suggestionsList, setSuggestionsList] = useState<any>([]);
    const [cityName, setCityName] = useState<string>("");
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const fetchPositionAndCity = useCallback(async (location?: LatLng) => {
        if (location) {
            try {
                setPosition(new LatLng(location.lat, location.lng));
                const addressRes = await getAddress(new LatLng(location.lat, location.lng));
                setAddress({ country: addressRes.address.country, city: addressRes.address.city ? addressRes.address.city : addressRes.address.town });
            } catch (error) {
                throw error;
            }
        } else {
            try {
                const position = await getPosition();
                setPosition(new LatLng(position.coords.latitude, position.coords.longitude));
                const location = await getAddress(new LatLng(position.coords.latitude, position.coords.longitude));
                setAddress({ country: location.address.country, city: location.address.city ? location.address.city : location.address.town });
            } catch (error) {
                throw error;
            }
        }
    }, []);

    const fetchCity = useCallback(async (cityName: string) => {
        setCityName(cityName);
        if (cityName === "") {
            fetchPositionAndCity();
        } else {
            try {
                if (timeout.current) clearTimeout(timeout.current);
                timeout.current = setTimeout(async () => {
                    const res = await getLocationByCityName(cityName);
                    setSuggestionsList(res.map((item: any) => { return { name: item.display_name, location: new LatLng(item.lat, item.lon) } }))
                }, 500);
            } catch (error) {
                if (timeout.current) clearTimeout(timeout.current);
                throw error;
            }
        }
    }, [fetchPositionAndCity]);

    useEffect(() => {
        try {
            fetchPositionAndCity();
        } catch (error) {
            setPosition(defaultPosition);
            setAddress({ country: "Serbia", city: "Zrenjanin" });
            setError(error);
        }
    }, [fetchPositionAndCity, settings]);
    return { position, setPosition, address, fetchCity, fetchPositionAndCity, cityName, suggestionsList, error };
};