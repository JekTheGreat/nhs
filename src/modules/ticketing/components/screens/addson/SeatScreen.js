/* eslint-disable import/default */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React from "react";
import {ScrollView, View, StyleSheet, SafeAreaView,
	TouchableWithoutFeedback, Text} from "react-native";
import PropTypes from "prop-types";
import CustomScrollTab from "./CustomScrollTab";
import _ from "lodash";
import ButtomScreen from "../passenger/ButtomScreen";
import numeral from "numeral";
import Loading from "__src/components/Loading";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Modal from "react-native-modal";
import PassengerSeat from "./PassengerSeat";
import Resource from "__src/resources";
import Seats from "../../../seat.json";
const {Color} = Resource;

class SeatScreen extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			isVisible: true,
			showContent: false,
			isNotComplete: true,
			currentIndex: 0,
		};
	}

	onSelectSeat = (item, index) => {
		const {actions, ticketing: {selectDeparture, selectReturn}} = this.props;
		const params = {id: index, ...item};
		let result = null;

		if (!_.isEmpty(selectDeparture)){
			result = _.filter(selectDeparture.FlightSegments, (flight) => {
				return item.type === `${flight.DepartureStation}${flight.ArrivalStation}`;
			});
	
			if (result.length > 0){
				params.flightType = "onward";
			}
		}

		if (!_.isEmpty(selectReturn) && _.isEmpty(result)){
			result = _.filter(selectReturn.FlightSegments, (flight) => {
				return item.type === `${flight.DepartureStation}${flight.ArrivalStation}`;
			});
	
			if (result.length > 0){
				params.flightType = "return";
			}
		}

		actions.setSeat(params);
	}

	filter = (tabLabel, id) => {
		const {ticketing: {setSeat}} = this.props;
		const result = _.filter(setSeat[tabLabel], { id });
		if (result.length > 0){
			return result[0];
		}
		
		return {};
	}
  
	getSeats(tabLabel){
		const {ticketing: {setTicketingInput, isSearchingSeats, SeatFound}} = this.props;
		const adult = [];
		const SeatsData = SeatFound[tabLabel] || [];
		// const SeatsData = Seats.Rows;
		
		if (this.state.isNotComplete || (_.isEmpty(SeatsData) && isSearchingSeats)){
			return <Loading />;
		}

		if (_.isEmpty(SeatsData) && _.isArray(SeatsData)){
			return <Text style={styles.txtNodata}>No seats found!</Text>;
		}
		
  	for (let i = 0; i < setTicketingInput.adults; i++){
  		adult.push(<PassengerSeat onSelectSeat={(item) => this.onSelectSeat(item, i)} SeatsData={SeatsData}
				key={`${i}`} index={i} labelName={"ADULT"} type={tabLabel} setSeat={this.filter(tabLabel, i)} />);
		}
		
  	for (let i = 0; i < setTicketingInput.children; i++){
  		adult.push(<PassengerSeat onSelectSeat={(item) => this.onSelectSeat(item, setTicketingInput.adults + i)}
				key={`${setTicketingInput.adults + i}`} index={i} SeatsData={SeatsData}
				labelName={"CHILD"} type={tabLabel} setSeat={this.filter(tabLabel, setTicketingInput.adults + i)} />);
  	}

  	return adult;
	}

	onChangeTab = (tab) => {
  	const {ticketing: {SeatFound, selectDeparture, selectReturn}, login: {session}, actions} = this.props;
		const tabName = tab.ref.props.tabLabel;

		this.setState({currentIndex: tab.i}, () => {
			if (_.isEmpty(SeatFound[tabName])){
				let flightSegment = {};
				_.map(selectDeparture.FlightSegments, (item) => {
					const dep = item.DepartureStation;
					const ret = item.ArrivalStation;
					if (`${dep}${ret}` === tabName){
						flightSegment = {...item, selected: selectDeparture};
					}
				});

				if (_.isEmpty(flightSegment) && !_.isEmpty(selectReturn)){
					_.map(selectReturn.FlightSegments, (item) => {
						const dep = item.DepartureStation;
						const ret = item.ArrivalStation;
						if (`${dep}${ret}` === tabName){
							flightSegment = {...item, selected: selectReturn};
						}
					});
				}

				if (!_.isEmpty(flightSegment)){
					const params = {
						trackingNumber: flightSegment.selected.TrackingNumber,
						referenceNumber: flightSegment.selected.ReferenceNumber,
						flightSegment: {
							DepartureDate: flightSegment.STD,
							DepartureStation: flightSegment.DepartureStation,
							ArrivalStation: flightSegment.ArrivalStation,
							CarrierCode: flightSegment.FlightDesignator.CarrierCode,
							FlightNumber: flightSegment.FlightDesignator.FlightNumber,
						},
					};
					console.log("params", params, tabName);
	
					actions.getSeats(params, session.token, tabName);
				}
			}
		});
	}

  renderTab = () => {
  	const {ticketing: {SeatFound}} = this.props;
		
  	return (
  		<ScrollableTabView tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
  			ref={(e) => this.tabRef = e}
  			renderTabBar={() => <CustomScrollTab  {...this.props}/>}
  			tabBarTextStyle={styles.textStyle}
  			onChangeTab={this.onChangeTab}
  			tabBarInactiveTextColor={Color.Standard}
  			tabBarActiveTextColor={Color.white}>
  			{Object.keys(SeatFound).map((item) => {
  				return (
  					<ScrollView key={item} tabLabel={item}
  						showsVerticalScrollIndicator={false}
  						style={styles.scrollStyle}>
  						{this.getSeats(item)}
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

	getTotalSeat = () => {
		const {ticketing: {setSeat}} = this.props;
		let amount = 0, currency = "";
		
		if (!_.isEmpty(setSeat)){
			Object.keys(setSeat).map((item) => {
				amount +=  _.sumBy(setSeat[item], (item) => {
					currency = item.ServiceCharge.CurrencyCode;

					return item.ServiceCharge.TotalAmount;
				});
			});

			return {amount, currency };
		}

		return {amount, currency };
	}

	getButtonLabel = () => {
		const {ticketing: {setSeat}} = this.props;
		const {currentIndex} = this.state;

		return currentIndex === Object.keys(setSeat).length - 1 ? "Done" : "Next";
	}

	onButtonPress = () => {
		const {onClose, ticketing: {setSeat}} = this.props;
		const {currentIndex} = this.state;

		if (currentIndex === Object.keys(setSeat).length - 1){
			onClose();
			
			return;
		}
		
		this.tabRef.goToPage(currentIndex + 1);
	}

	render(){
  	const {isVisible, onClose} = this.props;
		const {currency, amount} = this.getTotalSeat();

  	return (
  		<Modal
  			testID={"modal"}
  			isVisible={isVisible}
  			hasBackdrop={false}
  			animationIn="slideInRight"
  			animationOut="slideOutRight"
  			onBackButtonPress={onClose}
  			// onSwipeComplete={onClose}
  			// swipeDirection={["right"]}
  			propagateSwipe
  			onModalShow={this.onModalShow}
  			onModalHide={this.onModalShow}
  			style={styles.modal}>
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

SeatScreen.propTypes = {
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

export default SeatScreen;
