/* eslint-disable no-throw-literal */
/* eslint-disable no-negated-condition */

import * as Types from "./types";
import TicketingApi from "./api/index";
import {Alert} from "react-native";
import _ from "lodash";;

export const setScreen = (data) => ({
	type: Types.SET_TICKTING_SCREEN, data,
});

export const setPreviousSearch = (data) => ({
	type: Types.SET_PREVIOUS_SEARCH, data,
});

export const resetTicketing = () => ({
	type: Types.RESET_TICKETING,
});

export const setAirlines = (data) => ({
	type: Types.SET_AIRLINES, data,
});

export const setTicketingInput = (data) => ({
	type: Types.SET_TICKETING_INPUT, data,
});

export const searchCountryReset = (data) => ({
	type: Types.SEARCH_COUNTRY, data,
});

export const selectDeparture = (data) => ({
	type: Types.SET_SELECT_DEPARTURE, data,
});

export const selectReturn = (data) => ({
	type: Types.SET_SELECT_RETURN, data,
});
export const setPassengers = (data) => ({
	type: Types.SET_PASSENGER_DETAILS, data,
});
export const setBaggage = (data) => ({
	type: Types.SET_PASSENGER_BAGGAGE, data,
});
export const setSeat = (data) => ({
	type: Types.SET_PASSENGER_SEAT, data,
});
export const setMeal = (data) => ({
	type: Types.SET_PASSENGER_MEAL, data,
});
export const setInsurance = (data) => ({
	type: Types.SET_PASSENGER_INSURANCE, data,
});
export const setContactPerson = (data) => ({
	type: Types.SET_CONTACT_PERSON, data,
});
export const setPassengerDefaultAddOns = (data) => ({
	type: Types.SET_PASSENGER_SEAT_DEFAULT, data,
});
export const setPassengerDefaultBaggage = (data) => ({
	type: Types.SET_PASSENGER_BAGGAGE_DEFAULT, data,
});

export const searchCountry = (prefix) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.SEARCH_COUNTRY_LOAD});

			const result = await TicketingApi.callGet(`/airport/autocomplete/${prefix}`);

			if (result){
				dispatch({ type: Types.SEARCH_COUNTRY, data: result});
			}
		} catch (error) {
			dispatch({ type: Types.SEARCH_COUNTRY_FAILED, error});
		}
	}
);

const passengerLoop = (params, personal) => {
	const arr = [];

	if (params.bookformyself){
		arr.push({id: 0, firstName: personal.firstName, middleName: personal.middleName, suffix: "",
			lastName: personal.lastName, gender: personal.gender === "male" ? "M" : "F", type: "ADT", province: "MNL",
			nationality: "PH", nationalityName: personal.nationality, countryCode: "PH", birthdate: personal.birthDate});
	} else {
		for (let i = 0; i < params.adults; i++){
			arr.push({id: i, gender: "M", nationalityName: "Philippines", countryCode: "PH", type: "ADT"});
		}

		for (let x = 0; x < params.children; x++){
			arr.push({id: params.children + x, gender: "M", nationalityName: "Philippines", countryCode: "PH", type: "CHD"});
		}

		for (let y = 0; y < params.infants; y++){
			arr.push({id: params.children + params.infants + y, gender: "M", nationalityName: "Philippines", countryCode: "PH", type: "INF"});
		}
	}

	return arr;
};

export const searchFlight = (params, token, personal) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.SEARCH_FLIGHT_LOAD});

			const result = await TicketingApi.callPost("/airline/availability", params, token);
			const arr = passengerLoop(params, personal);

			console.log(result);
			if (!_.isEmpty(result.Results)){
				dispatch(setPassengers(arr));
				dispatch({ type: Types.SEARCH_FLIGHT, data: result});
				dispatch(setScreen("OnwardScreen"));
			} else {
				throw {message: "No data found. Please search another."};
			}
		} catch (error) {
			const message = _.isString(error) ? error : error.message;

			dispatch({ type: Types.SEARCH_FLIGHT_FAILED, error: message || "Something went wrong. Please try again!"});
		}
	}
);

export const getItinerary = (params, token, screen) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.GET_ITINERARY_PRICE_LOAD});

			const result = await TicketingApi.callPost("/airline/get-itinerary-price", params, token);

			if (result){
				if (screen === "OnwardScreen"){
					dispatch(selectDeparture(result));
				} else {
					dispatch(selectReturn(result));
				}
			} else {
				throw "No data found. Please search another.";
			}
		} catch (error) {
			const message = _.isString(error) ? error : error.message;

			dispatch({ type: Types.GET_ITINERARY_PRICE_FAILED, error: message || "No base fare. Please choose other."});
		}
	}
);

export const getSelectFares = (params, token, nextScreen) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.GET_SELECTED_FARES_LOAD});

			const result = await TicketingApi.callPost("/airline/select-fares", params, token);
			console.log("result", result);
			if (result) {
				dispatch({ type: Types.GET_SELECTED_FARES, data: result});
				dispatch(setScreen(nextScreen));
			}
		} catch (error) {
			const message = _.isString(error) ? error : error.message;

			dispatch({ type: Types.GET_SELECTED_FARES_FAILED, error: message || "Something went wrong!"});
			const timeout = setTimeout(() => {
				Alert.alert("Notice", message || "Something went wrong!");
				clearTimeout(timeout);
			}, 10);
		}
	}
);

export const getBaggages = (params, token, type) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.GET_AVAILABLE_BAGGAGE_LOAD});

			const result = await TicketingApi.callPost("/airline/baggages", params, token);
			console.log("result", result);
			if (!_.isEmpty(result.baggages)) {
				const newBaggage = _.map(result.baggages, (o) => {
					return {...o, type: result.type};
				});

				dispatch({ type: Types.GET_AVAILABLE_BAGGAGE,
					data: {type, result: newBaggage}});
			} else {
				dispatch({ type: Types.GET_AVAILABLE_BAGGAGE_FAILED, error: "No record found"});
			}
		} catch (error) {
			const message = _.isString(error) ? error : error.message;

			dispatch({ type: Types.GET_AVAILABLE_BAGGAGE_FAILED, error: message || "Something went wrong!"});
		}
	}
);

export const getSeats = (params, token, type) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.GET_AVAILABLE_SEAT_LOAD});

			const result = await TicketingApi.callPost("/airline/seats", params, token);
			console.log("getSeats", result);

			if (result) {
				dispatch({ type: Types.GET_AVAILABLE_SEAT, data: {type, result: result.Rows}});
			}
		} catch (error) {
			const message = _.isString(error) ? error : error.message;

			dispatch({ type: Types.GET_AVAILABLE_SEAT_FAILED, error: message || "Something went wrong!"});
		}
	}
);

export const setBookLoad = () => ({
	type: Types.BOOK_NOW_LOAD,
});

export const bookNow = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.BOOK_NOW_LOAD});

			const result = await TicketingApi.callPost("/airline/book", params, token);
			console.log("result", result);
			if (result){
				dispatch({ type: Types.BOOK_NOW, data: result});
			}
		} catch (error) {
			dispatch({ type: Types.BOOK_NOW_FAILED, error});
		}
	}
);

export const addMarkupCurrency = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.ADD_MARKUP_LOAD});

			const result = await TicketingApi.callPost("/mark-up", params, token);
			console.log("result", result);
			if (result){
				dispatch(getListMarkup(token));
				dispatch({ type: Types.ADD_MARKUP, data: result});
			}
		} catch (error) {
			dispatch({ type: Types.ADD_MARKUP_FAILED, error: error.message || "Something went wrong"});
		}
	}
);

export const getListMarkup = (token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.GET_MARKUP_LOAD});

			const result = await TicketingApi.callGet("/mark-up", token);
			console.log("result", result);

			if (result){
				dispatch({ type: Types.GET_MARKUP, data: result});
			}
		} catch (error) {
			dispatch({ type: Types.GET_MARKUP_FAILED, error: error.message || "Something went wrong"});
		}
	}
);

export const getListLogs = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.GET_TICKET_LOGS_LOAD});

			const result = await TicketingApi.callGet(`/transactions/lists?${params}`, token);
			console.log("result", result);

			if (result){
				dispatch({ type: Types.GET_TICKET_LOGS, data: result.data});
				dispatch({ type: Types.GET_TICKET_LOGS_COUNT, data: result.count});
			}
		} catch (error) {
			const newErr = _.isString(error) ? error : error.message;

			dispatch({ type: Types.GET_TICKET_LOGS_FAILED, error: newErr || "Something went wrong"});
		}
	}
);
