import { Action, ActionTypes } from "../actions";

export default (state: any = null, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_WEATHER:
            return action.payload;
        default:
            return state;
    };
};