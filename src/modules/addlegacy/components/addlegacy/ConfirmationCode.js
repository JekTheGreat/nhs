/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text, Image, ScrollView} from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import Resource from "__src/resources";
import TxtInput from "__src/components/TxtInput";
import styles from "../../styles.css";
const {Color, Res} = Resource;

class ConfirmationCode extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			errorCode: "",
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
	
  componentWillUnmount(){
  	clearInterval(this.interval);
  }

  renderError = () => {
  	const {errorCode} = this.state;
  	const {addlegacy: {isVerifyCodeFailed}} = this.props;
  	const error2 = isVerifyCodeFailed ? "Invalid code. Try again" : "";

  	if (!_.isEmpty(errorCode) || !_.isEmpty(error2)){
  		return (
  			<View style={[styles.inpuView1, styles.marB10]}>
  				<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
  					{error2 || errorCode}</Text>
  			</View>
  		);
  	}
		
  	return null;
  }

  render() {
  	const {seconds} = this.state;
  	const { addlegacy: {getVerificationCode} } = this.props;

  	return (
  		<ScrollView showsVerticalScrollIndicator={false}
  			keyboardShouldPersistTaps="handled" style={styles.flex1}>
  			<Text style={[styles.txt1, {color: Color.Standard2}]}>Confirmation Code</Text>
  			<View style={[styles.top, styles.marT20]}>
  				<Image style={styles.imgicon} source={Res.get("email_icon")} resizeMode={"contain"} />
  			</View>

  			<View style={[styles.bottom, styles.marT20]}>
  				<Text style={[styles.textContent1]}>
              Check your registered mobile for OTP{"\n"}
              (One Time Password)
  				</Text>
  				<TxtInput
  					onChangeText={this._handleSaveCode}
  					value={getVerificationCode}
  					inputStyles={styles.inputStyles}
  					onFocus={() => this.setState({unFocus: true})}
  					isFocus={this.state.unFocus}
  					returnKeyType='done'
  					style={styles.marT10} />

  				<Text style={styles.textContent3}>Please check your mobile number. if you still haven't received confirmation code, you can request another.</Text>

  				{seconds > 0 ?
  					<Text style={[styles.textContent4, styles.marB10]}>
              00:{
  							(seconds > 1) ?
  								`${seconds} seconds` :
  								`${seconds} second`
  						}
  					</Text> :
  					<Text style={[styles.textContent4, styles.marB10]}>
              Didn't get the code?
  						<Text  suppressHighlighting
  							onPress={this.handleResendCode}
  							style={styles.textContent5}> Resend Code.</Text>
  					</Text>
  				}
  				{this.renderError()}
  			</View>
  		</ScrollView>
  	);
  }

  handleResendCode = () => {
  	const { actions, addlegacy: { regcodeCredentialsInput, getSearchRegcodeInput } } = this.props;

  	actions.resendCode(regcodeCredentialsInput, getSearchRegcodeInput);
  	this.setState({ seconds: 60 });
  	this.countDown();
  }
  
  _handleSaveCode = (value) => {
  	if (_.isEmpty(value)) {
  		this.setState({ errorCode: "Verification Code is required" });
  	} else {
  		this.setState({ errorCode: "" });
  	}

  	this.props.actions.saveVerificationCode(value);
  }

  onSubmit = () => {
  	const { actions, addlegacy: { getSearchRegcodeInput, getVerificationCode },
  		login: { additionalDetails: { client: { id } } } } = this.props;

  	if (_.isEmpty(getVerificationCode)) {
  		this.setState({ errorCode: "Verification Code is required" });
  	} else {
  		actions.verifyCode(getVerificationCode, getSearchRegcodeInput, id);
  	}
  }

}

ConfirmationCode.propTypes = {
	addlegacy: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
};


export default ConfirmationCode;
