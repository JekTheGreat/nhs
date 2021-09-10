/* eslint-disable */
import React from "react";
import { View, SafeAreaView, ScrollView, Text, TextInput, Modal} from "react-native";
import styles from "../../../styles.css";
import Button from "__src/components/Button";
import TxtInput from "__src/components/TxtInput";
import Dropdown from "__src/components/Dropdown";
import DropDownItem from "__src/components/DropDownItem";
import DatePicker from "__src/components/datepicker";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";
import worldCountries from "world-countries";
import _ from "lodash";
import moment from "moment";
import Resources from "__src/resources";
import validator from "validator";
import * as Animatable from 'react-native-animatable';
const AnimatedScrollview = Animatable.createAnimatableComponent(ScrollView);
import { provinces } from 'psgc';

const {Color} = Resources;

class AddClient extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			inputDetails: {},
			error: {},
			step2: false,
			steps: "step1", countries: worldCountries,
			countriesBirth: worldCountries, PROVINCES: provinces.all() || [],
			MUNICIPALITIES: [],
		};
	}

	async componentDidUpdate(prevProps){
		const {remittance: {AddedClient, inputDetails}, actions, type} = this.props;

		if (prevProps.remittance.AddedClient !== AddedClient && !_.isEmpty(AddedClient)){
			if (AddedClient.S === 1 && AddedClient.type === "add"){
				const newInput = _.merge({}, inputDetails);
				const Sender = {...AddedClient.D};

				if (type === "fillupsender"){
					newInput.Sender = Sender;
					await actions.inputDetails(newInput);
					actions.setSelectedScreen(this.getScreen(+1));
				} else {
					newInput.Beneficiary = Sender;
					await actions.inputDetails(newInput);
					actions.setSelectedScreen(this.getScreen(+1));
				}
			} else if (AddedClient.S === 0){
				const error = {};
				error.added = AddedClient.M;
				this.setState({error});
			}
		}
	}

	getScreen = (num) => {
		const {remittance: { setSelectedScreen, selectProvider } } = this.props;
		const index = _.findIndex(selectProvider, {value: setSelectedScreen});

		return selectProvider[index + num].value;
	}

	onChangeText = (type) => (value) => {
		const {inputDetails} = this.state;
		const newInput = _.merge({}, inputDetails);
		const error = {};

		if (_.isEmpty(value)){
			if(type !== "suffix"){
				error[type] = "This field is required.";
			}
		}

		if (type === "phoneNumber"){
			if(inputDetails.prefix && value){
				const length = inputDetails.prefix.length;
				value = value.slice(length + 2);
			}
			newInput[type] = value;
		} else if (type === "country"){
			newInput[type] = value.name.common;
			newInput.prefix = value.callingCode[0];
			delete newInput.province;
			delete newInput.municipality;
		} else if (type === "province" && newInput.country === "Philippines"){
			newInput[type] = value.name;
			delete newInput.municipality;

			this.setState({MUNICIPALITIES: value.municipalities});
		} else {
			newInput[type] = _.isObject(value) ? value.name.common : value;
		}

		console.log("newInput", newInput);

		this.setState({inputDetails: newInput, error});
	}

  onPressBack = () => {
  	this.setState({step2: false});
  }
	
	renderError = () => {
		const {error} = this.state;
		
		if (!_.isEmpty(error)){
			return (
				<View style={[styles.inpuView1, styles.marB20]}>
					<Icon containerStyle={styles.iconContainerStyle}
						name='close-circle' type="material-community" color={Color.red} size={15} />
					<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
						{error.added}</Text>
				</View>
			);
		}
		
		return null;
	}

	onSearch = (value) => {
		let data;

		if (_.isEmpty(value)){
			data = worldCountries;
			if(this.state.steps === "step3"){
				this.setState({countries: data, search: value});
			} else {
				this.setState({countriesBirth: data, searchBirth: value});
			}
		} else {
			if(this.state.steps === "step3"){
				data = _.filter(worldCountries, (item) => {
					return item.name.common.startsWith(value);
				});
				this.setState({countries: data, search: value});
			} else {
				data = _.filter(worldCountries, (item) => {
					return item.name.common.startsWith(value);
				});
				this.setState({countriesBirth: data, searchBirth: value});
			}
		}
	}

	renderSearch = () => {
		return (
			<View style={styles.renderSearch}>
				<TextInput style={styles.input}
					onChangeText={this.onSearch}
					value={this.state.steps === "step3" ? this.state.search : this.state.searchBirth}
					placeholder="Search country..."/>
			</View>
		);
	}

	renderInput1(){
		const {error, inputDetails} = this.state;

		return (
				<Animatable.View animation="fadeInRight" style={styles.flex1}>
					<TxtInput
						value={inputDetails.firstName}
						label='First Name'
						placeholder="Ex. Juan"
						autoCapitalize="characters"
						keyboardType="default"
						style={styles.marT15}
						err={error.firstName}
						onChangeText={this.onChangeText("firstName")}/>

					<TxtInput
						value={inputDetails.middleName}
						label='Middle Name'
						placeholder="Ex. Villa"
						autoCapitalize="characters"
						style={styles.marT15}
						err={error.middleName}
						onChangeText={this.onChangeText("middleName")}/>

					<TxtInput
						value={inputDetails.lastName}
						label='Last Name'
						autoCapitalize="characters"
						placeholder="Ex. Dela Cruz"
						style={styles.marT15}
						err={error.lastName}
						onChangeText={this.onChangeText("lastName")}/>

					<TxtInput
						value={inputDetails.suffix}
						label='Suffix'
						placeholder="Ex. Jr"
						autoCapitalize="characters"
						style={styles.marT15}
						err={error.suffix}
						onChangeText={this.onChangeText("suffix")}/>
				</Animatable.View>
		);
	}
	
	renderInput2(){
  	const {error, inputDetails} = this.state;

  	return (
			<AnimatedScrollview animation="fadeInRight" style={styles.flex1}>
				<TxtInput
					value={inputDetails.email}
					label='Email'
					placeholder="Ex. juan@gmail.com"
					keyboardType="email-address"
					style={styles.marT15}
					err={error.email}
					onChangeText={this.onChangeText("email")}/>

				<View style={styles.marT15}>
					<DatePicker
						date={inputDetails.DoB}
						mode="date"
						placeholder="YYYY-MM-DD"
						label='Date of Birth'
						compName="Date"
						maxDate={moment().format("YYYY-MM-DD")}
						format="YYYY-MM-DD"
						err={error.DoB}
						onDateChange={this.onChangeText("DoB")}
					/>
				</View>

				<View style={styles.marT15}>
						<Text style={[styles.labelStyle]}>Gender</Text>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase.bind(this,
								inputDetails.gender)}
							dropdownStyle={styles.dropdownStyle2}
							options={["Male", "Female"]}
							renderButtonText={this.onChangeText("gender")}
							renderRow={this.renderRow.bind(this)}
							renderSeparator={null} />
						{error.gender ?
							<Text style={styles.errStyle}>{error.gender}</Text> : null}
				</View>
			</AnimatedScrollview>
  	);
	}

	renderInput3(){
		const {error, inputDetails, PROVINCES, MUNICIPALITIES, countries} = this.state;
		const callingCode = _.has(inputDetails, "prefix") ? 
			`+${inputDetails.prefix} ` : "";

  	return (
			<AnimatedScrollview animation="fadeInRight" style={styles.flex1}>
				<View style={styles.marT15}>
					<Text style={[styles.labelStyle]}>Country</Text>
					<Dropdown
						animated={false}
						showsVerticalScrollIndicator={false}
						renderSearch={this.renderSearch}
						renderBase={this.renderBase.bind(this,inputDetails.country)}
						dropdownStyle={styles.dropDownStyle}
						options={countries}
						renderButtonText={this.onChangeText("country")}
						renderRow={this.renderRow.bind(this)}
						renderSeparator={null} />
						{error.country ? <Text style={styles.errStyle}>{error.country}</Text> : null}
				</View>

				<TxtInput
					value={`${callingCode}${inputDetails.phoneNumber || ""}`}
					label='Mobile Number'
					placeholder="0917xxx"
					keyboardType="phone-pad"
					style={styles.marT15}
					err={error.phoneNumber}
					onChangeText={this.onChangeText("phoneNumber")}/>

				<TxtInput
					onChangeText={this.onChangeText("address")}
					multiline
					style3={styles.style3}
					style={styles.marT15}
					autoCapitalize="characters"
					placeholder='House #, Building and Sreet Name'
					label="Current Address"
					autoCapitalize="characters"
					value={inputDetails.address}
					err={error.address}	/>

				<View style={styles.marT15}>
					<Text style={[styles.labelStyle]}>Province / State</Text>
					<Dropdown
						animated={false}
						showsVerticalScrollIndicator={false}
						renderBase={this.renderBaseCountry.bind(this,inputDetails.province, "province")}
						dropdownStyle={styles.dropDownStyle}
						disabled={inputDetails.country !== "Philippines"}
						options={PROVINCES}
						renderButtonText={this.onChangeText("province")}
						renderRow={this.renderRowCebuana.bind(this)}
						renderSeparator={null} />
					{error.province ? <Text style={styles.errStyle}>{error.province}</Text> : null}
				</View>

				<View style={styles.marT15}>
					<Text style={[styles.labelStyle]}>City / Municipality</Text>
					<Dropdown
						animated={false}
						showsVerticalScrollIndicator={false}
						renderBase={this.renderBaseCountry.bind(this, inputDetails.municipality, "municipality")}
						dropdownStyle={styles.dropDownStyle}
						disabled={inputDetails.country !== "Philippines"}
						options={MUNICIPALITIES}
						renderButtonText={this.onChangeText("municipality")}
						renderRow={this.renderRow.bind(this)}
						renderSeparator={null} />
					{error.municipality ? <Text style={styles.errStyle}>{error.municipality}</Text> : null}
				</View>

				<TxtInput
					style={[styles.marT15, styles.marB20]}
					label='Postal Code'
					value={inputDetails.postal}
					placeholder="Postal Code"
					keyboardType="numeric"
					err={error.postal}
					onChangeText={this.onChangeText("postal")}/>
			</AnimatedScrollview>
  	);
	}

	renderInput4 = () => {
		const {error, inputDetails, countriesBirth} = this.state;
		const errcountry = error.countryBirth ? {color: Color.red} : null;

		return (
			<AnimatedScrollview animation="fadeInRight" style={styles.flex1} showsVerticalScrollIndicator={false}>
					<View style={styles.marT15}>
						<Text style={[styles.labelStyle, errcountry]}>Country (Birth)</Text>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderSearch={this.renderSearch}
							renderBase={this.renderBase.bind(this,
								inputDetails.countryBirth)}
							dropdownStyle={styles.dropdownStyle2}
							options={countriesBirth}
							renderButtonText={this.onChangeText("countryBirth")}
							renderRow={this.renderRow.bind(this)}
							renderSeparator={null} />
						{error.countryBirth ?
							<Text style={styles.errStyle}>{error.countryBirth}</Text> : null}
					</View>

					<TxtInput
						style={styles.marT15}
						label='Nationality'
						placeholder="Ex. Filipino"
						value={inputDetails.nationality}
						autoCapitalize="characters"
						err={error.nationality}
						onChangeText={this.onChangeText("nationality")} />

					<TxtInput
						style={styles.marT15}
						placeholder="Occupation"
						label='Occupation'
						autoCapitalize="characters"
						value={inputDetails.occupation}
						err={error.occupation}
						onChangeText={this.onChangeText("occupation")} />

					<TxtInput
						style={styles.marT15}
						placeholder="Employer"
						label='Employer'
						autoCapitalize="characters"
						value={inputDetails.employer}
						err={error.employer}
						onChangeText={this.onChangeText("employer")} />

					<TxtInput
						style={styles.marT15}
						placeholder="Source of Fund"
						label='Source of Fund'
						autoCapitalize="characters"
						value={inputDetails.sourceofFund}
						err={error.sourceofFund}
						onChangeText={this.onChangeText("sourceofFund")} />

					<TxtInput
						style={[styles.marT15, styles.marB10]}
						placeholder="Relationship to Beneficiary"
						label='Relationship to Beneficiary'
						autoCapitalize="characters"
						value={inputDetails.relationship}
						err={error.relationship}
						onChangeText={this.onChangeText("relationship")} />
						
						{this.renderError()}
				</AnimatedScrollview>
		);
	}

	onPress = () => {
		const {actions, login: {additionalDetails, currentAccount, session}, type, 
			remittance: {inputDetails: propInput}} = this.props;
		const {inputDetails} = this.state;
		const error = {};

		switch(this.state.steps){
			case "step1":
				if (_.isEmpty(inputDetails.firstName)){
					error.firstName = "This field is required.";
				} else if (!validator.isAlpha(inputDetails.firstName)){
					error.firstName = "This field should accept alpha character only.";
				} else if (_.isEmpty(inputDetails.middleName)){
					error.middleName = "This field is required.";
				} else if (!validator.isAlpha(inputDetails.middleName)){
					error.middleName = "This field should accept alpha character only.";
				} else if (_.isEmpty(inputDetails.lastName)){
					error.lastName = "This field is required.";
				} else if (!validator.isAlpha(inputDetails.lastName)){
					error.lastName = "This field should accept alpha character only.";
				} 

				this.setState({error});

				console.log("error", error);

				if(_.isEmpty(error)){
					this.setState({steps: "step2"});
				}
				
				break;
			case "step2":
				if (_.isEmpty(inputDetails.email)){
					error.email = "This field is required.";
				} else if (!validator.isEmail(inputDetails.email)){
					error.email = "Input valid email address.";
				} else if (_.isEmpty(inputDetails.DoB)){
					error.DoB = "This field is required.";
				} else if (_.isEmpty(inputDetails.gender)){
					error.gender = "This field is required.";
				}

				this.setState({error});
				console.log("error", error);

				
				if(_.isEmpty(error)){
					this.setState({steps: "step3"});
				}
				break;
			case "step3":
				if (_.isEmpty(inputDetails.address)){
					error.address = "This field is required.";
				} else if (_.isEmpty(inputDetails.phoneNumber)){
					error.phoneNumber = "This field is required.";
				} else if (_.isEmpty(`${inputDetails.province}`)){
					error.province = "This field is required.";
				} else if (_.isEmpty(inputDetails.municipality)){
					error.municipality = "This field is required.";
				} else if (_.isEmpty(`${inputDetails.postal}`)){
					error.postal = "This field is required.";
				}

				this.setState({error});
				console.log("error", error);

				
				if(_.isEmpty(error)){
					this.setState({steps: "step4"});
				}
				break;

				case "step4":
				if (_.isEmpty(inputDetails.countryBirth)){
					error.countryBirth = "This field is required.";
				} else if (_.isEmpty(inputDetails.nationality)){
					error.nationality = "This field is required.";
				} else if (_.isEmpty(inputDetails.occupation)){
					error.occupation = "This field is required.";
				} else if (_.isEmpty(inputDetails.employer)){
					error.employer = "This field is required.";
				} else if (_.isEmpty(inputDetails.sourceofFund)){
					error.sourceofFund = "This field is required.";
				} else if (_.isEmpty(inputDetails.relationship)){
					error.relationship = "This field is required.";
				}

				this.setState({error});

				console.log("error", error);
				
				if(_.isEmpty(error)){
					const ts = new Date().valueOf();
					const params = {...inputDetails};
					params.company = "UPS";
					params.loyaltyNo = ts;
					params.fullname = `${inputDetails.firstName} ${inputDetails.middleName} ${inputDetails.lastName} ${inputDetails.suffix || ""}`;
					params.userId = additionalDetails.id;
					params.accountId = currentAccount.id;

					if(type === "fillupsender"){
						actions.addSenderRemittance(params, session.token);
					}else{
						params.senderId = propInput.Sender.id;
						actions.addBeneficiaryRemittance(params, session.token);
					}
				}
				break;
		}
	}

	renderBase = (value) => {
		
		return (
			<DropDownItem base
				placeholder="-- Select --"
				value={value} />
		);
	}

	renderBaseCountry = (value, type) => {
		const {inputDetails} = this.state;

		if(inputDetails.country !== "Philippines"){
			return (
				<DropDownItem base
					placeholder="Type here..."
					isInput
					onChangeText={this.onChangeText(type)}
					value={value} />
			);
		}

		return (
			<DropDownItem base
				placeholder="-- Select --"
				value={value} />
		);
	}
  
	renderRow = (rowData, rowID, highlighted) => {
		const data = _.isObject(rowData) ? rowData.name.common : rowData;

		return (
			<DropDownItem row
				rowData={data}
				highlighted={highlighted} />
		);
	}

	renderRowCebuana = (rowData, rowID, highlighted) => {

		return (
			<DropDownItem row
				rowData={rowData.name}
				highlighted={highlighted} />
		);
	}

	renderContent = () => {
		switch(this.state.steps){
			case "step1":
				return this.renderInput1();
			case "step2":
				return this.renderInput2();
			case "step3":
				return this.renderInput3();
			case "step4":
				return this.renderInput4();
		}
	}

	buttonLabel = () => {
		switch(this.state.steps){
			case "step1":
			case "step2":
			case "step3":
				return "Next"
			case "step4":
				return "Proceed"
		}
	}

	onBack = () => {
		const {type, actions, onBack} = this.props;

		switch(this.state.steps){
			case "step1":
				onBack();
				break;
			case "step2":
				this.setState({steps: "step1"});
				break;
			case "step3":
				this.setState({steps: "step2"});
				break;
			case "step4":
				this.setState({steps: "step3"});
				break;
		}
	}

	render(){
		const {remittance: {isAddLoad}, visible, onRequestClose} = this.props;
		
		return (
			<View style={[styles.flex1, styles.padH20]}>
				{this.renderContent()}
				<View style={styles.viewButton}>
					<Button
						onPress={this.onPress}
						style={styles.btnStyle}
						loading={isAddLoad}
						label={this.buttonLabel()}/>
					<Button
						onPress={this.onBack}
						style={styles.btnCancel}
						label="Back"
						labelStyle={{color: Color.colorPrimaryDark}}/>
				</View>
				<SafeAreaView style={styles.marB5} />
			</View>
		)
	}
}

AddClient.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	login: PropTypes.object,
	type: PropTypes.string,
};

export default AddClient;
