/* eslint-disable no-inline-comments */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from "react";
import {View, Text, TextInput, Image, Dimensions, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Resources from "__src/resources";
import PropTypes from "prop-types";
import Load02 from "__src/resources/svg/buyload/Load02";
import Phonebook from "__src/resources/svg/buyload/Phonebook";
import styles from "../../styles.css";
import _ from "lodash";
import { PERMISSIONS, check, RESULTS } from "react-native-permissions";
import validator from "validator";
const SCREEN_WIDTH = Dimensions.get("window").width;
const {Color, Res} = Resources;

export default class CardTab extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error: {},
			wallet: {},
			input: "",
			search: "",
			permission: false,
		};
	}
	
	async componentDidMount() {
		if (Platform.OS === "android") {
			const res =	await check(PERMISSIONS.ANDROID.READ_CONTACTS);
			if (res === RESULTS.GRANTED){
				this.setState({permission: true});
			} else {
				this.setState({permission: false});
			}
			
		} else {
			const res = await check(PERMISSIONS.IOS.CONTACTS);
			if (res === RESULTS.GRANTED) {
				this.setState({permission: true});
			} else {
				this.setState({permission: false});
			}
		}
	}
	
	onChangeText = (type) => (input) => {
		const { actions, loading: {setInputInventory}} = this.props;
		const params = _.merge({}, setInputInventory);

		switch (type){
		case 1:
			if (params.code === "PHP"){
				if (input.startsWith("0")) {
					input = _.replace(input, "0", "9");
				}
		
				if (input.length <= 10){
					params.mobile = input;
		
					actions.setInputInventory(params);
				}
			} else {
				params.mobile = input;
		
				actions.setInputInventory(params);
			}
			break;
		case 2:
			params.email = input;
			actions.setInputInventory(params);
			break;
		}
	}
		

	onSubmit = () => {
		const {actions, loading: {setInputInventory, selectedInventory,
			selectedWallet, checkPrefixes}, login: {currentAccount, session}} = this.props;
		const newInput = _.merge({}, setInputInventory);
		const error = {};
		const params = {};
		const pref = _.find(checkPrefixes, {id: `0${  setInputInventory.mobile.slice(0, 3)}`});

		if (selectedInventory.isInternational == 0 || false){
			if (_.isEmpty(setInputInventory.mobile)){
				error.mobile = "Mobile Number is required";
			} else if (setInputInventory.mobile.length < 10){
				error.mobile = "Invalid Mobile Number";
			} else if (_.isEmpty(pref)) {
				error.mobile = "Invalid Mobile Number";
			}
		} else if (_.isEmpty(setInputInventory.email)){
			error.email = "Email address is required";
		} else if (!validator.isEmail(setInputInventory.email)){
			error.email = "Email address is not valid";
		}

		this.setState({error});

		if (_.isEmpty(error)){
			newInput.userLevel = currentAccount.userLevel;
			newInput.localprefix = newInput.code === "PHP" ? `0${newInput.mobile.substr(0, 3)}` : "";
			newInput.categoryId = "CARDS";
			if (selectedInventory.isInternational == 0 || false){
				newInput.email = "";
			} else {
				newInput.mobile = "";
			}

			params.currency = `${selectedWallet}`;
			params.type = selectedInventory.isInternational == 0 || false ?
				"local" : "international";
			params.amount = `${selectedInventory.amount}`;
			params.system = "unified";
			params.userLevel = `${currentAccount.userLevel}`;
			params.denomination =  `${selectedInventory.denomination}`;
			params.productName = `${selectedInventory.name}`;
			params.mobileNetworkId = selectedInventory.isInternational == 0 || false ?
				"INVENTORY" : `${selectedInventory.provider}`;
			actions.convertLoad(params, session.token);
			actions.setInputInventory(newInput);
			actions.setScreenInventory("Payment");
		}
	}

	renderError = () => {
		const {loading: {selectedInventory}} = this.props;
		const {error} = this.state;

		if (!_.isEmpty(error)){
			return (
				<View style={[styles.inpuView1, {padding: 5}]}>
					<Icon containerStyle={styles.iconContainerStyle}
						name="close-circle" type="material-community" color={Color.red} size={15} />
					{
						selectedInventory.isInternational == 0 || false ?
							<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
								{error.mobile}</Text> :
							<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
								{error.email}</Text>
					}
				</View>
			);
		}
		
		return null;
	}

	renderFields = () => {
		const {loading: {setInputInventory, selectedInventory}, onContactShow} = this.props;
		const {permission} = this.state;

		if (selectedInventory.isInternational == 0 || false){
			return (
				<View style={[{flexDirection: "row", marginTop: 30, alignItems: "center", justifyContent: "space-between"}]}>
					<TouchableOpacity activeOpacity={0.9}
						// onPress={onPressCountry}
						style={styles.view2}>
						<Image style={styles.imageCurrency}
							source={Res.get(setInputInventory.code)}/>
						<Text style={styles.txtNumber}>+ {setInputInventory.prefix}</Text>
						{/* <Icon name="chevron-down" type="feather"
						color={Color.LightBlue5} size={20}/> */}
					</TouchableOpacity>
					<View pointerEvents="box-none" style={[styles.view3]}>
						<TextInput style={styles.input6} placeholder="Enter here..."
							value={setInputInventory.mobile}
							keyboardType="number-pad" returnKeyType="done"
							onChangeText={this.onChangeText(1)}
						/>
						<View style={{height: 40, width: 1, backgroundColor: Color.text1}}/>
						{
							permission ?
								<TouchableOpacity onPress={onContactShow}
									activeOpacity={0.8} style={{paddingLeft: 10}}>
									<Phonebook size={18}/>
								</TouchableOpacity> :
								<TouchableOpacity onPress={onContactShow}
									activeOpacity={0.8} style={{paddingLeft: 10}}
									disabled>
									<View style = {{opacity: 0.3}}>
										<Phonebook size={18}/>
									</View>
								</TouchableOpacity>
						}
					</View>
				</View>
			);
		}
		
		return (
			<View style={[{marginTop: 30, alignItems: "center", justifyContent: "space-between"}]}>
				<View pointerEvents="box-none" style={[styles.view3]}>
					<TextInput style={styles.input6} placeholder="Enter email address here..."
						value={setInputInventory.email}
						keyboardType="email-address" returnKeyType="done"
						onChangeText={this.onChangeText(2)}
					/>
				</View>
			</View>
		);
		
	}

	render() {
		const {loading: {selectedInventory}} = this.props;
		const label = selectedInventory.isInternational == 0 || false ? "MOBILE NUMBER" : "EMAIL";
		
		return (
			<View style={[styles.flex1, {backgroundColor: Color.white}]}>
				<KeyboardAwareScrollView style={styles.flex1padH20}>
					<View style={{marginTop: 30, alignItems: "center"}}>
						<Load02 width={SCREEN_WIDTH - 40} height={200}/>
						<Text style={{fontFamily: "Montserrat-Medium", fontWeight: "bold", fontSize: 20, color: Color.Header, textAlign: "center"}}>TOP UP YOUR PHONE!</Text>
						<Text style={{fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header, textAlign: "center", marginTop: 14}}>{`PLEASE ENTER YOUR ${label} BEFORE YOU PROCEED`}</Text>
					</View>
					{this.renderFields()}
					{this.renderError()}
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

CardTab.propTypes = {
	actions: PropTypes.object,
	wallet: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
	account: PropTypes.object,
	loading: PropTypes.object,
	onContactShow: PropTypes.func,
	onPressCountry: PropTypes.func,
};
