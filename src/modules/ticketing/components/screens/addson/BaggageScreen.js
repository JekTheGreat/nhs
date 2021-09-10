/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React from "react";
import {ScrollView, View, StyleSheet, SafeAreaView,
	TouchableWithoutFeedback, Text} from "react-native";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
import CustomScrollTabBaggage from "./CustomScrollTabBaggage";
import ButtomScreen from "../passenger/ButtomScreen";
import numeral from "numeral";
import _ from "lodash";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Modal from "react-native-modal";
import PassengerBaggage from "./PassengerBaggage";
import Resource from "__src/resources";
const {Color} = Resource;

class BaggageScreen extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			isVisible: true,
			showContent: false,
			isNotComplete: true,
			currentIndex: 0,
		};
	}

	onSelectBaggage = (item, index) => {
		const {actions, ticketing: {selectDeparture, selectReturn}} = this.props;
		const params = {id: index, ...item};
		let result = null;

		if (!_.isEmpty(selectDeparture)){
			result = _.filter(selectDeparture.FlightSegments, (flight) => {
				return item.type === `${flight.DepartureStation}${flight.ArrivalStation}`;
			});
	
			if (_.isEmpty(result)){
				const dep = selectDeparture.FlightSegments[0];
				const ret = selectDeparture.FlightSegments[selectDeparture.FlightSegments.length - 1];

				if (item.type === `${dep.DepartureStation}${ret.ArrivalStation}`){
					params.flightType = "onward";
				}
			} else if (result.length > 0){
				params.flightType = "onward";
			}
		}

		if (!_.isEmpty(selectReturn) && _.isEmpty(result)){
			result = _.filter(selectReturn.FlightSegments, (flight) => {
				return item.type === `${flight.DepartureStation}${flight.ArrivalStation}`;
			});
	
			if (_.isEmpty(result)){
				const dep = selectReturn.FlightSegments[0];
				const ret = selectReturn.FlightSegments[selectReturn.FlightSegments.length - 1];

				if (item.type === `${dep.DepartureStation}${ret.ArrivalStation}`){
					params.flightType = "return";
				}
			} else if (result.length > 0){
				params.flightType = "return";
			}
		}

		actions.setBaggage(params);
	}

	filter = (tabLabel, id) => {
		const {ticketing: {setBaggage}} = this.props;

		const result = _.filter(setBaggage[tabLabel], { id });
		if (result.length > 0){
			return result[0];
		}
		
		return {};
	}
  
	getAdult(tabLabel){
		const {ticketing: {setTicketingInput, BaggageList, isGettingBaggage}} = this.props;
		const adult = [];
		const BaggageData = BaggageList[tabLabel];

		if (this.state.isNotComplete || (_.isEmpty(BaggageData) && isGettingBaggage)){
			return <Loading />;
		}

		if (_.isEmpty(BaggageData) && !isGettingBaggage){
			return <Text style={styles.txtNodata}>No baggage found!</Text>;
		}

  	for (let i = 0; i < setTicketingInput.adults; i++){
  		adult.push(<PassengerBaggage key={`${i}`} index={i} onSelectBaggage={(item) => this.onSelectBaggage(item, i)}
			  BaggageList={BaggageData} labelName={"ADULT"} type={tabLabel} setBaggage={this.filter(tabLabel, i)}/>);
		}
		
		for (let x = 0; x < setTicketingInput.children; x++){
			adult.push(<PassengerBaggage key={`${setTicketingInput.adults + x}`} index={x}
				onSelectBaggage={(item) => this.onSelectBaggage(item, setTicketingInput.adults + x)}
			 	labelName={"CHILD"} type={tabLabel} BaggageList={BaggageData}
				setBaggage={this.filter(tabLabel, setTicketingInput.adults + x)}/>);
		}

  	return adult;
	}
	
	getFlights = () => {
  	const {ticketing: {setTicketingInput}} = this.props;
		const arrays = ["ONWARD"];

		if (setTicketingInput.flightTripType === "Return"){
			arrays.push("RETURN");
		}

		return arrays;
	}

	onChangeTab = (tab) => {
  	const {ticketing: {BaggageList, selectDeparture, selectReturn}, login: {session}, actions} = this.props;
		const tabName = tab.ref.props.tabLabel;

		this.setState({currentIndex: tab.i}, () => {
			if (_.isEmpty(BaggageList[tabName])){
				let segment = {};
				_.map(selectDeparture.FlightSegments, (item) => {
					const dep = item.DepartureStation;
					const ret = item.ArrivalStation;
					const flightCount = selectDeparture.FlightSegments.length;
					const depCount = selectDeparture.FlightSegments[0].DepartureStation;
					const retCount = selectDeparture.FlightSegments[flightCount - 1].ArrivalStation;
					const segmentKeys = _.isEqual(selectDeparture.BaggageType, "PerWay") ? `${depCount}${retCount}` : `${dep}${ret}`;
					
					if (segmentKeys === tabName){
						segment = {...item, selected: selectDeparture};
					}
				});

				if (_.isEmpty(segment.Legs) && !_.isEmpty(selectReturn)){
					_.map(selectReturn.FlightSegments, (item) => {
						const dep = item.DepartureStation;
						const ret = item.ArrivalStation;
						const flightCount = selectReturn.FlightSegments.length;
						const depCount = selectReturn.FlightSegments[0].DepartureStation;
						const retCount = selectReturn.FlightSegments[flightCount - 1].ArrivalStation;
						const segmentKeys = _.isEqual(selectReturn.BaggageType, "PerWay") ? `${depCount}${retCount}` : `${dep}${ret}`;

						if (segmentKeys === tabName){
							segment = {...item, selected: selectReturn};
						}
					});
				}

				if (!_.isEmpty(segment)){
					const legs = [];
					_.map(segment.Legs, (leg) => {
						const params = {
							DepartureDate: leg.DepartureDate,
							DepartureStation: leg.DepartureAirport.LocationCode,
							ArrivalStation: leg.ArrivalAirport.LocationCode,
							CarrierCode: leg.MarketingAirline.Code,
							FlightNumber: leg.MarketingAirline.FlightNumber,
						};
						legs.push(params);
					});
					const params = {
						trackingNumber: segment.selected.TrackingNumber,
						referenceNumber: segment.selected.ReferenceNumber,
						legs,
					};
	
					actions.getBaggages(params, session.token, tabName);
				}
			}
		});
	}

  renderTab = () => {
  	const {ticketing: {BaggageList}} = this.props;
		
  	return (
  		<ScrollableTabView tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
  			ref={(e) => this.tabRef = e}
  			onChangeTab={this.onChangeTab}
  			renderTabBar={() => <CustomScrollTabBaggage {...this.props}/>}
  			tabBarTextStyle={styles.textStyle}
  			tabBarInactiveTextColor={Color.Standard}
  			tabBarActiveTextColor={Color.white}>
  			{Object.keys(BaggageList).map((item) => {
  				return (
  					<ScrollView key={item} tabLabel={item}
  						showsVerticalScrollIndicator={false}
  						style={styles.scrollStyle}>
  						{this.getAdult(item)}
  						<View style={styles.height30}/>
  					</ScrollView>
  				);
  			})}
  		</ScrollableTabView>
  	);
  }
	
	onModalShow = () => {
		this.setState({isNotComplete: !this.state.isNotComplete});
	}

	getTotalBaggage = () => {
		const {ticketing: {setBaggage}} = this.props;
		let amount = 0, currency = "";
		Object.keys(setBaggage).map((bag) => {
			_.map(setBaggage[bag], (item) => {
				amount += item.Amount;
				currency = item.CurrencyCode;
			});
		});

		return {amount, currency};
	}

	getButtonLabel = () => {
		const {ticketing: {setBaggage}} = this.props;
		const {currentIndex} = this.state;

		return currentIndex === Object.keys(setBaggage).length - 1 ? "Done" : "Next";
	}

	onButtonPress = () => {
		const {onClose, ticketing: {setBaggage}} = this.props;
		const {currentIndex} = this.state;

		if (currentIndex === Object.keys(setBaggage).length - 1){
			onClose();
			
			return;
		}
		
		this.tabRef.goToPage(currentIndex + 1);
	}

	render(){
		const {isVisible, onClose} = this.props;
		const {currency, amount} = this.getTotalBaggage();
		
  	return (
  		<Modal
  			testID={"modal"}
  			isVisible={isVisible}
  			hasBackdrop={false}
  			animationIn="slideInRight"
  			animationOut="slideOutRight"
  			onBackButtonPress={onClose}
  			propagateSwipe
  			style={styles.modal}
				onModalShow={this.onModalShow}
  			onModalHide={this.onModalShow}>
  			<TouchableWithoutFeedback onPress={onClose}>
  				<SafeAreaView style={styles.modal}>
  					<TouchableWithoutFeedback>
  						<View style={styles.container}>
  							{this.renderTab()}
								<ButtomScreen currency={currency} amount={numeral(amount).format("0,000.00")}
									totalLabel="Subtotal:" buttonLabel={this.getButtonLabel()}
									onSubmit={this.onButtonPress} hasInfo={false} />
  						</View>
  					</TouchableWithoutFeedback>
  			  </SafeAreaView >
  			</TouchableWithoutFeedback>
  		</Modal>

  	);
	}
}

BaggageScreen.propTypes = {
	ticketing: PropTypes.object,
	login: PropTypes.object,
	actions: PropTypes.object,
	isVisible: PropTypes.bool,
	onClose: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {flex: 1,  marginLeft: 60},
	scrollStyle: {flex: 1, backgroundColor: Color.bg2, paddingHorizontal: 10},
	modal: { flex: 1, margin: 0, backgroundColor: "rgba(0,0,0,0.4)" },
	height30: {height: 30},
	txtNodata: {fontFamily: "Roboto", fontSize: 14, color: Color.Header, textAlign: "center", marginTop: 20},
});

export default BaggageScreen;
