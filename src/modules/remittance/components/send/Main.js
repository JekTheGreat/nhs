
/* eslint-disable */
import React from "react";
import { Text, View, Image } from "react-native";
import StepIndicator from "__src/resources/customize/StepIndicator";
import Selection from "./Selection";
import Sender from "./Sender";
import Beneficiary from "./Beneficiary";

import SearchResult from "./screens/SearchResult";
import AddClient from "./screens/AddClient";
import KYCPrimaryID from "./screens/KYCPrimaryID";
import KYCSecondaryID from "./screens/KYCSecondaryID";
import OTPForm from "./screens/OTPForm";
import SummaryScreen from "./Summary";
import _ from "lodash";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import Resource from "__src/resources";
const {Res, Color} = Resource;

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

class Main extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			currentPosition: 0,
		};
	}

	componentDidMount(){
		const {actions, login: {session}} = this.props;

		actions.fetchProviderSend(session.token)
	}

	back = () => {
		const {navigation} = this.props;

		navigation.goBack();
	}
	
	position = () => {
		const {remittance: { setSelectedScreen, selectProvider } } = this.props;
		const index = _.findIndex(selectProvider, {value: setSelectedScreen});

		return index === -1 ? 0 : index;
	}

	_renderHeaderContent = () => {
		const { remittance: { setSelectedScreen, selectProvider } } = this.props;
		const result = _.filter(selectProvider, {value: setSelectedScreen});
		
		if(result.length > 0) {
			return result[0].title;
		}
		return "Select";
	}

	renderScreen = () => {
		const { remittance: { setSelectedScreen } } = this.props;

		switch (setSelectedScreen) {
			case "senderDetails":
				return <Sender {...this.props}/>
			case "kycSelfie1":
				return <KYCPrimaryID {...this.props}/>
			case "kycSelfie2":
				return <KYCSecondaryID {...this.props}/>
			case "beneficiaryDetails1":
				return <Beneficiary {...this.props}/>
			case "summaryDetails1":
				return <SummaryScreen {...this.props}/>
			case "select":
			default:
				return <Selection {...this.props}/>
		}
	}
	
	render() {
		const {remittance: {selectProvider}} = this.props;
		const count = _.isEmpty(selectProvider) ? 5 : selectProvider.length;

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

Main.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	remittance: PropTypes.object,
	navigation: PropTypes.object,
};

export default Main;
