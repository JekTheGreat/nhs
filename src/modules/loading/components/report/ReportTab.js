/* eslint-disable max-len */
import React from "react";
import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import Loading from "__src/components/Loading";
import ReportItem from "./ReportItem";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
const {Color} = Resource;

class ReportTab extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			isFilterShow: false,
			setFilter: {skip: 0, limit: 10, trackingNumber: ""},
		};
	}

	componentDidMount(){
		const {actions, login: {session}} = this.props;
		const params = {
			skip: 0,
			limit: 10,
		};
		const param = {};
		param.token = session.token;
		param.system = "unified";

		actions.getCurrentReports(params, param, session.token);
	}

	componentDidUpdate(prevProps){
		const {loading: {isGettingReports}} = this.props;

		if (!_.isEqual(prevProps.loading.isGettingReports, isGettingReports) && isGettingReports === false){
			this.setState({isFilterShow: false});
		}
	}

  renderItem = ({item}) => {
  	return <ReportItem item={item}/>;
  }
	
	searchNow = () => {
		const {actions, login: {session}} = this.props;
		const param = {};
		param.token = session.token;
		param.system = "unified";

		actions.searchCurrentReports(this.state.setFilter, param, session.token);
	}
	
	renderFilter = () => {

		return (
			<View style={styles.marT20}>
				<View style={styles.viewSearch}>
					<Icon name="search" type="evilicon" size={30} color={Color.Header}/>
					<TextInput style={styles.inputSearch} onChangeText={this.onChangeText} placeholder={"Transaction Number"}
						onSubmitEditing={this.searchNow}/>
					<Icon onPress={this.searchNow} name="arrow-forward"
						size={26} color={Color.colorPrimaryDark}/>
				</View>
			</View>
		);
	}

	getConcat = (key, value) => {
		return `${key}=${value}`;
	}

	onChangeText = (value) => {
		const {setFilter} = this.state;
		const newFilter = _.merge({}, setFilter);

		newFilter.trackingNumber = value.toUpperCase();
		this.setState({setFilter: newFilter});
	}

	ListEmptyComponent = () => {
		const {loading: {isGettingReports}} = this.props;

		return isGettingReports ? <Loading /> :
			<Text style={styles.txtNodata}>No data found!</Text>;
	}

	render(){
		const {loading: {isGettingReports, getReports, reportCount}} = this.props;
		const isGreater = reportCount > getReports.length;
		const arr = [];
		arr.push(getReports);
		const data = Array.isArray(getReports) ? getReports : arr;
  	
		return (
  		<View style={styles.container}>
				{this.renderFilter()}
  			<FlatList
					refreshing={isGettingReports}
					onRefresh={() => this.componentDidMount()}
					data={data}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => `${item.createdAt}` }
					ListEmptyComponent={this.ListEmptyComponent}
					ListFooterComponent={isGreater ? <TouchableOpacity>
						<Text style={styles.txtSeemore}>See more</Text>
					</TouchableOpacity> : <View style={styles.height30}/>}
  				renderItem={this.renderItem}/>
  		</View>
  	);
	}
}

ReportTab.propTypes = {
	loading: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1, paddingHorizontal: 15, backgroundColor: "white"},
	marT20: {marginTop: 20},
	height30: {height: 30},
	viewSearch: {flexDirection: "row", height: 37, borderWidth: 1, borderColor: Color.text5, borderRadius: 5, paddingHorizontal: 6, alignItems: "center", justifyContent: "center"},
	inputSearch: {flex: 1, marginLeft: 3, paddingVertical: 0},
	txtSeemore: {fontFamily: "Roboto", textAlign: "center", color: Color.colorPrimaryDark, fontSize: 15, padding: 10},
	txtNodata: {fontFamily: "Roboto", textAlign: "center", color: Color.text2, fontSize: 15, padding: 10},
});

export default ReportTab;
