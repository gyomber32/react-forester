import { useCallback } from "react";
import { getWeatherData } from "../api/weather";
import { useActions } from './store';
import { LatLng } from "leaflet";

export const useFetchWeather = () => {
    const { setWeather } = useActions();
    return useCallback(async (position: LatLng) => {
        try {
            const weather = await getWeatherData(position);
            setWeather(weather);
        } catch (error) {
            throw error;
        }
    }, [setWeather]);
}