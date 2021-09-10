/* eslint-disable max-statements */
// /* eslint-disable */

import React, {PureComponent} from "react";
import {View, FlatList, Alert, Text, TouchableOpacity, SafeAreaView} from "react-native";
import styles from "../../styles.css";
import PropTypes from "prop-types";
import * as globals from "__src/globals";
import Resource from "__src/resources";
import Info from "./Info";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import _ from "lodash";
const {Color} = Resource;

export default class SwitchScreen extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			otpFocus: false,
			search: "",
			data: props.login.accounts || [],
		};
	}

	static navigationOptions = {
		headerShown: false,
	}

	// componentDidUpdate(prevProps){
	// 	const { login: { currentAccount, isLoggedIn, accounts },
	// 		wallet: { addedWallet, walletSelected }, actions,
	// 		register: { isAddNewAccountSuccess,
	// 			failCheckingAccountNumber, failCheckingMobile, failCheckingSponsor,
	// 			 failCheckingUpline, doneCheckingAccountNumber } } = this.props;

	// 	if (isLoggedIn && currentAccount.id &&
	// 		((currentAccount.id !== prevProps.login.currentAccount.id) ||
	// 		(!addedWallet && accounts.length))) {
	// 		actions.walletAdded(currentAccount.id, walletSelected);
	// 	}

	// 	if (isAddNewAccountSuccess !== prevProps.register.isAddNewAccountSuccess) {

	// 		// reset add account form on successful add
	// 		if (isAddNewAccountSuccess){
	// 			this.setState({
	// 				visible: false,
	// 				isConfirm: false,
	// 				accountId: "",
	// 				accountType: undefined,
	// 				mobileNumber: "",
	// 				pin: "",
	// 				reTypePin: "",
	// 				referenceId: "",
	// 				position: undefined,
	// 				sponsor: "",
	// 				upline: "",
	// 			});
	// 		}
	// 	}

	// 	if (failCheckingAccountNumber !== prevProps.register.failCheckingAccountNumber &&
	// 			failCheckingAccountNumber) {
	// 		const { error } = this.state;
	// 		const error1 = { ...error };

	// 		error1.accountId = " ";
	// 		error1.referenceId = " ";

	// 		this.setState({ error: { ...error1 } });

	// 		actions.resetCheckAccountNumber();
	// 	}

	// 	if (failCheckingSponsor !== prevProps.register.failCheckingSponsor &&
	// 			failCheckingSponsor) {
	// 		const { error } = this.state;
	// 		const error1 = { ...error };

	// 		error1.sponsor = " ";

	// 		this.setState({ error: { ...error1 } });

	// 		actions.resetCheckAccountNumber();
	// 	}

	// 	if (failCheckingMobile !== prevProps.register.failCheckingMobile &&
	// 			failCheckingMobile) {
	// 		const { error } = this.state;
	// 		const error1 = { ...error };

	// 		error1.mobileNumber = "Mobile number is already used";

	// 		this.setState({ error: { ...error1 } });

	// 		actions.resetCheckAccountNumber();
	// 	}

	// 	if (failCheckingUpline !== prevProps.register.failCheckingUpline &&
	// 			failCheckingUpline) {
	// 		const { error } = this.state;
	// 		const error1 = { ...error };

	// 		error1.upline = " ";

	// 		this.setState({ error: { ...error1 } });

	// 		actions.resetCheckAccountNumber();
	// 	}

	// 	if (doneCheckingAccountNumber.id !== prevProps.register.doneCheckingAccountNumber.id &&
	// 			doneCheckingAccountNumber.id) {
	// 		actions.resetCheckAccountNumber();
	// 	}
	// }

	transformImage = (photo) => {
		return globals.CloudUpload.imageTransform(
			photo,
			"c_fill,g_face,w_140,h_140");
	}

	proceed = (item) => {
		const { actions } = this.props;

		actions.setCurrentAccount(item);
		actions.changeAccount();

		this.setState({
			changedAccount: true,
		});
	}

	renderAlert = (item) => {
		const {login: {currentAccount}} = this.props;

		if (currentAccount.id === item.id){
			return;
		}

		Alert.alert("Are you sure?",
			`Swich account to\nAccount ID: ${item.id}\nAccount Type: ${item.type}`,
			[
				{
					text: "CANCEL",
					onPress: () => console.log("Cancel Pressed"),
				},
				{text: "PROCEED", onPress: () => this.proceed(item)},
			],
			{cancelable: false});
	}

	renderItem = ({item, index}) => {
		const {login: {currentAccount}} = this.props;
		const color = index % 2 ? {backgroundColor: Color.LightBlue2} : null;
		const active = currentAccount.id === item.id ? "Active account" : "Change to active account";
		const activeColor = currentAccount.id === item.id ?
			{color: Color.green} : {color: Color.LightBlue};

		return (
			<TouchableOpacity onPress={() => this.renderAlert(item)} activeOpacity={0.5}
				key={`idx ${index}`} style={[styles.renderItemContainer, color]}>
  			<View style={[styles.flex1, styles.flexStart]}>
					<Text numberOfLines={1} style={[styles.txt2, {color: Color.Standard2}]}>
						{item.id}</Text>
  			</View>
  			<View style={styles.view4}>
  				<Text style={styles.txt4}>{item.subType.split("_").join(" ")}</Text>
  				<Text style={[styles.txt5, activeColor]}>{active}</Text>
  			</View>
  		</TouchableOpacity>
		);
	}

	onSubmit = () => {
		Alert.alert("Notice", "This service is under construction.");
	}

	onBack = () => {
		const {navigation} = this.props;

		navigation.goBack();
	}

	onChangeInput = (e) => {
		const {accounts} = this.props.login;
		let data;
		if (_.isEmpty(e)){
			data = accounts || [];
		} else {
			data = _.filter(accounts, (item) => {
				return item.id.startsWith(e);
			});
		}

		this.setState({data, search: e});

	}

	render(){
		const {data, search} = this.state;

		return (
			<View style={styles.flex1}>
				<View style={styles.height40}>
					<Info {...this.props}/>
				</View>
				<View style={styles.height60}>
					<View style={[styles.flex1, {backgroundColor: Color.bg}, styles.paddingH20]}>
						<TxtInput
							style={[styles.marginTop15,
								{backgroundColor: Color.white}]}
							style3={{borderColor: Color.Standard}}
							onFocus={() => this.setState({otpFocus: true})}
							onBlur={() => this.setState({otpFocus: false})}
							round
							placeholder="Seach Account"
							isFocus={this.state.otpFocus}
							onChangeText={this.onChangeInput}
							value={search}
							returnKeyType='next'
							compName={"Search2"} />

						<FlatList
							style={[styles.flex1, styles.marb10, styles.marginTop5]}
							data={data}
							renderItem={this.renderItem}
							showsVerticalScrollIndicator={false}
							keyExtractor={(item, index) => `idx ${index}`} />
					
					</View>
					<Button onPress={this.onSubmit}
						style={styles.btnCreate} label={"+ Add Account"}/>
					<Button
						onPress={this.onBack}
						style={styles.btnCancel}
						label="Back"
						labelStyle={{color: Color.colorPrimaryDark}}/>
					<SafeAreaView />
				</View>
			</View>
		);
	}
}

SwitchScreen.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	navigation: PropTypes.object,
	wallet: PropTypes.object,
	register: PropTypes.object,
};
