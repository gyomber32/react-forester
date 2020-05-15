export default () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const token = localStorage.getItem('token');
    if (!tokenExpiration || !token) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        return false;
    }
    if (new Date().getTime() <= +tokenExpiration) {
        return true;
    } else {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        return false;
    }
};