/* eslint-disable max-len */
import React from "react";
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Dimensions} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import Guest from "./AddGuest";
import RNPickerSelect from "__src/components/rnpicker/index";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import {CalendarList} from "react-native-calendars";
import Resource from "__src/resources";
const SCREEN_WIDTH = Dimensions.get("window").width;
const {Color} = Resource;

class ChooseDate extends React.PureComponent{

	componentDidMount(){
		this.markedDates();
	}

	getDate() {
  	return this.inputdate || "";
	};
	
	getType() {
  	return this.inputtype || "";
	};

	markedDates = () => {
		const {setFilter} = this.props;
	
		if (_.isEmpty(setFilter) && _.isEmpty(setFilter)){
			return null;
		} else if (setFilter && _.isEmpty(setFilter)){
			return {[setFilter]: {startingDay: true, color: Color.colorPrimaryDark, textColor: "white"}};
		}

		const start = moment(new Date(setFilter));
		const end = moment(new Date(setFilter.end));
		const objects = {};
		let counter = 0;

		for (let m = moment(start); m.isSameOrBefore(end); m.add(1, "days")) {
			if (counter === 0){
				const endingDay = m.format("YYYY-MM-DD") === setFilter.end;

				objects[m.format("YYYY-MM-DD")] = {startingDay: true, color: Color.colorPrimaryDark, endingDay, textColor: "white"};
			} else if (m.format("YYYY-MM-DD") === setFilter.end){
				objects[m.format("YYYY-MM-DD")] = {endingDay: true, color: Color.colorPrimaryDark, textColor: "white"};
			} else {
				objects[m.format("YYYY-MM-DD")] = {color: Color.colorPrimaryDark, textColor: "white"};
			}

			counter += 1;
		}

		return objects;
	}

	render(){
		const {onClose, visible, setFilter, onValueChange, onChangeText, onDayPress, onDone} = this.props;
		const startDate1 = setFilter ? moment(new Date(setFilter)).format("MMMM DD") : "No Selected";
		const startDate2 = setFilter ? moment(new Date(setFilter)).format("YYYY") : "Date";
		const endDate1 = setFilter ? moment(new Date(setFilter)).format("MMMM DD") : "No Selected";
		const endDate2 = setFilter ? moment(new Date(setFilter)).format("YYYY") : "Date";

  	return (
			<SafeAreaView style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
					<Text style={styles.txtHeader}>Choose a Date</Text>
					<View style={styles.view2}>
						<View style={styles.viewLeft}>
							<Text style={styles.txtDate}>{startDate1}</Text>
							<Text style={styles.txtDate}>{startDate2}</Text>
							<Text style={styles.txtDate2}>Check In Date</Text>
						</View>
						<View style={styles.viewRight}>
							<Text style={styles.txtDate}>{endDate1}</Text>
							<Text style={styles.txtDate}>{endDate2}</Text>
							<Text style={styles.txtDate2}>Check Out Date</Text>
						</View>
					</View>
					<CalendarList
						style={styles.calendarList}
						pastScrollRange={24}
						futureScrollRange={24}
						horizontal
						hideArrows={false}
						disableMonthChange={false}
						onDayPress={onDayPress}
						markingType={"period"}
						markedDates={this.markedDates()}
						pagingEnabled
						theme={{ textMonthFontFamily: "Roboto", textMonthFontSize: 15, monthTextColor: Color.black2, textMonthFontWeight: "bold", arrowColor: Color.LightBlue5, textSectionTitleColor: Color.colorPrimaryLight2,
							textDayFontFamily: "Roboto", textDayFontSize: 12, textDayFontWeight: "bold", textDayHeaderFontSize: 13, textDayHeaderFontFamily: "Roboto-Light" }}
					/>

					<Guest {...this.props} onAdultPress={this.onAdultPress} onSeniorPress={this.onSeniorPress}
						onChildPress={this.onChildPress} onInfantPress={this.onInfantPress}/>

					<View style={styles.padH15}>
						<Button label="Request to Book"
							style={styles.done} onPress={() => this.props.navigation.navigate("BookSummary")}/>
					</View>
				</ScrollView>
			</SafeAreaView>
  	);
	}
}

ChooseDate.propTypes = {
	visible: PropTypes.bool,
	onClose: PropTypes.func,
	onValueChange: PropTypes.func,
	onChangeText: PropTypes.func,
	onDone: PropTypes.func,
	onDayPress: PropTypes.func,
	ticketing: PropTypes.object,
	setFilter: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1,  backgroundColor: "white", alignItems: "center", justifyContent: "center"},
	view2: {flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 20},
	viewLeft: {flex: 1, alignItems: "flex-start"},
	viewRight: {flex: 1, alignItems: "flex-end"},
	txtDate: {fontFamily: "Roboto-Light", fontSize: 20, color: Color.text2},
	txtDate2: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.colorPrimaryLight2, marginTop: 5},
	calendarList: {borderTopRightRadius: 15, borderTopLeftRadius: 15, marginTop: 5, minHeight: 260 },
	flex1: {flex: 1},
	padH15: {padding: 20},
	txtHeader: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 20, color: Color.text2, marginTop: 10, paddingHorizontal: 20},
	done: {borderBottomWidth: 0, marginTop: 20, backgroundColor: Color.colorPrimaryLight2, height: 38},
});

export default ChooseDate;
