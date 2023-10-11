import { combineReducers, compose, legacy_createStore } from "redux";
import reduser from "./reduser";

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

function store() {
  return legacy_createStore(
    combineReducers({
      reduser: reduser,
    }),
    compose(
      ReactReduxDevTools,
    )
  );
}

export default store
