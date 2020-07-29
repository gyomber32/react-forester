import { Action, ActionTypes } from "../actions";
import Seedling from "../../models/types/Seedling";

export default (state: Seedling[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_SEEDLINGS:
            return action.payload;
        /* case ActionTypes.ADD_SEEDLING:
            return action.payload;
        case ActionTypes.REMOVE_SEEDLING:
            return action.payload; */
        default:
            return state;
    };
};