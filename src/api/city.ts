import axios from 'axios';

const geocodingAPI = 'https://nominatim.openstreetmap.org/search?q=';

export const getLocationByCityName = async (cityName: string) => {
    try {
        const location = await axios({
            url: `${geocodingAPI}${cityName}&format=json`,
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET"
        });
        return location.data;
    } catch (error) {
        console.log(error);
        throw error;
    };
};