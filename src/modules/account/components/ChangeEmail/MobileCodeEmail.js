import React, {PureComponent} from "react";
import {View, Text, Image} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import _ from "lodash";
const {Res, Color} = Resource;

export default class MobileCodeEmail extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			error: {},
			seconds: 60,
		};

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

	componentWillUnmount(){
		clearInterval(this.interval);
	}
  
  _onChange = (type) => (value) => {
  	const { account, actions } = this.props;
  	const { error } = this.state;
  	const newInput = _.merge({}, account.changeEmailInput);

  	switch (type){
  	case "code":
  		if (_.isEmpty(value)) {
  			error.code = "Verification code is required.";
  		} else {
  			delete error.code;
  		}

  		newInput.code = value;
  		break;
  	default:
  		break;
  	}

  	actions.setEmailInput(newInput);
  };
  
  _proceed = () => {
  	const { actions, account, login } = this.props;

  	actions.changeEmail(account.changeEmailInput, login.session.userId);
  }

  _handleSendMobileCode = () => {
  	const { actions, login } = this.props;

  	this.setState({ seconds: 60 });
  	this.countDown();
  	actions.resendMobileCode(login.session.user.mobile, login.session.userId);
  }
	
	renderDone =() => (
		<View style={styles.flex1marT30padH30}>
  		<View style={styles.flex1}>
				<Text style={styles.subsuccess}>Change Email Address</Text>
				<Text style={styles.success}>Successful!</Text>
  			<Image style={styles.img1} source={Res.get("check_icon")} resizeMode={"contain"} />
  		</View>
			<View style={styles.marginBottom20}>
				<Button
					onPress={this._backEmailForm}
					style={styles.btnStyle3}
					labelStyle={styles.btnLabelStyle}
					label="Ok"/>
			</View>
  	</View>
	);

	_backEmailForm = () => {
		const { actions } = this.props;

		actions.setEmailScreen("emailForm");
		actions.resetNewEmailData();
		actions.resetPasswordState();
		actions.resetChangeEmail();
	}

	render() {
  	const {error, seconds} = this.state;
  	const { account } = this.props;
  	const { isInvalidEmailCode, isSuccessChangeEmail,
  		changeEmailInput, proceedButtonIsLoading} = account;

		if (isSuccessChangeEmail){
			return this.renderDone();
		}
  	
		return (
  		<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Confirmation Code</Text>
  				<Text style={styles.subtitle}>Code was sent to your mobile number</Text>
  				<TxtInput
  					onChangeText={this._onChange("code")}
  					value={changeEmailInput.code}
  					onFocus={() => this.setState({fnewE: true})}
  					onBlur={() => this.setState({fnewE: false})}
  					isFocus={this.state.fnewE}
  					autoCapitalize="none"
  					placeholder="Enter the 4-digit Number"
  					returnKeyType='next'
  					err={isInvalidEmailCode || "" || error.code}
  					label='Enter your code'
  					style={styles.marginTop30}/>
  			</View>
  			<View style={styles.marginBottom30}>
					{seconds > 0 ?
  					<Text style={[styles.txtGetHelpContainer, {color: Color.Standard2}]}>
							You may resend code in {
  							(seconds > 1) ?
  								`${seconds} seconds` :
  								`${seconds} second`
  						}
  					</Text> :
  				<Text style={[styles.txtGetHelpContainer]}>
								Didn't get the code?
  					<Text  suppressHighlighting
  						onPress={this._handleSendMobileCode}
  						style={styles.txtHelp}> Resend Code.</Text>
  				</Text>}
  				<Button
  					onPress={this._proceed}
  					style={styles.btnStyle2}
  					loading={proceedButtonIsLoading}
  					label="Submit"/>
  				<Button
  					onPress={this._backEmailForm}
  					style={styles.btnStyle3}
  					labelStyle={styles.btnLabelStyle}
  					label="Back"/>
  			</View>
  		</View>
  	);
	}
}
MobileCodeEmail.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
