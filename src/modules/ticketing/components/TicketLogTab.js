/* eslint-disable max-len */
import React from "react";
import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import TicketLogItem from "./screens/ticketlogs/TicketLogItem";
import LoaderModal from "__src/components/LoaderModal";
import PropTypes from "prop-types";
import _ from "lodash";
import Filter from "./screens/ticketlogs/Filter";
import moment from "moment";
import Resource from "__src/resources";
const {Color} = Resource;

class TicketLogTab extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			isFilterShow: false,
			setFilter: {skip: 0, limit: 10, start: moment().format("YYYY-MM-DD"),
				end: moment().format("YYYY-MM-DD"), paymentType: "ALL", flightType: "ALL",
				status: "ALL", filterType: "TRACKING NO.", trackno: ""},
		};
	}

	componentDidUpdate(prevProps){
		const {ticketing: {isGettingLogs}} = this.props;

		if (!_.isEqual(prevProps.ticketing.isGettingLogs, isGettingLogs) && isGettingLogs === false){
			this.setState({isFilterShow: false});
		}
	}

  renderItem = ({item}) => {
  	return <TicketLogItem item={item}/>;
  }
	
	openFilter = () => {
		this.setState({isFilterShow: true});
	}
	
	renderFilter = () => {
		const {setFilter} = this.state;
		const startDate = setFilter.start ? moment(new Date(setFilter.start)).format("DD MMM YYYY") : "No Selected";
		const endDate = setFilter.end ? moment(new Date(setFilter.end)).format("DD MMM YYYY") : "No Selected";
		const placeholder = setFilter.filterType === "TRACKING NO." ? "Tracking Number" : "Reference Number";

		return (
			<View style={styles.marT20}>
				<View style={styles.viewSearch}>
					<Icon name="search" type="evilicon" size={30} color={Color.Header}/>
					<TextInput style={styles.inputSearch} onChangeText={this.onChangeText} placeholder={placeholder}
						onSubmitEditing={this.onDone}/>
					<Icon onPress={this.openFilter} name="tune" size={26} color={Color.colorPrimaryDark}/>
				</View>

				<View style={styles.view1}>
					<TouchableOpacity onPress={this.openFilter} style={styles.datesWrapper}>
						<Text style={styles.txt1}>Check In Date From</Text>
						<Text style={styles.txt2}>{startDate}</Text>
					</TouchableOpacity>
					<View style={styles.viewSeparator} />

					<TouchableOpacity onPress={this.openFilter} style={styles.datesWrapper}>
						<Text style={styles.txt1}>Check In Date To</Text>
						<Text style={styles.txt2}>{endDate}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	onValueChange = (type) => (value) => {
		const {setFilter} = this.state;
		const newFilter = _.merge({}, setFilter);

		newFilter[type] = value;
		this.setState({setFilter: newFilter});
	}

	onDayPress = (e) => {
		const {setFilter} = this.state;
		const newFilter = _.merge({}, setFilter);
		const start = moment(new Date(setFilter.start));
		const newDate = moment(new Date(e.dateString));

		if (newDate.isBefore(start) && _.isEmpty(setFilter.end)){
			newFilter.start = e.dateString;
			newFilter.end = null;
		} else if (!_.isEmpty(setFilter.start) && !_.isEmpty(setFilter.end)){
			newFilter.start = e.dateString;
			newFilter.end = null;
		} else if (!_.isEmpty(setFilter.start) && _.isEmpty(setFilter.end)){
			newFilter.end = e.dateString;
		}

		this.setState({setFilter: newFilter});
	}

	getConcat = (key, value) => {
		return `${key}=${value}`;
	}

	onDone = () => {
		const {actions, login: {session}} = this.props;
		const {setFilter} = this.state;
		let trackno = "";

		if (!_.isEmpty(setFilter.trackno)){
			trackno = setFilter.filterType === "TRACKING NO." ? `&trackingNumber=${setFilter.trackno}` : `&referenceNumber=${setFilter.trackno}`;
		}
		
		const skip = this.getConcat("skip", setFilter.skip);
		const limit = this.getConcat("limit", setFilter.limit);
		const start = this.getConcat("start", setFilter.start);
		const end = this.getConcat("end", setFilter.end);
		const paymentType = this.getConcat("paymentType", setFilter.paymentType);
		const flightType = this.getConcat("flightType", setFilter.flightType);
		const status = this.getConcat("status", setFilter.status);

		const param = `${skip}&${limit}&${start}&${end}&${paymentType}&${flightType}&${status}${trackno}`;

		actions.getListLogs(param, session.token);
	}

	onChangeText = (value) => {
		const {setFilter} = this.state;
		const newFilter = _.merge({}, setFilter);

		newFilter.trackno = value;
		this.setState({setFilter: newFilter});
	}

	render(){
		const {ticketing: {isGettingLogs, ticketLogs, ticketLogsCount}} = this.props;
		const {isFilterShow, setFilter} = this.state;
		const isGreater = ticketLogsCount > ticketLogs.length;

  	return (
  		<View style={styles.container}>
				{this.renderFilter()}
  			<FlatList
					refreshing={isGettingLogs}
					onRefresh={this.onDone}
					data={ticketLogs}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id }
					ListEmptyComponent={<Text style={styles.txtNodata}>No data found!</Text>}
					ListFooterComponent={isGreater ? <TouchableOpacity>
						<Text style={styles.txtSeemore}>See more</Text>
					</TouchableOpacity> : <View style={{height: 30}}/>}
  				renderItem={this.renderItem}/>
				<Filter visible={isFilterShow} {...this.props}
					onValueChange={this.onValueChange} onDone={this.onDone}
					onChangeText={this.onChangeText} onDayPress={this.onDayPress}
					setFilter={setFilter} onClose={() => this.setState({isFilterShow: false})}/>
  		</View>
  	);
	}
}

TicketLogTab.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1, paddingHorizontal: 15},
	datesWrapper: {flex: 1, alignItems: "center", justifyContent: "center"},
	marT20: {marginTop: 20},
	viewSearch: {flexDirection: "row", height: 37, borderWidth: 1, borderColor: Color.text5, borderRadius: 5, paddingHorizontal: 6, alignItems: "center", justifyContent: "center"},
	inputSearch: {flex: 1, marginLeft: 3, paddingVertical: 0},
	view1: {flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15},
	txt1: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2},
	txt2: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 5},
	viewSeparator: {height: 40, width: 2, backgroundColor: Color.text5},
	txtSeemore: {fontFamily: "Roboto", textAlign: "center", color: Color.colorPrimaryDark, fontSize: 15, padding: 10},
	txtNodata: {fontFamily: "Roboto", textAlign: "center", color: Color.text2, fontSize: 15, padding: 10},
});

export default TicketLogTab;
