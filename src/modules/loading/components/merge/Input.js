/* eslint-disable no-inline-comments */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from "react";
import {View, Text, TextInput, Image, TouchableOpacity,
	Platform} from "react-native";
import {Icon} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Resources from "__src/resources";
import PropTypes from "prop-types";
import Phonebook from "__src/resources/svg/buyload/Phonebook";
import styles from "../../styles.css";
import _ from "lodash";
import { PERMISSIONS, check, RESULTS } from "react-native-permissions";
const {Color, Res} = Resources;


export default class Input extends PureComponent {
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
			if (Platform.Version < 23) {
				this.setState({permission: true});
			} else {
				const res =	await check(PERMISSIONS.ANDROID.READ_CONTACTS);
				if (res === RESULTS.GRANTED){
					this.setState({permission: true});
				} else {
					this.setState({permission: false});
				}
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

	onChangeText = (input) => {
		const { actions, loading: {setInputMerge}} = this.props;
		const params = _.merge({}, setInputMerge);

		if (params.code === "PHP"){
			if (input.startsWith("0")) {
				input = input.replace(/^0+/, "");
			}
			if (input.length <= 10){
				params.mobile = input.replace(/[^\w\s]/gi, "");

				actions.setInputMerge(params);
			}
		} else {
			params.mobile = input.replace(/[^\w\s]/gi, "");

			actions.setInputMerge(params);
		}

	}

	onSubmit = () => {
		const {actions, loading: {setInputMerge, checkPrefixes},
			login: {currentAccount}} = this.props;
		const newInput = _.merge({}, setInputMerge);
		const error = {};
		const pref = _.find(checkPrefixes, {id: `0${  setInputMerge.mobile.slice(0, 3)}`});
		if (_.isEmpty(setInputMerge.mobile)){
			error.mobile = "Mobile number is required.";
		} else if (setInputMerge.code === "PHP" && setInputMerge.mobile.length < 10) {
			error.mobile = "Invalid Mobile Number";
		} else if (setInputMerge.code === "PHP" && _.isEmpty(pref)){
			error.mobile = "Invalid Mobile Number";
		} else if (setInputMerge.code !== "PHP" && setInputMerge.mobile.length < 5) {
			error.mobile = "Invalid Mobile Number";
		}

		this.setState({error});
		if (_.isEmpty(error)){
			newInput.userLevel = currentAccount.userLevel;
			newInput.localprefix = newInput.code === "PHP" ? `0${newInput.mobile.substr(0, 3)}` : "";
			
			actions.setInputMerge(newInput);
			actions.searchProduct(newInput);
		}
	}

	renderError = () => {
		const {error} = this.state;

		if (!_.isEmpty(error)){
			return (
				<View style={[styles.inpuView1, {padding: 5}]}>
					<Icon containerStyle={styles.iconContainerStyle}
						name='close-circle' type="material-community" color={Color.red} size={15} />
					<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
						{error.mobile}</Text>
				</View>
			);
		}
		
		return null;
	}

	render() {
		const {loading: {setInputMerge}, onContactShow, onPressCountry,
			login: {session}} = this.props;
		const {permission} = this.state;
		
		return (
			<View style={[styles.flex1, {backgroundColor: Color.white}]}>
				<KeyboardAwareScrollView style={styles.flex1padH20}>
					<View style={{marginTop: 20, alignItems: "center"}}>
						<Image style={styles.loadBanner}
							source={Res.get("eload_banner")} resizeMode = {"stretch"}/>
						<Text style={{fontFamily: "Montserrat-Medium", fontWeight: "bold", fontSize: 20, color: Color.Header, textAlign: "center"}}>TOP UP YOUR PHONE!</Text>
						<Text style={{fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header, textAlign: "center", marginTop: 14}}>SELECT A COUNTRY CODE AND ENTER A MOBILE NUMBER TO LOAD</Text>
					</View>
					<View style={[{flexDirection: "row", marginTop: 30, alignItems: "center", justifyContent: "space-between"}]}>

						<TouchableOpacity activeOpacity={0.9}
							disabled={!!(session.role === "retailer" ||
							session.role === "pinoy-dealer")}
							onPress={onPressCountry} style={styles.view2}>
							<Image style={styles.imageCurrency}
								source={Res.get(setInputMerge.code)}/>
							<Text style={styles.txtNumber}>+ {setInputMerge.prefix}</Text>
							{
								session.role === "retailer" ||
								session.role === "pinoy-dealer" ? <View style={{width: 5}}></View> :
									<Icon name="chevron-down" type="feather" color={Color.LightBlue5} size={20}/>
							}
						</TouchableOpacity>
  					<View pointerEvents="box-none" style={[styles.view3]}>
							<TextInput style={styles.input6} placeholder="Enter here..."
								value={setInputMerge.mobile}
								keyboardType="number-pad" returnKeyType="done"
								onChangeText={this.onChangeText}
							/>
							<View style={{height: 40, width: 1,
								backgroundColor: Color.text1}}/>
							
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
					{this.renderError()}
				</KeyboardAwareScrollView>
			</View>
		);
	}
}
Input.propTypes = {
	actions: PropTypes.object,
	wallet: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
	account: PropTypes.object,
	loading: PropTypes.object,
	onContactShow: PropTypes.func,
	onPressCountry: PropTypes.func,
};
