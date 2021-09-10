/* eslint-disable */
import * as Types from "./types";
import StaycationAPI from "./api/index";

export const setStaycationScreen = (data) => ({
	type: Types.SET_STAYCATION_SCREEN,
	data,
});

export const setInputDetails = (data) => ({
	type: Types.SET_INPUT_DETAILS,
	data,
});

export const setCheckboxes = (data) => ({
	type: Types.SET_CHECKBOXES,
	data,
});

export const fetchProperties = (param) => (
	async(dispatch) => {
		try {
			const result = await StaycationAPI.getProperties();

			if (result){
				dispatch({ type: Types.GET_HOME_PROPERTIES, data: result });
			}
		} catch (error) {

		}
	}
);

export const fetchPropertyTypes = (param) => (
	async(dispatch) => {
		try {
			const result = await StaycationAPI.getPropertyTypes(param);

			if (result){
				dispatch({ type: Types.GET_HOME_PROPERTIES_TYPES, data: result });
			}
		} catch (error) {

		}
	}
);

export const fetchLoc = (param) => (
	async(dispatch) => {
		try {
			const result = await StaycationAPI.getLoc(param);

			if (result){
				dispatch({ type: Types.GET_LOCATION, data: result.predictions });
			}
		} catch (error) {

		}
	}
);

export const fetchAmenities = (param) => (
	async(dispatch) => {
		try {

			const result = await StaycationAPI.getAmenities(param);
			if (result){
				dispatch({ type: Types.GET_AMENITIES, data: result });
			}
		} catch (error) {

		}
	}
);

export const fetchRules = (param) => (
	async(dispatch) => {
		try {
			const result = await StaycationAPI.getRules(param);
			if (result){
				dispatch({ type: Types.GET_RULES, data: result });
			}
		} catch (error) {

		}
	}
);

export const getAllUserReport = (param) => (
	async(dispatch) => {
		try {
				dispatch({ type: Types.GET_USER_REPORT_LOAD });
				const result = await StaycationAPI.getProperties();

			if (result){
				dispatch({ type: Types.GET_USER_REPORT, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.GET_USER_REPORT_FAILED, error: error.message || "Something went wrong." });

		}
	}
);