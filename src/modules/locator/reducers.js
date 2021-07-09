import { combineReducers } from "redux";

import * as Types from "./types";

const setCoordinate = (state = [], action) => {
	switch (action.type) {
	case Types.SET_COORDINATION:
		return action.data;
	default:
		return state;
	}
};
const setEnableFollowUser = (state = false, action) => {
	switch (action.type) {
	case Types.SET_FOLLOW_USER_ENABLE:
		return action.data;
	default:
		return state;
	}
};
export default combineReducers({
	setCoordinate,
	setEnableFollowUser,
});
