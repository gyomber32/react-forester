import { combineReducers } from "redux";

import trees from "./trees";
import seedlings from "./seedlings";
import seeds from "./seeds";
import loader from "./loader";
import popup from "./popup";

const rootReducer = combineReducers({
    trees,
    seedlings,
    seeds,
    loader,
    popup
});

export default rootReducer;

export type State = Readonly<ReturnType<typeof rootReducer>>;