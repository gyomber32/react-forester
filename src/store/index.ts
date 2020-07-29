import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers";
import * as selectors from './selectors';
export { selectors };
export * from './actions';

const store = createStore(rootReducer, composeWithDevTools());

export default store;