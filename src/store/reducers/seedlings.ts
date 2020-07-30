import { Action, ActionTypes } from "../actions";
import Seedling from "../../models/types/Seedling";

export default (state: Seedling[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_SEEDLINGS:
            return action.payload;
        case ActionTypes.ADD_SEEDLING:
            return [ ...state, action.payload ]
        case ActionTypes.REMOVE_SEEDLING:
            return state.filter(seedling => seedling._id !== action.payload)
        default:
            return state;
    };
};