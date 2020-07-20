import axios from "axios"

import { getAllTreesQuery, getOneTreeQuery, createTreeMutation, deleteTreeMutation } from "./queries";

import Tree from "../models/types/Tree";

import NoPicture from "../assets/no-content.png";

export const getAllTrees = async () => {
    try {
        const response = await axios({
            url: "http://localhost:3000/graphql",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.getItem("token")}`,
            },
            method: "POST",
            data: getAllTreesQuery(),
        });
        if (!response) {
            throw new Error("No response from the server");
        };
        let trees: Tree[] = [];
        response.data.data.trees.forEach((tree: Tree) => {
            const tempTree: Tree = {
                _id: tree._id,
                species: tree.species,
                plantedQuantity: tree.plantedQuantity,
                survivedQuantity: tree.survivedQuantity,
                datePlanted: tree.datePlanted,
                daysInSoil: tree.daysInSoil,
                picture: tree.pictureId
                    ? `http://localhost:3000/picture/${tree.pictureId}`
                    : NoPicture,
                pictureId: tree.pictureId,
                location: tree.location,
            };
            trees.push(tempTree);
        });
        return trees;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getOneTree = async (id: string) => {
    try {
        const response = await axios({
            url: "http://localhost:3000/graphql",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.getItem("token")}`,
            },
            method: "POST",
            data: getOneTreeQuery(id),
        });
        if (!response) {
            throw new Error("No response from the server");
        }
        const tree: Tree = {
            _id: response.data.data.oneTree._id,
            species: response.data.data.oneTree.species,
            plantedQuantity: response.data.data.oneTree.plantedQuantity,
            survivedQuantity: response.data.data.oneTree.survivedQuantity,
            datePlanted: response.data.data.oneTree.datePlanted,
            daysInSoil: response.data.data.oneTree.daysInSoil,
            picture: response.data.data.oneTree.pictureId
                ? `http://localhost:3000/picture/${response.data.data.oneTree.pictureId}`
                : NoPicture,
            pictureId: response.data.data.oneTree.pictureId,
            location: response.data.data.oneTree.location,
        };
        return tree;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createTree = async (tree: Tree) => {
    if (tree.picture) {
        let bodyFormData = new FormData();
        bodyFormData.append("picture", tree.picture);
        try {
            const pictureResponse = await axios({
                method: "post",
                url: "http://localhost:3000/picture",
                data: bodyFormData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (!pictureResponse.data.id) {
                throw new Error("No response from the server");
            }
            const treeResponse = await axios({
                url: "http://localhost:3000/graphql",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem("token")}`,
                },
                method: "POST",
                data: createTreeMutation(tree, pictureResponse.data.id),
            });
            if (!treeResponse.data.data.createTree._id) {
                throw new Error("No response from the server");
            }
            return treeResponse.data.data.createTree._id as string;
        } catch (error) {
            throw new Error(error.message);
        }
    } else {
        try {
            const treeResponse = await axios({
                url: "http://localhost:3000/graphql",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem("token")}`,
                },
                method: "POST",
                data: createTreeMutation(tree),
            });
            if (!treeResponse.data.data.createTree._id) {
                throw new Error("No response from the server");
            }
            return treeResponse.data.data.createTree._id as string;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export const removeTree = async (tree: Tree) => {
    try {
        if (tree.pictureId) {
            const pictureResponse = await axios({
                method: "delete",
                url: `http://localhost:3000/picture/${tree.pictureId}`,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!pictureResponse) {
                throw new Error("No response from the server");
            }
        }
        const response = await axios({
            url: "http://localhost:3000/graphql",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.getItem("token")}`,
            },
            method: "POST",
            data: deleteTreeMutation(tree._id),
        });
        if (!response.data.data.deleteTree) {
            throw new Error("No response from the server");
        }
        return response.data.data.deleteTree.message as string;
    } catch (error) {
        throw new Error(error.message);
    }
};

/* const getPicture = async (pictureId: string) => {
    try {
        const pictureResponse = await axios({
            method: "delete",
            url: `http://localhost:3000/picture/${selectedTree.pictureId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!pictureResponse) {
            throw new Error("No response from the server");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const postPicture = async (picture: File) => {
    let bodyFormData = new FormData();
    bodyFormData.append("picture", picture);
    try {
        const pictureResponse = await axios({
            method: "post",
            url: "http://localhost:3000/picture",
            data: bodyFormData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (!pictureResponse.data.id) {
            throw new Error("No response from the server");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const deletePicture = async (pictureId: string) => {
    try {
        const pictureResponse = await axios({
            method: "delete",
            url: `http://localhost:3000/picture/${selectedTree.pictureId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!pictureResponse) {
            throw new Error("No response from the server");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}; */