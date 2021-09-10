/* eslint-disable */
import { combineReducers } from "redux";
import { nav } from "./navigator";
import { login } from "../modules/login";
import { home } from "../modules/home";
import { register } from "../modules/register";
import { forgot } from "../modules/forgot";
import { profile } from "../modules/profile";
import { wallet } from "../modules/wallet";
import { account } from "../modules/account";
import { loading } from "../modules/loading";
import { addlegacy } from "../modules/addlegacy";
import { locator } from "../modules/locator";
import { remittance } from "../modules/remittance";
import { billspayment } from "../modules/billspayment";
import { marketplace } from "../modules/marketplace";
import { onlinestore } from "../modules/onlinestore";
import { staycation } from "../modules/staycation";
import { ticketing } from "../modules/ticketing";


const reducer = combineReducers({
	nav,
	login,
	home,
	register,
	forgot,
	profile,
	wallet,
	account,
	loading,
	addlegacy,
	remittance,
	locator,
	billspayment,
	marketplace,
	onlinestore,
	staycation,
	ticketing,
});

const rootReducer = (state = {}, action) => {
	switch (action.type) {
		case "REDUX_STORAGE_LOAD": {
			const newState = { ...state };

			// newState.remittance.setSelectedScreen = "selection";
			// newState.ticketing.setTicketingInput.children = 2;
			// newState.ticketing.setTicketingInput.bookformyself = true;
			// newState.ticketing.setBaggage = {};
			// newState.ticketing.setSeat = {};
			return newState;
		}
		case "logout/types/LOGOUT": {
			const newState = { ...state };

			newState.login.isLoggedIn = false;
			newState.login.isLoggingIn = false;
			newState.login.isAccountNotVerified = false;
			newState.login.accounts = [];
			newState.login.currentLogin = {};
			newState.login.logInWithFb = {};
			newState.login.is2FALogin = false;
			newState.profile.currentStep = "";
			newState.profile.currentScreen = "profile";
			newState.profile.doneVerifyingEmail = false;
			newState.profile.doneSendingEmailCode = false;
			newState.profile.doneVerifyingMobile = false;
			newState.profile.doneSendingMobileCode = false;
			newState.profile.doneSubmittingKyc = false;
			newState.profile.doneVerifyingUploadIdSelfiePhoto = false;
			newState.profile.doneVerifyingUploadAddressAuthPhoto = false;
			newState.profile.doneClearingIdAndSelfiePhoto = false;
			newState.profile.doneClearingProofOfAddressPhoto = false;

			return reducer(newState, action);
		}
		default:
			return reducer(state, action);
	}
};

export default rootReducer;
