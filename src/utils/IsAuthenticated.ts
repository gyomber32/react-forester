export default () => {
    return localStorage.getItem("token") ? true : false;
};