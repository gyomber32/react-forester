import axios from 'axios';
import { LatLng } from 'leaflet';

const openWeatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?';

export const getWeatherData = async (position: LatLng) => {
    try {
        const weather = await axios({
            url: `${openWeatherAPI}lat=${position.lat}&lon=${position.lng}&exclude=minutely&units=metric&&lang=en&appid=dead7a611296ce5fbff383dee7cfa112`,
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET"
        });
        return weather.data;
    } catch (error) {
        console.log(error);
        throw error;
    };
};