/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable newline-before-return */
/* eslint-disable import/named */
import React, {PureComponent} from "react";
import {View, StyleSheet, Animated, FlatList, Text } from "react-native";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import Resource from "__src/resources";
import {Card} from "native-base";
import _ from "lodash";
import {Icon} from "react-native-elements";
import PlanListScreen from "./PlanListScreen";
import PropTypes from "prop-types";
import PlanListItem from "./PlanListItem";
import Loading from "__src/components/Loading";
import Styles from "../../styles.css";

const {Color} = Resource;
const height30 = {height: 30};

export default class PlancodeTab extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			selectedItem: "",
		};
		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);

		this.animatePress = new Animated.Value(1);
	}
	componentDidMount() {
		const {actions, loading: {setInputInventory}, login: {currentAccount}} = this.props;

		const params = {...setInputInventory};
		params.categoryId = "CARDS";
		params.userLevel = currentAccount.userLevel;
		params.limit = 20;
			
		actions.searchInventory(params);
	}

	componentDidUpdate(prevProps){
  	const {actions, loading: {setInputInventory, selectNetwork}, login: {currentAccount}} = this.props;

		if (!_.isEqual(prevProps.loading.selectNetwork, selectNetwork) &&
			!_.isEmpty(selectNetwork)){
			const params = {...setInputInventory};
			params.categoryId = selectNetwork;
			params.userLevel = currentAccount.userLevel;
			params.limit = 20;
				
			actions.searchInventory(params);
		}
	}

	onSubmit = () => {
		const {actions, loading: {setPlancodeTabScreen}, wallet: {walletSelected}} = this.props;
		const {selectedItem} = this.state;
		const error = {};

		if (setPlancodeTabScreen === "Products"){
			this.planlist.onSubmit();
		} else {
			if (_.isEmpty(selectedItem)){
				error.amount = "Please select a plancode";
			}
	
			if (_.isEmpty(error)){
				actions.selectedWallet(walletSelected.code);
				actions.setScreenInventory("Input");
			} else {
				this.setState({error});
			}
	
			// console.log(error);
		}
	}

	getCategories = () => {
		const res = [
			{id: "CARDS", name: "CALL CARDS"},
			{id: "GAMING", name: "GAMING PINS"},
			{id: "SATELLITE", name: "SATELLITE"},
			{id: "OTHERS", name: "OTHERS"},
		];

		return res;
	}

	handlePressIn(){
		Animated.spring(this.animatePress, {
			toValue: 0.96,
		}).start();
	}
	
	handlePressOut(){
		Animated.spring(this.animatePress, {
			toValue: 1,
		}).start();
	}
	renderItem = ({item, idx}) => {
		const {actions} = this.props;
		const {selectedItem} = this.state;
		const selected = selectedItem.denomination === item.denomination ? {backgroundColor: Color.LightBlue} : null;
		
		return (
			<View style={Styles.mainContainer}>
				<PlanListItem key={`key${idx}`}
					onPress={() => {
						this.setState({selectedItem: item});
						actions.selectedInventory(item);
					}}  item={item} selected={selected}/>
			</View>
		);
	}

	renderRecent = ({item, idx}) => {
		const {actions} = this.props;
		const {selectedItem} = this.state;
		const selected = selectedItem.id === item.id ? {backgroundColor: Color.LightBlue} : null;
		
		return (
			<PlanListItem key={`key${idx}`}
				onPress={() => {
					this.setState({selectedItem: item});
					actions.selectedInventory(item);
				}}  item={item} selected={selected}/>
		);
	}

	renderError = () => {
		const {error} = this.state;

		if (!_.isEmpty(error)){
			return (
				<Card style={[Styles.inpuView1, Styles.cardView3]}>
					<Icon containerStyle={Styles.iconContainerStyle}
						name="close-circle" type="material-community" color={Color.red} size={15} />
					<Text style={[Styles.txt3, {color: Color.red}, Styles.flex1]}>
						{error.amount}</Text>
				</Card>
			);
		}
	}
	_renderScreen = () => {
		const { loading: {setPlancodeTabScreen, getSearchInventory, isGetSearchInventory}, actions} = this.props;
		const searchData = _.has(getSearchInventory, "data") ? getSearchInventory.data : getSearchInventory.item;
		switch (setPlancodeTabScreen) {
		case "Products":
			if (isGetSearchInventory){
				return <Loading customStyle={{backgroundColor: Color.bg}} size="small" color="black" />;
			}
			
			return (<ScrollableTabView tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
				ref={(e) => this.tabRef = e}
				renderTabBar={() => (<ScrollableTabBar style={styles.tabStyle}
					tabStyle={styles.tabStyle} />)}
				onChangeTab={(child) => {
					const selectNetwork = _.has(child, "ref.props.item.id") ? child.ref.props.item.id : "LOAD";

					actions.selectNetwork(selectNetwork);
				}}
				// page={_.findIndex(this.getCategories(), { 'id': selectNetwork})}
				style={styles.tabStyle}
				tabBarTextStyle={styles.textStyle}
				tabBarInactiveTextColor={Color.Standard}
				tabBarActiveTextColor={Color.white}>
				{this.getCategories().map((item, idx) => {
					return (
						<PlanListScreen ref={(e) => this.planlist = e}
							{...this.props}
							tabLabel={item.name} key={`idx ${idx}`}
							onSelectedItem={(item) => this.setState({selectedItem: item})}
							item={item} />
					);
				})}
			</ScrollableTabView>);
			
		case "Search":
			if (isGetSearchInventory){
				return (<Loading customStyle={{backgroundColor: Color.bg}} size="small" color="black" />);
			} else {
				return (
					<View>
						<View style={Styles.zIndex1}>
							{this.renderError()}
						</View>
						<FlatList
							data={_.sortBy(searchData, ["amount"], ["asc"])}
							extraData={this.state}
							ListEmptyComponent={<Text style={[Styles.txt4, Styles.marT10]}>
								Invalid Plancode!</Text>}
							ListFooterComponent={<View style={height30}/>}
							renderItem={this.renderItem}
							keyExtractor={(item, index) => `idx ${index}`}/>
					</View>);
			}
			
			
		// case "Recent":
		// 	return (<View>
		// 		<View style={Styles.zIndex1}>
		// 			{this.renderError()}
		// 		</View>
		// 		<FlatList
		// 			data={getRecentInventory.data}
		// 			extraData={this.state}
		// 			ListEmptyComponent={<Text style={[Styles.txt4, Styles.marT10]}>
		// 			No recent purchased product available!</Text>}
		// 			ListFooterComponent={<View style={height30}/>}
		// 			renderItem={this.renderRecent}
		// 			keyExtractor={(item, index) => `idx ${index}`}/>
		// 	</View>);
		}

	}


	render(){

  	return (
			<View style={styles.flex1}>
				{this._renderScreen()}
			</View>
  	);
	}
}

PlancodeTab.propTypes = {
	loading: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
	wallet: PropTypes.object,
};

const styles = StyleSheet.create({
	flex1: {flex: 1},
	tabBarUnderlineStyle: {height: 0, backgroundColor: Color.colorPrimary},
	tabStyle: {backgroundColor: Color.Header, marginBottom: 0, height: 40},
	textStyle: { fontFamily: "Roboto-Light", fontSize: 12},
});
