/* eslint-disable react/no-did-mount-set-state */
import React, {PureComponent} from "react";
import {View, Text} from "react-native";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import {ListItem, CheckBox} from "react-native-elements";
import Resource from "__src/resources";
const { Color} = Resource;

export default class Security extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showSMSContent: false,
			showEMAILContent: false,
		};
	}

	componentDidMount(){
		const { login: {session: {user}} } = this.props;

		if (user.enableEmailAlert){
			this.setState({
				showEMAILContent: true,
			});
		}

		if (user.enableSMSAlert){
			this.setState({
				showSMSContent: true,
			});
		}
	}

	renderEmail = () => {
		const { login: {session: {user}} } = this.props;
		const {showEMAILContent} = this.state;

		if (showEMAILContent){
			return (<CheckBox
				containerStyle={styles.cbcontainerStyle}
				textStyle={styles.cbtextStyle}
				size={18}
				checkedColor={Color.colorPrimary}
				title='Login'
				checked={user.loginAlert === "EMAIL" || user.loginAlert === "BOTH"}
				onPress={this._setLoginAlert("EMAIL")} />);
		}

		return null;
	}

	renderMobile = () => {
		const { login: {session: {user}} } = this.props;
		const {showSMSContent} = this.state;

		if (showSMSContent){
			return (<CheckBox
				containerStyle={styles.cbcontainerStyle}
				textStyle={styles.cbtextStyle}
				size={18}
				checkedColor={Color.colorPrimary}
				title='Login'
				checked={user.loginAlert === "SMS" || user.loginAlert === "BOTH"}
				onPress={this._setLoginAlert("SMS")} />);
		}

		return null;
	}

	_setShowEMAILContent = () => {
		const { showEMAILContent } = this.state;
		const { login, actions } = this.props;
		const isEnableEmailAlert = login.session.user.enableEmailAlert;

		this.setState({
			showEMAILContent: !showEMAILContent,
		});

		if (isEnableEmailAlert) {
			actions.enableEmailAlert(login.session.userId, false);
			let nextValue;

			if (login.session.user.loginAlert === "EMAIL"){
				nextValue = null;
			} else if (login.session.user.loginAlert === "BOTH"){
				nextValue = "SMS";
			}

			actions.setLoginAlert(login.session.userId, nextValue);
		} else {
			actions.enableEmailAlert(login.session.userId, true);
		}
	}

	_setShowSMSContent = () => {
		const { showSMSContent } = this.state;
		const { login, actions } = this.props;
		const isEnableSMSAlert = login.session.user.enableSMSAlert;

		this.setState({
			showSMSContent: !showSMSContent,
		});

		if (isEnableSMSAlert){
			actions.enableSMSAlert(login.session.userId, false);
			let nextValue;

			if (login.session.user.loginAlert === "SMS"){
				nextValue = null;
			} else if (login.session.user.loginAlert === "BOTH"){
				nextValue = "EMAIL";
			}

			actions.setLoginAlert(login.session.userId, nextValue);
		} else {
			actions.enableSMSAlert(login.session.userId, true);
		}
	}

	_setLoginAlert = (type) => () => {
		const { login, actions } = this.props;

		let nextValue;

		switch (type){
		case "SMS":
			if (login.session.user.loginAlert === "SMS"){
				nextValue = null;
			} else if (login.session.user.loginAlert === "EMAIL"){
				nextValue = "BOTH";
			} else if (login.session.user.loginAlert === "BOTH"){
				nextValue = "EMAIL";
			} else {
				nextValue = "SMS";
			}

			actions.setLoginAlertProgress("SMS");
			break;
		case "EMAIL":
			if (login.session.user.loginAlert === "SMS"){
				nextValue = "BOTH";
			} else if (login.session.user.loginAlert === "EMAIL"){
				nextValue = null;
			} else if (login.session.user.loginAlert === "BOTH"){
				nextValue = "SMS";
			} else {
				nextValue = "EMAIL";
			}

			actions.setLoginAlertProgress("EMAIL");
			break;
		default:
			break;
		}

		actions.setLoginAlert(login.session.userId, nextValue);
	}

	render() {
		const { login: {session: {user}} } = this.props;
		// const { enableEmailAlertProgress, enableSMSAlertProgress } = account;
  	
		return (
  		<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Alerts</Text>
  				<Text style={styles.subtitle}>
					Get an alert when anyone logs into your account.
					</Text>
					<View>
						<ListItem
							titleStyle={styles.titleStyle3}
							containerStyle={styles.liStyle}
							title={"Email"}
							subtitleStyle={styles.subtitleStyle3}
							subtitle={"Email alert to jua****@gmail.com"}
							// switchButton
							switch={{trackColor: {true: Color.colorPrimary},
								value: user.enableEmailAlert,
								onValueChange: this._setShowEMAILContent}}
							// switched={user.enableEmailAlert}
							// switchTrackColor={Color.colorPrimary}
							// onSwitch={this._setShowEMAILContent}
						/>
						{this.renderEmail()}
					</View>
					<View>
						<ListItem
							titleStyle={styles.titleStyle3}
							containerStyle={styles.liStyle}
							title={"SMS"}
							subtitleStyle={styles.subtitleStyle3}
							subtitle={"Text alert to +6390****123"}
							switch={{trackColor: {true: Color.colorPrimary},
								value: user.enableSMSAlert,
								onValueChange: this._setShowSMSContent}}
							// switchButton
							// switch={{trackColor: {true: Color.colorPrimary}}}
							// switched={user.enableSMSAlert}
							// switchTrackColor={Color.colorPrimary}
							// onSwitch={this._setShowSMSContent}
						/>
						{this.renderMobile()}
					</View>
  			</View>
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
