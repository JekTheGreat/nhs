import { combineReducers } from "redux";
import * as Types from "./types";

const initialState = { selectedDate: "", selectedLocation: [] }

const selectionData = (state = initialState, action) => {
	switch (action.type) {
		case Types.SELECTION_DATA:
			return action.data;
		default:
			return state;
	}
}

const getArticles = (state = [], action) => {
	switch (action.type) {
		case Types.GET_ARTICLES:
			return action.data;
		default:
			return state;
	}
};


export default combineReducers({
	getArticles,
	selectionData,
});
