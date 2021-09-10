
import React from "react";
import {Text, StyleSheet, TouchableWithoutFeedback, View, Platform} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import Animated from "react-native-reanimated";
import moment from "moment";
import CalendarScreen from "./search/CalendarScreen";
import _ from "lodash";

const {Color} = Resource;
const {
	Value,
	concat,
} = Animated;

class ButtonTrip extends React.PureComponent{
	constructor(props){
		super(props);
		this.translationX = new Value(1);
		this.state = {
			isCalendarVisible: false,
			selectedDate: undefined,
			type: "",
		};
	}
  
  onPressOneway = () => {
  	const {ticketing: {setTicketingInput}, actions} = this.props;
  	const newInput = _.merge({}, setTicketingInput);
			
  	if (setTicketingInput.flightTripType === "OneWay"){
  		return;
  	}

  	newInput.flightTripType = "OneWay";
  	newInput.flightType = "DOM";
  	actions.setTicketingInput(newInput);
  }

  onPressRoundtrip = () => {
  	const {ticketing: {setTicketingInput}, actions} = this.props;
  	const newInput = _.merge({}, setTicketingInput);

  	if (setTicketingInput.flightTripType === "Return"){
  		return;
  	}
		
  	newInput.flightTripType = "Return";
  	newInput.flightType = "INT";
  	actions.setTicketingInput(newInput);
  }
	
	onPressDates = (type) => {
		const {ticketing: {setTicketingInput}} = this.props;

		switch (type){
		case "departure":
			this.setState({isCalendarVisible: true, type});
			this.calRef.setDate(setTicketingInput.departure, "departure");
			break;
		case "return":
			this.setState({isCalendarVisible: true, type});
			this.calRef.setDate(setTicketingInput.return, "return");
			break;
		}
	}
	
	oneWay = () => {
		const {ticketing: {setTicketingInput}} = this.props;
		const index = setTicketingInput.flightTripType === "OneWay" ? 100 : 46;
		const style = setTicketingInput.departureFormat && styles.txtValue ;

		return (
			<TouchableWithoutFeedback onPress={() => this.onPressDates("departure")}>
				<Animated.View style={[styles.view1, { width: concat(index, "%")}]}>
					<Text numberOfLines={1} style={[styles.txtDept, style]}>{setTicketingInput.departureFormat || "Departure Date"}</Text>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}

	roundTrip = () => {
		const {ticketing: {setTicketingInput}} = this.props;
		const opacity = setTicketingInput.flightTripType === "OneWay" ? 0 : 1;
		const style = setTicketingInput.return && styles.txtValue ;
		
		return (
			<TouchableWithoutFeedback onPress={() => this.onPressDates("return")}>
				<Animated.View style={[styles.view1, { opacity}]}>
      	    <Text numberOfLines={1} style={[styles.txtDept, style]}>{setTicketingInput.returnFormat || "Return Date"}</Text>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}

	onConfirm = (value) => {
		const {actions, ticketing: {setTicketingInput}} = this.props;
		const {currentDate, formatedDate, type} = value;
		const newInput = _.merge({}, setTicketingInput);

		if (moment(newInput.return).isBefore(currentDate)){
			delete newInput.return;
			delete newInput.returnFormat;
			newInput[type] = currentDate;
			newInput[`${type}Format`] = formatedDate;
			actions.setTicketingInput(newInput);
		} else {
			newInput[type] = currentDate;
			newInput[`${type}Format`] = formatedDate;
			actions.setTicketingInput(newInput);
		}
		this.setState({isCalendarVisible: false});
	}

	render() {
		const {ticketing: {setTicketingInput}} = this.props;
		const {isCalendarVisible, selectedDate, type} = this.state;
  	const oneway = setTicketingInput.flightTripType === "OneWay" ? styles.shadowStyle : styles.shadowRemove;
  	const roundtrip = setTicketingInput.flightTripType === "Return" ? styles.shadowStyle : styles.shadowRemove;
  	const onewayLabel = setTicketingInput.flightTripType === "OneWay" ? styles.white : styles.primary;
  	const roundtripLabel = setTicketingInput.flightTripType === "Return" ? styles.white : styles.primary;

  	return (
			<>
				<View style={styles.container}>
					<TouchableWithoutFeedback onPress={this.onPressOneway}>
						<Animated.View style={[styles.btnTrip, oneway]}>
							<Text style={[styles.label, onewayLabel]}>One-Way</Text>
						</Animated.View>
					</TouchableWithoutFeedback>
					
					<TouchableWithoutFeedback
						onPress={this.onPressRoundtrip}>
						<View style={[styles.btnTrip, roundtrip]}>
							<Text style={[styles.label, roundtripLabel]}>Rountrip</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<View style={[styles.container, styles.marT25]}>
					{this.oneWay()}
					{this.roundTrip()}
				</View>

				<CalendarScreen
					ref={(e) => this.calRef = e}
					visible={isCalendarVisible} selected={selectedDate} type={type}
					{...this.props}
					onClose={() => this.setState({isCalendarVisible: false})}
					onConfirm={(e) => this.onConfirm(e)}/>
			</>
  	);
	}
};

ButtonTrip.propTypes = {
	value: PropTypes.string,
	label: PropTypes.string,
	style: PropTypes.object,
	actions: PropTypes.object,
	ticketing: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {flexDirection: "row", justifyContent: "space-between", marginTop: 27},
	label: {fontFamily: "Roboto", fontSize: 12, textAlign: "center", color: Color.AFAAAA},
	btnTrip: {height: 40, width: "46%", borderWidth: 0.7, borderColor: Color.colorPrimary, backgroundColor: Color.colorPrimary, borderRadius: 6, justifyContent: "center"},
	white: {color: Color.white},
	primary: {color: Color.AFAAAA},
	shadowRemove: {backgroundColor: "white", borderColor: Color.border1},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 5}, shadowColor: Color.colorPrimary,
				shadowOpacity: .5, shadowRadius: 5, zIndex: 4},
			android: {elevation: 5},
		}),
	},
	marT25: {marginTop: 25},
	view1: {height: 40, width: "46%",  borderWidth: 0.7, borderColor: Color.border1, borderRadius: 6, justifyContent: "center"},
	txtDept: {fontFamily: "Roboto-Light", fontSize: 12, marginLeft: 15, color: Color.AFAAAA},
	txtValue: {fontFamily: "Roboto", color: Color.Header},
});

export default ButtonTrip;
