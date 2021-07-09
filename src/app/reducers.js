/* eslint-disable */
import { combineReducers } from "redux";
import { home } from "../modules/home";

const reducer = combineReducers({
	home,
});

const rootReducer = (state = {}, action) => {
	switch (action.type) {
		case "REDUX_STORAGE_LOAD": {
			const newState = { ...state };
			return newState;
		}
		default:
			return reducer(state, action);
	}
};
export default rootReducer;
