import Resource from "__proj/src/resources";
import Color from "__src/resources/styles/color";
import TxtInput from "__src/components/TxtInput";
import React, { PureComponent } from "react";
import { View, Text, StatusBar, Image, SafeAreaView } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import { StackActions, NavigationActions } from "react-navigation";
import styles from "../styles.css";
import Button from "__src/components/Button";
const { Res } = Resource;


class ForgotUsername extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			error: {},
		};
	}

	componentWillMount() {
		const { actions } = this.props;

		actions.saveInput("");
	}

	_backToLogin = () => {
		const { navigation, actions } = this.props;

		const resetAction = StackActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: "Login" })],
		});

		actions.reset();
		navigation.dispatch(resetAction);
	}

	_renderSuccess() {
		const { forgot: { getSaveInput } } = this.props;

		let data = getSaveInput;

		if (!isNaN(data) && data.startsWith("0")) {
			data = data.replace("0", "+63");
		}

		return (
			<View style={styles.flex1}>
				<View style={styles.flex1}>
					<View style={styles.marginTop30}>
						<Text style={styles.title}>Username Recovery</Text>
						<Text style={styles.txtsuccess}>Successful!</Text>
						<Image style={styles.imgSuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
					</View>
					<Text style={styles.txthassent}>
						Your username has been sent to
    				</Text>
					<Text style={styles.txtdata}>
						{data}
					</Text>
				</View>
				<View style={styles.marginBottom30}>
					<Button
						onPress={this._backToLogin}
						style={styles.btnStyle2}
						labelStyle={styles.labelStyle}
						label="Ok" />
				</View>
			</View>
		);
	}

	_renderInput() {
		const { forgot: { getInformationFailed, isCheckingUser, getSaveInput } } = this.props;
		const { error } = this.state;
		const displayError = "User not found";

		return (
			<View style={styles.flex1}>
				<View style={styles.flex1}>
					<View style={styles.marginTop30}>
						<Text style={styles.txtrecover}>Recover username</Text>
						<Text numberOfLines={5} style={styles.txtnote2}>
							Enter your email address or mobile number,{" "}
								from this information we will send a message{" "}
								containing the Username for your account.
    					</Text>
					</View>
					<TxtInput
						onChangeText={this._handleChangeInput}
						value={getSaveInput}
						onFocus={() => this.setState({ passFocus: true })}
						onBlur={() => this.setState({ passFocus: false })}
						isFocus={this.state.passFocus}
						onRef={(e) => this.loginpass = e}
						returnKeyType='go'
						autoCapitalize="none"
						err={getInformationFailed ? displayError : "" || error.email}
						label='EMAIL / MOBILE NUMBER'
						style={styles.marginTop30} />
				</View>

				<Button
					onPress={this._proceedForgotSuccess}
					loading={isCheckingUser}
					style={styles.btnStyle}
					label="Proceed" />
			</View>
		);
	}

	_handleChangeInput = (value) => {
		const error = {};
		const { actions } = this.props;

		if (_.isEmpty(value)) {
			error.email = "This field is required";
		}

		this.setState({ error });
		actions.saveInput(value);
	}

	_proceedForgotSuccess = () => {
		const { actions, forgot } = this.props;
		const error1 = {};

		if (_.isEmpty(forgot.getSaveInput)) {
			error1.email = "This field is required";
		}

		if (_.isEmpty(error1)) {
			actions.checkUser(forgot.getSaveInput);
		} else {
			this.setState({ error: error1 });
		}
	}

	render() {
		const { forgot } = this.props;

		return (
			<View style={styles.forgotunWrap1}>
				<StatusBar backgroundColor={Color.StatusBar} barStyle="light-content" />
				<View style={styles.flex1pad30}>
					{forgot.forgotUsernameEmailSent ? this._renderSuccess() : this._renderInput()}
				</View>
				<SafeAreaView style={styles.marginBottom20} />
			</View>
		);
	}
}

ForgotUsername.propTypes = {
	actions: PropTypes.object,
	forgot: PropTypes.object,
	navigation: PropTypes.object,
};

export default ForgotUsername;
