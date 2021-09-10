/* eslint-disable */
import Loading from "__src/components/Loading";
import React, { Component } from "react";
import { BackHandler, AppState, Platform, Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";
import { createLogger } from "redux-logger";
import * as reduxStorage from "redux-storage";
import debounce from "redux-storage-decorator-debounce";
import createEngine from "__src/resources/customize/AsyncStorage";
import AppReducer from "./reducers";
import AppNavigator from "./navigator";
const logger = createLogger({
	// ...options
});

// const engine = createEngine("unified-key");
const engine = debounce(createEngine("unified-key"), 1500);
const storage = reduxStorage.createMiddleware(engine);

const composeEnhancers = composeWithDevTools({ realtime: true });
const store = createStore(reduxStorage.reducer(AppReducer),
	composeEnhancers(applyMiddleware(thunk, logger, storage))
);

// import { setJSExceptionHandler } from "react-native-exception-handler";

const reporter = error => {
	// Logic for reporting to devs
	// Example : Log issues to github issues using github apis.
	console.log(error); // sample
};

const errorHandler = (e, isFatal) => {
	if (isFatal) {
		reporter(e);
		Alert.alert(
			"Unexpected error occurred",
			`Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message} Please close the app and start again!`,
			[
				{
					text: "Close",
					onPress: () => {
						BackHandler.exitApp();
					}
				}
			]
		);
	} else {
		console.log(e); // So that we can see it in the ADB logs in case of Android if needed
	}
};

// setJSExceptionHandler(errorHandler);

// setNativeExceptionHandler(errorString => {
//   //You can do something like call an api to report to dev team here
//   //example
//   // fetch('http://<YOUR API TO REPORT TO DEV TEAM>?error='+errorString);
//   //
// });

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		AsyncStorage.clear();
		reduxStorage.createLoader(engine)(store)
			.then((state) => {
				console.debug("Loaded previous state: ", state);
				this.setState({
					rehydrated: true,
				});
			})
			.catch((e) => {
				console.log("Unable to restore previous state!", e);
			});
	}

	render() {
		if (!this.state.rehydrated) {
			return (
				<Loading />
			);
		}
		return (
			<Provider store={store}>
				<AppNavigator />
			</Provider>
		);
	}
}
