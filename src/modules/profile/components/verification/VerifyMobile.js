
import React, {PureComponent} from "react";
import {View, Text, Image, TextInput} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import {Icon} from "react-native-elements";
import Dropdown from "__src/components/Dropdown";
import worldCountries from "world-countries";
import Button from "__src/components/Button";
import styles from "__src/modules/profile/styles.css";
const {Res, Color} = Resource;
const newCountries = _.orderBy(worldCountries, ["name.common"], ["asc"]);

export default class VerifyMobile extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			otpFocus: false, otp: "", otpErr: "",
			error: {}, seconds: 60,
			mobileno: "", mobileCallingCode: "63",
			flag: "PHP", countries: newCountries,
		};
	}
	
	renderDone = () => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
  			<Text style={styles.txtalright}>Success!</Text>
  			<Text style={styles.txtsuccess}>Mobile Number Verified!</Text>
  		</View>
			<View style={styles.marb20}>
				<Button
					onPress={this._handleCurrentStep}
					style={styles.btnStyle2}
					label="Next"/>
			</View>
  	</View>
	);

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
	
	renderInput =() => {
		const {seconds} = this.state;
		const {profile: {isSendingMobileCode, isVerifyingMobile, failVerifyingMobile}} = this.props;

		return (
			<View style={styles.flex1mar30pad30}>
  		<Text style={styles.txtmobile}>Enter your code</Text>
				<Text style={styles.txtcodesend}>Code was sent to your mobile number.</Text>
				<TxtInput
					onFocus={() => this.setState({otpFocus: true})}
					onBlur={() => this.setState({otpFocus: false})}
					isFocus={this.state.otpFocus}
					round
					placeholder="Enter the 4-digit number"
					onChangeText={(e) => this.setState({otp: e})}
					value={this.state.otp}
					returnKeyType='done'
					err={failVerifyingMobile ? "Invalid code" : "" || this.state.otpErr} />

				{seconds > 0 ?
					<Text style={[styles.txtdidntgetcode]}>
						You may resend code in {
							(seconds > 1) ?
								`${seconds} seconds` :
								`${seconds} second`
						}
					</Text> :
					<Text style={styles.txtdidntgetcode}>
						Didn't get the code?
						<Text suppressHighlighting
							onPress={this._handleSendMobileCode}
							style={styles.txtresend}> Resend Code.</Text>
					</Text>}

				<Button onPress={this._handleVerifyMobile}
					loading={isSendingMobileCode || isVerifyingMobile}
					style={styles.btnStyle} label="Verify"/>
  	</View>
		);
	}

	_handleVerifyMobile = () => {
		const { actions, login: { session }  } = this.props;
		const {mobileCallingCode, mobileno, otp} = this.state;
		let otpErr = "";

		if (_.isEmpty(otp)) {
			otpErr = "Verification Code is required";
		} else {
			const params = {
				mobile: `${mobileCallingCode}${mobileno}`,
				code: otp,
			};
			actions.verifyMobile(params, session.token);
		}

		this.setState({otpErr});
	}

	_handleSendMobileCode = () => {
		const { actions, login: { session } } = this.props;
		const {mobileCallingCode, mobileno} = this.state;
		const error = {};
		
		if (_.isEmpty(this.state.mobileno)){
			error.mobileno = "This field is required.";
		}

		this.setState({ error });

		if (_.isEmpty(error)){
			this.setState({ seconds: 60 });
			this.countDown();
			actions.sendMobileCode({mobile: `${mobileCallingCode}${mobileno}`}, session.token);
		}
	}

  _handleCurrentStep = () => {
  	const { actions } = this.props;

  	actions.changeCurrentStep("idAndSelfie");
  }
	
	_renderBase = () => {
		const {mobileCallingCode, flag} = this.state;

		return (
			<View style={styles.btnCountry}>
				<Image style={styles.imgCountry} source={Res.get(flag)}/>
				<Text style={styles.txtCountryCalling}>+{mobileCallingCode}</Text>
				<Icon name="chevron-down" type="evilicon" size={20}/>
			</View>
		);
	}

	_renderRow( rowData, rowID, highlighted) {
		return (
			<View style={[styles.dropdownRow,
				highlighted && {backgroundColor: Color.LightBlue}]}>
				<Text style={[styles.dropdownRowText,
					highlighted && styles.dropdownRowText2]}>
					{`+(${rowData.callingCode}) ${rowData.name.common}`}
				</Text>
			</View>
		);
	}

	renderSearch = () => {
		return (
			<View style={styles.renderSearch}>
				<TextInput style={styles.input}
					onChangeText={this.onSearch}
					value={this.state.search}
					placeholder="Search country..."/>
			</View>
		);
	}

	onSearch = (value) => {
		let data;

		if (_.isEmpty(value)){
			data = newCountries;
		} else {
			data = _.filter(newCountries, (item) => {
				return item.name.common.startsWith(value);
			});
		}

		this.setState({countries: data, search: value});
	}
	
	onChangeText = (type) => (val) => {
		if (type === "mobileno"){
			this.setState({mobileno: val, error: {}});
		} else if (type === "country"){
			const flag = _.toString(val.currency);
			const mobileCallingCode = _.toString(val.callingCode);

			this.setState({flag, mobileCallingCode, error: {}});
		}
	}

	render(){
		const {profile: {isSendingMobileCode, doneSendingMobileCode,
			doneVerifyingMobile }} = this.props;
		const {error, mobileno} = this.state;
		const errStyle = error.mobileno ? {borderColor: Color.red} : null;

  	if (doneVerifyingMobile){
  		return (
  			<View style={styles.flex1}>
  				{this.renderDone()}
  			</View>
  		);
  	}
		
  	if (doneSendingMobileCode){
  		return (
  			<View style={styles.flex1}>
  				{this.renderInput()}
  			</View>
  		);
  	}
  	
  	return (
  		<View style={styles.flex1mar30pad30}>
  			<Text style={styles.txtmobile}>Mobile Number</Text>
				<View style={[styles.viewMobile, errStyle]}>
					<Dropdown
						animated={false}
						frameWidth={{width: 200}}
						renderSearch={this.renderSearch}
						renderBase={this._renderBase.bind(this)}
						dropdownStyle={styles.dropdownstyle}
						options={this.state.countries}
						renderButtonText={this.onChangeText("country")}
						renderRow={this._renderRow.bind(this)}
						renderSeparator={null} />
					<TextInput style={styles.inputStyles} placeholder="Enter here..."
						onChangeText={this.onChangeText("mobileno")} value={mobileno}/>
				</View>

  			<Button
  				onPress={this._handleSendMobileCode}
  				loading={isSendingMobileCode}
  				style={styles.btnStyle}
  				label="Verify"/>
  		</View>
  	);
	}
}

VerifyMobile.propTypes = {
	actions: PropTypes.object,
	profile: PropTypes.object,
	login: PropTypes.object,
};

