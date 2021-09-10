/* eslint-disable max-len */
import React, { PureComponent } from "react";
import { View, Text, Image, Alert } from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import Resource from "__src/resources";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import styles from "../styles.css";

const { Color, Res } = Resource;

class EmailActivation extends PureComponent {
	constructor() {
		super();
		this.state = {
			error: {},
			seconds: 60,
			code: "",
		};
	}

	componentDidMount() {
		this.countDown();
	}


	countDown = () => {
		const countDownDate = new Date().getTime() + 60100;
		let seconds = 0;

		this.interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = countDownDate - now;

			seconds = Math.floor((distance % (1000 * 60)) / 1000);

			if (seconds < 0) {
				clearInterval(this.interval);
				this.setState({ seconds });
			} else {
				this.setState({ seconds });
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	_proceedResetFrom = () => {
		const { actions, register: { isRegistered } } = this.props;
		const error = {};

		if (_.isEmpty(this.state.code)) {
			error.code = "Verification code is required";
		}
		this.setState({ error });

		if (_.isEmpty(error)) {
			const params = { code: this.state.code };

			actions.sendCode(params, isRegistered.token);
		}
	}

	_handleCode = (value) => {
		const error = {};

		if (_.isEmpty(value)) {
			error.code = "Verification code is required.";
		}

		this.setState({ code: value.trim() });
	}

	resendCode = () => {
		const { actions, register: { isRegistered } } = this.props;
		this.setState({ seconds: 60 });
		this.countDown();

		actions.resendCode(isRegistered.token);
	}

	render() {
		const { seconds, error, code } = this.state;
		const { register: { registerNewInput, isResendingCode, isSendingCode } } = this.props;

		return (
			<View style={styles.flex1}>
				<View style={styles.top}>
					<Image style={styles.imgicon} source={Res.get("email_icon")} resizeMode={"contain"} />
				</View>
				<View style={styles.bottom}>
					<Text style={styles.textTitle}>Email Activation</Text>
					<View style={styles.marginTop20}>
						<Text style={styles.textContent1}>We sent a confirmation code to:</Text>
						<Text style={styles.textMobile}>{registerNewInput.email}</Text>
						<Text style={styles.textContent1}>
							{"Check your email and enter the code below"}
						</Text>
					</View>
					<TxtInput
						onChangeText={this._handleCode}
						value={code}
						inputStyles={styles.inputStyles}
						onFocus={() => this.setState({ unFocus: true })}
						isFocus={this.state.unFocus}
						autoCapitalize="none"
						returnKeyType='done'
						err={error.code}
						style={styles.marginTop10} />

					<Text style={styles.textContent3}>Please check your email. if you still haven't received confirmation code, you can request another.</Text>
					{seconds > 0 ?
						<Text style={styles.textContent4}>
							You may resend code in {
								(seconds > 1) ?
									`${seconds} seconds` :
									`${seconds} second`}
						</Text> :
						<Text style={styles.textContent4}>Didn't get the code?
							<Text suppressHighlighting onPress={this.resendCode}
								style={{ color: Color.colorPrimary }}> Resend code</Text>
						</Text>}
					<Button
						onPress={this._proceedResetFrom}
						loading={isSendingCode || isResendingCode}
						style={styles.btnStyle}
						label="Proceed" />
				</View>
			</View>
		);
	}
}

EmailActivation.propTypes = {
	forgot: PropTypes.object,
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
};

export default EmailActivation;
