import { Action, ActionTypes } from "../actions";
import Seed from "../../models/types/Seed";


export default (state: Seed[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_SEEDS:
            return action.payload;
        /* case ActionTypes.ADD_SEED:
            return action.payload;
        case ActionTypes.REMOVE_SEED:
            return action.payload; */
        default:
            return state;
    };
};