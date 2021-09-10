/* eslint-disable */
import { combineReducers } from "redux";

import * as Types from "./types";
const initialInput = {
	first: {radio1: 0, radio2: 0, radio3: 0},
	second: {guest: 1, beds: 1},
	third: {},
	fourth: {},
	fifth: {},
	sixth: {},
	seventh: {},
	eigth: {previewImageUrl: {},},
	nineth: {},
	tenth: {},
	eleventh: {},
	twelveth: {No: false, Yes: false},
	thirteenth: {},
	fourtheenth: {},
	fiftheenth: {},
};

const userInput = {
	adult: 2,
	children: 1,
	infant: 1
};

const setUserInput = (state = userInput, action) => {
	switch (action.type) {
	case Types.SET_USER_INPUT:
		return action.data;
	default:
		return state;
	}
};

const setStaycationScreen = (state = "", action) => {
	switch (action.type) {
	case Types.SET_STAYCATION_SCREEN:
		return action.data;
	default:
		return state;
	}
};

const setInputDetails = (state = initialInput, action) => {
	switch (action.type) {
	case Types.SET_INPUT_DETAILS:
		return action.data;
	default:
		return state;
	}
};

const getProperties = (state = [], action) => {
	switch(action.type){
		case Types.GET_HOME_PROPERTIES:
		return action.data;
			default:
		return state;
	}
}

const getPropertyTypes = (state = [], action) => {
	switch(action.type){
		case Types.GET_HOME_PROPERTIES_TYPES:
		return action.data;
			default:
		return state;
	}
}

const getLoc = (state = [], action) => {
	switch(action.type){
		case Types.GET_LOCATION:
			return action.data;
		case Types.SET_STAYCATION_SCREEN:
			if(action.data === "fourtheenth"){
				return state;
			}
			return [];
		default:
			return state;
	}
};

const getAmenities = (state = [], action) => {
	switch(action.type){
		case Types.GET_AMENITIES:
		return action.data;
			default:
		return state;
	}
}

const getRules = (state = [], action) => {
	switch(action.type){
		case Types.GET_RULES:
		return action.data;
			default:
		return state;
	}
}

const isGettingReport = (state = false, action) => {
	switch(action.type){
		case Types.GET_USER_REPORT_LOAD:
		return true;
		case Types.GET_USER_REPORT:
		case Types.GET_USER_REPORT_FAILED:
		return false;
			default:
		return state;
	}
}

const UserReports = (state = [], action) => {
	switch(action.type){
		case Types.GET_USER_REPORT:
		return action.data;
		case Types.GET_USER_REPORT_FAILED:
		return [];
			default:
		return state;
	}
}

const ReportCount = (state = 0, action) => {
	switch(action.type){
		case Types.GET_USER_REPORT_COUNT:
		return action.data;
		case Types.GET_USER_REPORT_FAILED:
		return 0;
			default:
		return state;
	}
}

export default combineReducers({
	setStaycationScreen,
	getProperties,
	getAmenities,
	setInputDetails,
	getPropertyTypes,
	getLoc,
	getRules,

	setUserInput,
	isGettingReport,
	UserReports,
	ReportCount
});
