/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView} from "react-native";
import Color from "__src/resources/styles/color";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";
import styles from "../styles.css";
import _ from "lodash";
import Dropdown from "__src/components/Dropdown";
import worldCountries from "world-countries";

const errorMessage = "This field is required.";
const newCountries = _.orderBy(worldCountries, ["name.common"], ["asc"]);

export default class RegisterScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error: {},
			countries: newCountries,
		};
	}
	
	_onChangeText = (type) => (val) => {
		const {register: {registerNewInput, registerCountryDial}, actions} = this.props;
		const error1 = {};
		const newInput = _.merge({}, registerNewInput);

		switch (type){
		case 1:
			if (_.isEmpty(val)) {
				error1.mobileErr = errorMessage;
			} else if (registerCountryDial === "63" && val.length !== 10){
				error1.mobileErr = "Invalid mobile number.";
			}
			
			newInput.mobileNumber = val;
			break;
		case 2:
			const country = _.find(worldCountries, (data) => {
				if (data.ccn3 === val.ccn3){
					return data;
				}
			});

			newInput.country = val.name.common;
			actions.setCountryDial(country.callingCode);
			break;
		}
		this.setState({error: error1});
		actions.setRegisterInput(newInput);
	}

	_submit = () => {
		const {navigation, register: {registerNewInput}} = this.props;
		const error1 = {};
		
		// const value = registerNewInput.mobileNumber;
		

		// if (_.isEmpty(value)){
		// 	error1.mobileErr = errorMessage;
		// }

		this.setState({ error: error1 });

		if (_.isEmpty(error1)) {
			navigation.navigate("Summary");
		}
	}

	_renderRow( rowData, rowID, highlighted) {
		return (
			<View style={[styles.dropdownRow,
				highlighted && {backgroundColor: Color.LightBlue}]}>
				<Text style={[styles.dropdownRowText,
					highlighted && styles.dropdownRowText2]}>
					{`${rowData.name.common}`}
				</Text>
			</View>
		);
	}

	_renderBase() {
		const {register: {registerNewInput}} = this.props;

		return (
			<View style={{backgroundColor: Color.white}} >
				<View accessible style={[styles.views_bi3]}>
					<Text
						style={styles.textfields}
						underlineColorAndroid="transparent">{registerNewInput.country}</Text>
					<Icon style={styles.icon} type='font-awesome' name='caret-down' size={25} color={Color.DarkBG} />
				</View>
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

	_handleInputSuffix = (type) => {
		const { register: { isCheckingImportantDetails } } = this.props;

		if (isCheckingImportantDetails[type]) {
			return isCheckingImportantDetails[type];
		}

		return null;
	}

	render() {
		const {register: {registerNewInput, registerCountryDial}} = this.props;
		const {error} = this.state;

		
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" backgroundColor={Color.Header} />
				<ScrollView keyboardShouldPersistTaps='handled' style={styles.bodyContainer}>
					<View style={styles.margin30}>
						<Text style={styles.labelText}>What's your country</Text>
						{/* <Text style={styles.labelText}>phone number?</Text> */}
					</View>

					<View style={styles.view1}>
						<Text style={styles.labelStyle}>COUNTRY</Text>
						<View style={styles.flex1}>
							<Dropdown
								animated={false}
								renderSearch={this.renderSearch}
								renderBase={this._renderBase.bind(this)}
								dropdownStyle={styles.dropdownstyle}
								options={this.state.countries}
								renderButtonText={this._onChangeText(2)}
								renderRow={this._renderRow.bind(this)}
								renderSeparator={null} />
						</View>
					</View>
					
					{/* <View style={styles.margin15}>
						<Text style={styles.labelStyle}>PHONE NUMBER</Text>
						<View accessible style={[styles.views_bi3]}>
							<View style={styles.view2}>
								<Text style={styles.txt1}>{`+${registerCountryDial}`}</Text>
							</View>
							<TextInput
								autoCorrect={false}
								autoCapitalize="none"
								placeholder="917xxxx"
								keyboardType="phone-pad"
								style={styles.textfields}
								underlineColorAndroid="transparent"
								value={registerNewInput.mobileNumber}
								returnKeyType='done'
								onChangeText={this._onChangeText(1)}/>
						</View>
						{error.mobileErr ?
							<Text style={styles.errStyle}>{error.mobileErr}</Text> : null}
					</View> */}
				</ScrollView>
				<TouchableOpacity style={styles.btnRoundArrow} onPress={this._submit} >
					<Icon reverse name='angle-right' type='font-awesome' color={Color.colorPrimary} size={30} />
				</TouchableOpacity>
			</View>
		);
	}
}
RegisterScreen.propTypes = {
	actions: PropTypes.object,
	InputedData: PropTypes.object,
	navigation: PropTypes.object,
	register: PropTypes.object,
};
