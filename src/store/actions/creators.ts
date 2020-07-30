import Seed from '../../models/types/Seed';
import Seedling from "../../models/types/Seedling";
import Tree from "../../models/types/Tree";

import { ActionTypes } from "./index";

const createAction = <T extends keyof typeof ActionTypes, P>(type: T, payload?: P) => ({ type, payload: payload! });

export const setTrees = (trees: Tree[]) => createAction(ActionTypes.SET_TREES, trees);
export const addTree = (tree: Tree) => createAction(ActionTypes.ADD_TREE, tree);
export const removeTree = (treeId: string) => createAction(ActionTypes.REMOVE_TREE, treeId);

export const setSeedlings = (seedlings: Seedling[]) => createAction(ActionTypes.SET_SEEDLINGS, seedlings);
export const addSeedling = (seedling: Seedling) => createAction(ActionTypes.ADD_SEEDLING, seedling);
export const removeSeedling = (seedlingId: string) => createAction(ActionTypes.REMOVE_SEEDLING, seedlingId);

export const setSeeds = (seeds: Seed[]) => createAction(ActionTypes.SET_SEEDS, seeds);
export const addSeed = (seed: Seed) => createAction(ActionTypes.ADD_SEED, seed);
export const removeSeed = (seedId: string) => createAction(ActionTypes.REMOVE_SEED, seedId);

export const toggleLoader = (value: boolean) => createAction(ActionTypes.TOGGLE_LOADER, value);
export const togglePopup = (popup: { isOpen: boolean, message: string }) => createAction(ActionTypes.TOGGLE_POPUP, popup);