import Tree from "../models/types/Tree";

export const getAllTrees = () => {
    return JSON.stringify({
        query: `
            query {
                trees {
                    _id
                    species
                    plantedQuantity
                    survivedQuantity
                    datePlanted
                    pictureId
                    location
        }
      }`
    });
};

export const getOneTree = (id: string) => {
    return JSON.stringify({
        query: `
            query {
                oneTree(_id: "${id}"){
                    _id
                    species
                    plantedQuantity
                    survivedQuantity
                    datePlanted
                    pictureId
                    location
                }
            }`
    });
};

export const createTree = (tree: Tree, pictureId?: string) => {
    if (tree.pictureId) {
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

export const deleteTree = (id: string) => {
    return JSON.stringify({
        query: `
            mutation {
              deleteTree(_id: "${id}"){
                message
              }
            }`
    });
};