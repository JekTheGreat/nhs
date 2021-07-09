/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import { createAppContainer } from "react-navigation";
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { bindActionCreators } from "redux";
import {
	createReactNavigationReduxMiddleware, createNavigationReducer,
} from "react-navigation-redux-helpers";

import Home from "../modules/home";
import OtherRoutes from "../modules/home/otherRoutes"

const AppNavigator = createStackNavigator({

	Home: {
		screen: Home,
		navigationOptions: {
			headerShown: false
		}
	},
	...OtherRoutes,

}, {
	mode: "",
	defaultNavigationOptions: {
		headerTitleAlign: 'center',
		headerBackTitle: null,
		gestureEnabled: false,
		...TransitionPresets.SlideFromRightIOS,
	},

});

const AppContainer = createAppContainer(AppNavigator);

export const nav = createNavigationReducer(AppNavigator);

export const reactNavigation = createReactNavigationReduxMiddleware(
	"root",
	({ nav }) => nav,
);

const mapStateToProps = ({ nav }) => ({
	nav,
});

const mapDispatchToProps = (dispatch) => ({
	db: bindActionCreators({}, dispatch),
});

const App = () => <AppContainer />;

export default connect(mapStateToProps, mapDispatchToProps)(App);

