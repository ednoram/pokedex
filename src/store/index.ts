import { createWrapper } from "next-redux-wrapper";
import { createStore, combineReducers, Store } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { IState } from "types/index";

import { pokemonsReducer } from "./reducers";

const reducers = combineReducers({
  pokemons: pokemonsReducer,
});

const middleware = composeWithDevTools();

const makeStore = () => createStore(reducers, middleware);

export const wrapper = createWrapper<Store<IState>>(makeStore);
