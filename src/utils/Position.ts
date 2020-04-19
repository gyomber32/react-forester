const defaultSettings = {
    enableHighAccuracy: false,
    timeout: Infinity,
    maximumAge: 0,
};

const getPosition = (settings = defaultSettings): Promise<any> => {

    const geo = navigator.geolocation;

    if (!geo) {
        const error = new Error("Geolocation is not supported");
        throw error;
    }

    return new Promise((resolve, reject) => {
        geo.getCurrentPosition(resolve, reject, settings);
    });

}

export default getPosition;