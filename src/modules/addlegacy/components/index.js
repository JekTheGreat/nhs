// /* eslint-disable */
import React, {Component} from "react";
import {View, StyleSheet, InteractionManager} from "react-native";
import PropTypes from "prop-types";
import {Tab, Tabs} from "native-base";
import HistoryScreen from "./history/HistoryScreen";
import AddLegacyScreen from "./addlegacy/AddLegacyScreen";
import Resource from "__src/resources";
import Loading from "__src/components/Loading";
const {Color} = Resource;
const arrays = ["Legacy Account", "History"];

export default class AddLegacy extends Component{
	constructor(props){
		super(props);
		this.state = {
			didFinishInitialAnimation: true,
		};
	}

	componentDidMount(){
		InteractionManager.runAfterInteractions(() => {
			this.setState({
				didFinishInitialAnimation: false,
			});
		});
	}
	
  renderTab = (item) => {
  	switch (item){
  	case "Legacy Account":
  		return <AddLegacyScreen {...this.props}/>;
  	case "History":
  		return <HistoryScreen {...this.props}/>;
  	}
  }

  render(){
  	const {didFinishInitialAnimation} = this.state;

  	if (didFinishInitialAnimation){
  		return <Loading size="small" color="black" />;
  	}

  	return (
  		<View
  			style={styles.main}>
  			<Tabs
  				tabBarUnderlineStyle={styles.tabBarUnderline2}
  				style={styles.TabsStyle}
  				tabBarActiveTextColor={Color.colorPrimary}
  				tabBarInactiveTextColor={Color.Standard2}>
  				{arrays.map((item, idx) => {
  					return (
  						<Tab key={`idx ${idx}`}
  							heading={`${item}`}
  							tabStyle={styles.tabStyle}
  							textStyle={styles.textStyle}
  							activeTabStyle={{backgroundColor: Color.white}}
  							activeTextStyle={{color: Color.colorPrimary}}>
  							{this.renderTab(item)}
  						</Tab>
  					);
  				})}
  			</Tabs>
  		</View>
  	);
  }
}

AddLegacy.propTypes = {
	actions: PropTypes.object,
};

const styles = StyleSheet.create({
	main: {flex: 1, backgroundColor: "white", marginTop: 0, marginLeft: 0, marginRight: 0},
	tabBarUnderline2: {height: 1, backgroundColor: Color.colorPrimary},
	tabStyle: {backgroundColor: Color.white},
	TabsStyle: {backgroundColor: Color.white, alignItems: "center", justifyContent: "center"},
	textStyle: {color: Color.Standard, fontFamily: "Roboto-Light", fontSize: 12},
});
