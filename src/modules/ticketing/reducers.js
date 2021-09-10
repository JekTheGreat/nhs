import { combineReducers } from "redux";
import * as Types from "./types";
import _ from "lodash";

const initInput = {bookingClass: "Economy", adults: 1, children: 0, infants: 0, seniors: 0, flightTripType: "OneWay",
	flightType: "DOM", origin: {}, destination: {}, bookformyself: false};
const contactInit = {title: "Mr", countryName: "Philippines", country: "PH", flag: "PHP", callingCode: "63"};

const setTicketingInput = (state = initInput, action) => {
	switch (action.type) {
	case Types.SET_TICKETING_INPUT:
		return action.data;
	default:
		return state;
	}
};

const setAirlines = (state = ["All Airlines"], action) => {
	switch (action.type) {
	case Types.SET_AIRLINES:
		return action.data;
	case Types.RESET_TICKETING:
		return ["All Airlines"];
	default:
		return state;
	}
};

const searchCountry = (state = [], action) => {
	switch (action.type) {
	case Types.SEARCH_COUNTRY:
		return action.data;
	default:
		return state;
	}
};

const setScreen = (state = "", action) => {
	switch (action.type) {
	case Types.SET_TICKTING_SCREEN:
		return action.data;
	default:
		return state;
	}
};

const isSearchingFlights = (state = false, action) => {
	switch (action.type) {
	case Types.SEARCH_FLIGHT_LOAD:
		return true;
	case Types.SEARCH_FLIGHT:
	case Types.SEARCH_FLIGHT_FAILED:
		return false;
	default:
		return state;
	}
};

const SearchFlights = (state = {}, action) => {
	switch (action.type) {
	case Types.SEARCH_FLIGHT:
		return action.data;
	case Types.SEARCH_FLIGHT_LOAD:
	case Types.SEARCH_FLIGHT_FAILED:
		return {};
	default:
		return state;
	}
};

const SearchFlightFailed = (state = "", action) => {
	switch (action.type) {
	case Types.SEARCH_FLIGHT_FAILED:
		return action.error;
	case Types.SEARCH_FLIGHT_LOAD:
		return "";
	default:
		return state;
	}
};

const selectDeparture = (state = {}, action) => {
	switch (action.type) {
	case Types.SET_SELECT_DEPARTURE:
		return action.data;
	case Types.SEARCH_COUNTRY:
	case Types.SEARCH_FLIGHT:
		return {};
	default:
		return state;
	}
};

const selectReturn = (state = {}, action) => {
	switch (action.type) {
	case Types.SET_SELECT_RETURN:
		return action.data;
	case Types.SEARCH_COUNTRY:
	case Types.SEARCH_FLIGHT:
		return {};
	default:
		return state;
	}
};

const setPassengers = (state = [], action) => {
	switch (action.type) {
	case Types.SET_PASSENGER_DETAILS:
		if (_.isArray(action.data)){
			return action.data;
		}

		let newState = [...state];
		newState =	_.map([...newState], (item) => {
			if (item.id === action.data.id){
				return _.merge(item, action.data);
			}
					
			return item;
		});
				
		return newState;
	case Types.RESET_TICKETING:
		return [];
	default:
		return state;
	}
};

const setBaggage = (state = {}, action) => {
	switch (action.type) {
	case Types.SET_PASSENGER_BAGGAGE_DEFAULT:
		let newBagState = {...state};

		newBagState = _.merge(newBagState, action.data);

		return newBagState;
	case Types.SET_PASSENGER_BAGGAGE:
		const newState = {...state};
		const flight = newState[action.data.type];
		const filter = _.filter([...flight], {id: action.data.id});
		newState[action.data.type] = filter.length > 0 ?
			_.map([...flight], (item) => {
				if (item.id === action.data.id && item.type === action.data.type){
					return _.merge(item, action.data);
				}
			
				return item;
			}) : [...flight].concat(action.data);
		
		return newState;
	case Types.SEARCH_FLIGHT:
	case Types.RESET_TICKETING:
	case Types.SET_SELECT_DEPARTURE:
	case Types.SET_SELECT_RETURN:
		return {};
	default:
		return state;
	}
};

const setSeat = (state = {}, action) => {
	switch (action.type) {
	case Types.SET_PASSENGER_SEAT_DEFAULT:
		let newSeatSate = {...state};

		newSeatSate = _.merge(newSeatSate, action.data);

		return newSeatSate;
	case Types.SET_PASSENGER_SEAT:
		const newState = {...state};
		const flight = newState[action.data.type];
		const filter = _.filter([...flight], {id: action.data.id});

		if (filter.length > 0){
			const searchSame = _.filter([...flight], {id: action.data.id,
				SeatDesignator: action.data.SeatDesignator});

			if (searchSame.length > 0){
				newState[action.data.type] = _.filter([...flight], (item) => {
					return item.id !== action.data.id;
				});
			} else {
				newState[action.data.type] = _.map([...flight], (item) => {
					if (item.id === action.data.id && item.type === action.data.type &&
						item.SeatDesignator !== action.data.SeatDesignator){
						return _.merge(item, action.data);
					}
				
					return item;
				});
			}
		} else {
			newState[action.data.type] = [...flight].concat(action.data);
		}
		
		return newState;
	case Types.SEARCH_FLIGHT:
	case Types.RESET_TICKETING:
	case Types.SET_SELECT_DEPARTURE:
	case Types.SET_SELECT_RETURN:
		return {};
	default:
		return state;
	}
};

const setMeal = (state = [], action) => {
	switch (action.type) {
	case Types.SET_PASSENGER_MEAL:

		return _.unionBy([action.data], [...state], "id");
	case Types.RESET_TICKETING:
	case Types.SET_SELECT_DEPARTURE:
	case Types.SET_SELECT_RETURN:
		return [];
	default:
		return state;
	}
};

const setInsurance = (state = [], action) => {
	switch (action.type) {
	case Types.SET_PASSENGER_INSURANCE:

		return _.unionBy([action.data], [...state], "id");
	case Types.RESET_TICKETING:
	case Types.SET_SELECT_DEPARTURE:
	case Types.SET_SELECT_RETURN:
		return [];
	default:
		return state;
	}
};

const setContactPerson = (state = contactInit, action) => {
	switch (action.type) {
	case Types.SET_CONTACT_PERSON:
		return action.data;
	case Types.RESET_TICKETING:
	case Types.SEARCH_FLIGHT:
		return contactInit;
	default:
		return state;
	}
};

const isGetItineraryPrice = (state = false, action) => {
	switch (action.type) {
	case Types.GET_ITINERARY_PRICE_LOAD:
		return true;
	case Types.RESET_TICKETING:
	case Types.GET_ITINERARY_PRICE:
	case Types.SET_SELECT_DEPARTURE:
	case Types.SET_SELECT_RETURN:
	case Types.GET_ITINERARY_PRICE_FAILED:
		return false;
	default:
		return state;
	}
};

const ItineraryPriceFailed = (state = "", action) => {
	switch (action.type) {
	case Types.GET_ITINERARY_PRICE_FAILED:
		return action.error;
	case Types.RESET_TICKETING:
	case Types.SET_SELECT_DEPARTURE:
	case Types.SET_SELECT_RETURN:
	case Types.GET_ITINERARY_PRICE_LOAD:
	case Types.GET_ITINERARY_PRICE:
		return "";
	default:
		return state;
	}
};

const isGettingBaggage = (state = false, action) => {
	switch (action.type) {
	case Types.GET_AVAILABLE_BAGGAGE_LOAD:
		return true;
	case Types.RESET_TICKETING:
	case Types.GET_AVAILABLE_BAGGAGE:
	case Types.GET_AVAILABLE_BAGGAGE_FAILED:
		return false;
	default:
		return state;
	}
};

const setPreviousSearch = (state = [], action) => {
	switch (action.type) {
	case Types.SET_PREVIOUS_SEARCH:
		let newState = [...state];
		const filter = _.filter([...newState], {iata: action.data.iata});
		if (newState.length <= 10){
			newState = filter.length > 0 ?
				_.map([...newState], (item) => {
					if (item.iata === action.data.iata){
						return _.merge(item, action.data);
					}
			
					return item;
				}) : [...newState].concat(action.data);
		} else {
			newState[newState.length - 1] = action.data;
		}
		
		return _.orderBy(newState, ["updatedAt"], ["desc"]);
	default:
		return state;
	}
};

const isSelectedFares = (state = false, action) => {
	switch (action.type) {
	case Types.GET_SELECTED_FARES_LOAD:
		return true;
	case Types.RESET_TICKETING:
	case Types.GET_SELECTED_FARES:
	case Types.GET_SELECTED_FARES_FAILED:
	case Types.SEARCH_FLIGHT:
		return false;
	default:
		return state;
	}
};

const selectedFare = (state = {}, action) => {
	switch (action.type) {
	case Types.GET_SELECTED_FARES:
		return action.data;
	case Types.RESET_TICKETING:
	case Types.GET_SELECTED_FARES_FAILED:
	case Types.SEARCH_FLIGHT:
	case Types.SET_SELECT_RETURN:
	case Types.SET_SELECT_DEPARTURE:
	case Types.GET_SELECTED_FARES_LOAD:
		return {};
	default:
		return state;
	}
};

const selectedFareFailed = (state = "", action) => {
	switch (action.type) {
	case Types.GET_SELECTED_FARES_FAILED:
		return action.error;
	case Types.RESET_TICKETING:
	case Types.GET_SELECTED_FARES:
	case Types.SEARCH_FLIGHT:
	case Types.GET_SELECTED_FARES_LOAD:
		return "";
	default:
		return state;
	}
};

const isSearchingSeats = (state = false, action) => {
	switch (action.type) {
	case Types.GET_AVAILABLE_SEAT_LOAD:
		return true;
	case Types.GET_AVAILABLE_SEAT:
	case Types.GET_AVAILABLE_SEAT_FAILED:
		return false;
	default:
		return state;
	}
};

const BaggageList = (state = {}, action) => {
	switch (action.type) {
	case Types.SET_PASSENGER_BAGGAGE_DEFAULT:
		let newBagState = {...state};
	
		newBagState = _.merge(newBagState, action.data);
	
		return newBagState;
	case Types.GET_AVAILABLE_BAGGAGE:
		const newState = {...state};
		newState[action.data.type] = action.data.result;

		return newState;
	case Types.RESET_TICKETING:
	case Types.SEARCH_FLIGHT:
	case Types.SET_SELECT_DEPARTURE:
	case Types.SET_SELECT_RETURN:
		return {};
	default:
		return state;
	}
};

const SeatFound = (state = {}, action) => {
	switch (action.type) {
	case Types.SET_PASSENGER_SEAT_DEFAULT:
		let newSeatSate = {...state};
	
		newSeatSate = _.merge(newSeatSate, action.data);
	
		return newSeatSate;
	case Types.GET_AVAILABLE_SEAT:
		const newState = {...state};

		newState[action.data.type] = action.data.result;

		return newState;
	case Types.SEARCH_FLIGHT:
	case Types.RESET_TICKETING:
	case Types.SET_SELECT_DEPARTURE:
	case Types.SET_SELECT_RETURN:
		return {};
	default:
		return state;
	}
};

const isBookingNow = (state = false, action) => {
	switch (action.type) {
	case Types.BOOK_NOW_LOAD:
		return true;
	case Types.BOOK_NOW:
	case Types.BOOK_NOW_FAILED:
		return false;
	default:
		return state;
	}
};

const BookSuccess = (state = {}, action) => {
	switch (action.type) {
	case Types.BOOK_NOW:
		return action.data;
	case Types.BOOK_NOW_LOAD:
	case Types.SEARCH_FLIGHT:
	case Types.BOOK_NOW_FAILED:
	case Types.RESET_TICKETING:
		return {};
	default:
		return state;
	}
};

const BookFailed = (state = {}, action) => {
	switch (action.type) {
	case Types.BOOK_NOW_FAILED:
		return action.error;
	case Types.SEARCH_FLIGHT:
	case Types.BOOK_NOW:
	case Types.BOOK_NOW_LOAD:
	case Types.RESET_TICKETING:
		return {};
	default:
		return state;
	}
};

const isGettingMarkup = (state = false, action) => {
	switch (action.type) {
	case Types.GET_MARKUP_LOAD:
		return true;
	case Types.GET_MARKUP_FAILED:
	case Types.GET_MARKUP:
	case Types.RESET_TICKETING:
		return false;
	default:
		return state;
	}
};

const markupList = (state = [], action) => {
	switch (action.type) {
	case Types.GET_MARKUP:
		return action.data;
	case Types.GET_MARKUP_FAILED:
	case Types.GET_MARKUP_LOAD:
	case Types.RESET_TICKETING:
		return [];
	default:
		return state;
	}
};

const isAddMarkup = (state = false, action) => {
	switch (action.type) {
	case Types.ADD_MARKUP_LOAD:
		return true;
	case Types.ADD_MARKUP_FAILED:
	case Types.ADD_MARKUP:
	case Types.RESET_TICKETING:
		return false;
	default:
		return state;
	}
};

const addMarkupSuccess = (state = "", action) => {
	switch (action.type) {
	case Types.ADD_MARKUP:
		return action.data;
	case Types.ADD_MARKUP_FAILED:
	case Types.ADD_MARKUP_LOAD:
	case Types.RESET_TICKETING:
		return "";
	default:
		return state;
	}
};

const addMarkupFailed = (state = "", action) => {
	switch (action.type) {
	case Types.ADD_MARKUP_FAILED:
		return action.error;
	case Types.ADD_MARKUP:
	case Types.ADD_MARKUP_LOAD:
	case Types.RESET_TICKETING:
		return "";
	default:
		return state;
	}
};

const isGettingLogs = (state = false, action) => {
	switch (action.type) {
	case Types.GET_TICKET_LOGS_LOAD:
		return true;
	case Types.GET_TICKET_LOGS_FAILED:
	case Types.GET_TICKET_LOGS:
	case Types.RESET_TICKETING:
		return false;
	default:
		return state;
	}
};

const ticketLogs = (state = [], action) => {
	switch (action.type) {
	case Types.GET_TICKET_LOGS:
		return action.data;
	case Types.GET_TICKET_LOGS_FAILED:
	case Types.GET_TICKET_LOGS_LOAD:
	case Types.RESET_TICKETING:
		return [];
	default:
		return state;
	}
};

const ticketLogsCount = (state = 0, action) => {
	switch (action.type) {
	case Types.GET_TICKET_LOGS_COUNT:
		return action.data;
	case Types.GET_TICKET_LOGS_FAILED:
	case Types.GET_TICKET_LOGS_LOAD:
	case Types.RESET_TICKETING:
		return 0;
	default:
		return state;
	}
};

export default combineReducers({
	setTicketingInput,
	searchCountry,
	setScreen,
	setContactPerson,
	isSearchingFlights,
	SearchFlights,
	SearchFlightFailed,
	selectDeparture,
	selectReturn,
	setPassengers,
	setBaggage,
	setSeat,
	setMeal,
	setInsurance,
	isGetItineraryPrice,
	ItineraryPriceFailed,
	isGettingBaggage,
	BaggageList,
	setPreviousSearch,
	isSelectedFares,
	selectedFare,
	selectedFareFailed,
	isSearchingSeats,
	SeatFound,
	isBookingNow,
	BookSuccess,
	BookFailed,
	setAirlines,
	isGettingMarkup,
	markupList,
	isAddMarkup,
	addMarkupSuccess,
	addMarkupFailed,
	isGettingLogs,
	ticketLogs,
	ticketLogsCount,
});
