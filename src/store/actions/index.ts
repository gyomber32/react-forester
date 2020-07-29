import * as actions from './creators';
import * as ActionTypes from './types';
export { actions, ActionTypes };

export type Actions = typeof actions;
export type Action = ReturnType<Actions[keyof Actions]>;