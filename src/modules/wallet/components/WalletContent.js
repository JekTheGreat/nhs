/* eslint-disable import/named */

import React from "react";
import {  View, StatusBar, Alert } from "react-native";
import Color from "__src/resources/styles/color";
import PropTypes from "prop-types";
import Wallet from "./Wallet";
import Account from "./Account";
import Services from "./Services";
import styles from "../styles.css";
import { NavigationActions, StackActions } from "react-navigation";
import _ from "lodash";

class WalletContent extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			currentPosition: 0,
			wHeight: null,
			isLoad: true,
			isFirstTime: true,
		};
	}
 
	static navigationOptions = {
  	headerShown: false,
	}

	componentDidUpdate(prevProps){
		const {login: {isUnauthorized}} = this.props;

		if (!_.isEqual(prevProps.login.isUnauthorized, isUnauthorized) && isUnauthorized){
			Alert.alert("Session Expired!", "Your session is expired! Please re-login your account.",
				 [{text: "Ok", onPress: () => this.logout()}], {cancelable: false});
		}
	}

	logout = () => {
		const {actions, navigation, login} = this.props;

		const resetAction = StackActions.reset({
		  index: 0,
		  key: null,
		  actions: [NavigationActions.navigate({routeName: "Login"})],
		});

		actions.logout(login.session.userId, login.currentLogin.id);
		navigation.dispatch(resetAction);
	}

	render() {
  	const { wHeight} = this.state;
  	const height = wHeight || 120;
				
  	return (
  		<View style={styles.container}>
  			<StatusBar backgroundColor={Color.StatusBar} barStyle="light-content" />
  			<View style={styles.bg}/>
  			<View style={styles.account}>
  				<Account {...this.props} />
  			</View>
  			<View style={styles.body}>
  				<View onLayout={(e) => this.setState({wHeight: e.nativeEvent.layout.height})}
  					style={styles.wallet}>
  					<Wallet currentPosition={this.state.currentPosition} {...this.props} />
  				</View>
  				<View style={[styles.services, {height} ]}/>
  				<Services {...this.props}/>
  			</View>
  		</View>
  	);
	}
}

WalletContent.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	wallet: PropTypes.object,
	navigation: PropTypes.object,
};

export default WalletContent;
