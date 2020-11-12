import Tree from "../models/types/Tree";
import Seedling from "../models/types/Seedling";
import Seed from "../models/types/Seed";

export const authorizationQuery = () => {
    return JSON.stringify({
        query: `
            query {
                authorization {
                    loggedIn
                    message
                }
            }`
    });
};

export const loginQuery = (email: string, password: string) => {
    return JSON.stringify({
        query: `
            query {
                login(userInput: {email: "${email}", password: "${password}"}) {
                    loggedIn
                    message
                }
            }`
    });
};

export const logoutQuery = () => {
    return JSON.stringify({
        query: `
            query {
                logout {
                    loggedIn
                    message
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
                _id
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
                _id
              }
            }`
    });
};

export const getAllSeedsQuery = () => {
    return JSON.stringify({
        query: `
            query {
                seeds {
                    _id
                    species
                    seededQuantity
                    brairdedQuantity
                    dateSeeded
                    daysInSoil
                }
            }`
    });
};

export const getOneSeedQuery = (id: string) => {
    return JSON.stringify({
        query: `
            query {
                oneSeed(_id: "${id}"){
                    _id
                    species
                    seededQuantity
                    brairdedQuantity
                    dateSeeded
                    daysInSoil
                }
            }`
    });
};

export const createSeedMutation = (seed: Seed) => {
    return JSON.stringify({
        query: `
            mutation {
                createSeed(seedInput: {species: "${seed.species}", seededQuantity: ${seed.seededQuantity}, brairdedQuantity: ${seed.brairdedQuantity}, dateSeeded: "${seed.dateSeeded}"}) {
                    _id
                    species
                    seededQuantity
                    brairdedQuantity
                    dateSeeded
                    daysInSoil
                }
            }`
    });
};

export const deleteSeedMutation = (id: string) => {
    return JSON.stringify({
        query: `
            mutation {
              deleteSeed(_id: "${id}"){
                _id
              }
            }`
    });
};