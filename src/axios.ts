import axios from "axios";

export const axiosAuth = axios.create({
    url: "http://localhost:3000/graphql",
    headers: {
        "Content-Type": "application/json"
    },
    method: 'POST'
});

export const axiosQuery = axios.create({
    url: "http://localhost:3000/graphql",
    headers: { "Content-Type": "application/json", Authorization: `bearer ${localStorage.getItem("token")}` },
    method: 'POST',
    data: JSON.stringify({
        query: `
            query {
                seedlings {
                _id
                species
                plantedQuantity
                survivedQuantity
                datePlanted
                location
            }
        }`
    })
});
