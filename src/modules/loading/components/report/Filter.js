/* eslint-disable max-len */
import React from "react";
import {View, Text, ScrollView, StyleSheet, Modal, Dimensions} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import RNPickerSelect from "__src/components/rnpicker/index";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import {CalendarList} from "react-native-calendars";
import Resource from "__src/resources";
import {STATUS, FLIGHTTYPE, FILTERTYPE} from "__src/modules/ticketing/data/TicketLogsData";
const SCREEN_WIDTH = Dimensions.get("window").width;
const {Color} = Resource;

class Filter extends React.PureComponent{

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
	
		if (_.isEmpty(setFilter.start) && _.isEmpty(setFilter.end)){
			return null;
		} else if (setFilter.start && _.isEmpty(setFilter.end)){
			return {[setFilter.start]: {startingDay: true, color: Color.colorPrimaryDark, textColor: "white"}};
		}

		const start = moment(new Date(setFilter.start));
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
		const {onClose, visible, setFilter, onValueChange, onChangeText, onDayPress, onDone, loading: {isGettingReports}} = this.props;
		const startDate1 = setFilter.start ? moment(new Date(setFilter.start)).format("MMMM DD") : "No Selected";
		const startDate2 = setFilter.start ? moment(new Date(setFilter.start)).format("YYYY") : "Date";
		const endDate1 = setFilter.end ? moment(new Date(setFilter.end)).format("MMMM DD") : "No Selected";
		const endDate2 = setFilter.end ? moment(new Date(setFilter.end)).format("YYYY") : "Date";
		const placeholder = setFilter.filterType === "TRACKING NO." ? "Tracking Number" : "Reference Number";

  	return (
  		<Modal
  			transparent
  			animationType={"slide"}
  			visible={visible}
  			onRequestClose={onClose}>
  			<View style={styles.container}>
  				<View style={styles.view1} >
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
								calendarWidth={SCREEN_WIDTH - 60}
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
								theme={{ textMonthFontFamily: "Roboto", textMonthFontSize: 15, monthTextColor: Color.black2, textMonthFontWeight: "bold", arrowColor: Color.LightBlue5,
  							textDayFontFamily: "Roboto", textDayFontSize: 13, textDayFontWeight: "bold", textDayHeaderFontSize: 13, textDayHeaderFontWeight: "bold", textDayHeaderFontFamily: "Roboto" }}
  						/>

							<View style={styles.padH15}>
								<View>
									<Text style={styles.label}>Status</Text>
									<RNPickerSelect
										onValueChange={onValueChange("status")}
										placeholder={{}}
										value={setFilter.status}
										useNativeAndroidPickerStyle={false}
										items={STATUS} >
										<TxtInput
											round isText
											style={styles.marT7}
											style3={styles.style3}
											value={setFilter.status}
											placeholder="Currency"
											returnKeyType="next"
											compName="ArrowDown" />
									</RNPickerSelect>
								</View>

								<View style={styles.marT7}>
									<Text style={styles.label}>Flight Type</Text>
									<RNPickerSelect
										onValueChange={onValueChange("flightType")}
										placeholder={{}}
										value={setFilter.flightType}
										useNativeAndroidPickerStyle={false}
										items={FLIGHTTYPE} >
										<TxtInput
											round isText
											style={styles.marT7}
											style3={styles.style3}
											value={setFilter.flightType}
											placeholder="Currency"
											returnKeyType="next"
											compName="ArrowDown"
										/>
									</RNPickerSelect>
								</View>

								<View style={styles.marT7}>
									<Text style={styles.label}>Filter Type</Text>
									<View style={styles.viewFilter}>
										<View style={styles.width40}>
											<RNPickerSelect
												onValueChange={onValueChange("filterType")}
												placeholder={{}}
												value={setFilter.filterType}
												useNativeAndroidPickerStyle={false}
												items={FILTERTYPE} >
												<TxtInput
													round isText
													style={styles.marT7}
													style3={styles.style3}
													value={setFilter.filterType}
													returnKeyType="next"
													compName="ArrowDown"
												/>
											</RNPickerSelect>
										</View>
										<View style={styles.width60}>
											<TxtInput
												round style={styles.marT7}
												style3={[styles.style4]}
												onChangeText={onChangeText}
												value={setFilter.trackno}
												placeholder={placeholder}
												returnKeyType="next" />
										</View>
									</View>
								</View>

								<Button label="Done" loading={isGettingReports}
								 style={styles.done} onPress={onDone}/>
								<Button label="Cancel" style={styles.cancel}
									onPress={onClose}
									labelStyle={{color: Color.colorPrimaryDark}}/>
							</View>
  					</ScrollView>
  				</View>
  			</View>
  		</Modal>
  	);
	}
}

Filter.propTypes = {
	visible: PropTypes.bool,
	onClose: PropTypes.func,
	onValueChange: PropTypes.func,
	onChangeText: PropTypes.func,
	onDone: PropTypes.func,
	onDayPress: PropTypes.func,
	loading: PropTypes.object,
	setFilter: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1, height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.2)" },
	view1: {width: SCREEN_WIDTH - 60, height: "80%", backgroundColor: "white",
		borderRadius: 5},
	view2: {flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, marginTop: 20},
	viewLeft: {flex: 1, alignItems: "flex-start"},
	viewRight: {flex: 1, alignItems: "flex-end"},
	txtDate: {fontFamily: "Roboto-Light", fontSize: 20, color: Color.text2},
	txtDate2: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.colorPrimaryDark, marginTop: 5},
	calendarList: {borderTopRightRadius: 15, borderTopLeftRadius: 15, marginTop: 5, minHeight: 260 },
	marT7: {marginTop: 7},
	flex1: {flex: 1},
	padH15: {paddingHorizontal: 15},
	txtHeader: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 20, color: Color.text2, textAlign: "center", marginTop: 10},
	label: {fontFamily: "Roboto", fontSize: 14, color: Color.text2},
	style3: {height: 35, borderRadius: 6, borderWidth: 1, borderColor: Color.text3},
	style4: {flex: 1, height: 35, borderRadius: 6, borderWidth: 1, borderColor: Color.text3},
	done: {borderBottomWidth: 0, marginTop: 20},
	cancel: {backgroundColor: Color.transparent, borderBottomWidth: 0, marginTop: 5, marginBottom: 20},
	viewFilter: {flexDirection: "row", justifyContent: "center", alignItems: "center"},
	width40: {width: "40%"},
	width60: {width: "60%"},
});

export default Filter;
