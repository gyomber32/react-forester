import axios, { AxiosRequestConfig } from "axios"

const axiosCreatePictureConfig: AxiosRequestConfig = {
    url: "http://localhost:3000/picture",
    method: "POST",
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "multipart/form-data",
    },
};

export const axiosCreatePicture = axios.create(axiosCreatePictureConfig);