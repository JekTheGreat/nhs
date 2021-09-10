/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-len */

/* eslint-disable */
import React from "react";
import { Text, View } from "react-native";
import Input from "./Input";
import Payment from "./Payment";
import PaymentLocal from "./PaymentLocal";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import Resource from "__src/resources";
import Button from "__src/components/Button";
import Categories from "./Categories";
import PlancodeTab from "./PlancodeTab";
import Product from "./Product";
import SubCategory from "./SubCategory";
import Countries from "./Countries";
import Contact from "./Contact";
import Header from "../Header";
import TransPass from "__src/components/TransPass";
import _ from "lodash";
const { Color } = Resource;

class International extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			currentPosition: 0, isContactVisible: false,
			isCountriesShow: false, TransPinValue: "",
			isShowTrans: false, error: {},
		};
	}

	componentDidMount() {
		const { actions, login: { session } } = this.props;

		actions.fetchCategories();
		actions.checkPrefixes(session.token);
		actions.setIntScreen("Input");
		// actions.resetLoading();
		// actions.setIntScreen("Categories");
	}

	componentDidUpdate(prevProps) {
		const { loading: { setIntScreen } } = this.props;

		if (!_.isEqual(prevProps.loading.setIntScreen, setIntScreen) && !_.isEmpty(setIntScreen)) {
			this.setState({ isContactVisible: false });
		}
	}

	_renderContent = () => {
		const { loading: { setIntScreen } } = this.props;

		switch (setIntScreen) {
		case "Input":
			return (<Input ref={(e) => this.Input = e} onContactShow={this.onShow}
				onPressCountry={this.onShowCountries} {...this.props} />);
		case "PlancodeTab":
			return <PlancodeTab ref={(e) => this.PlancodeTab = e} {...this.props} />;
		case "Categories":
			return <Categories ref={(e) => this.Categories = e} {...this.props} />;
		case "Product":
			return <Product ref={(e) => this.Product = e} {...this.props} />;
		case "SubCategory":
			return <SubCategory ref={(e) => this.SubCategory = e} {...this.props} />;
		case "Payment":
			return (<Payment ref={(e) => this.Payment = e}
				onShowTrans={() => this.setState({ isShowTrans: true })} {...this.props} />);
		case "PaymentLocal":
			return (<PaymentLocal ref={(e) => this.PaymentLocal = e}
				onShowTrans={() => this.setState({ isShowTrans: true })} {...this.props} />);
		}
	}

	renderMobileCard2 = () => {
		const { loading: { setIntScreen, IntSubCategories } } = this.props;
		let name = "";

		switch (setIntScreen) {
		case "Input":
			name =  "";
			break;
		case "Categories":
			name = "";
			break;
		case "Product":
		case "SubCategory":
			// name = IntSubCategories.name;
			break;
		case "Payment":
			name = "";
			break;
		}

		if (!_.isEmpty(name)) {
			return (
				<View style={[styles.cardView2, { backgroundColor: Color.Header }]}>
					<Text style={[styles.txt5, { color: Color.white, marginLeft: 0, padding: 7 }]}>
						{name}</Text>
				</View>
			);
		}

		return null;
	}

	onShowCountries = () => {
		const { isCountriesShow } = this.state;

		this.setState({ isCountriesShow: !isCountriesShow });
	}

	renderMobile = () => {
		const { loading: { setIntScreen } } = this.props;

		if (setIntScreen === "Input" || setIntScreen === "Success" ||
			setIntScreen === "Payment" || setIntScreen === "PaymentLocal") {
			return null;
		}

		return (<Header onPressCountry={this.onShowCountries}
			onContactShow={this.onShow} onSearch={this.onSearch}
			onChangeText={this.onChangeText} {...this.props} />);
	}

	onChangeText = (input) => {
		const { actions, loading: { setInputMerge } } = this.props;
		const params = _.merge({}, setInputMerge);

		if (params.code === "PHP") {
			if (input.startsWith("0")) {
				input = _.replace(input, "0", "9");
			}

			if (input.length <= 10) {
				params.mobile = input;

				actions.setInputMerge(params);
			}
		} else {
			params.mobile = input;

			actions.setInputMerge(params);
		}
	}

	onSearch = () => {
		const { actions, loading: { setInputMerge }, login: { currentAccount } } = this.props;
		const newInput = _.merge({}, setInputMerge);
		const error = {};

		if (_.isEmpty(setInputMerge.mobile)){
			error.mobile = "Mobile number is required";
		}

		this.setState({ error });

		if (_.isEmpty(error)) {
			newInput.userLevel = currentAccount.userLevel;
			newInput.localprefix = newInput.code === "PHP" ? `0${newInput.mobile.substr(0, 3)}` : "";

			actions.setInputMerge(newInput);
			actions.searchProduct(newInput);
		}
	}

	onSubmit = () => {
		const { loading: { setIntScreen } } = this.props;

		switch (setIntScreen) {
			case "Input":
				this.Input.onSubmit();
				break;
			case "PlancodeTab":
				this.PlancodeTab.onSubmit();
				break;
			case "Categories":
				this.Categories.onSubmit();
				break;
			case "Product":
				this.Product.onSubmit();
				break;
			case "SubCategory":
				this.SubCategory.onSubmit();
				break;
			case "Payment":
				this.Payment.onSubmit();
				break;
			case "PaymentLocal":
				this.PaymentLocal.onSubmit();
				break;
		}
	}

	onBack = () => {
		const { loading: { setIntScreen }, actions, navigation } = this.props;

		switch (setIntScreen) {
		case "Input":
			navigation.goBack();
			break;
		case "PlancodeTab":
			actions.setIntScreen("Input");
			break;
		case "Categories":
			actions.setIntScreen("Input");
			break;
		case "Product":
			actions.setIntScreen("Categories");
			break;
		case "SubCategory":
			actions.setIntScreen("Input");
			actions.selectedSubCategory({});
			break;
		case "Payment":
			actions.setIntScreen("SubCategory");
			break;
		case "PaymentLocal":
			actions.setIntScreen("PlancodeTab");
			break;
		}
	}

	label = () => {
		const { loading: { setIntScreen } } = this.props;

		if (setIntScreen === "Payment" || setIntScreen === "PaymentLocal"){
			return "Load Now";
		}

		return "Proceed";
	}

	onItemClick = (item) => {
		const { loading: { setInputMerge }, actions, login: { currentAccount } } = this.props;
		const newInput = _.merge({}, setInputMerge);

		newInput.code = _.toString(item.currency);
		newInput.prefix = _.toString(item.callingCode);
		newInput.country = item.name.common;
		newInput.userLevel = currentAccount.userLevel;
		newInput.mobile = "";
		actions.setInputMerge(newInput);
	}
	onShow = () => {
		this.setState({ isContactVisible: !this.state.isContactVisible });
	}

	onCloseContact = () => {
		this.setState({ isContactVisible: false });
	}

	onProceed = () => {
		const {actions, loading: {setInputMerge, selectedPlancode, selectedWallet,
			selectedSubCategory, IntSubCategories},
		login: {session, currentAccount}} = this.props;
		const {TransPinValue} = this.state;
		const error = {};
		const utcDate = `UPS${Math.floor(new Date().getTime() / 1000)}`;

		if (_.isEmpty(TransPinValue)){
			error.transpass = "No Transaction pin entered!";
		}

		this.setState({ error });

		if (_.isEmpty(error)) {
			if (setInputMerge.code === "PHP") {
				const param = {};

				param.contact = `${setInputMerge.prefix}${setInputMerge.mobile}`;
				param.denomination = selectedPlancode.denomination;
				param.amount = selectedPlancode.amount.toString();
				param.categoryId = selectedPlancode.categoryId;
				param.mobileNetworkId = selectedPlancode.mobileNetworkId;
				param.company = "UPS";
				param.platform = "mobile";
				param.system = "unified";
				param.currency = selectedWallet;
				param.type = "local";
				param.transactionId = utcDate;
				param.userLevel = currentAccount.userLevel;
				param.TransPinValue = TransPinValue;
				param.pin = TransPinValue;

				actions.loadNow(param, session.token);
			} else {
				const param = {};
				if (setInputMerge.prefix === "971") {
					param.mobile = `${setInputMerge.prefix}${parseFloat(setInputMerge.mobile)}`;
				} else {
					param.mobile = `${setInputMerge.prefix}${setInputMerge.mobile}`;
				}
				if (_.has(selectedSubCategory, "amount")) {
					param.amount = selectedSubCategory.amount;
				} else {
					param.amount = selectedSubCategory.minimum;
				}

				if (IntSubCategories.provider.toUpperCase() !== "DING") {
					param.mobileNetworkId = IntSubCategories.provider.replace(/\s/g, "");
				}
				
				param.code = selectedSubCategory.code;
				param.productName = selectedSubCategory.displayText;
				param.company = "UPS";
				param.currency = selectedWallet;
				param.platform = "mobile";
				param.system = "unified";
				param.type = "international";
				param.transactionId = utcDate;
				param.userLevel = currentAccount.userLevel;
				param.TransPinValue = TransPinValue;
				param.pin = TransPinValue;
				// param.fromCurrency = "PHP";
				// param.forexRate = getRates;
				// param.toCurrency = selectedSubCategory.provider === "Paythem" ? "QAR" : "AED";

				actions.loadNow(param, session.token);
			}
		}
	}

	render() {
		const { loading: { isLoadNow, isSearchingProduct, loadFailed } } = this.props;
		const { isCountriesShow, isContactVisible, TransPinValue, isShowTrans, error } = this.state;

		return (
			<View style={[styles.flex1, { backgroundColor: Color.white }]}>
				{this.renderMobile()}
				{this.renderMobileCard2()}
				{this._renderContent()}
				<Button onPress={this.onSubmit}
					loading={isLoadNow || isSearchingProduct}
					style={styles.btnCreate} label={this.label()}/>
				<Button
					onPress={this.onBack}
					style={styles.btnCancel}
					label="Back"
					labelStyle={{ color: Color.colorPrimaryDark }}/>
				<Countries visible={isCountriesShow} onItemClick={this.onItemClick}
					onClose={this.onShowCountries} />
				<Contact visible={isContactVisible} onClose={this.onCloseContact} {...this.props}/>
				<TransPass visible={isShowTrans} value={TransPinValue} isLoad={isLoadNow ? "Loading" : ""}
					onChangeText={(e) => this.setState({TransPinValue: e.replace(/[^0-9]/g, "")})} error ={error.transpass || loadFailed}
					onCancel={() => {
						this.setState({isShowTrans: false, TransPinValue: ""});
					}} onProceed={this.onProceed} maxLength={6}/>
			</View>
		);
	}
}

International.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	profile: PropTypes.object,
	loading: PropTypes.object,
	navigation: PropTypes.object,
};

export default International;
