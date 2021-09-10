/* eslint-disable */
import React, {Component} from "react";
import {View, SafeAreaView, StyleSheet} from "react-native";
import {Tab, Tabs} from "native-base";
import _ from "lodash";
import { Switch } from 'react-native-switch';
import PropTypes from "prop-types";
import styles from "../../styles.css";
import AddlistingScreen from "./screens/AddlistingScreen";
import FifthScreen from "./screens/Fifth";
import AA from "./screens/AA";
import Resources from "__src/resources";
const {Color} = Resources;
const arrays = ["Add Listings", "My Listings", "My Bookings"];
const arrays2 = ["Search", "Reports"];

class AddListingScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			hctiws: false,
		}
	}

	static navigationOptions = ({navigation}) => {
		return {
			headerRight: <View style={{marginRight: 10}}>
				<Switch
					value= {_.isUndefined(navigation.getParam("getValue"))? true: navigation.getParam("getValue")} 
					onValueChange = {navigation.getParam("onValueChange")}
					activeText={'User'}
					inActiveText={'Host'}
					backgroundActive={'gray'}
					backgroundInactive={'gray'}
					circleSize={25}
					circleActiveColor={Color.colorPrimary}
					circleInActiveColor={'white'}
					circleBorderWidth={3}  
					changeValueImmediately={true}
					innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
					renderActiveText={_.isUndefined(navigation.getParam("getValue")) || navigation.getParam("getValue")? true:false}
					renderInActiveText={_.isUndefined(navigation.getParam("getValue")) || navigation.getParam("getValue")? false:true}
					switchLeftPx={2}
					switchRightPx={2}
					switchWidthMultiplier={3} /> 
			</View> ,
		}
	}

	onValueChange = () => {
		const {navigation} = this.props;
		const {hctiws} = this.state;
		this.setState({hctiws: ! hctiws});
		navigation.setParams({getValue: hctiws});
	}

	componentDidMount(){
		const {navigation} = this.props;
		navigation.setParams({onValueChange: this.onValueChange,})
	}

  renderScreen = () => {
  	const {staycation: {setStaycationScreen}} = this.props;
  	switch (setStaycationScreen){
		case "host":
			return <AddlistingScreen ref={(e)=> this.Host=e} {...this.props}/>
  	case "user":
  	default:
			return <AA ref={(e)=> this.aa=e} {...this.props}/>
		}
	}

	renderTab = (item) => {
		const { hctiws } = this.state;
		if(hctiws === true){
			switch (item){
				case "Add Listings":
					return <AddlistingScreen key={item} tabLabel={item} ref ={(e) => this.Host = e} {...this.props}/>;
				case "My Listings":
					return <AA key={item} tabLabel={item} ref ={(e) => this.aa = e} {...this.props}/>;
				case "My Bookings": 
					return <FifthScreen key={item} tabLabel={item} ref ={(e) => this.Fifth = e} {...this.props}/>;
				}
		}
		else{
			switch (item){
				case "Search":
					return <AA key={item} tabLabel={item} ref ={(e) => this.aa = e} {...this.props}/>;
				case "Reports":
					return <FifthScreen key={item} tabLabel={item} ref ={(e) => this.Fifth = e} {...this.props}/>;
				}
		}
	}

	renderUserHostScreen = () => {
		const { hctiws } = this.state;
		if(hctiws === true){
			return <Tabs
			tabBarUnderlineStyle={styles2.tabBarUnderlineStyle}
			style={styles2.TabsStyle}
			tabBarActiveTextColor={Color.LightBlue}
			tabBarInactiveTextColor={Color.Standard2}>
			{arrays.map((item, idx) => {
				return (
					<Tab key={`idx ${idx}`}
					heading={`${item}`}
					tabStyle={styles2.tabStyle}
					textStyle={styles2.textStyle}
					activeTextStyle={{fontSize: 13, color: Color.LightBlue}}
					activeTabStyle={{backgroundColor: Color.white}}>
					{this.renderTab(item)}
					</Tab>
					);
				})}
			</Tabs>;
			}
		else{
			return <Tabs
				tabBarUnderlineStyle={styles2.tabBarUnderlineStyle}
				style={styles2.TabsStyle}
				tabBarActiveTextColor={Color.LightBlue}
				tabBarInactiveTextColor={Color.Standard2}>
				{arrays2.map((item, idx) => {
					return (
						<Tab key={`idx ${idx}`}
						heading={`${item}`}
						tabStyle={styles2.tabStyle}
						textStyle={styles2.textStyle}
						activeTextStyle={{fontSize: 13, color: Color.LightBlue}}
						activeTabStyle={{backgroundColor: Color.white}}>
						{this.renderTab(item)}
						</Tab>
					)
				})}
			</Tabs>
		}
	}
	
  render(){
		const {hctiws} = this.state;
		console.log("STATE: ", hctiws);
  	return (
  		<View style={{flex:1}}>
				{this.renderUserHostScreen()}
  			<SafeAreaView style={styles.flex} />
  		</View>
  	);
  }
}

AddListingScreen.propTypes = {
	staycation: PropTypes.object,
};

const styles2 = StyleSheet.create({
	tabBarUnderlineStyle: {height: 1, backgroundColor: Color.LightBlue},
	tabStyle: {backgroundColor: Color.white},
	TabsStyle: {backgroundColor: Color.white, alignItems: "center", justifyContent: "center"},
	textStyle: {color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 11},
});


export default AddListingScreen;


