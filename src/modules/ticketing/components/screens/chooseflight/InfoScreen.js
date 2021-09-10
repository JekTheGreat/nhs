/* eslint-disable max-len */
import React from "react";
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Image, Dimensions} from "react-native";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
import _ from "lodash";
import GetAddOns from "../payment/GetAddOns";
import Detail from "__src/components/Detail";
import moment from "moment";
import Oneway from "__src/resources/svg/ticketing/Oneway";
import numeral from "numeral";
import Resource from "__src/resources";
import Dash from "react-native-dash";
const SCREEN_WIDTH = Dimensions.get("window").width;

const {Color, Res} = Resource;

class InfoScreen extends React.PureComponent{
	getDuration = (item) => {
		const DepartureDate = moment(item.DepartureDate);
		const ArrivalDate = moment(item.ArrivalDate);
		const duration = moment.duration(ArrivalDate.diff(DepartureDate));
		const days = duration.days() > 0 ? `${duration.days()}D ` : "";
		const hour = duration.hours() > 0 ? `${duration.hours()}h ` : "";
		const minute = duration.minutes() > 0 ? `${duration.minutes()}m` : "";

		return `${days}${hour}${minute}`;
	}

	renderFare = (item, index) => {
		const {PassengerTypeQuantity, PassengerFare} = item;

		return (
			<View key={`${index}`} style={[styles.viewLayover]}>
				<Text style={styles.txtPax}>{PassengerTypeQuantity.Quantity}x {PassengerTypeQuantity.Code}</Text>
				<Text style={styles.txtAmount}>{PassengerFare.BaseFare.CurrencyCode} {numeral(PassengerFare.BaseFare.Amount).format("0,000.00")}</Text>
			</View>
		);
	}

	getTerminalWord = (terminal) => {

		if (terminal.length > 3){
			return terminal;
		}
		
		return `Terminal ${terminal}`;
	}

	renderFlight = (item, index) => {
		const {MarketingAirline, DepartureAirport, ArrivalAirport} = item;
		const DepCityName = DepartureAirport.CityName.split(",");
		const ArriveCityName = DepartureAirport.CityName.split(",");
		const depart = moment(item.DepartureDate).format("hh:mm A");
		const arrive = moment(item.ArrivalDate).format("hh:mm A");
		const source = {uri: `https://storage.googleapis.com/v3-pub-images/ticketing/airlines/${item.OperatingAirline.Code}.png`};
		const DepartTerminal = _.isEmpty(DepartureAirport.TerminalID) ? null : this.getTerminalWord(DepartureAirport.TerminalID.trim());
		const ArrivalTerminal = _.isEmpty(ArrivalAirport.TerminalID) ? null : this.getTerminalWord(ArrivalAirport.TerminalID.trim());
		
		return (
			<View key={`${index}`}>
				{index !== 0 && <View style={[styles.viewLayover, styles.marT15]}>
					<Text style={[styles.txtFare]}>Layover in {DepCityName[0].trim()}</Text>
					<Text style={styles.txtFlightNo}>{MarketingAirline.Code} {MarketingAirline.FlightNumber}</Text>
				</View>}
				<View style={[styles.view4]}>
  				<Image style={styles.imagePlane} source={source} resizeMode="contain"/>
  				<View style={styles.flexGrow}>
  					<View style={styles.view2}>
  						<View style={styles.viewCenter}>
  							<Text style={styles.txtIata}>{DepartureAirport.LocationCode}</Text>
  							<Text style={styles.txtCountry}>{DepCityName[DepCityName.length - 1].trim()}</Text>
  						</View>
  						<Image style={styles.imageDepart} source={Res.get("Departure")} resizeMode="contain"/>
  						<View style={styles.viewCenter}>
  							<Text style={styles.txtIata}>{ArrivalAirport.LocationCode}</Text>
  							<Text style={styles.txtCountry}>{ArriveCityName[ArriveCityName.length - 1]}</Text>
  						</View>
  					</View>

  					<View style={[styles.view2, styles.marT5]}>
							<Text style={styles.txtTime}>{depart}</Text>
  						<View style={styles.viewDash}/>
							<Text style={styles.txtTime}>{arrive}</Text>
  					</View>
						<Text style={[styles.txtTime, styles.txtCenter]}>{this.getDuration(item)}</Text>

						<View style={[styles.view2, styles.marT5]}>
							<Text numberOfLines={2} style={[styles.txtCountry, styles.fontSize11]}>{DepartTerminal}</Text>
  						<View style={styles.viewDash2}/>
							<Text numberOfLines={2} style={[styles.txtCountry, styles.fontSize11]}>{ArrivalTerminal}</Text>
  					</View>

  				</View>
  			</View>
				<Dash style={styles.dash} dashThickness={0.5} dashLength={10} dashGap={5}	dashColor={Color.LightBlue5} />
			</View>
		);
	}

	getTotalBaggage = (selected) => {
		const {ticketing: {setBaggage}} = this.props;
		let TotalBaggage = 0;

		if (selected){
			_.map(selected.FlightSegments, (segment) => {
				const dep = segment.DepartureStation;
				const ret = segment.ArrivalStation;

				TotalBaggage += _.sumBy(setBaggage[`${dep}${ret}`], "Amount");
			});
		}

		return TotalBaggage;
	}

	getTotalSeat = (selected) => {
		const {ticketing: {setSeat}} = this.props;
		let TotalSeat = 0;

		if (selected){
			_.map(selected.FlightSegments, (segment) => {
				const dep = segment.DepartureStation;
				const ret = segment.ArrivalStation;

				TotalSeat += _.sumBy(setSeat[`${dep}${ret}`], (seat) => {
					return seat.ServiceCharge.TotalAmount;
				});
			});
		}

		return TotalSeat;
	}

  renderDepart = () => {
  	const {ticketing: {selectDeparture, setBaggage, setSeat}} = this.props;
		
  	if (_.isEmpty(selectDeparture.FlightSegments)){
  		return null;
  	}
		
  	const dept = this.getFlightLegDeparture();
  	const depart = moment(dept[0].DepartureDate).format("D MMMM YYYY");
  	const FlightNumber  = dept[0].FlightNumber;
  	const Code  = dept[0].MarketingAirline.Code;
  	const TotalAmount  = selectDeparture.AirItineraryPricingInfo.TotalFare.Amount;
  	const Currency  = selectDeparture.AirItineraryPricingInfo.TotalFare.CurrencyCode;
  	const FareBreakdowns = _.has(selectDeparture, "AirItineraryPricingInfo.FareBreakdowns") ?
  		selectDeparture.AirItineraryPricingInfo.FareBreakdowns : [];
  	const TotalBaggage = this.getTotalBaggage(selectDeparture);
  	const TotalSeat = this.getTotalSeat(selectDeparture);

  	return (
  		<View style={styles.flex1}>
  			<View style={styles.view3}>
  				<View>
  					<Text style={styles.labelHeader}>DEPARTURE: </Text>
  					<Text style={styles.txtDate}>{depart}</Text>
  				</View>
  				<Text style={styles.txtFlightNo}>{Code} {FlightNumber}</Text>
  			</View>

  			{_.map(dept, (item, index) => this.renderFlight(item, index))}

  			<View style={[styles.marT15]}>
  				<View style={[styles.view3]}>
  					<Text style={styles.txtFare}>FLY</Text>
  				</View>
  				<Text style={styles.txtCategory}>BASE FARE</Text>
  				{_.map(FareBreakdowns, (item, index) => this.renderFare(item, index))}

  				<GetAddOns setBaggage={setBaggage} setSeat={setSeat} selected={selectDeparture} />
  				

  				<Text style={[styles.labelHeader, styles.marT10]}>DEPARTURE TOTAL:</Text>
  				<Text style={[styles.txtTotal, styles.marT5]}>
  					<Text style={styles.fontSize13}>{Currency} </Text>
  					{numeral(TotalAmount + TotalBaggage + TotalSeat).format("0,000.00")}</Text>

  				{selectDeparture.Remarks && <Text style={styles.txtNote}>
  					<Text style={styles.txtNote2}>Note: </Text>
  					{selectDeparture.Remarks}</Text>}
  			</View>
  		</View>
  	);
  }

  renderReturn = () => {
  	const {ticketing: {selectReturn, setBaggage, setSeat}} = this.props;
		
  	if (_.isEmpty(selectReturn)){
  		return null;
  	}
		
  	const ret = this.getFlightLegReturn();
  	const depart = moment(ret[0].DepartureDate).format("D MMMM YYYY");
  	const FlightNumber  = ret[0].FlightNumber;
  	const Code  = ret[0].MarketingAirline.Code;
  	const TotalAmount  = selectReturn.AirItineraryPricingInfo.TotalFare.Amount;
  	const Currency  = selectReturn.AirItineraryPricingInfo.TotalFare.CurrencyCode;
  	const FareBreakdowns = _.has(selectReturn, "AirItineraryPricingInfo.FareBreakdowns") ?
  		selectReturn.AirItineraryPricingInfo.FareBreakdowns : [];
  	const TotalBaggage = this.getTotalBaggage(selectReturn);
  	const TotalSeat = this.getTotalSeat(selectReturn);
			
  	return (
  		<View>
  			<Dash style={styles.dash} dashThickness={1} dashLength={10} dashGap={5}	dashColor={Color.Header} />
  			<View style={[styles.view3, styles.marT15]}>
  				<View>
  					<Text style={styles.labelHeader}>RETURN: </Text>
  					<Text style={styles.txtDate}>{depart}</Text>
  				</View>
  				<Text style={styles.txtFlightNo}>{Code} {FlightNumber}</Text>
  			</View>

  			{_.map(ret, (item, index) => this.renderFlight(item, index))}

  			<View style={styles.marT15}>
  				<View style={styles.view3}>
  					<Text style={styles.txtFare}>FLY</Text>
  				</View>
  				<Text style={styles.txtCategory}>BASE FARE</Text>

  				{_.map(FareBreakdowns, (item, index) => this.renderFare(item, index))}

  				<GetAddOns setBaggage={setBaggage} setSeat={setSeat} selected={selectReturn} />
  				<Text style={[styles.labelHeader, styles.marT10]}>RETURN TOTAL:</Text>
  				<Text style={[styles.txtTotal, styles.marT5]}>
  					<Text style={styles.fontSize13}>{Currency} </Text>
  					{numeral(TotalAmount + TotalBaggage + TotalSeat).format("0,000.00")}</Text>

  				{selectReturn.Remarks && <Text style={styles.txtNote}>
  					<Text style={styles.txtNote2}>Note: </Text>
  					{selectReturn.Remarks}</Text>}
  			</View>
  		</View>
  	);
  }
	
	renderTaxes = () => {
  	const {ticketing: {selectReturn,  selectDeparture, selectedFare}} = this.props;
		
  	if (_.isEmpty(selectedFare)){
  		return null;
		}

  	const Currency  = selectDeparture.AirItineraryPricingInfo.TotalFare.CurrencyCode;
		const taxesReturn = _.isEmpty(selectReturn) ? 0 : selectReturn.AirItineraryPricingInfo.Tax.Amount;
		const taxesSum = selectDeparture.AirItineraryPricingInfo.Tax.Amount + taxesReturn;
  	const TotalBaggageDepart = this.getTotalBaggage(selectDeparture);
		const TotalSeatDepart = this.getTotalSeat(selectDeparture);
  	const TotalBaggageReturn = this.getTotalBaggage(selectReturn);
		const TotalSeatReturn = this.getTotalSeat(selectReturn);
		const totalTaxes = taxesSum + selectedFare.actualServiceCharge + selectedFare.markup -
    (selectedFare.dealerDiscount + selectedFare.clientDiscount);
		const totalBaseFare = selectedFare.baseFare;
		const totalAncillaries = TotalBaggageDepart + TotalSeatDepart + TotalBaggageReturn + TotalSeatReturn;
		const totalAmount = totalTaxes + totalBaseFare + totalAncillaries;
			
  	return (
  		<View>
  			<Dash style={styles.dash} dashThickness={1} dashLength={10} dashGap={5}	dashColor={Color.Header} />
				<Detail Wrapper2={{marginTop: 15}} label="Total Taxes and Fees"
					labelStyle2={styles.labelStyle2}
					value={`${Currency} ${numeral(totalTaxes).format("0,000.00")}`}
					valueStyle2={styles.valueStyle2} />
				<Detail Wrapper2={{marginTop: 5}} label="Total Base Fare"
					labelStyle2={styles.labelStyle2}
					 value={`${Currency} ${numeral(totalBaseFare).format("0,000.00")}`}
					 valueStyle2={styles.valueStyle2} />
				<Detail Wrapper2={{marginTop: 5}} label="Total Ancillaries"
					labelStyle2={styles.labelStyle2}
					value={`${Currency} ${numeral(totalAncillaries).format("0,000.00")}`}
					valueStyle2={styles.valueStyle2} />

				<Detail Wrapper2={{marginTop: 5}} label="Grand Total"
					labelStyle2={[styles.labelStyle2, styles.fontSize16]}
					value={`${Currency} ${numeral(totalAmount).format("0,000.00")}`}
					valueStyle2={[styles.valueStyle2, styles.fontSize16]} />
  		</View>
  	);
	}
	
	getFlightLegDeparture = () => {
		const {ticketing: {selectDeparture}} = this.props;
		const FlightSegment = [];
		_.map(selectDeparture.FlightSegments, (item) => {
			_.map(item.Legs, (legs) => {
				FlightSegment.push(legs);
			});
		});

		return FlightSegment;
	}

	getFlightLegReturn= () => {
		const {ticketing: {selectReturn}} = this.props;
		const FlightSegment = [];
		_.map(selectReturn.FlightSegments, (item) => {
			_.map(item.Legs, (legs) => {
				FlightSegment.push(legs);
			});
		});

		return FlightSegment;
	}

	render(){
  	const {visible, onClose} = this.props;

  	return (
  		<Modal
  			transparent
  			animationType={"slide"}
  			visible={visible}
  			onRequestClose={onClose}>
  			<View style={styles.container}>
  				<View style={styles.view1} >
  					<ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
  						{this.renderDepart()}
  						{this.renderReturn()}
  						{this.renderTaxes()}
  						<View style={styles.height30}/>
  					</ScrollView>
  				</View>

  				<TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.button}>
  					<Icon name="close" size={30} color="white" />
  				</TouchableOpacity>
  			</View>
  		</Modal>
  	);
	}
}

InfoScreen.propTypes = {
	visible: PropTypes.bool,
	onClose: PropTypes.func,
	ticketing: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1, height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.2)" },
	view1: {width: SCREEN_WIDTH - 60, height: "75%", backgroundColor: "white",
		borderTopRightRadius: 15, borderTopLeftRadius: 15, padding: 15, borderBottomRightRadius: 15, borderBottomLeftRadius: 15},
	view2: {flexDirection: "row", alignItems: "center", justifyContent: "center"},
	view3: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7},
	view4: {flexDirection: "row",  marginTop: 10 },
	viewCenter: {alignItems: "center"},
	txtIata: {fontFamily: "Montserrat-Medium", fontSize: 20, color: Color.Header},
	txtCountry: {fontFamily: "Montserrat-Medium", fontSize: 12, color: Color.Header},
	imageDepart: {width: 20, height: 20, marginHorizontal: 20},
	txtTime: {fontFamily: "Roboto-Medium", fontSize: 11, color: Color.Header},
	txtCenter: {textAlign: "center", marginTop: 5},
	marT5: { marginTop: 5},
	marT10: { marginTop: 10},
	marT15: {marginTop: 15},
	labelHeader: {fontFamily: "Montserrat-Medium", fontSize: 15, color: Color.text1},
	txtPax: {fontFamily: "Roboto", fontSize: 11, fontWeight: "bold"},
	txtTotal: {fontFamily: "Roboto-Medium", fontSize: 17, color: Color.LightBlue5},
	txtAmount: {fontFamily: "Roboto-Medium", fontSize: 11, color: Color.LightBlue5},
	button: {padding: 5, backgroundColor: Color.LightBlue5, borderRadius: 100, marginTop: 20},
	txtDate: {fontFamily: "Roboto", fontSize: 11, color: Color.Header, fontWeight: "bold", marginTop: 3},
	txtFlightNo: {fontFamily: "Montserrat-Medium", fontSize: 20, color: Color.LightBlue5},
	flexGrow: {flexGrow: 1 },
	imagePlane: {width: 70, height: 40, flexShrink: 1, marginRight: 7},
	viewDash: {width: 40, height: 0.5, backgroundColor: Color.Header, marginHorizontal: 10},
	viewDash2: {width: 30, marginHorizontal: 10},
	txtFare: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 11, color: Color.LightBlue5},
	fontSize11: {fontSize: 11, width: 80, textAlign: "center"},
	fontSize13: {fontSize: 13},
	fontSize16: {fontSize: 16},
	flex1: {flex: 1},
	dash: {width: "100%", height: 1, marginTop: 15},
	viewLayover: {flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
	height30: {height: 30},
	txtCategory: {fontFamily: "Roboto", fontSize: 11, fontWeight: "bold", color: Color.Header, marginTop: 5},
	txtNote: {fontFamily: "Roboto", fontSize: 12, color: Color.red, marginTop: 7},
	txtNote2: {fontFamily: "Roboto", fontWeight: "bold"},
	labelStyle2: { fontFamily: "Roboto", fontWeight: "bold", color: Color.Header},
	valueStyle2: { fontFamily: "Roboto", fontWeight: "bold", color: Color.LightBlue5},
});

export default InfoScreen;
