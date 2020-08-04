import axios from 'axios';
import { LatLng } from 'leaflet';

const reverseGeocodingAPI = 'http://nominatim.openstreetmap.org/reverse?format=json';

export const getAddress = async (position: LatLng) => {
    try {
        const city = await axios({
            url: `${reverseGeocodingAPI}&lat=${position.lat}&lon=${position.lng}&zoom=18&addressdetails=1`,
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET"
        });
        return city.data;
    } catch (error) {
        console.log(error);
        throw error;
    };
};