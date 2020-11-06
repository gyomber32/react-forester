import axios, { AxiosRequestConfig } from "axios"

const axiosDeletePictureConfig: AxiosRequestConfig = {
    baseURL: "http://localhost:3000/picture",
    method: "DELETE",
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "multipart/form-data",
    },
};

export const axiosDeletePicture = axios.create(axiosDeletePictureConfig)
