/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from "react";
import {View, Text, TextInput,
	FlatList} from "react-native";
import styles from "../../styles.css";
import {Icon} from "react-native-elements";
import RenderItem from "./RenderItem";
import {Card} from "native-base";
import Resources from "__src/resources";
import _ from "lodash";
import PropTypes from "prop-types";

const {Color} = Resources;

export default class PlanListScreenInt extends PureComponent{
	constructor(props){
		super(props);
		const {item} = props;

		this.state = {
			selectedItem: {},
			amount: "",
			error: {},
			categoryId: item.id ? item.id : "LOAD",
		};
	}

	onChangeText = (val) => {
		const {loading: { selectedIntProduct, IntSubCategories, setInputMerge},
			actions} = this.props;
		const isUAE = !!(setInputMerge.prefix === "971" &&
				IntSubCategories.provider.toUpperCase() === "ONE PREPAY");
		let item = selectedIntProduct.product[0];
		const error = {};
		if (_.isEmpty(val)){
			error.amount = "Please enter amount.";
		} else if ( !isUAE && (val < item.minimum || val > item.maximum)){
			error.amount = `Input amount between (${item.minimum} - ${item.maximum})`;
		}

		if (isUAE && IntSubCategories.name === "DU UAE") {
			item = _.find(selectedIntProduct.product, { code: "DUCTOP"});
		} else if (isUAE && IntSubCategories.name !== "DU UAE") {
			item = _.find(selectedIntProduct.product, { code: "ETSTOP"});
		}

		this.setState({amount: val});

		item.amount = val;
		actions.selectedSubCategory(item);
		actions.convertAmountInput(val);
	}

	renderEmail = () => {
		const {loading: {selectedSubCategory}} = this.props;

		if (selectedSubCategory.provider === "Paythem" || selectedSubCategory.provider === "One Prepay"){
			return (
				<Card style={[styles.cardView1, styles.marB10]}>
					<View style={styles.renderBaseWrapper}>
						<TextInput style={styles.input4}
							keyboardType="email-address"
							value={selectedSubCategory.email}
							placeholder="Enter Email Address"
							onChangeText={this.onChangeEmail}/>
					</View>
				</Card>
			);
		}
	}
	
		
	renderInput = () => {
		const {loading: {selectedIntProduct, setInputMerge, IntSubCategories}} = this.props;
		const {amount} = this.state;
		const item = selectedIntProduct.product[0];
		const isUAE = !!(setInputMerge.prefix === "971" &&
				IntSubCategories.provider.toUpperCase() === "ONE PREPAY");
		const amountRange = isUAE ? "5 to 525" :
			`${item.minimum} - ${item.maximum}`;
		
		return (
			<Card style={styles.cardView1}>
				<View style={styles.renderBaseWrapper}>
					<TextInput style={styles.input4}
						keyboardType="decimal-pad"
						returnKeyType="done"
						value={amount}
						maxLength={6} placeholder="Enter Amount"
						onChangeText={this.onChangeText}/>
					<Text style={styles.input2}>{item.receiveCurrency}</Text>
				</View>
				<Text style={[styles.input3, styles.alignSelf]}>{amountRange}</Text>
			</Card>
		);
	};

	onSubmit = () => {
		const {actions, loading: {selectedIntProduct, selectedSubCategory,
			setInputMerge, IntSubCategories},
		wallet: {walletSelected}, login: {currentAccount, session}} = this.props;
		const {amount, selectedItem} = this.state;
		const item = selectedIntProduct.product[0];
		const length = selectedIntProduct.product.length;
		const params = {};
		const isUAE = !!(setInputMerge.prefix === "971" &&
		IntSubCategories.provider.toUpperCase() === "ONE PREPAY");

		console.log("length", length);

		// const amountParam = IntSubCategories.provider.toUpperCase() == "DING" ? "" :
		// 	_.isEmpty(selectedItem) ? amount : selectedSubCategory.maxSendValue;
		// const mobileNetworkId = IntSubCategories.provider.toUpperCase() == "DING" ?
		// "" : IntSubCategories.provider;
		// const mobile = IntSubCategories.provider.toUpperCase() == "DING" ?
		// 	`${setInputMerge.prefix}${setInputMerge.mobile}` : "";
		const amountParam = _.isEmpty(selectedItem) ? amount : selectedSubCategory.minimum;
		const mobile = IntSubCategories.provider.toUpperCase() === "PAYTHEM" ?
			"" : `${setInputMerge.prefix}${setInputMerge.mobile}`;
		
		const error = {};

		if (_.isEmpty(amount) && length === 1){
			error.amount = "Please input or select amount";
		} else if (_.isEmpty(amount) && isUAE){
			error.amount = "Please input or select amount";
		} else if ((amount < item.minimum || amount > item.maximum) && length === 1){
			error.amount = `Input amount between (${item.minimum} - ${item.maximum})`;
		} else if ((amount < 5 || amount > 525) && isUAE){
			error.amount = "Input amount between (5 - 525)";
		} else if (_.isEmpty(selectedItem) && length > 1 && !isUAE){
			error.amount = "Please input or select amount";
		}
		// else if((selectedSubCategory.provider === "Paythem" ||
		// selectedSubCategory.provider === "One Prepay")
		// 	&& _.isEmpty(selectedSubCategory.email)){
		// 	error.amount = `Email address is required.`;
		// }

		this.setState({error});

		if (_.isEmpty(error)){
			actions.setIntScreen("Payment");
			params.currency = walletSelected.code;
			params.type = setInputMerge.prefix === "63" ?
				"local" : "international";
			params.amount = amountParam;
			params.system = "unified";
			params.userLevel = currentAccount.userLevel;
			params.denomination = selectedSubCategory.code;
			params.mobileNetworkId = IntSubCategories.provider;
			params.mobile = mobile;
			actions.convertLoad(params, session.token);
			actions.selectedWallet(walletSelected.code);
		}
	}

	onSelection = (item) => {
  	const {actions} = this.props;
  	const selectedItem = {};
  	const value = !selectedItem[item.displayText + item.minimum];

  	if (value) {
  		selectedItem[item.displayText + item.minimum] = true;
  		actions.selectedSubCategory(item);
  	}
  	console.log("ITEM", selectedItem);
  	this.setState({selectedItem, error: {}});
	}
	
	renderItem = ({item, idx}) => {
		const {loading: {IntSubCategories, setInputMerge, selectedIntProduct}} = this.props;
		const {selectedItem} = this.state;
		const selected = selectedItem[item.displayText + item.minimum] ?
			{backgroundColor: Color.LightBlue} : null;
		let isDingSGData  = false;
		if (!_.isEmpty(IntSubCategories) && !_.isEmpty(selectedIntProduct)) {
			isDingSGData = !!(setInputMerge.prefix === "65" && IntSubCategories.provider === "Ding" &&
			selectedIntProduct.name === "Data");
		}

		return (
			<RenderItem	key={`key${idx}`} isInternational
				IsDingSG = {isDingSGData}
					 onPress={() => this.onSelection(item)}
				item={item} selected={selected}/>
		);
	}
		
		renderList = () => {
			const {loading: {selectedIntProduct}} = this.props;
	
			return (
				<FlatList
					showsVerticalScrollIndicator={false}
					data={selectedIntProduct.product}
					extraData={this.state}
					ListEmptyComponent={<Text style={[styles.txt4, styles.marT10]}>
					No item available!</Text>}
					ListFooterComponent={<View style={{height: 50}}/>}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => `idx ${index}`}/>
			);
		}

		renderError = () => {
			const {error} = this.state;
	
			if (!_.isEmpty(error)){
				return (
					<Card style={[styles.inpuView1]}>
						<Icon containerStyle={styles.iconContainerStyle}
							name="close-circle" type="material-community" color={Color.red} size={15} />
						<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
							{error.amount}</Text>
					</Card>
				);
			}
		}

		render() {
    	const {loading: {selectedIntProduct, setInputMerge, IntSubCategories}} = this.props;

			const length = selectedIntProduct.product.length;
			const isEqual = _.isEqual(selectedIntProduct.product[0].minimum,
				selectedIntProduct.product[0].maximum);
			const isUAE = !!(setInputMerge.prefix === "971" &&
		IntSubCategories.provider.toUpperCase() === "ONE PREPAY");
    	
			return (
  		<View style={[styles.mainContainer]}>
    			{this.renderError()}
    			{this.renderEmail()}
					{(length === 1 && !isEqual)  || isUAE ?
						this.renderInput() : this.renderList()}
  		</View>
  	);
		}
}


PlanListScreenInt.propTypes = {
	actions: PropTypes.object,
	loading: PropTypes.object,
	item: PropTypes.object,
	login: PropTypes.object,
	wallet: PropTypes.object,
};
