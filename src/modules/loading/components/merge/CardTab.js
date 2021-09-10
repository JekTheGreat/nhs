/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from "react";
import {View, Text, TextInput, Image, Dimensions, ScrollView, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import Resources from "__src/resources";
import PropTypes from "prop-types";
import Load02 from "__src/resources/svg/buyload/Load02";
import Phonebook from "__src/resources/svg/buyload/Phonebook";
import styles from "../../styles.css";
import _ from "lodash";
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
		};
	}

	onChangeText = (input) => {
		const { actions, loading: {setInputMerge}} = this.props;
		const params = _.merge({}, setInputMerge);

		if (params.code === "PHP"){
			if (input.startsWith("0")) {
				input = _.replace(input, "0", "9");
			}

			if (input.length <= 10){
				params.mobile = input;

				actions.setInputMerge(params);
			}
		} else {
			params.mobile = input;

			actions.setInputMerge(params);
		}

	}

	onSubmit = () => {
		const {actions, loading: {setInputMerge}, login: {currentAccount}} = this.props;
		const newInput = _.merge({}, setInputMerge);
		const error = {};

		if (_.isEmpty(setInputMerge.mobile)){
			error.mobile = "Mobile number is required.";
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
		const {loading: {setInputMerge}, onContactShow, onPressCountry} = this.props;

		return (
			<View style={[styles.flex1, {backgroundColor: Color.white}]}>
				<ScrollView style={styles.flex1padH20}>
					<View style={{marginTop: 30, alignItems: "center"}}>
						<Load02 width={SCREEN_WIDTH - 40} height={200}/>
						<Text style={{fontFamily: "Montserrat-Medium", fontWeight: "bold", fontSize: 20, color: Color.Header, textAlign: "center"}}>TOP UP YOUR PHONE!</Text>
						<Text style={{fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header, textAlign: "center", marginTop: 14}}>PLEASE ENTER YOUR MOBILE NUMBER BEFORE YOU PROCEED</Text>
					</View>
					<View style={[{flexDirection: "row", marginTop: 30, alignItems: "center", justifyContent: "space-between"}]}>

						<TouchableOpacity activeOpacity={0.9}
							onPress={onPressCountry} style={styles.view2}>
							<Image style={styles.imageCurrency}
								source={Res.get(setInputMerge.code)}/>
							<Text style={styles.txtNumber}>+ {setInputMerge.prefix}</Text>
							<Icon name="chevron-down" type="feather" color={Color.LightBlue5} size={20}/>
						</TouchableOpacity>
  					<View pointerEvents="box-none" style={[styles.view3]}>
							<TextInput style={styles.input6} placeholder="Enter here..."
								value={setInputMerge.mobile}
								keyboardType="number-pad" returnKeyType="done"
								onChangeText={this.onChangeText}
							/>
							<View style={{height: 40, width: 1, backgroundColor: Color.text1}}/>
							<TouchableOpacity onPress={onContactShow}
								activeOpacity={0.8} style={{paddingLeft: 10}}>
								<Phonebook size={18}/>
							</TouchableOpacity>
  					</View>
					</View>
					{this.renderError()}
				</ScrollView>
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
