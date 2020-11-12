
import { axiosGraphQL, axiosCreatePicture, axiosDeletePicture } from "./axios/index";
import { authorizationQuery, loginQuery, logoutQuery, getAllTreesQuery, getOneTreeQuery, createTreeMutation, deleteTreeMutation, getAllSeedlingsQuery, getOneSeedlingQuery, createSeedlingMutation, deleteSeedlingMutation, getAllSeedsQuery, getOneSeedQuery, createSeedMutation, deleteSeedMutation } from "./queries";

import Tree from "../models/types/Tree";

import NoPicture from "../assets/no-content.png";
import Seedling from "../models/types/Seedling";
import Seed from "../models/types/Seed";

export const login = async (email: string, password: string) => {
    try {
        const response = await axiosGraphQL({
            data: loginQuery(email, password),
        });
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
        return response.data.data.login.loggedIn as boolean;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await axiosGraphQL({
            data: logoutQuery(),
        });
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
        return response.data.data.logout.loggedIn as boolean;
    } catch (error) {
        throw error;
    }
}

export const authorization = async () => {
    try {
        const response = await axiosGraphQL({
            data: authorizationQuery()
        });
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
        return response.data.data.authorization.loggedIn as boolean;
    } catch (error) {
        throw error;
    }
}

export const getAllTrees = async () => {
    try {
        const response = await axiosGraphQL({
            data: getAllTreesQuery()
        });
        if (!response) {
            throw new Error("No response from the server");
        };
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
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
        throw error;
    }
};

export const getOneTree = async (id: string) => {
    try {
        const response = await axiosGraphQL({
            data: getOneTreeQuery(id)
        });
        if (!response) {
            throw new Error("No response from the server");
        }
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
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
        throw error;
    }
};

export const createTree = async (tree: Tree) => {
    if (tree.picture) {
        let bodyFormData = new FormData();
        bodyFormData.append("picture", tree.picture);
        try {
            const pictureResponse = await axiosCreatePicture({
                data: bodyFormData,
            });
            if (!pictureResponse.data.id) {
                throw new Error("No response from the server");
            }
            const treeResponse = await axiosGraphQL({
                data: createTreeMutation(tree, pictureResponse.data.id),
            });
            if (!treeResponse.data.data.createTree._id) {
                throw new Error("No response from the server");
            }
            if (treeResponse.data.errors) {
                throw new Error(treeResponse.data.errors[0].message);
            }
            return treeResponse.data.data.createTree as Tree;
        } catch (error) {
            throw error;
        }
    } else {
        try {
            const treeResponse = await axiosGraphQL({
                data: createTreeMutation(tree),
            });
            if (!treeResponse.data.data.createTree._id) {
                throw new Error("No response from the server");
            }
            if (treeResponse.data.errors) {
                throw new Error(treeResponse.data.errors[0].message);
            }
            return treeResponse.data.data.createTree as Tree;
        } catch (error) {
            throw error;
        }
    }
};

export const deleteTree = async (tree: Tree) => {
    try {
        if (tree.pictureId) {
            const pictureResponse = await axiosDeletePicture({
                url: `${tree.pictureId}`,
            });
            if (!pictureResponse) {
                throw new Error("No response from the server");
            }
        }
        const treeResponse = await axiosGraphQL({
            data: deleteTreeMutation(tree._id),
        });
        if (!treeResponse.data.data.deleteTree) {
            throw new Error("No response from the server");
        }
        if (treeResponse.data.errors) {
            throw new Error(treeResponse.data.errors[0].message);
        }
        return treeResponse.data.data.deleteTree._id as string;
    } catch (error) {
        throw error;
    }
};

export const getAllSeedlings = async () => {
    try {
        const response = await axiosGraphQL({
            data: getAllSeedlingsQuery()
        });
        if (!response) {
            throw new Error("No response from the server");
        };
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
        const seedlings: Seedling[] = [];
        response.data.data.seedlings.forEach((seedling: Seedling) => {
            const tempSeedling: Seedling = {
                _id: seedling._id,
                species: seedling.species,
                plantedQuantity: seedling.plantedQuantity,
                survivedQuantity: seedling.survivedQuantity,
                datePlanted: seedling.datePlanted,
                daysInSoil: seedling.daysInSoil,
                picture: seedling.pictureId
                    ? `http://localhost:3000/picture/${seedling.pictureId}`
                    : NoPicture,
                pictureId: seedling.pictureId,
                location: seedling.location,
            };
            seedlings.push(tempSeedling);
        });
        return seedlings;
    } catch (error) {
        throw error;
    }
};

export const getOneSeedling = async (id: string) => {
    try {
        const response = await axiosGraphQL({
            data: getOneSeedlingQuery(id)
        });
        if (!response) {
            throw new Error("No response from the server");
        }
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
        const seedling: Tree = {
            _id: response.data.data.oneSeedling._id,
            species: response.data.data.oneSeedling.species,
            plantedQuantity: response.data.data.oneSeedling.plantedQuantity,
            survivedQuantity: response.data.data.oneSeedling.survivedQuantity,
            datePlanted: response.data.data.oneSeedling.datePlanted,
            daysInSoil: response.data.data.oneSeedling.daysInSoil,
            picture: response.data.data.oneSeedling.pictureId
                ? `http://localhost:3000/picture/${response.data.data.oneSeedling.pictureId}`
                : NoPicture,
            pictureId: response.data.data.oneSeedling.pictureId,
            location: response.data.data.oneSeedling.location,
        };
        return seedling;
    } catch (error) {
        throw error;
    }
};

export const createSeedling = async (seedling: Seedling) => {
    if (seedling.picture) {
        let bodyFormData = new FormData();
        bodyFormData.append("picture", seedling.picture);
        try {
            const pictureResponse = await axiosCreatePicture({
                data: bodyFormData
            });
            if (!pictureResponse.data.id) {
                throw new Error("No response from the server");
            }
            const seedlingResponse = await axiosGraphQL({
                data: createSeedlingMutation(seedling, pictureResponse.data.id)
            });
            if (!seedlingResponse.data.data.createSeedling._id) {
                throw new Error("No response from the server");
            }
            if (seedlingResponse.data.errors) {
                throw new Error(seedlingResponse.data.errors[0].message);
            }
            return seedlingResponse.data.data.createSeedling as Seedling;
        } catch (error) {
            throw error;
        }
    } else {
        try {
            const seedlingResponse = await axiosGraphQL({
                data: createSeedlingMutation(seedling)
            });
            if (!seedlingResponse.data.data.createSeedling._id) {
                throw new Error("No response from the server");
            }
            if (seedlingResponse.data.errors) {
                throw new Error(seedlingResponse.data.errors[0].message);
            }
            return seedlingResponse.data.data.createSeedling as Seedling;
        } catch (error) {
            throw error;
        }
    }
};

export const deleteSeedling = async (seedling: Seedling) => {
    try {
        if (seedling.pictureId) {
            const pictureResponse = await axiosDeletePicture({
                url: `${seedling.pictureId}`
            });
            if (!pictureResponse) {
                throw new Error("No response from the server");
            }
        }
        const seedlingResponse = await axiosGraphQL({
            data: deleteSeedlingMutation(seedling._id)
        });
        if (!seedlingResponse.data.data.deleteSeedling) {
            throw new Error("No response from the server");
        }
        if (seedlingResponse.data.errors) {
            throw new Error(seedlingResponse.data.errors[0].message);
        }
        return seedlingResponse.data.data.deleteSeedling._id as string;
    } catch (error) {
        throw error;
    }
};

export const getAllSeeds = async () => {
    try {
        const response = await axiosGraphQL({
            data: getAllSeedsQuery()
        });
        if (!response) {
            throw new Error("No response from the server");
        };
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
        const seeds: Seed[] = [];
        response.data.data.seeds.forEach((seed: Seed) => {
            const tempSeed: Seed = {
                _id: seed._id,
                species: seed.species,
                seededQuantity: seed.seededQuantity,
                brairdedQuantity: seed.brairdedQuantity,
                dateSeeded: seed.dateSeeded,
                daysInSoil: seed.daysInSoil
            };
            seeds.push(tempSeed);
        });
        return seeds;
    } catch (error) {
        throw error;
    }
};

export const getOneSeed = async (id: string) => {
    try {
        const response = await axiosGraphQL({
            data: getOneSeedQuery(id)
        });
        if (!response) {
            throw new Error("No response from the server");
        }
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
        const seed: Seed = {
            _id: response.data.data.oneSeed._id,
            species: response.data.data.oneSeed.species,
            seededQuantity: response.data.data.oneSeed.seededQuantity,
            brairdedQuantity: response.data.data.oneSeed.brairdedQuantity,
            dateSeeded: response.data.data.oneSeed.dateSeeded,
            daysInSoil: response.data.data.oneSeed.daysInSoil
        };
        return seed;
    } catch (error) {
        throw error;
    }
};

export const createSeed = async (seed: Seed) => {
    try {
        const seedResponse = await axiosGraphQL({
            data: createSeedMutation(seed)
        });
        if (!seedResponse.data.data.createSeed._id) {
            throw new Error("No response from the server");
        }
        if (seedResponse.data.errors) {
            throw new Error(seedResponse.data.errors[0].message);
        }
        return seedResponse.data.data.createSeed as Seed;
    } catch (error) {
        throw error;
    }
};

export const deleteSeed = async (seed: Seed) => {
    try {
        const response = await axiosGraphQL({
            data: deleteSeedMutation(seed._id)
        });
        if (!response.data.data.deleteSeed) {
            throw new Error("No response from the server");
        }
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
        return response.data.data.deleteSeed._id as string;
    } catch (error) {
        throw error;
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