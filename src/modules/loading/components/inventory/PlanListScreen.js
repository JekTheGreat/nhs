/* eslint-disable eqeqeq */
import React, {PureComponent} from "react";
import {View, Text,
	FlatList} from "react-native";
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
		this.onEndReachedCalledDuringMomentum = true;
		const {loading: {searchInventory}, item} = props;

		this.state = {
			selectedItem: {},
			amount: "",
			error: {},
			plancodes: _.sortBy(searchInventory,
				(obj) => {
					return parseInt(obj.amount, 10);
				}, ["asc"]),
			categoryId: item.id ? item.id : "CARDS",
			limit: 20,
		};
	}

	componentDidUpdate(prevProps){
		const {loading: {searchInventory}} = this.props;

		if (prevProps.loading.searchInventory !== searchInventory){
			this.setState({plancodes: _.sortBy(searchInventory,
				(obj) => {
					return parseInt(obj.amount, 10);
				}, ["asc"]) });
		}
	}

  onSelection = (item) => {
  	const {actions} = this.props;
  	const selectedItem = {};
  	const value = !selectedItem[item.denomination];

  	if (value) {
  		selectedItem[item.denomination] = true;
  		actions.selectedInventory(item);
  	}
		
  	this.setState({selectedItem, error: {}});
  }
	
	renderItem = ({item, idx}) => {
  	const {selectedItem} = this.state;
  	const selected = selectedItem[item.denomination] ? {backgroundColor: Color.LightBlue} : null;
		
  	return (
			<PlanListItem key={`key${idx}`}
				onPress={() => this.onSelection(item)}  item={item} selected={selected}/>
		);
	}

	onSubmit = () => {
		const {actions, wallet: {walletSelected}} = this.props;
		const {selectedItem} = this.state;
		const error = {};
		if (_.isEmpty(selectedItem)){
			error.amount = "Please select a plancode";
		}
	
		if (_.isEmpty(error)){
			actions.selectedWallet(walletSelected.code);
			actions.setScreenInventory("Input");
		} else {
			this.setState({error});
			this.plancodeList.scrollToIndex({animated: true, index: 0});
		}
	
		// console.log(error);
	}

	renderError = () => {
		const {error} = this.state;

		if (!_.isEmpty(error)){
			return (
				<Card style={[styles.inpuView1, styles.cardView3]}>
					<Icon containerStyle={styles.iconContainerStyle}
						name="close-circle" type="material-community" color={Color.red} size={15} />
					<Text style={[styles.txt3, {color: Color.red}, styles.flex1]}>
						{error.amount}</Text>
				</Card>
			);
		}
	}
	
	fetchData = () => {
		const {loading: {setInputInventory, selectNetwork},
			login: {currentAccount}, actions} = this.props;
		const {limit} = this.state;
		const params = {...setInputInventory};
		this.setState({limit: limit + 10});
		params.categoryId = selectNetwork;
		params.userLevel = currentAccount.userLevel;
		params.limit = limit + 10;
				
		actions.searchInventory(params);
	}

	onEndReached = () => {
		if (!this.onEndReachedCalledDuringMomentum){
			this.fetchData();
			this.onEndReachedCalledDuringMomentum = true;
		}
	}

	render(){
		const { plancodes} = this.state;
		const {loading: {isSearchingInventory}} = this.props;

		if (isSearchingInventory){
			return <Loading customStyle={{backgroundColor: Color.bg}} size="small"/>;
		}

  	return (
  		<View style={[styles.mainContainer]}>
				<View style={styles.zIndex1}>
					{this.renderError()}
				</View>
  				<FlatList
					ref={(e) => this.plancodeList = e}
  					data={plancodes}
					extraData={this.state}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={<Text style={[styles.txt4, styles.marT10]}>
						No plancode available!</Text>}
					ListFooterComponent={<View style={height30}/>}
  					renderItem={this.renderItem}
  					keyExtractor={(item, index) => `idx ${index}`}
					onEndReached={this.onEndReached.bind(this)}
					onEndReachedThreshold={1}
					onMomentumScrollBegin={() => {
						this.onEndReachedCalledDuringMomentum = false;
					}}
				/>
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
