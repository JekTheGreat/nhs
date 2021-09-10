/* eslint-disable max-len */
/* eslint-disable */
import React from "react";
import { View, Animated, StyleSheet,
	ScrollView, Text, ViewPropTypes, Image,
	Platform, TouchableWithoutFeedback,
	Dimensions} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
import createReactClass from "create-react-class";
const {Color, Res} = Resource;
const WINDOW_WIDTH = Dimensions.get("window").width;

const CustomScrollTab = createReactClass({
	propTypes: {
		goToPage: PropTypes.func,
		activeTab: PropTypes.number,
		tabs: PropTypes.array,
		backgroundColor: PropTypes.string,
		activeTextColor: PropTypes.string,
		inactiveTextColor: PropTypes.string,
		scrollOffset: PropTypes.number,
		style: ViewPropTypes.style,
		tabStyle: ViewPropTypes.style,
		tabsContainerStyle: ViewPropTypes.style,
		textStyle: Text.propTypes.style,
		renderTab: PropTypes.func,
		underlineStyle: ViewPropTypes.style,
		onScroll: PropTypes.func,
	},

	getDefaultProps() {
		return {
			scrollOffset: 52,
			activeTextColor: "navy",
			inactiveTextColor: "black",
			backgroundColor: null,
			style: {},
			tabStyle: {},
			tabsContainerStyle: {},
			underlineStyle: {},
		};
	},

	getInitialState() {
		this._tabsMeasurements = [];
		
		return {
			_leftTabUnderline: new Animated.Value(0),
			_widthTabUnderline: new Animated.Value(0),
			_containerWidth: null,
		};
	},

	componentDidMount() {
		this.props.scrollValue.addListener(this.updateView);
	},

	updateView(offset) {
		const position = Math.floor(offset.value);
		const pageOffset = offset.value % 1;
		const tabCount = this.props.tabs.length;
		const lastTabPosition = tabCount - 1;

		if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
			return;
		}

		if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
			this.updateTabPanel(position, pageOffset);
			this.updateTabUnderline(position, pageOffset, tabCount);
		}
	},

	necessarilyMeasurementsCompleted(position, isLastTab) {
		return this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements;
	},

	updateTabPanel(position, pageOffset) {
		const containerWidth = this._containerMeasurements.width;
		const tabWidth = this._tabsMeasurements[position].width;
		const nextTabMeasurements = this._tabsMeasurements[position + 1];
		const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
		const tabOffset = this._tabsMeasurements[position].left;
		const absolutePageOffset = pageOffset * tabWidth;
		let newScrollX = tabOffset + absolutePageOffset;

		// center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
		newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
		newScrollX = newScrollX >= 0 ? newScrollX : 0;

		if (Platform.OS === "android") {
			this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false });
		} else {
			const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
			newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
			this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false });
		}
	},

	updateTabUnderline(position, pageOffset, tabCount) {
		const lineLeft = this._tabsMeasurements[position].left;
		const lineRight = this._tabsMeasurements[position].right;

		if (position < tabCount - 1) {
			const nextTabLeft = this._tabsMeasurements[position + 1].left;
			const nextTabRight = this._tabsMeasurements[position + 1].right;

			const newLineLeft = (pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft);
			const newLineRight = (pageOffset * nextTabRight + (1 - pageOffset) * lineRight);

			this.state._leftTabUnderline.setValue(newLineLeft);
			this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
		} else {
			this.state._leftTabUnderline.setValue(lineLeft);
			this.state._widthTabUnderline.setValue(lineRight - lineLeft);
		}
  },
  
  getDataWithConnecting2(name){
		const {ticketing: {selectDeparture, selectReturn} } = this.props;
    let result = _.filter(selectDeparture.FlightSegments, (item) => {
      const dep = item.DepartureStation;
      const ret = item.ArrivalStation;
      return `${dep}${ret}` === name;
		});

    if(_.isEmpty(result)){
			const dep = selectDeparture.FlightSegments[0];
			const ret = selectDeparture.FlightSegments[selectDeparture.FlightSegments.length - 1];

			if(`${dep.DepartureStation}${ret.ArrivalStation}` === name){
				const originCity =  dep.Legs[0].DepartureAirport.CityName.split(",");
				const desCity = ret.Legs[0].ArrivalAirport.CityName.split(",");
				const departLocation = originCity[originCity.length - 1].trim();
				const returnLocation = desCity[desCity.length - 1].trim();
				const departIata = dep.DepartureStation;
				const returnIata = ret.ArrivalStation;

				return {departIata, returnIata, departLocation, returnLocation};
			}
		}

    if(_.isEmpty(result)){
      result = _.filter(selectReturn.FlightSegments, (item) => {
        const dep = item.DepartureStation;
        const ret = item.ArrivalStation;
        return `${dep}${ret}` === name;
			});
			
			if(_.isEmpty(result)){
				const dep = selectReturn.FlightSegments[0];
				const ret = selectReturn.FlightSegments[selectReturn.FlightSegments.length - 1];
	
				if(`${dep.DepartureStation}${ret.ArrivalStation}` === name){
					const originCity =  dep.Legs[0].DepartureAirport.CityName.split(",");
					const desCity = ret.Legs[0].ArrivalAirport.CityName.split(",");
					const departLocation = originCity[originCity.length - 1].trim();
					const returnLocation = desCity[desCity.length - 1].trim();
					const departIata = dep.DepartureStation;
					const returnIata = ret.ArrivalStation;
	
					return {departIata, returnIata, departLocation, returnLocation};
				}
			}
		}
		
		if(result.length > 0){
			const originCity =  result[0].Legs[0].DepartureAirport.CityName.split(",");
			const desCity = result[0].Legs[0].ArrivalAirport.CityName.split(",");
			const departLocation = originCity[originCity.length - 1].trim();
			const returnLocation = desCity[desCity.length - 1].trim();
			const departIata = result[0].DepartureStation;
			const returnIata = result[0].ArrivalStation;

			return {departIata, returnIata, departLocation, returnLocation};
		}

		return {departIata: "", returnIata: "", departLocation: "", returnLocation: ""};
	},
  getDataWithConnecting(name){
		const {ticketing: {selectDeparture, selectReturn} } = this.props;
    let result = _.filter(selectDeparture.FlightSegments, (item) => {
      const dep = item.DepartureStation;
      const ret = item.ArrivalStation;
      return `${dep}${ret}` === name;
		});

    if(_.isEmpty(result)){
      result = _.filter(selectReturn.FlightSegments, (item) => {
        const dep = item.DepartureStation;
        const ret = item.ArrivalStation;
        return `${dep}${ret}` === name;
      });
		}
		
		if(result.length > 0){
			const originCity =  result[0].Legs[0].DepartureAirport.CityName.split(",");
			const desCity = result[0].Legs[0].ArrivalAirport.CityName.split(",");
			const departLocation = originCity[originCity.length - 1].trim();
			const returnLocation = desCity[desCity.length - 1].trim();
			const departIata = result[0].DepartureStation;
			const returnIata = result[0].ArrivalStation;

			return {departIata, returnIata, departLocation, returnLocation};
		}

		return {departIata: "", returnIata: "", departLocation: "", returnLocation: ""};
	},

	getDataWithPerWay(name){
		const {ticketing: {selectDeparture, selectReturn} } = this.props;
		const dep = selectDeparture.FlightSegments[0];
		const ret = selectDeparture.FlightSegments[selectDeparture.FlightSegments.length - 1];
		let result = `${dep.DepartureStation}${ret.ArrivalStation}` === name;

		if(result){
			const originCity =  dep.Legs[0].DepartureAirport.CityName.split(",");
			const desCity = ret.Legs[0].ArrivalAirport.CityName.split(",");
			const departLocation = originCity[originCity.length - 1].trim();
			const returnLocation = desCity[desCity.length - 1].trim();
			const departIata = dep.DepartureStation;
			const returnIata = ret.ArrivalStation;

			return {departIata, returnIata, departLocation, returnLocation};
		}
		
		if(result === false && !_.isEmpty(selectReturn)){
			const dep2 = selectReturn.FlightSegments[0];
			const ret2 = selectReturn.FlightSegments[selectReturn.FlightSegments.length - 1];
			const originCity =  dep2.Legs[0].DepartureAirport.CityName.split(",");
			const desCity = ret2.Legs[0].ArrivalAirport.CityName.split(",");
			const departLocation = originCity[originCity.length - 1].trim();
			const returnLocation = desCity[desCity.length - 1].trim();
			const departIata = dep2.DepartureStation;
			const returnIata = ret2.ArrivalStation;

			return {departIata, returnIata, departLocation, returnLocation};
		}

		return {departIata: "", returnIata: "", departLocation: "", returnLocation: ""};
	},

	getBaggagePerType2(name){
		const {ticketing: {selectDeparture, selectReturn} } = this.props;
		let result = null;

		if (!_.isEmpty(selectDeparture)){
			result = _.filter(selectDeparture.FlightSegments, (flight) => {
				return name === `${flight.DepartureStation}${flight.ArrivalStation}`;
			});
	
			if (_.isEmpty(result)){
				const dep = selectDeparture.FlightSegments[0];
				const ret = selectDeparture.FlightSegments[selectDeparture.FlightSegments.length - 1];

				if (name === `${dep.DepartureStation}${ret.ArrivalStation}`){
					params.flightType = "onward";
				}
			} else if (result.length > 0){
				params.flightType = "onward";
			}
		}

		if (!_.isEmpty(selectReturn) && _.isEmpty(result)){
			result = _.filter(selectReturn.FlightSegments, (flight) => {
				return name === `${flight.DepartureStation}${flight.ArrivalStation}`;
			});
	
			if (_.isEmpty(result)){
				const dep = selectReturn.FlightSegments[0];
				const ret = selectReturn.FlightSegments[selectReturn.FlightSegments.length - 1];

				if (name === `${dep.DepartureStation}${ret.ArrivalStation}`){
					params.flightType = "return";
				}
			} else if (result.length > 0){
				params.flightType = "return";
			}
		}
	},
	getBaggagePerType(name){
		const {ticketing: {selectDeparture, selectReturn} } = this.props;

		if(!_.isEmpty(selectDeparture) && selectDeparture.BaggageType === "PerSegment"){
			return this.getDataWithConnecting(name);
		}else if(!_.isEmpty(selectDeparture) && selectDeparture.BaggageType === "PerWay"){
			return this.getDataWithPerWay(name);
		}else if(!_.isEmpty(selectReturn) && selectReturn.BaggageType === "PerSegment"){
			return this.getDataWithConnecting(name);
		}else if(!_.isEmpty(selectReturn) && selectReturn.BaggageType === "PerWay"){
			return this.getDataWithPerWay(name);
		}
	},

	renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
		const { activeTextColor, inactiveTextColor, textStyle } = this.props;
		const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? "bold" : "normal";
		const page0  = page === 0 ? {borderTopLeftRadius: 20} : null;
    const opacity = isTabActive ? {opacity: 1} : {opacity: 0.7};
		const {departIata, returnIata, departLocation, returnLocation} = this.getDataWithConnecting2(name);
    
    return (
			<TouchableWithoutFeedback
				key={name}
				accessible
				accessibilityLabel={name}
				accessibilityTraits='button'
				onPress={() => onPressHandler(page, name)} 
        onLayout={onLayoutHandler}>
				<View style={[styles.tab, this.props.tabStyle, page0]}>
					<View style={[styles.view1, opacity]}>
						<View style={styles.viewCenter}>
							<Text style={styles.txtIata}>{departIata}</Text>
							<Text style={styles.txtCountry}>{departLocation}</Text>
						</View>
						<Image style={styles.imageDepart} source={Res.get("depart_white")} resizeMode="contain"/>
						<View style={styles.viewCenter}>
							<Text style={styles.txtIata}>{returnIata}</Text>
							<Text style={styles.txtCountry}>{returnLocation}</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	},

	measureTab(page, event) {
		const { x, width, height } = event.nativeEvent.layout;
		this._tabsMeasurements[page] = {left: x, right: x + width, width, height };
		this.updateView({value: this.props.scrollValue.__getValue() });
	},

	render() {
		const tabUnderlineStyle = {
			position: "absolute",
			height: 2,
			backgroundColor: "navy",
      bottom: 0,
			backgroundColor: Color.colorPrimary,
		};

		const dynamicTabUnderline = {
			left: this.state._leftTabUnderline,
			width: this.state._widthTabUnderline,
		};

		const {
			onScroll,
		} = this.props;

		return (<View
			style={[styles.container, {backgroundColor: this.props.backgroundColor }, this.props.style ]}
			onLayout={this.onContainerLayout}
		>
			<ScrollView
				ref={(scrollView) => {
					this._scrollView = scrollView;
        }}
        scrollEnabled={this.props.tabs.length > 1}
        style={styles.scrollStyle}
				horizontal
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				directionalLockEnabled
				bounces={false}
				scrollsToTop={false}
				onScroll={onScroll}
				scrollEventThrottle={16} >
				<View
					style={[styles.tabs, {width: this.state._containerWidth }, this.props.tabsContainerStyle ]}
					ref={"tabContainer"}
					onLayout={this.onTabContainerLayout}>
					{this.props.tabs.map((name, page) => {
						const isTabActive = this.props.activeTab === page;
						const renderTab = this.props.renderTab || this.renderTab;
						
						return renderTab(name, page, isTabActive, this.props.goToPage, this.measureTab.bind(this, page));
					})}
					<Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, this.props.underlineStyle ]} />
				</View>
			</ScrollView>
		</View>);
	},

	componentDidUpdate(prevProps) {
		// If the tabs change, force the width of the tabs container to be recalculated
		if (JSON.stringify(prevProps.tabs) !== JSON.stringify(this.props.tabs) && this.state._containerWidth) {
			this.setState({ _containerWidth: null });
		}
	},

	onTabContainerLayout(e) {
		this._tabContainerMeasurements = e.nativeEvent.layout;
		let width = this._tabContainerMeasurements.width;
		if (width < WINDOW_WIDTH) {
			width = WINDOW_WIDTH;
		}
		this.setState({ _containerWidth: width });
		this.updateView({value: this.props.scrollValue.__getValue() });
	},

	onContainerLayout(e) {
		this._containerMeasurements = e.nativeEvent.layout;
		this.updateView({value: this.props.scrollValue.__getValue() });
	},
});

const styles = StyleSheet.create({
	tab: {
		height: 49,
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 20,
    paddingRight: 20,
	},
	container: {
		height: 50,
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
    borderColor: "#ccc",
    borderTopLeftRadius: 20
	},
	tabs: {
		flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Color.Header,
    borderTopLeftRadius: 20
  },
  scrollStyle: {backgroundColor: Color.Header,  borderTopLeftRadius: 20},
  view1: {flexDirection: "row", alignItems: "center", justifyContent: "center"},
	viewCenter: {alignItems: "center"},
	txtIata: {fontFamily: "Montserrat-Medium", fontSize: 12, color: Color.white},
	txtCountry: {fontFamily: "Montserrat-Medium", fontSize: 7, color: Color.white},
	imageDepart: {width: 15, height: 15, marginHorizontal: 5},
});

export default CustomScrollTab;
