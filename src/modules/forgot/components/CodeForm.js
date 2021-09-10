/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text, Image} from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import Resource from "__src/resources";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import styles from "../styles.css";

const {Color, Res} = Resource;

class CodeForm extends PureComponent {
	constructor(){
		super();
		this.state = {
			error: {},
			seconds: 60,
		};
	}

	componentDidMount(){
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

	render() {
		const {seconds} = this.state;
		const { forgot: {getSaveCode, codeError, codeValidating,
			resendingCode, forgotpasswordType, getSaveRadio} } = this.props;
		const icon = forgotpasswordType === "mobile" ? "sms_icon" : "email_icon";
		const detail = forgotpasswordType === "mobile" ? "inbox" : "email";

		return (
			<View style={styles.flex1}>
				<View style={styles.top}>
					<Image style={styles.imgicon} source={Res.get(icon)} resizeMode={"contain"} />
				</View>

				<View style={styles.bottom}>
					<Text style={styles.textTitle}>Code Activation</Text>
					<View style={styles.marginTop20}>
						<Text style={styles.textContent1}>We sent a confirmation code to:</Text>
						<Text style={styles.textMobile}>{getSaveRadio}</Text>
						<Text style={styles.textContent1}>
							{`Check your ${detail} and enter the code below`}
						</Text>
					</View>
					<TxtInput
						onChangeText={this._handleCode}
						value={getSaveCode}
						inputStyles={styles.inputStyles}
						onFocus={() => this.setState({unFocus: true})}
						isFocus={this.state.unFocus}
						autoCapitalize="none"
						returnKeyType='done'
						err={codeError}
						style={styles.marginTop10} />

					<Text style={styles.textContent3}>Please check your email. if you still haven't received confirmation code, you can request another.</Text>
					{seconds > 0 ?
						<Text style={styles.textContent4}>
							You may resend code in {
								(seconds > 1) ?
									`${seconds} seconds` :
									`${seconds} second` }
						</Text> :
						<Text style={styles.textContent4}>Didn't get the code?
							<Text suppressHighlighting onPress={this.resendCode}
								style={{color: Color.colorPrimary}}> Resend code</Text>
						</Text> }
					<Button
  				onPress={this._proceedResetFrom}
  				loading={codeValidating || resendingCode}
  				style={styles.btnStyle}
  				label="Proceed"/>
				</View>
			</View>
			
		);
	}

	_proceedResetFrom = () => {
		const { actions, forgot } = this.props;
		const { getSaveCode, userInfo } = forgot;
		const error1 = {};

		if (_.isEmpty(getSaveCode)) {
			error1.code = "Code is required";
		}

		if (_.isEmpty(error1)) {
			actions.sendCode(userInfo.id, getSaveCode);
		} else {
			this.setState({
				error: error1,
			});
		}
	}

	_handleCode = (value) => {
		const { actions } = this.props;
		const { error } = this.state;

		if (_.isEmpty(value)) {
			error.code = "Code is required.";
		} else {
			delete error.code;
		}

		actions.saveCode(value);
	}

	resendCode = () => {
		const { actions, forgot } = this.props;
		const { getSaveRadio, forgotpasswordType } = forgot;

		actions.resendCode(getSaveRadio, forgot.userInfo.id, forgotpasswordType);
	}
}

CodeForm.propTypes = {
	forgot: PropTypes.object,
	actions: PropTypes.object,
};

export default CodeForm;
