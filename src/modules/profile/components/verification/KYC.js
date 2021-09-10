/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-len */
/* eslint-disable no-negated-condition */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TextInput, Image, Dimensions} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import {Icon, CheckBox} from "react-native-elements";
import DatePicker from "__src/components/datepicker";
import Button from "__src/components/Button";
import styles from "../../styles.css";
import Dropdown from "__src/components/Dropdown";
import worldCountries from "world-countries";
import moment from "moment";
import validator from "validator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const newCountries = _.orderBy(worldCountries, ["name.common"], ["asc"]);
const {Res, Color} = Resource;
const {width} = Dimensions.get("window");
const gender = ["MALE", "FEMALE"];

export default class KYC extends PureComponent{
	constructor(props){
		super(props);
		const { login: { additionalDetails } } = props;
		const individual = _.has(additionalDetails, "individual") ? additionalDetails.individual : {};

		this.state = {
			currentAddressCheckbox: true,
			addr: false,
			pos: 0,
			pin: "",
			confirmPin: "",
			countries: newCountries,
			search: "",
			kycInputs: {
				streetAddress: this.returnEmpty(individual.streetAddress),
				barangay: this.returnEmpty(individual.barangay),
				city: this.returnEmpty(individual.city),
				country: individual.country ?
					this.returnEmpty(individual.country) : undefined,
				province: this.returnEmpty(individual.province),
				birthDate: individual.birthDate ?
					this.returnEmpty(individual.birthDate) : undefined,
				primaryCurrency: "Php",
				nationality: "Filipino",
				message: "Test",
			},
			kycInputsCurrent: {
				currentAddress: "",
				currentBarangay: "",
				currentCity: "",
				currentCountry: undefined,
				currentZipCode: "",
				currentProvince: "",
			},
			error: {},
		};
	}

	componentDidMount(){
		const {actions} = this.props;

		actions.setKYCsteps("step1");
	}

	returnEmpty = (value) => {
		if (_.isEmpty(value) || value === null){
			return "";
		}
		
		return value;
	}

  renderDone =() => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
  			<Text style={styles.txtalright}>Alright!</Text>
  			<Text style={styles.txtsuccess}>KYC Successfully Submitted</Text>
  		</View>
  		<View style={styles.marb20}>
  			<Button
  				onPress={() => this._handleCurrentStep("idAndSelfie")}
  				style={styles.btnStyle2}
  				label="Next"/>
  		</View>
  	</View>
  );

  handleInputChange = (type) => (value) => {
  	const { kycInputs } = this.state;
  	const error1 = {}, newInput = { ...kycInputs };

  	if (_.isEmpty(value)) {
  		error1[type] = " ";
  	} else {
  		delete error1[type];
  	}

  	if (type === "birthDate"){
  		newInput[type] = value;
  	} else {
  		newInput[type] = _.isObject(value) ? value.name.common : value;
  	}

  	this.setState({
  		error: { ...error1 },
  		kycInputs: { ...newInput },
  	});
  }
	
	handleInputChange2 = (type) => (value) => {
		const { kycInputsCurrent } = this.state;
		const error1 = {}, newInput = { ...kycInputsCurrent };

		if (_.isEmpty(value)) {
			error1[type] = " ";
		} else {
			delete error1[type];
		}

  	newInput[type] = _.isObject(value) ? value.name.common : value;

		this.setState({
			error: { ...error1 },
			kycInputsCurrent: { ...newInput },
		});
	}
	
	renderBase(value) {
		const {error} = this.state;
		const err = error.gender || error.country || error.currentCountry || error.maritalStatus ? {borderBottomColor: "red"} : null;

  	return (
  		<View style={[styles.renderBase, err]}>
  			<Text style={styles.input}>
  				{value}
  			</Text>
  			<Icon name='arrow-drop-down' color="black" size={27} />
  		</View>
  	);
	}
	
	renderRow(rowData, rowID, highlighted) {
		const data = _.isObject(rowData) ? rowData.name.common : rowData;

  	return (
  		<View style={styles.renderRow}>
  			<Text style={[styles.renderRowTxt,
  				highlighted && {color: Color.black} ]}>
  				{data}
  			</Text>
  		</View>
  	);
	}

	_next =(step) => {
		const { actions, login: {session} } = this.props;
		const { kycInputs, pin, confirmPin } = this.state;
		const error = {};

		switch (step){
			case "step2":
				if (_.isEmpty(_.toString(kycInputs.gender))){
					error.gender = " ";
				}else if (_.isEmpty(_.toString(kycInputs.birthDate))){
					error.birthDate = " ";
				}else if (_.isEmpty(_.toString(kycInputs.birthPlace))){
					error.birthPlace = " ";
				}
	
				this.setState({error});
	
				if (_.isEmpty(error)){
					actions.setKYCsteps(step);
				}
				break;
			case "step3":
				if (_.isEmpty(kycInputs.nationality)){
					error.nationality = " ";
				} else if (_.isEmpty(kycInputs.streetAddress)){
					error.streetAddress = " ";
				} else if (_.isEmpty(kycInputs.barangay)){
					error.barangay = " ";
				} else if (_.isEmpty(kycInputs.province)){
					error.province = " ";
				} else if (_.isEmpty(kycInputs.city)){
					error.city = " ";
				} else if (_.isEmpty(kycInputs.country)){
					error.country = " ";
				} 

			this.setState({error});

			if (_.isEmpty(error)){
				actions.setKYCsteps(step);
			}
			break;
			case "final":
				if (_.isEmpty(pin)){
					error.pin = "Pin is required.";
				} else if (pin.length !== 6){
					error.pin = "Pin must be 6 digit.";
				} else if (_.isEmpty(confirmPin)){
					error.confirmPin = "This field is required.";
				} else if(!_.isEqual(pin, confirmPin)){
					error.confirmPin = "Transaction pin does not match.";
				}

			this.setState({error});

			if (_.isEmpty(error)){
				const individualInfo = {
					...kycInputs
				}
				actions.submitKycForm({individualInfo, pin, confirmPin}, session.token);
			}
			break;
		}
	}

  _step1 = () => {
		const {kycInputs, error} = this.state;
		const {login: {additionalDetails}} = this.props;
		const individual = _.has(additionalDetails, "individual") ? additionalDetails.individual : {};

  	return (
  		<KeyboardAwareScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}  style={styles.flex1}>
  			<TxtInput
  				value={this.returnEmpty(individual.firstName)}
					isText
					style3={{borderBottomWidth: 0}}
  				label='First Name' />

  			<TxtInput
  				value={this.returnEmpty(individual.lastName)}
					isText
					style3={{borderBottomWidth: 0}}
  				label='Last Name'
  				style={styles.marginTop15} />

  			<TxtInput
					value={this.returnEmpty(individual.middleName)}
					isText
					style3={{borderBottomWidth: 0}}
  				label='Middle Name'
  				style={styles.marginTop15} />

				<View style={styles.marginTop15}>
  				<Text style={[styles.labelStyle, error.gender ? {color: "red"} : null ]}>Gender</Text>
  				<Dropdown
  					animated={false}
  					showsVerticalScrollIndicator={false}
  					renderBase={this.renderBase.bind(this, kycInputs.gender)}
  					dropdownStyle={styles.dropdownStyle}
  					options={gender}
  					renderButtonText={this.handleInputChange("gender")}
  					renderRow={this.renderRow.bind(this)}
  					renderSeparator={null} />
  					{error.gender ? <Text style={styles.errStyle}>{error.gender}</Text> : null}
				</View>

  			<View style={styles.marginTop15}>
  				<DatePicker
  					date={kycInputs.birthDate}
  					mode="date"
  					label='Date of Birth'
  					compName="Date"
  					format="MM/DD/YYYY"
  					maxDate={moment().format("MM/DD/YYYY")}
  					err={error.birthDate}
  					onDateChange={this.handleInputChange("birthDate")}
  					/>
  			</View>
				<TxtInput
  				onChangeText={this.handleInputChange("birthPlace")}
  				onFocus={() => this.setState({fbp: true})}
  				onBlur={() => this.setState({fbp: false})}
  				isFocus={this.state.fbp}
  				value={kycInputs.birthPlace}
  				returnKeyType='next'
  				err={error.birthPlace}
  				label='Birth Place'
  				style={styles.marginTop15} />
				
  			<View style={styles.marginVer65}>
  				<Button
  					onPress={() => this._next("step2")}
  					style={styles.btnStyle2}
  					label="Next"/>
  			</View>
  		</KeyboardAwareScrollView>
  	);
  }
	
	_step2 = () => {
  	const {kycInputs, error} = this.state;
		const {actions} = this.props;
		const countrystyle = {width: "100%", marginRight: 20};
		
  	return (
  		<KeyboardAwareScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={styles.flex1}>
  			<Text style={styles.txtlabel}>Permanent Address</Text>
				<TxtInput
  				onChangeText={this.handleInputChange("nationality")}
  				onFocus={() => this.setState({fnationality: true})}
  				onBlur={() => this.setState({fnationality: false})}
  				isFocus={this.state.fnationality}
  				value={kycInputs.nationality}
  				returnKeyType='next'
  				err={error.nationality}
  				label='Nationality'
  				style={styles.marginTop15} />
				<TxtInput
  				onChangeText={this.handleInputChange("streetAddress")}
  				onFocus={() => this.setState({addr: true})}
					onBlur={() => this.setState({addr: false})}
					isFocus={this.state.addr}
					multiline
					style3={styles.style3}
					style={styles.marginTop15}
  				value={kycInputs.streetAddress}
  				returnKeyType='next'
  				err={error.streetAddress}
					label='Address'
					placeholder="House #, Building and Sreet Name" />

  			<TxtInput
  				onChangeText={this.handleInputChange("barangay")}
  				onFocus={() => this.setState({fbrgy: true})}
  				onBlur={() => this.setState({fbrgy: false})}
  				isFocus={this.state.fbrgy}
  				value={kycInputs.barangay}
  				returnKeyType='next'
  				err={error.barangay}
  				label='Barangay'
  				style={styles.marginTop15} />

  			<TxtInput
  				onChangeText={this.handleInputChange("province")}
  				onFocus={() => this.setState({fprovince: true})}
  				onBlur={() => this.setState({fprovince: false})}
  				isFocus={this.state.fprovince}
  				value={kycInputs.province}
  				returnKeyType='next'
  				err={error.province}
  				label='Province'
  				style={styles.marginTop15} />

  			<TxtInput
  				onChangeText={this.handleInputChange("city")}
  				onFocus={() => this.setState({fcity: true})}
  				onBlur={() => this.setState({fcity: false})}
  				isFocus={this.state.fcity}
  				value={kycInputs.city}
  				returnKeyType='next'
  				err={error.city}
  				label='City/Municipal'
  				style={styles.marginTop15} />

  			<View style={styles.rowmarginTop15}>
					<View style={countrystyle}>
						<Text style={[styles.labelStyle, error.country ? {color: "red"} : null ]}>Country</Text>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase.bind(this, kycInputs.country)}
							dropdownStyle={styles.dropdownStyle2}
							options={this.state.countries}
							renderSearch={this.renderSearch}
							renderButtonText={this.handleInputChange("country")}
							renderRow={this.renderRow.bind(this)}
							renderSeparator={null} />
						{error.country ? <Text style={styles.errStyle}>{error.country}</Text> : null}
  				</View>
  			</View>
				
				<View style={styles.marginVer65}>
  				<Button
  					onPress={() => this._next("step3")}
						style={styles.btnStyle2}
  					label="Next"/>
  				<Button
  					onPress={() => actions.setKYCsteps("step1")}
  					style={styles.btnStyle3}
  					labelStyle={styles.btnLabelStyle}
  					label="Back"/>
  			</View>
  		</KeyboardAwareScrollView>
  	);
	}

	_step3 = () => {
  	const {pin, confirmPin, error} = this.state;
		const {actions, profile: {isSubmittingKyc}} = this.props;
		
  	return (
  		<KeyboardAwareScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={styles.flex1}>
  			<Text style={styles.txtlabel}>Create your transaction pin</Text>
				<TxtInput
  				onChangeText={(e) => this.setState({pin: e})}
  				onFocus={() => this.setState({fpin: true})}
  				onBlur={() => this.setState({fpin: false})}
  				isFocus={this.state.fpin}
  				value={pin}
					returnKeyType='next'
					keyboardType="phone-pad"
					maxLength={6}
  				err={error.pin}
  				label='Transaction pin'
  				style={styles.marginTop15} />

  			<TxtInput
  				onChangeText={(e) => this.setState({confirmPin: e})}
  				onFocus={() => this.setState({confPin: true})}
  				onBlur={() => this.setState({confPin: false})}
  				isFocus={this.state.confPin}
  				value={confirmPin}
					keyboardType="phone-pad"
					maxLength={6}
  				returnKeyType='next'
  				err={error.confirmPin}
  				label='Confirm transaction pin'
  				style={styles.marginTop15} />
				
				<View style={styles.marginVer65}>
  				<Button
  					onPress={() => this._next("final")}
						style={styles.btnStyle2}
						loading={isSubmittingKyc}
  					label="Submit"/>
  				<Button
  					onPress={() => actions.setKYCsteps("step2")}
  					style={styles.btnStyle3}
  					labelStyle={styles.btnLabelStyle}
  					label="Back"/>
  			</View>
  		</KeyboardAwareScrollView>
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

  
	_handleCurrentStep = (step) => {
		const { actions } = this.props;

		if (_.isEmpty(step)) {
			this._handleSubmitKycForm();
		} else {
			actions.changeCurrentStep(step);
		}
	}

	_handleSubmitKycForm = () => {
		const { actions, login: { additionalDetails } } = this.props;
		const { kycInputs, kycInputsCurrent, currentAddressCheckbox } = this.state;
		const formLabels1 = [
			"email",
			"nationality",
		];
		const error1 = {};

		_.map(formLabels1, (v) => {
			if (_.isEmpty(kycInputs[v])) {
				error1[v] = " ";
			}

			if (!_.isEmpty(kycInputs[v])){
				if (v === "email" && !validator.isEmail(kycInputs[v])){
					error1[v] = "Invalid email streetAddress.";
				} else if (v === "motherFirstName" && !validator.isAlpha(kycInputs[v])){
					error1[v] = "This field should accept alpha character only.";
				} else if (v === "motherLastName" && !validator.isAlpha(kycInputs[v])){
					error1[v] = "This field should accept alpha character only.";
				} else if (v === "motherMiddleName" && !validator.isAlpha(kycInputs[v])){
					error1[v] = "This field should accept alpha character only.";
				}
			}
		});

		if (_.isEmpty(error1)) {
			actions.submitKycForm(
				kycInputs, kycInputsCurrent, additionalDetails.client.id, !currentAddressCheckbox);
		}
		console.log("Error", error1);

		this.setState({ error: { ...error1 } });
	}

  _renderSteps =() => {
  	const {profile: {getKYCsteps}} = this.props;

  	switch (getKYCsteps){
  	case "step1":
  		return this._step1();
  	case "step2":
  		return this._step2();
  	case "step3":
  		return this._step3();
  	default:
  		return this._step1();
  	}
  }
	
  render(){
  	const {profile: {doneSubmittingKyc }} = this.props;

  	if (doneSubmittingKyc){
  		return (
  			<View style={styles.flex1}>
  				{this.renderDone()}
  			</View>
  		);
  	}
		
  	return (
  		<View style={styles.flex1mar30pad30}>
  			{this._renderSteps()}
  		</View>
  	);
  }
}

KYC.propTypes = {
	actions: PropTypes.object,
	profile: PropTypes.object,
	login: PropTypes.object,
};

