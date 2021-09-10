
/* eslint-disable */
import React from "react";
import { Text, View, Image } from "react-native";
import StepIndicator from "__src/resources/customize/StepIndicator";
import Selection from "./Selection";
import PrimaryID from "./PrimaryID";
import SecondaryID from "./SecondaryID";
import Summary from "./Summary";
import _ from "lodash";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import Resource from "__src/resources";
const {Color} = Resource;

const customStyless = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 32,
	separatorStrokeWidth: 1,
	currentStepStrokeWidth: 2,
	stepStrokeCurrentColor: "#eeb91a",
	stepStrokeWidth: 2,
	stepStrokeFinishedColor: "#eeb91a",
	stepStrokeUnFinishedColor: "#aaaaaa",
	separatorFinishedColor: "#eeb91a",
	separatorUnFinishedColor: "#aaaaaa",
	stepIndicatorFinishedColor: "#eeb91a",
	stepIndicatorUnFinishedColor: "#ffffff",
	stepIndicatorCurrentColor: "#ffffff",
	stepIndicatorLabelFontSize: 13,
	currentStepIndicatorLabelFontSize: 14,
	stepIndicatorLabelCurrentColor: "#eeb91a",
	stepIndicatorLabelFinishedColor: "#ffffff",
	stepIndicatorLabelUnFinishedColor: "#aaaaaa",
	labelColor: "#1f354f",
	labelSize: 12,
	currentStepLabelColor: Color.colorPrimary,
};

class PayoutScreen extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			currentPosition: 0,
		};
	}

	componentDidMount(){
		const {actions, login: {session}} = this.props;

		actions.fetchProviderPayout(session.token)
	}

	back = () => {
		const {navigation} = this.props;

		navigation.goBack();
	}
	
	position = () => {
		const {remittance: { setPayoutScreen, selectPayoutProvider } } = this.props;
		const index = _.findIndex(selectPayoutProvider, {value: setPayoutScreen});

		return index === -1 ? 0 : index;
	}

	_renderHeaderContent = () => {
		const { remittance: { setPayoutScreen, selectPayoutProvider } } = this.props;
		const result = _.filter(selectPayoutProvider, {value: setPayoutScreen});
		
		if(result.length > 0) {
			return result[0].title;
		}
		return "Select";
	}

	renderScreen = () => {
		const { remittance: { setPayoutScreen } } = this.props;

		switch (setPayoutScreen) {
			case "kycId1":
				return <PrimaryID {...this.props}/>
			case "kycId2":
				return <SecondaryID {...this.props}/>
			case "summaryDetails2":
				return <Summary {...this.props}/>
			case "select":
			default:
				return <Selection {...this.props}/>
		}
	}
	
	render() {
		const {remittance: {selectPayoutProvider}} = this.props;
		const count = _.isEmpty(selectPayoutProvider) ? 5 : selectPayoutProvider.length;

		return (
			<View style={[styles.flex1, {backgroundColor: Color.bg}]}>
				<View style={styles.card}>
					<StepIndicator
						stepCount={count}
						customStyles={customStyless}
						currentPosition={this.position()}/>
				</View>
				<Text style={styles.txtheader}>{this._renderHeaderContent()}</Text>
				{this.renderScreen()}
			</View>
		);
	}
}

PayoutScreen.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	remittance: PropTypes.object,
	navigation: PropTypes.object,
};

export default PayoutScreen;
