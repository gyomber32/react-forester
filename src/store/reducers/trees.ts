import { Action, ActionTypes } from "../actions";
import Tree from "../../models/types/Tree";


export default (state: Tree[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_TREES:
            return action.payload;
        case ActionTypes.ADD_TREE:
            return [...state, action.payload]
        case ActionTypes.REMOVE_TREE:
            return state.filter(tree => tree._id !== action.payload)
        default:
            return state;
    };
};