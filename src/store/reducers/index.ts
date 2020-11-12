import { combineReducers } from "redux";

import trees from "./trees";
import seedlings from "./seedlings";
import seeds from "./seeds";
import loader from "./loader";
import popup from "./popup";
import weather from './weather';
import auth from './auth';

const rootReducer = combineReducers({
    trees,
    seedlings,
    seeds,
    loader,
    popup,
    weather,
    auth
});

export default rootReducer;

export type State = Readonly<ReturnType<typeof rootReducer>>;