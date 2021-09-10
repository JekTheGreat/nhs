/* eslint-disable */
import React from "react";
import {ScrollView, Text, View, SafeAreaView,
	Modal, TouchableOpacity, Image, Dimensions} from "react-native";
import styles from "../../../styles.css";
import Button2 from "__src/components/Button";
import Detail from "__src/components/Detail";
import TxtInput from "__src/components/TxtInput";
import Dropdown from "__src/components/Dropdown";
import DropDownItem from "__src/components/DropDownItem";
import worldCountries from "world-countries";
import {  provinces } from "psgc";
import PropTypes from "prop-types";
import {Header, Left, Button, Icon} from "native-base";
import moment from "moment";
import _ from "lodash";
import Resources from "__src/resources";

const {Color, Res} = Resources;
const {width} = Dimensions.get("window");

class SearchDetails extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			isEdited: false,
			error: {},
			inputDetails: {},
			PROVINCES: provinces.all() || [],
			MUNICIPALITIES: [],
		};
	}

	async componentDidUpdate(prevProps){
		const {remittance: {AddedClient, inputDetails}, actions, type} = this.props;

		if (prevProps.remittance.AddedClient !== AddedClient && !_.isEmpty(AddedClient)){
			if (AddedClient.S === 1 && AddedClient.type === "update"){
				const newInput = _.merge({}, inputDetails);
				const Sender = {...AddedClient.D};

				if (type === "searchsender"){
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
				alert("Something went wrong! Please try again...");
			}
		}
	}
	
	getScreen = (num) => {
		const {remittance: { setSelectedScreen, selectProvider } } = this.props;
		const index = _.findIndex(selectProvider, {value: setSelectedScreen});

		return selectProvider[index + num].value;
	}

	setData = (item) => {
		this.item = item;
		this.setState({inputDetails: {...item}});
	}

	sender(){
		const {remittance: {inputDetails}, actions} = this.props;
		const {item} = this;
		const newInput = _.merge({}, inputDetails);
		const Sender = {...item};

		newInput.Sender = Sender;

		actions.inputDetails(newInput);
		actions.setSelectedScreen(this.getScreen(+1));
	}

	beneficiary(){
		const {remittance: {inputDetails}, actions} = this.props;
		const {item} = this;
		const newInput = _.merge({}, inputDetails);
		const Beneficiary = {...item};

		newInput.Beneficiary = Beneficiary;

		actions.inputDetails(newInput);
		actions.setSelectedScreen(this.getScreen(+1));
	}

	selected = () => {
		const {type} = this.props;

		if (type === "searchsender"){
			this.sender();
		} else {
			this.beneficiary();
		}
	}

	renderBase = (value) => {
		return (
			<DropDownItem base
				placeHolder="-- Select --"
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

	renderRowProv = (rowData, rowID, highlighted) => {
		return (
			<DropDownItem row
				rowData={rowData.name}
				highlighted={highlighted} />
		);
	}

	onChangeText = (type) => (value) => {
		const {inputDetails} = this.state;
		const newInput = _.merge({}, inputDetails);
		const error = {};

		if (_.isEmpty(value)){
			error[type] = "This field is required.";
		}

		if(type === "province"){
			newInput[type] = value.name;
			delete newInput.municipality;
			this.setState({MUNICIPALITIES: value.municipalities});
			
		}else{
			newInput[type] = _.isObject(value) ? value.name.common : value;
		}

		this.setState({inputDetails: newInput, error});
	}

	onUpdate = () => {
		const {actions, remittance, type} = this.props;
		const {inputDetails} = this.state;
		const error = {};

		if (_.isEmpty(inputDetails.address)){
			error.address = "This field is required.";
		} else if (_.isEmpty(inputDetails.province)){
			error.province = "This field is required.";
		} else if (_.isEmpty(inputDetails.municipality)){
			error.municipality = "This field is required.";
		} else if (_.isEmpty(inputDetails.countryBirth)){
			error.countryBirth = "This field is required.";
		} else if (_.isEmpty(`${inputDetails.postal}`)){
			error.postal = "This field is required.";
		} else if (_.isEmpty(`${inputDetails.nationality}`)){
			error.nationality = "This field is required.";
		} else if (_.isEmpty(`${inputDetails.occupation}`)){
			error.occupation = "This field is required.";
		} else if (_.isEmpty(`${inputDetails.employer}`)){
			error.employer = "This field is required.";
		} else if (_.isEmpty(`${inputDetails.sourceofFund}`)){
			error.sourceofFund = "This field is required.";
		} else if (_.isEmpty(`${inputDetails.relationship}`)){
			error.relationship = "This field is required.";
		}

		this.setState({error});
		
		if(_.isEmpty(error)){
			const prefix = inputDetails.prefix;
			const params = {
				address: inputDetails.address,
				province: inputDetails.province,
				countryBirth: inputDetails.countryBirth,
				email: inputDetails.email,
				country: "PHILIPPINES",
				loyaltyNo: inputDetails.loyaltyNo,
				municipality: inputDetails.municipality,
				phoneNumber: inputDetails.phoneNumber,
				postal: inputDetails.postal,
				nationality: inputDetails.nationality,
				occupation: inputDetails.occupation,
				employer: inputDetails.employer,
				sourceofFund: inputDetails.sourceofFund,
				relationship: inputDetails.relationship,
				prefix: prefix.startsWith("+") ? prefix.slice(1, prefix.length) : prefix,
			};

			if (type === "searchsender"){
				actions.updateClient(params, "/sender/update");
			} else {
				const otherDetails = JSON.parse(remittance.inputDetails.Sender.otherDetails);
				params.ClientID = otherDetails.ClientID;
				actions.updateClient(params, "/beneficiary/update");
			}
		}
	}

	renderEdited = () => {
		const {error, inputDetails, MUNICIPALITIES, PROVINCES} = this.state;
		const {item} = this;
		let newItem = {};

		if (_.has(item, "firstName")){
			newItem = {...inputDetails};
		}
		
		return (
			<ScrollView showsVerticalScrollIndicator={false}
				style={[styles.flex1, styles.marT30, styles.padH20]}>
				<View style={styles.view1}>
					<Text style={styles.txt1}>UPDATE DETAILS</Text>
					<View style={styles.view2}>
						<TxtInput
							style={{width: (width - 60) / 2}}
							label='First Name'
							value={newItem.firstName}
							isText
							style3={styles.borderWidth0} />
						<TxtInput
							style={{width: (width - 60) / 2}}
							label='Last Name'
							value={newItem.lastName}
							isText
							style3={styles.borderWidth0}/>
					</View>

					<View style={styles.view2}>
						<TxtInput
							style={{width: (width - 60) / 2}}
							label='Middle Name'
							value={newItem.middleName}
							isText
							style3={styles.borderWidth0}/>
						<TxtInput
							style={{width: (width - 60) / 2}}
							label='Suffix'
							isText
							value={newItem.suffix}
							style3={styles.borderWidth0}
							err={error.suffix} />
					</View>

					<View style={styles.view2}>
						<TxtInput
							style={{width: (width - 60) / 2}}
							label='Gender'
							isText
							value={newItem.gender}
							style3={styles.borderWidth0} />
						<TxtInput
							style={{width: (width - 60) / 2}}
							label='Date of Birth'
							isText
							value={newItem.DoB}
							style3={styles.borderWidth0} />
					</View>
				</View>
				
				<View style={styles.view2}>
					<TxtInput
						style={{width: (width - 60) / 2, marginLeft: 5}}
						onFocus={() => this.setState({femail: true})}
						onBlur={() => this.setState({femail: false})}
						isFocus={this.state.femail}
						label='Email'
						value={`${inputDetails.email}`}
						err={error.email}
						onChangeText={this.onChangeText("email")}/>
					<TxtInput
						style={{width: (width - 60) / 2, marginLeft: 5}}
						onFocus={() => this.setState({fmobile: true})}
						onBlur={() => this.setState({fmobile: false})}
						isFocus={this.state.fmobile}
						autoCapitalize="characters"
						label='Mobile Number'
						keyboardType="number-pad"
						value={`${inputDetails.phoneNumber}`}
						err={error.phoneNumber}
						onChangeText={this.onChangeText("phoneNumber")}/>
				</View>
				
				<TxtInput
					onChangeText={this.onChangeText("address")}
					onFocus={() => this.setState({addr: true})}
					onBlur={() => this.setState({addr: false})}
					isFocus={this.state.addr}
					multiline
					style3={styles.style3}
					style={styles.marT15}
					value={inputDetails.address}
					returnKeyType='done'
					err={error.address}
					autoCapitalize="characters"
					label="Current Address"
					placeHolder='House #, Building and Sreet Name'/>

				<View style={styles.view2}>
					<View style={{width: (width - 60) / 2, marginRight: 5}}>
						<Text style={[styles.labelStyle ]}>Province / State</Text>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase.bind(this, newItem.province)}
							dropdownStyle={styles.dropdownStyle}
							options={PROVINCES}
							renderRow={this.renderRowProv.bind(this)}
							renderButtonText={this.onChangeText("province")}
							renderSeparator={null} />
					</View>

					<View style={{width: (width - 60) / 2, marginRight: 5}}>
						<Text style={[styles.labelStyle ]}>Municipality / City</Text>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase.bind(this, newItem.municipality)}
							dropdownStyle={styles.dropdownStyle}
							options={MUNICIPALITIES}
							renderRow={this.renderRow.bind(this)}
							renderButtonText={this.onChangeText("municipality")}
							renderSeparator={null} />
					</View>
				</View>

				<View style={styles.view2}>
					<View style={{width: (width - 60) / 2, marginRight: 5}}>
						<Text style={[styles.labelStyle ]}>Country (Birth)</Text>
						<Dropdown
							animated={false}
							showsVerticalScrollIndicator={false}
							renderBase={this.renderBase.bind(this, inputDetails.countryBirth)}
							dropdownStyle={styles.dropdownStyle2}
							options={worldCountries}
							renderButtonText={this.onChangeText("countryBirth")}
							renderRow={this.renderRow.bind(this)}
							renderSeparator={null} />
						{error.countryBirth ?
							<Text style={styles.errStyle}>{error.countryBirth}</Text> : null}
  					</View>
					<TxtInput
						style={{width: (width - 60) / 2, marginLeft: 5}}
						onFocus={() => this.setState({fzip: true})}
						onBlur={() => this.setState({fzip: false})}
						isFocus={this.state.fzip}
						autoCapitalize="characters"
						label='Zip Code'
						keyboardType="number-pad"
						value={`${inputDetails.postal}`}
						err={error.postal}
						onChangeText={this.onChangeText("postal")}/>
				</View>

				<View style={styles.view2}>
					<TxtInput
						style={{width: (width - 60) / 2, marginLeft: 5}}
						onFocus={() => this.setState({fnat: true})}
						onBlur={() => this.setState({fnat: false})}
						isFocus={this.state.fnat}
						autoCapitalize="characters"
						label='Nationality'
						value={`${inputDetails.nationality}`}
						err={error.nationality}
						onChangeText={this.onChangeText("nationality")}/>
					<TxtInput
						style={{width: (width - 60) / 2, marginLeft: 5}}
						onFocus={() => this.setState({focc: true})}
						onBlur={() => this.setState({focc: false})}
						isFocus={this.state.focc}
						autoCapitalize="characters"
						label='Occupation'
						value={`${inputDetails.occupation}`}
						err={error.occupation}
						onChangeText={this.onChangeText("occupation")}/>
				</View>
			
				<View style={styles.view2}>
					<TxtInput
						style={{width: (width - 60) / 2, marginLeft: 5}}
						onFocus={() => this.setState({femp: true})}
						onBlur={() => this.setState({femp: false})}
						isFocus={this.state.femp}
						autoCapitalize="characters"
						label='Employer'
						value={`${inputDetails.employer}`}
						err={error.employer}
						onChangeText={this.onChangeText("employer")}/>
					<TxtInput
						style={{width: (width - 60) / 2, marginLeft: 5}}
						onFocus={() => this.setState({fsource: true})}
						onBlur={() => this.setState({fsource: false})}
						isFocus={this.state.fsource}
						autoCapitalize="characters"
						label='Source of Fund'
						value={`${inputDetails.sourceofFund}`}
						err={error.sourceofFund}
						onChangeText={this.onChangeText("sourceofFund")}/>
				</View>
			
				<View style={[styles.view2, styles.marB20]}>
					<TxtInput
						style={{width: width - 40, marginLeft: 5}}
						onFocus={() => this.setState({frel: true})}
						onBlur={() => this.setState({frel: false})}
						isFocus={this.state.frel}
						autoCapitalize="characters"
						label='Relationship to Beneficiary'
						value={`${inputDetails.relationship}`}
						err={error.relationship}
						onChangeText={this.onChangeText("relationship")}/>
				</View>
			</ScrollView>
		);
	}

	renderDetails = () => {
		const {item} = this;
		const date = _.has(item, "DoB") ? moment(new Date(item.DoB)).format("MMM DD, YYYY") : "";
		const loyaltyno = _.has(item, "loyaltyNo") ? item.loyaltyNo : "";
		const fullname = _.has(item, "firstName") ? `${item.firstName } ${item.middleName} ${item.lastName}` : "";
		const newtype = this.props.type === "searchsender" ? "Sender" : "Beneficiary";
		const address = _.has(item, "address") ? `${item.address}, ${item.municipality}, ${item.province}, ${item.postal}` : "";
		const email = _.has(item, "email") ? item.email : "";
		const phoneNumber = _.has(item, "phoneNumber") ? item.phoneNumber : "";
		
		return (
			<ScrollView style={[styles.flex1, styles.padH20]}>
				<TouchableOpacity onPress={() => this.setState({isEdited: true})}
					activeOpacity={0.7} style={[styles.btnUpdate,styles.marT30]}>
					<Image style={styles.imgUpdate} source={Res.get("button_update")} resizeMode="contain" />
				</TouchableOpacity>

				<Text style={[styles.txtSearch, styles.marT15, styles.marB10]}>
					{newtype} Details</Text>
				<Detail vertical label="Loyalty Card No." value={loyaltyno}/>
				<Detail vertical label="Full Name" value={fullname}/>
				<Detail vertical label="Date of Birth" value={date}/>
				<Detail vertical label="Mobile Number" value={phoneNumber}/>
				<Detail vertical label="Email" value={email}/>
				<Detail vertical label="Address" value={address}/>
			</ScrollView>
		);
	}

	onClose = () => {
		if (this.state.isEdited){
			this.setState({isEdited: false});
		} else {
			this.props.onClose();
		}
	}

	render(){
		const {onRequestClose, visible, onClose, remittance: {isAddLoad}} = this.props;
		const {isEdited} = this.state;

		return (
			<Modal animationType='fade' transparent visible={visible} onRequestClose={onRequestClose}>
				<View style={[styles.flex1, {backgroundColor: Color.white}]}>
					<Header iosBarStyle='light-content' androidStatusBarColor={Color.Header} style={styles.headerContainer}>
						<Left>
							<Button transparent onPress={onClose}>
								<Icon name={"arrow-back"} color="white" style={styles.iconStyle} />
							</Button>
						</Left>
					</Header>
				
					{this.state.isEdited ? this.renderEdited() : this.renderDetails()}

					<View style={[styles.viewButton, styles.padH20]}>
						<Button2
							onPress={isEdited ? this.onUpdate : this.selected}
							style={styles.btnStyle}
							loading={isAddLoad}
							label={isEdited ? "Update" : "Select"}/>
						<Button2
							onPress={this.onClose}
							style={styles.btnCancel}
							label={isEdited ? "Cancel" : "Back"}
							labelStyle={{color: Color.colorPrimaryDark}}/>
					</View>
					<SafeAreaView style={styles.marB20}/>
				</View>
			</Modal>
		);
	}
}

SearchDetails.propTypes = {
	onRequestClose: PropTypes.func,
	onClose: PropTypes.func,
	visible: PropTypes.bool,
	item: PropTypes.object,
	remittance: PropTypes.object,
	actions: PropTypes.object,
};

export default SearchDetails;
