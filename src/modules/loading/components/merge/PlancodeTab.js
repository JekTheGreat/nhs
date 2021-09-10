/* eslint-disable import/named */
import React, {PureComponent} from "react";
import {View, StyleSheet } from "react-native";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import Resource from "__src/resources";
import _ from "lodash";
import PlanListScreen from "./PlanListScreen";
import PropTypes from "prop-types";
const {Color} = Resource;

export default class PlancodeTab extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			selectedItem: "",
		};
	}

	componentDidMount(){
		console.log("getCategories", this.getCategories());
	}

	componentDidUpdate(prevProps){
  	const {actions, loading: {setInputMerge, selectNetwork}} = this.props;

		if (!_.isEqual(prevProps.loading.selectNetwork, selectNetwork) &&
			!_.isEmpty(selectNetwork)){
			const params = {...setInputMerge};
			params.categoryId = selectNetwork;
				
			actions.searchProduct(params);
		}
		// if (!_.isEqual(prevProps.loading.selectNetwork, selectNetwork) &&
		// 	selectNetwork === "LOAD"){
		// 	this.tabRef.goToPage(0);
		// }
	}

	onSubmit = () => {
		this.planlist.onSubmit();
	}

	getCategories = () => {
  	const {loading: {categories}} = this.props;
		const result = _.filter(categories, (item) => {
			return _.includes(["LOAD", "CALL", "DATA", "COMBO"], item.id);
		});

		return result;
	}

	render(){
		const {actions} = this.props;

  	return (
			<View style={styles.flex1}>
				<ScrollableTabView tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
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
				</ScrollableTabView>
			</View>
  	);
	}
}

PlancodeTab.propTypes = {
	loading: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
};

const styles = StyleSheet.create({
	flex1: {flex: 1},
	tabBarUnderlineStyle: {height: 0, backgroundColor: Color.colorPrimary},
	tabStyle: {backgroundColor: Color.Header, marginBottom: 0, height: 40},
	textStyle: { fontFamily: "Roboto-Light", fontSize: 12},
});
