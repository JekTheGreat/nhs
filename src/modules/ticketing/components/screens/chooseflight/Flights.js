/* eslint-disable max-len */
import React from "react";
import {View, FlatList, Text, Image, StyleSheet,
	TouchableWithoutFeedback, Platform, Alert} from "react-native";
import LoaderModal from "__src/components/LoaderModal";
import _ from "lodash";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import moment from "moment";
import numeral from "numeral";
const {Color, Res} = Resource;

class Flights extends React.PureComponent{
	componentDidUpdate(prevProps){
		const {ticketing: {ItineraryPriceFailed}, actions, filter} = this.props;

		if (!_.isEqual(prevProps.ticketing.ItineraryPriceFailed, ItineraryPriceFailed) && !_.isEmpty(ItineraryPriceFailed)){
			setTimeout(() => {
				Alert.alert("Notice", ItineraryPriceFailed);
				if (_.includes(ItineraryPriceFailed, "Session")){
					// actions.setScreen("");
				}
			}, 10);
		}

		// if (!_.isEqual(prevProps.filter, filter) && !_.isEmpty(filter)){
		// 	actions.selectDeparture({});
		// }
	}

	getDuration = (item) => {
		const {FlightSegments} = item;
		const DepartureDate = moment(FlightSegments[0].Legs[0].DepartureDate);
		const ArrivalDate = moment(FlightSegments[0].Legs[0].ArrivalDate);
		const duration = moment.duration(ArrivalDate.diff(DepartureDate));
		const days = duration.days() > 0 ? `${duration.days()}D ` : "";
		const hour = duration.hours() > 0 ? `${duration.hours()}h ` : "";
		const minute = duration.minutes() > 0 ? `${duration.minutes()}m` : "";

		return `${days}${hour}${minute}`;
	}

	onItemSelected = (item) => {
		const {actions, login: {session}, ticketing: {setScreen}} = this.props;
		actions.getItinerary({referenceNumber: item.ReferenceNumber,
			trackingNumber: item.TrackingNumber}, session.token, setScreen);
  	this.setState({ error: {}});
	}

  renderItem = ({item, index}) => {
  	const {ticketing: {setScreen, selectDeparture, selectReturn}} = this.props;
  	const {FlightSegments, SegmentCount, ReferenceNumber} = item;
  	const segment = SegmentCount > 1 ? `${SegmentCount} Stop` : "Non Stop";
  	const depart = moment(FlightSegments[0].Legs[0].DepartureDate).format("hh:mm A");
  	const arrive = moment(FlightSegments[0].Legs[0].ArrivalDate).format("hh:mm A");
  	const selectedOnward = selectDeparture.ReferenceNumber === ReferenceNumber && setScreen === "OnwardScreen" ? styles.shadowStyle : null;
  	const selectedReturn = selectReturn.ReferenceNumber === ReferenceNumber && setScreen === "ReturnScreen" ? styles.shadowStyle : null;
  	const source = {uri: `https://storage.googleapis.com/v3-pub-images/ticketing/airlines/${FlightSegments[0].Legs[0].OperatingAirline.Code}.png`};
		
  	return (
  		<TouchableWithoutFeedback onPress={() => this.onItemSelected(item)}>
  			<View key={`${index}`} style={[styles.view1, selectedOnward, selectedReturn]}>
  				<View style={styles.view2}>
  					<View style={styles.view3}>
  						<Image style={styles.imageAirline} source={source} resizeMode="contain"/>
  					</View>
  					<Text style={styles.txtPrice}>{numeral(item.SingleAdultFare).format("0,000.00")}</Text>
  					<Text style={styles.txtCurrency}>PHP</Text>
  				</View>
  				<View style={styles.view4}>
  					<View style={styles.viewCenter}>
  						<Text style={styles.txtDepart}>{depart}</Text>
  						<Text style={styles.txtDuration}>{segment}</Text>
  					</View>

  					<View style={styles.view5}>
  						<Image source={Res.get("Departure")} style={styles.imageSize14} resizeMode="contain"/>
  						<View style={styles.view6}>
  							{SegmentCount > 1 && <View style={styles.viewDot}/>}
  						</View>
  						<Image source={Res.get("place_dark")} style={styles.imageSize12} resizeMode="contain"/>
  					</View>

  					<View style={styles.viewCenter}>
  						<Text style={styles.txtDepart}>{arrive}</Text>
  						<Text style={styles.txtDuration}>{this.getDuration(item)}</Text>
  					</View>
  				</View>
  			</View>
  		</TouchableWithoutFeedback>
  	);
  }
	
	getFilterFlight = () => {
  	const {ticketing: {SearchFlights, setScreen}, filter} = this.props;
		const FlightsOnward = _.has(SearchFlights, "Results.Onward") ? SearchFlights.Results.Onward : [];
		const FlightsReturn = _.has(SearchFlights, "Results.Return") ? SearchFlights.Results.Return : [];
		const FlightList = setScreen === "OnwardScreen" ? FlightsOnward : FlightsReturn;
		
		switch (filter){
		case "Non Stop/Direct":
			return _.filter(FlightList, {SegmentCount: 1});
		case "With Stop/Connecting":
			return _.filter(FlightList, (o) => {
				return o.SegmentCount > 1;
			});
		case "Earliest Time":
		case "Any":
		case "Lowest Fare":
		default:
			return FlightList;
		}
	}

	render(){
  	const {ticketing: {isGetItineraryPrice, isSelectedFares}} = this.props;
		
  	return (
			<>
				<FlatList
					style={styles.padB30}
					data={this.getFilterFlight()}
					keyExtractor={(item, idx) => `${idx}`}
					renderItem={this.renderItem}/>
				<LoaderModal loading={isGetItineraryPrice || isSelectedFares}/>
			</>
  	);
	}
}

const styles = StyleSheet.create({
	view1: {backgroundColor: Color.white, borderWidth: 0.1, height: 90, borderColor: Color.AFAAAA, marginTop: 20, borderRadius: 3},
	view2: {height: "50%", flexDirection: "row", alignItems: "center", justifyContent: "center",
		borderBottomWidth: 0.75, borderBottomColor: Color.AFAAAA, marginHorizontal: 10},
	view3: {width: "30%", alignItems: "flex-end"},
	imageAirline: {width: 80, height: 30},
	txtPrice: {flexShrink: 1, fontFamily: "Roboto-Medium", fontSize: 20, color: Color.LightBlue5, marginHorizontal: 10, textAlign: "center"},
	txtCurrency: {fontFamily: "Roboto-Light", fontSize: 11, color: Color.LightBlue5, width: "30%", textAlign: "left"},
	view4: {height: "50%", flexDirection: "row", alignItems: "center", justifyContent: "center"},
	viewCenter: {alignItems: "center"},
	txtDepart: {fontFamily: "Roboto-Medium", fontSize: 11, color: Color.Header},
	txtDuration: {fontFamily: "Roboto-Medium", fontSize: 9, color: Color.Header},
	view5: {flexDirection: "row", alignItems: "center", paddingHorizontal: 5},
	view6: {width: 120, height: 1, backgroundColor: Color.Header, marginHorizontal: 10, alignItems: "center", justifyContent: "center"},
	viewDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: Color.Header},
	imageSize14: {width: 14, height: 14},
	imageSize12: {width: 12, height: 12},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 5}, shadowColor: Color.LightBlue5, borderWidth: 0.8,
				shadowOpacity: .5, shadowRadius: 5, zIndex: 4, borderColor: Color.LightBlue5},
			android: {elevation: 8, shadowColor: Color.LightBlue5, borderColor: Color.LightBlue5, borderWidth: 0.8},
		}),
	},
	padB30: {paddingBottom: 30},
});

Flights.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
	filter: PropTypes.string,
};

export default Flights;
