/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-len */

/* eslint-disable */
import React from "react";
import { Text, View, Image, Alert, TouchableOpacity} from "react-native";
import Input from "./CardTab";
import Payment from "./Payment";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import Resource from "__src/resources";
import Button from "__src/components/Button";
import PlancodeTab from "./PlancodeTab";
import Countries from "./Countries";
import Contact from "./Contact";
import Header from "./Header";
import TransPass from "__src/components/TransPass";
import _ from "lodash";
const {Res, Color} = Resource;

class Inventory extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			currentPosition: 0, isContactVisible: false,
			isCountriesShow: false, TransPinValue: "",
			isShowTrans: false, error: {},
			category: "",
		};
	}
	componentDidMount(){
		const {actions, login:{session}} = this.props;
		// const params = {
		// 	skip: 0,
		// 	limit: 20,
		// };
		
		// const param = {};
		// param.token = session.token;
		// param.system = "unified";

		// actions.getCurrentReports(params, param, session.token);
		actions.setScreenInventory("PlancodeTab");
		actions.setPlancodeTab("Products");
		actions.selectNetwork("CARDS");
		actions.resetError();
	}
	componentDidUpdate(prevProps){
		const {loading: {setScreenInventory, getSearchInventory, getReports}, actions} = this.props;
		const searchInventory = _.has(getSearchInventory, "data") ? getSearchInventory.data : getSearchInventory.item;

		if (!_.isEqual(prevProps.loading.setScreenInventory, setScreenInventory) && !_.isEmpty(setScreenInventory)){
			this.setState({isContactVisible: false});
		}

		if (!_.isEqual(prevProps.loading.getSearchInventory, getSearchInventory) && _.isEmpty(searchInventory)){
			Alert.alert("Notice", "Invalid Plan Code");
		}

		// if (!_.isEqual(prevProps.loading.getReports, getReports) &&
		// 	!_.isEmpty(getReports)){
		// 	const inventory = _.filter(getReports, {"mobileNetworkId": "INVENTORY"});
		// 	actions.getRecentInventory(inventory[0]);
		// }
	}
	
	_renderContent = () => {
		const { loading: {setScreenInventory}} = this.props;

		switch (setScreenInventory) {
		case "Input":
			return <Input ref={(e) => this.Input = e} onContactShow={this.onShow} 
			onPressCountry={this.onShowCountries} {...this.props}/>;
		case "PlancodeTab":
			return <PlancodeTab ref={(e) => this.PlancodeTab = e} {...this.props}/>;
		case "Payment":
			return <Payment ref={(e) => this.Payment = e}
				onShowTrans={() =>this.setState({isShowTrans: true})} {...this.props}/>;
		}
	}

	onShowCountries = () => {
		const {isCountriesShow} = this.state;

		this.setState({isCountriesShow: !isCountriesShow})
	}

	renderCurrentCategory = () => {
		const {loading: {selectNetwork}} = this.props;
	
		switch (selectNetwork) {
		case "CARDS":
			return "Call Cards";
		case "GAMING":
			return "Gaming Pins";
		case "SATELLITE":
			return "Satellite Cards";
		case "OTHERS":
			return "Other Cards";
		default:
			return "N/A";
		}
	};

	renderMobile = () => {
		const {loading: {setScreenInventory, setPlancodeTabScreen}, actions} = this.props;

		if (setScreenInventory === "Input" || setScreenInventory === "Success" || 
			setScreenInventory === "Payment"){
			return null;
		}

		return (
			<View>
				<Header onPressCountry={this.onShowCountries} 
				onContactShow={this.onShow} onSearch={this.onSearch} 
				onChangeText={this.onChangeText(1)} {...this.props}
				onChangeText1 ={this.onChangeText(2)}
				onSearch = {this.checkSearchString}
				category = {this.renderCurrentCategory()}
				onRecent = {() => {
					if(setPlancodeTabScreen === "Recent"){
						actions.setPlancodeTab("Products");
					} else {
						actions.setPlancodeTab("Recent");
					}
				}}
				options = {[
					{ label: "Call Cards", value: "CARDS" },
					{ label: "Gaming Pins", value: "GAMING" },
					{ label: "Satellite", value: "SATELLITE" },
					{ label: "Others", value: "OTHERS" },
				]}
				onChangeCategory = {(value) => this.setState({category: value})}
				/>
				
			</View>
			);
	}
	

	checkSearchString = () => {
		const {loading: {searchInputInventory, selectNetwork}, login:{session}, actions} = this.props;
		const params = {};
		params.category = selectNetwork;
		params.search = searchInputInventory.toUpperCase();
		if(_.isEmpty(searchInputInventory)){
			Alert.alert("Notice", "Please enter a product/plan code to be searched");
		} else {
			actions.getSearchInventory(params, session.token);
			actions.setPlancodeTab("Search");
		}
	}

	onChangeText = (type) => (input) => {
		const { actions, loading: {setInputInventory}} = this.props;
		const params = _.merge({}, setInputInventory);
		switch(type){
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
				actions.setSearchInventory(input);
				actions.setPlancodeTab("Products");
		}
	}

	onSearch = () => {
		const {actions, loading: {setInputInventory}, login: {currentAccount}} = this.props;
		const newInput = _.merge({}, setInputInventory);
		const error = {};

		if (_.isEmpty(setInputInventory.mobile)){
			error.mobile = "Mobile number is required.";
		}

		this.setState({error});

		if (_.isEmpty(error)){
			newInput.userLevel = currentAccount.userLevel;
			newInput.localprefix = newInput.code === "PHP" ? `0${newInput.mobile.substr(0, 3)}` : "";
			
			actions.setInputInventory(newInput);
			actions.searchProduct(newInput);
		}
	}

	onSubmit = () => {
		const { loading: {setScreenInventory}} = this.props;

		switch (setScreenInventory) {
		case "Input":
			this.Input.onSubmit();
			break;
		case "PlancodeTab":
			this.PlancodeTab.onSubmit();
			break;
		case "Payment":
			this.Payment.onSubmit();
			break;
		}
	}

	onBack = () => {
		const { loading: {setScreenInventory}, actions, navigation} = this.props;

		switch (setScreenInventory) {
		case "Input":
			actions.setScreenInventory("PlancodeTab");
			actions.setPlancodeTab("Products");
			break;
		case "PlancodeTab":
			navigation.goBack();
		break;
		case "Payment":
			actions.setScreenInventory("Input");
			actions.resetError();
			break;
		}
	}

	label = () => {
		const { loading: {setScreenInventory}} = this.props;

		if (setScreenInventory === "PlancodeTab"){
			return "Continue";
		}
		
		return "Proceed";
	}

	onItemClick = (item) => {
		const {loading: {setInputInventory}, actions, login: {currentAccount}} = this.props;
		const newInput = _.merge({}, setInputInventory);

		newInput.code = _.toString(item.currency);
		newInput.prefix = _.toString(item.callingCode);
		newInput.country = item.name.common;
		newInput.userLevel = currentAccount.userLevel;
		newInput.mobile = "";
		actions.setInputInventory(newInput);
	}

	onShow = () => {
		this.setState({isContactVisible: !this.state.isContactVisible});
	}

	onCloseContact = () => {
		this.setState({isContactVisible: false});
	}

	onProceed = () => {
		const {actions, loading: {setInputInventory, selectedInventory, selectedWallet},
			wallet: {getRates, convertedValuetoRecieved},
			login: {session, currentAccount}} = this.props;
		const {TransPinValue} = this.state;
		const error = {};

		if(_.isEmpty(TransPinValue)){
			error.transpass = "This field is required";
		}

		this.setState({error});
		if (_.isEmpty(error)){
			const param = {};
			const utcDate = `UPS${Math.floor(new Date().getTime() / 1000)}`;
			if(selectedInventory.isInternational == 0 || false){
				param.contact = `${setInputInventory.prefix}${setInputInventory.mobile}`;
				param.denomination = selectedInventory.denomination;
				param.amount = selectedInventory.amount.toString();
				param.categoryId = selectedInventory.categoryId;
				param.mobileNetworkId = selectedInventory.mobileNetworkId;
				param.company = "UPS";
				param.platform = "mobile";
				param.service = "loading"
				param.system = "unified";
				param.currency = selectedWallet;
				param.type = "local";
				param.transactionId = `${utcDate}`; 
				param.userLevel = currentAccount.userLevel;
				param.TransPinValue = TransPinValue;
				param.pin = TransPinValue;
			} else {
				param.amount = selectedInventory.amount;
				param.code = selectedInventory.denomination;
				param.productName = selectedInventory.name;
				param.currency = selectedWallet;
				param.platform = "mobile";
				param.email = `${setInputInventory.email}`;
				param.mobileNetworkId = selectedInventory.provider;
				param.productName = selectedInventory.name;
				param.service = "loading";
				param.type = "international";
				param.company = "UPS";
				param.system = "unified";
				param.pin = TransPinValue;
				param.userLevel = currentAccount.userLevel;
				param.transactionId = `${utcDate}`;
			}
			
			actions.loadNowInventory(param, session.token);
		}
	}
	
	render() {
		const {loading: {isLoadNowInventory, isSearchingInventory, loadInventoryFailed,
				loadComputation, setScreenInventory}} = this.props;
		const { isCountriesShow, isContactVisible, TransPinValue, isShowTrans, error } = this.state;
	
			return (
				<View style={[styles.flex1, {backgroundColor: Color.white}]}>
					{this.renderMobile()}
					{this._renderContent()}
					{
						setScreenInventory === "Payment" && _.isEmpty(loadComputation) ?
						<Button onPress={this.onSubmit}
							loading={isLoadNowInventory || isSearchingInventory}
							style={styles.btnCreate} label={this.label()}
							disabled/> :
						<Button onPress={this.onSubmit}
						loading={isLoadNowInventory || isSearchingInventory}
						style={styles.btnCreate} label={this.label()}/>
					}
					<Button
						onPress={this.onBack}
						style={styles.btnCancel}
						label="Back"
						labelStyle={{color: Color.colorPrimaryDark}}/>
					<Countries visible={isCountriesShow} onItemClick={this.onItemClick}
						onClose={this.onShowCountries} />
					<Contact visible={isContactVisible} onClose={this.onCloseContact} {...this.props} />
					<TransPass visible={isShowTrans} value={TransPinValue} isLoad={isLoadNowInventory ? "Loading" : ""}
						onChangeText={(e) => this.setState({TransPinValue: e})} error={error.transpass || loadInventoryFailed}
						onCancel={() => {
							this.setState({isShowTrans: false, TransPinValue: ""});
							}} onProceed={this.onProceed}/>
				</View>
			);
		}
	}

Inventory.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	profile: PropTypes.object,
	loading: PropTypes.object,
	navigation: PropTypes.object,
};

export default Inventory;
