import { Action, ActionTypes } from "../actions";

export default (state: boolean = false, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_AUTH_STATUS:
            return action.payload;
        default:
            return state;
    };
};