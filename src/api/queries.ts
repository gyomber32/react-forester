import Tree from "../models/types/Tree";

export const authQuery = (email: string, password: string) => {
    return JSON.stringify({
        query: `
            query {
                login(userInput: {email: "${email}", password: "${password}"}) {
                token
                tokenExpiration
          }
        }`,
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
                        location
                        pictureId
                    }
                }`,
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
                        location
                        pictureId
              }
            }`,
        })
    }
}

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