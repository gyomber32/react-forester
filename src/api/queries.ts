import Tree from "../models/types/Tree";
import Seedling from "../models/types/Seedling";

export const authQuery = (email: string, password: string) => {
    return JSON.stringify({
        query: `
            query {
                login(userInput: {email: "${email}", password: "${password}"}) {
                token
                tokenExpiration
                }
            }`
    });
};

export const getAllTreesQuery = () => {
    return JSON.stringify({
        query: `
            query {
                trees {
                    _id
                    species
                    plantedQuantity
                    survivedQuantity
                    datePlanted
                    daysInSoil
                    pictureId
                    location
                }
            }`
    });
};

export const getOneTreeQuery = (id: string) => {
    return JSON.stringify({
        query: `
            query {
                oneTree(_id: "${id}"){
                    _id
                    species
                    plantedQuantity
                    survivedQuantity
                    datePlanted
                    daysInSoil
                    pictureId
                    location
                }
            }`
    });
};

export const createTreeMutation = (tree: Tree, pictureId?: string) => {
    if (pictureId) {
        return JSON.stringify({
            query: `
                mutation {
                    createTree(treeInput: {species: "${tree.species}", plantedQuantity: ${tree.plantedQuantity}, survivedQuantity: ${tree.survivedQuantity}, datePlanted: "${tree.datePlanted}", location: "${tree.location}", pictureId: "${pictureId}"}) {
                        _id
                        species
                        plantedQuantity
                        survivedQuantity
                        datePlanted
                        daysInSoil
                        pictureId
                        location
                    }
                }`
        })
    } else {
        return JSON.stringify({
            query: `
                mutation {
                    createTree(treeInput: {species: "${tree.species}", plantedQuantity: ${tree.plantedQuantity}, survivedQuantity: ${tree.survivedQuantity}, datePlanted: "${tree.datePlanted}", location: "${tree.location}", pictureId: ""}) {
                        _id
                        species
                        plantedQuantity
                        survivedQuantity
                        datePlanted
                        daysInSoil
                        pictureId
                        location
                    }
                }`
        })
    }
};

export const deleteTreeMutation = (id: string) => {
    return JSON.stringify({
        query: `
            mutation {
              deleteTree(_id: "${id}"){
                message
              }
            }`
    });
};

export const getAllSeedlingsQuery = () => {
    return JSON.stringify({
        query: `
            query {
                seedlings {
                    _id
                    species
                    plantedQuantity
                    survivedQuantity
                    datePlanted
                    daysInSoil
                    pictureId
                    location
                }
            }`
    });
};

export const getOneSeedlingQuery = (id: string) => {
    return JSON.stringify({
        query: `
            query {
                oneSeedling(_id: "${id}"){
                    _id
                    species
                    plantedQuantity
                    survivedQuantity
                    datePlanted
                    daysInSoil
                    pictureId
                    location
                }
            }`
    });
};

export const createSeedlingMutation = (seedling: Seedling, pictureId?: string) => {
    if (pictureId) {
        return JSON.stringify({
            query: `
                mutation {
                    createSeedling(seedlingInput: {species: "${seedling.species}", plantedQuantity: ${seedling.plantedQuantity}, survivedQuantity: ${seedling.survivedQuantity}, datePlanted: "${seedling.datePlanted}", location: "${seedling.location}", pictureId: "${pictureId}"}) {
                        _id
                        species
                        plantedQuantity
                        survivedQuantity
                        datePlanted
                        daysInSoil
                        pictureId
                        location
                    }
                }`
        })
    } else {
        return JSON.stringify({
            query: `
                mutation {
                    createSeedling(seedlingInput: {species: "${seedling.species}", plantedQuantity: ${seedling.plantedQuantity}, survivedQuantity: ${seedling.survivedQuantity}, datePlanted: "${seedling.datePlanted}", location: "${seedling.location}", pictureId: ""}) {
                        _id
                        species
                        plantedQuantity
                        survivedQuantity
                        datePlanted
                        daysInSoil
                        pictureId
                        location
                    }
                }`
        })
    }
};

export const deleteSeedlingMutation = (id: string) => {
    return JSON.stringify({
        query: `
            mutation {
              deleteSeedling(_id: "${id}"){
                message
              }
            }`
    });
};