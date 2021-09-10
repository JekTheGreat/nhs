/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-len */
/* eslint-disable no-negated-condition */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, Image, Dimensions, Alert, ScrollView} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import {Icon, CheckBox} from "react-native-elements";
import DatePicker from "__src/components/datepicker";
import Button from "__src/components/Button";
import styles from "../../styles.css";
import Dropdown from "__src/components/Dropdown";
import KeyboardDismiss from "__src/components/KeyboardDismiss";
import worldCountries from "world-countries";
import moment from "moment";
import validator from "validator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const {Res, Color} = Resource;
const {width} = Dimensions.get("window");
const gender = ["MALE", "FEMALE"];

export default class KYC extends PureComponent{
	constructor(props){
		super(props);
		const { register: { registerNewInput } } = props;

		this.state = {
			currentAddressCheckbox: true,
			pos: 0,
			kycInputs: {
				name: `${registerNewInput.lastName}, ${registerNewInput.firstName} ${registerNewInput.middleName}`,
				primaryCurrency: "Php",
				nationality: "Filipino",
				country: registerNewInput.country
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
  				onPress={() => this._handleCurrentStep("mobileVerification")}
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
		const { actions, register: {isRegistered}} = this.props;
		const { kycInputs } = this.state;
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
				const individualInfo = {
					...kycInputs
				}
				actions.submitKycForm({individualInfo}, isRegistered.token);
			}
			break;
		}
	}

  _step1 = () => {
		const {kycInputs, error} = this.state;
		const {register: {registerNewInput}} = this.props;

  	return (
			<KeyboardDismiss>
			<ScrollView keyboardShouldPersistTaps='handled' 
				showsVerticalScrollIndicator={false}  style={styles.flex1}>
  			<TxtInput
  				value={registerNewInput.firstName}
					isText
					style3={{borderBottomWidth: 0}}
  				label='First Name' />

  			<TxtInput
  				value={registerNewInput.lastName}
					isText
					style3={{borderBottomWidth: 0}}
  				label='Last Name'
  				style={styles.marginTop15} />

  			<TxtInput
					value={registerNewInput.middleName}
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
  		</ScrollView>
			</KeyboardDismiss>
  	);
  }
	
	_step2 = () => {
  	const {kycInputs, error} = this.state;
		const {actions, profile: {isSubmittingKyc}} = this.props;
		const countrystyle = {width: "100%", marginRight: 20};
		
  	return (
			<KeyboardDismiss>
  		<ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={styles.flex1}>
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
							options={worldCountries}
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
						loading={isSubmittingKyc}
  					label="Submit"/>
  				<Button
  					onPress={() => actions.setKYCsteps("step1")}
  					style={styles.btnStyle3}
  					labelStyle={styles.btnLabelStyle}
  					label="Back"/>
  			</View>
  		</ScrollView>
			</KeyboardDismiss>
  	);
	}
  
	_handleCurrentStep = (step) => {
		const { actions } = this.props;

		actions.currentStep(step);
	}

  _renderSteps =() => {
  	const {profile: {getKYCsteps}} = this.props;

  	switch (getKYCsteps){
  	case "step1":
  		return this._step1();
  	case "step2":
  		return this._step2();
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

