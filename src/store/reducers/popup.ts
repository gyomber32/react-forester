import { Action, ActionTypes } from "../actions";

export default (state = { isOpen: false, message: "" }, action: Action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_POPUP:
            return action.payload;
        default:
            return state;
    };
};