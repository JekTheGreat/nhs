/* eslint-disable react-native/no-inline-styles */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, Image, TouchableOpacity,
	 Alert, StyleSheet, Dimensions} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
import _ from "lodash";
import numeral from "numeral";
import moment from "moment";
import getSymbol from "currency-symbol-map";
// import ScrollableTabView, {ScrollableTabBar} from "__src/components/scrollable-tab-view/index";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
const {width} = Dimensions.get("window");

// import { DefaultTabBar} from "react-native-scrollable-tab-view";
const {Color, Res} = Resource;

export default class Wallet extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			position: 0,
		};
	}

	pages = 0;

	_tabChange(ref) {
  	this.setState({position: ref.i});
	}

	componentDidUpdate(prevProps){
		const {currentPosition} = this.props;

		if (!_.isEqual(prevProps.currentPosition, currentPosition) && !_.isEmpty(this.tabRef)){
			this.tabRef.goToPage(currentPosition);
		}
	}
	
	onSelectedWallet = (item) => {
		const { actions, wallet: { walletSelected } } = this.props;

		if (item.code === walletSelected.code){
			return;
		}

		actions.WalletSelected(item);
		Alert.alert("Success", "Change wallet successful.");
	}

	_renderNodata = () => {
  	
  	return (
  		<View tabLabel={"No data"} style={[styles.container, {height: 80}]}>
  			<Loading size="small" color="black"/>
  		</View>
  	);
	}

	_renderWallet = (item, index) => {
  	const { wallet: {walletSelected}} = this.props;
  	const {code, name} = item;
		const balance = item.balance;
		const date = new Date(item.updatedAt);
		
  	let active, color;
  	if (!_.isEmpty(walletSelected)){
  		active = code === walletSelected.code ? "Active Wallet" : "Select Wallet";
  		color = code === walletSelected.code ? {color: Color.lightgreen} : null;
  	}
  
  	return (
  		<View style={[styles.container, {height: 80, zIndex: 5}]} key={`index ${index}`}
  			tabLabel={`${item.code}`}>
  			<Image style={styles.imageLogo} source={Res.get(code)} resizeMode={"contain"} />
  			<TouchableOpacity onPress={() => this.onSelectedWallet(item)}
  				activeOpacity={0.7} style={styles.view1}>
  				<Text style={styles.textPHP}>{name}</Text>
  				<Text style={[styles.textStatus, color]}>{active}</Text>
  			</TouchableOpacity>
  			<View style={styles.view2}>
  				<Text style={styles.textBalance}>Balance</Text>
  				<Text style={styles.textAmount}>{getSymbol(code)} {numeral(balance).format("0,000.0000")}</Text>
  				{/* <Text style={styles.textUpdate}>Last updated:
  					<Text style={{color: Color.Standard2}} >{this._displayTime(date)}</Text></Text> */}
  			</View>
  		</View>
  	);
	}

	_displayTime = (date) => {
		// date = parseInt(date, 10);
		const diff = moment().diff(moment(date), "days");

		if (diff === 0){
			if (new Date().getDate() === new Date(moment(date)).getDate()){
				return ` ${moment(date).fromNow()}`;
			}
			
			return ` Yesterday at ${moment(date).format("h:mm A")}`;
			
		} else if (diff >= 364){
			const currDate = moment(date);

			return ` ${currDate.format("MMMM D YYYY")} at ${currDate.format("h:mm A")}`;
		}
		
		return ` ${moment(date).format("MMMM D")} at ${moment(date).format("h:mm A")}`;
	}

	render(){
  	const { wallet: {addedWallet}, currentPosition} = this.props;
		// const arrays = _.isEmpty(addedWallet) ? [] : _.sortBy(addedWallet, (value) => {
		// 	return new Date(value.createdAt);
		// });
		
		if (_.isEmpty(addedWallet)){
			return (
				<View style={styles.main}>
  				<ScrollableTabView tabBarUnderlineStyle={styles.tabBarUnderline}
  					renderTabBar={() => <ScrollableTabBar />}
						style={styles.TabsStyle}
						tabBarTextStyle={styles.textStyle}
						tabBarInactiveTextColor={Color.Standard2}
						tabBarActiveTextColor={Color.colorPrimary}>
						{this._renderNodata()}
  			</ScrollableTabView>
  		</View>
			);
		}
		
  	return (
  		<View style={styles.main}>
				<ScrollableTabView
					ref={(e) => this.tabRef = e}
					tabBarUnderlineStyle={styles.tabBarUnderline}
					initialPage={currentPosition}
  				renderTabBar={() => <ScrollableTabBar />}
					style={styles.TabsStyle}
  				tabBarTextStyle={styles.textStyle}
  				tabBarInactiveTextColor={Color.Standard2}
  				tabBarActiveTextColor={Color.colorPrimary}>
  				{addedWallet.map((item, index) => {
  					return this._renderWallet(item, index);
  				})}
  			</ScrollableTabView>
  		</View>
  	);
	}
}

Wallet.propTypes = {
	wallet: PropTypes.object,
	actions: PropTypes.object,
	currentPosition: PropTypes.number,
};

const styles = StyleSheet.create({
	main: {flex: 1, backgroundColor: "white", marginTop: 0, marginLeft: 0, marginRight: 0},
	container: {flexShrink: 1, padding: 15, flexDirection: "row",
		justifyContent: "space-between", borderBottomColor: Color.bg},
	imageLogo: {alignSelf: "center", width: 25, height: 25},
	// imageLogo2: {alignSelf: "center", width: 25, height: 25,
	// 	borderRadius: 25 / 2, backgroundColor: Color.Standard},
	tabBarUnderline: {height: 2, backgroundColor: Color.colorPrimary},
	// tabStyle: {backgroundColor: "white"},
	TabsStyle: {backgroundColor: "white", height: 130, width},
	view1: {flexDirection: "column", flex: 1, marginLeft: 10, justifyContent: "center"},
	view2: {flexDirection: "column", justifyContent: "center"},
	textPHP: {fontSize: 15, color: Color.Standard2, fontFamily: "Roboto-Light", fontWeight: "bold"},
	textStatus: {fontSize: 9, color: Color.LightBlue, fontFamily: "Roboto-Light"},
	textBalance: {fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light", fontWeight: "bold", textAlign: "right"},
	textAmount: {fontSize: 15, color: Color.Standard2, fontFamily: "Roboto-Light", fontWeight: "bold", textAlign: "right"},
	textUpdate: {fontSize: 9, color: Color.Standard, fontFamily: "Roboto-Light", textAlign: "right"},
	textStyle: {color: Color.Standard2, fontFamily: "Roboto-Light"},
});
