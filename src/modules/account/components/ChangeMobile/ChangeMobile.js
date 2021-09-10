// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TextInput, ScrollView, SafeAreaView} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import _ from "lodash";
import validator from "validator";
import ConfirmPhone from "./ConfirmPhone";
import CodePhone from "./CodePhone";
import ConfirmEmail from "./ConfirmEmail";
import CodeEmail from "./CodeEmail";
import worldCountries from "world-countries";
import Loading from "__src/components/Loading";
import Dropdown from "__src/components/Dropdown";
import {Icon} from "react-native-elements";
import Resource from "__src/resources";
const {Color} = Resource;

export default class ChangeMobile extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			error: {},
		};
	}
	
	componentDidMount(){
		const { actions } = this.props;

		actions.resetNewPhoneData();
		actions.resetPasswordState();
		actions.setPhoneScreen("phoneForm");
	}

	componentDidUpdate(prevProp){
		const { account, actions } = this.props;
		const { correctMobilePass, isPhoneNumberAvailable, isPhoneNumberNotAvailable } = account;

		if (isPhoneNumberNotAvailable !== prevProp.account.isPhoneNumberNotAvailable &&
			isPhoneNumberNotAvailable){
			this.setState({error: {newMobile: "Mobille is not available"}});
		}
		if (correctMobilePass && isPhoneNumberAvailable){
			actions.proceedToNextStep();
		}
	}

	_onChange = (type) => (value) => {
		const { account, actions } = this.props;
		const { changeMobileInput } = account;
		const { error } = this.state;
		const newInput = _.merge({}, changeMobileInput);

		switch (type){
		case "countryCode":
			if (_.isEmpty(value)) {
				error.countryCode = "Country code is required";
			} else {
				delete error.countryCode;
			}
			const country = _.find(worldCountries, (data) => {
				if (data.ccn3 === value.ccn3){
					return data;
				}
			});

			newInput.countryCode = _.isEmpty(country.callingCode) ? "" : `+${country.callingCode[0]}`;
			newInput.countryCodeDisplay = `${country.name.common} (${newInput.countryCode})`;

			break;
		case "newMobile":
			if (_.isEmpty(value)) {
				error.newMobile = "New mobile number is required";
			} else {
				delete error.newMobile;
			}

			newInput.newMobile = value;
			break;
		case "password":
			if (_.isEmpty(value)) {
				error.password = "Password is required";
			} else {
				delete error.password;
			}
			newInput.password = value;
			break;
		default:
			break;
		}

		actions.setMobileInput(newInput);
	};

	verifyEmail = () => {
		const { actions, account: {changeEmailInput} } = this.props;
		const error = {};
		const userEmail = this.props.account.changeEmailInput.newEmail;
		const emailInput = this.props.login.getAccountInfos.email;

		this.setState({fnewE: false});

		if (_.isEmpty(changeEmailInput.newEmail)){
			error.newEmail = "New email is required";
		} else if (!validator.isEmail(changeEmailInput.newEmail)){
			error.newEmail = "Invalid Email";
		} else if (userEmail === emailInput){
			error.newEmail = "Enter Your New Email";
		}

		if (validator.isEmail(changeEmailInput.newEmail) && _.isEmpty(error)){
			actions.validateNewEmail(changeEmailInput.newEmail);

		}

		this.setState({
			error,
		});
	}

	_renderRow( rowData, rowID, highlighted) {
		return (
			<View style={[styles.dropdownRow,
				highlighted && {backgroundColor: Color.LightBlue}]}>
				<Text style={[styles.dropdownRowText,
					highlighted && styles.dropdownRowText2]}>
					{`${rowData.name.common} (+${rowData.callingCode[0]})`}
				</Text>
			</View>
		);
	}

	_renderBase() {
		const {account: {changeMobileInput}} = this.props;

		return (
			<View style={[styles.views_bi3]}>
				<Text
					style={styles.textfields}
					underlineColorAndroid="transparent">{changeMobileInput.countryCodeDisplay}</Text>
				<Icon style={styles.icon} type='font-awesome' name='caret-down' size={25} color={Color.DarkBG} />
			</View>
		);
	}

	verifyPhoneNumber = (newMobile) => {
		const { actions, account } = this.props;
		const {changeMobileInput} = account;
		const numbersonly = /^[0-9]*$/;

		if (!_.isEqual("+63", newMobile)) {
			if (!_.isEmpty(newMobile) && numbersonly.test(changeMobileInput.newMobile)){
				actions.validateNewPhone(newMobile);
			}
		}
	}

	_renderComponent(){
		const {isValidatingPhone, isPhoneNumberAvailable,
			isPhoneNumberNotAvailable} = this.props.account;

		if (isValidatingPhone){
			return (
				<View style={styles.load}>
					<Loading size="small" />
				</View>);
		} else if (isPhoneNumberAvailable){
			return (
				<Icon
					name='check'
					type='evilicon'
					color='#2C932C'
					size={27}
				/>
			);
		} else if (isPhoneNumberNotAvailable){
			return (
				<Icon
					name='close-o'
					type='evilicon'
					color="red"
					size={27}
				/>
			);
		}
		
		return null;
	}

	_proceedConfirm = () => {
		const {  account, actions, login } = this.props;
		const { changeMobileInput, checkingMobilePassword,
			isValidatingPhone } = account;
		const error = {...this.state.error};


		if (_.isEmpty(changeMobileInput.password)){
			error.password = "Password is required";
		}

		if (_.isEmpty(changeMobileInput.newMobile)){
			error.newMobile = "New Mobile Number is required";
		}

		if (_.isEmpty(error)){
			if (!checkingMobilePassword && !isValidatingPhone) {
				actions.checkPassword(changeMobileInput.password, login.session.userId, "changePhone");
			}
		} else {
			this.setState({
				error,
			});
		}
	}

	_renderPhoneInputs() {
		const {error, showPass} = this.state;
		const { navigation, login, account } = this.props;
		const { checkingMobilePassword, changeMobileInput} = account;
		const newMobileValue = `${changeMobileInput.countryCode}${changeMobileInput.newMobile}`;
		
		return (
			<View style={styles.flex1marT30padH30}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
					<Text style={styles.title}>Change Mobile</Text>
					<Text style={styles.subtitle}>
					Confirm your mobile number helps you reset your password{ }
					if you ever need to get SMS updates and more. Only you will see your number.
					</Text>

					<TxtInput
						value={login.session.user.mobile}
						label='Currenct Number'
						isText
						style={styles.marginTo20}
						inputStyles={styles.inputStyles}
						style3={styles.borderWidth0}/>

					<View style={styles.marginTo20}>
						<Text style={styles.labelStyle}>COUNTRY</Text>
						<View style={styles.flex1}>
							<Dropdown
								animated={false}
								renderBase={this._renderBase.bind(this)}
								dropdownStyle={styles.dropdownstyle}
								options={worldCountries}
								renderButtonText={this._onChange("countryCode")}
								renderRow={this._renderRow.bind(this)}
								renderSeparator={null} />
						</View>
					</View>

					<View style={styles.marginTo20}>
						<Text style={styles.labelStyle}>PHONE NUMBER</Text>
						<View style={[styles.views_bi3]}>
							<View style={styles.viewPhonecode}>
								<Text style={styles.txtcountrycode}>{
									`${changeMobileInput.countryCode}`}
								</Text>
							</View>
							<TextInput
								autoCorrect={false}
								autoCapitalize="none"
								placeholder="917xxxx"
								keyboardType="phone-pad"
								style={styles.textfields}
								onBlur={() => this.verifyPhoneNumber(newMobileValue)}
								underlineColorAndroid="transparent"
								value={changeMobileInput.newMobile}
								returnKeyType='done'
								onChangeText={this._onChange("newMobile")}/>
							{this._renderComponent()}
						</View>
						{error.newMobile ?
							<Text style={styles.errStyle}>{error.newMobile}</Text> : null}
					</View>

					<TxtInput
						onChangeText={this._onChange("password")}
						value={changeMobileInput.password}
						onFocus={() => this.setState({fpass: true})}
						onBlur={() => this.setState({fpass: false})}
						isFocus={this.state.fpass}
						autoCapitalize="none"
						returnKeyType='next'
						err={error.password}
						label='Password'
						style={styles.marginTo20}
						compName="Password"
						secureTextEntry={showPass}
						onPass={() => this.setState({showPass: !this.state.showPass})} />

					
				</ScrollView>

				<View style={styles.marginBottom10}>
					<Button
						onPress={this._proceedConfirm}
						style={styles.btnStyle2}
						loading={checkingMobilePassword}
						label="Save"/>
					<Button
						onPress={() => navigation.goBack()}
						style={styles.btnStyle3}
						labelStyle={styles.btnLabelStyle}
						label="Cancel"/>
  			</View>
				
			</View>
		);
	}

	_renderChildren = () => {
		const { account: {phoneScreen} } = this.props;

		switch (phoneScreen) {
		case "confirmEmailPhone":
			return this._renderConfirmEmail();
		case "emailCodeForm":
			return this._renderCodeEmail();
		case "confirmPhone":
			return this._renderConfirmPhone();
		case "codeForm":
			return this._renderCodeForm();
		case "phoneForm":
		default:
			return this._renderPhoneInputs();
		}
	}

	_renderCodeEmail = () => (
		<CodeEmail {...this.props} />
	);

	_renderCodeForm = () => (
		<CodePhone {...this.props} />
	);

	_renderConfirmEmail = () => (
		<ConfirmEmail {...this.props} />
	);

	_renderConfirmPhone = () => (
		<ConfirmPhone {...this.props}/>
	);

	render(){
		return (
			<View style={styles.flex1}>
				{this._renderChildren()}
				<SafeAreaView />
			</View>
		);
	}
}
ChangeMobile.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
