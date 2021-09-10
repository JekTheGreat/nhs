/* eslint-disable eqeqeq */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TextInput,
	FlatList, ScrollView} from "react-native";
import styles from "../../styles.css";
import {Card} from "native-base";
import Resources from "__src/resources";
import {Icon} from "react-native-elements";
import _ from "lodash";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
import PlanListItem from "./PlanListItem";
const { Color } = Resources;
const height30 = {height: 30};

export default class PlanListScreen extends PureComponent{
	constructor(props){
		super(props);
		const {loading: {searchProduct}, item} = props;

		this.state = {
			selectedItem: {},
			amount: "",
			error: {},
			plancodes: _.sortBy(searchProduct, ["amount"], ["asc"]),
			categoryId: item.id ? item.id : "LOAD",
		};
	}

	componentDidUpdate(prevProps){
		const {loading: {searchProduct}} = this.props;

		if (prevProps.loading.searchProduct !== searchProduct){
			this.setState({plancodes: _.sortBy(searchProduct, ["amount"], ["asc"]) });
		}
	}

  onSelection = (item) => {
  	const {actions} = this.props;
  	const selectedItem = {};
  	const value = !selectedItem[item.id];

  	if (value) {
  		selectedItem[item.id] = true;
  		actions.selectedPlancode(item);
		  
  	}
		
  	this.setState({selectedItem, error: {}, amount: item.amount.toString()});
  }
	
  onCategoryID (item) {
  	const {actions, loading: {setInputMerge}} = this.props;
  	const params = {...setInputMerge};
  	params.categoryId = item.ref.props.item.id;
		
  	actions.searchProduct(params);
  }

	renderLoad = ({item, idx}) => {
  	const {selectedItem} = this.state;
  	const selected = selectedItem[item.id] ? {backgroundColor: Color.LightBlue} : null;
		
  	return (
			<PlanListItem onPress={() => this.onSelection(item)}
				isRegular key={`key${idx}`}
  			item={item} selected={selected}/>
  	);
	}
	
	renderData = ({item, idx}) => {
  	const {selectedItem} = this.state;
  	const selected = selectedItem[item.id] ? {backgroundColor: Color.LightBlue} : null;
		
  	return (
			<PlanListItem key={`key${idx}`}
				onPress={() => this.onSelection(item)}  item={item} selected={selected}/>
		);
	}

	renderItem = (item) => {
		const {categoryId} = this.state;

		switch (categoryId){
		case "CALL":
			return this.renderData(item);
		case "DATA":
			return this.renderData(item);
		case "COMBO":
			return this.renderData(item);
		case "GAMING":
			return this.renderData(item);
		default:
			return this.renderLoad(item);
		}
	}
	
	onChangeText = (value) => {
		const {loading: {searchProduct}} = this.props;
		
		let newPlancodes = [];

		if (_.isEmpty(value)){
			newPlancodes = _.sortBy(searchProduct, ["amount"], ["asc"]);
			this.setState({selectedItem: {}});
		} else {
			newPlancodes = _.filter(searchProduct, (item) => {
				return item.amount ===  parseFloat(value);
			});

			if (!_.isEmpty(newPlancodes)){
				this.onSelection(newPlancodes[0]);
			}
		}
		this.setState({plancodes: newPlancodes, amount: value.replace(/[^\w\s]/gi, "")});
	}

	renderRegular = () => {
		const {amount, categoryId} = this.state;

		if (_.isEmpty(categoryId) || categoryId !== "LOAD"){
			return;
		}
		
		return (
			<Card style={styles.cardView1}>
				<View style={styles.renderBaseWrapper}>
					<TextInput style={styles.input4}
						keyboardType="decimal-pad" value={amount}
						returnKeyType="done"
						maxLength={5} placeholder="Enter Amount"
						onChangeText={this.onChangeText}/>
					<Text style={styles.input2}>PHP</Text>
				</View>
				<Text style={[styles.input3, styles.alignSelf]}>10-1000</Text>
			</Card>
		);
	}

	onSubmit = () => {
		const {actions, loading: {setInputMerge, selectedPlancode}, wallet: {walletSelected},
			login: {currentAccount, session}} = this.props;
		const {selectedItem, amount, plancodes} = this.state;
		const error = {};
		const params = {};
		if (_.isEmpty(selectedItem) && amount === "") {
			error.amount = "Please input or select amount";
		} else if (_.isEmpty(plancodes) && amount !== "") {
			error.amount = "Entered amount is not available";
		} else if (setInputMerge.mobile.length < 10) {
			error.amount = "Invalid mobile number";
		}

		if (_.isEmpty(error)){
			params.currency = walletSelected.code;
			params.type = setInputMerge.prefix == "63" ? "local" : "international";
			params.amount = selectedPlancode.amount;
			params.system = "unified";
			params.userLevel = currentAccount.userLevel;
			params.denomination = selectedPlancode.denomination;
			params.mobileNetworkId = selectedPlancode.mobileNetworkId;
			params.mobile = setInputMerge.prefix + setInputMerge.mobile;
			actions.convertLoad(params, session.token);
			actions.selectedWallet(walletSelected.code);
			actions.setIntScreen("PaymentLocal");
		} else {
			this.setState({error});
		}

		console.log(error);
	}

	renderError = () => {
		const {error} = this.state;

		if (!_.isEmpty(error)){
			return (
				<Card style={[styles.inpuView1, styles.cardView3]}>
					<Icon containerStyle={styles.iconContainerStyle}
						name='close-circle' type="material-community" color={Color.red} size={15} />
					<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
						{error.amount}</Text>
				</Card>
			);
		}
	}

	render(){
		const { plancodes} = this.state;
		const {loading: {isSearchingProduct}} = this.props;

		if (isSearchingProduct){
			return <Loading customStyle={{backgroundColor: Color.bg}} size="small"/>;
		}

  	return (
  		<View style={[styles.mainContainer]}>
  			<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.zIndex1}>
						{this.renderRegular()}
						{this.renderError()}
					</View>
  				<FlatList
  					data={plancodes}
						extraData={this.state}
						ListEmptyComponent={<Text style={[styles.txt4, styles.marT10]}>
						No item available!</Text>}
						ListFooterComponent={<View style={height30}/>}
  					renderItem={this.renderItem}
  					keyExtractor={(item, index) => `idx ${index}`}/>
  			</ScrollView>
  		</View>
  	);
	}
}

PlanListScreen.propTypes = {
	actions: PropTypes.object,
	loading: PropTypes.object,
	item: PropTypes.object,
	login: PropTypes.object,
	wallet: PropTypes.object,
};
