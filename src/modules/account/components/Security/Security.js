import React, {PureComponent} from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import AuthorizedLogin from "./AuthorizedLogin";
import Alerts from "./Alerts";
import WhereLoggedIn from "./WhereLoggedIn";
import _ from "lodash";

export default class Security extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			error: {},
		};
	}
	
	_renderChildren = () => {
		const { navigation } = this.props;
		const title = _.has(navigation, "state.params.title") ?
			navigation.state.params.title : "";
	
		switch (title){
		case "Authorized Login":
			return this._renderAuthorizedLogin();
		case "Alerts":
			return this._renderAlert();
		case "Where You Logged In":
			return this._renderWhereLoggedIn();
		default:
			return this._renderAuthorizedLogin();
		}
	}

	_renderAuthorizedLogin = () => (
		<AuthorizedLogin {...this.props} />
	);

	_renderAlert = () => (
		<Alerts {...this.props} />
	);

	_renderWhereLoggedIn = () => (
		<WhereLoggedIn {...this.props} />
	);

	render(){
		return (
			<View style={styles.flex1}>
				{this._renderChildren()}
			</View>
		);
	}
}
Security.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
