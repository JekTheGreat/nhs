import React, {PureComponent} from "react";
import {View, SafeAreaView, StyleSheet, Text} from "react-native";
import {Tab, Tabs} from "native-base";
import _ from "lodash";
import PropTypes from "prop-types";
import SearchScreen from "./search/SearchScreen";
import SearchList from "./search/SearchList";
import ChooseDate from "./search/guest/ChooseDate";
import HomePage from "../homepage/HomePage";
import LocatorScreen from "./locator/LocatorScreen";
import ReportScreen from "./report/ReportScreen";
import CustomTab from "./CustomTab";
import Test from "../searchlist/index";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScrollableTabView from "react-native-scrollable-tab-view";

import Resources from "__src/resources";
const {Color} = Resources;
const arrays2 = ["Search", "Reports"];

class UserScreen extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			hctiws: false,
		};
	}
  
	render(){

		// return <ProfileScreen {...this.props}/>;
		
		// return (
		// 	<SafeAreaProvider>
		// 		<SearchList {...this.props}/>
		// 	</SafeAreaProvider>
		// );
		
		return (
			<SafeAreaView style={styles.flex1}>
				<View style={{flexDirection: "row", height: 50, backgroundColor: Color.colorPrimaryLight2, alignItems: "center", justifyContent: "center", paddingHorizontal: 20}}>
					<Text style={{flex: 1, fontFamily: "Roboto", fontWeight: "bold", color: Color.white, fontSize: 20}}>Book Unique Homes</Text>
					<View style={{height: 30, backgroundColor: Color.black, width: 100}}>
					</View>
				</View>
				<ScrollableTabView tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
					ref={(e) => this.tabRef = e}
					renderTabBar={(props) => <CustomTab  {...props}/>}
					tabBarTextStyle={styles.textStyle}
					onChangeTab={this.onChangeTab}
					tabBarInactiveTextColor={Color.text2}
					tabBarActiveTextColor={Color.colorPrimaryLight2}>
					<SearchScreen tabLabel="Search" {...this.props}/>
					<ReportScreen tabLabel="Report" {...this.props}/>
  		</ScrollableTabView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	flex1: {flex: 1},
	tabBarUnderlineStyle: {height: 3, backgroundColor: Color.colorPrimaryLight2},
	tabStyle: {backgroundColor: Color.white},
	TabsStyle: {backgroundColor: Color.white, alignItems: "center", justifyContent: "center"},
	textStyle: {color: Color.text2, fontFamily: "Roboto", fontSize: 12},
	activeTextStyle: {fontSize: 13, color: Color.colorPrimaryLight2},
});

export default UserScreen;
