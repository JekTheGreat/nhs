/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-const-assign */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, ScrollView, Dimensions} from "react-native";
import styles from "../../styles.css";
import TxtInput from "__src/components/TxtInput";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import Dropdown from "__src/components/Dropdown";
import Button from "__src/components/Button";
import DatePicker from "__src/components/datepicker";
import {Icon} from "react-native-elements";
import worldCountries from "world-countries";
import moment from "moment";
import _ from "lodash";
const {Color} = Resource;
const {width} = Dimensions.get("window");

export default class ProfileDetailEditable extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			error: {},
			currentAddressCheckbox: true,
		};
	}

	componentDidMount() {
		const { actions, login: { additionalDetails } } = this.props;

		actions.setChangeProfileInputs({
			birthDate: (additionalDetails.individual.birthDate) ?
				moment(new Date(additionalDetails.individual.birthDate)).format("MM/DD/YYYY") : "",
			streetAddress: (additionalDetails.individual.streetAddress) ? additionalDetails.individual.streetAddress : "",
			barangay: (additionalDetails.individual.barangay) ? additionalDetails.individual.barangay : "",
			province: (additionalDetails.individual.province) ? additionalDetails.individual.province : "",
			city: (additionalDetails.individual.city) ? additionalDetails.individual.city : "",
			country: (additionalDetails.individual.country) ?
				additionalDetails.individual.country : "",
		});
	}

	renderBase(value) {
  	return (
  		<View style={styles.renderBase}>
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

	_handleInputChange = (type) => (value) => {
		const { actions, profile: { changeProfileInputs } } = this.props;
		const { error } = this.state;
		const newInput = { ...changeProfileInputs };

		if (value) {
			delete error[type];
		} else  if (type !== "suffix"){
			error[type] = "This field is required";
		}

		if (type === "birthDate"){
			newInput[type] = value;
		} else {
			newInput[type] = _.isObject(value) ? value.name.common : value;
		}
		

		this.setState({ error: { ...error } });
		actions.setChangeProfileInputs(newInput);
	}

	_handleSubmit = () => {
		const {actions, profile: { changeProfileInputs }, login: {session} } = this.props;
		const error1 = {};
		const labels1 = [{
			type: "birthDate",
			label: "Date of Birth",
		}, {
			type: "streetAddress",
			label: "Address",
		}, {
			type: "province",
			label: "Province",
		}, {
			type: "city",
			label: "City/Municipality",
		}, {
			type: "country",
			label: "Country",
		}];

		_.map([ ...labels1 ], (item) => {
			const { type, label } = item;

			if (changeProfileInputs[type] === null || changeProfileInputs[type] === "") {
				error1[type] = `${label} is required`;
			}
		});

		if (!changeProfileInputs.birthDate) {
			error1.birthDate = "Birthday is required";
		}

		if (_.isEmpty(error1)) {
			const individualInfo = {
				...changeProfileInputs,
			};
			actions.saveProfileChanges({ individualInfo}, session.token);
		} else {
			this.setState({ error: { ...error1 } });
		}
	}

	render(){
		const {error} = this.state;
		const { onEditChange, login: {  additionalDetails },
			profile: {changeProfileInputs, isSavingProfileChanges}  } = this.props;
		const { firstName, lastName, middleName} = additionalDetails.individual;
		const { username, email} = additionalDetails.metadata;
		const errCountry = error.country ? {color: Color.red} : null;
		
		return (
			<ScrollView showsVerticalScrollIndicator={false} style={styles.flex1bg}>
				<View style={styles.view1}>
					<Text style={styles.txt1}>PERSONAL DETAILS</Text>
					<View style={styles.view2}>
						<TxtInput
							style={{width: (width - 60) / 2}}
							label='First Name'
							value={firstName}
							isText
							style3={styles.borderWidth0}/>
						<TxtInput
							style={{width: (width - 60) / 2}}
							label='Last Name'
							value={lastName}
							isText
							style3={styles.borderWidth0}/>
					</View>

					<View style={styles.view2}>
						<TxtInput
							style={{width: (width - 60) / 2}}
							label='Middle Name'
							value={middleName}
							isText
							style3={styles.borderWidth0}/>

						<View style={{width: (width - 60) / 2}}>
							<DatePicker
								date={changeProfileInputs.birthDate}
								mode="date"
								label='Date of Birth'
								compName="Date"
								maxDate={moment().format("MM/DD/YYYY")}
								format="MM/DD/YYYY"
								err={error.birthDate}
								onDateChange={this._handleInputChange("birthDate")}
							/>
						</View>
					</View>
				</View>

				<View style={styles.view1}>
					<Text style={styles.txt2}>ACCOUNT DETAILS</Text>
					<TxtInput
						label='Username'
						value={username}
						isText
						style={styles.marginTop10}
						style3={styles.borderWidth0}/>

					<TxtInput
						label='Email'
						value={email}
						isText
						style={styles.marginTop10}
						style3={styles.borderWidth0}/>
				</View>
				
				<View style={styles.view3}>
					<Text style={styles.txt2}>ADDRESS</Text>
					<Text style={styles.txt3}>PERMANENT ADDRESS</Text>
					<TxtInput
						onChangeText={this._handleInputChange("streetAddress")}
						onFocus={() => this.setState({addr: true})}
						onBlur={() => this.setState({addr: false})}
						isFocus={this.state.addr}
						multiline
						style3={styles.style3}
						style={styles.marginTop5}
						value={changeProfileInputs.streetAddress}
						returnKeyType='done'
						err={error.streetAddress}
						label='House #, Building and Sreet Name'/>
					<View style={styles.view2}>
						<TxtInput
							style={{width: (width - 60) / 2}}
							onFocus={() => this.setState({fbrgy: true})}
							onBlur={() => this.setState({fbrgy: false})}
							isFocus={this.state.fbrgy}
							label='Barangay'
							value={changeProfileInputs.barangay}
							err={error.barangay}
							onChangeText={this._handleInputChange("barangay")}
						/>
						<TxtInput
							style={{width: (width - 60) / 2}}
							onFocus={() => this.setState({fprovince: true})}
							onBlur={() => this.setState({fprovince: false})}
							isFocus={this.state.fprovince}
							label='Province'
							value={changeProfileInputs.province}
							err={error.province}
							onChangeText={this._handleInputChange("province")}/>
					
					</View>

					<View style={styles.view2}>
						<TxtInput
							style={{width: (width - 60) / 2}}
							onFocus={() => this.setState({fcity: true})}
							onBlur={() => this.setState({fcity: false})}
							isFocus={this.state.fcity}
							label='City / Municipality'
							value={changeProfileInputs.city}
							err={error.city}
							onChangeText={this._handleInputChange("city")}/>
						<View style={{width: (width - 60) / 2}}>
							<Text style={[styles.labelStyle, errCountry ]}>Country</Text>
							<Dropdown
								animated={false}
								showsVerticalScrollIndicator={false}
								renderBase={this.renderBase.bind(this, changeProfileInputs.country)}
								dropdownStyle={styles.dropdownStyle2}
								options={worldCountries}
								renderButtonText={this._handleInputChange("country")}
								renderRow={this.renderRow.bind(this)}
								renderSeparator={null} />
							{errCountry ?
								<Text style={styles.errStyle}>{error.country}</Text> : null}
  					</View>
					
					</View>

					<View style={styles.marginTop30}>
						<Button
							onPress={this._handleSubmit}
							style={styles.btnStyle2}
							loading={isSavingProfileChanges}
							label="Save Changes"/>
						<Button
							onPress={() => onEditChange()}
							style={styles.btnStyle3}
							labelStyle={styles.btnLabelStyle}
							label="Cancel"/>
  			</View>
				</View>
			</ScrollView>
		);
	}
}

ProfileDetailEditable.propTypes = {
	login: PropTypes.object,
	actions: PropTypes.object,
	profile: PropTypes.object,
	onEditChange: PropTypes.func,
};
