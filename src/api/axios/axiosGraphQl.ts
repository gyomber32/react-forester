import axios, { AxiosRequestConfig } from "axios"

const axiosGraphQLConfig: AxiosRequestConfig = {
    url: "http://localhost:3000/graphql",
    method: "POST",
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000', "Content-Type": "application/json" },
};

export const axiosGraphQL = axios.create(axiosGraphQLConfig);
