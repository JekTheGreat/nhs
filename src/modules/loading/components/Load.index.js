/* eslint-disable */
import React, {PureComponent} from "react";
import {View, StyleSheet, SafeAreaView} from "react-native";
import {Tab, Tabs} from "native-base";
import Merge from "./merge/International";
import Inventory from "./inventory/Inventory";
import ReportTab from "./report/ReportTab";
import Resource from "__src/resources";
import Success from "./merge/Success";
import SuccessInventory from "./inventory/Success";
import ScrollableTabView from "react-native-scrollable-tab-view";
import CustomTab from "./CustomTab";
import _ from "lodash";

const {Color} = Resource;

export default class LocalScreen extends PureComponent {
	componentDidMount(){
		const {actions} = this.props;

		actions.resetLoading();
	}
	
  render(){
		const {loading: {loadSuccess, loadSuccessInt, loadInventorySuccess}} = this.props;

		if(!_.isEmpty(loadSuccessInt)){
			return <Success {...this.props}/>;
		}

		if(!_.isEmpty(loadSuccess)){
			return <Success isLocal {...this.props}/>;
		}

		if(!_.isEmpty(loadInventorySuccess)){
			return <SuccessInventory isLocal {...this.props}/>;
		}

  	return (
  		<View style={{flex: 1, backgroundColor: Color.bg}}>
				<ScrollableTabView tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
					ref={(e) => this.tabRef = e}
					renderTabBar={(props) => <CustomTab  {...props}/>}
					tabBarTextStyle={styles.textStyle}
					onChangeTab={this.onChangeTab}
					tabBarInactiveTextColor={Color.text2}
					tabBarActiveTextColor={Color.colorPrimaryLight2}>
					<Merge tabLabel="E-Loading" {...this.props}/>
					{/* <Inventory tabLabel="Card Products" {...this.props}/> */}
					<ReportTab tabLabel="Report" {...this.props}/>
				</ScrollableTabView>
				<SafeAreaView />
  		</View>
  	);
  }
}

const styles = StyleSheet.create({
	tabBarUnderlineStyle: {height: 3, backgroundColor: Color.colorPrimary},
	tabStyle: {backgroundColor: Color.white},
	TabsStyle: {backgroundColor: Color.white, alignItems: "center", justifyContent: "center"},
	textStyle: {color: Color.text2, fontFamily: "Roboto", fontSize: 12},
});
