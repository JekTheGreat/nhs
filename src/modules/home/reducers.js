import { combineReducers } from "redux";
import * as Types from "./types";

const ListData = ["Remittance", "Pay Bills", "Book Flights", "Buy Load", "ECash", "Insurance", "Market Place", "More"];

const favoriteService = (state = ListData, action) => {
	switch (action.type) {
		case Types.SET_FAVORITE_SERVICE:
			return action.data;
		default:
			return state;
	}
};

const setCounter = (state = 0, action) => {
	switch (action.type) {
		case Types.SET_COUNTER_INTERS:
			let newState = state;

			newState = newState >= 2 ? 0 : (newState + 1);

			return newState;
		case Types.LOGOUT:
			return 0;
		default:
			return state;
	}
};

const adsShownCounter = (state = 0, action) => {
	switch (action.type) {
		case Types.SET_ADS_COUNTER:
			let newState = state;

			newState = newState >= 2 ? 0 : (newState + 1);

			return newState;
		case Types.LOGOUT:
			return 0;
		default:
			return state;
	}
};

export default combineReducers({
	favoriteService,
	setCounter,
});
