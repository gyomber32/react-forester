import { Action, ActionTypes } from "../actions";

export default (state: boolean = false, action: Action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_LOADER:
            return action.payload;
        default:
            return state;
    };
};