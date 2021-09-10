import React, {PureComponent} from "react";
import {View, Text, TextInput,
	FlatList, StyleSheet} from "react-native";
import styles from "../../styles.css";
import {Card} from "native-base";
import Resources from "__src/resources";
import {Icon} from "react-native-elements";
import RenderItem from "./RenderItem";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import PlanListScreenInt from "./PlanListScreenInt";
import _ from "lodash";
import PropTypes from "prop-types";
const { Color } = Resources;

export default class SubCategory extends PureComponent{
	constructor(props){
		super(props);
		const {loading: {selectedIntProduct}} = props;

		this.state = {
			selectedItem: {},
			amount: "",
			error: {},
			plancodes: selectedIntProduct,
		};
	}

  onSelection = (item) => {
  	const {actions} = this.props;
  	const selectedItem = {};
  	const value = !selectedItem[item.displayText];

  	if (value) {
  		selectedItem[item.displayText] = true;
  		actions.selectedSubCategory(item);
  	}
  	console.log("ITEM", selectedItem);
  	this.setState({selectedItem, error: {}});
  }

  renderItem = ({item, idx}) => {
  	const {selectedItem} = this.state;
  	const selected = selectedItem[item.displayText] ? {backgroundColor: Color.LightBlue} : null;
  	
  	return (
  		<RenderItem	key={`key${idx}`} isInternational
			 	onPress={() => this.onSelection(item)}
  			item={item} selected={selected}/>
  	);
  }

	onSubmit = () => {
		this.planlist.onSubmit();
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

	onChangeText = (val) => {
		const {loading: { selectedIntProduct}, actions} = this.props;
		const item = selectedIntProduct.product[0];
		const error = {};
		if (_.isEmpty(val)){
			error.amount = "Please enter amount.";
		} else if (val < item.minimum || val > item.maximum){
			error.amount = `Input amount between (${item.minimum} - ${item.maximum})`;
		}

		this.setState({amount: val});

		item.amount = val;
		actions.selectedSubCategory(item);
		actions.convertAmountInput(val);
	}

	onChangeEmail = (val) => {
		const {loading: { selectedSubCategory}, actions} = this.props;
		const item = _.merge({}, selectedSubCategory);
		const error = {};
		if (_.isEmpty(val)){
			error.amount = "Email address is required.";
		}
		this.setState({error});

		item.email = val;
		actions.selectedSubCategory(item);
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
				ListFooterComponent={<View style={styles1.height50}/>}
				renderItem={this.renderItem}
				keyExtractor={(item, index) => `idx ${index}`}/>
		);
	}

	renderInput = () => {
		const {loading: {selectedIntProduct, setInputMerge, IntSubCategories}} = this.props;
		const {amount} = this.state;
		const item = selectedIntProduct.product[0];
		const isUAE = !!(setInputMerge.prefix === "971" &&
		IntSubCategories.provider.toUpperCase() === "ONE PREPAY");
		const amountRange = isUAE ? `${item.minimum}` :
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
		
		return null;
	}

	getProduct = () => {
		const {loading: {IntSubCategories}} = this.props;
		const array = [];
		if (!_.isEmpty(IntSubCategories)) {
			if (!_.isEmpty(IntSubCategories.categories.bundle)){
				array.push({name: "Bundle", id: "Bundle" });
			}
	
			if (!_.isEmpty(IntSubCategories.categories.data)){
				array.push({name: "Data", id: "Data"});
			}
	
			if (!_.isEmpty(IntSubCategories.categories.topup)){
				array.push({name: "Topup", id: "Topup"});
			}
		}

		return array;
	}

	getPlancodes = (product) => {
		const {loading: {IntSubCategories}} = this.props;
		let planlist ;
		if (!_.isEmpty(IntSubCategories)) {
			if (product.toLowerCase() === "bundle"){
				planlist = {name: "Bundle", product: IntSubCategories.categories.bundle };
			} else if (product.toLowerCase() === "data"){
				planlist = {name: "Data", product: IntSubCategories.categories.data };
			} else if (product.toLowerCase() === "topup"){
				planlist = {name: "Topup", product: IntSubCategories.categories.topup };
			} else {
				planlist = {};
			}
		}

		return planlist;
	}

	render(){
		const {actions} = this.props;

  	return (
  		<View style={styles1.flex1}>
				<ScrollableTabView tabBarUnderlineStyle={styles1.tabBarUnderlineStyle}
					ref={(e) => this.tabRef = e}
					renderTabBar={() => (<ScrollableTabBar style={styles1.tabStyle}
						tabStyle={styles1.tabStyle} />)}
					onChangeTab={(child) => {
						const selectNetwork = _.has(child, "ref.props.item.id") ? child.ref.props.item.id : "Topup";
						
						actions.selectedIntProduct(this.getPlancodes(selectNetwork));
					}}
					// page={_.findIndex(this.getCategories(), { 'id': selectNetwork})}
					style={styles1.tabStyle}
					tabBarTextStyle={styles1.textStyle}
					tabBarInactiveTextColor={Color.Standard}
					tabBarActiveTextColor={Color.white}>
					{this.getProduct().map((item, idx) => {
						return (
							<PlanListScreenInt ref={(e) => this.planlist = e}
								{...this.props}
								tabLabel={item.name} key={`idx ${idx}`}
								onSelectedItem={(item) => this.setState({selectedItem: item})}
								item={item}
							/>
						);
					})}
				</ScrollableTabView>
  		</View>
  	);
	}
}

const styles1 = StyleSheet.create({
	flex1: {flex: 1},
	tabBarUnderlineStyle: {height: 0, backgroundColor: Color.colorPrimary},
	tabStyle: {backgroundColor: Color.Header, marginBottom: 0, height: 40},
	textStyle: { fontFamily: "Roboto-Light", fontSize: 12, color: Color.white},
	height50: {height: 50},
});

SubCategory.propTypes = {
	actions: PropTypes.object,
	loading: PropTypes.object,
	item: PropTypes.object,
};
