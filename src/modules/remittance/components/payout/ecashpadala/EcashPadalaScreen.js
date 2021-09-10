
/* eslint-disable */
import React from "react";
import { View } from "react-native";
import Summary from "./Summary";
import UploadID from "./UploadID";
import PropTypes from "prop-types";
import styles from "../../../styles.css";

class EcashPadalaScreen extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			currentPosition: 0,
		};
	}

	_renderContent = () => {
		const { remittance: { setPayoutChildScreen } } = this.props;

		switch (setPayoutChildScreen) {
		case "summary":
			return this._renderSummary();
		case "uploadid":
			return this._renderUploadID();
		}
	}

	back = () => {
		const {navigation} = this.props;

		navigation.goBack();
	}
	
	_renderSummary = () => (
		<Summary {...this.props}/>
	)
	
	_renderUploadID = () => (
		<UploadID {...this.props}/>
	)
	
	render() {
		return (
			<View style={styles.flex1}>
					{this._renderContent()}
			</View>
		);
	}
}

EcashPadalaScreen.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	remittance: PropTypes.object,
	navigation: PropTypes.object,
};

export default EcashPadalaScreen;
